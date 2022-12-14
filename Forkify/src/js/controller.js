import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// parcel hot module reloading
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // get id from the url hash
    const id = window.location.hash.slice(1);

    // page loaded w/o recipe id
    if (!id) return;
    recipeView.renderSpinner();

    // 0. Update the result view to mark selected recipe
    resultsView.update(model.getSearchResultPage());

    // 1. Loading recipe from the API
    // (manipulates the state, doesn't return actual data, but returns a promise)
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load recipes data
    // also doesn't return any data, but manipulates the state
    await model.loadSearchResults(query);

    // 3. Render results
    // resultsView.render(model.state.search.results); // render all results
    resultsView.render(model.getSearchResultPage());

    // 4. Render initial pagination buttons
    // (pass the entire search object in order to calculate which buttons to render)
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // 1. Render NEW results
  resultsView.render(model.getSearchResultPage(goToPage));

  // 2. Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // NOTE - only update text and attributes in the DOM w/o having to re-render the entire view
  recipeView.update(model.state.recipe);
};

/* // ANCHOR[id=subscriber] - SUBSCRIBER
    We want to handle events in the controller, 
  because otherwise we would have application logic in the view.
    On the other hand, we want to listen for the events in the view,
  because otherwise we would need DOM elements and presentation logic in the controller,
  which stands against the idea of our MVC implementation.
    So event listeners should be attached to DOM elements in the view, 
  but the events should be handled in the controller (publisher-subscriber pattern)

  Publishers:
  // LINK ./views/recipeView.js#publisher
  // LINK ./views/searchView.js#publisher
  // LINK ./views/paginationView.js#publisher
  // and so on
  */
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
