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
        console.log("Top rated coffees:", res.data);
      } catch (err) {
        console.error(err);
      }
    };
//in my map function you must use averageRating instead of rating and _id instead of name since that's what the variable is on the backend Aggregate method (publicCoffeeController)
  return (
        <div>
            <h2>Community Favorites</h2>
            {topRated.map((coffee) => (
                <div key={coffee._id}>
                    <h3>{coffee._id}</h3>
                    <p>Rating: {coffee.averageRating}</p>
                    <p>Total Ratings: {coffee.totalRatings}</p>
                </div>
            ))}
        </div>
    );

}

export default TopRated;