/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */


/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Example');
// resources\assets\js\app.js

import App from './components/App'
import Audit from './components/Audit'
import FAQ from './components/FAQ'
import Optimize from './components/Optimize'
import Test from './components/Test'
import Home from './components/Home'
import React from 'react'
import {render} from 'react-dom'
import {
    Router,
    Route,
    Switch
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import "@shopify/polaris/styles.css";


const history = createBrowserHistory()
render(
    <Router history={history}>
        <Switch>
            <Route path='/audit' component={Audit}/>
            <Route path='/faq' component={FAQ}/>
            <Route path='/optimize' component={Optimize}/>
            <Route path='/test' component={Test}/>
            <Route path='/' component={Home}/>
        </Switch>
    </Router>, document.getElementById('app'))
