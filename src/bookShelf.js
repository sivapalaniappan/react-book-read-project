import React, { Component } from 'react';

class BookShelf extends Component {
  render() {
    const { bookShelfs = [] } = this.props;
    const bookShelfsList = bookShelfs.map((bookShelf, index) =>
      <div className="bookshelf" key={index}>
        <h2 className="bookshelf-title">{ bookShelf.heading }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookShelf.books.map((book, index) =>
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: book.cover.width, height: book.cover.height, backgroundImage: book.cover.imageUrl }}></div>
                    <div className="book-shelf-changer">
                      <select value={bookShelf.heading} onChange={(event) => this.props.onChangeShelf(bookShelf.heading, book, index, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="Currently Reading">Currently Reading</option>
                        <option value="Want to Read">Want to Read</option>
                        <option value="Read">Read</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            )
            }
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

export default BookShelf;
