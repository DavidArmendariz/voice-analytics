import TranscriptionsActionTypes from "./transcriptions.types";

export const fetchTranscriptionsStart = uid => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_START,
  uid
});

export const fetchTranscriptionsSuccess = data => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_SUCCESS,
  data
});

export const fetchTranscriptionsFailure = errorMessage => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_FAILURE,
  payload: errorMessage
});