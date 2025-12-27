import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL } from "../../services/contants";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router";

const SingleCoffee = (props)=>{
const [singleCoffee, setSingleCoffee] = useState([])
const { coffeeId } = useParams(); // ← Get ID from URL
const navigate = useNavigate()

useEffect(()=>{
    getSingleCoffee()
}, []);


const getSingleCoffee = async()=>{
    try {
      const res = await axios.get(`${BASEURL}/coffee/${coffeeId}`, {
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


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASEURL}/coffee/${coffeeId}`, {
        headers: {
          Authorization: `Bearer ${props.user}`,
        },
      });
      navigate("/allCoffee")
      console.log("coffee deleted successful", singleCoffee);
    } catch (error) {
        console.log('error with deleting coffee', error)
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
        <button type="button" onClick={()=> handleDelete(singleCoffee._id)}> Delete</button>
      </>
    );
}
export default SingleCoffee;