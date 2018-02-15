import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
// import { sortByTime, getTimeOptionArr } from "../../../helpers/getStatus";
const geolib = require("geolib");

const ResultItems = ({ ...props }) => {
  const noResult =
    "! No emergency food venues are open in Lambeth now. Try searching for later this week or alternatively call One Lambeth Advice on 0800 254 0298.";

  const d = new Date();
  const day = d.getDay(); // returns the current day as a value between 0-6 where Sunday = 0
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const time = `${hours}:${minutes}`;

  // mapTime object gives the current day from getDay as the key and returns the corresponding value. ie. today is Tuesday which = 2 so mapTime[2] returns a.Tuesday_Open which gives either "Closed" or it's opening time.

  //The closing time is found by getting the day+7 ie. 2: Tuesday_Open, 9: Tuesday_Close

  const mapTime = {
    0: "Sunday_Open",
    1: "Monday_Open",
    2: "Tuesday_Open",
    3: "Wednesday_Open",
    4: "Thursday_Open",
    5: "Friday_Open",
    6: "Saturday_Open",
    7: "Sunday_Close",
    8: "Monday_Close",
    9: "Tuesday_Close",
    10: "Wednesday_Close",
    11: "Thursday_Close",
    12: "Friday_Close",
    13: "Saturday_Close"
  };

  const distanceFinder = (arr, lat, long) => {
    const latA = parseFloat(arr.Lat);
    const longA = parseFloat(arr.Long);
    const latB = parseFloat(lat);
    const longB = parseFloat(long);
    const distance =
      geolib.getDistance(
        { latitude: latA, longitude: longA },
        { latitude: latB, longitude: longB }
      ) /
        1000 +
      "km";
    return distance;
  };

  let today = [];
  let tomorrow = [];
  let later = [];
  let sortedItems = [];

  const sortByTime = () => {
    if (props.result) {
      props.result.map(a => {
        if (a[mapTime[day]] !== "Closed" && time < a[mapTime[day + 7]]) {
          today.push(a);
        }
      });
      props.result.map(a => {
        if (a[mapTime[day + 1]] !== "Closed") {
          tomorrow.push(a);
        }
      });
      props.result.map(a => {
        later.push(a);
      });
    }
  };

  const getTimeOptionArr = () => {
    if (props.timeOption == "today") {
      sortedItems = today;
    } else if (props.timeOption == "tomorrow") {
      sortedItems = tomorrow;
    } else {
      sortedItems = later;
    }
  };

  sortByTime();
  getTimeOptionArr();

  const Advice = [];
  const Food = [];

  const sortByAdvice = () => {
    {
      props.result
        ? sortedItems.map(a => {
            if (a.FoodCentre === "true") {
              Food.push(a);
            } else if (a.FoodCentre === "false") {
              Advice.push(a);
            } else {
              console.log("database issue");
            }
          })
        : "something went wrong";
    }
  };
  sortByAdvice();
  // console.log("sort by advice", Advice);
  // console.log("sort by advice food", Food);

  const adviceMap = Advice => {
    return Advice.map(a => {
      return (
        <li key={a.Name + a.Description}>
          {a.Name}
          <br />
          {a.Description}
          <br />
          {a.Address_Line_3}
          <br />
          {a[mapTime[day]] !== "Closed" && time < a[mapTime[day + 7]]
            ? `Closes today at ${a[mapTime[day + 7]]}`
            : "Closed Today"}
          <br />
          {props.lat ? (
            <span>Distance:{distanceFinder(a, props.lat, props.long)}</span>
          ) : (
            console.log("no result")
          )}
        </li>
      );
    });
  };
  const foodMap = Food => {
    return Food.map(a => {
      return (
        <li key={a.Name + a.Description}>
          {a.Name}
          <br />
          {a.Description}
          <br />
          {a.Address_Line_3}
          <br />
          {a[mapTime[day]] !== "Closed" && time < a[mapTime[day + 7]]
            ? `Closes today at ${a[mapTime[day + 7]]}`
            : "Closed Today"}
          <br />
          {props.lat ? (
            <span>Distance:{distanceFinder(a, props.lat, props.long)}</span>
          ) : (
            console.log("can't find distance")
          )}
        </li>
      );
    });
  };

  return (
    <ul className="results">
      {console.log("advice", Advice)}
      {props.adviceCentres === true ? adviceMap(Advice) : foodMap(Food)}
    </ul>
  );
};

export default ResultItems;
