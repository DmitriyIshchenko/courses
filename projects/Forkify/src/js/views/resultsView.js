import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again :)';
  _successMessage;

  _generateMarkup() {
    return this._data.map(this._generateMarkupPrewiew).join('');
  }

  _generateMarkupPrewiew(preview) {
    const id = window.location.hash.slice(1);
    const activeClass = id === preview.id ? 'preview__link--active' : '';
    return `
    <li class="preview">
      <a class="preview__link  ${activeClass}" href="#${preview.id}">
        <figure class="preview__fig">
          <img src="${preview.image}" alt="${preview.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${preview.title}</h4>
          <p class="preview__publisher">${preview.publisher}</p>
        </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();
