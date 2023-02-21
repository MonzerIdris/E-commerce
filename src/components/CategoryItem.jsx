// import { Info, Title,Image,Button } from '@material-ui/icons';
import React from 'react';
import styled from "styled-components";
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 80vh;
  position: relative;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "40vh" })}

`
const Block = styled.div`
    width: 100%;
	position: absolute;
	bottom: 0px;
	top: 0px;
    background: radial-gradient(transparent 0%, black 150%)
    `
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  font-weight: 500;
`
const Button = styled.button`
  display: block;
  box-sizing: border-box;
  border: none;
  padding: 10px;
  background: #fff;
  background: rgba(255, 255, 255, 0.5);  
  color: whitesmoke;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease-out;
  &:hover{
		background: black;
    text-shadow:0 1px 3px darken(blue, 30%);
	}
`

export default function CategoryItem({item}) {
  return (
    <Container>
      <Link to={`/products`}>
        <Image src={item.img}/>
        <Block></Block>
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  )

}
