import axios from "axios";
import { request, request_llm } from "../utils/constant";

const API = axios.create({
  baseURL: request,
  timeout: 20000,
});

export { API as axios };

const API_LLM = axios.create({
  baseURL: request_llm,
  timeout: 90000,
});

export { API_LLM as axios_llm };
