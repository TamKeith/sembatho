import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'; 
import { setCategories } from '../../store/categories/category.action';
import { fetchCategoriesStart } from '../../store/categories/category.action';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';
import CategoryPreview from '../../components/category-preview/category-preview.component';

import './shop.styles.scss';

const Shop = () => {

  // const { categoriesMap } = useContext(CategoriesContext);
  // console.log(categoriesMap);

  /**
   * What you want to do with thunks is essentially you wanna figure out where in your application code base you have async behaviour that you can move into an action driven flow
   */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  // Since we are no longer working with thunks
  // useEffect(() => {
  //   dispatch(fetchCategoriesAsync());
  // }, []);

  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     // const categoryMap = await getCategoriesAndDocuments();    <----- used when we were usiug the context api
  //     // console.log(categoryMap);
  //     // dispatch(setCategoriesMap(categoryMap));
      
  //     const categoriesArray = await getCategoriesAndDocuments();
  //     // console.log(categoriesArray);
  //     dispatch(setCategories(categoriesArray)); <----- now using Thunk and this function of fetching is no longer async anymore, and the logic of fetching is now passed to the action creators
  //   };
  //   getCategoriesMap();
  // }, []);

  return (
    // APPROACH 1) THIS IS THE CODE WITHOUT THE PREVIEW THAT DISPLAYS ALL THE CATEGORIES WITH ALL THEIR PRODUCTS 
    // <Fragment>
    //   {Object.keys(categoriesMap).map((title) => (
    //     <Fragment key={title}>
    //       <h2>{title}</h2>
    //       <div className='products-container'>
    //         { categoriesMap[title].map((product) => (
    //           <ProductCard key={product.id} product={product}/>
    //         ))}
    //       </div>
    //     </Fragment>
    //   ))}
    // </Fragment>

    // APPROACH 2)THIS IS THE CODE THAT NOW DISPLAYED THE PRRVIEW OF THE ELEMENTS BUT IS NOW REPLACED BY THE CATEGORIES COMPONENT
    // <div className='shop-container'>
    //   {Object.keys(categoriesMap).map((title) => {
    //     const products = categoriesMap[title];
    //     return <CategoryPreview key={title} title={title} products={products} />
    //   })}
    // </div>
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;