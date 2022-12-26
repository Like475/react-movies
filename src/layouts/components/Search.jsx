import { useState, useRef, useEffect } from 'react';

function Search(props) {
  const [ search, setSearch ] = useState('');
  const [ type, setType ] = useState('all');
  const searchRef = useRef();

  const searchSync = (event) => setSearch(event.target.value);

  const searchTypeSync = (event) => {
    setType(event.target.value);
    props.search(search, event.target.value);
  }

  const searchKey = (event) => {
    if (event.key === 'Enter') {
      props.search(search, type);
    }
  }

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="Search col s12 row">
      <div className="input-field col s12">
        <input
          id="search"
          value={search}
          type="text"
          className="validate"
          onChange={searchSync}
          onKeyDown={searchKey}
          ref={searchRef}
        />
        <label htmlFor="search">Press Enter for search</label>
      </div >
      <div className="types col s12 row">
        <p className="col s4">
          <label>
            <input className="with-gap" value="all" name="type" type="radio" checked={type === 'all'} onChange={searchTypeSync} />
            <span>All</span>
          </label>
        </p>
        <p className="col s4">
          <label>
            <input className="with-gap" value="movie" name="type" type="radio" checked={type === 'movie'} onChange={searchTypeSync} />
            <span>Movie</span>
          </label>
        </p>
        <p className="col s4">
          <label>
            <input className="with-gap" value="series" name="type" type="radio" checked={type === 'series'} onChange={searchTypeSync} />
            <span>Series</span>
          </label>
        </p>
      </div>
    </div>
  );
}

export { Search };