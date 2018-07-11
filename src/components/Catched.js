import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';

const BASE_URL = 'http://localhost:3300/pokemons';

class Cathed extends Component {

  state = {
    list: [],
    isLoading: false,
    error: null,
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(`${BASE_URL}?catched=true`)
    .then(res => res.json())
    .then(list => {
      this.setState(oldState => ({
        isLoading: false,
        list,
      }));
    });
  }

  render() {

    if (this.state.isLoading) {
      return (<div>LOADING</div>);
    }

    return (
      <main className = "container" style={{ width: '100vw', minHeight: '100vh' }}>
        <h1>List of Cathced pokemons</h1>
        <Link to="/"><h2  className="btn btn-outline-secondary">&#8592; To all pokemons</h2></Link>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.list.map(pokemon => (
            <Card
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              catched={pokemon.catched}
              date={pokemon.date}
            />
          ))}
        </div>
      </main>
    )
  }
}

export default Cathed;
