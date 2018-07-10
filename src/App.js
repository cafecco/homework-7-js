import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './components/Home.js';
import PokemonPage from './components/PokemonPage.js';
import Catched from './components/Catched.js';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/pokemon/:id" component={PokemonPage} />
            <Route exact path="/catched" component={Catched} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
