import { Component } from 'react';

class Search extends Component {
  state = {
    search: 'matrix'
  }

  searchSync = (event) => {
    this.setState({search: event.target.value});
  }

  searchFunc = (event) => {
    if (event.key === 'Enter') {
      this.props.search(this.state.search);
    }
  }

  render () {
    return (
      <div className="Search">
        <div className="input-field col s12">
          <input
          id="search"
          value={this.state.search}
          type="text"
          className="validate"
          onChange={this.searchSync}
          onKeyDown={this.searchFunc}
        />
        </div>
      </div>
    );
  }
}

export { Search };