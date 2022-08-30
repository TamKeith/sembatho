import { CATEGORIES_ACTION_TYPES } from "./category.types"; 

export const CATEGORIES_INITIAL_STATE =  {
  categories: [],
  isLoading: false, //tell our reducer to track if it is in a loading state for the data it will hold (by default it wont be unless somehthing triggers is to be)
  error: null // track error states coz as we do async fetching now, our reducer should be aware whether an error occured in the error fetching process
}

export const categoryReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch(type){
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state, 
        categories: payload,
        isLoading: false
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false
      };
    default: 
      return state;
  }
}