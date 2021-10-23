import { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import serviceAPI from "../src/servicesAPI";
import Button from "./components/Button";
import Modal from "./components/Modal";
import s from "../src/App.module.scss";
import "modern-normalize/modern-normalize.css";
import Loaders from "./components/Loader";

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
      this.setState({ images: [], page: 1, status: Status.PENDING });
      console.log(page);
      console.log(this.state.images);
      console.log(prevName);
      console.log(text);
      if (page === 1) {
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
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
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
      <div className={s.box}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === Status.RESOLVED && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img className={s.imgpoz} src={largeImg} alt={largeImg} />
          </Modal>
        )}
        {status === Status.PENDING && <Loaders />}
        {status === Status.REJECTED && <h2>The request failed</h2>}
        {status === Status.RESOLVED && images.length !== 0 && (
          <Button onClick={this.onPageClick} />
        )}
      </div>
    );
  }
}
