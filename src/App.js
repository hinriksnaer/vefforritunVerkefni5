import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Link, Switch, NavLink } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

class Data extends Component {
  state = { data: null, loading: true, error: false }

  async componentDidMount() {
    try {
      const data = await this.fetchData('https://vefforritun2-2018-v4-synilausn.herokuapp.com/');
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
    
  ;
  }
}

class App extends Component {
  render() {
    return (
      <main>
        <ul>
          <Navigation/>
        </ul>
      <section>
      <Helmet defaultTitle="Próftöflur" titleTemplate="%s – Próftöflur">
        <html lang="is" />
        <body className="foo" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/felagsvisindasvid" component={School}/>
        <Route exact path="/heilbrigdisvisindasvid" component={School}/>
      </Switch>
    </section>
    </main>
    );
  }
}

export default App;
