const Reducer = (state, action) => {
    if (action.type === "CLEAR_CART") {
        localStorage.setItem('products', JSON.stringify([]));
      return { ...state, item: [] };
    }  
    if (action.type === "REMOVE_ITEM") { 
      const removeri = JSON.parse(localStorage.getItem('products')).filter((curElem) => {
        return curElem._id !== action.payload;
      })
      localStorage.setItem('products', JSON.stringify(removeri));
      return { ...state, item: removeri }
    }
  
    if (action.type === "INCREMENT") {
      const _id = action.payload; 
      let increment = state.item.map((cur) => {
        if (cur._id === _id) {
          // const originalprice = cur.price
          return { ...state.item[_id], _id, quantity: cur.quantity + 1,img:cur.img, name: cur.name, price: cur.price, total: cur.total + cur.price, discount: cur.discount };
        }
        return cur;
      });
      localStorage.setItem('products', JSON.stringify(increment));
      return { ...state, item: increment };
    } 
    if (action.type === "DECREMENT") {
      const _id  = action.payload; 
      let increment = state.item.map((ele) => {
        if (ele._id === _id) {
          return { ...ele, _id: _id, quantity: ele.quantity - 1, total: ele.total - ele.price };
        }
        return ele;
      }); 
      const lesszero = increment.filter((curElem) => {
        return curElem.quantity !== 0;
      }) 
      localStorage.setItem('products', JSON.stringify(lesszero));
      return { ...state, item: lesszero };
    }
    if (action.type === "GET_TOTAL") {
      let { totalItem, totalAmount } = state.item.reduce(
        (accum, curVal) => {
          let { price, quantity } = curVal; 
 
                    let updatedTotalAmount = price * quantity;
          accum.totalAmount += updatedTotalAmount; 
          accum.totalItem += quantity;
          return accum;
        },
        { totalItem: 0,
          totalAmount: 0, }
      );
      return { ...state, totalItem, totalAmount };
    }
  
    return state;
  };

  export default Reducer;
    // datavase
  
    // const { _id, curr } = action.payload; 
    // const dec = async () => {
    //   let quantity = curr - 1;
    //   const res = await fetch(`/api/cart/${_id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer " + localStorage.getItem("jwt")
    //     },
    //     body: JSON.stringify({
    //       quantity
    //     })
    //   })
    //   const data = await res.json();
    // }
    // dec() 
  
  
