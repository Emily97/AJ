import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './app.css';

class ModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = { modules: [] };

    this.updateRecipes = this.updateRecipes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updateRecipes();
  }

  updateRecipes() {
    axios.get(`api/lecturers/${this.props.match.params.id}/modules`)
      .then(response => {
        this.setState({ modules: response.data });
        console.log(this.state.modules);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(recipeId) {
    // make a DELETE request to the server to remove the user with this recipeId
    axios
      .delete('api/modules', {
        data: {
          id: recipeId
        }
      })
      .then(response => {
        // if the delete was successful, re-fetch the list of recipes, will trigger a re-render
        this.updateRecipes();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const moduleList = this.state.modules.map(u => (
      <Module
        key={u._id}
        id={u._id}
        name={u.name}
        time={u.time}
        level={u.level}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <div>
        {moduleList.length ?
          <div>
            <h1 className="col">All Recipes</h1>
            <div className="col">
              <Link to={'/create-recipe/'}>
                <button type="button" className="btn btn-outline-dark">
                  Create Recipe
                </button>
              </Link>
              <Link to={'/'}>
                <button type="button" className="btn btn-outline-dark">
                  Home
                </button>
              </Link>
            </div>
            <div>{moduleList}</div></div> :
          <h2>No Recipes</h2> }
      </div>
    );
  }
}

const Module = (props) => {
  return (
    <div className="container">
      <div className="card shadow p-3 mb-5 bg-white rounded">
        <h2>{props.name}</h2>
        <p>Cooking Time:{props.time} minutes</p>
        <p>Level: {props.level}</p>
        <div>
          <Link to={`/edit-recipe/${props.id}`}>
            <button type="button" className="btn btn-outline-dark">
            Edit Recipe
            </button>
          </Link>
          <button type="button" className="btn btn-outline-dark" onClick={() => {props.handleDelete(props.id);}}>
        Delete
          </button>
        </div>
      </div>
    </div>
  );
};

Module.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  time: PropTypes.string,
  level: PropTypes.string,
  key: PropTypes.number
};

export default ModuleList;
