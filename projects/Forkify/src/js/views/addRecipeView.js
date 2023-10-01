import View from './View';
import icons from '../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  /* Controller doesn't need to interfere with,
  so we can run addHandlerToggleWindow as soon as object is created.
  However, we need to import this object in controller, otherwise it will never be created */
  constructor() {
    super();
    this._addHandlerToggleWindow();
  }

  toggle() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerToggleWindow() {
    // this keyword inside of handler points to DOM element, so we need to provide it manually using bind()
    [this._btnOpen, this._btnClose, this._overlay].forEach(el =>
      el.addEventListener('click', this.toggle.bind(this))
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // submitting the form reloads the page

      // use FromData API to get all input values at once (this - parentElement)
      // will return array of entries
      const dataArr = [...new FormData(this)];

      // convert array of entries to object
      // opposite of entries() array method
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  // form markup
  _generateMarkup() {
    return `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST123" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST123" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TEST123" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST123" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input value="0.5,kg,Rice" type="text" required name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 2</label>
    <input value="1,,Avocado" type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 3</label>
    <input value=",,salt" type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 4</label>
    <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 5</label>
    <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
    <label>Ingredient 6</label>
    <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="${icons}#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }
}

export default new addRecipeView();
