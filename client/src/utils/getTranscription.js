import axios from "axios";
const getTranscription = (destinationBlob, languageCode, sampleRate) => {
  return axios({
    url: "http://0.0.0.0:8080/get_transcription",
    method: "POST",
    data: { blob: destinationBlob, languageCode, sampleRate },
    headers: {
      Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
    },
  });
};

export default getTranscription;
