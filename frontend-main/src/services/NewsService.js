import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

export const getNewsByUser = async (userId) => {
    try {
        const result = await client
            .query({
                query: gql`
                query getNews($userId: ID!) {
                    getNewsByUserId(userId: $userId) {
                        _id
                        title
                        description
                        permalink
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
            `,
                variables: { userId }
            })
        if (result && result.data && result.data.getNewsByUserId) {
            return { error: false, data: result.data.getNewsByUserId, msg: '' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}

export const getSearchNews = async (userId, search, categoryId, tags) => {
    try {
        const result = await client
            .query({
                query: gql`
                query searchNews($userId: ID!, $search: String, $categoryId: ID, $tags: [String]) {
                    getSearchNews(userId: $userId, search: $search, categoryId: $categoryId, tags: $tags) {
                        _id
                        title
                        description
                        permalink
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
            `,
                variables: { userId, search, categoryId, tags, }
            })
        if (result && result.data && result.data.getSearchNews) {
            return { error: false, data: result.data.getSearchNews, msg: '' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}