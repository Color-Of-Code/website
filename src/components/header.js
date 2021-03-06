import { Link } from 'gatsby';
import React from 'react';
import logo from '../images/icon-72x72.png';
import colorOfCode from '../images/color-of-code.png';

import { FaHome, FaTags, FaInfoCircle } from 'react-icons/fa';

const Header = () => (
  <div
    style={{
      background: '#2d2d2d',
      marginBottom: '0.5rem'
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0.2rem 1.0rem'
      }}
    >
      <div
        style={{
          marginLeft: '-100px',
          marginRight: '0px',
          marginBottom: '0px',
          marginTop: '0px',
          maxWidth: 960,
          float: 'left',
          paddingRight: '1.45rem'
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            margin: '0px'
          }}
        />
      </div>
      <div
        style={{
          margin: '0px',
          fontSize: '1em'
        }}
      >
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <img
            src={colorOfCode}
            alt="Color-Of-Code"
            style={{
              margin: '0px'
            }}
          />
        </Link>
      </div>
      <div
        style={{
          margin: '0px',
          padding: '0px',
          fontSize: '1.0rem'
        }}
      >
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaHome className="tag" />
          &nbsp; Home
        </Link>
        &nbsp;
        <Link
          to="/tags"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaTags className="tag" />
          &nbsp; All tags
        </Link>
        &nbsp;
        <Link
          to="/impressum/"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          <FaInfoCircle className="tag" />
          &nbsp; Terms and Conditions
        </Link>
      </div>
    </div>
  </div>
);

export default Header;
