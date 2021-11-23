import AddCustomer from './AddCustomer';
import Customers from './Customers';

const Home = (props) => {
    
    return (
        <div>
            <AddCustomer showAlert={props.showAlert}/>
            <Customers showAlert = {props.showAlert}/>
        </div>
    )
}

export default Home
