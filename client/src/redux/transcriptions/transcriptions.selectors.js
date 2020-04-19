import { createSelector } from "reselect";

const selectTranscriptionsFromStore = (store) => store.transcriptions;

export const selectTranscriptions = createSelector(
  [selectTranscriptionsFromStore],
  (transcriptions) => transcriptions.data
);
