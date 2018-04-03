import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch, NavLink } from 'react-router-dom'

import './School.css';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {
  state = { data: null, loading: true, error: false }

  async componentDidMount() {
    try {
      const slug = this.props.location.pathname;
      console.log(slug);
      const data = await this.fetchData(`https://vefforritun2-2018-v4-synilausn.herokuapp.com${slug}`);
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
    console.log(data.school.departments);
    return (
      <section className="school">
        {data.school.departments.map((department) => {
      return (
        <li key={department.heading}>
          <Link to={`${department.heading}`}>{department.heading}</Link>
        </li>
      )
  })}
      </section>
    );
  }
}

