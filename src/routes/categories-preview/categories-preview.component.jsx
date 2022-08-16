import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';
import CategoryPreview from '../../components/category-preview/category-preview.component';

// import './categories-preview.styles.scss';     <----- since this file is similar in structure to the shop-component, the styles inside we have already defined

const CategoriesPreview = () => {

  const { categoriesMap } = useContext(CategoriesContext);
  console.log(categoriesMap);
  return (
    // THIS IS THE CODE WITHOUT THE PREVIEW
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

    <Fragment>
      {
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products} />
        })
      }
    </Fragment>
  );
};

export default CategoriesPreview;