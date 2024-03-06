import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate} from "react-router-dom"
import "./SearchList.css"
import SearchApiHook from '../../hooks/Search.Api.Hook';
import Avatar from "../../../img/User-avatar.svg.png";


export default function DividerVariants({showList}) {
  let navigate = useNavigate()
  const [ itemSearch] = SearchApiHook()


// thats for block functionality

//  let arrrr= ["65be33df93d2b438e7b4ad9b"]
// useEffect(() => {
//   // let getAllFlo =   AllUsers.data.filter((e) => e._id !== user._id)
//   let getAllbloc =   itemSearch.filter((e) => arrrr.indexOf(e._id)  )
//   console.log(getAllbloc);
//     // setUserData(getAllbloc);

// }, [arrrr, itemSearch]);
    const style = {
        py: 0,
        width: '100%',
        maxWidth: 360,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        // position: 'absolute',
        // zIndex: 1,
        // top:" 21%",
        // overFlow: 'auto',
        // maxHeight: "70%",
        // clipPath: !showList ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)",
        // transition:' all .5s linear'
      };
     const styleDiv = {
        position: 'absolute',
        zIndex: 2,
        top:" 15%",
        overFlow: 'auto',
        maxHeight: "80%",
        clipPath: !showList ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)",
        transition:' all .5s linear',
        
     }
   const  handleNavidate = (e) => {
    
    navigate(`/other-people/${e}`)
    localStorage.removeItem("searchWord")
   }

  return (
    <div style={styleDiv}>
  
    <List  sx={style}>
      {itemSearch ? (itemSearch.map((item , indx) => 

        <div  key={indx}>
        <div  onClick={() => handleNavidate(item._id)} className='itemSearch'>
        <img src={item.profilePicture ? item.profilePicture : Avatar} alt="" />
        <ListItem>
          <ListItemText primary={`${item.firstname} ${item.lastname}`} />
        </ListItem>
        </div>
        <Divider variant="middle" component="li" />
        </div>

      )) : null}

     
    </List>
 
    </div>

  );
}