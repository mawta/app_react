import React from 'react';
import {
    ActionList,
    AppProvider,
    Card,
    ContextualSaveBar,
    FormLayout,
    Frame as AppFrame,
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
    Stack,
    Heading,
    FooterHelp,
    Button
} from '@shopify/polaris';
import {
    ArrowLeftMinor,
    ConversationMinor,
    HomeMajorMonotone,
    FollowUpEmailMajorMonotone,
    OrdersMajorTwotone,
    SmileyHappyMajorMonotone,
    WandMajorMonotone,
    QuestionMarkMajorMonotone
} from '@shopify/polaris-icons';
import {Link} from 'react-router-dom'
import {
    ResourcesMajorMonotone, TroubleshootMajorMonotone,
} from '@shopify/polaris-icons';
import axios from "axios";

export default class App extends React.Component {
    state = {
        showToast: false,
        isLoading: false,
        isDirty: false,
        userMenuOpen: false,
        showMobileNavigation: false,
        modalActive: false,
        supportSubject: '',
        supportMessage: '',
        name: window.Laravel.name,
        email: window.Laravel.email,
    };

    render() {
        const {
            showToast,
            isLoading,
            isDirty,
            userMenuOpen,
            showMobileNavigation,
            modalActive,
            name,
            email,
        } = this.state;
        const toastMarkup = showToast ? (
            <Toast
                onDismiss={this.toggleState('showToast')}
                content="Thank you for contact with us 😘!
                We always answer in few hours, please wait "
            />
        ) : null;

        const userMenuActions = [
            {
                items: [{
                    // content: 'Upgrade Your Plan',
                    // action: {
                    //
                    // }
                }],
            },
        ];

        const navigationUserMenuMarkup = (
            <Navigation.UserMenu
                actions={userMenuActions}
                name={name}
                detail={email}
                avatarInitials={name.charAt(0)}
            />
        );

        const userMenuMarkup = (
            <TopBar.UserMenu
                actions={userMenuActions}
                name={name}
                detail={email}
                initials={name.charAt(0)}
                open={userMenuOpen}
                onToggle={this.toggleState('userMenuOpen')}
            />
        );


        const topBarMarkup = (
            <TopBar
                showNavigationToggle={true}
                userMenu={userMenuMarkup}
                onNavigationToggle={this.toggleState('showMobileNavigation')}
            />
        );
        const titleNav = 'Hello ' + this.state.name;
        const navigationMarkup = (
            <Navigation location="/" userMenu={navigationUserMenuMarkup}>
                <Navigation.Section
                    title={titleNav}
                    items={[
                        {
                            label: 'Nice to meet you 😊 !',
                        }
                    ]}/>
                <Navigation.Section
                    separator
                    title="SEO Booster APP"
                    items={[
                        {
                            label: 'Home',
                            icon: HomeMajorMonotone,
                            url: '/home',
                            onClick: this.toggleState('isLoading'),

                        },
                        {
                            label: 'Test',
                            icon: TroubleshootMajorMonotone,
                            url: '/test',
                            onClick: this.toggleState('isLoading'),
                        },
                        {
                            label: 'Optimize',
                            icon: WandMajorMonotone,
                            url: '/optimize',
                            onClick: this.toggleState('isLoading'),

                        },
                        {
                            label: 'Audit your store',
                            icon: ResourcesMajorMonotone,
                            url: '/audit',
                            onClick: this.toggleState('isLoading'),

                        },


                    ]}

                />
                <Navigation.Section
                    separator
                    title='Support'
                    items={[
                        {
                            icon: FollowUpEmailMajorMonotone,
                            label: 'Get help',
                            onClick: this.toggleState('modalActive'),
                        },
                        {
                            icon: QuestionMarkMajorMonotone,
                            label: 'Docs',
                            url: '/docs'
                        },
                    ]}
                    action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: this.toggleState('modalActive'),
                    }}
                />
            </Navigation>

        );

        const loadingMarkup = isLoading ? <Loading/> : null;
        const modalMarkup = (
            <Modal
                open={modalActive}
                onClose={this.toggleState('modalActive')}
                title="Contact support"
                primaryAction={{
                    content: 'Send',
                    onAction: this.sendMail,
                }}
            >
                <Modal.Section>
                    <FormLayout>
                        <TextField
                            label="Subject"
                            value={this.state.supportSubject}
                            onChange={this.handleSubjectChange}
                        />
                        <TextField
                            label="Message"
                            value={this.state.supportMessage}
                            onChange={this.handleMessageChange}
                            multiline
                        />
                    </FormLayout>
                </Modal.Section>
            </Modal>
        );

        const theme = {
            colors: {
                topBar: {
                    background: '#5766C2',
                },
            },
            logo: {
                width: 124,
                topBarSource: '/images/logo.png',
                contextualSaveBarSource:
                    '/images/logo.png',
                url: '/',
                accessibilityLabel: 'Secomapp',
            },
        };

        return (
            <div style={{height: '500px'}}>
                <AppProvider theme={theme} >
                    <AppFrame
                        topBar={topBarMarkup}
                        navigation={navigationMarkup}
                        showMobileNavigation={showMobileNavigation}
                        onNavigationDismiss={this.toggleState('showMobileNavigation')}
                    >
                        {loadingMarkup}
                        {this.props.children}
                        <Stack vertical={true} spacing="tight" alignment="center">
                            <Stack.Item fill>
                                <div className={"image-wrapper mb-1_5"}>
                                    <img src="/images/shopify-review.svg" alt={""}/>
                                </div>
                            </Stack.Item>
                            <Stack.Item>
                                <Heading>How do you feel about ours app?</Heading>
                            </Stack.Item>
                            <Stack.Item>
                                <div>Kindly leave us a Review! Thank You 😍</div>
                            </Stack.Item>
                            <Stack.Item>
                                <Button
                                    onClick={ () => {
                                        let popUp =  window.open(
                                            'https://apps.shopify.com/json-ld-for-seo-1?#modal-show=ReviewListingModal',
                                            '_blank'
                                        );
                                        if (popUp == null || typeof(popUp)=='undefined') {
                                            alert('Please disable your pop-up blocker and try again.');
                                        }

                                    }
                                    }
                                >Leave
                                    a review</Button>
                            </Stack.Item>
                        </Stack>
                        <Layout.Section>
                            <FooterHelp>
                                Explore more apps from <Button
                                onClick={ () => {
                                    let popUp =  window.open(
                                        'https://apps.shopify.com/partners/secomapp',
                                        '_blank'
                                    );
                                    if (popUp == null || typeof(popUp)=='undefined') {
                                        alert('Please disable your pop-up blocker and try again.');
                                    }

                                }
                                }
                                plain>Secomapp</Button>
                                .
                            </FooterHelp>
                        </Layout.Section>
                        {toastMarkup}
                        {modalMarkup}
                        <nav className="nav">
                                <div id="form-main">
                                    <div id="form-div">
                                        <form className="form" id="form1">
                                            <p className="email">
                                                <input name="email" type="text"
                                                       className="validate[required,custom[email]] feedback-input"
                                                       id="email" placeholder="Email"/>
                                            </p>

                                            <p className="name">
                                                <input name="subject" type="text"
                                                       className="validate[required,custom[onlyLetter],length[0,300]] feedback-input"
                                                       placeholder="Subject" id="name" max="300"/>
                                            </p>

                                            <p className="text">
                                                <textarea name="text"
                                                          className="validate[required,length[6,300]] feedback-input"
                                                          id="comment" placeholder="Message"></textarea>
                                            </p>


                                            <div className="submit">
                                                <Button id="button-blue" onClick={this.sendFormMail}>
                                                    SEND
                                                </Button>
                                                <div className="ease"></div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        </nav>
                        <div href="#" className="toggle-nav">Secomapp help</div>
                    </AppFrame>
                </AppProvider>
            </div>
        );
    }
    setHeaderAxio = () => {
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.Laravel.csrfToken,

        };
    };


    sendFormMail = () => {
        const element = document.getElementsByClassName('nav-active')[0];
        element.classList.remove("nav-active");
        let subject = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let message = document.getElementById('comment').value;
        document.getElementById('name').value = '';
        document.getElementById('email').value= '';
        document.getElementById('comment').value= '';
        if (!subject||!email||!message){
            return;
        }
        this.setHeaderAxio();
        axios.post(window.Laravel.baseUrl + '/api/send-mail',{
            subject: subject,
            message1: message,
            email: email
        })
            .then(response => {

                this.setState(({modalActive,showToast}) => ({showToast: !showToast}));
            })
            .catch(function (error) {
                console.log(error)
            })
    };

    sendMail = () => {
        if (!this.state.supportSubject||!this.state.supportMessage) {
            return;
        }
        this.setHeaderAxio();
        axios.post(window.Laravel.baseUrl + '/api/send-mail',{
            subject: this.state.supportSubject,
            message1: this.state.supportMessage,
            email: window.Laravel.email
        })
            .then(response => {
                this.setState(({modalActive,showToast}) => ({modalActive: !modalActive, showToast: !showToast}));
            })
            .catch(function (error) {
                console.log(error)
            })
    };

    toggleState = (key) => {
        return () => {
            this.setState((prevState) => ({[key]: !prevState[key]}));
        };
    };

    handleMessageChange = (supportMessage) => {
        this.setState({supportMessage});
    };
    handleSubjectChange = (supportSubject) => {
        this.setState({supportSubject});
    };
}
