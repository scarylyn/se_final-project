import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "../PokePage/PokePage.css";
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";
import ItemCard from "../ItemCard/ItemCard";
import Preloader from "../Preloader/Preloader";
import PokeModal from "../PokeModal/PokeModal";
import MoveModal from "../MoveModal/MoveModal";
import BerryModal from "../BerryModal/BerryModal";

// trying to get the modals to appear on the page...may have to make special favorites modal
// also, some images aren't showing up on the page. fix that

function Profile({
  onCardClick,
  activeModal,
  card,
  onClose,
  firstLetterCapital,
  openPokeModal,
  openBerryModal,
  openMoveModal,
}) {
  const favorites = JSON.parse(localStorage.getItem("likes"));
  const [loading, setLoading] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

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
                  key={item.id}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
          </ul>
        )}
      </div>
      {card?.name && (
        <PokeModal
          onClick={openPokeModal}
          firstLetterCapital={firstLetterCapital}
          activeModal={activeModal}
          card={card}
          onClose={onClose}
          isOpen={activeModal === "pokemodal"}
        />
      )}
      {card?.name && (
        <MoveModal
          onClick={openMoveModal}
          firstLetterCapital={firstLetterCapital}
          activeModal={activeModal}
          card={card}
          onClose={onClose}
          isOpen={activeModal === "movemodal"}
        />
      )}
      {card?.name && (
        <BerryModal
          onClick={openBerryModal}
          firstLetterCapital={firstLetterCapital}
          activeModal={activeModal}
          card={card}
          onClose={onClose}
          isOpen={activeModal === "berrymodal"}
        />
      )}
    </section>
  );
}

Profile.propTypes = {
  firstLetterCapital: PropTypes.func,
};

export default Profile;
