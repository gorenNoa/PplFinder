  import React from "react";
  import Text from "components/Text";
  import UserList from "components/UserList";
  import { usePeopleFetch } from "hooks";
  import * as S from "./style";
  import { useState , useEffect} from "react";
  import IconButton from "@material-ui/core/IconButton";
  import FavoriteIcon from "@material-ui/icons/Favorite";
  import Spinner from "components/Spinner";
  import CheckBox from "components/CheckBox";


  const Favorites = () => {
    const { users, isLoading } = usePeopleFetch();
    // const [favoriteUsersList, setFavoriteUsersList] = useState([]);
    const [favoriteUsersList, setFavoriteUsersList] = useState(() => {
      if(localStorage.getItem("favoriteUsers")){
        // setFavoriteUsersList(localStorage.getItem("favoriteUsers"))
        return JSON.parse(localStorage.getItem("favoriteUsers"));
      }
      // if there are no saved users
      return [];
    });
    const removeFavoriteUser = (userToRemove) => {
      if(userToRemove !== null){
        var newFavoriteList = favoriteUsersList.filter(user => user.login.uuid !== userToRemove.login.uuid)
        setFavoriteUsersList(newFavoriteList)
        localStorage.setItem("favoriteUsers", JSON.stringify(newFavoriteList));
      }
    };
    return (
      <S.Favorites>
        <S.Content>
          <S.Header>
            <Text size="64px" bold>
              Favorite Users Page
              {console.log(favoriteUsersList)}
            </Text>
          </S.Header>
          {/* <UserList users={users} isLoading={isLoading} /> */}
          <S.UserList>
        <S.List>
          {favoriteUsersList.map((user, index) => {
            return (
              <S.User
                key={index}>
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
                <S.IconButtonWrapper isVisible={true}>
                  <IconButton onClick={() => removeFavoriteUser(user)}>
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
        </S.Content>
      </S.Favorites>
    );
  };

  export default Favorites;
