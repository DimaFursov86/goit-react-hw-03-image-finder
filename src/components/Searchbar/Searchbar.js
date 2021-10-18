import { Component } from "react";
// import { ImSearch } from 'react-icons/im';
import { toast } from "react-toastify";

export default class Searchbar extends Component {
  state = {
    imageName: "",
  };

  handleNameChange = (event) => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.imageName.trim() === "") {
      toast.error("Введите имя покемона.");
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="imageName"
            value={this.state.imageName}
            onChange={this.handleNameChange}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
