import CustomerContext from "./CustomerContext";
import { useState } from "react";

const CustomerState = (props) => {
    const host = "http://localhost:5000";
    const customersInitial = [];
    const [customers, setCustomers] = useState(customersInitial);

    // Get all customers
    const getCustomers = async () => {
        const response = await fetch(`${host}/api/customers/getallcustomers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setCustomers(json);
    }

    // Add a new customer
    const addCustomer = async (customerFirstName, customerLastName, customerEmailId) => {
        const response = await fetch(`${host}/api/customers/addcustomer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ customerFirstName, customerLastName, customerEmailId })
        });
        const customer = await response.json();
        setCustomers(customers.concat(customer));
    }
    // Delete an existing customer
    const deleteCustomer = async (id) => {
        // API call
        const response = await fetch(`${host}/api/customers/deletecustomer/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log("Deleteing the note with id" + id);
        const newCustomers = customers.filter((note) => { return note._id !== id });
        setCustomers(newCustomers);
    }
    // Edit an existing customer
    const editCustomer = async (id, customerFirstName, customerLastName, customerEmailId) => {
        // API call
        const response = await fetch(`${host}/api/customers/updatecustomer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ customerFirstName, customerLastName, customerEmailId })
        });
        const json = await response.json();

        let newCustomers = JSON.parse(JSON.stringify(customers));

        // Logic to edit in client
        for (let index = 0; index < customers.length; index++) {
            const element = newCustomers[index];
            if (element._id === id) {
                newCustomers[index].customerFirstName = customerFirstName;
                newCustomers[index].customerLastName = customerLastName;
                newCustomers[index].customerEmailId = customerEmailId;
                break;
            }
        }
        setCustomers(newCustomers);
    }



    return (
        <CustomerContext.Provider value={{ customers, getCustomers, addCustomer, deleteCustomer, editCustomer }}>
            {props.children}
        </CustomerContext.Provider>
    )
}

export default CustomerState;