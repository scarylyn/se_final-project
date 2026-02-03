import { NavLink } from "react-router-dom";

function UserAvatar() {
  return (
    <div className="header__user-container">
      <NavLink className="header__nav-link" to="/profile">
        <p className="header__username">Placeholder Name</p>
        {/* {currentUser.avatar ? (
          <img className="header__avatar" />
        ) : (
          <div className="header__avatar-placeholder">P</div>
        )} */}
      </NavLink>
    </div>
  );
  // return (
  //   <div className="header__user-container">
  //     <button className="header__sign-up-btn" onClick={openRegistrationModal}>
  //       Sign Up
  //     </button>
  //     <button className="header__sign-in-btn" onClick={openSignInModal}>
  //       Sign In
  //     </button>
  //   </div>
  // );
}

export default UserAvatar;
