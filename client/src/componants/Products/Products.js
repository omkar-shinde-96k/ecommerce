import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import './products.scss';
const Main = (props) => {
    const { id } = useParams();

    const ProductComp = (props) => {
        const productidlink = `/product/${props.id}`; 
        const [pimg, setPimg] = useState()

        useEffect(async () => { 
            const apiUrl = `/api/${props.img}`; 
            const imgu = await fetch(apiUrl) 
            setPimg(imgu.url)
        }, []);

        return (
            <>
                <div className="product col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
                    <NavLink to={productidlink} >
                        <div className="product-img">
                            <img src={pimg} width="100%" height="100%" />
                        </div>
                    </NavLink>
                    <div className="product-dics"> {props.name} </div>

                    <div className="product-by">by HP </div>

                    <div className="product-discount">{props.discount}% Discount</div>

                    <div className="product-price">Rs. {props.price} </div>
                </div>
            </>
        )
    }

   

    const [Product, setProduct] = useState([])
    const [allproducts, setAllproducts] = useState([])
    const [page, setPage] = useState(1)

    if (page <= 0) {
        setPage(allproducts.length - 1)
    }
    // if (page >=4) {
    //     setPage(1)
    // }

    useEffect(() => {
        const products = 4
        const apiUrl = `/api/categories/${id}/products?page=${page}&products=${products}`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.products)
                console.log("data", data);
                setAllproducts(data.allproducts)
            });
    }, [page]);
    return (
        < >
            <div className="filters">
                <div className="total-result">over {Product.length} results</div>
                <div className="total-sort">
                    <form action="/action_page.php">
                        <select name="cars" id="cars">
                            <option value="volvo">sort by: Featured</option>
                            <option value="saab">Sort by : low to hei</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </form>
                </div>
            </div>

            <div className="products container-fluid"  >
                <div className="row ">

                    <div className="right-box col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className="container-fluid">
                            <div className="row">

                                {Product.map((element, index) => (
                                    <ProductComp name={element.name} img={element.productImage} id={element._id} price={element.price} discount={element.discount} />
                                ))}

                            </div>


                            <div class="pagination">
                                <a onClick={
                                    () => {
                                        setPage(page - 1)
                                    }
                                }>&laquo;</a>

                                {allproducts.map((element, index) => (
                                    <a onClick={() => setPage(index)} className={index == page ? "active" : ""}>
                                        {index !== 0 && index}
                                    </a>
                                ))}

                                <a onClick={() => setPage(page + 1)} >&raquo;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default Main;
