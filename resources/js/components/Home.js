import React, {Component, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {
    ConversationMinor,
    PlayCircleMajorMonotone,
    WandMajorMonotone,
    ChevronDownMinor
} from '@shopify/polaris-icons'
import {Redirect} from 'react-router-dom'
import {
    Strong,
    Icon,
    Banner,
    Button,
    Card,
    Layout,
    Page,
    TextContainer,
    Collapsible,
    Stack,
    FooterHelp
} from '@shopify/polaris';

import App from './App'


class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isJson: '',
        loading: false,
        googleSiteVerification: '',
        googleAnalytics: '',
        open: '',
        isTitle: '',
        titleDes: '',
        desDes: '',
        isDes: '',
    };
    setHeaderAxio = () => {
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.Laravel.csrfToken
        };
    };
    componentDidMount() {
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/get_home')
            .then(response => {
                this.setState({
                    isJson: response.data.isJson,
                    googleAnalytics: response.data.googleAnalytics,
                    googleSiteVerification: response.data.googleSiteVerification,
                    titleDes: response.data.titleDes,
                    isTitle: response.data.isTitle,
                    desDes: response.data.desDes,
                    isDes: response.data.isDes,

                })
            })
            .catch(function (error) {
                console.log(error)
            })
    };

    isProblem = () => (this.state.isJson == false || this.state.googleSiteVerification == false || this.state.googleAnalytics == false || this.state.isTitle == false || this.state.isDes == false) ? true : false;
    redirectToTarget = (target) => {
        return <Redirect to={target}/>
    };
    checkJson = () => {
        return <div>
            {this.state.isJson ? (
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; JSON LD is enable for your store</p>
            ) : (
                <p className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; JSON LD is not enable for your store</p>
            )}
        </div>;
    };
    checkWebmasterTool = () => {
        return <div>
            {this.state.googleSiteVerification ? (
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; Google Webmaster Tool is connected</p>
            ) : (
                <p className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; Google Webmaster Tool not connected</p>
            )}
        </div>;
    };
    checkAnalytic = () => {
        return <div>
            {this.state.googleAnalytics ? (
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; Google Analytics is connected</p>
            ) : (
                <p className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; Google Analytics not connected</p>
            )}
        </div>;
    };
    checkTitle = () => {
        return <div>
            {this.state.isTitle ? (
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; {this.state.titleDes}</p>
            ) : (
                <p className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; {this.state.titleDes}</p>
            )}
        </div>;
    };
    checkDes = () => {
        return <div>
            {this.state.isDes ? (
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; {this.state.desDes}</p>
            ) : (
                <p className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; {this.state.desDes}</p>
            )}
        </div>;
    };


    checkProblem = () => {
        return <div>
            {this.isProblem() ? (
                <p> Seem like you have some problem?  <Button primary id="secomapp-button-right" url="/optimize">Fix
                it</Button> </p>
            ) : (
               <p> Great! your SEO is almost perfect <Button primary id="secomapp-button-right-large" url="/optimize">Do
                   the rest</Button></p>
            )}
        </div>;
    };


    render() {
        return (
            <App>
                <Page
                    title="Welcome back , we're so glad you're here 😇!"
                >
                    <div style={{marginBottom: '3%', marginTop: '3%'}}>
                        <Banner
                            status='success'
                            action={{
                                content: '⚡ Read ours docs',
                            }}
                        >
                            <p style={{fontSize: '2.5rem', fontWeight: '600',}}>Start optimizing your SEO with our help
                                by following 👇</p>
                        </Banner>
                    </div>
                    <hr/>
                    <br/>
                    <Layout separator>
                        <Layout.AnnotatedSection
                            title="Let see what we can do 😉"
                        >
                            <Card sectioned>
                                {this.checkJson()}
                                <br/>
                                {this.checkAnalytic()}
                                <br/>
                                {this.checkWebmasterTool()}
                                <br/>
                                {this.checkTitle()}
                                <br/>
                                {this.checkDes()}
                                <br/>
                                {this.checkProblem()}

                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                    <hr/>
                    <br/>
                    <Layout separator>
                        <Layout.AnnotatedSection
                            title="Frequently Asked Questions"
                        >
                            <Card sectioned>
                                <div className="accordion">
                                    <div className="item">
                                        <input id="accordionc1" type="checkbox" name="accordionc"
                                               hidden="hidden"/>
                                        <label className="menulabel" htmlFor="accordionc1">Q: What are Alt tags and how
                                            can they help my store?</label>
                                        <div className="acoordion-content">Lorem ipsum dolor sit amet, consectetur
                                            adipisicing elit. Suscipit nulla non laboriosam accusamus ex neque sit.
                                            Corporis in expedita optio ducimus, id illo, iure hic officia quam qui
                                            sapiente veniam!
                                        </div>
                                    </div>
                                    <div className="item">
                                        <input id="accordionc2" hidden="hidden" type="checkbox" name="accordionc"/>
                                        <label className="menulabel" htmlFor="accordionc2">Accordion2</label>
                                        <div className="acoordion-content">Lorem ipsum dolor sit amet, consectetur
                                            adipisicing elit. Suscipit nulla non laboriosam accusamus ex neque sit.
                                            Corporis in expedita optio ducimus, id illo, iure hic officia quam qui
                                            sapiente veniam!
                                        </div>
                                    </div>
                                    <div className="item">
                                        <input id="accordionc3" hidden="hidden" type="checkbox" name="accordionc"/>
                                        <label className="menulabel" htmlFor="accordionc3">Accordion3</label>
                                        <div className="acoordion-content">Lorem ipsum dolor sit amet, consectetur
                                            adipisicing elit. Suscipit nulla non laboriosam accusamus ex neque sit.
                                            Corporis in expedita optio ducimus, id illo, iure hic officia quam qui
                                            sapiente veniam!
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <a href='/faq'><p>Read more</p></a>
                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Page>
            </App>
        )


    }
}

export default Home
