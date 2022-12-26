import { useState, useEffect } from 'react';
import { CardsList } from './components/CardsList';
import { Preloader } from './components/Preloader';
import { Search } from './components/Search';

function Main() {
  const [ movies, setMovies ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ manyResults, setManyResults ] = useState(false);
  const [ notFound, setNotFound ] = useState(false);

  const search = (name, type) => {
    let api = '';
    let nameS = name;
    if (name === '') {
      nameS = 'matrix';
    }
    if (type === 'all' | type === '') {
      api = `https://www.omdbapi.com/?apikey=d0acc7c0&s=${nameS}`;
    } else if (type === 'movie') {
      api = `https://www.omdbapi.com/?apikey=d0acc7c0&s=${nameS}&type=movie`;
    } else if (type === 'series') {
      api = `https://www.omdbapi.com/?apikey=d0acc7c0&s=${nameS}&type=series`;
    }
    fetch(api)
      .then(res => res.json())
      .then((result) => {
        setIsLoading(true);
        if (typeof result['Search'] !== 'undefined') {
          setMovies(result.Search);
          setManyResults(false);
          setNotFound(false);
        } else if (result['Error'] === 'Too many results.') {
          setMovies([]);
          setManyResults(true);
          setNotFound(false);
        } else if (result['Error'] === 'Movie not found!') {
          setMovies([]);
          setManyResults(false);
          setNotFound(true);
        }})
      .then(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    search('', '');
  }, []);

  return isLoading ? (
    <main className="loading row">
      <Search search={search} />
      <Preloader />
    </main>
  ) : ( manyResults ? (
      <main className="many-results row">
        <Search search={search} />
        <div className="container">
          <h4>Too many results</h4>
        </div>
      </main>
    ) : ( notFound ? (
        <main className="not-found row">
          <Search search={search} />
          <div className="container">
            <h4>Movie not found!</h4>
          </div>
        </main>
      ) : (
        <main className='row'>
          <Search search={search} />
          <CardsList movies={movies} />
        </main>
      )
    )
  );
}

export { Main };