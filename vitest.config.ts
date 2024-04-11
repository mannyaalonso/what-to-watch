export default {
  runner: 'playwright',
  use: {
    browserName: 'chromium',
  },
  test: {
    // This will force Vitest to run all tests in a browser environment
    environment: 'jsdom',
  },
}