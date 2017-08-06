import React, { Component } from 'react';
import Book from './books';
import PropTypes from 'prop-types';

class BookShelf extends Component {
  render() {
    const { bookShelfs = [] } = this.props;

    const bookShelfsList = bookShelfs.map((bookShelf, index) =>
      <div className="bookshelf" key={index}>
        <h2 className="bookshelf-title">{ bookShelf.heading }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookShelf.books.map((book, index) => (
              <Book book={book} key={index} onChangeShelf={this.props.onChangeShelf}/>
            ))}
          </ol>
        </div>
      </div>
    );

    return (
      <div>
        {bookShelfsList}
      </div>
    )
  }
}

BookShelf.propTypes = {
  bookShelfs: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf;
