import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './login.scss'
const Login = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        email: "", password: ""
    })

    let name, value;

    const handleInputs = (event) => {

        name = event.target.name;
        value = event.target.value;

        console.log(value);

        setUser({ ...user, [name]: value })

    }

    const PostData = async (event) => {
        event.preventDefault();
        const { email, password } = user;

        const res = await fetch("api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        console.log(data);

        if (res.status === 400 || !data) {
            window.alert(data.error)
        } else {
            localStorage.setItem('jwt', data.token);
            window.alert(data.msg)
            history.push("/profile")
        }
    }
    return (
        <>

            <div className="register">
                <div className="box">
                    <h1>Amazon.com</h1> 
                    <form method="POST">

                        <div className="input-div">
                            <div className="lebal">Email*</div>
                            <input type="email" value={user.email} name="email" onChange={handleInputs} placeholder=" Email" />
                        </div>

                        {/* <div className="input-div">
                            <div className="lebal">Phone N0.*</div>
                            <input type="number" value={user.phone} name="phone" onChange={handleInputs} placeholder=" phone number" />
                        </div> */}

                        <div className="input-div">
                            <div className="lebal">Password*</div>
                            <input type="password" value={user.password} name="password" onChange={handleInputs} placeholder=" Password" />
                        </div>

                        <button type="submit" name="signup" value="register" onClick={PostData}>Sign In</button>
                        <NavLink align="center" to="/register">Create Account</NavLink>

                    </form>
                </div>
            </div>

        </>
    )
}

export default Login;
