import { useState, useEffect } from "react";


const topRated = ()=>{
  const [topRated, setTopRated] = useState([])

  useEffect(() => {
  axios.get('http://localhost:3000/public/topRated')
    .then(res => setTopRated(res.data));
}, []);

}
