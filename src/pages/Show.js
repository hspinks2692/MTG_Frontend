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
    margin: "auto"
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

  const check = (card) => {
    if (card.image_uris !== undefined) {
      return (
        <Link to={`/display/${card.name}`}>
          <img src={card.image_uris.small} alt="name"></img>
        </Link>
      );
    }
    return "";
  };

  const display = (card) => {
    return <section>{check(card)}</section>;
  };

  const loaded = () => {
    return (
      <div>
        <h1>Test Card</h1>
        <div style={imgStyle}>{Cards.data.map(display)}</div>
      </div>
    );
  };

  //let max = array.len > 15 ? 15 : array.len;
  return Cards ? loaded() : <h1>Loading...</h1>;
}

export default Show;
