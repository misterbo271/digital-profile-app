import React, {Fragment} from 'react';
import {CBContainer, CBDivider, CBHeader, CBIcon, CBSearchBox, CBText, CBTouchableOpacity, CBView} from 'components';
import {appStyles} from 'configs/styles';

import Base from 'screens/Base';
import RootNavigation from "screens/RootNavigation";
import EventTracker from "controls/EventTracker";
import {ClaimItem, ClaimSkeleton} from "screens/manage/item/ClaimItem";
import {FlatList} from "react-native";
import {removeAlias} from "utils/LanguageUtil";
import {debounce} from "lodash";
import JsonUtil from "utils/JsonUtil";

const dataTest = [
    { "id": "1", "claimType" : "Student", "issuer": "Ho Chi Minh University of Technology", "schema": "https://www.google.com/", "action": "KeyScreen Added", "from": "2/9/2022", "to": "2/9/2023" , "description" :"Cryptocurrentcy Cerification Consortium (C4)"},
    { "id": "2", "claimType" : "Dev", "issuer": "Chainlink Foundation", "schema": "https://www.google.com/", "action": "KeyScreen Added", "from": "2/9/2022", "to": "2/9/2025" , "description" :"Top Quanlity Project Winner"},
    { "id": "3", "claimType" : "Project Manager", "issuer": "Apple Inc", "schema": "https://www.google.com/", "action": "KeyScreen Added", "from": "7/3/2018", "to": "present" , "description" :"Project Manager of Apple"},
]

export default class ClaimScreen extends Base {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            loading: false,
            refreshing: false
        };
    }

    componentDidMount() {
        super.componentDidMount();
        //this.notificationSubscription = DeviceEventEmitter.addListener('SYNC_NOTIFICATION', this.loadNotificationEvent);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        //this.notificationSubscription.remove();
    }

    onSearch = () => {
        this.setState({
            loading: false
        });
    };

    onSearchDebounce = debounce(this.onSearch, 600, {leading: false, trailing: true});

    onPress = (item) => () => {
        RootNavigation.navigate('ClaimDetail', {
            defaultParam: JsonUtil.buildDefaultParam({
                claim: item
            })
        });
        EventTracker.logEvent('screen_claim', {action: 'click_claim'});
    };

    onChangeText = (keyword) => {
        this.setState({
            loading: keyword.length > 0,
            keyword: keyword
        }, this.onSearchDebounce);
    };

    renderItem = ({item, index}) => {
        const {loading} = this.state;
        const ClaimComp = loading ? ClaimSkeleton : ClaimItem;
        return <ClaimComp key={index} index={index} claim={item} onPress={this.onPress(item)}/>;
    };


    renderTitle() {
        const {theme} = this.context;
        return (
            <CBView style={[appStyles.row, {flex: 1, marginLeft: 15, marginRight: 10}]} define={'none'}>
                <CBText style={[appStyles.heading, {fontFamily: 'GoogleSans-Bold'}]} define={'h1'} allowFontScaling={false} numberOfLines={1} ellipsizeMode={'tail'}>Claim</CBText>
            </CBView>
        );
    }

    renderLeftButton() {
        return <CBView style={{height: 1}} define={'none'}/>;
    }

    renderRightButton() {
        const {theme} = this.context;
        return (
            <Fragment>
                <CBTouchableOpacity style={[appStyles.action, {backgroundColor: theme.colors.hide, borderRadius: 20, marginRight: 5}]} define={'none'}>
                    <CBIcon type={'ionicon'} name={'funnel'} color={theme.colors.primary} define={'icon'} size={20}/>
                </CBTouchableOpacity>
                <CBTouchableOpacity style={[appStyles.action, {backgroundColor: theme.colors.hide, borderRadius: 20, marginRight: 15}]} define={'none'}>
                    <CBIcon type={'material'} name={'group-add'} color={theme.colors.primary} define={'icon'} size={28}/>
                </CBTouchableOpacity>
            </Fragment>
        );
    }


    renderSeparator = () => {
        return <CBView style={{height: 15}} define={'none'}/>;
    };

    keyExtractor = (item, index) => String(index);

    // onRefresh = () => {
    //     this.setState({
    //         refreshing: true
    //     });
    // };

    render() {
        const {loading, keyword} = this.state;
        const data = dataTest.filter(i => {
            const textClaimType = removeAlias(i?.claimType).toLowerCase();
            const alias = textClaimType.replace(/[^a-zA-Z0-9]/g, '');
            const pattern = removeAlias(keyword).toLowerCase();
            return textClaimType.indexOf(pattern) > -1 || alias.indexOf(pattern) > -1;
        });
        return (
            <CBContainer>
                <CBHeader style={{textAlign: 'left'}} title={this.renderTitle()} headerLeft={this.renderLeftButton()} headerRight={this.renderRightButton()}/>

                <CBView style={{flex: 1}} define={'none'}>
                    <CBSearchBox
                        style={{marginVertical: 15, marginHorizontal: 15}}
                        placeholder={'Search Claim'}
                        value={keyword}
                        maxLength={128}
                        onChangeText={this.onChangeText}
                    />
                    <CBView style={[appStyles.row, {marginLeft: 15, marginTop: 15}]} define={'none'}>
                        <CBText style={[appStyles.text, {fontFamily: 'GoogleSans-Bold'}]}>All Types</CBText>
                    </CBView>
                    <FlatList
                        style={{flex: 1}}
                        contentContainerStyle={{padding: 15}}
                        showsVerticalScrollIndicator={false}
                        keyboardDismissMode={'on-drag'}
                        keyboardShouldPersistTaps={'always'}
                        //refreshing={refreshing}
                        data={dataTest}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={this.keyExtractor}
                        //onRefresh={this.onRefresh}
                    />
                </CBView>
            </CBContainer>
        )
    }
}
