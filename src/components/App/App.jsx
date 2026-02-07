// React Imports
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// Components
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile";
import PokePage from "../PokePage/PokePage.jsx";
import MovePage from "../MovePage/MovePage.jsx";
import BerryPage from "../BerryPage/BerryPage.jsx";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import LoginModal from "../LoginModal/LoginModal";
import Footer from "../Footer/Footer";

// Utils, Constants, etc.
import { LikesProvider } from "../../contexts/LikeContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import * as auth from "../../utils/auth.js";
import * as api from "../../utils/PokeApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // dont forget to change back to false before submitting
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    auth
      .checkTokenValidity(token)
      .then((res) => {
        setUserData(res);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        console.error(error);
      });
  }, []);

  const firstLetterCapital = (string) => {
    if (typeof string !== "string" || string.length === 0) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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

  const openPokeModal = (card) => {
    setActiveModal("pokemodal");
    setSelectedCard(card);
  };

  const openMoveModal = (card) => {
    setActiveModal("movemodal");
    setSelectedCard(card);
  };

  const openBerryModal = (card) => {
    setActiveModal("berrymodal");
    setSelectedCard(card);
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
        auth.checkTokenValidity(res.token).then((res) => {
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

  const openEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfile = ({ name, avatar, token }) => {
    auth
      .updateUserProfile(userData._id, userData.email, name, avatar, token)
      .then((res) => {
        setUserData({ ...userData, name, avatar, token });
        closeActiveModal();
      })
      .catch(() => {
        console.error();
      });
  };

  useEffect(() => {
    if (activeModal) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  return (
    <LikesProvider>
      <CurrentUserContext.Provider value={userData}>
        <div className="page">
          <div className="page__content">
            <Header
              isLoggedIn={isLoggedIn}
              openRegistrationModal={openRegistrationModal}
              openSignInModal={openSignInModal}
            />
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
              <Route
                path="/"
                element={<Main firstLetterCapital={firstLetterCapital} />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      activeModal={activeModal}
                      userData={userData}
                      openPokeModal={openPokeModal}
                      openBerryModal={openBerryModal}
                      openMoveModal={openMoveModal}
                      handleEditProfile={handleEditProfile}
                      openEditProfileModal={openEditProfileModal}
                      firstLetterCapital={firstLetterCapital}
                      signOut={signOut}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pokemon"
                element={
                  <PokePage
                    firstLetterCapital={firstLetterCapital}
                    userData={userData}
                    onCardClick={openPokeModal}
                    activeModal={activeModal}
                    card={selectedCard}
                    onClose={closeActiveModal}
                    isOpen={activeModal === "pokemodal"}
                  />
                }
              />
              <Route
                path="/moves"
                element={
                  <MovePage
                    firstLetterCapital={firstLetterCapital}
                    userData={userData}
                    onCardClick={openMoveModal}
                    activeModal={activeModal}
                    card={selectedCard}
                    onClose={closeActiveModal}
                    isOpen={activeModal === "movemodal"}
                  />
                }
              />
              <Route
                path="/berries"
                element={
                  <BerryPage
                    firstLetterCapital={firstLetterCapital}
                    userData={userData}
                    onCardClick={openBerryModal}
                    activeModal={activeModal}
                    card={selectedCard}
                    onClose={closeActiveModal}
                    isOpen={activeModal === "berrymodal"}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            activeModal={activeModal}
            handleRegistration={handleRegistration}
            onClose={closeActiveModal}
            isOpen={activeModal === "register"}
          />
          <LoginModal
            activeModal={activeModal}
            handleSignIn={handleSignIn}
            onClose={closeActiveModal}
            isOpen={activeModal === "signin"}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            handleEditProfile={handleEditProfile}
          />
        </div>
      </CurrentUserContext.Provider>
    </LikesProvider>
  );
}

export default App;
