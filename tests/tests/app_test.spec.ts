import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://infsus-lab3.vercel.app/');
});

const EDIT_GREDICA = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
];

// Prezentacijski
// TEST dobar raspored tablica gredica
test('izgled dashboarda', async ({ page }) => {
    // search
    await expect(page.getByPlaceholder('Search...')).toBeVisible();
    // gredica
    await expect(page.getByRole('main').nth(1)).toBeVisible();
});

// TEST dobar raspored jedna gredica
test('izgled gredice', async ({ page }) => {
    await page.getByRole('cell', { name: 'Povrće' }).click();
    // input za ime gredice
    await expect(page.getByRole('textbox')).toBeVisible();
    //input za duljinu gredice
    await expect(page.getByText('Duljina:')).toBeVisible();
    //input za širinu gredice
    await expect(page.getByText('Širina:')).toBeVisible();
    //input za lokaciju gredice
    await expect(page.getByText('Lokacija')).toBeVisible();
    // tablica posađenih biljaka
    await expect(page.getByRole('heading', { name: 'posadeneBiljke' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Naziv' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Kolicina' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Osuncanje' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Vlaznost' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Phtla' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Vrijemesadnje' })).toBeVisible();
    // button za dodavanje biljaka
    await expect(page.getByRole('button', { name: 'Add Biljka' })).toBeVisible(); 
});

// TEST dobar raspored add biljka
test('izgled dodavanja biljaka', async ({ page }) => {
    await page.getByRole('cell', { name: 'Povrće' }).click();
    await page.getByRole('button', { name: 'Add Biljka' }).click();

    await expect(page.getByText('Biljka:Select a')).toBeVisible();
    await expect(page.getByText('Količina:')).toBeVisible();
    await expect(page.getByText('Vrijeme Sadnje:')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
});

// Poslovni
// TEST search gredice
test('search_gredica', async ({ page }) => { 
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('povrće');
    await expect(page.getByRole('cell', { name: 'Povrće' })).toBeVisible();
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('ov');
    await expect(page.getByRole('cell', { name: 'Povrće' })).toBeVisible();
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('1234');
    await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
    await page.getByPlaceholder('Search...').click();
    await page.getByPlaceholder('Search...').fill('...');
    await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
});

// TEST otvaranje gredice
test('otvaranje gredice', async ({ page }) => {
    await page.getByRole('cell', { name: 'Povrće' }).click();
    await expect(page.getByText('posadeneBiljkePregled tvojih')).toBeVisible();
    await expect(page.getByText('Duljina:Širina:Lokacija:SjeverJugZapadIstokSubmitposadeneBiljkePregled tvojih')).toBeVisible();
});

// Pristup podacima

// TEST update gredice
test('update gredicu', async ({ page }) => {
    await page.getByRole('cell', { name: 'Povrće'}).click();
    // ime gredice
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('Povrće1');
    // duljina gredice
    await page.locator('input[name="duljina"]').click();
    await page.locator('input[name="duljina"]').fill('3');
    // sirina gredice
    await page.locator('input[name="sirina"]').click();
    await page.locator('input[name="sirina"]').fill('3');
    // lokacija gredice
    await page.getByRole('combobox').selectOption('1');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.goto('https://infsus-lab3.vercel.app/');
    // sad faila jer imamo bug
    await expect(page.getByText('33PovrćeSjever')).toBeVisible();
});

// TEST delete biljka u gredici
test('delete biljku u gredici', async ({page}) => {
    await page.getByRole('cell', { name: 'Povrće'}).click();
    // var posadeneBiljkeLength = await page.evaluate(() => {
    //     return window.posadeneBiljke.length;
    //   });
    const posadeneBiljkeLength = await page.evaluate(() => {
        const posadeneBiljkeElement = document.getElementById('posadeneBiljke');
        if (posadeneBiljkeElement && posadeneBiljkeElement.textContent) {
            return JSON.parse(posadeneBiljkeElement.textContent).length;
        }
        return 0;
    });
    await page.getByRole('button', { name: 'Delete' }).first().click();
    // var novaBiljkeLength = await page.evaluate(() => {
    //     return document.getElementById('posadeneBiljke');

    // })
    const posadeneBiljkeNewLength = await page.evaluate(() => {
        const posadeneBiljkeElement = document.getElementById('posadeneBiljke');
        if (posadeneBiljkeElement && posadeneBiljkeElement.textContent) {
            return JSON.parse(posadeneBiljkeElement.textContent).length;
        }
        return 0;
    });
    const tableRowCount = await page.evaluate(() => {
        const tableBody = document.querySelector('#posadeneBiljke tbody');
        return tableBody ? tableBody.querySelectorAll('tr').length : 0;
    });
    await expect(posadeneBiljkeNewLength.toEqual(posadeneBiljkeLength-1));
});

// TEST EDIT biljka u gredici
test('edit biljku u gredici', async ({ page }) => {    
    await page.getByRole('cell', { name: 'Povrće'}).click();
    await page.getByRole('button', { name: 'Edit' }).first().click();
    await page.getByLabel('Količina:').click();
    await page.getByLabel('Količina:').fill('5');
    await page.getByLabel('Vrijeme Sadnje:').fill('2024-05-12');
    await page.getByRole('button', { name: 'Apply' }).click();

    const tableBody = document.querySelector('#posadeneBiljke tbody');
    var tableRows = tableBody?.querySelectorAll('tr');
    if (tableRows){
        var mrkvaRow = tableRows[0];
    }
    //await expect(mrkvaRow).toBe('5');
    await expect(page.getByRole('cell', { name: '5/12/' }).first()).toBe('2024-05-12');
});

// Integracijski
