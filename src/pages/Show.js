import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Show(props) {
  const { id } = useParams();
  const URL = `https://api.scryfall.com/cards/search?q=${id}`;
  //const URL = `https://api.scryfall.com/cards/search?q=c:rgb+m>5`;
  const [Cards, setCards] = useState(null);

  const imgStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "8px",
    marginLeft: "4%",
    marginRight: "4%"
  };

  const headerStyle = {
    marginLeft: "4%"
  };

  // create function to make api call
  const getCardsData = async () => {
    // make api call and get response
    const response = await fetch(URL);
    // turn response into javascript object
    const data = await response.json();
    //console.log(data);
    // set the Query state to the data
    setCards(data);
  };

  useEffect(() => {
    getCardsData();
  }, []);

  const checkName = (name) => {
    if (name.includes("//")) {
      name = name.substring(0, name.indexOf("//"));
      if (name === "Who " || name === "Who") {
        name = "who-what-when-where-why";
      }
    }
    return name;
  };

  const check = (card) => {
    if (card.image_uris !== undefined) {
      return (
        <Link to={`/display/${checkName(card.name)}`}>
          <img src={card.image_uris.small} alt="name"></img>
        </Link>
      );
    }
    return "";
  };

  const display = (card) => {
    return <section>{check(card)}</section>;
  };

  const emptyChecker = (cards) => {
    if (cards.object !== "error") {
      return <div style={imgStyle}>{Cards.data.map(display)}</div>;
    } else {
      return <h1 style={headerStyle}>No Results Found</h1>;
    }
  };

  const loaded = () => {
    return (
      <div>
        <h1 style={headerStyle}>{Cards.total_cards} Results</h1>
        {emptyChecker(Cards)}
      </div>
    );
  };

  //let max = array.len > 15 ? 15 : array.len;
  return Cards ? loaded() : <h1>Loading...</h1>;
}

export default Show;

