import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './app.css';

class Lecturer extends React.Component {
  render() {
    return (
      <div className="card shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <h2>{this.props.name}</h2>
          <figure>
            <img alt="Profile" src={this.props.image} />
          </figure>
          <p>Cook Style: {this.props.region}</p>
          <p>{this.props.email}</p>

          <Link to={`/module/${this.props.id}`}>
            <button type="button" class="btn btn-outline-dark btn-lg">
                  View Recipes
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Lecturer.propTypes = {
  id: PropTypes.number,
  name: PropTypes.number,
  image: PropTypes.number,
  region: PropTypes.string,
  email: PropTypes.string
};

export default Lecturer;
