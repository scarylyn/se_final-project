// the main component of the main page
import "./Main.css";
import NavBar from "../NavBar/NavBar";
import pokemon from "../../assets/ninetales.png";

function Main() {
  return (
    <div>
      <NavBar />
      <div className="homepage">
        <h1>Welcome to the ContestDex!</h1>
        <h2>The Pokemon of the day is...</h2>
        <img src={pokemon}></img>
        <h2>Ninetales!</h2>
      </div>
    </div>
  );
}

export default Main;
