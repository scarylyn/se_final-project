import { useEffect, useState } from "react";
import "./Main.css";
import NavBar from "../NavBar/NavBar";
import Preloader from "../Preloader/Preloader";
import { pokeOfTheDay } from "../../utils/PokeApi";

function Main({
  isLoggedIn,
  firstLetterCapital,
  activeModal,
  onClose,
  handleEditProfile,
  openEditProfileModal,
  signOut,
}) {
  const [pokeName, setPokeName] = useState(null);
  const [pokePic, setPokePic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedTime = localStorage.getItem("pokemonTimestamp");
    const storedPoke = JSON.parse(localStorage.getItem("dayPoke") || null);
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    setLoading(true);

    if (
      storedTime &&
      currentTime - storedTime <= twentyFourHours &&
      storedPoke
    ) {
      setPokeName(storedPoke.name);
      setPokePic(storedPoke.sprites.front_default);
      setLoading(false);
    } else {
      pokeOfTheDay()
        .then((res) => {
          setPokeName(res.name);
          setPokePic(res.sprites.front_default);
          localStorage.setItem("pokemonTimestamp", currentTime);
          localStorage.setItem("dayPoke", JSON.stringify(res));
          setLoading(false);
        })
        .catch(console.error);
    }
  });

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
        <h1 className="home__welcome">Welcome to the ContestDex!</h1>
        <h2 className="home__poke">The Pokemon of the day is...</h2>
        {loading ? (
          <Preloader />
        ) : (
          <img
            src={pokePic}
            alt="the pokemon of the day"
            className="home__poke-img"
          ></img>
        )}
        {loading ? (
          <h2 className="home__poke home__poke-btm">Loading Pokemon...</h2>
        ) : (
          <h2 className="home__poke home__poke-btm">
            {firstLetterCapital(pokeName)}!
          </h2>
        )}
      </div>
    </section>
  );
}

export default Main;
