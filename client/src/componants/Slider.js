import React from 'react'

const Slider = () => {
    return (
        <>
            
<div id="demo" className="carousel slide" data-ride="carousel">

{/* <!-- Indicators --> */}
<ul className="carousel-indicators">
  <li data-target="#demo" data-slide-to="0" className="active"></li>
  <li data-target="#demo" data-slide-to="1"></li>
  <li data-target="#demo" data-slide-to="2"></li>
</ul>

{/* <!-- The slideshow --> */}
<div className="carousel-inner">
  <div className="carousel-item active">
    <img src="https://rukminim1.flixcart.com/flap/844/140/image/9f55fa3ef82aab70.jpg?q=50" alt="ad 1" width="100%" height="100%"  style={{minHeight:"100px"}} />
  </div>
  <div className="carousel-item">
    <img src="https://rukminim1.flixcart.com/flap/844/140/image/9f55fa3ef82aab70.jpg?q=50" alt="ad 2" width="100%" height="100%" style={{minHeight:"100px"}}/>
  </div>
  <div className="carousel-item">
    <img src="https://rukminim1.flixcart.com/flap/844/140/image/9f55fa3ef82aab70.jpg?q=50" alt="ad 3" width="100%" height="100%" style={{minHeight:"100px"}}/>
  </div>
</div>

{/* <!-- Left and right controls --> */}
<a className="carousel-control-prev" href="#demo" data-slide="prev">
  <span className="carousel-control-prev-icon"></span>
</a>
<a className="carousel-control-next" href="#demo" data-slide="next">
  <span className="carousel-control-next-icon"></span>
</a>
</div>
        </>
    )
}

export default Slider
