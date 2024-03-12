import React from "react";
import Link from "next/link";
import "./style.css";
import { IoCreate } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import Logo from "./logo";
import { FaBloggerB } from "react-icons/fa";
import Navbar from "./Navbar";

function Page() {
  return (
    <>
      <Navbar />
      <h1 className="head">Welcome to Flashify!</h1>
      <p className="hey">
        You can check View Blogs right now, without signing in or signing up,
        but you cannot make blogs, without doing so
      </p>
    </>
  );
}

export default Page;
