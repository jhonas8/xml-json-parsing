import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../typeDefs';
import { resolvers } from '../resolvers';


export const privateGraphQLRoute = (router: Router) => {
    const privateSchema = makeExecutableSchema({ typeDefs, resolvers });

    router.use('/', graphqlHTTP((req, res) => ({
        schema: privateSchema,
        graphiql: false
    })));

}
