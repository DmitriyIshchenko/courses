import View from './View';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
  _message = '';

  _generateMarkup() {
    /* We can't just call generateMarkup(), because we need to set the data,
      so we should use render(), but it will try to insert that markup in the page.
      So we need to change the render method of the parent view 
      to avoid that (setting render to false)
    */
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
