import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";
import { usePeopleFetch } from "hooks";
import axios from "axios";
import { useState, useEffect } from "react";


const CheckBox = ({ isChecked, onChange, label, value }) => {
  const handleChange = () => {
    // console.log(isChecked);
    // fetchUsersFromCountry(value);
    onChange && onChange(value);
  };
  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} color="primary" />}
        label={label}
      />
    </S.CheckBox>
  );
};
// async function fetchUsersFromCountry(value) {
//   // setIsLoading(true);
//   console.log(value);
//   const response = await axios.get(`https://randomuser.me/api/?results=25&page=1&nat=${value}`);
//   console.log(response.data.results);
//   // setIsLoading(false);
//   // setUsers(response.data.results);
// }
export default CheckBox;
