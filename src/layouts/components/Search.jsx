import { Component, createRef } from 'react';

class Search extends Component {
  state = {
    search: '',
    type: 'all'
  }

  searchRef = createRef();

  searchSync = (event) => {
    this.setState({
      search: event.target.value
    });
  }

  searchTypeSync = (event) => {
    this.setState({
      type: event.target.value
    });
    this.searchFunc(event.target.value);
  }

  searchKey = (event) => {
    if (event.key === 'Enter') {
      this.searchFunc(this.state.type);
    }
  }

  searchFunc = (type) => {
    this.props.search(this.state.search, type);
  }

  componentDidMount() {
    this.searchRef.current.focus();
  }

  render () {
    return (
      <div className="Search col s12 row">
        <div className="input-field col s12">
          <input
            id="search"
            value={this.state.search}
            type="text"
            className="validate"
            onChange={this.searchSync}
            onKeyDown={this.searchKey}
            ref={this.searchRef}
          />
          <label htmlFor="search">Press Enter for search</label>
        </div >
        <div className="types col s12 row">
          <p className="col s4">
            <label>
              <input className="with-gap" value="all" name="type" type="radio" checked={this.state.type === 'all'} onChange={this.searchTypeSync} />
              <span>All</span>
            </label>
          </p>
          <p className="col s4">
            <label>
              <input className="with-gap" value="movie" name="type" type="radio" checked={this.state.type === 'movie'} onChange={this.searchTypeSync} />
              <span>Movie</span>
            </label>
          </p>
          <p className="col s4">
            <label>
              <input className="with-gap" value="series" name="type" type="radio" checked={this.state.type === 'series'} onChange={this.searchTypeSync} />
              <span>Series</span>
            </label>
          </p>
        </div>
      </div>
    );
  }
}

export { Search };