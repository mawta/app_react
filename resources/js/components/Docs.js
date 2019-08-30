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


class Docs extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        message: '',
        showToast: false,
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
}

export default Docs
