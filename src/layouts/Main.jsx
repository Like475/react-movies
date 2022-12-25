import { Component } from 'react';
import { CardsList } from './components/CardsList';
import { Preloader } from './components/Preloader';
import { Search } from './components/Search';

class Main extends Component {
  state = {
    movies: [],
    isLoading: true,
    manyResults: false,
    notFound: false
  }

  componentDidMount() {
    this.search('matrix');
  }

  search = (name) => {
    this.setState({isLoading: true});
    fetch('https://www.omdbapi.com/?apikey=d0acc7c0&s=' + name)
      .then(res => res.json())
      .then((result) => {
        if (typeof result['Search'] !== 'undefined') {
          this.setState(() => ({
            movies: result.Search,
            isLoading: false,
            manyResults: false,
            notFound: false
          }));
        } else if (result['Error'] === 'Too many results.') {
          this.setState(() => ({
            movies: [],
            isLoading: false,
            manyResults: true,
            notFound: false
          }));
        } else if (result['Error'] === 'Movie not found!') {
          this.setState(() => ({
            movies: [],
            isLoading: false,
            manyResults: false,
            notFound: true
          }));
        }
      });
  }

  render() {
    const { movies, isLoading, manyResults, notFound } = this.state;
    return isLoading ? (
      <main className="loading row">
        <Search search={this.search} />
        <Preloader />
      </main>
    ) : ( manyResults ? (
        <main className="many-results row">
          <Search search={this.search} />
          <div className="container">
            <h4>Too many results</h4>
          </div>
        </main>
      ) : ( notFound ? (
          <main className="not-found row">
            <Search search={this.search} />
            <div className="container">
              <h4>Movie not found!</h4>
            </div>
          </main>
        ) : (
          <main className='row'>
            <Search search={this.search} />
            <CardsList movies={movies} />
          </main>
        )
      )
    );
  }
}

export { Main };