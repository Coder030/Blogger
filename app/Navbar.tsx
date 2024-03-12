import Link from "next/link";
import { IoCreate } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { FaBloggerB, FaHome } from "react-icons/fa";
import Logo from "./logo";
import "./style.css";

function Navbar() {
  return (
    <div className="navbar">
      <Logo />
      <Link className="link" href="/">
        Home <FaHome className="linky" />
      </Link>
      <Link href="/my" className="link">
        My blogs <FaBloggerB className="linky" />
      </Link>
      <Link href="/create" className="link">
        Create Blog <IoCreate className="linky" />
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
    </div>
  );
}

export default Navbar;
