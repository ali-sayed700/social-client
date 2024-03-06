import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { SearchUserApi } from '../../reducers/search/Search.User'
const SearchApiHook = () => {
    let [itemSearch, setItemSearch] = useState([]);
    const dispatch = useDispatch()
    let word = ''


    const getUserSearch = async () => {
        getStorage();
   
    
        await dispatch(
            SearchUserApi(word)
        );
      };
    //   useEffect(() => {
    //     getUserSearch();
    
    //   }, [word]);
    

    const getStorage = () => {
        if (localStorage.getItem("searchWord"))
          word = localStorage.getItem("searchWord");
      };


       // fetching all data
  let { searchUser } = useSelector((state) => state.GetUserSearch);
  // console.log(prods.data);
  // let item = [];
  useEffect(() => {
    if (Array.isArray(searchUser.data)) {
        setItemSearch(searchUser.data);
      // item = prods.data;
    } else {
        setItemSearch([]);
      // item = [];
    }
  }, [searchUser.data]);


  return [itemSearch ,getUserSearch ]
}

export default SearchApiHook