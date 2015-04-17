'use strict';
import React from 'react';
import Nav from './Nav';
import ApplicationStore from '../stores/ApplicationStore';
import {RouteHandler, Navigation} from 'react-router';
import {loginAction, logoutAction} from '../actions/authActions';
import clearRedirect from '../actions/clearRedirect';
import DocumentTitle from 'react-document-title';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {FluxibleMixin} from 'fluxible';

const debug = require('debug')('Component:Application');

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [ApplicationStore]
  },

  logout(e) {
    e.preventDefault();
    this.executeAction(logoutAction);
  },

  getInitialState() {
    return this.getStore(ApplicationStore).getState();
  },

  onChange() {
    var state = this.getStore(ApplicationStore).getState();

    if (state.redirect) {
      this.executeAction(clearRedirect);
      this.context.router.transitionTo(state.redirect);
    } else {
      this.setState(state);
    }
  },

  log() {
    const state = this.getStore(ApplicationStore).getState();
    debug(state);
  },

  render() {
    const name = this.context.router.getCurrentPath();
    const loggedInForm = (
      <form action="/logout" method="POST">
        <button type="submit" onClick={this.logout}>Log out</button>
      </form>
    );

    return (
      <DocumentTitle title="Isomorphic Auth Flow">
        <div className="app">
          {this.state.flashMessage &&
            <button
              className="u-full-width button-primary flash">
              {this.state.flashMessage}
            </button>
          }
          {this.state.appIsLoading &&
            <button
              className="u-full-width button primary loading-bar">
              Loading
            </button>
          }
          <div className="container">
            <Nav {...this.state} />
            <h1>Hello,&nbsp;{this.state.email || 'Stranger'}</h1>
            {this.state.loggedIn &&
              <h2>Your user level is {this.state.userLevel}</h2>
            }
            <section className="main-content">
              <TransitionGroup component="div" transitionName="example">

                  <RouteHandler key={name} {...this.state} />

              </TransitionGroup>
            </section>
            {this.state.loggedIn && {loggedInForm}}


          </div>
        </div>
      </DocumentTitle>
    );
  }
});
