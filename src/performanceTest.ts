import axios, { AxiosError } from 'axios';
import { performance } from 'perf_hooks';

const baseUrl = 'http://localhost:3000';
const graphqlUrl = `${baseUrl}/graphql`;
const restUrl = `${baseUrl}/rest/vehicle/1`; // Adjust this to your actual REST endpoint

const graphqlPayload = {
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

const graphqlParams = {
    headers: {
        'Content-Type': 'application/json',
    },
};

async function measureRequestTime(url: string, method: 'get' | 'post', data?: any, params?: any) {
    const start = performance.now();
    try {
        const response = method === 'get'
            ? await axios.get(url, params)
            : await axios.post(url, data, params);
        const end = performance.now();
        return { response, duration: end - start, error: null };
    } catch (error) {
        const end = performance.now();
        return { response: null, duration: end - start, error };
    }
}

async function runApiTest(apiType: 'GraphQL' | 'REST', concurrentRequests: number) {
    console.log(`Starting ${apiType} API performance test...`);

    const requests = Array(concurrentRequests).fill(null).map(() =>
        apiType === 'GraphQL'
            ? measureRequestTime(graphqlUrl, 'post', graphqlPayload, graphqlParams)
            : measureRequestTime(restUrl, 'get')
    );

    const start = performance.now();
    const results = await Promise.all(requests);
    const end = performance.now();

    const totalDuration = end - start;
    const successfulRequests = results.filter(result => result.response && result.response.status === 200);
    const failedRequests = results.filter(result => !result.response || result.response.status !== 200);

    const averageDuration = results.reduce((sum, result) => sum + result.duration, 0) / results.length;
    const maxDuration = Math.max(...results.map(result => result.duration));

    console.log(`${apiType} API Results:`);
    console.log(`Total time for ${concurrentRequests} requests: ${totalDuration.toFixed(2)}ms`);
    console.log(`Average response time: ${averageDuration.toFixed(2)}ms`);
    console.log(`Max response time: ${maxDuration.toFixed(2)}ms`);
    console.log(`Successful requests: ${successfulRequests.length}`);
    console.log(`Failed requests: ${failedRequests.length}`);

    if (failedRequests.length > 0) {
        console.log('Error details:');
        failedRequests.forEach((result, index) => {
            if (result.error instanceof AxiosError) {
                console.log(`Request ${index + 1} failed:`);
                console.log(`Status: ${result.error.response?.status}`);
                console.log(`Message: ${result.error.message}`);
                console.log(`Response data:`, result.error.response?.data);
            } else {
                console.log(`Request ${index + 1} failed with unknown error:`, result.error);
            }
        });
    }

    if (totalDuration < 1000 && maxDuration < 1000 && failedRequests.length === 0) {
        console.log(`${apiType} API performance test passed!`);
    } else {
        console.log(`${apiType} API performance test failed.`);
        if (totalDuration >= 1000) console.log('Total duration exceeded 1 second.');
        if (maxDuration >= 1000) console.log('Some requests took longer than 1 second.');
        if (failedRequests.length > 0) console.log('Some requests failed.');
    }
    console.log('\n');
}

async function runPerformanceTest() {
    await runApiTest('GraphQL', 500);
    await runApiTest('REST', 500);
}

runPerformanceTest().catch(error => {
    console.error('Error running performance test:', error);
});
