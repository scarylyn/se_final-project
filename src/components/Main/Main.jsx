// the main component of the main page
import "./Main.css";
import NavBar from "../NavBar/NavBar";
import pokemon from "../../assets/ninetales.png";

function Main() {
  return (
    <div className="home">
      <NavBar />
      <div className="home__landing">
        <h1 className="home__welcome">Welcome to the ContestDex!</h1>
        <h2 className="home__poke">The Pokemon of the day is...</h2>
        <img
          src={pokemon}
          alt="the pokemon of the day"
          className="home__poke-img"
        ></img>
        <h2 className="home__poke home__poke-btm">Ninetales!</h2>
      </div>
    </div>
  );
}

export default Main;
