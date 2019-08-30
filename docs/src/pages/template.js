import React from 'react';
import Helmet from 'react-helmet';
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


export default function Page({data}) {
    const {markdownRemark: page} = data;
    // const post = data.markdownRemark;
    return (
        <Layout>
            <SEO title="Home" />
            <div>
                <h1>{page.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{__html: page.html}} />
            </div>

        </Layout>

    )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path} }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
