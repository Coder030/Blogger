"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import { IoSend } from "react-icons/io5";
import Link from "next/link";
import { IoCreate } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import Logo from "../logo";
import { useRouter } from "next/navigation";
import { FaBloggerB, FaHome } from "react-icons/fa";
import Navbar from "../Navbar";

function Page() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    async function Hello() {
      const rep = await fetch("https://blog-backend-qgng.onrender.com/full");
      const data2 = await rep.json();
      setData(data2);
    }
    Hello();
  });
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <Navbar />
      <div className="search-container">
        <input
          className="input"
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="button" onClick={() => setSearchQuery("")}>
          Clear
        </button>
      </div>
      {!(filteredData.length === 0) &&
        filteredData.map((item, index) => {
          return (
            <div
              key={item.id}
              className="blogs"
              onClick={() => {
                router.push(`/${item.id}/detail`);
              }}
            >
              <p className="title">
                {index + 1}. {item.title}
              </p>
              <p className="made">made by - {item.madeBy}</p>
            </div>
          );
        })}
      {filteredData.length === 0 && (
        <>
          <p className="nb">No blogs right now...</p>
          <p className="nb2">X</p>
        </>
      )}
    </div>
  );
}

export default Page;
