import AnalyticsDataActionTypes from "./analyticsdata.types";

export const fetchAnalyticsDataStart = (customerUID, startDate, endDate) => ({
  type: AnalyticsDataActionTypes.FETCH_ANALYTICSDATA_START,
  customerUID,
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
