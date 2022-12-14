import { API_URL, RES_PER_PAGE } from './config';
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
    page: 1,
    resultsPerPage: RES_PER_PAGE,
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

/* 
PAGINATION
Return part of search results (e.g. 10 per page)
Page 1: 0-9
Page 2: 10-19
Page 3: 20-29
...
Page n: (n-1)*10 - n*10-1
*/
export const getSearchResultPage = function (page = state.search.page) {
  // store information about current page in order to use it in the paginationView
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage; // slice doesn't include last element

  return state.search.results.slice(start, end);
};
