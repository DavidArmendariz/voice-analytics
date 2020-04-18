import axios from "axios";

const getAudioMetadata = (data) => {
  return axios({
    url: "http://0.0.0.0:8080/get_audio_metadata",
    method: "POST",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
    },
  });
};

export default getAudioMetadata;
