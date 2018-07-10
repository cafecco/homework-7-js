import React, { Component } from 'react';
import { withRouter } from 'react-router'

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
      data.name
    )
  }
}


export default withRouter(PokemonPage);
