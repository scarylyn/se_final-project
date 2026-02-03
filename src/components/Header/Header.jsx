// the component that renders the site header
import { NavLink } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar";

function Header() {
  return (
    <header className="header">
      <NavLink to="/">
        <img alt="header logo" className="header-logo"></img>
        <h1>ContestDex</h1>
      </NavLink>
      <UserAvatar />
    </header>
  );
}
export default Header;
