import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "../PokePage/PokePage.css";
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";
import ItemCard from "../ItemCard/ItemCard";
import Preloader from "../Preloader/Preloader";
import FavesModal from "../ItemModal/ItemModal";

// trying to get the modals to appear on the page...may have to make special favorites modal

function Profile({
  onCardClick,
  activeModal,
  card,
  onClose,
  firstLetterCapital,
}) {
  const favorites = JSON.parse(localStorage.getItem("likes"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Favorites:", favorites);
  }, []);

  return (
    <section className="home">
      <NavBar />
      <div className="home__landing">
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
        <FavesModal
          firstLetterCapital={firstLetterCapital}
          activeModal={activeModal}
          card={card}
          onClose={onClose}
          isOpen={activeModal === "favesmodal"}
        />
      )}
    </section>
  );
}

Profile.propTypes = {
  firstLetterCapital: PropTypes.func,
};

export default Profile;
