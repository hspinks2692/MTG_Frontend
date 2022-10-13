import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Display(props) {
  const { name } = useParams();
  const URL = `https://api.scryfall.com/cards/search?q=!\"${name}\"`;
  //const URL = `https://api.scryfall.com/cards/search?q=!fire`;
  const [Card, setCard] = useState(null);

  const imgStyle = {
    maxWidth: "75%",
    height: "auto"
  };

  const flexStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "25px",
    margin: "auto"
  };

  const getCardData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCard(data);
  };

  useEffect(() => {
    getCardData();
  }, []);

  const loaded = () => {
    return (
      <section style={flexStyle}>
        <div>
          <img
            style={imgStyle}
            src={Card.data[0].image_uris.normal}
            alt="name"
          ></img>
        </div>
        <div>
          <h2>{Card.data[0].name}</h2>
          <p>{Card.data[0].mana_cost}</p>
          <p>{Card.data[0].type_line}</p>
          <p>{Card.data[0].oracle_text}</p>
          <p>
            {Card.data[0].power}/{Card.data[0].toughness}
          </p>
        </div>
      </section>
    );
  };

  return Card ? loaded() : <h1>Loading...</h1>;
}

export default Display;
