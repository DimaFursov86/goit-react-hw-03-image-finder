import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import serviceAPI from "./components/services/serviceApi";
import Button from "./components/Button";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class App extends Component {
  state = {
    images: [],
    error: null,
    imageName: "",
    page: 1,
    status: Status.IDLE,
  };

  handleFormSubmit = (imageName) => {
    this.setState({ imageName });
  };
  onPageClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const text = this.state.imageName;
    const prevPage = prevState.page;
    const page = this.state.page;
    console.log(prevState.imageName);
    console.log(this.state.imageName);
    console.log(this.state.images);
    if (prevName !== text || prevPage !== page) {
      this.setState({ status: Status.PENDING });

      serviceAPI
        .fetchImages(text, page)
        .then((images) =>
          this.setState({
            images: [...this.state.images, ...images.hits],
            status: Status.RESOLVED,
          })
        )
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { images, status } = this.state;
    console.log(images);
    return (
      <div style={{ maxWidth: 1170, margin: "0 auto", padding: 20 }}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === Status.RESOLVED && <ImageGallery images={images} />}

        <Button onClick={this.onPageClick} />
        <ToastContainer />
      </div>
    );
  }
}
