import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!';
  _message = '';

  /* We can't just call generateMarkup(), because we need to set the data,
    so we should use render(), but it will try to insert that markup in the page.
    So we need to change the render method of the parent view 
    to avoid that (setting render to false)
    */
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
