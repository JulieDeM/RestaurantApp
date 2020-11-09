import React from "react";

import "./Header.css";
import SearchInput from '../SearchInput/SearchInput';
import FilterButton from '../FilterButton/FilterButton';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        checkboxes: [],
        filter: 'ALL'
    };
}

  render() {
    return (
      <div className="header">
       <h1 className="title"><span className="restaurantTitle">Restaurant</span><span>Finder</span></h1>
        <div className="searchContainer" >
          <FilterButton 
            handleFilterMenuButton={this.props.handleFilterMenuButton}
            openFilterMenu={this.props.openFilterMenu}
            restaurants={this.props.restaurants}
            filterResults={this.props.filterResults}
            activeFilter={this.props.activeFilter}
            filterList={this.props.filterList}
          />
          <SearchInput
            handleChange={this.props.handleChange}
            searchString={this.props.searchString}
            resetSearch={this.props.resetSearch}
          />
        </div>
      </div>
    );
  }
}