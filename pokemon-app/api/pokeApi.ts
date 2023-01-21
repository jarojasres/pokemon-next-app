import axios from "axios";
import { POKE_API_URL } from "utils";

const pokeApi = axios.create({
  baseURL: POKE_API_URL
});

export default pokeApi;
