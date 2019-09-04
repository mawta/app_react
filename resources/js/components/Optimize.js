import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {
    ConversationMinor,
    PlayCircleMajorMonotone,
    WandMajorMonotone,
    SettingsMajorMonotone
} from '@shopify/polaris-icons'
import {Redirect} from 'react-router-dom'
import {
    Strong,
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
    TopBar,
    Tabs,
    Heading
} from '@shopify/polaris';

import App from './App'

class Optimize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            isJson: true,
            loading: false,
            googleSiteVerification: '',
            googleAnalytics: '',
            open: '',
            isTitle: true,
            titleDes: '',
            desDes: '',
            isDes: true,
            showToast: false,
            message: '',
            isSitemap: true,
            isScan: true,
            brokenLinks: 0,
            isCrawled: true,
        }
    }

    setHeaderAxio = () => {
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.Laravel.csrfToken
        };
    };

    componentDidMount() {
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/get_optimize')
            .then(response => {
                this.setState({
                    isJson: response.data.isJson,
                    googleAnalytics: response.data.googleAnalytics,
                    googleSiteVerification: response.data.googleSiteVerification,
                    titleDes: response.data.titleDes,
                    isTitle: response.data.isTitle,
                    desDes: response.data.desDes,
                    isDes: response.data.isDes,
                    isSitemap: response.data.isSitemap,
                    isScan: response.data.isScan,
                    brokenLinks: response.data.brokenLinks,
                    isCrawled: response.data.isCrawled,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    };


    render() {
        const {showToast, message} = this.state;
        const toastMarkup = showToast ? (
            <Toast
                content={message}
                onDismiss={this.toggleToast}
                duration={2500}
            />
        ) : null;
        const {selected} = this.state;
        const tabs = [
            {
                id: 'json-ld',
                content: 'Json LD',
                accessibilityLabel: 'Json LD',
                panelID: 'json-ld-content',
            },
            {
                id: 'title',
                content: 'Title',
                panelID: 'title-content',
            },
            {
                id: 'meta-tag',
                content: 'Description tag',
                panelID: 'meta-tag-content',
            },
            {
                id: 'sitemap',
                content: 'Sitemap',
                panelID: 'sitemap-content',
            },
            {
                id: 'google-analytics',
                content: 'Google Analytics',
                panelID: 'google-analytics-content',
            },
            {
                id: 'broken-link',
                content: 'Broken Link',
                panelID: 'broken-link-content',
            },


        ];

        return (
            <App>
                <Page>
                    <div style={{marginBottom: '3%', marginTop: '3%'}}>
                        <Banner
                            status='success'
                        >
                            <p style={{fontSize: '2.5rem', fontWeight: '600',}}>
                                Let optimize your SEO and get more sales 🤑!
                            </p>
                            <br/>
                            <p>
                                <p>it is pretty easy, just a couple of clicks 👇</p>
                            </p>
                        </Banner>
                    </div>
                    <hr/>
                    <Card>
                        <Tabs tabs={tabs} selected={selected} onSelect={this.handleTabChange} fitted>
                            <Card.Section>
                                {this.tabMarkup(selected)}
                            </Card.Section>
                        </Tabs>
                    </Card>
                    {toastMarkup}
                </Page>
            </App>
        );
    }

    _toggleToast = () => {
        this.setState(({showToast}) => ({showToast: !showToast}));
    };
    get toggleToast() {
        return this._toggleToast;
    }

    set toggleToast(value) {
        this._toggleToast = value;
    }

    handleTabChange = (selectedTabIndex) => {
        this.setState({selected: selectedTabIndex});
    };
    fixJson = () => {
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/set-json-ld')
            .then(() => {
                this.setState(
                    ({showToast}) => ({
                        showToast: !showToast,
                        message: "Great! Json LD is enable for your site. ",
                        isJson: true,
                    }));
            })
            .catch(function (error) {
                console.log(error)
            });
    };
    checkJson = () => {
        if (this.state.isJson) {
            return <div>
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; JSON LD is enable for your store</p>
            </div>
        } else {
            return <div>
                <div className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; JSON LD is not enable for your store
                    <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix" onClick={this.fixJson}>Fix
                        it</Button></div>
            </div>
        }
    };
    fixTitle = () => {
        this.setState(
            ({showToast}) => ({
                showToast: !showToast,
                message: "Great! Your title is now beautiful. ",
                isTitle: true,
                titleDes: "Your title is pretty good"
            }));
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/set-title')
            .then(() => {

            })
            .catch(function (error) {
                console.log(error)
            });
    };
    checkTitle = () => {
        if (this.state.isTitle) {
            return <div>
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; {this.state.titleDes}</p>
            </div>
        } else {
            return <div>
                <div className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; {this.state.titleDes}
                    <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix" onClick={this.fixTitle}>Fix
                        it</Button></div>
            </div>
        }
    };

    checkWebmasterTool = () => {
        if (this.state.googleSiteVerification) {
            return <div>
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; Google Webmaster Tool is connected</p>
            </div>


        } else {
            return <div>
                <p className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; Google Webmaster Tool not connected</p>
            </div>
        }
    };
    checkAnalytic = () => {
        if (this.state.googleAnalytics) {
            return <div>
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; Google Analytics is connected</p>
            </div>


        } else {
            return <div>
                <p className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; Google Analytics not connected</p>
            </div>
        }
    };
    fixDes = () => {
        this.setState(
            ({showToast}) => ({
                showToast: !showToast,
                message: "Great! Your description is now beautiful. ",
                isDes: true,
                desDes: "Your description is pretty good"
            }));
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/set-description')
            .then(() => {

            })
            .catch(function (error) {
                console.log(error)
            });
    };
    checkDes = () => {
        if (this.state.isDes) {
            return <div>
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; {this.state.desDes}</p>
            </div>
        } else {
            return <div>
                <div className="secomapp-unsuccess">
                    &#x274C; &nbsp;&nbsp;&nbsp; {this.state.desDes}
                    <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix" onClick={this.fixDes}>Fix
                        it</Button>
                </div>
            </div>
        }
    };


    fixSitemap = () => {
        this.setState(
            ({showToast}) => ({
                showToast: !showToast,
                message: "Great! Google is now knowing you. ",
                isSitemap: true,
            }));
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/set-sitemap')
            .then(() => {

            })
            .catch(function (error) {
                console.log(error)
            });
    };
    checkSitemap = () => {
        if (this.state.isSitemap) {
            return <div>
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; Your sitemap has been submitted </p>
            </div>
        } else {
            return <div>
                <div className="secomapp-unsuccess">
                    &#x274C; &nbsp;&nbsp;&nbsp; Your sitemap need to be submitted
                    <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix"
                            onClick={this.fixSitemap}>Submit</Button>
                </div>
            </div>
        }
    };
    reScan = () => {
        this.setState(
            ({showToast}) => ({
                showToast: !showToast,
                message: "Great! we are scanning broken link for you, just wait a few minute. ",
                isScan: true,
            }));
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/rescan-link')
            .then(() => {

            })
            .catch(function (error) {
                console.log(error)
            });
    };
    scanLink = () => {
        this.setState(
            ({showToast}) => ({
                showToast: !showToast,
                message: "Great! we are scanning broken link for you, just wait a few minute. ",
                isScan: true,
            }));
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/scan-link')
            .then(() => {

            })
            .catch(function (error) {
                console.log(error)
            });
    };
    fixBroken = () => {

    };

    checkBrokenLink = () => {
        if (this.state.isCrawled) {
            if (this.state.brokenLinks == 0) {
                return <div>
                    <div className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; You have no broken Links
                        <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix"
                                onClick={this.reScan} loading={this.state.isScan}>Re Scan</Button>
                    </div>
                </div>
            } else {
                return <div>
                    <div className="secomapp-unsuccess">
                        &#x274C; &nbsp;&nbsp;&nbsp; We have found {this.state.brokenLinks} broken links on your
                        site!
                        <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix"
                                onClick={this.reScan} loading={this.state.isScan}>Re Scan</Button>
                    </div>
                </div>
            }
        }else {
            return <div>
                <div className="secomapp-unsuccess">
                    &#x274C; &nbsp;&nbsp;&nbsp; Let click "Scan" button to scan broken links on your
                    site!
                    <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix"
                            onClick={this.scanLink} loading={this.state.isScan}>Scan</Button>
                </div>
            </div>
        }
    };

    tabMarkup = (index) => {
        if (index == 0) {
            return <div>

                <div>
                    {this.checkJson()}
                </div>
                <TextContainer>
                    <div>
                        <br/><br/>
                        <Heading>What is Json LD?</Heading>
                        <br/>
                        <p>
                            JSON-LD is a lightweight Linked Data format. It is easy for humans to read and write.
                            <br/>It is based on the already successful JSON format and provides a way to help JSON data
                            interoperate at Web-scale.<br/>
                            JSON-LD is an ideal data format for programming environments, REST Web services, and
                            unstructured databases
                        </p>
                        <p><b>Google and some other search engine use this as a factor to rank in their search
                            results </b></p>
                        <div className="secomapp-via-text">
                            (source: https://json-ld.org/)
                        </div>
                    </div>

                    <div>
                        <Heading>What is this app going to do?</Heading>
                        <br/>
                        <p>
                            We're going to add Json LD to all your store front and products page
                        </p>
                        <p>
                            Instead of you doing this manually (which can take hours)- we're going to do this for you
                            automatically in a click 😊 <br/> And as a bonus - <b>it's 100% FREE!</b>
                        </p>

                    </div>
                </TextContainer>
            </div>
        } else if (index == 1) {
            return <div>
                <div>
                    {this.checkTitle()}
                </div>
                <TextContainer>
                    <div>
                        <br/><br/>
                        <Heading>Why title is so important?</Heading>
                        <br/>
                        <p>
                            A title tag is an HTML element that specifies the title of a web page.
                            <br/>Title tags are displayed on search engine results pages (SERPs) as the clickable
                            headline for a given result, and are important for usability, SEO, and social sharing.
                        </p>
                        <p><b>Google and some other search engine use this as a factor to rank in their search
                            results </b></p>
                        <div className="secomapp-via-text">
                            (source: https://moz.com/learn/seo/title-tag)
                        </div>
                    </div>

                    <div>
                        <Heading>What is this app going to do?</Heading>
                        <br/>
                        <p>
                            We're going to fix your title in every single page of your store
                        </p>
                        <p>
                            Instead of you doing this manually (which can take hours)- we're going to do this for you
                            automatically in a click 😊
                            <br/> And as a bonus - <b>it's 100% FREE!</b>
                        </p>

                    </div>
                </TextContainer>
            </div>
        } else if (index == 2) {
            return <div>
                <div>
                    {this.checkDes()}
                </div>
                <TextContainer>
                    <div>
                        <br/><br/>
                        <Heading>What is a meta description tag?</Heading>
                        <br/>
                        <p>
                            The meta description is an HTML attribute that provides a brief summary of a web page. <br/>
                            Search engines such as Google often display the meta description—typically up to 160
                            characters long—in search results where they can highly influence user click-through rates.
                        </p>
                        <p><b>Google and some other search engine use this as a factor to rank in their search
                            results </b></p>
                        <div className="secomapp-via-text">
                            (source: https://moz.com/learn/seo/meta-description)
                        </div>
                    </div>

                    <div>
                        <Heading>What is this app going to do?</Heading>
                        <br/>
                        <p>
                            We're going to fix your description tag in every single page of your store
                        </p>
                        <p>
                            Instead of you doing this manually (which can take hours)- we're going to do this for you
                            automatically in a click 😊
                            <br/> And as a bonus - <b>it's 100% FREE!</b>
                        </p>

                    </div>
                </TextContainer>
            </div>
        } else if (index == 3) {
            return <div>
                <div>
                    {this.checkSitemap()}
                </div>
                <TextContainer>
                    <div>
                        <br/><br/>
                        <Heading>What is a sitemap?</Heading>
                            <br/>
                        <p>
                            A sitemap is a file where you provide information about the pages, videos, and other files
                            on your site, and the relationships between them. Search engines like Google read this file
                            to more intelligently crawl your site. A sitemap tells the crawler which files you think are
                            important in your site, and also provides valuable information about these files: for
                            example, for pages, when the page was last updated, how often the page is changed, and any
                            alternate language versions of a page.
                        </p>
                        <p><b>Google and some other search engine use this as a factor to rank in their search
                            results </b></p>
                        <div className="secomapp-via-text">
                            (source: https://support.google.com/webmasters/answer/156184)
                        </div>
                    </div>

                    <div>
                        <Heading>What is this app going to do?</Heading>
                        <br/>
                        <p>
                            We're going to submit your sitemap to google.
                        </p>
                        <p>
                            Instead of you doing this manually (which can take hours)- we're going to do this for you
                            automatically in a click 😊
                            <br/> And as a bonus - <b>it's 100% FREE!</b>
                        </p>

                    </div>
                </TextContainer>
            </div>
        } else if (index == 4) {
            return <div>
                <div>
                    {this.checkAnalytic()}
                    <br/>
                    {this.checkWebmasterTool()}
                </div>
                <TextContainer>
                    <div>
                        <br/><br/>
                        <Heading>What is Google webmaster tool?</Heading>

                        <br/>
                        <p>
                            Google Search Console (previously Webmaster tool) allows to know if your site is infected
                            with malware. It also allows you to communicate with google and adjust aspects of how Google
                            see your websites, such as Internal & External links, by typing which keyword user land on
                            your site, adjust crawling and indexing of your website, click rate of keywords and many
                            more.
                        </p>
                        <br/>
                        <Heading>What is Google Analytics?</Heading>
                        <br/>
                        <p>
                            Google analytics is used to track the website activity of the users such as session
                            duration, pages per session, bounce rate etc. along with the information on the source of
                            the traffic. It can be integrated with Google Ads, with which users can review online
                            campaigns by tracking landing page quality and conversions (goals). Goals might include
                            sales, lead generation, viewing a specific page, or downloading a particular file. Google
                            Analytics' approach is to show high-level, dashboard-type data for the casual user, and more
                            in-depth data further into the report set. Google Analytics analysis can identify poorly
                            performing pages with techniques such as funnel visualization, where visitors came from
                            (referrers), how long they stayed on the website and their geographical position. It also
                            provides more advanced features, including custom visitor segmentation. Google Analytics
                            e-commerce reporting can track sales activity and performance. The e-commerce reports shows
                            a site's transactions, revenue, and many other commerce-related metrics.
                        </p>
                        <p><b>Google search engine use this as a factor to rank in their search results </b></p>
                        <div className="secomapp-via-text">
                            (source: https://en.wikipedia.org/wiki/Google_Analytics)
                        </div>
                    </div>

                    <div>
                        <Heading>How to Set up Google Analytics and Google webmaster tool?</Heading>
                        <br/>
                        <p>
                            <b>Set up Google Analytics </b>is very simple and you an do it by follow some step {' '}
                            <a
                                href="https://help.shopify.com/en/manual/reports-and-analytics/google-analytics/google-analytics-setup">
                                in here
                            </a>
                            <br/>
                        </p>
                        <p>
                            <b>With Google webmaster tool</b> we already have a very clearly step by step guild 😊
                            {' '}
                            <a
                                href="http://localhost:8000/webmaster">
                                in here
                            </a>
                            <br/> And as a bonus - <b>it's 100% FREE!</b>
                        </p>

                    </div>
                </TextContainer>
            </div>
        } else if (index == 5) {
            return <div>
                <div>
                    {this.checkBrokenLink()}
                </div>
                <TextContainer>
                    <div>
                        <br/><br/>
                        <Heading>What is broken link?</Heading>
                        <br/>
                        <p>
                            A broken link or dead link is a link on a web page that no longer works because the website
                            is encountering one or more of the reasons below.
                            <br/>
                            Reasons for broken links: <br/>
                            - An improper URL entered for the link by the website owner.<br/>
                            - The destination website removed the linked web page (causing what is known as a 404
                            error).<br/>
                            - The destination website permanently moved or no longer exists.<br/>
                            - The user has software or is behind a firewall that blocks access to the destination
                            website.<br/>
                            - The website owner linked to a site that is behind a firewall that does not allow outside
                            access (such as an Intranet site or a restricted access area on a website).<br/>
                            Broken links can be problematic for website visitors, making them unable to access the
                            desired resource or information. These users may decide to make use of another site to find
                            the necessary information elsewhere. A site that hasn't been updated or checked for a long
                            time may suffer from link rot, which is a term used to describe a site with dozens of broken
                            links.
                        </p>
                        <p><b>Google and some other search engine use this as a factor to rank in their search
                            results </b></p>
                        <div className="secomapp-via-text">
                            (source: https://www.computerhope.com/jargon/b/broken_link.htm)
                        </div>
                    </div>

                    <div>
                        <Heading>What is this app going to do?</Heading>
                        <br/>
                        <p>
                            We're going to check all broken link in your store
                        </p>
                        <p>
                            Instead of you doing this manually (which can take hours)- we're going to do this for you
                            automatically in a click 😊
                            <br/> And as a bonus - <b>it's 100% FREE!</b>
                        </p>

                    </div>
                </TextContainer>
            </div>
        }
    };

}

export default Optimize
