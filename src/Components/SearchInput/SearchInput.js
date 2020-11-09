import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./SearchInput.css";

export default class SearchInput extends PureComponent {
  static propTypes = {
    textChange: PropTypes.func
  };

  render() {
    return (
      <div className="search-table">
        <div >
          <div className="search-container">
            <input 
            type="text"
            onChange={this.props.handleChange}
            value={this.props.searchString}
            placeholder="Type Something..."
            id="search"
            />
            <span>
              <button 
              className="clearSearch"
              onClick={this.props.resetSearch}>x</button>
            </span>
            <span>
              <button 
              className="searchButton"
              onClick={this.props.resetSearch}>Search</button>
            </span>
          </div>
        </div>
      </div>
    );
  }
};