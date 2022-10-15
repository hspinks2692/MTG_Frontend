import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home(props) {
  const URL = "https://api.scryfall.com/cards/search?q=";
  const COLORS = ["r", "u", "w", "g", "b"];
  const comp = [">", "=", "<"];
  const cmc = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const types = [
    "creature",
    "instant",
    "sorcery",
    "artifact",
    "enchantment",
    "land"
  ];
  const MaxWidth = window.innerWidth;
  let pageLoad = false;
  let callQuery = false;
  let searchQuery = "";

  const [Cards, setCards] = useState(null);

  const getCardsData = async () => {
    if (callQuery === false) {
      callQuery = true;
      const response = await fetch(getRandomCards());
      const data = await response.json();
      setCards(data);
    }
  };

  useEffect(() => {
    getCardsData();
  }, []);

  const getRandomCards = () => {
    if (pageLoad === false) {
      pageLoad = true;
      let colorNum = Math.floor(Math.random() * 5);
      let compNum = Math.floor(Math.random() * 2);
      let cmcNum = Math.floor(Math.random() * 4) + 1;
      let typeNum = Math.floor(Math.random() * 3);

      searchQuery = `${URL}id:${COLORS[colorNum]}+cmc${comp[compNum]}${cmc[cmcNum]}+t:${types[typeNum]}`;
    }

    return searchQuery;
  };

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

  const emptyChecker = (Cards) => {
    if (Cards !== null) {
      let Max = Math.floor(MaxWidth / 146);
      if (Cards.data.length >= Max) {
        Max -= 1;
      } else {
        Max = Cards.data.length;
      }
      if (Max < 1) {
        Max = 1;
      }
      let cardArray = [];
      for (let i = 0; i < Max; i++) {
        cardArray.push(Cards.data[i]);
      }
      if (Cards.object !== "error") {
        return <div style={imgStyle}>{cardArray.map(display)}</div>;
      } else {
        return <h1 style={headerStyle}>No Results Found</h1>;
      }
    }
  };

  return (
    <div>
      {console.log(getRandomCards())}
      {emptyChecker(Cards)}
    </div>
  );
}

export default Home;
