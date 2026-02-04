import { useState, useEffect } from "react";
import { getPokemon } from "../../utils/api";
import "./PokePage.css";
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";
import ItemCard from "../ItemCard/ItemCard";

function PokePage({ onCardClick, handleCardLike }) {
  const [pokeCards, setPokeCards] = useState([]);

  const handleFilterClick = (filterType) => {
    console.log("Filter clicked:", filterType);
  };

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
        setPokeCards(filteredItems);
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
          {" "}
          {pokeCards.map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
              />
            );
          })}
        </ul>
        <button className="pokepage__more">Load more</button>
      </div>
    </section>
  );
}

export default PokePage;
