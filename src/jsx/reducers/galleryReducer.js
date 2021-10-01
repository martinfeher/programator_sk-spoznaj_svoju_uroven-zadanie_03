import { config } from "../../config"; 


import {
  GET_GALLERY,
  SET_LOADING,
  GALLERY_ERROR,
  ADD_GALLERY,
  DELETE_GALLERY,
} from '../actions/types';

const initialState = {
  galleryItems: {},
  loading: false,
  error: null
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY:
      return {
        ...state,
        galleryItems: action.payload,
        loading: false
      };
    case ADD_GALLERY:
      return {
        ...state,
        galleryItems: [...state.galleryItems, action.payload],
        loading: false
      };
    case DELETE_GALLERY:
      if (config.APP_ENV === "production") {
        return {
          ...state, 
          galleryItems: state.galleryItems.filter(galleryItems => galleryItems.path !== action.payload),
          loading: false
        };
      } else {
        return {
          ...state, 
          galleryItems: state.galleryItems.filter(galleryItems => galleryItems.id !== action.payload),
          loading: false
        };
      }
      
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GALLERY_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default galleryReducer;
