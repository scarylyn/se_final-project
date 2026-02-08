import { NavLink } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import pokemon from "../../assets/ninetales.png";

function UserAvatar({ isLoggedIn, openRegistrationModal, openSignInModal }) {
  const currentUser = useContext(CurrentUserContext);

  if (isLoggedIn && currentUser) {
    const firstLetter = currentUser.name.charAt(0).toUpperCase();

    return (
      <div className="header__user-container">
        <NavLink className="header__nav-link" to="/profile">
          <p className="header__username">{currentUser.name}</p>
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={firstLetter}
              className="header__avatar"
            />
          ) : (
            <div className="header__avatar-placeholder">{firstLetter}</div>
          )}
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="header__user-container">
        <button className="header__login" onClick={openRegistrationModal}>
          Sign Up
        </button>
        <button className="header__login" onClick={openSignInModal}>
          Sign In
        </button>
      </div>
    );
  }
}

UserAvatar.propTypes = {
  isLoggedIn: PropTypes.bool,
  openRegistrationModal: PropTypes.func,
  openSignInModal: PropTypes.func,
};

export default UserAvatar;
