import { useState, useEffect } from "react";
import { getBerries } from "../../utils/PokeApi";
import "../PokePage/PokePage.css";
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";
import ItemCard from "../ItemCard/ItemCard";
import BerryModal from "../BerryModal/BerryModal";
import { filterColors } from "../../utils/constants";

function BerryPage({
  onCardClick,
  activeModal,
  card,
  onClose,
  firstLetterCapital,
}) {
  const [storedBerries, setStoredBerries] = useState([]);
  const [berryCards, setBerryCards] = useState([]);
  const [displayCount, setDisplayCount] = useState(28);
  const [filterActive, setFilterActive] = useState(false);

  const batchFetchItems = async (berries, batchSize = 10) => {
    const results = [];
    for (let i = 0; i < berries.length; i += batchSize) {
      const batch = berries.slice(i, i + batchSize);
      const itemPromises = batch.map((berry) =>
        fetch(berry.item.url).then((res) => res.json()),
      );
      const batchResults = await Promise.all(itemPromises);
      results.push(...batchResults);
    }
    return results;
  };

  const handleFilterClick = (filterType) => {
    getBerries()
      .then((res) => {
        const promises = res.results.map((item) =>
          fetch(item.url).then((response) => response.json()),
        );
        return Promise.all(promises);
      })
      .then((promises) => Promise.all(promises))
      .then(async (detailedItems) => {
        const filteredItems = detailedItems.filter((berry) =>
          berry.flavors.some(
            (flavor) =>
              firstLetterCapital(flavor.flavor.name) === filterType &&
              flavor.potency !== 0,
          ),
        );
        const itemData = await batchFetchItems(filteredItems);
        const enrichedBerries = filteredItems.map((berry, index) => ({
          ...berry,
          sprites: {
            front_default: itemData[index].sprites.default,
          },
        }));
        const displayed = enrichedBerries.slice(0, displayCount);
        setStoredBerries(enrichedBerries);
        setBerryCards(displayed);
        setFilterActive(true);
      })
      .catch(console.error);
  };

  const loadMoreBerries = () => {
    const newDisplayCount = displayCount + 28;
    if (filterActive === false) {
      setDisplayCount(newDisplayCount + 28);
      setBerryCards(storedBerries.slice(0, newDisplayCount));
    }
    if (filterActive === true) {
      setDisplayCount(newDisplayCount + 28);
      setBerryCards(storedBerries.slice(0, newDisplayCount));
    }
  };

  useEffect(() => {
    getBerries()
      .then((res) => {
        const promises = res.results.map((item) =>
          fetch(item.url).then((response) => response.json()),
        );

        return Promise.all(promises);
      })
      .then(async (detailedItems) => {
        const itemData = await batchFetchItems(detailedItems);
        const enrichedBerries = detailedItems.map((berry, index) => ({
          ...berry,
          sprites: {
            front_default: itemData[index].sprites.default,
          },
        }));
        const displayed = enrichedBerries.slice(0, displayCount);
        setStoredBerries(enrichedBerries);
        setBerryCards(displayed);
        setFilterActive(false);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="home">
      <NavBar
        showFilters={true}
        filterOptions={["Sweet", "Sour", "Bitter", "Dry", "Spicy"]}
        filterColors={filterColors}
        onFilterClick={handleFilterClick}
      />
      <div className="home__landing">
        <ul className="pokepage__list">
          {berryCards.map((item) => {
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
        <button className="pokepage__more" onClick={loadMoreBerries}>
          Load more
        </button>
      </div>
      {card?.name && (
        <BerryModal
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

export default BerryPage;
