import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom'
import BookShelf from './bookShelf'
import Book from './books'
import BookSearch from './bookSearch'

class BooksApp extends React.Component {
  constructor() {
    super();
    this.initializeShelfs();
  }

  state = {
    query: '',
    books: [],
    bookShelfs : [
      {
        heading: "Currently Reading",
        shelf: "currentlyReading",
        books: []
      },
      {
        heading: "Want to Read",
        shelf: "wantToRead",
        books: []
      },
      {
        heading: "Read",
        shelf: "read",
        books: []
      }
    ]
  }

  initializeShelfs = () => {
    const getAllBooksPromise = BooksAPI.getAll();

    Promise.all([getAllBooksPromise])
    .then((values) => {
      let emptyShelfs = this.state.bookShelfs.slice();
      emptyShelfs.map(shelf => {
        shelf.books.length = 0;
      })

      values[0].map((book) => {
        emptyShelfs.map((bookShelf) => {
          if(bookShelf.shelf === book.shelf) {
            bookShelf.books.push(book);
          }
        })
      });

      this.setState({ bookShelfs: emptyShelfs });
    })
    .catch(() => { console.log('Promise Rejected');});
  }

  onChangeShelf = (book, newShelf) => {
    const updateShelfPromise = BooksAPI.update(book, newShelf);
    Promise.all([updateShelfPromise])
    .then((values) => {
      this.initializeShelfs();
      this.searchBook(this.state.query);
    });
  }

  searchBook = (query) => {
    this.setState({ query: query });
    if(query !== '') {
      const searchBookPromise = BooksAPI.search(query, 20);
      Promise.all([searchBookPromise])
      .then((values) => {
        const books = this.checkCurrentShelfs(values[0]);
        this.setState({ books: books });
      });
    }
    else if (query === '') {
      this.setState({ books: [] });
    }
  }

  checkCurrentShelfs = (books = []) => {
    if(books.error === "empty query") {
      books = [];
    }

    books.map((book) => {
      this.state.bookShelfs.map((bookShelf) => {
        bookShelf.books.map((bookInShelf) => {
          if(book.id === bookInShelf.id) {
            book.shelf = bookShelf.shelf
          }
        });
      });
    });
    return books;
  }

  clearSearch = () => {
    this.setState({ query: '' });
    this.setState({ books: [] });
  }

  render() {
    const { query = '', bookShelfs = [], books = [] } = this.state;

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch
            query={query}
            books={books}
            searchBook={this.searchBook}
            onChangeShelf={this.onChangeShelf}
            clearSearch={this.clearSearch}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                bookShelfs={bookShelfs}
                onChangeShelf={this.onChangeShelf}
              />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
