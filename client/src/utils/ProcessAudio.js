import axios from "axios";

const processAudio = async (employeeUUID, languageCode, data) => {
  const currentDate = new Date();
  const uid = Date.now();
  const destinationBlob = `employees/${employeeUUID}/${currentDate.getFullYear()}-${currentDate.getMonth() +
    1}-${currentDate.getDate()}/${uid}.mp3`;
  try {
    // eslint-disable-next-line
    let uploadToStorage = await axios({
      url: `https://us-central1-voice-8ddf6.cloudfunctions.net/upload_blob?blob=${destinationBlob}`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    });
    let getTranscript = await axios({
      url: `https://us-central1-voice-8ddf6.cloudfunctions.net/long_speech_to_text?uri=${destinationBlob}&language=${languageCode}`,
      method: "GET",
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    });
    return getTranscript.data;
  } catch (error) {
    console.log(error);
    return "Oops! There was an error. Try again.";
  }
};

export default processAudio;
