# RMS Cloud Take Home Assessment

This repository contains automated tests for the RMS Cloud Booking Engine, implementing both Playwright end-to-end tests and Postman API tests as specified in the take-home assessment.

📋 **[Testing Analysis & Recommendations](./TESTING_ANALYSIS.md)** - Detailed findings, bugs, and improvement suggestions

## Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd rms-cloud-take-home-assessment
   npm install
   ```

2. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

3. **Install Newman globally for API testing**:
   ```bash
   npm install -g newman
   ```

## Running Tests

### Playwright UI Tests

**Desktop Chromium:**
```bash
npm run test:desktop
# or directly: npx playwright test --project=chromium
```

**Mobile Safari:**
```bash
npm run test:mobile
# or directly: npx playwright test --project="Mobile Safari"
```

**All tests:**
```bash
npm test
```

**With UI mode (visual test runner):**
```bash
npm run test:ui
```

### API Tests

**Run Postman collections via Newman:**
```bash
npm run test:api
```

This runs both Search and Booking API collections with CLI reports.

### VS Code Integration

Install the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension to:
- Run individual tests with the play button
- Debug tests with breakpoints
- View test results inline

## Debugging Playwright Tests

### Using Breakpoints
Click next to any line number in VS Code to set a breakpoint (red circle). When you run the test, it will automatically pause at that line. No need to run in debug mode - works with any test execution method.

### Playwright Trace Viewer
Traces are automatically collected (configured in `playwright.config.ts`). Access them via:

**Command line:**
```bash
npx playwright show-trace test-results/path-to-trace.zip
```

**UI Mode:**
```bash
npm run test:ui
```
Then select "Show trace viewer" before running tests for live debugging.

**VS Code Extension:**
Select "Show trace viewer" before running a test for additional debugging info.

### Headed Mode
See browser actions in real-time:
```bash
npm run test:headed
```

## Postman Collections

### Importing Collections

1. Open Postman
2. Click **Import** → **Files**
3. Select files from `postman-collections/`:
   - `Search.postman_collection.json`
   - `Booking.postman_collection.json`
   - `Alpha-IBE12.postman_environment.json`
4. Or drag and drop files directly into Postman

### API Test Coverage

The current collections cover:

**Search API (`GetCatAvailRatesData`):**
- Happy path availability search
- Missing required parameters
- Invalid date formats
- Invalid guest counts
- Past date validation

**Booking API (`AddBooking`):**
- Successful booking creation
- Missing parameters validation
- Invalid data types
- Boundary value testing

**Recommended Additional Coverage:**
- Authentication edge cases
- Rate limiting behavior
- Concurrent booking scenarios
- Payment processing endpoints
- Booking modification/cancellation
- Performance benchmarks (response times)
- Load testing for peak scenarios

## Architecture

### Playwright Fixtures

The test suite uses Playwright's fixture system to inject page objects and device context:

```typescript
// fixtures.ts
export const test = base.extend<Fixtures>({
  home: async ({ page, isMobile }, use) => {
    await use(new HomePage(page, { isMobile }));
  }
});
```

The `isMobile` flag is automatically passed to page objects, enabling responsive test logic without code duplication.

### Page Object Model

Tests follow the Page Object Model pattern:
- `src/objects/pages/` - Page object classes
- `test-data/` - Test data constants
- `src/fixtures.ts` - Playwright fixture definitions

## Test Data

Card details and guest information are externalized in `test-data/`:
- Valid/invalid card numbers
- Guest details for form filling
- Expected masked card formats

## Development Notes

- Used Cursor AI to accelerate development (happy to discuss prompt history in follow-up)
- Tests target `alphaibe12.rmscloud.com/22749/1` as specified
- Mobile tests use iPhone 12 viewport
- Traces and screenshots captured automatically on failure

## Known Limitations

- Dates are hardcoded (marked with TODOs for parameterization)
- No cleanup mechanism for created bookings
- Limited error scenario coverage in UI tests
- API tests use static test data

---

*For questions or issues, refer to the original assessment document or contact the development team.*
