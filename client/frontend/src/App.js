import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import store from './store';
import Homepage from './Pages/Homepage';
import Event from './Pages/Event';
import MapBox from './Mapbox'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/event/:id" component={Event} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
