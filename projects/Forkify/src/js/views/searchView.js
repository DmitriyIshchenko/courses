class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  // ANCHOR[id=publisher] - PUBLISHER
  // Subscriber: // LINK ../controller.js#subscriber

  addHandlerSearch(handler) {
    // add listener to the entire form (instead of the button)
    // in order to listen for submit event
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault(); // form reloads the page
      handler();
    });
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
