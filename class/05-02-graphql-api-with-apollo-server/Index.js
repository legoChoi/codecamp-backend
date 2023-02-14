import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = 3001;

// The GraphQL schema
// 리턴 타입 지정
// graphql은 따로 swagger를 만들 필요 없이 이게 awagger가 됨
const typeDefs = `#graphql
  type Query {
    hello: Int
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    // graphql은 api가 함수처럼 생김
    hello: () => 10,
  },
};

const server = new ApolloServer({
  typeDefs, // 키와 밸류가 같으면 밸류 생략가능 => shorthand property
  resolvers,
});

// server.listen(port).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url} on port ${port}`);
// });

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
