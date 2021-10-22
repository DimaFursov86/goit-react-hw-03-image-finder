import PropTypes from "prop-types";

export default function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      Load More
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};