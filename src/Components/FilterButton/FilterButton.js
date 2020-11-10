import React from 'react';

import Checkbox from '../Checkbox/Checkbox';
import './FilterButton.css';
import filter from './filter.svg'; 

export default class FilterButton extends React.Component{

    render(){
        return (
            <div className="menuContainer">
            <button type="button" className="button" onClick={this.props.handleFilterMenuButton}>
                <img src={filter}
                alt="filter"
                className="img-filter"
                />
            </button>
            {this.props.openFilterMenu && (
                <div className="dropdown">
                <ul>
                    <li>
                        <Checkbox
                            restaurants={this.props.restaurants}
                            selectedRestaurants={this.props.selectedRestaurants}
                            onRestaurantsSelectChange={this.props.onRestaurantsSelectChange}
                            resetSearch={this.props.resetSearch}
                        />
                    </li>
                </ul>
                </div>
            )}
            </div>
        );
    }
};