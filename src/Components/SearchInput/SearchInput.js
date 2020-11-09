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
            onChange={this.props.handleTextChange}
            onKeyPress={this.props.handleChange}
            onKeyDown={this.props.handleChange}
            value={this.props.enteredText}
            placeholder="Type Something..."
            id="search"
            />
              {this.props.searchString && (
                <span>
                    <button 
              className="clearSearch"
              onClick={this.props.resetSearch}
              onKeyUp={this.props.resetSearch}>x</button>
            </span>
              )}
            <span>
              <button 
              className="searchButton"
              onClick={this.props.handleSearch}
              >Search</button>
            </span>
          </div>
        </div>
      </div>
    );
  }
};