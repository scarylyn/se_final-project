import "./Main.css";
import NavBar from "../NavBar/NavBar";
import { pokeOfTheDay } from "../../utils/PokeApi";
import { useEffect, useState } from "react";

function Main({ firstLetterCapital }) {
  const [pokeName, setPokeName] = useState(null);
  const [pokePic, setPokePic] = useState(null);

  useEffect(() => {
    const storedTime = localStorage.getItem("pokemonTimestamp");
    const storedPoke = JSON.parse(localStorage.getItem("dayPoke") || null);
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (
      storedTime &&
      currentTime - storedTime <= twentyFourHours &&
      storedPoke
    ) {
      setPokeName(storedPoke.name);
      setPokePic(storedPoke.sprites.front_default);
    } else {
      pokeOfTheDay()
        .then((res) => {
          setPokeName(res.name);
          setPokePic(res.sprites.front_default);
          localStorage.setItem("pokemonTimestamp", currentTime);
          localStorage.setItem("dayPoke", JSON.stringify(res));
        })
        .catch(console.error);
    }
  });

  return (
    <section className="home">
      <NavBar />
      <div className="home__landing">
        <h1 className="home__welcome">Welcome to the ContestDex!</h1>
        <h2 className="home__poke">The Pokemon of the day is...</h2>
        <img
          src={pokePic}
          alt="the pokemon of the day"
          className="home__poke-img"
        ></img>
        <h2 className="home__poke home__poke-btm">
          {firstLetterCapital(pokeName)}!
        </h2>
      </div>
    </section>
  );
}

export default Main;
