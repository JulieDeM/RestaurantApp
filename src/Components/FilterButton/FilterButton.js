import React from 'react';

import './FilterButton.css';
import logo from './filter.svg'; 
import { wrap } from 'module';

export default class FilterButton extends React.Component{

    //filter state and genre
    //@TODO: CREATE LOGIC TO FILTER STATE AND GENRE, SETTING UP INITIALLY FOR BASIC STYLE REASONS
    renderTableFilter(item){

        //create state array
        //This array contains all states, to handle filtering all states and view no results
        let stateAbreviationArray = [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
            'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH',
            'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ];
        // stateAbreviationArray.sort();
        console.log(stateAbreviationArray)
    //     let restaurantArray = [];
    //     // eslint-disable-next-line
    //     this.props.restaurants.map(restaurant => { 
    //       if(restaurantArray.indexOf(restaurant.state) === -1) {
    //         //sort the restaurants alphabetically so easier to filter then push to new array used
    //        restaurantArray.push(restaurant.state);
    //        restaurantArray.sort();
    //     }
    // })

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
    
        return (
            <>
                <p className="filterHeader">States</p>
                <span style={{display: 'flex', flexDirection: 'column', height: '255px', flexWrap: 'wrap', overflow: 'wrap'}}>
                    <span style={{display: 'flex', flexDirection: 'row'}}>
                        <input type="checkbox"  value="checkedAllStates" /> Show All
                    </span>
                    {stateAbreviationArray.map(state => {
                        return (
                        <span style={{display: 'flex', flexDirection: 'row'}}>
                            <input key={state} type="checkbox"  value={state} /> {state}
                        </span>
                        )
                    })}
                </span>
                <p className="filterHeader">Genre</p>
                <span style={{display: 'flex', flexDirection: 'column', height: '300px', flexWrap: 'wrap', overflow: 'wrap'}}>
                    <span style={{display: 'flex', flexDirection: 'row'}}>
                     <input type="checkbox"  value="checkedAllGenres" /> Show All
                    </span>
                    {genreArray.map(genre => {
                        return (
                        <span style={{display: 'flex', flexDirection: 'row'}}>
                            <input key={genre} type="checkbox" value={genre} /> {genre}
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
                {/* ☰ */}
                <img src={logo} style={{width: '30px', height: '30px', marginTop: '10px'}} />
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