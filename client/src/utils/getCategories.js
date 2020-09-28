import axios from "axios";

const getCategories = (translation) => {
  return axios({
    url: "http://0.0.0.0:8080/content_classifier",
    method: "POST",
    data: {
      translation,
    },
    headers: {
      Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
    },
  });
};

export default getCategories;
