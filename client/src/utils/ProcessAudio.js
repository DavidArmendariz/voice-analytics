import axios from "axios";

const processAudio = async (customerUID, employeeUID, languageCode, data) => {
  const currentDate = new Date();
  const uid = Date.now();
  const destinationBlob = `customers/${customerUID}/employees/${employeeUID}/${currentDate.getFullYear()}-${currentDate.getMonth() +
    1}-${currentDate.getDate()}/${uid}.mp3`;
  try {
    let getAudioMetadata = await axios({
      url: "http://0.0.0.0:8080/get_audio_metadata",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    });
    const { audioLength, sampleRate } = getAudioMetadata.data;
    // eslint-disable-next-line
    let uploadBlob = await axios({
      url: `http://0.0.0.0:8080/upload_blob?blob=${destinationBlob}`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    });
    let getTranscript = await axios({
      url: "http://0.0.0.0:8080/get_transcript",
      method: "POST",
      data: { blob: destinationBlob, languageCode, sampleRate },
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    });
    const { transcription } = getTranscript.data;

    let getKeywords = await axios({
      url: "http://0.0.0.0:8080/get_keywords",
      method: "POST",
      data: {
        transcription,
        languageCode
      },
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    });

    const keywords = getKeywords.data;

    // eslint-disable-next-line
    let storeTranscript = await axios({
      url:
        "http://0.0.0.0:8080/store_data",
      method: "POST",
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      },
      data: {
        reference: `customers/${customerUID}/employees/${employeeUID}/transcriptions`,
        transcription,
        audioLength,
        sampleRate,
        keywords
      }
    });
    return { transcription, audioLength, sampleRate };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default processAudio;
