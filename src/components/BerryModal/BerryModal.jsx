import "./BerryModal.css";
import "../PokeModal/PokeModal.css";
import "../ItemModal/ItemModal.css";
import { useState, useEffect } from "react";
import { useLikes } from "../../contexts/LikeContext";

function BerryModal({ firstLetterCapital, card, onClose, isOpen }) {
  const [berryInfo, setBerryInfo] = useState({
    flavors: "",
    effects: "",
  });
  const { likes, toggleLike } = useLikes();
  const isLiked = likes.some((likedItem) => {
    if (likedItem.name === card.name) {
      return true;
    }
  });

  useEffect(() => {
    if (card && card.flavors) {
      const filteredFlavors = card.flavors.map((flavors) => {
        return `${firstLetterCapital(flavors.flavor.name)}: ${flavors.potency} `;
      });
      setBerryInfo((prevState) => ({
        ...prevState,
        flavors: filteredFlavors,
      }));
    }

    if (card) {
      fetch(card.item?.url)
        .then((response) => response.json())
        .then((effectData) => {
          setBerryInfo((prevState) => ({
            ...prevState,
            effects: effectData?.effect_entries[1].short_effect,
          }));
        })
        .catch(console.error);
    }
  }, [card]);

  return (
    <div
      onClick={onClose}
      className={`modal ${isOpen ? "modal__opened " : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="movemodal__content modal__content"
      >
        <button
          onClick={() => toggleLike(card.name, card)}
          type="button"
          className={`modal__like-button ${isLiked ? "modal__like-button_active" : ""}`}
        />
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_preview"
        />
        <img
          className="berrymodal__image modal__image"
          src={card.sprites?.front_default}
          alt={card.name}
        />
        <div className="movemodal__footer modal__footer">
          <h1 className="berrymodal__caption modal__caption">
            {firstLetterCapital(card.name) || "Berry Name Placeholder"}
          </h1>
          <h2 className="berrymodal__flavors modal__caption">
            Flavors - {berryInfo?.flavors || "Berry Type Placeholder"}
          </h2>
          <p className="berrymodal__effects modal__caption">
            Effects - {berryInfo?.effects || "Berry Effect Placeholder"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BerryModal;
