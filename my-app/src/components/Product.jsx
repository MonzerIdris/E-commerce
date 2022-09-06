import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
// import { Add, Remove } from '@material-ui/icons'

import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { addToCart } from '../api/cart';
import { useMutation } from 'react-query';
import { UserContext } from '../Context';
import { mobile } from '../responsive';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    /* position: absolute;
    top: 0;
    left: 25%;
    right: 0; */
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    cursor: pointer;
    /* border: 1px solid black; */
`
const Container = styled.div`
    border: solid 0.5px rgba(0, 0, 0, 0.2);

    flex: 1;
    margin: 5px;
    /* min-width: 330px;
    height: 350px; */
    min-width: 280px;
    /* max-width: 320px; */
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #f5fbfd; */
    background-color: white;
    /* background: radial-gradient(transparent 100%, lightgrey 150%); */

    position: relative;
    &:hover ${Info}{
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Image = styled.img`
    background-color: white;
    position: absolute;
    top: 10%;
    height: 50%;
    z-index: 2;
`
const NewImage = styled.img`
    position: absolute;
    top: 0%;
    height: 60%;
    width: 100%;
    /* border: 1px solid gray; */
    z-index: 2;
    ${mobile({width: ''})}
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover{        
        background-color: #e9f5f5;
        transform: scale(1.1);
}
    
`
const Price = styled.p`
    position: absolute;
    top: 85%;
    /* left: 44%; */
    font-weight: 600;
    font-size: 18px;
    color: darkslategray;
    /* right: 50%; */
`
// const PriceContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;


// `
// const TitleContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `
const Title = styled.p`
    position: absolute;
    top: 65%;
    /* left: 44%; */
    font-weight: 600;
    font-size: 20px;
    color: #111
`
// const AddContainer = styled.div`
//   width: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

// `;

// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   font-weight: 700;
// `;
// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0px 5px;
// `;

function Product({ item, index }) {
    // const [quantity, setQuantity] = useState(0)

    // const handleQuantity = (type) => {

    // }
    const {
      data: addToCartData,
      status: addToCartStatus,
      mutate: addToCartMutation,
      error: addToCartError,
      
    } = useMutation(addToCart);
  
    const { setIsLoading, setErrorMessage, user, setUserCart, userCart } = useContext(UserContext);

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
      // refetch()
      console.log(userCart)
    }
  }, [addToCartError, addToCartStatus, setIsLoading, setErrorMessage]);
    
    const handleAddToCart = () => {
      if (addToCartStatus === "loading") return;
      
      if (item === {}) return;
      if (user){
      const userId = user._id
      console.log(userId)
      addToCartMutation({
        userId,
        id: item._id,
        quantity: 1,
        action: "add",
        size: item.size[0]
      });
      }
      else {
        setIsLoading(true)
        setErrorMessage("You Have To Login First")
        setIsLoading(false)
      }
    }

    // const handleClick = () => {

    // }
  return (
        <>
            <Container>
            {/* <Circle/> */}
            { item.img.split(".")[1] == "jpg" ? (
            <Image src={`http://localhost:5000/itemsImages/${item.img}`} /> ) : (
              <Image src={item.img} />
            ) 
          }
            <Info>
                <Icon>
                    <ShoppingCartOutlined onClick={handleAddToCart} />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                {/* <Icon>
                    <FavoriteBorderOutlined />
                </Icon> */}     
            </Info>
            <Title>{item.title}</Title>
            {/* <PriceContainer> */}
              <Price> ${item.price}</Price>
            {/* </PriceContainer> */}
            
            
            
            </Container>
            
        </>
 
  )
}

export default Product
