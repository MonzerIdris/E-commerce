import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { popularProducts } from '../data'
import Product from './Product'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`

const Products = ({ cat, filters, sort, num, path }) => {
  const [products, setProducts] = useState([]);
  // const location = useLocation()
  // const path = location.pathname.split("/")[1];

  // const [ category, setCategory] = useState([])

  const [filteredProducts, setFilteredProducts] = useState([]);



  // const handleClick = () => {
//         const res = await axios.get(
//   cat
//   ? `http://localhost:5000/api/products?category=${cat}`
//   : "http://localhost:5000/api/products"
// );
  // }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://eshopp-heroku.herokuapp.com/api/products?category=${cat}`
            : "https://eshopp-heroku.herokuapp.com/api/products"
              // ? `http://localhost:5000/api/products?category=${cat}`
              // : "http://localhost:5000/api/products"
        );
        console.log(res.data)
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    // cat &&
    path === "products" &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, filters]);
  

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  // console.log(cat,filters,sort)

  return (
    <Container>
    { num === 3 ? (
      products.slice(0, 3)
      .map((item) => 
      <Product key={item.id} item={item}  />
    )
    ) : null }

    { num !== 3 ? 
      filters
      ? (filteredProducts.map((item, index) => <Product key={item.id} item={item} index={index}  />)
      ) : (products
          .slice(0, 16)
          .map((item,index) => 
          <Product key={item.id} item={item} index={index}  />
 
          )):null
          
    }
    </Container>
  )
}

export default Products