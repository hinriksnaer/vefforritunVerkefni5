import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, NavLink } from 'react-router-dom';
import Department from '../department';
import NotFound from '../not-found';

import './School.css';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {
  state = { data: null, loading: true, error: false, activeDep: null }

  async componentDidMount() {
    try {
      const slug = this.props.location.pathname;
      const data = await this.fetchData(`https://vefforritun2-2018-v4-synilausn.herokuapp.com${slug}`);
      if (data.error) {
        this.setState({ error: true});
      }
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching navigation', e);
      this.setState({ error: true, loading: false });
    }
  }
  
async componentWillReceiveProps(nextProp) {
  try {
    const slug = nextProp.location.pathname;
    const data = await this.fetchData(`https://vefforritun2-2018-v4-synilausn.herokuapp.com${slug}`);
    this.setState({ data, loading: false });
  } catch (e) {
    console.error('Error fetching navigation', e);
    this.setState({ error: true, loading: false });
  }
}

headingClick = (heading) => {
  if (this.state.activeDep === heading){
    this.setState({activeDep: null})
  } else {
    this.setState({ activeDep: heading });
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
          <Route component ={NotFound}/>
        </div>
      );
    }
    return (
      <section className="school">
      <h2>{data.school.heading}</h2>
        <ul className="schools">
          {data.school.departments.map(department => 
            <li key={department.heading}>
              <Department data={department} headingClick={() => this.headingClick(department.heading)} visibleDep={this.state.activeDep} />
            </li>
          )}
        </ul>
        <NavLink to={`/`}>{'Heim'}</NavLink>
      </section>
    );
  }
}
