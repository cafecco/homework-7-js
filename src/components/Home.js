import React, { Component } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:3300/pokemons';
const POKEMONS_PER_LOAD = 12;

class Home extends Component {

  state = {
    page: 1,
    list: [],
    isLoading: false,
    error: null,
    allDataLoaded: false
  }

  loadPokemons = () => {
    const currentPage = this.state.page;

    this.setState({ isLoading: true });

    fetch(`${BASE_URL}?_page=${currentPage}&_limit=${POKEMONS_PER_LOAD}`)
    .then(res => res.json())
    .then(data => {
      if (data.length < POKEMONS_PER_LOAD) {
        this.setState({ allDataLoaded: true })
      }
      else {
        this.setState(oldState => ({
          isLoading: false,
          list: [...oldState.list, ...data],
          page: oldState.page + 1
        }));
      }
    });
  }

  handleCatchPokemon = (id) => (event) => {
    event.preventDefault();

    fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        catched: true,
        date: new Date()
      }),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      this.setState(oldState => ({
        list: oldState.list.map(pokemon => pokemon.id === data.id ? data : pokemon)
      }))
    })
  }

  componentDidMount() {
    this.loadPokemons();
  }

  render() {
    return (
      <main className="container">

            <h1>choose pokemons, catch them</h1>

        <Link to="/catched"><h2 className="btn btn-outline-secondary">&#8592; Catched pokemons</h2></Link>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.list.map(pokemon => (
            <Card
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              catched={pokemon.catched}
              date={pokemon.date}
              onCatchPokemon={this.handleCatchPokemon(pokemon.id)}
            />
          ))}
        </div>

        {this.state.isLoading
          ? (<div>LOADING</div>)
          : (!this.state.allDataLoaded && (
              <div className = "load_button"><button
                type="button"
                onClick={this.loadPokemons}
                className="btn btn-outline-secondary"
              >
                Load more
              </button>
          </div>
            ))}
      </main>
    )
  }
}

export default Home;
