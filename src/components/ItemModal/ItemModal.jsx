import "./ItemModal.css";
import moveImg from "../../assets/TM-disc.png";
import { useState, useEffect } from "react";
import { useLikes } from "../../contexts/LikeContext";

function ItemModal({ isOpen, onClose, card, firstLetterCapital }) {
  const [moveDetails, setMoveDetails] = useState([]);
  const [contestDetails, setContestDetails] = useState({
    type: "",
    effect: "",
    pokemon: [],
  });
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

  // PokeModal start
  if (card?.moves) {
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
  // end of PokeModal

  // MoveModal start
  if (card && card.contest_type && card.contest_type.name) {
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

            <ul className="movemodal__list">
              <p className="movemodal__list-title">Who can learn this move?</p>
              {contestDetails.pokemon?.map((poke) => (
                <li key={poke} className="movemodal__list-item">
                  {firstLetterCapital(poke) || "Pokemon List Item Placeholder"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  // end of MoveModal

  // BerryModal start
  if (card && card.flavors) {
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
  // end of BerryModal
}

export default ItemModal;
