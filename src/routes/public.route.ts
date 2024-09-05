import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../typeDefs';
import { resolvers } from '../resolvers';
import { Routes } from '../@types/routes';
import { Router } from 'express';

export const publicGraphQLRoute: Routes.TRouteInjection = (router: Router) => {
    const publicSchema = makeExecutableSchema({
        typeDefs,
        resolvers: {
            Query: {
                // Include only public queries here
                users: resolvers.Query.users,
                products: resolvers.Query.products,
            },
            Mutation: {
                // Include only public mutations here
                createUser: resolvers.Mutation.createUser,
            },
        },
    });

    router.use('/', graphqlHTTP({
        schema: publicSchema,
        graphiql: true,
    }));
}
