import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // ANCHOR[id=publisher] - PUBLISHER
  // Subscriber: // LINK ../controller.js/#subscriber

  addHandlerClick(handler) {
    // don't listen to each button individually, use event delegation
    this._parentElement.addEventListener('click', function (e) {
      // closest() searches up in the tree for parents (opposite of querySelector())
      const btn = e.target.closest('.btn--inline');

      // click outside of buttons - null
      if (!btn) return;

      // read btn data attribute
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const { page: curPage, results, resultsPerPage } = this._data;
    /* in order to figure out if we are on page 1 
    and if there are other pages we need to know how many pages there are */
    const numPages = Math.ceil(results.length / resultsPerPage);

    // Page 1, and there are other pages - render only next button
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    // Last page (but not the only one) - render only prev button
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    // Other page - render both buttons
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev', curPage) +
        this._generateMarkupButton('next', curPage)
      );
    }

    // None of the scenarios from above is met
    // Page 1, and there no other pages - no buttons
    return '';
  }

  _generateMarkupButton(type, curPage) {
    const arrowDirection = type === 'prev' ? 'left' : 'right';
    const destinationPage = type === 'prev' ? curPage - 1 : curPage + 1;

    // icon position is different for different button types
    // use data attribute to contain the destination page
    return `
      <button data-goto='${destinationPage}' class="btn--inline pagination__btn--${type}">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-${arrowDirection}"></use>
      </svg>
      <span>Page ${destinationPage}</span>
      </button>
    `;
  }
}

export default new PaginationView();
