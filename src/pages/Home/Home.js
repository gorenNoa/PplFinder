import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import { useState } from "react";

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [countriesFilterOn, setCountriesFilterOn] = useState(false);
  const { users, isLoading} = usePeopleFetch(pageNumber, countriesFilterOn);

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} setPageNumber={setPageNumber} pageNumber = {pageNumber} countriesFilterOn={countriesFilterOn} setCountriesFilterOn={setCountriesFilterOn}/>
      </S.Content>
    </S.Home>
  );
};

export default Home;
