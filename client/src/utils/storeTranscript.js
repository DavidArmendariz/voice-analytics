import axios from "axios";

const storeTranscript = (data, reference) => {
  return axios({
    url: "http://0.0.0.0:8080/store_data",
    method: "POST",
    headers: {
      Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
    },
    data: {
      reference,
      ...data,
    },
  });
};

export default storeTranscript;
