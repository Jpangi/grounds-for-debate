import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { BASEURL } from "../../services/contants";
import { useState, useEffect } from "react";


const EditCoffee = (props) => {
const {coffeeId} = useParams();
const navigate = useNavigate();
  //Enums from CoffeeBean Model
  const coffeeRoaster = [
    "Counter Culture Coffee",
    "Intelligentsia Coffee",
    "Blue Bottle Coffee",
    "Stumptown Coffee Roasters",
    "Verve Coffee Roasters",
    "Onyx Coffee Lab",
    "Heart Coffee Roasters",
    "Irving Farm Coffee Roasters",
    "Paradise Roasters",
    "Bird Rock Coffee Roasters",
    "Novo Coffee",
    "Devoción",
    "Ritual Coffee Roasters",
    "Madcap Coffee",
    "JBC Coffee Roasters",
    "Temple Coffee",
    "La Colombe",
    "Philz Coffee",
    "Starbucks",
    "Peet's Coffee",
  ];
  const region = [
    "Africa",
    "Asia",
    "Central America",
    "South America",
    "Caribbean",
  ];
  const flavor_profile = [
    "Fruity",
    "Nutty",
    "Chocolatey",
    "Floral",
    "Spicy",
    "Earthy",
  ];
  const roast = ["Light", "Medium", "Medium-Dark", "Dark"];
  const rating = [1, 2, 3, 4, 5];



  const [singleCoffee, setSingleCoffee] = useState(null);

   useEffect(() => {
        const fetchCoffee = async () => {
            try {
                const res = await axios.get(`${BASEURL}coffee/${coffeeId}`, {
                    headers: {
                        Authorization: `Bearer ${props.user}`,
                    },
                });
                setSingleCoffee(res.data);
            } catch (error) {
                console.log("Error fetching coffee:", error);
            }
        };
        
        if (coffeeId) {
            fetchCoffee();
        }
    }, [coffeeId]);






  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); //put all the form data in the variable called 'formData'
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      region: formData.get("region"),
      weight: Number(formData.get("weight")),
      flavor_profile: formData.get("flavor_profile"),
      roast: formData.get("roast"),
      rating: formData.get("rating"),
    };
    
    try {
      const res = await axios.put(`${BASEURL}coffee/${coffeeId}`, data, {
        headers: {
          Authorization: `Bearer ${props.user}`,
        },
      });
      console.log("Coffee updated:", res.data);
      e.target.reset(); //clear all fields
       navigate('/allCoffee');
    } catch (error) {
      console.log(`handleEdit Error:`, error);
    }
  };
  if(!singleCoffee) return <div>Loading....</div>
  return (
    <>
      <section>
        <h2>Edit: {singleCoffee.name}</h2>
        <form onSubmit={handleEdit}>
          <label htmlFor="name">Roaster: </label>
          <select name="name" required defaultValue={singleCoffee.name}>
            <option >Select Coffee Roaster</option>
            {coffeeRoaster.map((roaster) => (
              <option key={roaster} value={roaster}>
                {roaster}
              </option>
            ))}
          </select>
          <label htmlFor="description">Description: </label>
          <input type="text" name="description" defaultValue={singleCoffee.description} />
          <label htmlFor="price">Price: </label>
          <input type="number" name="price" step="0.01" defaultValue={singleCoffee.price} />
          <label htmlFor="region">Region: </label>
          <select name="region" required defaultValue={singleCoffee.region}>
            <option value="">Select Coffee Region</option>
            {region.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
          <label htmlFor="weight">Weight(oz): </label>
          <input type="number" name="weight" defaultValue={singleCoffee.weight} />

          <label htmlFor="flavor_profile">Flavor: </label>
          <select name="flavor_profile" required defaultValue={singleCoffee.flavor_profile}>
            <option value="">Select Flavor</option>
            {flavor_profile.map((flavor) => (
              <option key={flavor} value={flavor}>
                {flavor}
              </option>
            ))}
          </select>

          <label htmlFor="roast">Roast: </label>
          <select name="roast" required defaultValue={singleCoffee.roast}>
            <option value="">Select Roast</option>
            {roast.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <label htmlFor="rating">Rating: </label>
          <select name="rating" required defaultValue={singleCoffee.rating}>
            <option value="">Select Rating</option>
            {rating.map((rate) => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>

          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      </section>
      ;
    </>
  );
};

export default EditCoffee;
