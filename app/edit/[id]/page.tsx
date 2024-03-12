"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import "./style.css";
import { IoSend } from "react-icons/io5";
import Link from "next/link";
import { CiViewList } from "react-icons/ci";
import Logo from "../../logo";
import { FaBloggerB, FaHome, FaLock } from "react-icons/fa";

const Page = ({ params }) => {
  const id = params.id;
  //Modal.setAppElement(document.body)
  // <Modal isOpen={open}>
  const [open, setOpen] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setOpen(true);
      e.preventDefault();
    }
  };
  const router = useRouter();
  const [id2, setId2] = useState("");
  const [nvt, setNvt] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [emp, setEmp] = useState(null);
  const [me, setMe] = useState(null);
  const [load, setLoad] = useState(false);
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
      setMe(data["message"]);
    };
    fetchData();
  }, [me]);
  useEffect(() => {
    async function stop() {
      const rep = await fetch("https://blog-backend-qgng.onrender.com/hey", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await rep.json();

      setTitle(data["title"]);
      setBody(data["body"]);
    }

    stop();
  }, [id]);
  const main_action = async () => {
    console.log(title, body);
    setLoad(true);
    const res = await fetch("https://blog-backend-qgng.onrender.com/edit", {
      method: "POST",
      body: JSON.stringify({ id: id, title: title, body: body }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      router.push("/my");
    }, 1000);
    setLoad(false);
  };
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
        setId2(data["message"]["id"]);
        console.log(id2);
      }
    };
    fetchData();
  }, [id2, router]);
  if (!nvt) {
    return (
      <>
        <div className="navbar">
          <Logo />
          <Link className="link" href="/">
            Home <FaHome className="linky" />
          </Link>
          <Link href="/my" className="link">
            My blogs <FaBloggerB className="linky" />
          </Link>
          <Link href="/view" className="link">
            View Blogs <CiViewList className="linky" />
          </Link>
          <Link href="/signin" className="link">
            Sign in
          </Link>
          <Link href="/signup" className="link">
            Sign up
          </Link>
          <button className="link5" onClick={main_action}>
            Update <IoSend className="linky" />
          </button>
        </div>
        <Modal isOpen={open}>
          <p className="headingering">
            Sorry, but Flashify does not allow you to press Enter! 👉👈
          </p>
          <div className="contis">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="close"
            >
              Close
            </button>
          </div>
        </Modal>
        {load && <p className="load">Loading...</p>}
        <p className="lab1">Title: </p>
        <textarea
          required
          className="page2"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <p className="lab2">Body: </p>
        <textarea
          required
          className="page"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <Modal isOpen={emp} ariaHideApp={false}>
          <p className="headingering">
            Empty Request. Please fill both the Title and the Body 😃
          </p>
          <div className="contis">
            <button
              onClick={() => {
                setEmp(false);
              }}
              className="close"
            >
              Close
            </button>
          </div>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        {" "}
        <div className="navbar">
          <Logo />
          <Link className="link" href="/">
            Home <FaHome className="linky" />
          </Link>
          <button className="link">
            Publish <IoSend className="linky" />
          </button>
          <Link href="/view" className="link">
            View Blogs <CiViewList className="linky" />
          </Link>
          <Link href="/my" className="link">
            My blogs
            <FaBloggerB className="linky" />
          </Link>
          <Link href="/signin" className="link">
            Sign in
          </Link>
          <Link href="/signup" className="link">
            Sign up
          </Link>
        </div>
        <h1 style={{ textAlign: "center", marginTop: "70px" }}>
          Please sign in / sign up first 😃
        </h1>
        <p className="ima">
          <FaLock />
        </p>
      </>
    );
  }
};

export default Page;
