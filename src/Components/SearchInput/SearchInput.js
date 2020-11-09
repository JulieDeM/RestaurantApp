import React from "react";

import "./SearchInput.css";

export default class SearchInput extends React.Component {

  render() {
    return (
      <div className="search-table">
        <div >
          <div className="search-container">
          {/* Feature request asks for either enter OR search box, doesn't appear to require both */}
          {/* In the case of this I would reach out usually to the team who created the ticket or the project manager for clarification */}
          {/* for now the search functions on ENTER only */}
            <input 
            type="text"
            onChange={this.props.handleTextChange}
            onKeyPress={this.props.handleChange}
            onKeyDown={this.props.handleChange}
            // value={this.props.searchString}
            placeholder="Type Something... "
            id="search"
            />
              {this.props.searchString && ( 
            <span>
              <button 
              className="clearSearch"
              onClick={this.props.resetSearch}
              >x</button>
            </span>
              )}
          </div>
        </div>
      </div>
    );
  }
};