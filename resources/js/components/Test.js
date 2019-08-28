import React, {Component, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {
    ViewMajorMonotone, SettingsMajorMonotone
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
    DataTable
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
                    countRows: response.data.countRows,
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

                    <Card>
                        <DataTable
                            columnContentTypes={[
                                'text',
                                'text',
                                'text',
                                'text',
                            ]}
                            headings={[
                                'Id',
                                'Product',
                                'Image',
                                'Test',
                            ]}
                            rows={rows}
                            defaultSortDirection="descending"
                            initialSortColumnIndex={0}
                            footerContent={`Showing ${rows.length} results`}
                            verticalAlign="middle"
                        />
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
