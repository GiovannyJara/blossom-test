import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CharacterList from './components/CharacterList';
import { CharacterProvider } from './context/CharacterContext';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <CharacterProvider>
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1800px] mx-auto">
              <CharacterList />
            </div>
          </div>
        </CharacterProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;