import React from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Logo from "../../img/f.png";
import "./LogoSearch.css";
import DividerVariants from "../utiltity/searchlist/SearchList";
import SearchWord from "../search/SearchWord";
// import SearchApiHook from "../hooks/Search.Api.Hook";
// import SearchWord from "../search/SearchWord";

function LogoSearch() {
  const [setOpen, open, OnChangeSearch] = SearchWord();

  const overlaySearch = {
    position: "absolute",
    // top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: " #3d3c3c70",
    zIndex: 1,
    width: " 100%",
    height: " 100%",
    transition: " all .5s linear",
    borderRadius: ".5rem",
  };

  const handleOverlay = () => {
    setOpen(true);
    localStorage.removeItem("searchWord");
  };
  return (
    <>
      <div className="LogoSearch">
        <img src={Logo} alt="" />
        <div className="Search">
          <input
            type="search"
            placeholder="#Explore"
            onChange={OnChangeSearch}
          />
          <div className="s-icon">
            <UilSearch />
          </div>
        </div>
      </div>
      <DividerVariants showList={open} />
      <div onClick={handleOverlay} style={!open ? overlaySearch : null}></div>
    </>
  );
}

export default LogoSearch;
