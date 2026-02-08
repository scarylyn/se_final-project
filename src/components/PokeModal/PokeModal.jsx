import "./PokeModal.css";
import "../ItemModal/ItemModal.css";
import { useState, useEffect } from "react";
import { useLikes } from "../../contexts/LikeContext";
import PropTypes from "prop-types";

function PokeModal({ isOpen, onClose, card, firstLetterCapital }) {
  const [moveDetails, setMoveDetails] = useState([]);
  const { likes, toggleLike } = useLikes();
  const isLiked = likes.some((likedItem) => {
    if (likedItem.name === card.name) {
      return true;
    }
  });

  useEffect(() => {
    if (card?.moves) {
      const movePromises = card.moves.map((item) =>
        fetch(item.move.url)
          .then((response) => response.json())
          .then((moveData) => {
            if (moveData.contest_effect?.url) {
              return fetch(moveData.contest_effect.url)
                .then((response) => response.json())
                .then((contestData) => ({
                  ...moveData,
                  contest_effect: contestData,
                }));
            }
            return moveData;
          }),
      );
      Promise.all(movePromises).then((data) => setMoveDetails(data));
    }
  }, [card]);

  return (
    <div
      onClick={onClose}
      className={`modal ${isOpen ? "modal__opened " : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pokemodal__content modal__content"
      >
        <button
          onClick={() => toggleLike(card.name, card)}
          type="button"
          className={`modal__like-button ${
            isLiked ? "modal__like-button_active" : ""
          }`}
        />
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_preview"
        />
        <img
          className="modal__image"
          src={card.sprites?.front_default}
          alt={card.name}
        />
        <div className="pokemodal__footer">
          <h2 className="modal__caption">{firstLetterCapital(card.name)}</h2>
          <ul className="pokemodal__move-list">
            {moveDetails.map((move) => {
              return (
                <li key={move.id} className="pokemodal__move-item">
                  <h3 className="pokemodal__move-caption">
                    {firstLetterCapital(move.name)}
                  </h3>
                  <p className="pokemodal__move-caption">
                    <strong>Contest Type: </strong>
                    {firstLetterCapital(move.contest_type?.name)}
                  </p>
                  <p className="pokemodal__move-caption">
                    <strong>Description: </strong>
                    {
                      move.contest_effect?.effect_entries?.find(
                        (entry) => entry.language.name === "en",
                      )?.effect
                    }
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

PokeModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  firstLetterCapital: PropTypes.func,
};

export default PokeModal;
