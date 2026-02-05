import "./PokeModal.css";
import "../ItemModal/ItemModal.css";
import { useState, useEffect } from "react";
import { useLikes } from "../../contexts/LikeContext";

function PokeModal({ isOpen, onClose, card, firstLetterCapital }) {
  const [moveDetails, setMoveDetails] = useState([]);
  const { likes, toggleLike } = useLikes();
  const isLiked = !!likes[card.id];

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
          onClick={() => toggleLike(card.id, card)}
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
        <img className="modal__image" src={card.sprites.front_default} />
        <div className="pokemodal__footer">
          <h2 className="modal__caption">{firstLetterCapital(card.name)}</h2>
          <div className="pokemodal__moves">
            {moveDetails.map((move) => {
              return (
                <div key={move.id} className="pokemodal__move-item">
                  <h3>{firstLetterCapital(move.name)}</h3>
                  <p>
                    <strong>Contest Type: </strong>
                    {firstLetterCapital(move.contest_type?.name)}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {
                      move.contest_effect?.effect_entries?.find(
                        (entry) => entry.language.name === "en",
                      )?.effect
                    }
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeModal;
