import React from 'react'

const Slider = () => {
    return (
        <>
            
<div id="demo" class="carousel slide" data-ride="carousel">

{/* <!-- Indicators --> */}
<ul class="carousel-indicators">
  <li data-target="#demo" data-slide-to="0" class="active"></li>
  <li data-target="#demo" data-slide-to="1"></li>
  <li data-target="#demo" data-slide-to="2"></li>
</ul>

{/* <!-- The slideshow --> */}
<div class="carousel-inner">
  <div class="carousel-item active">
    <img src="https://rukminim1.flixcart.com/flap/844/140/image/9f55fa3ef82aab70.jpg?q=50" alt="Los Angeles" width="100%" height="100%"  style={{minHeight:"100px"}} />
  </div>
  <div class="carousel-item">
    <img src="https://rukminim1.flixcart.com/flap/844/140/image/9f55fa3ef82aab70.jpg?q=50" alt="Chicago" width="100%" height="100%" style={{minHeight:"100px"}}/>
  </div>
  <div class="carousel-item">
    <img src="https://rukminim1.flixcart.com/flap/844/140/image/9f55fa3ef82aab70.jpg?q=50" alt="New York" width="100%" height="100%" style={{minHeight:"100px"}}/>
  </div>
</div>

{/* <!-- Left and right controls --> */}
<a class="carousel-control-prev" href="#demo" data-slide="prev">
  <span class="carousel-control-prev-icon"></span>
</a>
<a class="carousel-control-next" href="#demo" data-slide="next">
  <span class="carousel-control-next-icon"></span>
</a>
</div>
        </>
    )
}

export default Slider
