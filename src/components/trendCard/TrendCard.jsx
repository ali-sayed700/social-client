import React from "react";

import "./TrendCard.css";


import GetTrendingHook from "../hooks/GetTrending.Hook.jsx";
const TrendCard = () => {
const [ trend]  =  GetTrendingHook()



  return (
    <div className="trendCard">
      <h3>Trends for you</h3>
      {trend ?  trend.map((trend, id) => {
        return (
          <div className="trend" key={id}>
            <span>{trend.hashtag}</span>
            {trend.count > 999  ?  <span>{trend.count}k shares </span> : <span> {trend.count} shares</span> }
            <span></span>
          </div>
        );
      }) : null}
    </div>
  );
};

export default TrendCard;
