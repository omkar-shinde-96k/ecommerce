import React, { useState, useEffect } from 'react'
import axios from 'axios'
const AddProduct = () => {
    const [category, setCategory] = useState([])

    useEffect(async () => {
        const res = await fetch('/api/categories', {
            method: "GET",
            headers: {
                "Content-Type": "application/form-data",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        const data = await res.json();
        // console.log("categories", data.categories);
        setCategory(data.categories)
    }, [])

    const [productData, setProductData] = useState({ name: "", price: "", details: "", discount: "", image:[], category: "" })

    let name;
    let value ; 

    const InputHandler = (event) => {
          name = event.target.name;
          value = event.target.value; 
        setProductData({ ...productData, [name]: value })
    } 

    const FileHandler =(e)=>{
        const file = e.target.files
         
        console.log("filkllll",file);

        setProductData({ ...productData, image: file })
    }

    // console.log("image is ",productData.image.name);
    
    const PostData = async (event) => {
 
        event.preventDefault();
        const { name, price, details, discount, image, category } = productData;
        const result = await fetch("/api/product", {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                "Content-Type": "formData",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                name, price, details, discount, category
            })
        })

        const data = await result.json()

        console.log("data",data); 

        if (result.status === 400 || !data ||data.error) {
            window.alert(data.error)
        } else {
            window.alert(data.msg) 
        }
    }

    return (
        <form method="POST" enctype="multipart/form-data">
            <div className="addproduct">

                {productData.name}
                {productData.price}
                {productData.details}
                {productData.discount}
                {productData.category}
                {/* {productData.image.file} */}

                <div className="inputbox">
                    <span>Name :</span>
                    <input type="text" onChange={InputHandler} autoComplete="off" name="name" placeholder="Enter product name" />
                </div>

                <div className="inputbox">
                    <span>More Info :</span>
                    <input type="text" onChange={InputHandler} name="details" placeholder="Enter product Information" />
                </div>

                <div className="inputbox">
                    <span>Price :</span>
                    <input type="number" onChange={InputHandler} name="price" placeholder="Enter Product Price" />
                </div>

                <div className="inputbox">
                    <span>Discount :</span>
                    <input type="number" onChange={InputHandler} name="discount" placeholder="Discount" />
                </div>

                <div className="inputbox">
                    <span>Product Image :</span>
                    <input type="file" onChange={FileHandler} name="image" />
                </div>

                <div className="inputbox" >
                    <span>Category : </span>
                    <select name="category" onChange={InputHandler}>

                        {category.map((element) => {
                            return (
                                <option value={element._id}> {element.name} </option>
                            )
                        })
                        }
                    </select>
                </div>

                <div className="inputbox">
                    <button type="submit" onClick={PostData}>Add Product</button>
                </div>
            </div>
        </form>
    )
}

export default AddProduct;
