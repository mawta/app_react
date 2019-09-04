import React, {Component, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {
    ViewMajorMonotone, SettingsMajorMonotone,ArrowRightMinor,ArrowLeftMinor
} from '@shopify/polaris-icons'
import {Redirect} from 'react-router-dom'
import {Provider, ResourcePicker} from '@shopify/app-bridge-react';
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
    Pagination,
    Toast,
    DataTable,
    AppProvider

} from '@shopify/polaris';

import App from './App'


class Test extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        message: '',
        isScan: true,
        open: '',
        showToast: false,
        storeLink: '',
        blogLink: '',
        articleLink: '',
        collectionLink: '',
        sortedRows: '',
        countRows: 0,
        name: window.Laravel.name,
        cursor: null,
        cursor1: null,
        resourcePickerOpen: false,
    };
    setHeaderAxio = () => {
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.Laravel.csrfToken
        };
    };

    componentDidMount() {
        this.setHeaderAxio();
        axios.get(window.Laravel.baseUrl + '/api/get_test')
            .then(response => {
                this.setState({
                    storeLink: response.data.storeLink,
                    blogLink: response.data.blogLink,
                    articleLink: response.data.articleLink,
                    collectionLink: response.data.collectionLink,
                    sortedRows: response.data.sortedRows,
                    cursor: response.data.cursor,
                    cursor1: response.data.cursor1,
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

        const {sortedRows} = this.state;
        const initiallySortedRows = [
            [
                '',
                'Cannot fetch your product data',
                '',
                '',
                '',
            ],
        ];
        // const rows = initiallySortedRows;
         const rows = sortedRows ? this.rowArr() : initiallySortedRows;

        return (
            <App>
                <Page>
                    <div style={{marginBottom: '3%', marginTop: '3%'}}>
                    </div>
                    <hr/>
                    <Layout>
                        <Layout.AnnotatedSection
                            title="JSON-LD for store"
                            description="Shopify and your customers will use this information to modify Theme."
                        >
                            <div style={{marginTop: '3%'}}>
                                <Card sectioned>
                                    <div className="secomapp-normal">
                                        <p>Test your overall shop for JSON-LD integrity
                                            <Button primary id="secomapp-btn-fix" icon={ViewMajorMonotone}
                                                    onClick={ () => {
                                                        let popUp =  window.open(
                                                            'https://search.google.com/structured-data/testing-tool/u/0/#url=' +  "https://"+ this.state.name+".myshopify.com/",
                                                            '_blank'
                                                        );
                                                        if (popUp == null || typeof(popUp)=='undefined') {
                                                            alert('Please disable your pop-up blocker and try again.');
                                                        }

                                                    }
                                                    }
                                                    >
                                                Test
                                            </Button></p>
                                    </div>
                                    <br/>
                                </Card>
                            </div>
                        </Layout.AnnotatedSection>
                    </Layout>
                    <br/>
                    <Layout>
                        <Layout.AnnotatedSection
                            title="JSON-LD for blog"
                            description="Shopify and your customers will use this information to modify Theme."
                        >
                            <div style={{marginTop: '3%'}}>
                                <Card sectioned>
                                    <div className="secomapp-normal">
                                        <p>Test first blog and every blog in your store has JSON-LD
                                            <Button primary id="secomapp-btn-fix" icon={ViewMajorMonotone}
                                                    onClick={ () => {
                                                        let popUp =  window.open(
                                                            'https://search.google.com/structured-data/testing-tool/u/0/#url=' +  "https://"+ this.state.name+".myshopify.com/blogs/" +this.state.blogLink,
                                                            '_blank'
                                                        );
                                                        if (popUp == null || typeof(popUp)=='undefined') {
                                                            alert('Please disable your pop-up blocker and try again.');
                                                        }

                                                    }
                                                    }
                                            >
                                                Test
                                            </Button></p>
                                    </div>
                                    <br/>
                                </Card>
                            </div>
                        </Layout.AnnotatedSection>
                    </Layout>
                    <br/>
                    <Layout>
                        <Layout.AnnotatedSection
                            title="JSON-LD for article"
                            description="Shopify and your customers will use this information to modify Theme."
                        >
                            <div style={{marginTop: '3%'}}>
                                <Card sectioned>
                                    <div className="secomapp-normal">
                                        <p>Test first article in one blog and every article in your blog
                                            <Button primary id="secomapp-btn-fix" icon={ViewMajorMonotone}
                                                    onClick={ () => {
                                                        let popUp =  window.open(
                                                            'https://search.google.com/structured-data/testing-tool/u/0/#url=' +
                                                            "https://"+ this.state.name+".myshopify.com/blogs/" +this.state.blogLink
                                                            +"/"+this.state.articleLink,
                                                            '_blank'
                                                        );
                                                        if (popUp == null || typeof(popUp)=='undefined') {
                                                            alert('Please disable your pop-up blocker and try again.');
                                                        }

                                                    }
                                                    }
                                            >
                                                Test
                                            </Button></p>
                                    </div>
                                    <br/>
                                </Card>
                            </div>
                        </Layout.AnnotatedSection>
                    </Layout>
                    <br/>
                    <Layout>
                        <Layout.AnnotatedSection
                            title="JSON-LD for collection"
                            description="Shopify and your customers will use this information to modify Theme."
                        >
                            <div style={{marginTop: '3%'}}>
                                <Card sectioned>
                                    <div className="secomapp-normal">
                                        <p>Test first collection and every collection in your store has JSON-LD
                                            <Button primary id="secomapp-btn-fix" icon={ViewMajorMonotone}
                                                    onClick={ () => {
                                                        let popUp =  window.open(
                                                            'https://search.google.com/structured-data/testing-tool/u/0/#url=' +
                                                            "https://"+ this.state.name+".myshopify.com/collections/" +this.state.collectionLink,
                                                            '_blank'
                                                        );
                                                        if (popUp == null || typeof(popUp)=='undefined') {
                                                            alert('Please disable your pop-up blocker and try again.');
                                                        }
                                                    }
                                                    }
                                            >
                                                Test
                                            </Button></p>
                                    </div>
                                    <br/>
                                </Card>
                            </div>
                        </Layout.AnnotatedSection>
                    </Layout>
                    <br/>
                    <hr/>

                    <Card title="Product Table" sectioned>
                        <DataTable
                            columnContentTypes={[
                                'text',
                                'text',
                                'text',
                                'text',
                            ]}
                            headings={[
                                <p style={{fontWeight: '600'}}>Id</p>,
                                <p style={{fontWeight: '600'}}>Product</p>,
                                <p style={{fontWeight: '600'}}>Image</p>,
                                <p style={{fontWeight: '600'}}>Test</p>,
                            ]}
                            rows={rows}
                            defaultSortDirection="descending"
                            initialSortColumnIndex={0}
                            verticalAlign="middle"
                        />
                        <div>
                            <div className="secomapp-pagination">
                                <Button primary onClick={this.pre} icon={ArrowLeftMinor}/>
                                &nbsp;
                                &nbsp;
                                <Button primary onClick={this.next} icon={ArrowRightMinor}/>
                            </div>
                        </div>
                    </Card>

                    {toastMarkup}
                </Page>

            </App>
        );
    }
    rowArr = () => {
        let temp = this.state.sortedRows;
        let arr = [];
        temp.forEach(
            (element)=>{
               let elementTemp =[];
               let id = element[0];
               let title = element[1];
               let image = <img alt="product image" src={element[2]}  width="50px" height="60px" /> ;
               let test =  <Button primary icon={ViewMajorMonotone}
                                   onClick={ () => {
                                       window.open(
                                           'https://search.google.com/structured-data/testing-tool/u/0/#url=' +  "https://"+ this.state.name+".myshopify.com/products/" + element[3],
                                           '_blank'
                                       );
                                   }
                                   }>
                   Test
               </Button>;
                elementTemp.push(id);
                elementTemp.push(title);
                elementTemp.push(image);
                elementTemp.push(test);
                arr.push(elementTemp);
            }
        );
        return arr
    };

    next = () =>{
        this.setHeaderAxio();
        axios.post(window.Laravel.baseUrl + '/api/next-product',{
            cursor : this.state.cursor,
        })
            .then(response => {
                this.setState({
                    sortedRows: response.data.sortedRows,
                    cursor: response.data.cursor,
                    cursor1: response.data.cursor1,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    };
    pre = ()=>{
        this.setHeaderAxio();
        axios.post(window.Laravel.baseUrl + '/api/pre-product',{
            cursor1 : this.state.cursor1,
        })
            .then(response => {
                this.setState({
                    sortedRows: response.data.sortedRows,
                    cursor1: response.data.cursor1,
                    cursor: response.data.cursor,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    };

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

export default Test
