import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Saved";
import BookCard from "./components/BookCard";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

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
                title={book.volumeInfo.title}
                subtitle={book.volumeInfo.subtitle}
                authors={book.volumeInfo.authors}
                description={book.volumeInfo.description}
                image={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                }
              />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
