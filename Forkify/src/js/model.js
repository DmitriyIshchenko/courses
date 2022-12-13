import { API_URL } from './config';
import { getJSON } from './helpers';

/* 
exports are not copies but a live connection -> 
state is also going to be updated in the controller
*/
export const state = {
  recipe: {},
};

// get the data and change state (will return a promise)
export const loadRecipe = async function (id) {
  try {
    // get data
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    // format data
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // re-throw error to handle it in controller
    throw err;
  }
};
