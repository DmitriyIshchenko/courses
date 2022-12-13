import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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

// listen for hash changing to render corresponding recipe
// window.addEventListener('hashchange', controlRecipes);
// render recipe on page load
// window.addEventListener('load', controlRecipes);

// w/o duplicated code
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
