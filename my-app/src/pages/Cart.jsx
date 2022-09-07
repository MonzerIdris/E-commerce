// import { Add, Remove } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
// import { addProduct } from '../redux/cartRedux'
import { mobile } from '../responsive'
// import StripeCheckout from "react-stripe-checkout"
import { useEffect } from 'react'
import { UserContext } from '../Context'
import { useQuery } from 'react-query'
import { getTheCart } from '../api/cart'
import CartItem from '../components/CartItem'
// import { userRequest } from '../requestMethods'
import { motion } from 'framer-motion'









const Container = styled.div`
    min-height: 100vh;
    /* max-width: 100vw; */
    background-color: #e4e3e3;

`
const Wrapper = styled.div`
  padding: 20px;
  min-height: 100vh;
  /* width: 100vw; */
  ${mobile({ padding: "10px" })}

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}

`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

// const Product = styled.div`
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ flexDirection: "column" })}

// `;

// const ProductDetail = styled.div`
//   flex: 2;
//   display: flex;
// `;

// const Image = styled.img`
//   width: 200px;
// `;

// const Details = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;

// const ProductName = styled.span``;

// const ProductId = styled.span``;

// // const ColorDetail = styled.div`
// //   display: flex;
// //   flex-direction: row;
// //   justify-content: space-between;
  
// // `
// const ProductColor = styled.span`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   border: 1px solid;
//   background-color: ${(props) => props.color};
// `;

// const ProductSize = styled.span``;

// const PriceDetail = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const ProductAmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const ProductAmount = styled.div`
//   font-size: 24px;
//   margin: 5px;
//   ${mobile({ margin: "5px 10px" })}

// `;

// const ProductPrice = styled.div`
//   font-size: 25px;
//   font-weight: 600;
//   ${mobile({ marginBottom: "20px" })}

// `;

const Hr = styled.hr`
  background-color: #ccc;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  background-color: #fff;
  border: 1px solid lightgray;
  /* border-radius: 10px; */
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

// const UpdateButton = styled.button`
//   padding: 7px;
//   font-weight: 600;
//   border-radius: 20%;
//   cursor: pointer;
//   border: ${(props) => props.type === "filled" && "none"};
//   background-color: ${(props) =>
//     props.type === "filled" ? "black" : "transparent"};
//   color: ${(props) => props.type === "filled" && "white"};
// `

// const Container3 = styled.div`
//   /* display: flex; */
//   /* justify-content: center; */
//   /* flex-direction: column; */
//   position: fixed;
//   z-index: 999;
//   height: 6rem;
//   width: 13rem;
//   letter-spacing: 1px;
//   overflow: visible;
//   padding: 2rem 4rem 4rem 4rem ;
//   margin: auto;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   border-radius: 10px;
//   /* background-color: #fff; */
//   background-color: #262534;
//   /* background-color: teal; */
//   /* border: 1px solid #fcc2c3; */
//   border: 1px solid black;
//   float: left;
//   /* padding: 20px 30px; */
// `

// const P3 = styled.p`
//   position: absolute;
//   display: flex;
// 	align-items: stretch;
// 	justify-content: center;
//   bottom: 50%;
//   right: 20%;
//   left: 20%;
//   /* color: #cc0033; */
//   color: white;
//   font-family: Helvetica, Arial, sans-serif;
//   /* font-family: 'Courier New', Courier, monospace; */
//   font-size: 20px;
//   font-weight: bold;
//   line-height: 20px;
//   text-shadow: .5px .5px rgba(250,250,250,.3);
// `

// const Button3 = styled.button`
//   position: absolute;
//   top: 70%;
//   display: flex;
// 	align-items: center;
// 	justify-content: center;
//   left: 25%;
//   width: 50%;
//   border: none;
//   border-radius: 6px;
//   padding: .4em .4em;
// 	background-color: white;
//   /* color: #fce4e4; */
//   color: #262534;
//   font-family: Helvetica, Arial, sans-serif;
//   /* font-family: 'Courier New', Courier, monospace; */
//   font-size: 15px;
//   font-weight: bold;
//   line-height: 20px;
// 	/* letter-spacing: 1px; */
//   cursor: pointer;
// 	&:hover{
// 		background-color: gray;
//     text-shadow:0 1px 3px darken(blue, 30%);
// 	}
// `

const Container2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: fixed;
  /* background-color: #e4e3e3; */
  z-index: 99;
  height: 30vh;
  width: 50vw;
  letter-spacing: 1px;
  overflow: visible;
  padding: 2rem 4rem 4rem 4rem ;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  
  /* background-color: #fce4e4; */
  /* border: 1px solid #fcc2c3; */
  border: 2px solid #252634;
  float: left;
  /* padding: 20px 30px; */
`
const P = styled.p`
  /* position: absolute; */
  margin-bottom: 5vh;
  display: flex;
	align-items: stretch;
	justify-content: center;
  
  width: 67vw;
  /* bottom: 50%;
  right: 20%;
  left: 20%; */
  /* color: #cc0033; */
  color: #262534;
  font-family: 'Roboto Condensed', sans-serif;
  /* font-family: Helvetica, Arial, sans-serif; */
  /* font-family: 'Courier New', Courier, monospace; */
  font-size: 28px;
  font-weight: 1000;
  line-height: 20px;
  text-shadow: .5px .5px rgba(250,250,250,.3);
  ${mobile({ fontSize: "22px" })}
`
const Button2 = styled.button`
  /* position: absolute;
  top: 70%; */
  margin-top: 5vh;
  display: flex;
	align-items: center;
	justify-content: center;
  /* width: 50%; */
  border: none;
  border-radius: 6px;
  /* padding: .4em .4em; */
  padding: 10px 8vw;
  color: #262534;
  border: 1px solid #000000;
  font-family: 'Roboto Condensed', sans-serif;  
  /* font-family: Helvetica, Arial, sans-serif; */
  /* font-family: 'Courier New', Courier, monospace; */
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
	/* letter-spacing: 1px; */
  cursor: pointer;
  text-decoration: none;
	&:hover{
    text-decoration: none;
    color: white;
    background-color: #262534;
    text-shadow:0 1px 3px darken(blue, 30%);
	}
  ${mobile({ fontSize: "16px" })}

`

function Cart() {
  // const cart = useSelector((state) => state.cart)
  // const [quantity, setQuantity] = useState(null)
  const [products, setProducts] = useState([])
  // const [cart, setCart] = useState(null)
  // const [idList, setIdList] = useState([])
  const [price, setPrice] = useState('--')
  // const [stripeToken, setStripeToken] = useState(null)
  // const navigate = useNavigate()
  const { user, userCart } = useContext(UserContext);
  const { error, data: response, status, refetch } = useQuery(
    "get-cart",
    () =>getTheCart({userId: user._id}),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
      enabled: user ? true : false,
    }
  );
  const { setIsLoading, setErrorMessage, setUserCart } = useContext(UserContext);


  useEffect(() => {
    if (status === "loading") {
      console.log(status)
      setIsLoading(true);
      setErrorMessage("");
    }
    if (status === "error") {
      console.log(status)
      setErrorMessage(error.data.message);
      console.log(error)
      setIsLoading(false);
    }
    if (status === "success") {
      console.log(status)
      if (response.data.cart.total > 0) {
        let amount = 0;
        response.data.cart.products.forEach((i, index) => {  
          amount += i.quantity * response.data.products[index].price;
        });
        setPrice(amount);
      } else {
        setPrice("--");
      }
      setIsLoading(false);
      setErrorMessage("");
      setProducts(response.data.products)
      // setCart(response.data.cart)
      setUserCart(response.data.cart)
      
      // console.log(response.data)
      console.log(response.data.cart)
      // refetch()
    }
  }, [status, error, setIsLoading, setErrorMessage, userCart, setUserCart,price]);


  // const onToken = (token) => {
  //   setStripeToken(token)
  // }
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: 500,
  //       });
  //       navigate.push("/success", {
  //         stripeData: res.data,
  //         products: cart, });
  //     } catch {}
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, cart.total, navigate]);
  // const dispatch = useDispatch()
  // const handleQuantity = (type, num) => {
  //   if (type === "dec") {
      
  //     if(quantity[num] > 1)  {
  //       quantity[num] -= 1;
  //       console.log(quantity[num])
  //     }
  //   } else {
      
  //     if(quantity[num] > 1) {
  //       quantity[num] += 1;
  //       console.log(quantity[num])
  //     }
  //   }
  // }
  // const productsQuantity = () => {
  //   let total = 0
  //   if (cart){
  //     if (cart.products.length > 0){
  //       cart.products.map(p => {
  //         let amount = 1
  //         total += p.quantity * amount
  //         return total
  //       })
  //     }
  //   }
  //   console.log(total)
  // }
  // const handleClick = () => {
  //   dispatch(
  //     addProduct({ ...product, quantity, color, size })
  //   );
  // };
  const setProductQuantity = (product) => {
    let newProduct = response.data.cart.products.filter(i => {
      if(i.productId === product._id){return i}
    })
    return newProduct
  }
  return (
    <>
    <motion.div 
      style={{minHeight: "100vh", backgroundColor: "#e4e3e3"}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      >
      {/* {console.log()} */}
        <Navbar />
        { user ? (
          <>
          {response ?
            response.data ? 
              response.data.cart ?
                response.data.cart.total > 0 && (
        <>
          <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
              <Link to={"/products"}>
                <TopButton>CONTINUE SHOPPING</TopButton>
              </Link>
            <TopTexts>
              { userCart &&
                <TopText>Shopping Bag({userCart.total})</TopText>
                }
                <TopText onClick={(e) => setErrorMessage("This Page Is Under Construction")}>Your Wishlist (0)</TopText>
            </TopTexts>
            <TopButton onClick={(e) => setErrorMessage("This Page Is Under Construction")} type="filled">CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
            <Info>
            {products && 
            
              products.map((product, productNum) => (
                <>
                
                { setProductQuantity(product)[0] ? (
              <>
               
              <CartItem key={product._id} data={response.data} product={product} productNum={productNum} refetch={refetch} productsLength={response.data.products.length}/>
              <Hr />
              {/* <Hr />              <Hr />              <Hr /> */}
            </>) : null
          }
          </>
            ))}
            
            {/* <Hr /> */}
              {/* jessie thunder shoes */}
                {/* <Product>
                <ProductDetail>
                    <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                    <Details>
                    <ProductName>
                        <b>Product:</b> JESSIE THUNDER SHOES
                    </ProductName>
                    <ProductId>
                        <b>ID:</b> 93813718293
                    </ProductId>
                    <ProductColor color="black" />
                    <ProductSize>
                        <b>Size:</b> 37.5
                    </ProductSize>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                    <Add />
                    <ProductAmount>2</ProductAmount>
                    <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>$ 30</ProductPrice>
                </PriceDetail>
                </Product>
                <Hr /> */}
                {/* hakura t-shirt */}
                {/* <Product>
                <ProductDetail>
                    <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                    <Details>
                    <ProductName>
                        <b>Product:</b> HAKURA T-SHIRT
                    </ProductName>
                    <ProductId>
                        <b>ID:</b> 93813718293
                    </ProductId>
                    <ProductColor color="gray" />
                    <ProductSize>
                        <b>Size:</b> M
                    </ProductSize>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                    <Remove />
                    <ProductAmount>1</ProductAmount>
                    <Add />
                    </ProductAmountContainer>
                    <ProductPrice>$ 20</ProductPrice>
                </PriceDetail>
                </Product> */}
            </Info>
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {price}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {price}</SummaryItemPrice>
                </SummaryItem>
                {/* <StripeCheckout
                  name="Shop"
                  image="https://avatars.githubusercontent.com/u/1486366?v=4"
                  billingAddress
                  shippingAddress
                  description={`Your total is $`}
                  amount=''
                  token={onToken}
                  stripeKey={process.env.REACT_APP_STRIPE}
                > */}
                  <Button onClick={(e) => setErrorMessage("This Page Is Under Construction")}>CHECKOUT NOW</Button>
                {/* </StripeCheckout> */}
            </Summary>
            </Bottom>
          </Wrapper>
         
        </>
                ) : null
                : null
              : null}

          {response ?
            response.data.cart ?
              response.data.cart.total === 0 && (
                <Container2>
                  <P>Your Bag Is Empty</P> 
                  <Link to={"/products"}>
                    <Button2>Buy Someting</Button2>
                  </Link>
                </Container2>
              ) : null
            : null }
        </> 
         ) :
        
        (
          <Container2>
            <P>
              You Need To Login First
            </P>
            <Link to={"/login"}>
              <Button2 >Login</Button2>
            </Link>
          </Container2>
        )}
        
    </motion.div><Footer/>
    </>
  )
}

export default Cart