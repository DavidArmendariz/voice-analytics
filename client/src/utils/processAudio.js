import getKeywords from "./getKeywords";
import getTranscription from "./getTranscription";
import getSentiment from "./getSentiment";
import getCategories from "./getCategories";
import getAudioMetadata from "./getAudioMetadata";
import uploadBlob from "./uploadBlob";
import getTranslation from "./getTranslation";
import storeTranscript from "./storeTranscript";

const processAudio = async (customerUID, employeeUID, languageCode, data) => {
  const currentDate = new Date();
  const uid = Date.now();
  const destinationBlob = `customers/${customerUID}/employees/${employeeUID}/${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}/${uid}.mp3`;
  try {
    // Get the audio length and the sample rate
    const requestAudioMetadata = await getAudioMetadata(data);
    const { audioLength, sampleRate } = requestAudioMetadata.data;

    // Upload the audio
    // eslint-disable-next-line
    let requestUploadBlob = await uploadBlob(data, destinationBlob);

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

    // Translate the transcription to English to get the categories (only supported language)
    let translation = transcription;
    if (!languageCode.startsWith("en")) {
      const requestTranslation = await getTranslation(translation);
      translation = requestTranslation.data;
      translation = translation.translation;
    }
    // Get the categories
    const requestCategories = await getCategories(translation);
    const categories = requestCategories.data;

    // Get the sentiment
    const requestSentiment = await getSentiment(transcription, languageCode);
    const sentiment = requestSentiment.data;

    // Store the document with all the data
    const dataToStore = {
      transcription,
      audioLength,
      sampleRate,
      keywords,
      categories,
      sentiment,
    };
    // eslint-disable-next-line
    let requestStoreTranscript = await storeTranscript(
      dataToStore,
      `customers/${customerUID}/employees/${employeeUID}/transcriptions`
    );
    return dataToStore;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default processAudio;
