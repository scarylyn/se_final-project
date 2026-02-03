// React Imports
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// Components
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import PokePage from "../PokePage/PokePage.jsx";
import MovePage from "../MovePage/MovePage.jsx";
import BerryPage from "../BerryPage/BerryPage.jsx";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import PokeModal from "../PokeModal/PokeModal";
import MoveModal from "../MoveModal/MoveModal";
import BerryModal from "../BerryModal/BerryModal";
import Footer from "../Footer/Footer";

// Utils, Constants, etc.
import * as auth from "../../utils/auth.js";
import * as api from "../../utils/api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    auth
      .checkTokenValidity()
      .then((res) => {
        setUserData(res);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        console.error(error);
      });
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      closeActiveModal();
    }
  };

  const handleCardLike = ({ itemId, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike({ itemId, isLiked, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike({ itemId, isLiked, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const openRegistrationModal = () => {
    setActiveModal("register");
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register(email, password, name, avatar)
      .then(() => {
        closeActiveModal();
        handleSignIn({ email, password });
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  };

  const openSignInModal = () => {
    setActiveModal("signin");
  };

  const handleSignIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        auth.checkTokenValidity().then((res) => {
          setUserData(res);
          setIsLoggedIn(true);
          console.log("You've been signed in");
          navigate("/profile");
          closeActiveModal();
        });
      })
      .catch(console.error);
  };

  const signOut = () => {
    console.log("You've been signed out");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
    setUserData("");
  };

  return (
    <div className="page">
      <div className="page-content">
        <Header />
        <Routes>
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/profile" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/" element={<Main />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/pokemon" element={<PokePage />} />
          <Route path="/moves" element={<MovePage />} />
          <Route path="/berries" element={<BerryPage />} />
        </Routes>
        <Footer />
      </div>
      {/* <RegisterModal />
      <LoginModal />
      <PokeModal />
      <MoveModal />
      <BerryModal /> */}
    </div>
  );
}

export default App;
