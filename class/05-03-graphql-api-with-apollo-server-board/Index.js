import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = 3001;

// The GraphQL schema
// api 리턴 타입 지정
// graphql은 따로 swagger를 만들 필요 없이 이게 awagger가 됨
const typeDefs = `#graphql
  type Board { # 내보내는 타임은 type으로
    number: Int
    writer: String
    title: String
    contents: String
  }
  input CreateBoardInput { # 받아오는 타입은 input으로
    writer: String
    title: String
    contents: String
  }
  type Query {
    # fetchBoards: Board => 객체 1개를 리턴
    fetchBoards: [Board] # => 객체 배열 리턴
  }
  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
    createBoard2(createBoardInput: CreateBoardInput): String
  }
`;

const resolvers = {
  Query: {
    // graphql은 api가 함수처럼 생김
    fetchBoards: () => {
      // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "제목입니다~~",
          contents: "내용이에요@@@",
        },
        {
          number: 2,
          writer: "영희",
          title: "영희 제목입니다~~",
          contents: "영희 내용이에요@@@",
        },
        {
          number: 3,
          writer: "훈이",
          title: "훈이 제목입니다~~",
          contents: "훈이 내용이에요@@@",
        },
      ];

      // 2. 꺼내온 결과 응답 주기.
      return result;
    },
  },

  Mutation: {
    // api에 들어가는 매개변수
    // parent: api에서 api 호출 시 데이터 전달 받는 매개변수 => 지금은 안쓰는 매개변수라 _로 표시
    // args: api 호출 시 데이터 전달 받는 매개변수
    // context: req, res 정보
    // info: api에 대한 정보
    createBoard: (_, args) => {
      // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args);

      // 2. 저장결과 알려주기.
      return "등록에 성공하였습니다.";
    },
    createBoard2: (_, args) => {
      // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args);

      // 2. 저장결과 알려주기.
      return "등록에 성공하였습니다.";
    },
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
