import React from 'react';

import './Checkbox.css';

export default class Checkbox extends React.Component{
    render(){
        return (
            <span>
                <span>
                    <button 
                      className="clearFilters"
                        onClick={this.props.resetSearch}
                        onKeyUp={this.props.resetSearch}>Clear All</button>
                </span>
                {this.props.restaurants.map(restaurant => {
                    return (<div>
                        <input
                         checked={this.props.selectedRestaurants.name}
                         onChange={this.handleClick}
                        type="checkbox" name={restaurant.state} /> {restaurant.state}
                    </div>)
                })}
                  {/* <select onChange={this.props.onRestaurantsSelectChange} > 
                    {this.props.restaurants.map(item => (
                        <option key={item.state} value={item.state}>{item.state} </option>
                    ))}
                </select> */}
            </span>
        )
    }
}







    // //filter state and genre
    // renderTableFilter(item){

    //     //create state array, now all states can be filtered through
    //     //This array contains all states, to handle filtering all states and view no results
    //     let stateAbreviationArray = [
    //         'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
    //         'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH',
    //         'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    //     ];
        
    //     // let checkStates = this.props.options && this.props.options.map(filtered => { return filtered});
    //     console.log('options')
    //     // console.log(checkState
    
    //     //create genre array
    //     let genreArray = [];
    //     // eslint-disable-next-line
    //     this.props.restaurants.map(restaurant => { 
    //         let genresSplit = restaurant.genre.split(',');
    //         genresSplit.map(genre => {
    //             if(genreArray.indexOf(genre) === -1) {
    //                 //sort the restaurants alphabetically so easier to filter then push to new array used
    //                 genreArray.push(genre);
    //                 genreArray.sort();
    //             }
    //         })
    //     });
    //     // let ar = [];
    //     // let checkGenre = this.props.filterList.map(filtered => { return ar.push(filtered.genre.split(','))});

    //     return (
    //         <>
    //             <span>
    //                 <button 
    //                   className="clearFilters"
    //                     onClick={this.props.resetSearch}
    //                     onKeyUp={this.props.resetSearch}>Clear All</button>
    //             </span>
    //             <p className="filterHeader">States</p>
    //             {/* <span className="state-list">
    //                 {stateAbreviationArray.map(state => {
    //                     return ( 
    //                     <select onChange={this.props.filterResults(state)} value={state}>
    //                         {this.props.restaurants.map(item => (
    //                             <option key={item.id} value={item.state}>{item.state} </option>
    //                 // }))}
    //                     </select>
    //                     //     <span key={state + 'state'} style={{display: 'flex', flexDirection: 'row'}}>
    //                     //         <input 
    //                     //         key={state}
    //                     //         value={state}
    //                     //         type="checkbox" 
    //                     //         // checked={this.props.filteredList}
    //                     //         // checked={checkStates.includes(state) ? true : false }
    //                     //         onClick={(search) => this.props.filterResults(state)} 
    //                     //         /> {state}
    //                     //     </span>
    //                     // )
    //                         )})}
    //             </span> */}
    //             <p className="filterHeader">Genre</p>
    //             <span className="genre-list" >
    //                 {genreArray.map(genre => {
    //                     return (
    //                     <span key={genre + 'genre'} style={{display: 'flex', flexDirection: 'row'}}>
    //                         <input key={genre} 
    //                         type="checkbox" 
    //                         value={genre}
    //                         onClick={(genre) => this.props.filterResults(genre)} /> {genre}
    //                     </span>
    //                     )
    //                 })}
    //             </span>
    //         </>
    //     )
    //   };