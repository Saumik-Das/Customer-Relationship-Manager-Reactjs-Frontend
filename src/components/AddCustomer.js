import React, { useContext, useState } from 'react';
import CustomerContext from '../context/customer/CustomerContext';

const AddCustomer = (props) => {
    const {addCustomer} = useContext(CustomerContext);
    const [customer, setCustomer] = useState({customerFirstName:"",customerLastName:"",customerEmailId:""});
    const onChange = (e)=>{
        setCustomer({...customer, [e.target.name]: e.target.value});
    };
    const handleClick = (e) =>{
        e.preventDefault();
        addCustomer(customer.customerFirstName, customer.customerLastName, customer.customerEmailId);
        setCustomer({customerFirstName:"",customerLastName:"",customerEmailId:""});
        props.showAlert("Added successfully","success");
    }
    return (
        <div className="container my-2">
            <h2>Add a Customer</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="customerFirstName" name="customerFirstName" value={customer.customerFirstName} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="customerLastName" name="customerLastName" value={customer.customerLastName} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="customerEmailId" name="customerEmailId" value={customer.customerEmailId} onChange={onChange} required />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button disabled = {customer.customerFirstName.length<3||customer.customerLastName.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>Add Customer</button>
            </form>
        </div>
    )
}

export default AddCustomer;
