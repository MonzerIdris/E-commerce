// import { Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Add, Delete,Remove, Update } from '@material-ui/icons';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { addToCart } from '../api/cart';
import { UserContext } from '../Context';
import { mobile } from '../responsive';

const Product = styled.div`
background-color: #fff;
  /* max-height: 250px; */
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  position: relative;
`;

const DeleteContainer = styled.div`
  position: absolute;
  cursor: pointer;
  padding: 4px 4px 4px 4px;
  border-radius: 45%;
  margin: 0;
  &:hover{
    background-color: lightgray;
  }
`

const Image = styled.img`
  width: 200px;
  max-height: 400px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ColorDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 4px 0 0;
  border: 1px solid;
  background-color: ${(props) => props.color};
`;

const ProductSizeDetail = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;

const ProductSize = styled.span`
  margin-right: 5px;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 10px" })}

`;

const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 600;
  ${mobile({ marginBottom: "20px" })}

`;

const UpdateButton = styled.button`
  padding: 7px;
  font-weight: 600;
  border-radius: 20%;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`
export default function CartItem({ data, product, productNum, refetch, productsLength}) {
  let newProduct = data.cart.products.filter(i => {
    if(i.productId !== product._id){}
    else if( i.quantity !== undefined ) return i

  })
  // let pQuantity = productList(product)[0]
  // console.log(data)
    const [quantity, setQuantity] = useState(newProduct[0].quantity)
    const { mutate, status, data: response } = useMutation(addToCart);
    const { setUserCart,userCart , setIsLoading } = useContext(UserContext);

    
    useEffect(() => {
        if (status === "loading") {
          setIsLoading(true);
        }
        if (status === "success") {
          setIsLoading(false);        
          setUserCart(data.cart);
          console.log(data.cart)
          console.log(userCart)
          refetch()

        }
      }, [status, setIsLoading, response, data, refetch, setUserCart, userCart, data.products, productsLength]);

    const handleQuantity = (type) => {
        if (type === "dec") {
          quantity > 1 && setQuantity(quantity - 1);
        } else {
          setQuantity(quantity + 1);
        }
    }

  return (

      
    <Product key={product._id}>
                
                <ProductDetail>
                  <DeleteContainer>
                    <Delete  style={{color: red[500]}} onClick={(e) => {
                      setIsLoading(true)
                      productsLength =-1
                      mutate({
                    userId: data.cart.userId,
                    id: product._id,
                    quantity: quantity,
                    action: "delete"
                  })
                  refetch()
                  setIsLoading(false)
                  }}/>
                  </DeleteContainer>
                  {product.img && product.img.split(".")[1] === "jpg" ? (
            <Image src={`https://lovely-quokka-bd5567.netlify.app/itemsImages/${product.img}`} /> ) : (
              <Image src={product.img} />
            ) 
          }                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    {/* <ProductId>
                      <b>ID:</b> {product._id.slice(0,11)}
                    </ProductId> */}
                    <ColorDetail>
                    {product.color.map(c => (
                        <ProductColor color={c} />
                    ))}  
                    </ColorDetail>                 
                    <ProductSizeDetail>
                      {/* <b>Size:</b> {data.cart.products[productNum] && data.cart.products[productNum].size.map((s,sIndex) => (
                        data.cart.products[productNum].size.length !== (sIndex - 1) ? (<ProductSize>{s},</ProductSize>) : ( 
                        <ProductSize>{s}{sIndex}</ProductSize>
                        )
                      ) )} */}
                      <ProductSize>
                      <b>Size:</b> {product.size[0]}
                    </ProductSize>
                    </ProductSizeDetail>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add style={{cursor: "pointer"}} onClick={() => handleQuantity("inc")} />
                    
                      <ProductAmount>{quantity}</ProductAmount>
                            
                    <Remove style={{cursor: "pointer"}}onClick={() => handleQuantity("dec")} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * newProduct[0].quantity}
                  </ProductPrice>
                  <Update />
                <UpdateButton type='filled' onClick={(e) => {mutate({
                    userId: data.cart.userId,
                    id: product._id,
                    quantity: quantity,
                    action: "update",
                    size: data.cart.size
                })}}>Update</UpdateButton>
                </PriceDetail>
                {/* {setProductNum(productNum += 1)} */}
                
                
                
            </Product>
            
  )
}
