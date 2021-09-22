import React from 'react';
import RecipesCardFood from '../components/RecipesCardFood';
// import RecipesContext from '../context/RecipesContext';

function FoodsDetails() {
  // const { data: { recipes } } = useContext(RecipesContext);

  return (
    <div>
      <RecipesCardFood />
    </div>
  );
}

export default FoodsDetails;
