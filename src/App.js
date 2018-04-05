import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

class App extends Component {
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
    const { loading, error } = this.state;
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
      <div className = "app">
        <h1>Próftöflur</h1>
        <ul className = "navigation">
          <Navigation/>
        </ul>
      <Helmet defaultTitle="Próftöflur" titleTemplate="%s – Próftöflur">
        <html lang="is" />
        <body className="foo" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:school" component={School}/>
      </Switch>
    </div>
    );
  }
}

export default App;
