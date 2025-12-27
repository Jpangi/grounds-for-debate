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
        const res = await axios.get(`${BASEURL}/public/topRated`);
        setTopRated(res.data);
        console.log("Top rated coffees:", res.data);
      } catch (err) {
        console.error(err);
      }
    };

  return (
        <div className="top-rated-page">
            <h2>Community Favorites</h2>
            {topRated.map((coffee) => (
                <div key={coffee._id} className="coffee-card-simple">
                    <h3>{coffee._id}</h3>
                    <p>Rating: {coffee.averageRating}/5</p>
                    <p>Total Ratings: {coffee.totalRatings}</p>
                </div>
            ))}
        </div>
    );

}

export default TopRated;