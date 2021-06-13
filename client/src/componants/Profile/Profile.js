import React, { useState, useEffect,useContext } from 'react'
import './Profile.scss'

const Profile = () => {



    const [user, setUser] = useState({
        first_name: "", last_name: "", email: "", phone: "", address: "", password: "", repassword: ""
    })

    const inputHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUser({ ...user, [name]: value })
    }

    // *****************************************************

    useEffect(async () => {
        const res = await fetch('/api/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        const data = await res.json();

        setUser({ first_name: data[0].first_name, last_name: data[0].last_name, email: data[0].email, phone: data[0].phone, address: data[0].address })

    }, [])

    // *****************************************************

    const PostData = async (event) => {
        event.preventDefault();
        const { first_name, last_name, email, phone, address, password } = user;

        const res = await fetch('/api/users', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                first_name, last_name, email, phone, address, password
            })
        })
        const data = await res.json();
        if (res.status === 400 || !data) {
            window.alert("error")
        } else {
            window.alert("Profile Updated")
        }
    }


    return (
        <form method="POST">
            <div className="profile-edit">
                <div className="label">
                    <span>First Name :</span> <input type="text" name="first_name" onChange={inputHandler} value={user.first_name} />
                </div>

                <div className="label">
                    <span>Last Name :</span> <input type="text" name="last_name" onChange={inputHandler} value={user.last_name} />
                </div>

                <div className="label">
                    <span>E-mail :</span> <input type="email" name="email" onChange={inputHandler} value={user.email} />
                </div>

                <div className="label">
                    <span>Phone No :</span> <input type="number" name="phone" onChange={inputHandler} value={user.phone} />
                </div>

                <div className="label">
                    <span>Delevary Address : </span> <input type="text" name="address" onChange={inputHandler} value={user.address} />
                </div>
                {/* 
                <div className="label">
                    <span>Set New Password</span> <input type="password" name="password" onChange={inputHandler} value={user.password} />
                </div> */}
                {/* 
                <div className="label">
                    <span>Comform Password</span> <input type="password" name="repassword" onChange={inputHandler} value={user.repassword} />
                </div>  */}
                <div className="update">
                    <button type="submit" onClick={PostData}>Update</button>
                </div>
            </div>
        </form>
    )
}

export default Profile;
