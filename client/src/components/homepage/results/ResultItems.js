import React, { Component } from "react";
import { render } from "react-dom";

const ResultItems = ({ ...props }) => {
  const noResult =
    "! No emergency food venues are open in Lambeth now. Try searching for later this week or alternatively call One Lambeth Advice on 0800 254 0298.";

  console.log(props);
  // let flatten = [];
  // props.result
  //   ? props.result.map(a => {
  //       flatten.push([a.fields.Name, a.fields.Description]);
  //     })
  //   : { noResult };
  //
  return (
    //   <ul className="results">
    //     {flatten.length > 1
    //       ? flatten.map(item => (
    //           <div className="card">
    //             <li key={item[0]}>{item[0]}</li>
    //             <li key={item[1]}>{item[1]}</li>
    //           </div>
    //         ))
    //       : noResult}
    //   </ul>
    <div>hi</div>
  );
};

export default ResultItems;