import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {Provider} from "react-redux"
// import {store, persistor} from "./redux/store"
// import { PersistGate } from "redux-persist/integration/react"
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import Context from './Context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

 
// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Context>
        <App />
      </Context>
    <ReactQueryDevtools />
  </QueryClientProvider>
</React.StrictMode>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
