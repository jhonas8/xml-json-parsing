import { userResolvers } from './user';
import { productResolvers } from './product';
import { vehicleDataResolvers } from './vehicleData';

export const resolvers = {
    Query: {
        ...vehicleDataResolvers.Query,
    },
    Mutation: {
    },
};
