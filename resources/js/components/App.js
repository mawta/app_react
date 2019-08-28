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
                We always answer in few hours please wait "
            />
        ) : null;

        const userMenuActions = [
            {
                items: [{content: 'Community forums'}],
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
                onSearchResultsDismiss={this.handleSearchResultsDismiss}
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
                            label: 'Audit your store',
                            icon: ResourcesMajorMonotone,
                            url: '/audit',
                            onClick: this.toggleState('isLoading'),

                        },
                        {
                            label: 'Optimize',
                            icon: WandMajorMonotone,
                            url: '/optimize',
                            onClick: this.toggleState('isLoading'),

                        },
                        {
                            label: 'Test',
                            icon: TroubleshootMajorMonotone,
                            url: '/test',
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
                            label: 'FAQ',
                            url: '/faq'
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
                    background: '#357997',
                },
            },
            logo: {
                width: 124,
                topBarSource: '/images/logo.png',
                contextualSaveBarSource:
                    '/images/logo.png',
                url: '',
                accessibilityLabel: 'Secomapp',
            },
        };

        return (
            <div style={{height: '500px'}}>
                <AppProvider theme={theme}>
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
                                    url={"https://apps.shopify.com/json-ld-for-seo-1?#modal-show=ReviewListingModal"}>Leave
                                    a review</Button>
                            </Stack.Item>
                        </Stack>
                        <Layout.Section>
                            <FooterHelp>
                                Explore more apps from {" "}
                                <Link url="https://apps.shopify.com/partners/secomapp" external>
                                    Secomapp
                                </Link>
                                .
                            </FooterHelp>
                        </Layout.Section>
                        {toastMarkup}
                        {modalMarkup}

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

    sendMail = () => {

        this.setHeaderAxio();
        axios.post(window.Laravel.baseUrl + '/api/send-mail',{
            subject: this.state.supportSubject,
            message1: this.state.supportMessage,
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
