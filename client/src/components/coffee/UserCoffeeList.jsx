import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL } from "../../services/contants";
import { useNavigate, Link } from "react-router";
import SingleCoffeeSideBar from "./SingleCoffeeSideBar";

const CoffeeList = (props) => {
  const [coffeeList, setCoffeeList] = useState([]);

  const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getCoffeeList();
  }, []);

  const getCoffeeList = async () => {
    try {
      const res = await axios.get(`${BASEURL}/coffee/allCoffee`, {
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


  const handleDetailsClick = (coffeeId) =>{
    setSelectedCoffeeId(coffeeId);
    setIsSidebarOpen(true);
  }

  const handleCloseSidebar = ()=>{
    setIsSidebarOpen(false);
    setSelectedCoffeeId(null);
  }

  const handleDeleteSuccess = () =>{
    getCoffeeList(); //refresh the list
    handleCloseSidebar() //Close the sidebar
  }
 return (
  <>
    <div style={{ 
      display: 'flex', 
      position: 'relative',
      minHeight: '100vh'
    }}>
      {/* MAIN CONTENT AREA - wrapped in a div */}
      <div style={{ 
        flex: 1,
        transition: 'margin-right 0.3s ease',
        marginRight: isSidebarOpen ? '400px' : '0'
      }}>
        <h1>List of Coffee Beans</h1>
        <section>
          {coffeeList.map((beans) => {
            return (
              <ul key={beans._id}>
                <li>Name of Beans: {beans.description}</li>
                <li>Roaster: {beans.name}</li>
                <li>Rating: {beans.rating}/5</li>
                <button onClick={() => handleDetailsClick(beans._id)}>
                  Details
                </button>
              </ul>
            );
          })}
        </section>
      </div>

      {/* CONDITIONAL SIDEBAR - only renders when both conditions are true */}
      {isSidebarOpen && selectedCoffeeId && (
        <SingleCoffeeSideBar
          coffeeId={selectedCoffeeId}
          user={props.user}
          onClose={handleCloseSidebar}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  </>
);
};
export default CoffeeList