"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

function Logo() {
  const [name, setName] = useState("Guest (not signed in)");
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
