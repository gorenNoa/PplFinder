import { useState, useEffect } from "react";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";

export const usePeopleFetch = (pageNumber) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);
  // useEffect(() => {
  //   console.log(users)
  // }, [users]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${pageNumber}`);
    setIsLoading(false);
    setUsers([...users, ...response.data.results]);
    // console.log(response.data.results)
    // if(pageNumber > 1){  
    // }
    // else{
    //   setUsers(response.data.results);
    // }
    // setHasMore(response.data.results.length > 0);
    
  }

  return { users, isLoading, fetchUsers};
};
