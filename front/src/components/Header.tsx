import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
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
        <Button variant="outline-success" onClick={search}>
          Search
        </Button>
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
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">{shop_name}</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="/#">Home</Nav.Link>
          <Nav.Link href="/new/#">New</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">{is_search && <Search />}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
