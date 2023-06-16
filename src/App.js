import React from 'react';
import { Outlet } from 'react-router-dom';

import Nav from './Components/Nav/Nav';

function App() {
  return (
    <div>
      <Nav />
      <section className="container">
      <Outlet />
      </section>
    </div>
  );
}

export default App;
