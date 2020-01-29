import React, { Fragment } from 'react'
import { MDXProvider } from "@mdx-js/react";
import { graphql } from 'gatsby';
import { MDXRenderer } from "gatsby-plugin-mdx";
import { useTrail, animated } from "react-spring";

import './layout.css';

function H1({ children }) {
  return (
    <Fragment>
      <h1>{children}</h1>
      <hr />
    </Fragment>
  )
}

function Wrapper({ children }) {
  const childrenArray = React.Children.toArray(children);
  const trail = useTrail(childrenArray.length, {
    y: 0,
    opacity: 1,
    from: { y: 50, opacity: 0 },
  });
  return trail.map(({ y, opacity }, index) =>
    <animated.div key={index} style={{ opacity, transform: y.interpolate(y => `translate3d(0,${y}px,0)`) }}>{childrenArray[index]}</animated.div>
  )
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
        margin: '50px auto',
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

export default Layout
