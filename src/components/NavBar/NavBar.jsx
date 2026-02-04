import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar({ showFilters, filterOptions, onFilterClick, filterColors }) {
  return (
    <div className="navbar">
      <div className="nav__btn-bar">
        <NavLink to="/pokemon">
          <button className="nav__btn">Pokemon</button>
        </NavLink>
        {showFilters && (
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
        <NavLink to="/berries">
          <button className="nav__btn">Berries</button>
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
