import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:3300/pokemons';

class PokemonPage extends Component {
  state = {
      isLoading: true,
      data: null,
      error: null,
    }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`${BASE_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.id) {
          this.setState({
            isLoading: false,
            error: { message: 'Error: No pokemon' }
          })
        }
        else {
          this.setState({
            isLoading: false,
            data
          })
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error
        })
      })
  }

  render() {
    const { data, isLoading, error } = this.state;

    if (isLoading) {
      return (<div>LOADING</div>);
    }

    if (error) {
      return (<div>{error.message}</div>)
    }

    return (
        <div  className="container" style={{ width: '15%', margin: '5px'}}>
            <Link to="/"><h2  className="btn btn-outline-secondary">&#8592; To all pokemons</h2></Link>
        <h2>{data.name}</h2>
        <img
          src={`https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/${this.props.match.params.id}.png`}
          style={{ width: '100%' }}
        />
    </div>
    )
  }
}


export default withRouter(PokemonPage);
