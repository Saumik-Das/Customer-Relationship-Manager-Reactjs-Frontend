import React, {useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerContext from '../context/customer/CustomerContext';
import CustomerDetails from './CustomerDetails';

const Customers = (props) => {
    const { customers, getCustomers, editCustomer } = useContext(CustomerContext);
    let history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getCustomers();
        }
        else{
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])
    const [customer, setCustomer] = useState({id:"",ecustomerFirstName:"",ecustomerLastName:"",ecustomerEmailId:""});

    const ref = useRef(null);
    const refClose = useRef(null);
    const updateCustomer = (currentCustomer) => {
        ref.current.click();
        setCustomer({id:currentCustomer._id, ecustomerFirstName : currentCustomer.customerFirstName, ecustomerLastName : currentCustomer.customerLastName, ecustomerEmailId : currentCustomer.customerEmailId});
    };
    const onChange = (e)=>{
        setCustomer({...customer, [e.target.name]: e.target.value});
    };
    const handleClick = () =>{
        console.log("Updating the customer", customer);
        editCustomer(customer.id, customer.ecustomerFirstName, customer.ecustomerLastName, customer.ecustomerEmailId);
        refClose.current.click();
        props.showAlert("Updated successfully","success");
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> 
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Customer Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="ecustomerFirstName" name="ecustomerFirstName" value={customer.ecustomerFirstName} onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="ecustomerLastName" name="ecustomerLastName" value={customer.ecustomerLastName} onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="ecustomerEmailId" name="ecustomerEmailId" value={customer.ecustomerEmailId} onChange={onChange} required />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled = {customer.ecustomerFirstName.length<3||customer.ecustomerLastName.length<3} type="button" className="btn btn-primary" onClick={handleClick}>Update Customer Details</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-2">
                <h2>Your Customers</h2>
                <div className="container">
                {customers.length === 0 && "You don't have any customers"}
                </div>
                {customers.map((customer) => {
                    return <CustomerDetails key={customer._id} updateCustomer={updateCustomer} customer={customer} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Customers
