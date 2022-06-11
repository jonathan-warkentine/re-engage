import { setContext } from '@apollo/client/link/context';
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
    uri: '/graphql',
});
  
const authLink = setContext((_, { headers }) => {
// get the authentication token from local storage if it exists
const token = localStorage.getItem('id_token');
// return the headers to the context so httpLink can read them
return {
    headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
    },
};
});

const client = new ApolloClient({
link: authLink.concat(httpLink),
cache: new InMemoryCache(),
});

export default client;