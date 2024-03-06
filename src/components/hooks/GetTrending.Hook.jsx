import  { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { trendApi } from "../../reducers/trending/Get.Trending.js";

const GetTrendingHook = () => {
    const dispatch = useDispatch()
  const [trend , setTrend] = useState([])
  const [loading , setLoading] = useState(true)
  const {tagTrend} = useSelector((state) => state.GetTrending)

  useEffect(() => {
    
    let get = async() => {
      setLoading(true)

      await dispatch(trendApi())
      setLoading(false)

    }
    get()
  }, [dispatch])

  useEffect(() => {
    if(!loading){
     

        setTrend(tagTrend.data)
   
    }
  },[loading, tagTrend.data])
  

return [ trend]
}

export default GetTrendingHook