import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { client } from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from '@/components/ui/sonner';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
        <Toaster />
      </ApolloProvider>{' '}
    </BrowserRouter>
  </StrictMode>,
);
