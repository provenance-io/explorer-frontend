// add some helpful assertions
import '@testing-library/jest-dom/extend-expect';
import 'test/matchMedia.mock';
import { server } from 'test/server';

// console.log(server.printHandlers());
// src/setupTests.js
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
