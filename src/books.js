import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  render() {
    const { book = {} } = this.props;
    const { imageLinks = {} } = book;
    return (
      <li>
        <div className="book">
          <div className="book-top" style={{ backgroundImage: `url(${imageLinks.thumbnail ? imageLinks.thumbnail : imageLinks.smallThumbnail})` }}>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => this.props.onChangeShelf(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors &&
            book.authors.map((author, index) => (
              <div className="book-authors" key={index}>{author}</div>
            )
          )}
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book;
