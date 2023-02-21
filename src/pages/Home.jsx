import React from 'react'
import styled from 'styled-components'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { mobile } from '../responsive'
import { motion } from 'framer-motion'


const Title = styled.h1`
  margin-left: 10px;
  font-weight: 700;
  color: #252635;
  ${mobile({ fontWeight: "500" })}
  /* background-color: #e4e3e3; */

`;

export default function Home() {
  return (
    <>
    <motion.div 
      style={{backgroundColor: "#e4e3e3", minHeight: "100vh", minWidth: "100vw", alignSelf: "center", 
  }}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <Navbar />
      <Slider />
      <Categories />
      <Title>Some Of Our Products :</Title>
      <Products num={3} />
      
    </motion.div>
    <Footer />
    </>
  )
}
