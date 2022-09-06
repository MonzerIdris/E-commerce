import { CameraAlt } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query';
// import Select from 'react-select'
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { UserContext } from '../Context';
import { addItem } from '../api/product'
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-width: 100vw;
  min-height: 110vh;
  /* background-size: cover; */
  background-color: #e4e3e3;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
    
  width: 50%;
  /* padding: 20px; */
  /* background-color: white; */
      /* background-color: #dbd9f1; */


`;

const Title = styled.h1`
  margin: 30px;
  text-align: center;
  font-size: 24px;
  font-weight: 450;
`;

const Form = styled.form`
    
`;
const Div = styled.div`
    display: flex;
	flex-direction: row;
    justify-content: center;
	letter-spacing: 1px;
`
const FormWrapper = styled.div`
    min-height: 100%;
    min-width: 100%;
    flex: 1;
    margin-left: 10px;
	display: flex;
	flex-direction: column;
	letter-spacing: 1px;
    position: relative;

`
const FileContainer = styled.div`
    
    min-height: 100%;
    min-width: 100%;
    flex: 1;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    border-radius: 6px;    
    /* background-color: blue; */
`
const FileWrapper = styled.div`
    flex: 1;
    border: 1px solid #aaaaaa;
    border-radius: 6px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 2% 12%;

	background-color: #262534;
    color: white;
	letter-spacing: 1px;
    cursor: pointer;
	&:hover{
	background: #3a3855;
    text-shadow:0 1px 3px darken(blue, 30%);
	}
    
`
const ImgWrapper = styled.div`
    /* background-color: blue; */
    flex: 12;
    height: 70%;
    width: 70%;
    /* border: 1px solid #aaaaaa; */
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    height: auto;
    
    /* z-index: 9; */
`
const FileLabel = styled.label`
	/* position: absolute;
	top: 8px;
	left: 20px;
	padding: 4px 5px;
	display: inline-block;
	background-color: rgba(255,255,255,1);
  background-color: #dbd9f1; */
    display: flex;
    align-items: center;
    justify-content: center;
    
    cursor: pointer;
	font-weight: 400;

`
const FileInput = styled.input`
    height: 100%;
    width: 100%;
    display: none;    
`

const InputWrapper = styled.div`
    margin: 15px;
	position: relative;
	/* background-color: white; */
  /* background-color: #dbd9f1; */

`

const Label = styled.label`
	position: absolute;
	top: -25px;
	left: 5px;
	padding: 4px 5px;

    /* background-color: rgba(255,255,255,1); */
  /* background-color: #dbd9f1; */

	font-weight: 600;

`


const Input = styled.input`
  flex: 1;
  min-width: 70%;
  margin: 0px 10px;
  padding: 0.8em 0.8em 0.8em 0.8em ;
  outline: none;
  border: 1px solid #aaaaaa;
  border-radius: 6px;
  &::placeholder{
    /* color: #dbd9f1; */

  }
  &:focus{
    /* background-color: #dbd9f1; */

  }
`;

const SelectWrapper = styled.div`
	position: relative;
	/* background-color: white; */
  /* background-color: #dbd9f1; */
  /* width: 200px; */
  margin: 30px;
  width: 100%;
  min-width: 15;
  max-width: 26ch;
  border: 1px solid #777;
  border-radius: 0.25em;
  padding: 0.2em 0.5em;
  /* font-size: 1.25rem; */
  cursor: pointer;
  line-height: 1.3;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  &::after{
  content: "";
  width: 0.8em;
  height: 0.5em;
  background-color: #777;
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  grid-area: select;
  justify-self: end;
}

`
// const RadioInputWrapper = styled.div`
//   display: block;
//   position: relative;
//   padding-left: 35px;
//   margin-bottom: 12px;
//   cursor: pointer;
//   font-size: 22px;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;	/* background-color: white; */
//   /* background-color: #dbd9f1; */
//   margin: 15px;

// `
const SelectLabel = styled.label`
	position: absolute;
	top: -35px;
	left: -5px;
	padding: 4px 0px;

    /* background-color: rgba(255,255,255,1); */
  /* background-color: #dbd9f1; */

	font-weight: 600;

`
const Select = styled.select`
  // A reset of styles, including removing the default dropdown arrow
  flex: 1;
  appearance: none;
  // Additional resets for further consistency
  background-color: transparent;
  border: none;
  padding: 0.2em 1em 0 0;
  margin: 0 0;
  width: 100%;
  justify-self: start;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: inherit;
  font-weight: 600;
  cursor: inherit;
  line-height: inherit;
  grid-area: select;
  *
  &::before,
  &::after {
  box-sizing: border-box;
}
  /* &:focus{
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px solid blue;
  border-radius: inherit;
  } */

`
// const Span = styled.span`
//   position: absolute;
//   top: -1px;
//   left: -1px;
//   right: -1px;
//   bottom: -1px;
//   border: 2px solid blue;
//   border-radius: inherit;
// `

const Button = styled.button`

	display: flex;
	align-items: center;
	justify-content: center;
  width: 35%;
  border: none;
  border-radius: 6px;
  padding: 15px 20px;
	background-color: #262534;
  color: white;
	letter-spacing: 1px;
  cursor: pointer;
	&:hover{
		background: #3a3855;
    text-shadow:0 1px 3px darken(blue, 30%);
	}
  &::-ms-expand{
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
`
const Hr = styled.hr`
  background-color: #232534;
  width: px;
  
  /* height: 1px; */
`;

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

export default function ProductUpload() {
    const [img, setImg] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [gender, setGender] = useState("")
    const [categories, setCategories] = useState("")
    const [color, setColor] = useState([""])
    const [size, setSize] = useState([""])
    const [price, setPrice] = useState(0)
    const [imgpreview, setImgpreview] = useState("")
    const { mutate, status, error } = useMutation(addItem);
    const { setIsLoading, setErrorMessage, user } = useContext(UserContext);
    useEffect(() => {
      if (status == "loading") {
        setIsLoading(true);
        setErrorMessage("");
      }
      if (status === "error") {
        setErrorMessage(error);
        setIsLoading(false);
      }
      if (status === "success" || status === "idle") {
        setIsLoading(false);
      }
    }, [status, error, setIsLoading, setErrorMessage]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setCategories(category)
      setCategories(oldArray => [...oldArray, color])
      if (status === "loading") return;
  
      mutate({
        title,
        desc,
        img,
        categories: category,
        color,
        size,
        price
      });
      setErrorMessage("Product Added Successfully")
    };
  
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImgpreview(URL.createObjectURL(event.target.files[0]));
        }
       }

       
  return (
    <>
    <Container>
        <Navbar/>
      {user && user.isAdmin === true ? (
        <Wrapper>
            <Title>Products Upload Page </Title>
            <Form onSubmit={handleSubmit}>
                <Div>
                    <FileContainer>
                        <FileWrapper>
                            <FileLabel>Upload Product Image
                                <CameraAlt style={{color: "#888888"}} />
                                <FileInput placeholder='Upload' type={"file"} name="img" onChange={(e) => { 
                                  onImageChange(e)
                                  setImg(e.target.files[0])
                                }} />
                                
                            </FileLabel>
                        </FileWrapper>
                        <ImgWrapper>
                            <Img src={imgpreview} style={{pointerEvents: "none"}} alt='' />
                        </ImgWrapper>
                    </FileContainer>
                    <Hr></Hr>
                    <FormWrapper>
                        <InputWrapper>
                            <Label>Product Title</Label>
                            <Input type={"text"} name="title" onChange={e => setTitle(e.target.value)} />    
                        </InputWrapper>                
                        <InputWrapper>
                            <Label>Product Description</Label>
                            <Input type={"text"} name="desc" onChange={e => setDesc(e.target.value)}/>
                        </InputWrapper>
                        <SelectWrapper>
                            <SelectLabel>Product Categories:</SelectLabel>
                            <Select name="categories" id="categories" onChange={e => setCategory(e.target.value)}>
                                {/* <option value="0">Category :</option> */}
                                <option value="shirt">Shirts</option>
                                <option value="pants">Pants</option>
                                <option value="shoes">Shoes</option>
                                <option value="caps">Caps</option>
                                {/* <Span></Span> */}
                            </Select>
                        </SelectWrapper>
                        <SelectWrapper>
                            <SelectLabel>Gender :</SelectLabel>
                            
                            <Select name="gender" id="gender" onChange={e => setGender(e.target.value)}>
                                <option value="men">Male</option>
                                <option value="women">Female</option>
                            </Select>
                        </SelectWrapper>
                        <InputWrapper>
                            <Label>Product Color</Label>
                            <Input type={"text"} name="color" onChange={e => setColor(e.target.value)} />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Product Size</Label>
                            <Input type={"text"} name="size" onChange={e => setSize(e.target.value)} />
                        </InputWrapper>
                        <InputWrapper>
                            <Label>Product Price</Label>
                            <Input type={"text"} name="price" onChange={e => setPrice(e.target.value)} />
                        </InputWrapper>
                        
                    </FormWrapper>
                    
                </Div>
                <ButtonWrapper>
                    <Button type='submit'> ADD PRODUCT </Button>
                </ButtonWrapper>
            </Form>
        </Wrapper>)
     : (
      <Container2>
      <P>
        You're not an Admin!
      </P>
      <P>Go to Home Page</P>
      <Link to={"/"}>
        <Button2 >Home-page</Button2>
      </Link>
    </Container2>
    )}
    </Container>
    <Footer/>
    </>
  )
}
