import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL } from "../../services/contants";
import { Link } from "react-router";

const SingleCoffeeSideBar = ({coffeeId, user, onClose, onDeleteSuccess})=>{
const [singleCoffee, setSingleCoffee] = useState(null)


useEffect(()=>{
    getSingleCoffee()
}, [coffeeId]); //Re-fetch if CoffeeId changes


const getSingleCoffee = async()=>{
    try {
      const res = await axios.get(`${BASEURL}/coffee/${coffeeId}`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      console.log(`get specific Coffee suceeded`)
      setSingleCoffee(res.data)
    } catch (error) {
      console.log(`get specific coffee  Error:`, error);
    }
  };


  const handleDelete = async () => {
       // ADD: Confirmation dialog
    if (!window.confirm("Are you sure you want to delete this coffee?")) {
      return;
    }
    try {
      const res = await axios.delete(`${BASEURL}/coffee/${coffeeId}`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      console.log("coffee deleted successful", singleCoffee);
      onDeleteSuccess()
    } catch (error) {
        console.log('error with deleting coffee', error)
    }
  };
    if (!singleCoffee) {
    return (
      <div style={styles.sidebar}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>
        <div>Loading...</div>
      </div>
    );
  }

return (
    <div style={styles.sidebar}>
      {/* ADD: Close button */}
      <button onClick={onClose} style={styles.closeButton}>
        ✕
      </button>
      
      <div style={styles.content}>
        <h1>{singleCoffee.name}</h1>
        <section>
          <ul>
            <li>Description: {singleCoffee.description}</li>
            <li>Price: ${singleCoffee.price}</li>
            <li>Region: {singleCoffee.region}</li>
            <li>Weight: {singleCoffee.weight}</li>
            <li>Flavor: {singleCoffee.flavor_profile}</li>
            <li>Roast: {singleCoffee.roast}</li>
            <li>Rating: {singleCoffee.rating}/5</li>
          </ul>
        </section>
        <Link to={`/coffee/${singleCoffee._id}/edit`}>
          <button>Edit</button>
        </Link>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
// Basic styles object
const styles = {
  sidebar: {
    position: 'fixed',
    right: 0,
    top: 0,
    width: '400px',
    height: '100vh',
    backgroundColor: '#fff',
    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
    overflowY: 'auto',
    zIndex: 1000,
    padding: '20px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'black'
  },
  content: {
    marginTop: '40px',
  },
};
export default SingleCoffeeSideBar;