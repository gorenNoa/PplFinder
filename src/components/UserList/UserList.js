import React, { useEffect, useState, useReducer } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import axios from "axios";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [usersList, setUsersList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);



  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  useEffect(() => {
    console.log(countriesList)
      axios.get(`https://randomuser.me/api/?results=25&page=1&nat=${countriesList}`)
      .then((response) => {
        // console.log(response.data.results);
        setUsersList(response.data.results);
      });
    }, [countriesList]);


  const getUsersFromOneCountry = (value) => {
    // if need to add the country
    if(!countriesList.includes(value)){
      setCountriesList([...countriesList, value])
    }
    // if the country already exist and pressed again - neet to delete it
    else{
      const newCountries = countriesList.filter(country => country !== value)
      setCountriesList(newCountries)
    }

  };


  return (
    usersList && 
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={getUsersFromOneCountry}/>
        <CheckBox value="AU" label="Australia" />
        <CheckBox value="CA" label="Canada" />
        <CheckBox value="DE" label="Germany" />
        <CheckBox value="GB" label="United Kingdom" />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
