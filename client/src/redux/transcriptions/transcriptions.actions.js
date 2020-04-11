import TranscriptionsActionTypes from "./transcriptions.types";

export const fetchTranscriptionsStart = uid => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_START,
  uid
});

export const fetchTranscriptionsSuccess = (transcriptions, data) => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_SUCCESS,
  transcriptions,
  data
});

export const fetchTranscriptionsFailure = errorMessage => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_FAILURE,
  payload: errorMessage
});