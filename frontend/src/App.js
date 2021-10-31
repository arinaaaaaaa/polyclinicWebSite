import React from 'react';
import { Header } from './Universal/Header';
import { Footer } from './Universal/Footer';
import { Login } from './Login';
import { SingUp } from './SingUp';
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
              <Route exact path='/login' component = { Login } />
              <Route exact path='/join' component = { SingUp } />
            </div>
          </Switch>
          <Footer></Footer>
        </>
      );
}
export { App };