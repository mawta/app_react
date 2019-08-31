/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Button,Row,Col,Container,Navbar,Nav } from 'react-bootstrap';
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="2" fixed="top">
                    <Navbar className='docs-nav' fixed='top'>
                        <Nav>
                            <a href='/'>Home</a>
                        </Nav>
                        <Nav>
                            <a href='/seos'>SEO</a>
                        </Nav>
                        <Nav>
                            <a href='/sitemap'>Sitemap</a>
                        </Nav>
                        <Nav>
                            <a href='/google/'>Google Search Console</a>
                        </Nav>
                        <Nav>
                            <a href='/webmaster'>Google Webmaster Tool</a>
                        </Nav>
                    </Navbar>
                </Col>
                <Col md="auto">
                    <div
                        style={{
                            margin: `0 auto`,
                            maxWidth: 960,
                            padding: `0px 1.0875rem 1.45rem`,
                            paddingTop: 0,
                        }}
                    >
                        <main>{children}</main>

                    </div>
                </Col>
            </Row>
            <Row>
                <footer style={{marginLeft: '45%'}}>
                    © {new Date().getFullYear()}, More from
                    {` `}
                    <a href="https://apps.shopify.com/partners/secomapp">Secomapp</a>
                </footer>
            </Row>
        </Container>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
