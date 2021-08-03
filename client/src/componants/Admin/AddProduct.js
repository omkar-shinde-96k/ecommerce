import React, { useState, useEffect } from 'react';
import axios from "axios";

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
        setCategory(data.categories)
    }, [])

    const [productData, setProductData] = useState({ name: "", price: "", details: "", discount: "" , category:"" })
    const [image, setImage] = useState()

    let name;
    let value;

    const InputHandler = (event) => {
        name = event.target.name;
        value = event.target.value;
        setProductData({ ...productData, [name]: value })
    }

    const PostData = async (event) => { 
        event.preventDefault();
        const { name, price, details, discount, category } = productData; 

        const dataArray = new FormData(); 
        dataArray.append("name", name);
        dataArray.append("price", price);
        dataArray.append("details", details);
        dataArray.append("discount", discount);
        dataArray.append("category", category);
        dataArray.append("image", image);

 
        axios.post("/api/product", dataArray, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            } 
          })
          .then((response) => { 
            console.log("sucesss",response);
            setImage("")
            setProductData({ name: "", price: "", details: "", discount: "" , category: "" })
          })
          .catch((error) => { 
            console.log(error);
          }); 
    }

    return (
        <form >
            <div className="addproduct">  
                <div className="inputbox">
                    <span>Name :</span>
                    <input type="text" onChange={InputHandler}  value={productData.name} autoComplete="off" name="name" placeholder="&nbsp; Enter product name" />
                </div>

                <div className="inputbox">
                    <span>Details :</span>
                    <input type="text" onChange={InputHandler} value={productData.details} name="details" placeholder="&nbsp;Enter product Information" />
                </div>

                <div className="inputbox">
                    <span>Price :</span>
                    <input type="number" onChange={InputHandler} value={productData.price} name="price" placeholder="&nbsp;Enter Product Price" />
                </div>

                <div className="inputbox">
                    <span>Discount :</span>
                    <input type="number" onChange={InputHandler} value={productData.discount} name="discount" placeholder="&nbsp; Discount" />
                </div>

                <div className="inputbox">
                    <span>Product Image :</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}  />
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
