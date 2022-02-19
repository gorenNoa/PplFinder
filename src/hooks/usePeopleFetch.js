import { useState, useEffect } from "react";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";

export const usePeopleFetch = (pageNumber, countriesFilterOn) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  async function fetchUsers() {
    if(!countriesFilterOn){
      setIsLoading(true);
      const response = await axios.get(`https://randomuser.me/api/?results=25&page=${pageNumber}`);
      setIsLoading(false);
      setUsers([...users, ...response.data.results]);
    }
  }

  return { users, isLoading, fetchUsers};
};
