import axios from "axios";
import getKeywords from "./getKeywords";
import getTranscription from "./getTranscription";

const processAudio = async (customerUID, employeeUID, languageCode, data) => {
  const currentDate = new Date();
  const uid = Date.now();
  const destinationBlob = `customers/${customerUID}/employees/${employeeUID}/${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}/${uid}.mp3`;
  try {
    // Get the audio length and the sample rate
    const getAudioMetadata = await axios({
      url: "http://0.0.0.0:8080/get_audio_metadata",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
      },
    });
    const { audioLength, sampleRate } = getAudioMetadata.data;

    // Upload the audio
    // eslint-disable-next-line
    let uploadBlob = await axios({
      url: `http://0.0.0.0:8080/upload_blob?blob=${destinationBlob}`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
      },
    });

    // Get the transcription from the speech
    const transcriptionRequest = await getTranscription(
      destinationBlob,
      languageCode,
      sampleRate
    );
    const { transcription } = transcriptionRequest.data;

    // Get the keywords from the speech
    const keywordsRequest = await getKeywords(transcription, languageCode);
    const keywords = keywordsRequest.data;

    // Get the categories from the speech
    let categories = null;
    let translation = transcription;
    if (!languageCode.startsWith("en")) {
      const getTranslation = await axios({
        url: "http://0.0.0.0:8080/get_translation",
        method: "POST",
        data: {
          transcription,
        },
        headers: {
          Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
        },
      });
      translation = getTranslation.data;
    }
    // Get the categories
    const getCategories = await axios({
      url: "http://0.0.0.0:8080/content_classifier",
      method: "POST",
      data: {
        translation: translation.translation,
      },
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
      },
    });
    categories = getCategories.data;

    // Get the sentiment
    const getSentiment = await axios({
      url: "http://0.0.0.0:8080/get_sentiment",
      method: "POST",
      data: {
        transcription,
        languageCode,
      },
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
      },
    });
    const sentiment = getSentiment.data;
    // Store the document with all the data
    // eslint-disable-next-line
    let storeTranscript = await axios({
      url: "http://0.0.0.0:8080/store_data",
      method: "POST",
      headers: {
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
      },
      data: {
        reference: `customers/${customerUID}/employees/${employeeUID}/transcriptions`,
        transcription,
        audioLength,
        sampleRate,
        keywords,
        categories,
        sentiment,
      },
    });
    return {
      transcription,
      audioLength,
      sampleRate,
      categories,
      keywords,
      sentiment,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default processAudio;
