import CustomerMetadataActionTypes from "./customermetadata.types";

export const fetchMetadataStart = () => ({
  type: CustomerMetadataActionTypes.FETCH_CUSTOMER_METADATA_START,
});

export const fetchMetadataSuccess = (metadata) => ({
  type: CustomerMetadataActionTypes.FETCH_CUSTOMER_METADATA_SUCCESS,
  metadata,
});

export const fetchMetadataFailure = (errorMessage) => ({
  type: CustomerMetadataActionTypes.FETCH_CUSTOMER_METADATA_FAILURE,
  errorMessage,
});
