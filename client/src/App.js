import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Saved";
import BookCard from "./components/BookCard";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import API from "./utils/API";

class App extends React.Component {
  state = {
    books: [],
    searchQuery: ""
  };

  handleApiCall = async () => {
    const data = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchQuery
    );

    return data.json();
  };

  handleSubmitSearch = (e, query) => {
    e.preventDefault();
    const books = this.handleApiCall();
    books.then(data => {
      this.setState({
        books: data.items
      });
    });

    console.log(this.state.books);
  };

  handleSearchInput = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSave = id => {
    console.log("clicking");
    console.log(id);
    let bookIndex = this.state.books.findIndex(book => book.id === id);
    let bookToSave = this.state.books[bookIndex];
    let bookObject = {
      id: bookToSave.id,
      title: bookToSave.volumeInfo.title,
      subtitle: bookToSave.volumeInfo.subtitle,
      authors: bookToSave.volumeInfo.authors,
      description: bookToSave.volumeInfo.description,
      image:
        bookToSave.volumeInfo.imageLinks &&
        bookToSave.volumeInfo.imageLinks.thumbnail
    };
    console.log(bookObject);

    API.saveBook(bookObject).then(res => res);
  };

  render() {
    const { books, searchQuery } = this.state;
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
            <Route component={NoMatch} />
          </Switch>

          <div>
            <form onSubmit={this.handleSubmitSearch}>
              <input
                name="searchQuery"
                value={this.state.searchQuery}
                onChange={this.handleSearchInput}
                placeholder="Search For a Book"
              />
              <button type="submit">submit</button>
            </form>
            {this.state.books.map(book => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.volumeInfo.title}
                subtitle={book.volumeInfo.subtitle}
                authors={book.volumeInfo.authors}
                description={book.volumeInfo.description}
                image={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                }
                handleSave={this.handleSave}
              />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
