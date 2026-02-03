import { NavLink } from "react-router-dom";
import pokemon from "../../assets/ninetales.png";

function UserAvatar() {
  return (
    <div className="header__user-container">
      <NavLink className="header__nav-link" to="/profile">
        <p className="header__username">Placeholder Name</p>
        <img src={pokemon} className="header__avatar" />
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
