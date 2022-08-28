// import { Button } from "@material-ui/core";
import { useState, createContext, useEffect } from "react";
import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { validateToken } from "./api/user";
import AOS from "aos";

import './Context.css'

export const UserContext = createContext()

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Container = styled.div`
  /* position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; */
`
const Container2 = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  /* flex-direction: column; */
  position: fixed;
  z-index: 999;
  height: 4rem;
  width: 8rem;
  /* letter-spacing: 1px; */
  overflow: visible;
  padding: 2rem 4rem 4rem 4rem ;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  /* background-color: #fce4e4; */
  /* background-color: teal; */
  background-color: #262526;
  /* border: 1px solid #fcc2c3; */
  border: 1px solid darkgreen;
  float: left;
  /* padding: 20px 30px; */
`
const P = styled.p`
  position: absolute;
  display: flex;
	align-items: stretch;
	justify-content: center;
  bottom: 50%;
  right: 20%;
  left: 20%;
  /* color: #cc0033; */
  color: white;
  /* font-family: Helvetica, Arial, sans-serif; */
  font-family: 'Roboto Condensed', sans-serif;

  /* font-family: 'Courier New', Courier, monospace; */
  /* font-size: 13px; */
  /* font-weight: bold; */
  /* line-height: 20px; */
  text-shadow: .5px .5px rgba(250,250,250,.3);
`
const Button = styled.button`
  /* background-color: antiquewhite;
  color: black; */
  position: absolute;
  top: 70%;
  display: flex;
	align-items: center;
	justify-content: center;
  width: 50%;
  border: none;
  border-radius: 6px;
  padding: .4em .4em;
	background-color: white;
  color: #262526;
  font-family: Helvetica, Arial, sans-serif;
  /* font-family: 'Courier New', Courier, monospace; */
  font-size: 15px;
  font-weight: bold;
  line-height: 20px;
	/* letter-spacing: 1px; */
  cursor: pointer;
	&:hover{
		background: gray;
    text-shadow:0 1px 3px darken(blue, 30%);
	}

`

const Loading = styled.div`
  /* position: absolute;
  left: 50%;
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db; 
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite; */
  /* position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
`

// @keyframes spin 





export default function Context({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [userCart, setUserCart] = useState(null)
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const { data, status } = useQuery("validate-token",validateToken , {
    onSuccess: (response) => {
      // console.log("s")
      console.log(response.data)
      setUser(response.data.user)
      setUserCart(userCart)
    },
    onError: (error) => {
      console.log(error.response.data)
      if (error.response.data.message === "invalid") {
        console.log(localStorage.getItem("token"))
        localStorage.removeItem("token");
      }
    },
    retry: false,
    enabled: localStorage.getItem("token") ? true : false,
  });
    
  return (
    <UserContext.Provider
      value={{ setUser, user, setUserCart, userCart, setIsLoading, setErrorMessage }}
    >
      {children}

      {(isLoading || ErrorMessage) && (
        <div>
          {isLoading && (
            <div className="loading">Loading&#8230
              {/* ...Loading  */}
            </div>
          )}

          {ErrorMessage && !isLoading && (
            <Container2>
              <P>{ErrorMessage}</P>
              <Button onClick = {() => setErrorMessage("")}>
                Ok
              </Button>
            </Container2>
          )}
        </div>
      )}
    </UserContext.Provider>
  )
}
