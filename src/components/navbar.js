import React, { Component } from 'react';
import { Routes } from 'constants/routes';
import './navbar.css';

const {
  WORK_HISTORY,
  ABOUT,
  HOMEPAGE,
  BLOG
} = Routes;

export default class NavBar extends Component {
  render() {
    return(

        <div className="d-flex justify-content-center">
          <div className="segment-wrapper hero-navbar d-flex justify-content-between navbar-container align-items-center">
            <a href={HOMEPAGE} className="header-2-black">Alejandro Luperon</a>
            <div className="d-flex">
              <a className="navbar-link body-copy-black" href={ABOUT}>About</a>
              <a className="navbar-link body-copy-black" href={WORK_HISTORY}>Work</a>
              <a className="navbar-link body-copy-black" rel="noopener noreferrer" target='_blank' href={BLOG}>Blog</a>
            </div>
          </div>
        </div>

    )
  }
}
