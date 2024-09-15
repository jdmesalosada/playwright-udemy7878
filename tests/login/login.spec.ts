import {test, expect} from '@playwright/test'
import { LoginPage } from '../../pageobjects/login/LoginPage';
import { AddTransactionPage } from '../../pageobjects/add-transactions/AddTransactionPage';
import {faker} from '@faker-js/faker'
import { NavigateTo } from '../../pageobjects/navigate/NavigateTo';

test('login', async({page}) => {

    await test.step('Navigating to login page', async() =>{
        const navigateTo = new NavigateTo(page)
        await navigateTo.loginPage()
    })
    

    const transactionDate = '2023-12-31'
    const transactionAmount = faker.number.int({min: 500, max: 5000}).toString()
    const transactionDescription = faker.food.description()

    await test.step('log in', async() =>{
        const loginPage = new LoginPage(page)
        await loginPage.doLogin('user', 'pass')
    })
    
    
    await test.step('Add transaction', async() =>{
        const addTransactionPage = new AddTransactionPage(page)
        await addTransactionPage.addTransaction(transactionDate, transactionAmount, transactionDescription)
        expect(await addTransactionPage.getActualDate("1")).toEqual(transactionDate)
        expect(await addTransactionPage.getActualAmount("1")).toEqual(transactionAmount)
        expect(await addTransactionPage.getActualDescription("1") ).toEqual(transactionDescription)
    })
});
