import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsArea from './pages/ExploreFoodsArea';
import Profile from './pages/Profile';
import ExploreFoods from './pages/ExploreFoods';
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinksDetails';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ FoodsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        {/* <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } /> */}
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodsArea } />
        <Route exact path="/perfil" component={ Profile } />
        {/* <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } /> */}
      </Switch>
    </RecipesProvider>
  );
}

export default App;
