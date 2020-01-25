import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from "@mdx-js/react"
import { StaticQuery, graphql } from 'gatsby'

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

const Layout = (props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
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
              wrapper: ({ children, ...props }) => {
                console.log(props, children)
                const reversedChildren = React.Children.toArray(children).reverse()
                return <>{reversedChildren}</>
              }
            }}
          >
            {props.children}
          </MDXProvider>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
