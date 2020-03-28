import React from "react";

import NavBar from "./navbar";
import Featured  from "./featured"
import { Link } from "gatsby";

const Description = ({ location }) => {

  let NavBarHTML = "";
  let SuggestButtonHTML = "";
  let FeaturedHTML = "";

  if (location === "donate-and-volunteer") {
    NavBarHTML = <Link to="/" className="underline">Back to Homepage</Link>
    SuggestButtonHTML = <Link to="/submit" className="bg- hover:bg-gra text-gray-800 font-sem py-2 px-4 b border-gray-400 rounded shadow">Suggest an addition &rarr;</Link>
    FeaturedHTML = <Featured />
  } else if (location === "home") {
    NavBarHTML = null;
    SuggestButtonHTML = null;
    FeaturedHTML = null;
  } else {
    NavBarHTML = <NavBar />
    SuggestButtonHTML = <Link to="/submit" className="bg- hover:bg-gra text-gray-800 font-sem py-2 px-4 b border-gray-400 rounded shadow">Suggest an addition &rarr;</Link>
    FeaturedHTML = null;
  }

  return (
    <div>
      <p className="text-lg mb-6">
        The best way we can help our neighbors is by supporting the organizations that support them during (and beyond) the state-mandated shutdown.
      </p>
      <p className="text-lg mb-6">
        Please consider donating to some of the organizations highlighted on this site.
      </p>
      <p className="mb-6">
        {NavBarHTML}
      </p>
      <div className="mb-10">
        {SuggestButtonHTML}
      </div>
      {FeaturedHTML}
    </div>
  );
};

export default Description;