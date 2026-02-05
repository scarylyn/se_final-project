import { useState, useEffect } from "react";
import { getPokemon, filteredByType } from "../../utils/api";
import "./PokePage.css";
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";
import ItemCard from "../ItemCard/ItemCard";
import PokeModal from "../PokeModal/PokeModal";

function PokePage({
  onCardClick,
  handleCardLike,
  activeModal,
  card,
  onClose,
  firstLetterCapital,
}) {
  const [storedPokes, setStoredPokes] = useState([]);
  const [pokeCards, setPokeCards] = useState([]);
  const [displayCount, setDisplayCount] = useState(28);
  const [filterActive, setFilterActive] = useState(false);

  const filterColors = {
    Bug: "#A7B723",
    Normal: "#AAA67F",
    Ground: "#DEC16B",
    Fighting: "#C12239",
    Flying: "#A891EC",
    Poison: "#A43E9E",
    Rock: "#B69E31",
    Ghost: "#70559B",
    Steel: "#B7B9D0",
    Fire: "#F57D31",
    Water: "#6493EB",
    Grass: "#74CB48",
    Electric: "#F9CF30",
    Psychic: "#FB5584",
    Dragon: "#7037FF",
    Dark: "#75574C",
    Ice: "#9AD6DF",
  };

  const handleFilterClick = (filterType) => {
    setFilterActive(true);
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
        <button className="pokepage__more" onClick={loadMorePokes}>
          Load more
        </button>
      </div>
      {card?.name && (
        <PokeModal
          firstLetterCapital={firstLetterCapital}
          activeModal={activeModal}
          card={card}
          onClose={onClose}
          isOpen={activeModal === "pokemodal"}
        />
      )}
    </section>
  );
}

export default PokePage;
