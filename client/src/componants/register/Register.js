import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import './register.scss'
const Register = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        first_name: "", last_name: "", email: "", phone: "", password: "", repassword: ""
    })

    let name, value;

    const handleInputs = (event) => {

        name = event.target.name;
        value = event.target.value; 

        setUser({ ...user, [name]: value })
 
    }

    const PostData = async (event) => {
        event.preventDefault();
        const { first_name, last_name, email, phone, password, repassword } = user;

        const res = await fetch("/api/users",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                first_name,last_name, email, phone, password, repassword
            })
        });

        const data = await res.json();

        console.log(data);

        if(res.status===400 || !data){
            window.alert(data.error)
        }else{
            localStorage.setItem('jwt',data.token);
            window.alert("sucessfull registration") 
            history.push("/")
        }
    }
    return (
        <>
        
            <div className="register">
                <div className="box">
                    <h1>Amazon.com</h1> 
                    <form method="POST">

                        <div className="input-div">
                            <div className="lebal">First Name*</div>
                            <input type="text" value={user.first_name} name="first_name" onChange={handleInputs} placeholder=" First name" />
                        </div>

                        <div className="input-div">
                            <div className="lebal">Last Name*</div>
                            <input type="text" value={user.last_name} name="last_name" onChange={handleInputs} placeholder=" Last name" />
                        </div>

                        <div className="input-div">
                            <div className="lebal">Email*</div>
                            <input type="email" value={user.email} name="email" onChange={handleInputs} placeholder=" Email" />
                        </div>

                        <div className="input-div">
                            <div className="lebal">Phone N0.*</div>
                            <input type="number" value={user.phone} name="phone" onChange={handleInputs} placeholder=" phone number" />
                        </div>

                        <div className="input-div">
                            <div className="lebal">Password*</div>
                            <input type="password" value={user.password} name="password" onChange={handleInputs} placeholder=" Password" />
                        </div>

                        <div className="input-div">
                            <div className="lebal">comform password*</div>
                            <input type="password" value={user.repassword} name="repassword" onChange={handleInputs} placeholder=" re-enter Password" />
                        </div>

                        <button type="submit" name="signup" value="register" onClick={PostData}>Sign Up</button>

                    </form>
                </div>
            </div>

        </>
    )
}

export default Register
