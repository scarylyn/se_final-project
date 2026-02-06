import "./MovePage.css";
import "../Main/Main.css";
import "../PokePage/PokePage.css";
import { useState, useEffect } from "react";
import { getMoves } from "../../utils/PokeApi";
import { filterColors } from "../../utils/constants";
import NavBar from "../NavBar/NavBar";
import MoveModal from "../MoveModal/MoveModal";
import ItemCard from "../ItemCard/ItemCard";

function MovePage({
  onCardClick,
  activeModal,
  card,
  onClose,
  firstLetterCapital,
}) {
  const [storedMoves, setStoredMoves] = useState([]);
  const [moveCards, setMoveCards] = useState([]);
  const [displayCount, setDisplayCount] = useState(28);
  const [filterActive, setFilterActive] = useState(false);

  const handleFilterClick = (filterType) => {
    getMoves()
      .then((res) => {
        const promises = res.results.map((item) =>
          fetch(item.url).then((response) => response.json()),
        );

        return Promise.all(promises);
      })
      .then((promises) => Promise.all(promises))
      .then((detailedItems) => {
        const filteredItems = detailedItems.filter(
          (object) =>
            firstLetterCapital(object.contest_type.name) === filterType,
        );
        const displayed = filteredItems.slice(0, displayCount);
        setStoredMoves(filteredItems);
        setMoveCards(displayed);
        setFilterActive(true);
      })
      .catch(console.error);
  };

  const loadMoreMoves = () => {
    const newDisplayCount = displayCount + 28;
    if (filterActive === false) {
      setDisplayCount(newDisplayCount + 28);
      setMoveCards(storedMoves.slice(0, newDisplayCount));
    }
    if (filterActive === true) {
      setDisplayCount(newDisplayCount + 28);
      setMoveCards(storedMoves.slice(0, newDisplayCount));
    }
  };

  useEffect(() => {
    getMoves()
      .then((res) => {
        const promises = res.results.map((item) =>
          fetch(item.url).then((response) => response.json()),
        );

        return Promise.all(promises);
      })
      .then((detailedItems) => {
        const filteredItems = detailedItems.filter(
          (item) =>
            item.generation.name === "generation-i" ||
            item.generation.name === "generation-ii" ||
            item.generation.name === "generation-iii",
        );
        const displayed = filteredItems.slice(0, displayCount);
        setStoredMoves(filteredItems);
        setMoveCards(displayed);
        setFilterActive(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="home">
      <NavBar
        showFilters={true}
        filterOptions={["Cute", "Tough", "Smart", "Beauty", "Cool"]}
        filterColors={filterColors}
        onFilterClick={handleFilterClick}
      />
      <div className="home__landing">
        <ul className="pokepage__list">
          {moveCards.map((item) => {
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
        <button className="pokepage__more" onClick={loadMoreMoves}>
          Load more
        </button>
      </div>
      {card?.name && (
        <MoveModal
          firstLetterCapital={firstLetterCapital}
          activeModal={activeModal}
          card={card}
          onClose={onClose}
          isOpen={activeModal === "movemodal"}
        />
      )}
    </section>
  );
}

export default MovePage;
