import React from 'react';
import { Header } from './layouts/Header';
import { Footer } from './layouts/Footer';
import { Main } from './layouts/Main';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
}

export { App };
