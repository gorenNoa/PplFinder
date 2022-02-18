import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";
import Home from "pages/Home/Home";
import Favorites from "pages/Favorites/Favorites";


const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();
  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} onClick={() => {history.push('/')}}/>
        <Tab label="Favorites" index={1} onClick={() => { history.push('/favorites')}}/>
      </Tabs>
      {/* {value === 0 && <Home />}
      {value === 1 && <Favorites />} */}
    </AppBar>
  );
};

export default NavBar;
