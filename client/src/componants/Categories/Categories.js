import React , {useEffect,useState} from 'react'
import {  NavLink } from "react-router-dom";
import './Categories.scss'
const Categories = () => {

    const Category = (props) => {
        const productidlink = "products/"+props.id;
        return (

            <div className="Category col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                <div className="Category-name">
                    {props.name}
                </div>

                <div className="Category-img">
                    <img src={props.img} alt="category img"/>
                </div>

                <div className="shop-now">
                    <NavLink to={productidlink}>shop now</NavLink>
                    </div>
            </div>
        )
    }

    const [Name, setName] = useState([])
    // const [img, setImg] = useState([])
 
    useEffect(() => { 
        const apiUrl = `/api/categories`;
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => { 
             setName(data.categories)
          });
      },[]); 
      
    return (
        <>
            <div className="Categories container-fluid">
                <div className="row">
              {Name.map((element,index)=>(
                  
                  <Category name={element.name} id={element._id} img="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"/>
                
              )) } 
                </div>
            </div>
        </>
    )
}

export default Categories
