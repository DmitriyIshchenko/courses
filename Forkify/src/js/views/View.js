import icons from '../../img/icons.svg';

/* 
Exporting the entire class,
because not going to create any instance of this view.
Will use it as a parent class of other views.
*/
export default class View {
  _data;

  // public API
  render(data) {
    // check if the data exists

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    // _generateMarkup is unique for each view
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // only updates text and attributes in the DOM
  // w/o having to re-render the entire view
  update(data) {
    this._data = data;

    /* Create new markup for updated data but not render it.
    Instead, compare it to the current HTML. 
    Then, only change text and attributes that actually have changed
    from the old version to the new version.
    */
    const newMarkup = this._generateMarkup(); // string (difficult to compare)

    /* Convert markup string to a DOM object in order
    to compare it to the actual DOM. This will create a "virtual DOM",
    that is not really living on the page, but lives in memory.
    */
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // it can be treated like real DOM, so it's possible to use all these
    // quesSelectorAll() returns NodeList, but we need arrays to compare them
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Compare 1 by 1 (loop through both at the same time)
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      /* Actual updating
      Update only those elements that contain ONLY text.
      Value of nodeValue will be null if the node is an element, 
      but if it is text, we get the content of the text node.
      The element itself is just an element node,
      but the text is in the child text node (might not exist - use optional chaining) 
      of the element node.
       */
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim())
        curEl.textContent = newEl.textContent;

      // Update changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // set default error message
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
          </div>
          <p>${message}</p>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
          </div>
          <p>${message}</p>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
