import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASEURL } from "../../services/contants";

const AddCoffee = (props) =>{
const [coffee, setCoffee] = useState([])

useEffect(()=>{
    fetchCoffee()
}, [])


//function to get the addcoffee route and sets the coffee state to the data
const fetchCoffee = async()=>{
    try {
        const res = await axios.get(`${BASEURL}/coffee/addCoffee`,{
            headers: {
                Authorization: `Bearer ${props.user}`
            }
        });
        setCoffee(res.data)
    } catch (error) {
        console.log("fetchCoffee Error:",error)
    }
}

const handleAdd = async (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target)//put all the form data in the variable called 'formData'
       const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: Number(formData.get('price')) ,
            region:formData.get('region'),
            weight:Number(formData.get('weight')),
            flavor_profile:formData.get('flavor_profile'),
            roast:formData.get('roast'),
            rating:formData.get('rating'),

        }
        try {
                const res = await axios.post(`${BASEURL}/coffee/addCoffee`,{
            headers: {
                Authorization: `Bearer ${props.user}`
            }
        });
        } catch (error) {
            console.log(`handleAdd Error:`, error)
        }

               <section>
            <h2>Add New Todo</h2>
            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="description">Todo: </label>
                <input
                    type="text"
                    name="description"
                    defaultValue={''}
                />
                <label htmlFor="duration">Duration: </label>
                <input
                    type="number"
                    name="duration"
                    defaultValue={0}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        style={{ margin: 0 }}
                        type="checkbox"
                        name="isComplete"
                        id="isComplete"
                        defaultChecked={false}
                    />
                    <label htmlFor="isComplete">Is Complete</label>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </section>


}





}
