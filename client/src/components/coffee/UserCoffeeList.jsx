import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL } from "../../services/contants";
import { useNavigate, Link } from "react-router";

const CoffeeList = (props) => {
  const [coffeeList, setCoffeeList] = useState([]);

  useEffect(() => {
    getCoffeeList();
  }, []);

  const getCoffeeList = async () => {
    try {
      const res = await axios.get(`${BASEURL}coffee/allCoffee`, {
        headers: {
          Authorization: `Bearer ${props.user}`,
        },
      });
      console.log("get coffee list succeeded");
      setCoffeeList(res.data);
    } catch (error) {
      console.log(`get coffee list Error:`, error);
    }
  };

  return (
    <>
      <h1>List of Coffee Beans</h1>
      <section>
        {coffeeList.map((beans) => {
          return (
            <>
              <ul key={beans._id}>
                <li>
                  Name of Beans:
                  <Link to={`/coffee/${beans._id}`}> {beans.description}</Link>
                </li>
                <li>Roaster: {beans.name}</li>
                <li>Rating: {beans.rating}/5</li>
              </ul>
            </>
          );
        })}
      </section>
    </>
  );
};
export default CoffeeList;
