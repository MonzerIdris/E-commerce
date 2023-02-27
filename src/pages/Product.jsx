import { Add, Remove } from '@material-ui/icons'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { addToCart } from '../api/cart'
import { addItem, getItem } from '../api/product'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { UserContext } from '../Context'
// import { popularProducts } from '../data'
// import { publicRequest } from '../requestMethods'
import { mobile } from '../responsive'
// import { useDispatch } from "react-redux"
// import { addProduct } from '../redux/cartRedux'
import { motion } from 'framer-motion'


const Container = styled.div`
    background-color: #e4e3e3;
    min-height: 100vh;
    
` 
const Wrapper = styled.div`
  padding: 50px;
  min-height: 100vh;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}

`;

const ImgContainer = styled.div`
  flex: 1;
  /* background-color: white; */
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  ${mobile({ height: "30" })}

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}

`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}

`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}

`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #aeb4b1;
  }
`;

function Product() {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [color, setColor] = useState("");
  const [size, setSize] = useState([]);
  // const dispatch = useDispatch();
  const {  data, error, status, refetch  } = useQuery(["get-item", id],() => getItem({id}))
  const {
    data: addToCartData,
    status: addToCartStatus,
    mutate: addToCartMutation,
    error: addToCartError,
  } = useMutation(addToCart);

  const { setIsLoading, setErrorMessage, user, setUserCart, userCart } = useContext(UserContext);
 
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      setErrorMessage("");
    }
    if (status === "error") {
      setIsLoading(false);
      setErrorMessage(error.response)
    }
    if (status === "success" || status === "idle") {
      setIsLoading(false);
      setErrorMessage("");
      // console.log(data.data)
      setProduct(data.data)
      setSize(data.data.size[0])
      // console.log(data.data.accessToken)
      // console.log(localStorage.getItem("token"))
    }
  }, [ status, setIsLoading, error,setErrorMessage ]);

  // const {title, desc, img, categories, price } = product
  useEffect(() => {
    if (addToCartStatus === "loading") {
    setIsLoading(true);
    setErrorMessage("");
  }
    if (addToCartStatus === "error") {
    setIsLoading(false);
    setErrorMessage(addToCartError.response.data.message);
    console.log(addToCartError.response.data.message)
  }
   if (addToCartStatus === "success") {
    setIsLoading(false);
    setErrorMessage("");
    setUserCart(addToCartData.data)
    console.log(addToCartData.data)
    refetch()
    console.log(userCart)
  }
}, [addToCartError, addToCartStatus, setIsLoading, setErrorMessage]);
  
  const handleAddToCart = () => {
    if (addToCartStatus === "loading") return;
    
    if (product === {}) return;
    if (user){
    const userId = user._id
    console.log(userId)
    addToCartMutation({
      userId,
      id,
      quantity,
      action: "add",
      size: size
    });
    }
    else {
      setIsLoading(true)
      setErrorMessage("you have to log in first")
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await getItem.get(`/products/find/${id}`)
  //       console.log(res.data)
  //       setProduct(res.data)
  //     } catch (err) {
        
  //     }
  //   }
  //   getProduct()
  // }, [id])

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  // const handleClick = () => {
  //   dispatch(
  //     addProduct({ ...product, quantity, color, size })
  //   );
  // };

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
    <Container>
        <Navbar />
        <Wrapper>
          <ImgContainer>
            {/* <Image src={`/itemsImages${product.img}`} /> */}
            {product.img && product.img.split(".")[1] == "jpg" ? (
            <Image src={`//monzer-ecommerce-01/itemsImages/${product.img}`} /> ) : (
              <Image src={product.img} />
            ) 
          }
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>
              {product.desc}
            </Desc>
            <Price>$ {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((c) => (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={e => setSize(e.target.value)}>{
                  product.size?.map(s =>
                  (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))
                  }
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
              <Button onClick={handleAddToCart}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
      </Wrapper>
      <Footer />
    </Container></motion.div>
  )
}

export default Product