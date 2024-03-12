"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./style.css";
import { IoCreate } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { FaBloggerB, FaHome } from "react-icons/fa";
import Logo from "../../logo";
import Navbar from "../../Navbar";

function Page({ params }) {
  const [data, setData] = useState({ title: "", body: "", madeBy: "" });
  const id = params.id;
  const [value, setValue] = useState("CourierNew");
  useEffect(() => {
    async function Hello() {
      const rep = await fetch("https://blog-backend-qgng.onrender.com/detail", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      });
      const data2 = await rep.json();
      setData(data2);
    }
    Hello();
  });
  useEffect(() => {
    setValue(value);
  });
  return (
    <div className="main">
      <Navbar />
      <p className="titleyeah">{data.title}</p>
      <select
        className="fontSelect"
        value={value}
        onChange={(e) => {
          console.log(value);

          setValue(e.target.value);
        }}
      >
        <option>CourierNew</option>
        <option>Inter</option>
        <option>GillSans</option>
        <option>TimesNewRoman</option>
      </select>
      <p className={value}>{data.body}</p>
      <p className={`made${value}`}>Made by - {data.madeBy}</p>
    </div>
  );
}

export default Page;
