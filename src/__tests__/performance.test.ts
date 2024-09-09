import axios from 'axios';
import { performance } from 'perf_hooks';

// Mock axios for testing
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Function to measure request time
const measureRequestTime = async (url: string, payload: any, params: any) => {
    const start = performance.now(); // Start time
    const response = await mockedAxios.post(url, payload, params);
    const end = performance.now(); // End time

    // Ensure headers object exists
    response.headers = response.headers || {};
    response.headers['request-duration'] = end - start; // Attach duration to headers
    return response;
};

describe('GraphQL API Performance Test', () => {
    const url = 'http://localhost:3000/graphql';
    const payload = {
        query: `
      query {
        allVehicleData {
          data {
            makeId
            makeName
            vehicleTypes {
              typeId
              typeName
            }
          }
        }
      }
    `,
    };

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should handle 200-500 concurrent requests within 1 second', async () => {
        const mockResponse = {
            data: { allVehicleData: { data: [] } },
            status: 200,
            headers: {} // Add headers object here
        };
        mockedAxios.post.mockResolvedValue(mockResponse);

        const concurrentRequests = 500; // Testing the upper limit
        const requests = Array(concurrentRequests).fill(null).map(() =>
            measureRequestTime(url, payload, params) // Use the measureRequestTime function
        );

        const start = performance.now();
        const responses = await Promise.all(requests);
        const end = performance.now();

        const totalDuration = end - start;

        // Check if all requests were successful
        responses.forEach(response => {
            expect(response.status).toBe(200);
        });

        // Check if the total duration is less than 1 second
        expect(totalDuration).toBeLessThan(1000);

        // Check if each individual request took less than 1 second
        responses.forEach((response) => {
            const requestDuration = response.headers['request-duration'];
            expect(requestDuration).toBeLessThan(1000); // Ensure each request duration is less than 1 second
        });
    });
});
