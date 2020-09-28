import AnalyticsDataActionTypes from "./analyticsdata.types";

export const fetchAnalyticsDataStart = (startDate, endDate) => ({
  type: AnalyticsDataActionTypes.FETCH_ANALYTICSDATA_START,
  startDate,
  endDate,
});

export const fetchAnalyticsDataSuccess = (data) => ({
  type: AnalyticsDataActionTypes.FETCH_ANALYTICSDATA_SUCCESS,
  data,
});

export const fetchAnalyticsDataFailure = (errorMessage) => ({
  type: AnalyticsDataActionTypes.FETCH_ANALYTICSDATA_FAILURE,
  payload: errorMessage,
});
