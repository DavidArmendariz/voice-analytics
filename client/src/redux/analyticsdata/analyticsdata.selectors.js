import { createSelector } from "reselect";

const selectAnalyticsDataFromStore = (store) => store.analytics;

export const selectAnalyticsData = createSelector(
  [selectAnalyticsDataFromStore],
  (analytics) => analytics.data
);
