import { useState, useEffect } from "react";

function Query(props) {
  // create state to hold query data
  const [Query, setQuery] = useState(null);

  // create function to make api call
  const getQueryData = async () => {
    // make api call and get response
    const response = await fetch(
      "https://api.scryfall.com/cards/search?q=!fire"
    );

    // turn response into javascript object
    const data = await response.json();
    console.log(data);
    // set the Query state to the data
    setQuery(data);
  };

  // make an initial call for the data inside a useEffect, so it only happens once on component load
  useEffect(() => {getQueryData()}, []);

  // define a function that will return the JSX needed once we get the data
  const loaded = () => {
    return (
      <div>
        <h1>Test Card</h1>
        <img src = {Query.data[0].image_uris.small} alt = "name"></img>
      </div>
    );
  };

  // if data arrives return the result of loaded, if not, an h1 that says loading
  return Query ? loaded() : <h1>Loading...</h1>;
}

export default Query;
