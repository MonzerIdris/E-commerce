import client from "./axios"

const addItem = async (params) => {
    const { title, desc, img, categories, size, color, price, } = params;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("img", img);
    formData.append("categories,", categories);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("price", price);

    const res = await client.post("/product", formData, {
      headers: {
        "Content-type": "multipart/form-data",
        token: localStorage.getItem("token") || "",
      },
    });
    return res;
  };
  
  const getItem = async ({id}) => {
   
    const res = await client.get(`/products/find/${id}`, {


    }).catch(function (error) {
        console.log(error.toJSON());
      });;
    return res;
  };

  const getItems = async ({ queryKey }) => {
    const [_key, { keyword, page, categories, }] = queryKey;
    const res = await client.get("/products/", {
        query: {
            category: categories
        },
      headers: {
        keyword,
        page,
        categories,
      },
    });
    return res;
  };
  
  const deleteItem = async ({ id }) => {
    const res = await client.delete("/product/", {
      headers: {
        id,
        token: localStorage.getItem("token") || "",
      },
    });
    return res;
  };
  
  export { addItem, getItem,getItems, deleteItem };