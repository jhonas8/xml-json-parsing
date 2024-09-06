export namespace Response {
    export type ResponseType = 'json' | 'xml';

    export interface IMakeResponse {
        Make_ID: string[];
        Make_Name: string[];
    }

    export interface IVehicleTypeResponse {
        VehicleTypeId: string[];
        VehicleTypeName: string[];
    }

    export interface IVehiclesData {
        makeId: string;
        makeName: string;
        vehicleTypes: {
            typeId: string;
            typeName: string;
        }[];
    }
}
