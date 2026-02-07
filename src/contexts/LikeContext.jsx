import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const LikesContext = createContext();

// likes system needs to be adjusted to add the entire item as a like object, not just the names of items

export function LikesProvider({ children }) {
  const [likes, setLikes] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("likes") || "[]");
      if (!Array.isArray(stored)) {
        return [];
      }
      return stored;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const toggleLike = async (name, itemData) => {
    setLikes((prev) => {
      const itemExists = prev.find((item) => item.name === name);

      if (itemExists) {
        return prev.filter((item) => item.name !== name);
      } else {
        const likeObject = {
          name: itemData.name,
          sprites: itemData.sprites?.front_default,
        };
        console.log("Item Liked:", likeObject);
        return [...prev, likeObject];
      }
    });

    // persist to API
    try {
      // await api.like(itemData) or api.unlike(name)
    } catch (err) {
      setLikes((prev) => {
        const itemExists = prev.find((item) => item.name === name);

        if (itemExists) {
          return [
            ...prev,
            { name: itemData.name, sprites: itemData.sprites.front_default },
          ];
        } else {
          return prev.filter((item) => item.name !== name);
        }
      });
    }
  };

  return (
    <LikesContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
}

LikesProvider.propTypes = {
  children: PropTypes.node,
};

export function useLikes() {
  return useContext(LikesContext);
}
