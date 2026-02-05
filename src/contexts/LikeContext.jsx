import React, { createContext, useContext, useState, useEffect } from "react";

const LikesContext = createContext();

export function LikesProvider({ children }) {
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("likes") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  const toggleLike = async (id, itemData) => {
    // optimistic update
    setLikes((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });

    // persist to API (optional) - do not block UI
    try {
      // await api.like(id) or api.unlike(id) depending on prev state
    } catch (err) {
      // revert on error (simple strategy: re-read localStorage or flip back)
      setLikes((prev) => {
        const next = { ...prev };
        // naive revert: flip
        if (next[id]) delete next[id];
        else next[id] = true;
        return next;
      });
    }
  };

  return (
    <LikesContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  return useContext(LikesContext);
}