export const vehicleDataTypeDefs = `
  type VehicleType {
    typeId: String!
    typeName: String!
  }

  type VehicleData {
    makeId: String!
    makeName: String!
    vehicleTypes: [VehicleType!]!
  }

  input CreateVehicleInput {
    make: String!
    model: String!
    year: Int!
  }

  input UpdateVehicleInput {
    make: String
    model: String
    year: Int
  }

  type Query {
    vehicleDataByMakeId(makeId: String!): VehicleData
    allVehicleData(page: Int, limit: Int): VehicleDataResponse!
  }

  type VehicleDataResponse {
    data: [VehicleData!]!
    totalCount: Int!
    currentPage: Int!
    totalPages: Int!
  }

  type Mutation {
    createVehicle(input: CreateVehicleInput!): VehicleData!
    updateVehicle(id: ID!, input: UpdateVehicleInput!): VehicleData!
    deleteVehicle(id: ID!): ID!
  }
`;
