import { API_URL } from './config';
import { getJSON } from './helpers';

/* 
exports are not copies but a live connection -> 
state is also going to be updated in the controller
*/
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
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
  } catch (err) {
    // re-throw error to handle it in controller
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    // re-throw error
    throw err;
  }
};
