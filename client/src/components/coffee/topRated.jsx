import { useNavigate } from "react-router";
import { useState } from "react";
import axios from 'axios';
import { BASEURL } from "../../services/contants";
import { useEffect } from "react";

function TopRated() {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await axios.get(`${BASEURL}/public/topRated`);
        setTopRated(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopRated();
  }, []);



  return (
    <ul>
      {topRated.map(item =>{
        <li key={item._id}>{item.name}</li>
      })}
    </ul>
  )

}

export default TopRated;