import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import React from "react";

interface headerProp {
  shop_name: string;
  fun: (query: string) => void;
  is_search: boolean;
}
export default function Header({ shop_name, fun, is_search }: headerProp) {
  const Search = () => {
    return (
      <React.Fragment>
        <input type="text" ref={searchRef} />
        <button className="btn-success" onClick={search}>
          Search
        </button>
      </React.Fragment>
    );
  };
  const searchRef = useRef<HTMLInputElement>(null);
  const search = () => {
    if (searchRef.current) {
      fun(searchRef.current.value);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/new">
                New
              </a>
            </li>
          </ul>
          <Search />
        </div>
      </div>
    </nav>
  );
}
