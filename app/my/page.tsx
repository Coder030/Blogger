"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./style.css";
import { IoCreate } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import Logo from "../logo";
import { FaHome, FaLock } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Navbar from "../Navbar";

function Page() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [nvt, setNvt] = useState(false);
  const [main, setMain] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        setNvt(true);
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      } else {
        setNvt(false);
        setId(data["message"]["id"]);
      }
    };
    fetchData();
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://blog-backend-qgng.onrender.com/api/my",
        {
          method: "POST",
          body: JSON.stringify({ id: id }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setMain(data);
    };
    if (!nvt && id) {
      fetchData();
    }
  });
  const filteredData = main.filter(
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
      {!nvt && (
        <>
          <h1 className="itIs">My blogs</h1>
          {filteredData.length === 0 && (
            <>
              <p className="nb">No blogs right now...</p>
              <p className="nb2">X</p>
            </>
          )}
          {!(filteredData.length === 0) &&
            filteredData.map((item, index) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="blogs2"
                    onClick={() => {
                      router.push(`/${item.id}/detail`);
                    }}
                  >
                    <p className="title2">
                      {index + 1}. {item.title}
                    </p>
                    <p className="made2">made by - {item.madeBy}</p>
                  </div>
                  <button
                    className="del2"
                    onClick={async () => {
                      const id = item.id;
                      await fetch(
                        `https://blog-backend-qgng.onrender.com/api/del/${id}`,
                        {
                          method: "DELETE",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                        }
                      );
                    }}
                  >
                    <RiDeleteBin5Fill />
                  </button>
                  <button
                    className="del3"
                    onClick={async () => {
                      router.push(`/edit/${item.id}`);
                    }}
                  >
                    <FaEdit />
                  </button>
                </>
              );
            })}
        </>
      )}
      {nvt && (
        <>
          {" "}
          <h1 style={{ textAlign: "center", marginTop: "70px" }}>
            Please sign in / sign up first 😃
          </h1>
          <p className="ima">
            <FaLock />
          </p>
        </>
      )}
    </div>
  );
}

export default Page;
