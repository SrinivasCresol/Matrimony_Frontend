import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./Helper";

export const uploadFunction = async (data) => {
  return await commonRequest("POST", `${BASE_URL}/uploads`, data)
}

export const registerFunction = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/register`, data, header);
};

export const getUserFunction = async (search, gender, status, sort, page) => {
  return await commonRequest(
    "GET",
    `${BASE_URL}/user/details?search=${search}&gender=${gender}&sort=${sort}&page=${page}`,
    ""
  );
};

export const singleUserGetFunction = async (id) => {
  return await commonRequest("GET", `${BASE_URL}/user/${id}`, "");
};

export const editFunction = async (id, data, header) => {
  return await commonRequest(
    "PUT",
    `${BASE_URL}/user/edit/${id}`,
    data,
    header
  );
};

export const statusChangeFunction = async (id, data) => {
  return await commonRequest("PUT", `${BASE_URL}/user/status/${id}`, { data });
};
