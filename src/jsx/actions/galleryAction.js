import { config } from "../../config"; 

import {
  GET_GALLERY,
  SET_LOADING,
  GALLERY_ERROR,
  ADD_GALLERY,
  DELETE_GALLERY,
} from "./types";

// Get galleries from server
export const getGalleryItems = () => async dispatch => {
  try {
    setLoading();

    const url = `${config.API_SERVER_URL}/gallery`;
    const res = await fetch(url);
    const data = await res.json();
    dispatch({
      type: GET_GALLERY,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: GALLERY_ERROR,
      payload: err.response
    });
  }
  
};

// Add new gallery item
export const addGalleryItem = gallery => async dispatch => {
  try {
    setLoading();

    const new_api_item = {};
      new_api_item.name = gallery.galleryTitle;

    const res = await fetch(config.API_SERVER_URL + "/gallery", {
      method: 'POST',
      body: JSON.stringify(new_api_item),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_GALLERY,
      payload: data
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GALLERY_ERROR,
      payload: err.response
    });
  }
};

// Delete gallery from server
export const deleteGalleryItem = path => async (dispatch) => {
  try {
    setLoading();

    const url = `${config.API_SERVER_URL}/gallery`;

    await fetch(`${url}/${path}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_GALLERY,
      payload: path,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: GALLERY_ERROR,
      payload: err.response,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
