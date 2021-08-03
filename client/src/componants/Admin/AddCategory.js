import React,{useState}from 'react'

const AddCategory = () => {

    const [name, setName] = useState("")

    // const InputHandler=(event)=>{
    //     const result = event.target.value
    //     console.log(result);
    //     setName(result)
    // }

    const PostData = async(event)=>{
        event.preventDefault();

        const res = await fetch("/api/categories",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name
            })
        });

        const data = await res.json(); 
        console.log("category data",data);  
        if (res.status === 400 || !data || data.error) {
            window.alert(data.error)
        } else { 
            window.alert("Category Added") 
            setName("")
        }
    }

    return (
        <form method="POST" className="addcategory">

            <div><span>Category Name :</span> <input type="text" value={name} onChange={(e)=>{
                 setName(e.target.value)
            }} placeholder="enter category name" /> </div>

            <button type="submit" onClick={PostData}>Add</button>
        </form>
    )
}

export default AddCategory
