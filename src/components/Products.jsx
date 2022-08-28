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
`

const Products = ({ cat, filters, sort, num, path }) => {
  const [products, setProducts] = useState([]);
  // const location = useLocation()
  // const path = location.pathname.split("/")[1];

  // const [ category, setCategory] = useState([])

  const [filteredProducts, setFilteredProducts] = useState([]);



  // const handleClick = () => {

  // }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        // console.log(res.data)
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
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
      <Product item={item} key={item.id} />
    )
    ) : null }

    { num !== 3 ? 
      cat
      ? (filteredProducts.map((item) => <Product item={item} key={item.id} />)
      ) : (products
          .slice(0, 8)
          .map((item) => 
          <Product item={item} key={item.id} />
 
          )):null
          
    }
    </Container>
  )
}

export default Products