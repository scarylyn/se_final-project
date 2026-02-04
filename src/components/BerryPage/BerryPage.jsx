// a list of berry names in alphabetical order, when clicked a modal appears
// each page loads the first 21 of its corresponding item, with a "show more" button at the bottom
// that loads the next 21 items when clicked
// each modal has a clickable heart next to it, the click action will add the item to the user's favorites
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";

function BerryPage() {
  return (
    <section className="berrypage">
      <NavBar />
      <div className="home__landing">
        <p>This is the BerryPage placeholder</p>
      </div>
    </section>
  );
}

export default BerryPage;
