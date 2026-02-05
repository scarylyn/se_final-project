import { useState } from "react";
import { useLikes } from "../../contexts/LikeContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, firstLetterCapital }) {
  const { likes, toggleLike } = useLikes();
  const isLiked = !!likes[item.id];

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
            toggleLike(item.id, item);
          }}
        />
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.sprites.front_default}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
