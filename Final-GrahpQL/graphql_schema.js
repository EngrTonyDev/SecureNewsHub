// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  

type User {
  _id: String
  email: String
}

type Category {
  _id: String
  name: String
}

type Tag {
  _id: String
  name: String
}

type News {
  _id: String
  title: String
  description: String
  permanlink: String
  date: String
  user: User
  category: Category
  tags: [Tag]
}


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "players" query returns an array of zero or more players (defined above).
  type Query {
    getNewsByUserId(userId: String): [News]
    getSearchNews(userId: String, search: String, categoryId: String, tags: [String]): [News]
    version: String
  }
`;