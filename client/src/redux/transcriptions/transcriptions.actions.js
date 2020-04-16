import TranscriptionsActionTypes from "./transcriptions.types";

export const fetchTranscriptionsStart = (customerUID, employeeUID, startDate, endDate) => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_START,
  customerUID,
  employeeUID,
  startDate,
  endDate
});

export const fetchTranscriptionsSuccess = data => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_SUCCESS,
  data
});

export const fetchTranscriptionsFailure = errorMessage => ({
  type: TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_FAILURE,
  payload: errorMessage
});