"use client";

import { useState } from "react";
import { UserContext } from "../context";

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState({});
  const updateUser = async () => {
    const response = await fetch(
      "https://blog-backend-qgng.onrender.com/api/me",
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setUserData(data["message"]);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
