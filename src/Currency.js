import React, { useState, useEffect, Component } from "react";
import axios from "axios";

export default function Currency() {
  const [currency, setCurrency] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState();
  const [targetCurrency, setTargetCurrency] = useState();
  const [baseAmount, setBaseAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

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

  async function convert() {
    console.log(baseCurrency);
    console.log(targetCurrency);
    await axios
      .get(
        `https://v6.exchangerate-api.com/v6/0a0fe73c79cc22a52d81823a/pair/${baseCurrency}/${targetCurrency}`
      )
      .then((res) => {
        console.log(res.data.conversion_rate);
        var rate = Number(res.data.conversion_rate);
        setConvertedAmount((baseAmount*rate).toFixed(2));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function bCurrency(e) {
    setBaseCurrency(e.target.value);
    console.log(baseCurrency);
  }
  function cCurrency(e) {
    setTargetCurrency(e.target.value);
    console.log(targetCurrency);
  }
  function bAmount(e) {
    setBaseAmount(e.target.value);
    console.log(baseAmount);
  }
  function tAmount(e) {
    setTargetAmount(e.target.value);
    console.log(targetAmount);
  }

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
          onChange={bAmount.bind(this)}
        ></input>
        <select className="inputOptions" onChange={bCurrency.bind(this)}>
          <option>Pick a Currency</option>
          {currency.map((c, i) => (
            <option value={c} key={i}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="converted">
        <input
          placeholder="Enter Amount"
          className="sOutput"
          onChange={tAmount.bind(this)}
          value={convertedAmount}
        />
        <select className="convertOptions" onChange={cCurrency.bind(this)}>
          <option>Pick a Currency</option>
          {currency.map((c, i) => (
            <option value={c} key={i}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="convert">
        <button className="convertBTN" onClick={convert}>CONVERT</button>
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
