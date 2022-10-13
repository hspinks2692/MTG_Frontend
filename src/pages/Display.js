import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Display(props) {
  const { name } = useParams();
  const URL = `https://api.scryfall.com/cards/search?q=!\"${name}\"`;
  //const URL = `https://api.scryfall.com/cards/search?q=!fire`;
  const [Card, setCard] = useState(null);

  const imgStyle = {
    maxWidth: "75%",
    height: "auto",
    border: "3px solid red"
  };

  const flexStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "25px",
    margin: "auto",
    border: "3px solid blue"
  };

  const group = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  };

  const infoStyle = {
    display: "flex",
    flexDirection: "column",
    border: "3px solid green",
    whiteSpace: "pre-line",
    maxWidth: "600px",
    height: "auto"
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
        <div className="imageDiv">
          <img
            style={imgStyle}
            src={Card.data[0].image_uris.normal}
            alt="name"
          ></img>
          {console.log(Card.data[0].image_uris.normal.width)}
        </div>
        <div className="infoDiv" style={infoStyle}>
          <div style={group}>
            <h2>{Card.data[0].name}</h2>
            <p>{Card.data[0].mana_cost}</p>
          </div>
          <div style={group}>
            <h3>{Card.data[0].type_line}</h3>
            <h3>
              {Card.data[0].power}/{Card.data[0].toughness}
            </h3>
          </div>
          <p>{Card.data[0].oracle_text}</p>
        </div>
      </section>
    );
  };

  return Card ? loaded() : <h1>Loading...</h1>;
}

export default Display;
