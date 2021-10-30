import React from 'react';
import { Header } from './Universal/Header';
import { Footer } from './Universal/Footer';
import { MainPage } from './MainPage';
import { Addresses } from './Addresses';
import { Route, Switch } from 'react-router-dom';

function App(props) {
    return (
        <>
          <Header></Header>
          <Switch>
            <div>
              <Route exact path='/' component = { MainPage } />
              <Route exact path='/clinics' component = { Addresses } />
            </div>
          </Switch>
          <Footer></Footer>
        </>
      );
}
export { App };