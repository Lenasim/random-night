import React, { Component } from 'react'
import axios from 'axios'

import Card from './Card'
import Button from './Button'
import Modal from './Modal'

import './Card.css'


class CardsList extends Component {

  state = {
    loading: false,
    loaded: false,
    drinks: '',
    meals: '',
    movies: '',
    ingDrink: [],
    ingMeal: [],
    categories: [
      'drink',
      'movie',
      'recipe'
    ],
    isFavDrink: false,
    favDrink: '',
    isFavRecipe: false,
    favRecipe: '',
    isFavMovie: false,
    favMovie: ''
  }

  getRandomDrink = () => {
    this.setState({ loading: true })
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(res => this.setState({ drinks: res.data.drinks[0] }, () => {
        this.setState({ loaded: true, loading: false })
      }))
  }

  getRandomRecipe = () => {
    this.setState({ loading: true })
    axios
      .get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(resR => this.setState({ meals: resR.data.meals[0] }, () => {
        this.setState({ loaded: true, loading: false })
      }))
  }

  getRandomMovie = () => {
    this.setState({ loading: true })
    let pageMovie = Math.floor(Math.random() * 501)
    let resultMovie = Math.floor(Math.random() * 19)
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}`)
      .then(resM => this.setState({ movies: resM.data.results[resultMovie] }, () => {
        this.setState({ loaded: true, loading: false })
      }))
  }

  componentDidMount() {
    this.getRandom()
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  isFavDrink = () => {
    this.setState({ isFavDrink: !this.state.isFavDrink })
    this.setState({ favDrink: this.state.drinks })
  }

  isFavRecipe = () => {
    this.setState({ isFavRecipe: !this.state.isFavRecipe })
    this.setState({ favRecipe: this.state.meals })
  }

  isFavMovie = () => {
    this.setState({ isFavMovie: !this.state.isFavMovie })
    this.setState({ favMovie: this.state.movies })
  }

  getRandom = () => {
    const { isFavDrink, isFavMovie, isFavRecipe } = this.state
    if (isFavDrink === false && isFavRecipe === false && isFavMovie === false) {
      this.getRandomDrink()
      this.getRandomRecipe()
      this.getRandomMovie()
    } else if (isFavDrink === true && isFavRecipe === true && isFavMovie === false) {
      this.getRandomMovie()
    } else if (isFavDrink === true && isFavRecipe === false && isFavMovie === true) {
      this.getRandomRecipe()
    } else if (isFavDrink === false && isFavRecipe === true && isFavMovie === true) {
      this.getRandomDrink()
    } else if (isFavDrink === true && isFavRecipe === false && isFavMovie === false) {
      this.getRandomRecipe()
      this.getRandomMovie()
    } else if (isFavDrink === false && isFavRecipe === false && isFavMovie === true) {
      this.getRandomDrink()
      this.getRandomRecipe()
    } else if (isFavDrink === false && isFavRecipe === true && isFavMovie === false) {
      this.getRandomDrink()
      this.getRandomMovie()
    }
  }

  render() {
    const { drinks, meals, movies, categories, loading, loaded } = this.state

    return (
      <div>
        <Button isClicked={this.getRandom}
          text='Toujours Pas ?'
          loader={loading}
        />
        {loaded &&
          <div className="card-container">
            <Card
              image={drinks.strDrinkThumb}
              name={drinks.strDrink}
              categorie={categories[0]}
              onClick={this.toggleModal}
              isFav={this.isFavDrink}
              class={this.state.isFavDrink ? "fas fa-lock" : "fas fa-lock-open"}
            />
            <Card
              image={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              name={movies.title}
              categorie={categories[1]}
              onClick={this.toggleModal}
              isFav={this.isFavMovie}
              class={this.state.isFavMovie ? "fas fa-lock" : "fas fa-lock-open"}
            />
            <Card
              image={meals.strMealThumb}
              name={meals.strMeal}
              categorie={categories[2]}
              onClick={this.toggleModal}
              isFav={this.isFavRecipe}
              class={this.state.isFavRecipe ? "fas fa-lock" : "fas fa-lock-open"}
            />
          </div>
        }
        <Modal
          show={this.state.modal}
          handleClose={this.toggleModal} />
      </div>
    )
  }

}

export default CardsList
