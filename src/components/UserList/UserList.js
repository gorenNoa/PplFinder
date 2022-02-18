import React, { useEffect, useState, useLayoutEffect } from "react";
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
  // const LOCAL_STORAGE_KEY = "favoriteUsers";
  const [favoriteUsersList, setFavoriteUsersList] = useState(() => {
    if(localStorage.getItem("favoriteUsers")){
      return JSON.parse(localStorage.getItem("favoriteUsers"));
    }
    // if there are no saved users
    return [];
  });
  

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  useEffect(() => {
    // console.log(countriesList)
      axios.get(`https://randomuser.me/api/?results=25&page=1&nat=${countriesList}`)
      .then((response) => {
        // console.log(response.data.results);
        setUsersList(response.data.results);
      });
    }, [countriesList]);


  const getUsersFromGivenCountry = (value) => {
    // if need to add the country
    if(!countriesList.includes(value)){
      setCountriesList([...countriesList, value])
    }
    // if the country already exist and pressed again - need to delete it
    else{
      const newCountries = countriesList.filter(country => country !== value)
      setCountriesList(newCountries)
    }
  };

  /*
    This function check if a given user is in the favorite list.
    In case the return answer is true - the favorite icon is visible
  */
  const isUserInFavorite = (userToCheck) =>{
    if(userToCheck !== null){
      return favoriteUsersList.find(user => user.login.uuid === userToCheck.login.uuid);
    }
  };
  // const loadFavoriteUsers = () => {
  //   if(localStorage.getItem("favoriteUsers")){
  //     return JSON.parse(localStorage.getItem("favoriteUsers"));
  //   }
  //   // if there are no saved users
  //   return [];
  // };

  const addToFavorites = (userToAdd) => {
    var newFavoriteList;
    if(!favoriteUsersList.includes(userToAdd)){
      newFavoriteList = [...favoriteUsersList, userToAdd]
    }
    else{
      newFavoriteList = favoriteUsersList.filter(user => user.login.uuid !== userToAdd.login.uuid)
    }
    setFavoriteUsersList(newFavoriteList)
    localStorage.setItem("favoriteUsers", JSON.stringify(newFavoriteList));
  };

  return (
    users && (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={getUsersFromGivenCountry}/>
        <CheckBox value="AU" label="Australia" onChange={getUsersFromGivenCountry}/>
        <CheckBox value="CA" label="Canada" onChange={getUsersFromGivenCountry}/>
        <CheckBox value="DE" label="Germany" onChange={getUsersFromGivenCountry}/>
        <CheckBox value="GB" label="United Kingdom" onChange={getUsersFromGivenCountry}/>
      </S.Filters>
      <S.List>
        {usersList.map((user, index) => {
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
                <Text size="14px">{user?.gender}</Text>
                <Text size="14px">
                  {user?.dob.age}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || isUserInFavorite(user)}>
                <IconButton onClick={() => addToFavorites(user)}>
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
    </S.UserList>)
  );
};

export default UserList;
