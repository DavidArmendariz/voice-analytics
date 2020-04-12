import TranscriptionsActionTypes from "./transcriptions.types";

const INITIAL_STATE = {
  data: null,
  isFetching: false,
  errorMessage: undefined
};

const transcriptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_START:
      return {
        ...state,
        isFetching: true
      };
    case TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      };

    case TranscriptionsActionTypes.FETCH_TRANSCRIPTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default transcriptionsReducer;
