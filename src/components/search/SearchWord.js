import  {  useState } from 'react'
import SearchApiHook from '../hooks/Search.Api.Hook';

const SearchWord = () => {

  // eslint-disable-next-line no-unused-vars
  const [itemSearch ,getUserSearch] = SearchApiHook()

  // eslint-disable-next-line no-unused-vars
  const [searchWord, setSearchWord] = useState("");
  let [open , setOpen] = useState(true)
  
  const OnChangeSearch = (e) => {
    localStorage.setItem("searchWord", e.target.value);
    setSearchWord(e.target.value);

    if (e.target.value) {
    
      setOpen(false)
      setTimeout(() => {
        getUserSearch();
        
      }, 1500);
    }else {
      setOpen(true)
    
    }
  };



  return [setOpen, open ,OnChangeSearch  ];
}

export default SearchWord