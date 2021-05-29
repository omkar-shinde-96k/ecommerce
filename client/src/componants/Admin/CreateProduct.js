import React, { useState, useEffect } from 'react'

const CreateProduct = () => {

    useEffect(() => {
        const PostData = async (event) => {
            // event.preventDefault();
            // const { name, price, details, discount, image, category } = productData;
            const res = fetch("/api/product", {
                method: "POST",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    // "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    name:"omkar", price:"22", details:"details", discount:"10", image:"img", category:"343432424342"
                })
            })
    
            const data = await res.json()
    
            console.log("data",data);
            console.log("res",res);
    
            if (res.status === 400 || !data ) {
                window.alert("data.error")
            } else {
                window.alert("data.msg") 
            }
        }

        PostData()

    }, [])

    return (
        <div>
           create procjduct
        </div>
    )
}

export default CreateProduct
