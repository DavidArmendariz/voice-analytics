import AnalyticsDataActionTypes from "./analyticsdata.types";

const INITIAL_STATE = {
  data: [],
  isFetching: false,
  errorMessage: undefined,
};

const analyticsDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AnalyticsDataActionTypes.FETCH_ANALYTICSDATA_START:
      return {
        ...state,
        isFetching: true,
      };
    case AnalyticsDataActionTypes.FETCH_ANALYTICSDATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };

    case AnalyticsDataActionTypes.FETCH_ANALYTICSDATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default analyticsDataReducer;
