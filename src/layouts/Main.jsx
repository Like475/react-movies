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
    this.search('', '');
  }

  search = (name, type) => {
    let api = '';
    let nameS = name;
    if (name === '') {
      nameS = 'matrix';
    }
    if (type === 'all' | type === '') {
      api = 'https://www.omdbapi.com/?apikey=d0acc7c0&s=' + nameS;
      console.log('a');
    } else if (type === 'movie') {
      api = 'https://www.omdbapi.com/?apikey=d0acc7c0&s=' + nameS + '&type=movie';
      console.log('m');
    } else if (type === 'series') {
      api = 'https://www.omdbapi.com/?apikey=d0acc7c0&s=' + nameS + '&type=series';
      console.log('s');
    }
    console.log('here');
    fetch(api)
      .then(res => res.json())
      .then((result) => {
        this.setState({isLoading: true});
        console.log(api);
        if (typeof result['Search'] !== 'undefined') {
          this.setState(() => ({
            movies: result.Search,
            manyResults: false,
            notFound: false
          }));
          console.log('norm');
        } else if (result['Error'] === 'Too many results.') {
          this.setState(() => ({
            movies: [],
            manyResults: true,
            notFound: false
          }));
        } else if (result['Error'] === 'Movie not found!') {
          this.setState(() => ({
            movies: [],
            manyResults: false,
            notFound: true
          }));
        }})
      .then(() => {
        this.setState({isLoading: false});
        console.log('HERE');
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