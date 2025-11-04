import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colors: {
          brand: [
            '#EAFBEE',
            '#DBF2E0',
            '#B9E1C2',
            '#74C286',
            '#5FB974',
            '#54B46A',
            '#439E58',
            '#388D4D',
            '#2A7A3F',
            '#122B19',
          ],
        },
        primaryColor: 'brand',
        fontFamily: 'Inter, sans-serif',
        defaultRadius: 'lg',
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
