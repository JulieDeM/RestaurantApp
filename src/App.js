import React from 'react';

import Header from "../src/Components/Header/Header.js";
import Table from '../src/Components/Table/Table.js';

class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      filteredRestaurants: [],
      searchString: "",
      enteredText: "",
      filtered: [] ,
      openFilterMenu: false,
      pagesNeeded: null,
      perPage: 10,
      currentPage: 1,
      filter: [],
      options: []
    };
    this.fetchData = this.fetchData.bind(this);
  }  

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    const apiUrl = 'https://code-challenge.spectrumtoolbox.com/api/restaurants';
    return fetch(apiUrl, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Api-Key q3MNxtfep8Gt',
         }
      })
      .then((response) => response.json())
      .then((restaurants) => {
        console.log(restaurants)
      // sort by name, no filter required on name so sorted here
      restaurants.sort(function(a, b) {
        let prevName = a.name.toUpperCase(); 
        let nextName = b.name.toUpperCase(); 
        if (prevName < nextName) {
          return -1;
        }
        if (prevName > nextName) {
          return 1;
        }
        return 0;
      });
      //determine number of pages needed for 10 results each page minimum
      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(restaurants.length / 10); i++) {
            pageNumbers.push(i);
        }

      //get current restaurants
      const indexOfLastRestaurant = 1 * 10;
      const indexOfFirstRestaurant = indexOfLastRestaurant - 10;
      const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant );

        this.setState({ 
          restaurants: restaurants,
          filtered: restaurants,
          filteredRestaurants: restaurants,
          perPage: 10,
          pagesNeeded: pageNumbers,
          currentPage: 1,
          currentRestaurants: currentRestaurants
        });
      });
  };

  handleFilterMenuButton = () => {
    this.setState(state => {
      return {
        openFilterMenu: !state.openFilterMenu,
      };
    });
  };

  handleSearch = event => {
    let filteredRestaurants = this.filteredRestaurants.restaurants.filter( restaurant => {
      return  restaurant.name.indexOf(this.state.searchString) !== -1 ||
      restaurant.name.toLowerCase().indexOf(this.state.searchString) !== -1 ||
      restaurant.name.toLowerCase().indexOf(this.state.searchString) !== -1 
      || restaurant.genre.indexOf(this.state.searchString) !== -1 
      || restaurant.genre.toLowerCase().indexOf(this.state.searchString) !== -1 
      || restaurant.genre.toUpperCase().indexOf(this.state.searchString) !== -1 
      || restaurant.state.toLowerCase().indexOf(this.state.searchString) !== -1
      || restaurant.state.toUpperCase().indexOf(this.state.searchString) !== -1
      || restaurant.city.toLowerCase().indexOf(this.state.searchString) !== -1
      || restaurant.city.toUpperCase().indexOf(this.state.searchString) !== -1
    });

    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRestaurants.length / 10); i++) {
        pageNumbers.push(i);
    }
    this.setState({
      searchString: event.target.value.substr(0, 20),
      filteredRestaurants: filteredRestaurants,
      pagesNeeded: pageNumbers
    });
  };

  onInputChange(event){

    let code = event.keyCode || event.which;
    if(code === 13 || event.type === 'click' ) { //13 is the enter keycode
    let filteredRestaurants = this.state.filteredRestaurants.filter( restaurant => {
      //@TODO: REFACTOR CODE BELOW 
      return restaurant.name.indexOf(this.state.searchString) !== -1 ||
      restaurant.name.toLowerCase().indexOf(this.state.searchString) !== -1 ||
      restaurant.name.toUpperCase().indexOf(this.state.searchString) !== -1 
      || restaurant.genre.indexOf(this.state.searchString) !== -1 
      || restaurant.genre.toLowerCase().indexOf(this.state.searchString) !== -1 
      || restaurant.genre.toUpperCase().indexOf(this.state.searchString) !== -1 
      || restaurant.state.indexOf(this.state.searchString) !== -1
      || restaurant.state.toLowerCase().indexOf(this.state.searchString) !== -1
      || restaurant.state.toUpperCase().indexOf(this.state.searchString) !== -1
      || restaurant.city.indexOf(this.state.searchString) !== -1
      || restaurant.city.toLowerCase().indexOf(this.state.searchString) !== -1
      || restaurant.city.toUpperCase().indexOf(this.state.searchString) !== -1
    });
    //
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRestaurants.length / 10); i++) {
        pageNumbers.push(i);
    }

    this.setState({
      filter: filteredRestaurants,
      searchString: event.target.value.substr(0, 20),
      filteredRestaurants: filteredRestaurants, 
      pagesNeeded: pageNumbers //update page numbers needed
      // options: [event.target.value.substr(0, 20)]
    })
    }
  };

  onEnteredText = event => {
    this.setState({
      enteredText: event.target.value.substr(0, 20)
    })
  };

  //reset search from button click 
  resetSearch = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.restaurants.length / 10); i++) {
        pageNumbers.push(i);
    }
    this.setState({
      searchString: '',
      enteredText: '',
      filteredRestaurants: this.state.restaurants,
      pagesNeeded: pageNumbers, //reset page numbers needed
      options: []
    })
  };

  onFilterChange = e => {
    let newArray = [...this.state.options, e];
    if(newArray.includes(e)){
      newArray.slice(e)
    } 
     if (this.state.restaurants.includes(e)) {
      newArray = newArray.filter(day => day !== e);
    } 
   
    let filteredRestaurants = this.state.restaurants.filter( restaurant => {
      return restaurant.genre.indexOf(e) !== -1 
      || restaurant.genre.toLowerCase().indexOf(e) !== -1 
      || restaurant.genre.toUpperCase().indexOf(e) !== -1 
      || restaurant.state.indexOf(e) !== -1
      || restaurant.state.toLowerCase().indexOf(e) !== -1
      || restaurant.state.toUpperCase().indexOf(e) !== -1
    });
    this.setState({
      filter: filteredRestaurants,
      options: newArray,
      filteredRestaurants: filteredRestaurants
    })
    };

    handleCheckbox = event => {
      let isChecked = event.target.checked;
      let item = event.target.value;
       
      this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    } 


  changePage = pageNumb => {
    this.setState({
      currentPage: pageNumb
    })
  };
  
  render() {
    //get first and last index for pagination
    const indexOfLastRestaurant = this.state.currentPage * this.state.perPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - this.state.perPage;
    const currentRestaurants = this.state.filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant );

    return (
      <div className="App">
        <Header
         handleChange={this.onInputChange.bind(this)}
         searchString={this.state.searchString}
         enteredText={this.state.enteredText}
         handleTextChange={this.onEnteredText.bind(this)}
         resetSearch={this.resetSearch}
         restaurants={this.state.restaurants}
         openFilterMenu={this.state.openFilterMenu}
         handleFilterMenuButton={this.handleFilterMenuButton}
         handleSearch={this.handleSearch.bind(this)}
         filterResults={this.onFilterChange.bind(this)}
         filterList={this.state.filteredRestaurants}
         handleCheckbox={this.handleCheckbox.bind(this)}
         options={this.state.options}
         />
        <div className="Main">
          <Table 
          restaurants={currentRestaurants}
          pagesNeeded={this.state.pagesNeeded}
          currentPage={this.state.currentPage}
          changePage={this.changePage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;