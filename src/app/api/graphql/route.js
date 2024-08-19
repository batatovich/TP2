import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import typeDefs from '@/lib/graphql/typeDef';
import resolvers from '@/lib/graphql/resolvers';
import { getUserIdFromSession } from '@/lib/sessions';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async ({ req }) => {
    const userId = await getUserIdFromSession(req);
    return { userId };
  },
});

export { handler as GET, handler as POST };