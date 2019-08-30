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
                <p> Seem like you have some problem? <Button primary id="secomapp-button-right" url="/optimize">Fix
                    it</Button></p>
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
                                url: 'http://localhost:8000/'
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
                                        <input id="accordionc2" hidden="hidden" type="checkbox" name="accordionc"/>
                                        <label className="menulabel" htmlFor="accordionc2">What is this app going to
                                            do</label>
                                        <div className="acoordion-content">
                                            &nbsp;&nbsp;&nbsp;Ours app will show your SEO problem and help you fix it
                                            very easy , just a couple of clicks
                                            <br/>
                                            &nbsp;&nbsp;&nbsp;<b>We don't collect your data for any reason</b>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <input id="accordionc1" type="checkbox" name="accordionc"
                                               hidden="hidden"/>
                                        <label className="menulabel" htmlFor="accordionc1">What is JSON-LD?</label>
                                        <div className="acoordion-content">
                                            &nbsp;&nbsp;&nbsp;JSON-LD is a lightweight 'Linked Data' format. It is a way
                                            to encode your website data to be easier to understand for other machines on
                                            the Internet - including search engines like Google!
                                            <br/>
                                            &nbsp;&nbsp;&nbsp;Google looks for JSON-LD, and rewards websites and
                                            webshops that serve JSON-LD data. Many of Google’s search results page
                                            features (including rich snippets and Knowledge Graph cards) are enabled by
                                            JSON-LD markup. Their 'Shopping' search results tab is also powered by
                                            JSON-LD. Making sure that your site serves this type of data can be very
                                            helpful in your search engine ranking!
                                        </div>
                                    </div>
                                    <div className="item">
                                        <input id="accordionc3" hidden="hidden" type="checkbox" name="accordionc"/>
                                        <label className="menulabel" htmlFor="accordionc3">What is Google Analytics and
                                            Google Webmaster</label>
                                        <div className="acoordion-content">
                                            &nbsp;&nbsp;&nbsp;Google Search Console (previously Webmaster tool) allows
                                            to know if your
                                            site is infected with malware. It also allows you to communicate with google
                                            and adjust aspects of how Google see your websites, such as Internal &
                                            External links, by typing which keyword user land on your site, adjust
                                            crawling and indexing of your website, click rate of keywords and many more.
                                            <br/>
                                            &nbsp;&nbsp;&nbsp;Google analytics is used to track the website activity of
                                            the users such as session duration, pages per session, bounce rate etc.
                                            along with the information on the source of the traffic. It can be
                                            integrated with Google Ads, with which users can review online campaigns by
                                            tracking landing page quality and conversions (goals). Goals might include
                                            sales, lead generation, viewing a specific page, or downloading a particular
                                            file. Google Analytics' approach is to show high-level, dashboard-type data
                                            for the casual user, and more in-depth data further into the report set.
                                            Google Analytics analysis can identify poorly performing pages with
                                            techniques such as funnel visualization, where visitors came from
                                            (referrers), how long they stayed on the website and their geographical
                                            position. It also provides more advanced features, including custom visitor
                                            segmentation. Google Analytics e-commerce reporting can track sales activity
                                            and performance. The e-commerce reports shows a site's transactions,
                                            revenue, and many other commerce-related metrics
                                        </div>
                                    </div>

                                </div>
                                <br/>
                                <a href='http://localhost:8000/'><p>Read more</p></a>
                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Page>
            </App>
        )


    }
}

export default Home
