import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import { mobile } from '../responsive';
import { Link } from "react-router-dom"
// import Footer from '../components/Footer';
import { useMutation } from 'react-query';
import { login } from '../api/user';
import { UserContext } from '../Context';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/apiCalls';
import { motion } from 'framer-motion'


const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
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
`
const Label = styled.label`
	position: absolute;
	top: 8px;
	left: 20px;
	padding: 4px 10px;
	display: inline-block;
	background-color: rgba(255,255,255,1);
	font-weight: 400;

`

const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 20px 10px;
  padding: .8em;
  outline: none;
  border: 1px solid #aaaaaa;
  border-radius: 6px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px 5px;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
  width: 40%;
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
	display: flex;
	align-items: center;
	justify-content: center;
  margin-top: 10px;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #253634;

    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
    }
    &:hover{
        color: #038c7c;
        text-decoration: underline #038c7c;
    }
`;
// const Error = styled.span`
//   color: red;
// `;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, status, error, data } = useMutation(login);
  const { setIsLoading, setErrorMessage, setUser, user } = useContext(UserContext);
 
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      setErrorMessage("");
    }
    if (status === "error") {
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
      console.log(error.response.data)
    }
    if (status === "success") {
      setIsLoading(false);
      setErrorMessage("");
      setUser(data.data);
      console.log(data.data)
      localStorage.setItem("token", data.data.accessToken);
      // console.log(localStorage.getItem("token"))
    }
  }, [status, error, setIsLoading, setErrorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({
      email,
      password,
    });
  };
  // const handleSubmit = () => axios.post('/auth/login', JSON.stringify({ email, password}))
  // .catch(function (error) {
  //   if (error.response) {
  //     // The request was made and the server responded with a status code
  //     // that falls out of the range of 2xx
  //     console.log(error.response.data);
  //     console.log(error.response.status);
  //     console.log(error.response.headers);
  //   } else if (error.request) {
  //     // The request was made but no response was received
  //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //     // http.ClientRequest in node.js
  //     console.log(error.request);
  //   } else {
  //     // Something happened in setting up the request that triggered an Error
  //     console.log('Error', error.message);
  //   }
  //   console.log(error.config);
  // });



  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <Navbar />
      <Container>
          <Wrapper>
          <Title>SIGN IN</Title>
          <Form onSubmit={handleSubmit}>
          <InputWrapper>
              <Label>email</Label>
              <Input name='email' id='email' onChange={e => setEmail(e.target.value)} required/>
            </InputWrapper>
            <InputWrapper>
              <Label>password</Label>
              <Input name='password' id='password' type="password" onChange={e => setPassword(e.target.value)} autoComplete='on' required/>
            </InputWrapper>
            
            {/* {error && <Error>Something went wrong</Error> } */}
            {/* <Link>FORGOT YOUR PASSWORD?</Link> */}
            <Agreement>
              Don't have an account <b><StyledLink to={"/register"} style={{margin: "5px 0", fontSize: "12px", textDecoration: "underline" }}>CREATE A NEW ACCOUNT</StyledLink></b>
            </Agreement>

            
            <ButtonWrapper>
              <Button  type='submit'>LOGIN</Button>
            </ButtonWrapper>
          </Form>
        </Wrapper>
      </Container>
      {/* <Footer /> */}
    </motion.div>
  )
}

export default Login