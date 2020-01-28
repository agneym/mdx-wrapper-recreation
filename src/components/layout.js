import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from "@mdx-js/react";
import { StaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from "gatsby-plugin-mdx";

import Header from './header';
import './layout.css';

function H1({ children }) {
  return (
    <Fragment>
      <h1>{children}</h1>
      <hr />
    </Fragment>
  )
}

function Wrapper() {
  return <p>Thing</p>
}

function AnotherComponent() {
  return (
    <p>Just another component.</p>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`

const Layout = ({ data: { mdx } }) => (
  <>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      <MDXProvider
        components={{
          h1: H1,
          wrapper: Wrapper,
          AnotherComponent,
        }}
      >
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
