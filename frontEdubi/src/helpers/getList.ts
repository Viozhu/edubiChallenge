import Axios from "./Axios";

export const getTodos = async () => {
  try {
    const response = await Axios.get("/todos");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
