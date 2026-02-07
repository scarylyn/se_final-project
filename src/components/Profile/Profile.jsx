import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../PokePage/PokePage.css";
import "../Main/Main.css";
import NavBar from "../NavBar/NavBar";
import ItemCard from "../ItemCard/ItemCard";

function Profile({
  onCardClick,
  activeModal,
  card,
  onClose,
  firstLetterCapital,
}) {
  return (
    <section className="home">
      <NavBar />
      <div className="home__landing">
        <ul className="profile__list">The favorites will go here</ul>
      </div>
    </section>
  );
}

export default Profile;
