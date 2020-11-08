import React from 'react';

import './FilterButton.css';

export default class FilterButton extends React.Component{

    //filter state and genre
    //@TODO: CREATE LOGIC TO FILTER STATE AND GENRE, SETTING UP INITIALLY FOR BASIC STYLE REASONS
    renderTableFilter(item){

        //create state array
        let restaurantArray = [];
        // eslint-disable-next-line
        this.props.restaurants.map(restaurant => { 
          if(restaurantArray.indexOf(restaurant.state) === -1) {
            //sort the restaurants alphabetically so easier to filter then push to new array used
           restaurantArray.push(restaurant.state);
           restaurantArray.sort();
        }
    })

        //create state array
        let genreArray = [];
        // eslint-disable-next-line
        this.props.restaurants.map(restaurant => { 
            let genresSplit = restaurant.genre.split(',');
            //@TODO: SPLIT BY STRING, NOT PUSH AN ARRAY INTO THE ARRAY
            //WILL DO WHEN DOING LOGIC FOR FILTERING
            if(genreArray.indexOf(genresSplit) === -1) {
            //sort the restaurants alphabetically so easier to filter then push to new array used
            genreArray.push(genresSplit);
            genreArray.sort();
        }
  
        });
    
  
          return (
            <>
            <h2>States</h2>
            <input type="checkbox"  value="checkedAllStates" /> Check / Uncheck All
  
            <h2>Genre</h2>
            <input type="checkbox"  value="checkedAllGenres" /> Check / Uncheck All
            {restaurantArray.map(state => {
              <input type="checkbox"  value={state} />
            })}
            </>
          )
      };

    render(){
        return (
            <div className="menuContainer">
            <button type="button" class="button" onClick={this.props.handleFilterMenuButton}>
                ☰
            </button>
            {this.props.openFilterMenu && (
                <div class="dropdown">
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