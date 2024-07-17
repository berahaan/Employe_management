import React from "react";
import background from "../Images/Hr.jpg";
function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      Home
    </div>
  );
}

export default Home;
