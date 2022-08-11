import View from './View';
// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const nextBtn = this._generateMarkupButton('next', curPage);
    const prevBtn = this._generateMarkupButton('prev', curPage);

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextBtn;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return prevBtn;
    }
    // Other page
    if (curPage < numPages) {
      return prevBtn + nextBtn;
    }

    // Page 1, there are no other pages
    return '';
  }

  _generateMarkupButton(type, curPage) {
    const page = type === 'next' ? curPage + 1 : curPage - 1;
    const arrow = type === 'next' ? 'arrow-right' : 'arrow-left';
    return `
      <button class="btn--inline pagination__btn--${type}" data-goto="${page}">
        <span>Page ${page}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-${arrow}"></use>
        </svg>
      </button> 
    `;
  }
}

export default new PaginationView();
