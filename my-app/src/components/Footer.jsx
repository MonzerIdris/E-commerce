import { GitHub, LinkedIn, MarkunreadRounded } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

// social icons hex-code
/* color='171515'
color='0072b1'
color='171515'*/
const Div = styled.footer`
    max-width: 100vw;
    /* height: 6vh; */
    height: auto;
    object-fit: contain;
    background-color: #1e1e1e;
    /* background-color: #413e3e; */
    color: whitesmoke;


    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0px;
    margin-bottom: 0;
    margin: 0;
    padding: 0px 12px;
    /* z-index: 990; */
`
const Container = styled.div`
    /* display: flex;
    align-items: center;
    justify-content: center;
    background-color: #262534; */
    width: 100%;
    /* height: 9vh; */
    display: grid;
    align-items: center;
    padding: 10px 0;
    /* position: fixed;
    top: 90.8%;
    left: 0;
    z-index: 5; */
`
// const Left = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 10px;
// `
const SocialConatiner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    /* background-color: #${(props) => props.color}; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    
`
// const Center = styled.div`
//     flex: 1;
//     padding: 20px;
// `
// const Right = styled.div`
//     flex: 1;
//     padding: 20px;
// `
// const Title = styled.h3`
//   margin-bottom: 30px;
// `;

// const List = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   display: flex;
//   flex-wrap: wrap;
// `;

// const ListItem = styled.li`
//   width: 50%;
//   margin-bottom: 10px;
// `;


function Footer() {
  return (
    <Div>
    <Container>
        {/* <Center></Center> */}
        {/* <Left> */}
            {/* <SocialConatiner>
                <SocialIcon color='171515'>
                    <GitHub />
                </SocialIcon>
                <SocialIcon color='0072b1'>
                    <LinkedIn />
                </SocialIcon>

                <SocialIcon color='171515'>
                    <MarkunreadRounded />
                </SocialIcon>
                

            </SocialConatiner> */}
            Monzer&copy;All Rights reserved
        {/* </Left> */}
        {/* <Right><Title>Useful Links</Title>
            <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
            </List>
        </Right> */}
    </Container>
    </Div>
  )
}

export default Footer