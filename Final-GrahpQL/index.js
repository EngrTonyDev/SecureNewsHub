import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql_schema.js';
import { filterNewsByUserId,getNews} from './controllers/news.controller.js';
import mongoose from 'mongoose';

const db = mongoose.connect("mongodb://127.0.0.1:27017/project1", { useNewUrlParser: true, useUnifiedTopology: true });


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {

    getNewsByUserId: async (parent, args, context, info) => {
      return await filterNewsByUserId(args.userId);
    },
    getSearchNews: async (parent, args, context, info) => {
      return await getNews(args.userId,args.search,args.categoryId,args.tags);
    },
    version: () => "1.2"
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
});

console.log(`🚀  Server ready at: ${url}`);