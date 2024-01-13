import { Locator, Page } from "@playwright/test";

export default class ButtonsPage {
    readonly page: Page;
    readonly elementsCategory: Locator;
    readonly elementInMenu: Locator;
    readonly doubleClickBtn: Locator;
    doubleClickMessage: Locator;
    rightClickBtn: Locator;
    rightClickMessage: Locator;
    clickMeBtn: Locator;
    clickMeMessage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.elementsCategory = this.page.getByRole('heading', { name: 'Elements'});
        this.elementInMenu = this.page.getByRole('list').getByText('Buttons');
        this.doubleClickBtn = this.page.locator('#doubleClickBtn');
        this.doubleClickMessage = this.page.locator('#doubleClickMessage');
        this.rightClickBtn = this.page.locator('#rightClickBtn');
        this.rightClickMessage = this.page.locator('#rightClickMessage');
        this.clickMeBtn = this.page.getByRole('button', { name: 'Click Me', exact: true });
        this.clickMeMessage = this.page.locator('#dynamicClickMessage');
    };
    async clickElementsCategory(): Promise<void> {
        await this.elementsCategory.click();  
    };
    async clickElementInMenu(): Promise<void> {
        await this.elementInMenu.click();
    };
    async openButtonsPage(): Promise<void> {
        await this.page.goto('/buttons', { waitUntil: 'load'} );
    };
    async clickDoubleClickBtn(): Promise<void> {
        await this.doubleClickBtn.dblclick();
    };
    async clickRightBtn(): Promise<void> {
        await this.rightClickBtn.click({ button : 'right'});
    };
    async clickMeBtnClick(): Promise<void> {
       await this.clickMeBtn.click(); 
    };
};