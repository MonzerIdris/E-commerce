import { ArrowRightOutlined } from "@material-ui/icons"
import { ArrowLeftOutlined } from "@material-ui/icons"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import {sliderItems} from "../data"
import { mobile } from "../responsive"
// import img1 from '../images/pexels-tembela-bohle-1884581.jpg'


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    margin: 0;
    overflow: hidden;
    
    /* ${mobile({ display: "none"})} */
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    /* background-color: #fff7f7; */
    background-color: #dbd1d1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`
const Wrapper = styled.div`
    margin: 0;
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`
const Slide = styled.div`
    margin: 0;
    width: 100vw;
    height: 100vh;
    /* background-size: fill; */
    display: flex;
    align-items: center;
    /* background-color: #${props => props.bg}; */
    /* background-color: #262534; */
    position: relative;
    object-fit: fill;

`
const ImgContainer = styled.div`
    
    margin: 0;
    height: 100%;
    flex: 1;
    width: 100%;
    /* display: flex;
    align-items: center; */
    /* object-fit: fill; */

    /* position: relative; */
`
const Img = styled.img`
    background-color: black;
    height: 100%;
    width: 100%;
    z-index: 0;
    object-fit: fill;
    /* background-size: contain; */
    
    
`
const InfoContainer = styled.div`
    /* flex: 1; */
    text-align: center;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* position: relative; */

`
const Title = styled.h1`
    font-size: 70px;
`
const Description = styled.p`
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 10px 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    color: white;
`
const Button = styled.button`
    position: absolute;
    padding: 10px;
    font-size: 20px;
    color: white;
    border: white solid;
    background-color: transparent;
    cursor: pointer;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    transition: all ease 0.3s ;
    &:hover{
        border: solid #fff;
        background-color: #fff;
        color: #000;
        

    }
    z-index: 3;
    ${mobile({ top: "60%" })}

`

export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2)
        } else{
            setSlideIndex(slideIndex < 2 ? slideIndex +1: 0)
        }
    }

  return (

    <Container>
        <Arrow direction='left' onClick={() => handleClick("left")}>
            <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map(item => (
                <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Img src={item.img}></Img>
                    <InfoContainer>
                        {/* <Title>{item.title}</Title> */}
                        <Description>{item.desc}</Description>
                        <Link to={"/products"}>
                            <Button>SHOP NOW</Button>
                        </Link>
                    </InfoContainer>
                    </ImgContainer>            
                </Slide>     
            ))} 
        </Wrapper>
        <Arrow direction='right' onClick={() => handleClick("right")}>
            <ArrowRightOutlined />
        </Arrow>
    </Container>
  )
}
