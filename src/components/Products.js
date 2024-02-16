import { Profiler, useEffect, useState } from "react";

export const Products = () => {

    const [products,setProducts]=useState([])
    const [page,setPage]=useState(1)
    const getProducts=async()=> {
       const product= await fetch('https://dummyjson.com/products').then(res => res.json())
       console.log(product)
       setProducts(product.products)
    }
    useEffect(()=>{
       getProducts();
    },[])

    const selectPage = (pageNumber) => {
            if(pageNumber>=1 && pageNumber<=products.length/10)
            {
                setPage(pageNumber)
            }
    }
    return <div><div className="products">
        {products.slice(page*10-10,page*10).map((p)=>{
            return <span className="product__single">
                <p>{p.title}</p>
                <img src={p.thumbnail} alt={p.id}/>
            </span>
        })}
    </div>
    <div className="pagination">
        <span onClick={()=>selectPage(page-1)}>◀</span>
        {[...Array(products.length/10)].map((_,index)=>
        {
           return <span className="page" onClick={()=>selectPage(index+1)}>{index+1}</span>
        })}
        <span onClick={()=>selectPage(page+1)}>▶</span>
    </div>
    </div>
}

export default Products;