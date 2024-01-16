import { test} from '../../src/fixtures/base_fixtures';
import axios, { Axios} from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { expect } from '@playwright/test';
import { oneBookPatch } from './apiTestData';

//Task1:
test.describe(async () => {

    test('Verify possibility to spoof a response with some data', async ({page}) => {
        await page.route('/BookStore/v1/Books', route => {
            route.fulfill({
                status: 200,
                contentType: 'application.json',
                body: JSON.stringify(oneBookPatch),
            });
        });
        await page.goto('/books');
        expect(page.getByText('Test my book')).toBeVisible();
    });
});

//Task2:
test.describe(async () => {

    let client: Axios;
    let userId: string;
    let token: string;

    test.beforeAll('Login to My Account', async ()=> {
        const jar = new CookieJar();

        client = wrapper(axios.create({
            baseURL: process.env.API_BASE_URL,
            validateStatus: function (status) {
                return status >=200 && status<300;
            },
            jar
        }));
        const loginData = await client.post('Account/v1/Login', {
            "userName": "Test12",
            "password": "Qwerty123456@"
        }); 
        userId = loginData.data.userId
        token = loginData.data.token
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`
    });

    test('Verify adding book to My account', async ({page}) => {
        const response = await client.post('BookStore/v1/Books', {
            "userId": userId,
            "collectionOfIsbns": [
                {
                    "isbn": "9781449325862"
                }
            ]
        });
        await page.goto('/books');
        expect(response.status).toBe(201);
        
    });
    test('Verify deleting added book in My account', async ({page}) => {
        const response = await client.delete('BookStore/v1/Book', {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                userId,
                isbn: '9781449325862'
            }
        });
        await page.goto('/books');
        expect(response.status).toBe(204);
    });
});