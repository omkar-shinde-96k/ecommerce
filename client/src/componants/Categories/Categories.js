import React , {useEffect,useState} from 'react'
import {  NavLink } from "react-router-dom";
import './Categories.scss'
const Categories = () => {

    const [Name, setName] = useState([]) 
 
    useEffect(() => { 
        const apiUrl = `/api/categories`;
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => { 
             setName(data.categories)
          });
      },[]); 

    const Category = (props) => {
        const productidlink = "products/"+props.id;

        const [pimg, setPimg] = useState() 
        useEffect(async () => { 
            const apiUrl = `/api/${props.img}`; 
            const imgu = await fetch(apiUrl) 
            setPimg(imgu.url) 
        }, []);

        return (

            <div className="Category col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                <div className="Category-name">
                    {props.name}
                </div>

                <div className="Category-img">
                    <img src={pimg} alt="category img"/>
                </div>
                 <div className="shop-now">
                    <NavLink to={productidlink}>shop now</NavLink>
                    </div>
            </div>
        )
    }
      
    return (
        <>
            <div className="Categories container-fluid">
                <div className="row">
              {Name.map((element,index)=>(
                 
                  <Category name={element.name} id={element._id} img={element.categoryImage}/>
                
              )) } 
                </div>
            </div>
        </>
    )
}

export default Categories
