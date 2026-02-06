import "./MoveModal.css";
import "../PokeModal/PokeModal.css";
import "../ItemModal/ItemModal.css";
import moveImg from "../../assets/TM-disc.png";
import { useState, useEffect } from "react";
import { useLikes } from "../../contexts/LikeContext";

function MoveModal({ firstLetterCapital, card, onClose, isOpen }) {
  const [contestDetails, setContestDetails] = useState({
    type: "",
    effect: "",
    pokemon: [],
  });
  const { likes, toggleLike } = useLikes();
  const isLiked = !!likes[card.name];

  useEffect(() => {
    if (card && card.contest_type && card.contest_type.name) {
      fetch(card.contest_type.url)
        .then((response) => response.json())
        .then((effectData) =>
          setContestDetails((prevState) => ({
            ...prevState,
            type: effectData.name,
          })),
        )
        .catch(console.error);

      if (card && card.contest_effect && card.contest_effect.url) {
        fetch(card.contest_effect.url)
          .then((response) => response.json())
          .then((effectData) =>
            setContestDetails((prevState) => ({
              ...prevState,
              effect: effectData.flavor_text_entries[1].flavor_text,
            })),
          )
          .catch(console.error);
      }

      if (card && card.learned_by_pokemon) {
        const promises = card.learned_by_pokemon.map((item) =>
          fetch(item.url).then((res) => res.json()),
        );
        Promise.all(promises)
          .then((results) =>
            setContestDetails((prev) => ({
              ...prev,
              pokemon: results
                .filter((res) => res.id && res.id <= 386)
                .map((res) => res.name),
            })),
          )
          .catch(console.error);
      }
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
          className="movemodal__image modal__image"
          src={moveImg}
          alt={card.name}
        />
        <div className="movemodal__footer modal__footer">
          <h1 className="movemodal__title modal__caption">
            {firstLetterCapital(card.name) || "Move Name Placeholder"}
          </h1>
          <h2 className="movemodal__caption">
            {firstLetterCapital(contestDetails?.type) ||
              "Contest Type Placeholder"}
          </h2>
          <h3 className="movemodal__caption">
            {firstLetterCapital(contestDetails?.effect) ||
              "Contest effect Placeholder"}
          </h3>

          <div className="movemodal__list">
            {contestDetails.pokemon?.map((poke) => (
              <div key={poke} className="movemodal__list-item">
                {firstLetterCapital(poke) || "Pokemon List Item Placeholder"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoveModal;
