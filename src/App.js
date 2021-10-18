import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
// import PokemonInfo from './components/PokemonInfo';

export default class App extends Component {
  state = {
    imagesInput: "",
  };

  handleFormSubmit = (imagesInput) => {
    this.setState({ imagesInput });
  };

  render() {
    return (
      <div style={{ maxWidth: 1170, margin: "0 auto", padding: 20 }}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* <PokemonInfo pokemonName={this.state.pokemonName} /> */}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
