// React Imports
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// Components
import "../../index.css";
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
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx"; // user context not actually implemented, but here for future backend implementation
import * as auth from "../../utils/auth.js";
import * as api from "../../utils/PokeApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

// every commented about block from here on out is saved info for the backend interactions (if I connect a backend)
function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const userExists = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userExists) {
      setUserData(userExists);
      setIsLoggedIn(true);
    }
    // const token = localStorage.getItem("jwt");
    // if (!token) {
    //   return;
    // }

    // auth
    //   .checkTokenValidity(token)
    //   .then((res) => {
    //     setUserData(res);
    //     setIsLoggedIn(true);
    //   })
    //   .catch((error) => {
    //     setIsLoggedIn(false);
    //     console.error(error);
    //   });
  }, []);

  const firstLetterCapital = (string) => {
    if (typeof string !== "string" || string.length === 0) {
      return "";
    } else {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("item-modal");
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

  const openRegistrationModal = () => {
    setActiveModal("register");
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    const newUser = {
      email: email,
      password: password,
      name: name,
      avatar: avatar,
    };

    if (newUser === userExists) {
      return console.log("User already exists");
    }
    if (newUser !== userExists) {
      localStorage.setItem("user", JSON.stringify(newUser));
      console.log("Welcome, new user,", newUser.name, "!");
      setUserData(newUser);
      closeActiveModal();
      setIsLoggedIn(true);
    }
    // auth
    //   .register(email, password, name, avatar)
    //   .then(() => {
    //     closeActiveModal();
    //     handleSignIn({ email, password });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     return;
    //   });
  };

  const openSignInModal = () => {
    setActiveModal("signin");
  };

  const handleSignIn = ({ email, password }) => {
    if (userExists === null) {
      console.log("No user found, try registering!");
      return;
    }

    if (email !== userExists.email && password !== userExists.password) {
      console.log("Login failed, try again");
      return;
    }

    if (email === userExists.email && password === userExists.password) {
      setUserData(userExists);
      setIsLoggedIn(true);
      console.log("Welcome back,", userExists.name, "!");
      navigate("/profile");
      closeActiveModal();
    }

    // if (!email || !password) {
    //   return;
    // }
    // auth
    //   .login(email, password)
    //   .then((res) => {
    //     localStorage.setItem("jwt", res.token);
    //     auth.checkTokenValidity(res.token).then((res) => {
    //       setUserData(res);
    //       setIsLoggedIn(true);
    //       console.log("You've been signed in");
    //       navigate("/profile");
    //       closeActiveModal();
    //     });
    //   })
    //   .catch(console.error);
  };

  const signOut = () => {
    console.log("You've been signed out");
    setIsLoggedIn(false);
    navigate("/");
  };

  const openEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfile = ({ name, avatar }) => {
    if (!userExists) {
      closeActiveModal();
      return;
    } else {
      const newInfo = { ...userExists, name: name, avatar: avatar };
      const setInfo = localStorage.setItem("user", JSON.stringify(newInfo));
      closeActiveModal();
      setIsLoggedIn(true);
      setUserData(setInfo);
    }
    // auth
    //   .updateUserProfile(userData._id, userData.email, name, avatar, token)
    //   .then((res) => {
    //     setUserData({ ...userData, name, avatar, token });
    //     closeActiveModal();
    //   })
    //   .catch(() => {
    //     console.error();
    //   });
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
              userData={userData}
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
                element={
                  <Main
                    userData={userData}
                    isLoggedIn={isLoggedIn}
                    firstLetterCapital={firstLetterCapital}
                    activeModal={activeModal}
                    onClose={closeActiveModal}
                    handleEditProfile={handleEditProfile}
                    openEditProfileModal={openEditProfileModal}
                    signOut={signOut}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      isLoggedIn={isLoggedIn}
                      userData={userData}
                      activeModal={activeModal}
                      card={selectedCard}
                      onCardClick={handleCardClick}
                      onClose={closeActiveModal}
                      handleEditProfile={handleEditProfile}
                      openEditProfileModal={openEditProfileModal}
                      firstLetterCapital={firstLetterCapital}
                      signOut={signOut}
                      isOpen={activeModal === "item-modal"}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pokemon"
                element={
                  <PokePage
                    isLoggedIn={isLoggedIn}
                    firstLetterCapital={firstLetterCapital}
                    userData={userData}
                    onCardClick={handleCardClick}
                    activeModal={activeModal}
                    card={selectedCard}
                    onClose={closeActiveModal}
                    isOpen={activeModal === "item-modal"}
                  />
                }
              />
              <Route
                path="/moves"
                element={
                  <MovePage
                    isLoggedIn={isLoggedIn}
                    firstLetterCapital={firstLetterCapital}
                    userData={userData}
                    onCardClick={handleCardClick}
                    activeModal={activeModal}
                    card={selectedCard}
                    onClose={closeActiveModal}
                    isOpen={activeModal === "item-modal"}
                  />
                }
              />
              <Route
                path="/berries"
                element={
                  <BerryPage
                    isLoggedIn={isLoggedIn}
                    firstLetterCapital={firstLetterCapital}
                    userData={userData}
                    onCardClick={handleCardClick}
                    activeModal={activeModal}
                    card={selectedCard}
                    onClose={closeActiveModal}
                    isOpen={activeModal === "item-modal"}
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
            userData={userData}
            activeModal={activeModal}
            handleSignIn={handleSignIn}
            onClose={closeActiveModal}
            isOpen={activeModal === "signin"}
          />
          <EditProfileModal
            userData={userData}
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
