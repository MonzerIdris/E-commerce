import React from 'react'
import styled from "styled-components";
import { Search } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge'
import { ShoppingCartOutlined } from "@material-ui/icons";
// import CheckroomOutlinedIcon  from '@mui/icons-material/CheckroomOutlined';

import { mobile } from '../responsive';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context';

const Header = styled.header`
    /* border-bottom: 2px solid black; */
    width: 100;
    height: 9vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0px 12px;
    
`
const Container = styled.nav`
    width: 100%;
    height: 9vh;
    /* background-color: #262534; */
    color: #262534;
    background-color: #fff;
    display: grid;
    align-items: center;
    padding: 5px 0 0 0;
    /* border-bottom: 4px solid #F9690E;     */
    position: fixed;
    top: 0;
    left: 0;
    /* width: 100%;
    height: 60px;
    padding: 0 0 45px 0;*/
    z-index: 5; 
    box-shadow: 0 16px 16px -16px rgba(0, 0, 0, 0.25);

    ${mobile({ height: "60px" })};
    
`   
const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "0px 0" })};
`
const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ marginLeft:"15px",padding:"3px" })}

`
const Input = styled.input`
    border: none;
    ${mobile({ width: "70px" })}
`

const Center = styled.div`
    flex:2;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Logo = styled.h1`
    font-family: 'Roboto Condensed', sans-serif;
    /* font-family: 'Urbanist', sans-serif; */
    /* color: #333; */
    /* color: white; */
    text-decoration: none;
    font-size: 32px;
    font-weight: bolder;
    ${mobile({ fontSize: "24px" })}
    text-decoration: none;
    

`

const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "flex-end" })}


`
const MenuItem = styled.div`
    /* color: white; */
    text-decoration: none;
    font-size: 20px;
    cursor: pointer;
    margin-left: 25px;
    &:focus, &:active{
        /* color: #038c7c; */
       border-bottom: 1px solid #038c7c;
    }
    ${mobile({ fontSize: "14px", marginLeft: "10px" })}
`
const Hr = styled.hr`
    height: 12px;
    border: 0;
    box-shadow: 0 12px 12px -12px rgba(0, 0, 0, 1);
`
// shadow hr
// const Hr = styled.hr`
//     overflow: visible; /* For IE */
//     padding: 0;
//     border: none;
//     border-top: medium double #333;
//     color: #333;
//     text-align: center;
//     &::after{
//     content: "§";
//     display: inline-block;
//     position: relative;
//     top: -0.7em;
//     font-size: 1.5em;
//     padding: 0 0.25em;
//     background: white;
//     }
// `
const StyledLink = styled(Link)`
    color: #253634;

     &:visited, &:link {
        text-decoration: none;
    }
    &:hover{
        color: #038c7c;
        text-decoration: underline #038c7c;
    }
    &:focus, &:active{
        color: #038c7c;
        text-decoration: underline #038c7c;
    }
`;
const StyledLogoLink = styled(Link)`
    text-decoration: none;
    color: #253634;

    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
    }
    /* &:hover{
        text-decoration: underline #000000;
    }
    &:focus{
        text-decoration: underline #038c7c;
    } */
`;



export default function Navbar() {
    // const cart = useSelector(state => state.cart)
    // // console.log(cart)
    // const quantity = useSelector(state => state.cart.quantity)
  const { user, setUser, userCart } = useContext(UserContext)
    return (
    <Header>
    <Container data-spy="affix" data-offset-top="50">
        <Wrapper>
            {/* <Left> 
                <Language>EN</Language>
                <SearchContainer>
                    <Input />
                    <Search style={{color:"gray", fontSize:16}} />
                </SearchContainer>
            </Left> */}
            <StyledLogoLink to={"/"}>
                <Center>
                    <Logo>E-SHOP.</Logo>
                </Center>
            </StyledLogoLink>
            <Right>
                {user ? (
                <StyledLink to={'/*'} onClick={() => {
                  setUser(null);
                  localStorage.removeItem("token");
                }}> <MenuItem>Logout</MenuItem> </StyledLink>
                ) : (
                <>
                    <StyledLink to={"/register"}>
                        <MenuItem>Register</MenuItem>
                    </StyledLink>
                    <StyledLink to={"/login"}>
                        <MenuItem>Log In</MenuItem>
                    </StyledLink>
                </>
                )}

                <StyledLink to={"/products"}>
                    <MenuItem>     
                        Products
                    </MenuItem>
                </StyledLink>                
                <StyledLink to={"/cart"}>
                    <MenuItem>
                        {user ? userCart ? (
                        <Badge overlap="rectangular" badgeContent={userCart.total} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                        ) : (
                        <Badge overlap="rectangular" badgeContent={0} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                        ): (
                        <Badge overlap="rectangular" badgeContent={0} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                        )}
                    </MenuItem>
                </StyledLink>
            </Right>
            
        </Wrapper>
        <Hr />
        
    </Container>
    
    </Header>

  )
}
