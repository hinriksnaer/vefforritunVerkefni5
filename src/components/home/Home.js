import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './Home.css';

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {

  state = { data: null, loading: true, error: false }

  async componentDidMount() {
    try {
      const data = await this.fetchData('https://vefforritun2-2018-v4-synilausn.herokuapp.com/stats');
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching navigation', e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return (
        <div>
          <p>Sæki gögn...</p>
          <Helmet title="Sæki gögn...">
          </Helmet>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <p>Villa við að sækja gögn</p>
          <Helmet title="Villa við að sækja gögn">
          </Helmet>
        </div>
      );
    }

    if (data.stats){

      const { min, max, numTests, numStudents, averageStudents }  = data.stats;
      return (
        <div>
        <h1>Tölfræði</h1>
        <table>
          <tbody>
          <tr>
            <td>Fjöldi prófa</td>
            <td>{numTests}</td>
          </tr>
          <tr>
            <td>Fjöldi nemenda í öllum prófum</td>
            <td>{numStudents}</td>
          </tr>
          <tr>
            <td>Meðalfjöldi nemenda í prófi</td>
            <td>{averageStudents}</td>
          </tr>
          <tr>
            <td>Minnsti fjöldi nemenda í prófi</td>
            <td>{min}</td>
          </tr>
          <tr>
            <td>Hæsti fjöldi nemenda í prófi</td>
            <td>{max}</td>
          </tr>
          </tbody>
        </table>
        <Helmet title="Próftöflur">
          </Helmet>
    </div>
    );
    }
  }
}
