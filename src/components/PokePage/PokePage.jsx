import { useState, useEffect } from "react";
import { getPokemon, filteredByType } from "../../utils/PokeApi";
import PropTypes from "prop-types";
import "./PokePage.css";
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../ItemModal/ItemModal";
import Preloader from "../Preloader/Preloader";
import { filterColors } from "../../utils/constants";

function PokePage({
  onCardClick,
  activeModal,
  card,
  onClose,
  firstLetterCapital,
}) {
  const [storedPokes, setStoredPokes] = useState([]);
  const [pokeCards, setPokeCards] = useState([]);
  const [displayCount, setDisplayCount] = useState(28);
  const [filterActive, setFilterActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFilterClick = (filterType) => {
    setFilterActive(true);
    setLoading(true);
    filteredByType(filterType)
      .then((res) =>
        res.pokemon.map((res) =>
          fetch(res.pokemon.url).then((response) => response.json()),
        ),
      )
      .then((promises) => Promise.all(promises))
      .then((detailedItems) => {
        const filteredItems = detailedItems
          .filter((item) => item.id <= 386)
          .slice(0, displayCount);
        setStoredPokes(filteredItems);
        setPokeCards(filteredItems);
        setLoading(false);
      })
      .catch(console.error);
  };

  const loadMorePokes = () => {
    const newDisplayCount = displayCount + 28;
    if (filterActive === false) {
      setDisplayCount(newDisplayCount + 28);
      setPokeCards(storedPokes.slice(0, newDisplayCount));
    }
    if (filterActive === true) {
      setDisplayCount(newDisplayCount + 28);
      setPokeCards(storedPokes.slice(0, newDisplayCount));
    }
  };

  useEffect(() => {
    getPokemon()
      .then((res) => {
        setLoading(true);
        const promises = res.results.map((item) =>
          fetch(item.url).then((response) => response.json()),
        );

        return Promise.all(promises);
      })
      .then((detailedItems) => {
        const filteredItems = detailedItems.filter((item) => item.id <= 386);
        const displayed = filteredItems.slice(0, displayCount);
        setStoredPokes(filteredItems);
        setPokeCards(displayed);
        setFilterActive(false);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="home">
      <NavBar
        showFilters={true}
        filterOptions={[
          "Bug",
          "Normal",
          "Ground",
          "Fighting",
          "Flying",
          "Poison",
          "Rock",
          "Ghost",
          "Steel",
          "Fire",
          "Water",
          "Grass",
          "Electric",
          "Psychic",
          "Dragon",
          "Dark",
          "Ice",
        ]}
        filterColors={filterColors}
        onFilterClick={handleFilterClick}
      />
      <div className="home__landing">
        {loading ? (
          <Preloader />
        ) : (
          <ul className="pokepage__list">
            {pokeCards.map((item) => {
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
        {loading ? (
          <div></div>
        ) : (
          <button className="pokepage__more" onClick={loadMorePokes}>
            Load more
          </button>
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

PokePage.propTypes = {
  onCardClick: PropTypes.func,
  activeModal: PropTypes.node,
  onClose: PropTypes.func,
  firstLetterCapital: PropTypes.func,
};

export default PokePage;
