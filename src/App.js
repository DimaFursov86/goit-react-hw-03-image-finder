import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import serviceAPI from "./components/services/serviceApi";
import Button from "./components/Button";
import Modal from "./components/Modal";
import s from "../src/App.module.scss";
import "modern-normalize/modern-normalize.css";
const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class App extends Component {
  state = {
    images: [],
    imageName: "",
    page: 1,
    status: Status.IDLE,
    showModal: false,
    largeImg: "",
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

    if (prevName !== text) {
      this.setState({ status: Status.PENDING });

      serviceAPI
        .fetchImages(text, page)
        .then((images) =>
          this.setState({
            images: [...images.hits],
            status: Status.RESOLVED,
          })
        )
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
    if (prevPage !== page) {
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
  openModal = (e) => {
    this.setState({ largeImg: e.target.dataset.source });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, status, showModal, largeImg } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === Status.RESOLVED && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img className={s.imgpoz} src={largeImg} alt={largeImg} />
          </Modal>
        )}
        <Button onClick={this.onPageClick} />
        <ToastContainer />
      </div>
    );
  }
}
