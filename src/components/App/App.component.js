import React, { Component } from 'react';
import { Header, Footer, Main } from '../../components';

const App = () => {
  return (
    <div>
      <div className="content-wrapper">
        <Header />
        <Main />
      </div>
      <Footer />
    </div>
  );
};

export default App;
