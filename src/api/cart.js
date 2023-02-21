import { useContext } from 'react';
import { UserContext } from '../Context';
import client from './axios'


const addToCart = async (params) => {

    const { userId, id, quantity, action, size } = params;
    const res = await client.put(
      `/carts/${userId}`,
      {
        userId,
        productId: id,
        quantity,
        action,
        size

      },
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    ).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });;
    return res;
  };
  const getTheCart = async ({userId}) => {
    const res = await client.get(`/carts/find/${userId}`, {
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });
    return res;
  };
  
  const checkout = async () => {
    const res = await client.get("/cart/checkout", {
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });
    return res;
  };
  
  export { addToCart, getTheCart, checkout };