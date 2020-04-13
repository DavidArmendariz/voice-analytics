import axios from "axios";

const processAudio = async (customerUID, employeeUID, languageCode, data) => {
  const currentDate = new Date();
  const uid = Date.now();
  const destinationBlob = `customers/${customerUID}/employees/${employeeUID}/${currentDate.getFullYear()}-${currentDate.getMonth() +
    1}-${currentDate.getDate()}/${uid}.mp3`;
  try {
    let getMetadata = await axios({
      url: "https://us-central1-voice-8ddf6.cloudfunctions.net/audio_metadata",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    });
    const { length, rate } = getMetadata.data;
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
      url: `https://us-central1-voice-8ddf6.cloudfunctions.net/long_speech_to_text?uri=${destinationBlob}&language=${languageCode}&rate=${rate}`,
      method: "GET",
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    });
    const transcript = getTranscript.data;

    // let getKeywords = await axios({
    //   url: "http://0.0.0.0:8084/",
    //   method: "POST",
    //   data: {
    //     transcription: transcript,
    //     language: languageCode
    //   },
    //   headers: {
    //     Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
    //   }
    // });

    // const keywords = getKeywords.data;
    const keywords = { Lenin: 0.7 };
    console.log(keywords);

    // eslint-disable-next-line
    let storeTranscript = await axios({
      url:
        "https://us-central1-voice-8ddf6.cloudfunctions.net/store_transcriptions",
      method: "POST",
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      },
      data: {
        transcription: transcript,
        reference: `customers/${customerUID}/employees/${employeeUID}/transcriptions`,
        length,
        keywords
      }
    });
    return { transcript, audioLength: length };
  } catch (error) {
    console.log(error);
    return "Oops! There was an error. Try again.";
  }
};

export default processAudio;
