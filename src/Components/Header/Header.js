import React from "react";

import "./Header.css";
import SearchInput from '../SearchInput/SearchInput';
import FilterButton from '../FilterButton/FilterButton';

export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
       <h1 className="title"><span className="restaurantTitle">Restaurant</span><span>Finder</span></h1>
        <div className="searchContainer" >
          <FilterButton 
            handleFilterMenuButton={this.props.handleFilterMenuButton}
            openFilterMenu={this.props.openFilterMenu} //need
            selectedRestaurants={this.props.selectedRestaurants}
            restaurants={this.props.restaurants}
            filterResults={this.props.filterResults}
            filterList={this.props.filterList}
            handleCheckbox={this.props.handleCheckbox}
            resetSearch={this.props.resetSearch}
            onRestaurantsSelectChange={this.props.onRestaurantsSelectChange}
          />
          <SearchInput
            handleChange={this.props.handleChange}
            searchString={this.props.searchString}
            // enteredText={this.props.enteredText}
            resetSearch={this.props.resetSearch}
          />
        </div>
      </div>
    );
  }
}