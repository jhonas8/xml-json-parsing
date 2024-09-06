import { vehicleDataResolvers } from './vehicleData';

export const resolvers = {
    Query: {
        ...vehicleDataResolvers.Query,
    },
    Mutation: {
    },
};
