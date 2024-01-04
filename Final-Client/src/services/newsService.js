import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { gql } from 'graphql-tag';

const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:5000/graphql' }),
    cache: new InMemoryCache(),
});
const queryGetNewsByUser = gql`
  query getNewsByUserId($userId: String) {
    getNewsByUserId(userId: $userId) {
      _id
      title
      description
      permanlink
      date
      user {
        _id
        email
      }
      category {
        _id
        name
      }
      tags {
        _id
        name
      }
    }
  }
`;

export const getNewsByUser = async (userId) => {
    try {


        const { data } = await client.query({
            query: queryGetNewsByUser,
            variables: {
                userId: userId,
            },
        });


        if (data && data.getNewsByUserId) {
            return { error: false, data: data.getNewsByUserId, msg: '' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
};

const queryGetSearchNews = gql`
query getSearchNews($userId: String, $search: String, $categoryId: String, $tags: [String]) {
    getSearchNews(userId: $userId, search: $search, categoryId: $categoryId, tags: $tags) {
        _id
        title
        description
        permanlink
        date
        user {
            _id
            email
        }
        category {
            _id
            name
        }
        tags {
            _id
            name
        }
    }
}
`;

export const getSearchNews = async (userId, search, categoryId, tags) => {
    try {
        console.log("userId");
        console.log(userId);
        console.log("search");
        console.log(search);
        console.log("categoryId");
        console.log(categoryId);
        console.log("tags");
        console.log(tags);
        const { data } = await client.query({
            query: queryGetSearchNews,
            variables: {
                userId: userId,
                search: search,
                categoryId: categoryId,
                tags: tags
            },
        });
        
        if (data && data.getSearchNews) {
            return { error: false, data: data.getSearchNews, msg: '' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(error.response);
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}