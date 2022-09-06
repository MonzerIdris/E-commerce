import { useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import { mobile } from '../responsive'
import { useLocation, useNavigate } from 'react-router-dom'
// import { Button } from '@material-ui/core'
// import { UserContext } from '../Context'
// import { getItems } from '../api/product'
// import { useMutation, useQuery } from 'react-query'
import { motion } from 'framer-motion'


const Container = styled.div`
    background-color: #e4e3e3;
    margin: 0;
    min-height: 100vh;
    min-width: 100vw;    
`
const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}

`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  cursor: pointer;
  ${mobile({ margin: "10px 0" })}

`;
const Option = styled.option``;
const Button = styled.button`
  font-family: 'Roboto Condensed', sans-serif;
  letter-spacing: 1px; 
  /* background-color: #2c2c2c; */
  color: #2c2c2c;
  margin-left: 20px; 
  padding: 10px; 
  font-size: 15px;
  font-weight: 600;
  margin-right: 20px;
  border: 1px solid #1c1c1c;
  border-radius: 10%;
  cursor: pointer;
  &:hover{
    transition: linear ease 10ms ;
    background-color: #2c2c2c;
    color: white;
  } 
  
  ${mobile({ marginRight: "0px" })}

`

function ProductList() {
  const location = useLocation()
  const cat = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[1];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState(null)
  const navigation = useNavigate()
  

  // const { data: items, status, refetch, error } = useQuery();

  // const { setIsLoading } = useContext(UserContext);

  // useEffect(() => {
  //   if (status === "loading") {
  //     setIsLoading(true);
  //   }
  //   if (status === "error") {
  //     setIsLoading(false);
  //   }
  //   if (status === "success" || status === "idle") {
  //     setIsLoading(false);
  //   }
  // }, [status, error, setIsLoading]);
  const handleChange = (e) => {
    // if(category != undefined){}
    // console.log(e.target.value)
    setCategory(e.target.value)
    // console.log(category)
    navigation(`/products/${e.target.value}`)

  }

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const handleClick = () => {
    setFilters({})
    setCategory(null)
    navigation("/products")
  }
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <Container>
        <Navbar />
        <Title>{cat}</Title>  
        <FilterContainer>
            <Filter>
                <FilterText>Color</FilterText>
                <Select placeholder='color' name="color" onChange={e => handleFilters(e)}>
                    <Option disabled>
                    Color
                    </Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>red</Option>
                    <Option>grey</Option>
                    <Option>beige</Option>
                    <Option>green</Option>
                </Select>
                <FilterText>Size</FilterText>
                <Select name="size" onChange={e => handleFilters(e)}>
                    <Option disabled>
                    Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
                
            </Filter>
            <Filter>
              {/* <FilterText>gender:</FilterText>
              <Select name="gender" onChange={handleFilters}>
                    <Option disabled>
                    Size
                    </Option>
                    <Option value="men">Men</Option>
                    <Option value='women'>Women</Option>
                </Select>               */}
                <FilterText>Categories:</FilterText>
                <Select onChange={(e) => handleChange(e)}>
                    <Option value="shoes">Shoes</Option>
                    <Option value="pants">Pants</Option>
                    <Option value="shirts">Shirts</Option>
                    <Option value="caps">Cap</Option>
                </Select>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={(e) => setSort(e.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
            
        </FilterContainer>
        <Button type='reset' on onClick={handleClick}>RESET</Button>
        <Products  cat={category} filters={filters} sort={sort} path={path}/>
        
      </Container>
      <Footer />
    </motion.div>
  )
}

export default ProductList