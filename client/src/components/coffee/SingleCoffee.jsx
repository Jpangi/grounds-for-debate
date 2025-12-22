import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL } from "../../services/contants";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router";

const SingleCoffee = (props)=>{
const [singleCoffee, setSingleCoffee] = useState([])
const { coffeeId } = useParams(); // ← Get ID from URL


useEffect(()=>{
    getSingleCoffee()
}, []);


const getSingleCoffee = async()=>{
    try {
      const res = await axios.get(`${BASEURL}coffee/${coffeeId}`, {
        headers: {
          Authorization: `Bearer ${props.user}`,
        },
      });
      console.log(`get specific Coffee suceeded`)
      console.log(singleCoffee)
      setSingleCoffee(res.data)
    } catch (error) {
      console.log(`get specific coffee  Error:`, error);
    }
  };

    return (
      <>
        <h1>{singleCoffee.name}</h1>
        <section>
          <>
            <ul key={singleCoffee._id}>
              <li>Description: {singleCoffee.description}</li>
              <li>Price: ${singleCoffee.price}</li>
              <li>Region: {singleCoffee.region}</li>
              <li>Weight: {singleCoffee.weight}</li>
              <li>Flavor: {singleCoffee.flavor_profile}</li>
              <li>Roast: {singleCoffee.roast}</li>
              <li>Rating: {singleCoffee.rating}/5</li>
            </ul>
          </>
        </section>
        <Link to={`/coffee/${singleCoffee._id}/edit`}><button> Edit</button></Link>
      </>
    );
}
export default SingleCoffee;