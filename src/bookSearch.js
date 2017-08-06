import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './books';
import PropTypes from 'prop-types';

class BookSearch extends Component {
  render() {
    const { query = '', books = [] } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.props.clearSearch}>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.props.searchBook(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length > 0 &&
              books.map((book,index) => (
                <Book book={book} key={index} onChangeShelf={this.props.onChangeShelf}/>
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

BookSearch.propTypes = {
  query: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  searchBook: PropTypes.func.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookSearch;
