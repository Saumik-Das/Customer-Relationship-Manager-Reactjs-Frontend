import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({name:"", email:"",password:"",cpassword:""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, cpassword} = credentials;
        if(password !== cpassword){
            alert("Passwords don't match");
            return false;
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json); 
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            history.push('/');
            props.showAlert("Account created successfully", "success");
            }else{
                props.showAlert("Incorrect credentials", "danger");
            }
         
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };
    return (
        <div className="container mt-2">
            <h2>Create an account to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
