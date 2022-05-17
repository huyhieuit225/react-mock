import React from "react";
import myFace from "../images/5c5b9b66f5b43bea62a5.jpg";
import "../Styles/HomeStyle.scoped.css";

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Hi, my name is Hieu</h4>
        <img src={myFace} className="myFace" alt="Huy Hieu"></img>
      </header>
    </div>
  );
}

export default HomePage;
