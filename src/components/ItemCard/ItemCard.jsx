import { useState } from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const [isLiked, setIsLiked] = useState(() => {
    const likedPokemon = JSON.parse(
      localStorage.getItem("likedPokemon") || "[]",
    );
    return Array.isArray(likedPokemon) ? likedPokemon.includes(item.id) : false;
  });

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const onCardLike = () => {
    setIsLiked(!isLiked);
    handleCardLike({ itemId: item.id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__title">
        <h2 className="card__name">{item.name}</h2>
        <button className={itemLikeButtonClassName} onClick={onCardLike} />
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
