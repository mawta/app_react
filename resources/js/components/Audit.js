import React, {Component, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {
    ConversationMinor,
    PlayCircleMajorMonotone,
    WandMajorMonotone,
    ChevronDownMinor, SettingsMajorMonotone
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
    FooterHelp,
    Toast,
    Frame as AppFrame
} from '@shopify/polaris';

import App from './App'


class Audit extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isAudit: true,
        loading: false,
        message: '',
        isScan: true,
        open: '',
        showToast: false,
        page:''
    };
    setHeaderAxio = () => {
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.Laravel.csrfToken
        };
    };

    componentDidMount() {
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/get_audit')
            .then(response => {
                this.setState({
                    isScan: response.data.isScan,
                    isAudit: response.data.isAudit,
                    page: response.data.page,
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
        return (
            <App>
                <Page>
                    <div style={{marginBottom: '3%', marginTop: '3%'}}>
                    </div>
                    <hr/>
                    <Card title="Check your site with google search engine" sectioned>
                        {this.checkAudit()}
                    </Card>
                    <div style={{marginBottom: '3%', marginTop: '3%', height: '1080px'}}>
                        <iframe width="100%" height="100%" style={{ border: 'none',}} src={this.state.page}>
                        </iframe>
                    </div>
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

    // Change the value shown
    refresh = (e, value) => {
        e.style.setProperty('--percent', value);
        e.style.setProperty('--offset', 28.2743280 * Math.max(0, 1 - value * .01));
    };
// Bind an input[type=range][data-visual] to the visual it controls
    bind = (per) => {
        const slider = document.getElementById('percent');
        const visual = document.getElementById(slider.dataset.visual);
        this.refresh(visual, per)
    };
    scan = () => {
        this.setState(
            ({showToast}) => ({
                showToast: !showToast,
                message: "Great! we are scanning your site, just wait a few minute. ",
                isScan: true,
            }));
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/scan-audit')
            .then(response => {
            })
            .catch(function (error) {
                console.log(error)
            });
    };
    checkAudit = () => {
        return <div>
            {this.state.isAudit ? (
                <p className="secomapp-success">✅ &nbsp;&nbsp;&nbsp; Wanna see your site change? just click 👉
                    <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix"
                            onClick={this.scan} loading={this.state.isScan}>Re Scan</Button>
                </p>
            ) : (
                <p className="secomapp-unsuccess">&#x274C; &nbsp;&nbsp;&nbsp; Scan to see your site as google
                    <Button primary icon={SettingsMajorMonotone} id="secomapp-btn-fix"
                            onClick={this.scan} loading={this.state.isScan}>Scan</Button>
                </p>
            )}
        </div>;
    };

}

export default Audit
