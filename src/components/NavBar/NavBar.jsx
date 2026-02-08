import "./NavBar.css";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function NavBar({
  isLoggedIn,
  showFilters,
  filterOptions,
  onFilterClick,
  filterColors,
  activeModal,
  onClose,
  openEditProfileModal,
  signOut,
}) {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="nav__btn-bar">
        <NavLink to="/pokemon">
          <button className="nav__btn">Pokemon</button>
        </NavLink>
        {showFilters && location.pathname === "/pokemon" && (
          <div className="nav__filter-buttons">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterClick(filter)}
                className="nav__filter-btn"
                style={{ backgroundColor: filterColors[filter] }}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
        <NavLink to="/moves">
          <button className="nav__btn">Moves</button>
        </NavLink>
        {showFilters && location.pathname === "/moves" && (
          <div className="nav__filter-buttons">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterClick(filter)}
                className="nav__filter-btn"
                style={{ backgroundColor: filterColors[filter] }}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
        <NavLink to="/berries">
          <button className="nav__btn">Berries</button>
        </NavLink>
        {showFilters && location.pathname === "/berries" && (
          <div className="nav__filter-buttons">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterClick(filter)}
                className="nav__filter-btn"
                style={{ backgroundColor: filterColors[filter] }}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
        <div className="nav__profile-btns">
          {(isLoggedIn && location.pathname === "/") ||
          location.pathname === "/pokemon" ||
          location.pathname === "/moves" ||
          location.pathname === "/berries" ? (
            <NavLink to="/profile">
              <button className="nav__btn nav__profile-btns-edit">
                Go to Profile
              </button>
            </NavLink>
          ) : (
            <button
              isLoggedIn={isLoggedIn}
              onClose={onClose}
              isOpen={activeModal === "edit-profile"}
              onClick={openEditProfileModal}
              className="nav__btn nav__profile-btns-edit"
            >
              Edit Profile
            </button>
          )}
          {isLoggedIn ? (
            <button
              className="nav__btn nav__profile-btns-edit"
              onClick={signOut}
            >
              Log Out
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  onFilterClick: PropTypes.func,
};

export default NavBar;
