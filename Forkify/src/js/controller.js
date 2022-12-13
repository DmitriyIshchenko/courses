import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';

const controlRecipes = async function () {
  try {
    // get id from the url hash
    const id = window.location.hash.slice(1);
    console.log(id);

    // page loaded w/o recipe id
    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe from the API (returns a promise)
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

/* // ANCHOR[id=subscriber] - SUBSCRIBER
    We want to handle events in the controller, 
  because otherwise we would have application logic in the view.
    On the other hand, we want to listen for the events in the view,
  because otherwise we would need DOM elements and presentation logic in the controller,
  which stands against the idea of our MVC implementation.
    So event listeners should be attached to DOM elements in the view, 
  but the events should be handled in the controller (publisher-subscriber pattern)

  Publisher -> // LINK ./views/recipeView.js#publisher
  */
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
