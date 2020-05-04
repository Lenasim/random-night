import React, { Component } from 'react';
import axios from 'axios'
import './FilterDrink.css'

class FilterDrink extends Component {
  state = {
    categories: [],
    // alcohol: '',
    isAlcohol: "all"
  }

  getCategoriesDrink = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then(res => this.setState({ categories: res.data.drinks.map(c => c.strCategory) }))
  }

  componentDidMount = () => {
    this.getCategoriesDrink()
  }


  filterAlcohol = (e) => {
    this.setState ({ isAlcohol: e.target.value })
    const isAlcohol = e.target.value
    this.props.handleAlcoholChange(isAlcohol)
  }

  filterCategory = (event) => {
    this.props.handleCategoryChange(event.target.value)
  }

  render() {
    return (
      <div className="FilterDrink">
        <select name="selectedCategory" id="drink-categories" value={this.state.value} onChange={this.filterCategory}>
          <option className="option" value="categories">All categories</option>
          {this.state.categories.map(cat => (<option className="option" value={cat} key={cat}>{cat}</option>))}
        </select>

        <div className="switch-field">
          <input type="radio" name="nonAlcohol" value="all" id="all" onChange={this.filterAlcohol} checked={this.state.isAlcohol === 'all'} />
          <label htmlFor="all" >I don't care</label>
          <input type="radio" name="nonAlcohol" value="alcohol" id="alcohol"  onChange={this.filterAlcohol} checked={this.state.isAlcohol === 'alcohol'} />
          <label htmlFor="alcohol">Alcoholic</label>
          <input type="radio" name="nonAlcohol" value="nonAlcohol" id="nonAlcohol"  onChange={this.filterAlcohol} checked={this.state.isAlcohol === 'nonAlcohol'}/>
          <label htmlFor="nonAlcohol">Non alcoholic</label>
        </div>
        {/* <div className="checkbox">
          <p>Sans alcool</p>
          <label className="switch">
            <input name="nonAlcohol" type="checkbox" value={this.props.nonAlcohol} onChange={this.filterAlcohol} />
            <span className="slider round" />
          </label>
        </div> */}
      </div>
    );
  }
}

export default FilterDrink;