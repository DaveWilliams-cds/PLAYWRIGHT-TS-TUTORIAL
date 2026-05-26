import { test, expect } from '@playwright/test';

  test('Get All Products List - returns status 200 and includes products', async ({ request }) => {
    //{ request } is Playwright’s built-in APIRequestContext used for making HTTP requests.
    const response = await request.get('https://automationexercise.com/api/productsList');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toBeTruthy();
    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.products)).toBe(true);
    expect(responseBody.products.length).toBeGreaterThan(0);
    expect(response.headers()['content-type']).toContain('text/html');

    console.log('This is the content-type header value:', response.headers()['content-type']);

    const firstProduct = responseBody.products[0];
    expect(firstProduct).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
      category: expect.any(Object),
    });
  });
  

  test('POST To All Products List - returns response Code 405 and message', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/productsList', {
      data: {},
    });
  // The API returns a 200 status (api has worked) with an error message in the body.
    expect(response.status()).toBe(200);
  
  //parse the text as JSON to access the responseCode and message properties.
  //note content-type is application/json so we need to parse it as JSON to access the properties.
    const json = await response.json();
    expect(json.responseCode).toBe(405);
    expect(json.message).toContain('This request method is not supported.');
  });

  test('Get All Brands List - returns status 200 and includes a list of brands', async ({ request }) => {
    //{ request } is Playwright’s built-in APIRequestContext used for making HTTP requests.
    const response = await request.get('https://automationexercise.com/api/brandsList');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toBeTruthy();
    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.brands)).toBe(true);
    expect(responseBody.brands.length).toBeGreaterThan(0);
    expect(response.headers()['content-type']).toContain('text/html');

    const firstProduct = responseBody.brands[0];
    expect(firstProduct).toMatchObject({
      id: expect.any(Number),
      brand: expect.any(String)
    });
  });
