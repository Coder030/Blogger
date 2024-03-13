"use client";

import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context";
import "./style.css";

function Logo() {
  const [name, setName] = useState("Guest (not signed in)");
  // console.log(useContext(UserContext));
  // const { userData, setUserData, updateUser } = useContext(UserContext);
  // console.log(userData);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://blog-backend-qgng.onrender.com/api/me",
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data["message"] === "nvt") {
        return null;
      } else {
        setName(data["message"]["username"]);
      }
    };
    fetchData();
  });
  return (
    <>
      <button className="link2">{name}</button>
    </>
  );
}

export default Logo;
