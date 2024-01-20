// GET /posts?_sort=views&_order=asc
// GET /posts/1/comments?_sort=votes&_order=asc

import axiosInstance from "../../utils/axios";

export const getLoggedInUser = async (data) => {
  const respose = await axiosInstance.post(`/users/login`, data);

  return respose.data;
};
export const getRegisteredUser = async (data) => {
  const respose = await axiosInstance.post(`/users/register`, data);

  return respose.data;
};

export const getLoggedOutUser = async () => {
  const respose = await axiosInstance.get(`/users/logout`);

  return respose.data;
};
