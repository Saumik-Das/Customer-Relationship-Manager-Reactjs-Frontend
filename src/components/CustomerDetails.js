import React,{useContext} from 'react';
import CustomerContext from '../context/customer/CustomerContext';

const CustomerDetails = (props) => {
    const {deleteCustomer} = useContext(CustomerContext);
    const { customer, updateCustomer } = props
    return (
        <div className="table-responsive-sm">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{customer.customerFirstName}</td>
                        <td>{customer.customerLastName}</td>
                        <td>{customer.customerEmailId}</td>
                        <td><i className="fas fa-edit" onClick={()=>{updateCustomer(customer)}}></i></td>
                        <td><i className="fas fa-trash-alt" onClick={()=>{deleteCustomer(customer._id);
                        props.showAlert("Deleted successfully", "success")}}></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CustomerDetails
