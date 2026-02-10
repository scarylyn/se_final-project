import "./Header.css";
import { NavLink } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar";
import logo from "../../assets/pokeball-logo.svg";
import ribbon from "../../assets/contestmemoryribbon2.png";

function Header({ isLoggedIn, openRegistrationModal, openSignInModal }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">
      <div className="header__container">
        <img
          src={ribbon}
          alt="contest memory ribbon"
          className="header__ribbon"
        ></img>
        <NavLink className="header__container" to="/">
          <img src={logo} alt="header logo" className="header__logo"></img>
          <h1 className="header__title">ContestDex</h1>
        </NavLink>
        <UserAvatar
          value={currentUser}
          isLoggedIn={isLoggedIn}
          openRegistrationModal={openRegistrationModal}
          openSignInModal={openSignInModal}
        />
      </div>
    </header>
  );
}
export default Header;
