import React, { useState, useEffect, Component } from "react";
import axios from "axios";

export default function Currency() {
  const [currency, setCurrency] = useState([]);
  async function getCurrencies() {
    //   const getCurrencies = () => {
    await axios
      .get(
        "https://v6.exchangerate-api.com/v6/0a0fe73c79cc22a52d81823a/latest/USD"
      )
      .then((res) => {
        var currencies = [];
        for (var k in res.data.conversion_rates) currencies.push(k);
        setCurrency(currencies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <div>
      <div className="heading">
        <label className="cera">CERA</label>
        {/* <label className="subheading">Currency Exchange Rate App</label> */}
        <div className="subheading">
          <label id="initials">C</label>
          <label>urrency&nbsp;</label>
          <label id="initials">E</label>
          <label>xchange&nbsp;</label>
          <label id="initials">R</label>
          <label>ate&nbsp;</label>
          <label id="initials">A</label>
          <label>pp</label>
        </div>
      </div>
      <div className="starting">
        <input
          placeholder="Enter Amount"
          type="Number"
          className="sInput"
        ></input>
        <select name="cars" className="inputOptions">
          <option>Pick a Currency</option>
          {currency.map((c, i) => (
            <option value={c} key={i}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="converted">
        <input placeholder="Enter Amount" className="sOutput"></input>
        <select name="cars" className="convertOptions">
        <option>Pick a Currency</option>
          {currency.map((c, i) => (
            <option value={c} key={i}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {/* <div class="area"> */}
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
