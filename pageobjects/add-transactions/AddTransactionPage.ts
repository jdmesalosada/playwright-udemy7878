import { Locator, Page } from "@playwright/test"

export class AddTransactionPage {

    private readonly addTransactionButton: Locator
    private readonly transactionDate: Locator
    private readonly transactionAmount: Locator
    private readonly transactionDescription: Locator
    private readonly saveTransactionButton: Locator
    private readonly page: Page
    
    private actualDateRow: Locator
    private actualAmountRow: Locator
    private actualDescriptionRow: Locator
    

    constructor(page: Page){
        this.page = page
        this.addTransactionButton = page.locator('//button[contains(text(), \'Añadir transacción\')]')
        this.transactionDate = page.locator('id=date')
        this.transactionAmount = page.locator('id=amount')
        this.transactionDescription = page.locator('id=description')
        this.saveTransactionButton  = page.locator("//button[contains(text(), 'Guardar')]")
    }

    async addTransaction(transationDate:string, transactionAmount: string, transactionDescription:string){
        await this.addTransactionButton.click()
        await this.transactionDate.fill(transationDate)
        await this.transactionAmount.fill(transactionAmount)
        await this.transactionDescription.fill(transactionDescription)
        await this.saveTransactionButton.click()
    }

    async getActualAmount(row:string){
        this.actualAmountRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[2]`)
        return await this.actualAmountRow.textContent()
    }

    async getActualDescription(row:string){
        this.actualDescriptionRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[3]`)
        return await this.actualDescriptionRow.textContent()
    }

    async getActualDate(row:string){
        this.actualDateRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[1]`)
        return await this.actualDateRow.textContent()
    }
}