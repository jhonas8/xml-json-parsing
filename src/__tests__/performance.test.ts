import axios from 'axios';
import { performance } from 'perf_hooks';

// Mock axios for testing
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Create an Axios instance with interceptors
const instance = axios.create();

instance.interceptors.request.use((config) => {
    config.headers['request-startTime'] = process.hrtime();
    return config;
});

instance.interceptors.response.use((response) => {
    const start = response.config.headers['request-startTime'];
    const end = process.hrtime(start);
    const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000));
    response.headers['request-duration'] = milliseconds;
    return response;
});

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
        const mockResponse = { data: { allVehicleData: { data: [] } }, status: 200 };
        mockedAxios.post.mockResolvedValue(mockResponse);

        const concurrentRequests = 500; // Testing the upper limit
        const requests = Array(concurrentRequests).fill(null).map(() =>
            instance.post(url, payload, params) // Use the instance with interceptors
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
