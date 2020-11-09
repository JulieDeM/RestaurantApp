import React from 'react';

import './FilterButton.css';
import logo from './filter.svg'; 

export default class FilterButton extends React.Component{

    //filter state and genre
    renderTableFilter(item){

        //create state array, now all states can be filtered through
        //This array contains all states, to handle filtering all states and view no results
        let stateAbreviationArray = [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
            'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH',
            'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ];
        
        // let checkStates = this.props.filterList.map(filtered => { return filtered.state});
    
        //create genre array
        let genreArray = [];
        // eslint-disable-next-line
        this.props.restaurants.map(restaurant => { 
            let genresSplit = restaurant.genre.split(',');
            genresSplit.map(genre => {
                if(genreArray.indexOf(genre) === -1) {
                    //sort the restaurants alphabetically so easier to filter then push to new array used
                    genreArray.push(genre);
                    genreArray.sort();
                }
            })
        });
        // let ar = [];
        // let checkGenre = this.props.filterList.map(filtered => { return ar.push(filtered.genre.split(','))});

        return (
            <>
                <span>
                    <button 
                      className="clearFilters"
                        onClick={this.props.resetSearch}
                        onKeyUp={this.props.resetSearch}>Clear All</button>
                </span>
                <p className="filterHeader">States</p>
                <span className="state-list">
                    {stateAbreviationArray.map(state => {
                        return (
                            <span key={state + 'state'} style={{display: 'flex', flexDirection: 'row'}}>
                                <input 
                                key={state}
                                value={state}
                                type="checkbox" 
                                onClick={(search) => this.props.filterResults(state)} 
                                /> {state}
                            </span>
                        )
                    })}
                </span>
                <p className="filterHeader">Genre</p>
                <span className="genre-list" >
                    {genreArray.map(genre => {
                        return (
                        <span key={genre + 'genre'} style={{display: 'flex', flexDirection: 'row'}}>
                            <input key={genre} 
                            type="checkbox" 
                            value={genre}
                            onClick={(genre) => this.props.filterResults(genre)} /> {genre}
                        </span>
                        )
                    })}
                </span>
            </>
        )
      };

    render(){
        return (
            <div className="menuContainer">
            <button type="button" className="button" onClick={this.props.handleFilterMenuButton}>
                <img src={logo}
                alt="filter"
                className="img-filter"
                />
            </button>
            {this.props.openFilterMenu && (
                <div className="dropdown">
                <ul>
                    <li>
                    {this.renderTableFilter()}
                    </li>
                </ul>
                </div>
            )}
            </div>
        );
    }
};