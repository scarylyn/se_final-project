// responsible for the navigation menu
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="nav__btn-bar">
        <button className="nav__btn">Pokemon</button>
        <button className="nav__btn">Moves</button>
        <button className="nav__btn">Berries</button>
        {/* <button className="nav__btn">Go to Homepage</button> */}
      </div>
    </div>
  );
}

export default NavBar;
