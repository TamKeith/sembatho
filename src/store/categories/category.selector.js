// createSelector memoizes your selectors assuming that the input has not changed then the output should be the same
import { createSelector } from 'reselect';

// we need to create input and output selectors
// input selectors are selectors that give us the parameters that we need in order to determine what our output should be

const selectCategoryReducer = (state) => state.categories;

// Memoized selector (gives us back the categories array that live on the categories slice of our Redux State)
export const selectCategories = createSelector(
  [selectCategoryReducer], // array of input selectors will positionally match the inputs in output selector
  (categorySlice) => categorySlice.categories // output selector. only runs if 'selectCategoryReducer' hence 'categorySlice' is different
);

// Memoized selector (gives us back the categories map by reducing over the categories array we got above)
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
