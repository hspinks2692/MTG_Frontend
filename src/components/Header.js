import { Link } from "react-router-dom";

function Header(props) {
  //inline style for the nav tag
  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    border: "3px solid black",
    padding: "8px",
    width: "90%",
    margin: "auto"
  };

  const titleStyle = {
    textAlign: "center"
  };

  return (
    <header>
      <h1 style={titleStyle}>The Gathering</h1>
      <nav style={navStyle}>
        <Link to="/">
          <div>HOME</div>
        </Link>
        <Link to="/test">
          <div>Test Card</div>
        </Link>
        <Link to="/search">
          <div>SEARCH PAGE</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
