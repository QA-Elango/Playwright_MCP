import { test, expect } from '@playwright/test';

test.describe('Beeceptor API Testing Suite', () => {
  const API_ENDPOINT = 'https://mp72d8379f53381de045.free.beeceptor.com/data';
  const EXPECTED_STATUS = 200;
  const EXPECTED_CONTENT_TYPE = 'application/json';

  test('GET /data - Should return successful response with Message field', async ({ request }) => {
    // Send HTTP GET request to the API endpoint
    const response = await request.get(API_ENDPOINT);

    // Validate HTTP status code
    expect(response.status()).toBe(EXPECTED_STATUS);
    console.log(`✓ Status code validation passed: ${response.status()}`);

    // Validate response headers
    const contentType = response.headers()['content-type'];
    expect(contentType).toBe(EXPECTED_CONTENT_TYPE);
    console.log(`✓ Content-Type header validation passed: ${contentType}`);

    // Validate response body is JSON and contains expected fields
    const responseBody = await response.json();
    expect(responseBody).toBeDefined();
    console.log(`✓ Response body is valid JSON: ${JSON.stringify(responseBody)}`);

    // Validate required fields in response
    expect(responseBody).toHaveProperty('Message');
    console.log(`✓ Response contains "Message" field`);

    // Validate Message field type and value
    expect(typeof responseBody.Message).toBe('string');
    expect(responseBody.Message).toBe('Successfully tested');
    console.log(`✓ Message field contains expected value: "${responseBody.Message}"`);
  });

  test('GET /data - Should have proper response structure and headers', async ({ request }) => {
    const response = await request.get(API_ENDPOINT);

    // Validate status is success
    expect(response.ok()).toBeTruthy();
    console.log(`✓ Response status indicates success`);

    // Validate essential headers
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    expect(headers['access-control-allow-origin']).toBe('*');
    console.log(`✓ CORS header is properly set`);

    // Parse and validate response body structure
    const body = await response.json();
    const expectedSchema = {
      Message: expect.any(String),
    };

    expect(body).toEqual(expect.objectContaining(expectedSchema));
    console.log(`✓ Response body structure matches expected schema`);

    // Log structured response for debugging
    console.log(`✓ Full Response Debug Info:`, {
      statusCode: response.status(),
      statusText: response.statusText(),
      headers: headers,
      body: body,
    });
  });

  test('GET /data - Negative scenario: Validate response is not empty', async ({ request }) => {
    const response = await request.get(API_ENDPOINT);

    // Ensure response is not empty
    const responseText = await response.text();
    expect(responseText.length).toBeGreaterThan(0);
    console.log(`✓ Response is not empty (${responseText.length} bytes)`);

    // Ensure response can be parsed as valid JSON
    const body = await response.json();
    expect(Object.keys(body).length).toBeGreaterThan(0);
    console.log(`✓ Response contains at least one field`);
  });

  test('GET /data - Should consistently return the same data', async ({ request }) => {
    // First request
    const response1 = await request.get(API_ENDPOINT);
    const body1 = await response1.json();

    // Second request
    const response2 = await request.get(API_ENDPOINT);
    const body2 = await response2.json();

    // Validate consistency
    expect(body1).toEqual(body2);
    expect(response1.status()).toBe(response2.status());
    console.log(`✓ API responses are consistent across multiple calls`);
  });
});
