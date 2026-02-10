import { useLikes } from "../../contexts/LikeContext";
import PropTypes from "prop-types";
import "./ItemCard.css";
import moveImg from "../../assets/TM-disc.png";

function ItemCard({ item, onCardClick, firstLetterCapital }) {
  const { likes, toggleLike } = useLikes();
  const isLiked = likes.some((likedItem) => {
    if (likedItem.name === item.name) {
      return true;
    }
  });

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__title">
        <h2 className="card__name">{firstLetterCapital(item.name)}</h2>
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(item.name, item);
          }}
        />
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={!item.sprites ? moveImg : item.sprites.front_default}
        alt={item.name}
      />
    </li>
  );
}

ItemCard.propTypes = {
  onCardClick: PropTypes.func,
  firstLetterCapital: PropTypes.func,
};

export default ItemCard;
