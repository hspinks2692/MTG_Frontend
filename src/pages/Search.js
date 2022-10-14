import * as React from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const URL = "https://api.scryfall.com/cards/search?q=";
  const COLORS = ["red", "blue", "white", "green", "black"];
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
  const flexStyle = {
    padding: "60px"
  };
  const [checkedOne, setCheckedOne] = React.useState(false);
  //const [checkedTwo, setCheckedTwo] = React.useState(false);
  let colorChecker = false;
  let manaChecker = false;
  let searchQuery = "";
  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  //const handleChangeTwo = () => {setCheckedTwo(!checkedTwo);};

  const colorConverter = (color) => {
    //this function checks if a color was passed in
    //if not, it'll just return whatever was passed in
    switch (color) {
      case "red":
        return "r";
      case "blue":
        return "u";
      case "white":
        return "w";
      case "green":
        return "g";
      case "black":
        return "b";
      default:
        return color;
    }
  };

  const tagCreater = (C) => {
    // C is referring to the checker I'll be using
    // I'm shortening the name legnth since this will
    // be a very long conditional statement...
    if (
      C === "red" ||
      C === "blue" ||
      C === "white" ||
      C === "green" ||
      C === "black"
    ) {
      return "color";
    } else if (C === ">" || C === "=" || C === "<") {
      return "comp";
    } else {
      return "oracle";
    }
  };

  const checkRadioSelected = () => {
    var radios = document.getElementsByClassName("types");

    for (var i = 0, len = radios.length; i < len; i++) {
      if (radios[i].checked) {
        return true;
      }
    }

    return false;
  };

  const selectedRadio = (ele) => {
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) return ele[i].value;
    }
  };

  const generateQuery = () => {
    searchQuery = "";
    colorChecker = false;
    manaChecker = false;
    const elements = document.getElementsByClassName("checkbox");
    const rad = document.getElementsByClassName("types");
    for (let i = 0; i < elements.length; i++) {
      //console.log(elements[i].part);
      if (elements[i].checked) {
        if (elements[i].part[0] === "color" && colorChecker === false) {
          searchQuery += "c:";
          colorChecker = true;
        } else if (elements[i].part[0] === "comp" && manaChecker === false) {
          if (colorChecker === true) {
            searchQuery += "+";
          }
          searchQuery += "m";
          manaChecker = true;
        }
        searchQuery += elements[i].id;
      }
    }
    if (manaChecker === true) {
      if (document.getElementById("cmc") != null) {
        searchQuery += document.getElementById("cmc").value;
      }
    }
    if (checkRadioSelected(rad) === true) {
      if (colorChecker === true || manaChecker === true) {
        searchQuery += "+";
      }
      searchQuery += `t:${selectedRadio(rad)}`;
    }
    //searchQuery = URL + searchQuery;
    console.log(searchQuery);
    return searchQuery;
  };

  const createCheckBox = (option) => {
    return (
      <label>
        <input
          type="Checkbox"
          className="checkbox"
          value={checkedOne}
          id={colorConverter(option)}
          part={tagCreater(option)}
          onChange={handleChangeOne}
        />
        {option}{" "}
      </label>
    );
  };

  const createOptions = (option) => {
    return <option value={option}>{option}</option>;
  };

  const createRadio = (option) => {
    return (
      <label>
        <input
          type="radio"
          name="radio"
          value={option}
          className="types"
          part={tagCreater(option)}
          onChange={handleChangeOne}
        />
        {option}{" "}
      </label>
    );
  };
  //<select name="cars" id="cars">
  //<option value="volvo">Volvo</option>
  return (
    <section style={flexStyle}>
      <h1>Search Page</h1>
      <h3>Color(s)</h3>
      <div>{COLORS.map(createCheckBox)}</div>
      <h3>Cost</h3>
      <div>{comp.map(createCheckBox)}</div>
      <div>
        <select name="cmc" id="cmc" onChange={handleChangeOne}>
          {cmc.map(createOptions)}
        </select>
      </div>
      <h3>Type</h3>
      <div>{types.map(createRadio)}</div>
      <br />
      <br />
      <div>
        <Link to={`/show/${generateQuery()}`}>Test</Link>
        <button onClick={generateQuery}>Test</button>
      </div>
      <div>
        <p>
          {URL}
          {searchQuery}
        </p>
      </div>
    </section>
  );
};

export default Search;
