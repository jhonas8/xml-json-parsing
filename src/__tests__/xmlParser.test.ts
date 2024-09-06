import { parseStringPromise } from 'xml2js';
import { getMakesRequest } from '../clients/vPIC/makes';
import { getVehiclesTypeRequest } from '../clients/vPIC/vehicles';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('XML Parsing', () => {
    const mockClient: { requestWithRetry: jest.MockedFunction<() => Promise<{ data: string }>> } = {
        requestWithRetry: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getMakesRequest should parse XML correctly', async () => {
        const mockXML = '<Response><Results><AllVehicleMakes><Make_ID>440</Make_ID><Make_Name>ASTON MARTIN</Make_Name></AllVehicleMakes></Results></Response>';
        mockClient.requestWithRetry.mockResolvedValue({ data: mockXML });

        const result = await getMakesRequest(mockClient);
        expect(result).toHaveProperty('Response.Results[0].AllVehicleMakes[0].Make_ID[0]', '440');
        expect(result).toHaveProperty('Response.Results[0].AllVehicleMakes[0].Make_Name[0]', 'ASTON MARTIN');
    });

    test('getVehiclesTypeRequest should parse XML correctly', async () => {
        const mockXML = '<Response><Results><VehicleTypesForMakeIds><VehicleTypeId>2</VehicleTypeId><VehicleTypeName>Passenger Car</VehicleTypeName></VehicleTypesForMakeIds></Results></Response>';
        mockClient.requestWithRetry.mockResolvedValue({ data: mockXML });

        const result = await getVehiclesTypeRequest(mockClient, { id: '440' });
        expect(result).toHaveProperty('Response.Results[0].VehicleTypesForMakeIds[0].VehicleTypeId[0]', '2');
        expect(result).toHaveProperty('Response.Results[0].VehicleTypesForMakeIds[0].VehicleTypeName[0]', 'Passenger Car');
    });
});
