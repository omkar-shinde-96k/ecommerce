import React,{useState}from 'react'
import axios from "axios";

const AddCategory = () => {

    const [name, setName] = useState("")
    const [categoryimage, setCategoryimage] = useState();
 

    const PostData = async(event)=>{
        event.preventDefault();
        console.log("name",name);
        console.log("image",categoryimage);

        const dataArray = new FormData();
        dataArray.append("name", name);
        dataArray.append("categoryimage", categoryimage);
 

        // const res = await fetch("/api/categories",{
        //     method:"POST",
        //     headers:{
        //    "Content-Type": "multipart/form-data",
        //         "Authorization": "Bearer " + localStorage.getItem("jwt")
        //     },
        //     body:dataArray 
        // });
           // const data = await res.json(); 
        // console.log("category data",data);  
        // if (res.status === 400 || !data || data.error) {
        //     window.alert(data.error)
        // } else { 
        //     window.alert("Category Added") 
        //     setName("")
        // }

        axios.post("/api/categories", dataArray, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          } 
        })
        .then((response) => { 
          console.log("sucesss",response);
          setName("")
        })
        .catch((error) => { 
          console.log(error);
        });
   
     

        
    }

    return (
        <form onSubmit={PostData} className="addcategory">

            <div><span>Category Name :</span> <input type="text" value={name} name="name" onChange={(e)=>{
                 setName(e.target.value)
            }} placeholder="enter category name" /> </div>

            <div><span>Category Image :</span> <input type="file"  name="categoryimage" onChange={(e)=>{
                 setCategoryimage(e.target.files[0])
            }}  /> </div>



            <button type="submit" >Add</button>
        </form>
    )
}

export default AddCategory
