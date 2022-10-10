import * as React from "react";

const Search = () => {
  const COLORS = ["red", "blue", "white", "green", "black"];
  const comp = [">", "=", "<"];
  const cmc = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  const createCheckBox = (option) => {
    return (
      <label>
        <input
          type="Checkbox"
          value={checkedOne}
          onChange={handleChangeOne}
          key={option}
        />
        {option}{" "}
      </label>
    );
  };

  const createOptions = (option) => {
    return <option value={option}>{option}</option>;
  };
  //<select name="cars" id="cars">
  //<option value="volvo">Volvo</option>
  return (
    <section>
      <h1>Search Page</h1>
      <h3>Color(s)</h3>
      <div>{COLORS.map(createCheckBox)}</div>
      <h3>Cost</h3>
      <div>{comp.map(createCheckBox)}</div>
      <div>
        <select name="cmc" id="cmc">
          {cmc.map(createOptions)}
        </select>
      </div>
    </section>
  );
};

export default Search;
