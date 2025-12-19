import { useNavigate } from "react-router";
import { useState } from "react";
import axios from 'axios';
import { BASEURL } from "../../services/contants";
import { useEffect } from "react";

function TopRated() {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getTopRated();
  }, []);

    const getTopRated = async () => {
      try {
        const res = await axios.get(`${BASEURL}public/topRated`);
        setTopRated(res.data);
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <>
    <h1>Top Rated</h1>
    <section>
      {topRated.map(favorite =>{
        return (
        <ul>
          <li>{favorite.name}</li>
        </ul>
        )
      })}
   </section>
    </>
  )

}

export default TopRated;