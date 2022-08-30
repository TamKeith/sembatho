import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";


// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCategoriesAndDocuments();
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// }

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories'); // anywhere you have a function and you wanna turn it into an effect, you essentially use the call keyword
    yield put(fetchCategoriesSuccess(categoriesArray)); //we do not call dispatch inside of a generator, we call put
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories(){
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync); // if you have a bunch of actions take the latest one
}

// SET UP ACTUAL EXPORT FROM THIS SAGAs FILE which is pretty much an accumulator that hold all your sagas that are related to the category
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // run everything inside and only complete when all of it is done
}