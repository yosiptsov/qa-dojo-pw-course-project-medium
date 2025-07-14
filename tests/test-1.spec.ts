// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://www.zara.com/ua/uk/s-choloviky-polo-l10828.html?v1=2415614');
//   await page.getByRole('button', { name: 'Дозволити всі файли cookie' }).click();
//   await page.goto('https://www.zara.com/ua/uk/s-choloviky-polo-l10828.html?v1=2415614');
//   await page.locator('.product-grid-product._product.product-grid-product--ZOOM1-columns.product-grid-product--1th-column > .product-grid-product__figure > .product-grid-product__add-to-cart > .product-add-to-cart__button').first().click();
//   await page.getByRole('button', { name: 'S' }).click();
//   await page.getByRole('button', { name: 'Закрити' }).click();
//   await page.locator('.product-purchase-intention-actions-size-selector > .product-add-to-cart__button').click();
//   await page.getByRole('button', { name: 'M' }).click();
//   await page.getByRole('button', { name: 'Закрити' }).click();
//   await page.locator('.product-purchase-intention-actions-size-selector > .product-add-to-cart__button').click();
//   await page.getByRole('button', { name: 'L', exact: true }).click();
//   await page.getByRole('button', { name: 'Закрити' }).click();
//   await page.locator('.product-purchase-intention-actions-size-selector > .product-add-to-cart__button').click();
//   await page.getByRole('button', { name: 'XL' }).click();
//   await page.getByRole('button', { name: 'Закрити' }).click();
// });

// button available size: [data-qa-action=size-in-stock]
// button + [data-qa-action=product-grid-open-size-selector]
// getByRole('button', { name: 'Відкрити меню' })
// getByRole('link', { name: 'СОРОЧКИ' })
// getByRole('link', { name: 'КАРДИГАНИ | СВЕТРИ' })

// await page.goto('https://www.zara.com/ua/');
// await page.getByRole('button', { name: 'Відхилити необов’язкові файли cookie' }).click();
// await page.getByRole('button', { name: 'Відкрити меню' }).click();
// await page.getByRole('link', { name: 'КАРДИГАНИ | СВЕТРИ' }).click();
// await page.locator('.product-add-to-cart__button').first().click();
// await page.getByRole('button', { name: 'XS' }).click();
// await page.getByRole('button', { name: 'Закрити' }).click();
// await page.locator('.product-add-to-cart__button').first().click();
// await page.getByRole('button', { name: 'S', exact: true }).click();
// await page.getByRole('button', { name: 'Закрити' }).click();
// await page.locator('.product-add-to-cart__button').first().click();
// await page.getByRole('button', { name: 'M' }).click();
// await page.getByRole('button', { name: 'Закрити' }).click();
// await page.locator('.product-add-to-cart__button').first().click();
// await page.getByRole('button', { name: 'L' }).click();
// await page.getByRole('button', { name: 'Закрити' }).click();
// await page.getByRole('button', { name: 'Закрити' }).click();