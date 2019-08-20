import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {
    PlayCircleMajorMonotone
} from '@shopify/polaris-icons'
import {
    Icon,
    Banner,
    Button,
    ActionList,
    AppProvider,
    Card,
    ContextualSaveBar,
    FormLayout,
    Frame,
    Layout,
    Loading,
    Modal,
    Navigation,
    Page,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    TextContainer,
    TextField,
    Toast,
    TopBar
} from '@shopify/polaris';

import App from './App'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {data: ''}
    }

    // componentDidMount () {
    //     axios.get(window.Laravel.baseUrl + '/api/home')
    //         .then(response => {
    //             this.setState({ data: response.data })
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    // }
    render() {
        return (
            <App>
                <Page
                title="Start optimizing your SEO with our help by following 👇"
                >
                    <Layout>
                        <Layout.AnnotatedSection
                            title="Let see what we can do 😉"
                        >
                            <Card sectioned>
                                <Banner
                                    title="JSON LD is enable for your store."
                                    status="success"
                                />
                                <br/>

                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Page>
            </App>
        )
    }
}

export default Home