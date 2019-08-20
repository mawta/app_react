import React from 'react';
import {
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
    defaultState = {
        emailFieldValue: 'dharma@jadedpixel.com',
        nameFieldValue: 'Jaded Pixel',
    };

    state = {
        showToast: false,
        isLoading: false,
        isDirty: false,
        userMenuOpen: false,
        showMobileNavigation: false,
        modalActive: false,
        storeName: this.defaultState.nameFieldValue,
        supportSubject: '',
        supportMessage: '',
        name: '',
        email: '',
    };

    componentDidMount() {
        axios.get(window.Laravel.baseUrl + '/api/index')
            .then(response => {
                console.log(window.Laravel.baseUrl + '/api/index');
                this.setState({
                    storeName: response.data.storeName,
                    name: response.data.name,
                    email: response.data.email,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    };

    render() {
        const {
            showToast,
            isLoading,
            isDirty,
            userMenuOpen,
            showMobileNavigation,
            modalActive,
            storeName,
            name,
            email,
        } = this.state;
        const toastMarkup = showToast ? (
            <Toast
                onDismiss={this.toggleState('showToast')}
                content="Changes saved"
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
        const titleNav = 'Hello ' + this.state.storeName;
        const navigationMarkup = (
            <Navigation location="/" userMenu={navigationUserMenuMarkup}>
                <Navigation.Section
                    title={titleNav}
                    items={[
                        {
                            label: 'Nice to meet you 😊 !',
                            url: 'secomapp.com',
                        }
                    ]}/>
                <Navigation.Section
                    separator
                    title="SEO Booster APP"
                    items={[
                        {
                            label: 'Home',
                            icon: HomeMajorMonotone,
                            url: '/',
                        },
                        {
                            label: 'Audit your store',
                            icon: ResourcesMajorMonotone,
                            url: '/audit'
                        },
                        {
                            label: 'Optimize',
                            icon: WandMajorMonotone,
                            url: '/optimize'
                        },
                        {
                            label: 'Test',
                            icon: TroubleshootMajorMonotone,
                            url: '/test'
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
                    onAction: this.toggleState('modalActive'),
                }}
            >
                <Modal.Section>
                    <FormLayout>
                        <TextField
                            label="Subject"
                            value={this.state.supportSubject}
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
                topBarSource:
                    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
                contextualSaveBarSource:
                    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
                url: 'http://jadedpixel.com',
                accessibilityLabel: 'Jaded Pixel',
            },
        };

        return (
            <div style={{height: '500px'}}>
                <AppProvider theme={theme}>
                    <Frame
                        topBar={topBarMarkup}
                        navigation={navigationMarkup}
                        showMobileNavigation={showMobileNavigation}
                        onNavigationDismiss={this.toggleState('showMobileNavigation')}
                    >
                        {loadingMarkup}
                        {this.props.children}
                        {toastMarkup}
                        {modalMarkup}
                    </Frame>
                </AppProvider>
            </div>
        );
    }

    toggleState = (key) => {
        return () => {
            this.setState((prevState) => ({[key]: !prevState[key]}));
        };
    };

    handleMessageChange = (supportMessage) => {
        this.setState({supportMessage});
    };
}
