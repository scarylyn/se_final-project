import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "../PokePage/PokePage.css";
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";
import ItemCard from "../ItemCard/ItemCard";
import Preloader from "../Preloader/Preloader";
import ItemModal from "../ItemModal/ItemModal";

// trying to get the modals to appear on the page...may have to make special favorites modal

function Profile({
  isLoggedIn,
  onCardClick,
  activeModal,
  card,
  onClose,
  handleEditProfile,
  openEditProfileModal,
  signOut,
  firstLetterCapital,
}) {
  const favorites = JSON.parse(localStorage.getItem("likes"));
  const [loading, setLoading] = useState(false);

  return (
    <section className="home">
      <NavBar
        isLoggedIn={isLoggedIn}
        activeModal={activeModal}
        openEditProfileModal={openEditProfileModal}
        onClose={onClose}
        handleEditProfile={handleEditProfile}
        signOut={signOut}
      />
      <div className="home__landing">
        <h2 className="home__welcome">Your Favorites</h2>
        {loading ? (
          <Preloader />
        ) : (
          <ul className="pokepage__list">
            {favorites.map((item) => {
              return (
                <ItemCard
                  firstLetterCapital={firstLetterCapital}
                  key={item.name}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
          </ul>
        )}
      </div>
      {card?.name && (
        <ItemModal
          firstLetterCapital={firstLetterCapital}
          activeModal={activeModal}
          card={card}
          onClose={onClose}
          isOpen={activeModal === "item-modal"}
        />
      )}
    </section>
  );
}

Profile.propTypes = {
  firstLetterCapital: PropTypes.func,
};

export default Profile;
