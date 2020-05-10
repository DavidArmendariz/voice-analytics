import CustomerMetadataActionTypes from "./customermetadata.types";

const INITIAL_STATE = {
  customerMetadata: null,
  isFetching: false,
  errorMessage: undefined,
};

const customerMetadataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerMetadataActionTypes.FETCH_CUSTOMER_METADATA_START:
      return {
        ...state,
        isFetching: true,
      };
    case CustomerMetadataActionTypes.FETCH_CUSTOMER_METADATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        customerMetadata: action.metadata,
      };

    case CustomerMetadataActionTypes.FETCH_CUSTOMER_METADATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default customerMetadataReducer;
