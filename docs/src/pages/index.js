import React from 'react';
import Helmet from 'react-helmet';
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <div>
            <h2>Welcome to Secomapp docs</h2>
        </div>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>

            <Image />
        </div>

    </Layout>
)

export default IndexPage
