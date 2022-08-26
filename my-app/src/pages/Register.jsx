// import axios from 'axios';
// import { response } from 'express';
import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { register } from '../api/user';
import Navbar from '../components/Navbar';
import { UserContext } from '../Context';
// import { publicRequest } from '../requestMethods';
import { mobile } from '../responsive';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
      /* background-color: #dbd9f1; */

  ${mobile({ width: "75%" })}

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 450;
`;

const Form = styled.form`
  display: flex;
	flex-direction: column;
	letter-spacing: 1px;
`;

const InputWrapper = styled.div`
	position: relative;
	background-color: white;
  /* background-color: #dbd9f1; */

`
const Label = styled.label`
	position: absolute;
	top: 8px;
	left: 20px;
	padding: 4px 5px;
	display: inline-block;
	background-color: rgba(255,255,255,1);
  /* background-color: #dbd9f1; */

	font-weight: 400;

`
const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 20px 10px;
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

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px 5px;
`;

const Button = styled.button`

	display: flex;
	align-items: center;
	justify-content: center;
  width: 50%;
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
`;
const ButtonWrapper = styled.div`
  margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`
const Span = styled.span`
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #e64646;
`

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, status, data, error, refetch } = useMutation(register)
  const { setIsLoading, setErrorMessage } = useContext(UserContext)
  const navigation = useNavigate()

  useEffect(() => {
    if (status === "loading") {
      // console.log(status)
      setIsLoading(true);
      setErrorMessage("");
    }
    if (status === "error") {
      // console.log(status)
      setErrorMessage(error.response.data.message);
      // console.log(error.response.data.message)
      setIsLoading(false);
    }
    if (status === "success") {
      // console.log(status)
      // if(data === undefined){
        // console.log()
        // refetch()
      setIsLoading(false);
      setErrorMessage("account created successfully");
      console.log(data)
      navigation("/login");
    }
  }, [status, error, setIsLoading, setErrorMessage,navigation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(status)
    mutate({
      email,
      password,
      username,
    });
  };

// Old docs

  // const [input, setInput] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: ''
  // });
 
  // const [error, setError] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: ''
  // })
 
  // const onInputChange = e => {
  //   const { name, value } = e.target;
  //   setInput(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  //   validateInput(e);
  // }
 
  // const validateInput = e => {
  //   let { name, value } = e.target;
  //   setError(prev => {
  //     const stateObj = { ...prev, [name]: "" };
 
  //     switch (name) {
  //       case "username":
  //         if (!value) {
  //           stateObj[name] = "Please enter Username.";
  //         }
  //         break;
        
  //       case "email":
  //         if (!value) {
  //           stateObj[name] = "Please enter Email"
  //         }
  //         break;
 
  //       case "password":
  //         if (!value) {
  //           stateObj[name] = "Please enter Password.";
  //         } else if (input.confirmPassword && value !== input.confirmPassword) {
  //           stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
  //         } else {
  //           stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
  //         }
  //         break;
 
  //       case "confirmPassword":
  //         if (input.password && value !== input.password) {
  //           stateObj[name] = "Password and Confirm Password does not match.";
  //         }
  //         break;
 
  //       default:
  //         break;
  //     }
 
  //     return stateObj;
  //   });
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await publicRequest.post("/auth/register"
        
  //     )
  //   } catch (err) {
      
  //   }
  // }

  return (
    <div style={{}}>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Label>username</Label>
              <Input id="username" type="text" onChange={e => setUsername(e.target.value)} value={username} required/>

            </InputWrapper>
            <InputWrapper>
              <Label>email</Label>
              <Input id='email' onChange={e => setEmail(e.target.value)} value={email} type="email" required/>

            </InputWrapper>
            <InputWrapper>
              <Label>password</Label>
              <Input id='password' onChange={e => setPassword(e.target.value)} value={password} type="password" required/>

            </InputWrapper>
            <InputWrapper>
              <Label>confirm password</Label>
              <Input id='confirmPassword' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} style={{}} type="password" required/>
              {password !== confirmPassword && <Span>Passwords dont match</Span>}
              {/* {!passwordMatch && <Span style={{color: "red",borderTop: "1px solid red",padding: "0.8em"
            }}>passwords don't match</Span>} */}
            </InputWrapper>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Link to={"/login"} style={{margin: "5px 0", fontSize: "12px", textDecoration: "underline" }}>ALREADY HAVE AN ACCOUNT?</Link>
            <ButtonWrapper><Button type='submit'>CREATE</Button></ButtonWrapper>
          </Form>
        </Wrapper>
      </Container>
    </div>
  )
}

export default Register