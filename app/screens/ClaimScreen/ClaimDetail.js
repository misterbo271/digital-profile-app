import React from 'react';
import {CBAvatar, CBButton, CBContainer, CBScrollView, CBText, CBView} from 'components';
import CBControl from 'controls/CBControl';
import CBHandler from 'handlers/CBHandler';
import HTMLView from 'react-native-htmlview';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

import Base from 'screens/Base';
import dimens from "configs/dimens";
import {strings} from "controls/i18n";
import RootNavigation from "screens/RootNavigation";
import JsonUtil from "utils/JsonUtil";
import EventTracker from "controls/EventTracker";
import ClaimPopup from "screens/popup/ClaimPopup";

const claimData = require('../../assets/jsons/dataClaim.json')

export default class ClaimDetail extends Base {

    constructor(props) {
        super(props);
        this.claimPopup = React.createRef();
        this.state = {
            claim: null
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    load() {
        this.setState({
            claim: this.defaultParam?.claim || null
        })
    }

    fetchDetail = () => {
        const {claim} = this.state;

        // if (!claim?.isRead) {
        //     const api = new VXRUser();
        //     api.setReadclaim({id: claim?.id}, false, false).then(({status, data}) => {
        //         if (status === CBConstant.STATUS_OK) {
        //             CBSync.syncclaim();
        //             CBSync.syncUnreadclaim();
        //             CBSync.syncOSclaim();
        //         }
        //     }).catch((error) => {
        //         console.log('error -> ' + JSON.stringify(error));
        //     });
        // }

    };

    onClaimPopup = (item) => () => {
        this.claimPopup.current.show({
            claim: item,
            index: item,
        });
    };


    onLinkPress = (url) => {
        if (url && url.indexOf('http') > -1) {
            CBHandler.openUrl(url);
        } else if (url && url.length > 0) {
            const array = url.split('~');
            CBControl.navigateWith(array[0], array[1], array[2])
        } else {

        }
    };

    render() {
        const {theme} = this.context;
        const htmlStyles = helpers('html', theme.colors.scheme);
        const {claim} = this.state;
        //const obj = CBUtil.convertclaimType(claim?.type);
        return (
            <CBContainer>
                <CBScrollView
                    style={{flex: 1}}
                    contentContainerStyle={{padding: 15}}
                    showsVerticalScrollIndicator={false}>
                    <CBView style={[appStyles.row, {justifyContent: 'center'}]}>
                        <CBAvatar
                            size={240}
                            source={require('assets/images/claimava.jpeg')}
                            containerStyle={{ borderRadius: 30}}
                        />

                    </CBView>
                    <CBView style={{marginTop: 15, marginLeft: 25}}>
                        <CBText style={[appStyles.text, {fontSize: dimens.zettaLargeText, fontFamily: 'GoogleSans-Bold', color: theme.colors.primary}]} define={'none'}>
                            {claim?.action}
                        </CBText>
                        <CBView style={[appStyles.row, {marginTop: 20}]}>
                            <CBText style={[appStyles.text, {fontSize: dimens.largeText, color: theme.colors.grey0, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>
                                {'Issuer: '}
                            </CBText>
                            <CBText style={[appStyles.text, {fontSize: dimens.mediumText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>
                                { claim?.issuer}
                            </CBText>
                        </CBView>
                        <CBView style={{marginTop: 5}}>
                            <CBText style={[appStyles.text, {fontSize: dimens.largeText, color: theme.colors.grey0, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>
                                {'Description'}
                            </CBText>
                            <HTMLView
                                style={{marginTop: 10}}
                                stylesheet={htmlStyles}
                                textComponentProps={{style: htmlStyles.p}}
                                value={`<p>${claim?.description}</p>`}
                                onLinkPress={this.onLinkPress}
                            />
                        </CBView>
                        <CBView style={[appStyles.row, {marginTop: 5}]}>
                            <CBText style={[appStyles.text, {fontSize: dimens.largeText, color: theme.colors.grey0, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>
                                {'Time: '}
                            </CBText>
                            <CBText style={[appStyles.text, {textAlign: 'right'}]} define={'text'}>{'From: ' + claim?.from }</CBText>
                            <CBText style={[appStyles.text, {textAlign: 'right', marginLeft: 10}]} define={'text'}>{'To: ' + claim?.to }</CBText>
                        </CBView>
                    </CBView>
                </CBScrollView>
                <CBView style={[appStyles.footer, {justifyContent: 'center'}]} define={'footer'}>
                    <CBButton style={{marginTop: 10, width: (dimens.widthScreen / 3) * 1.5 }} title={'Share'} onPress={this.onClaimPopup(claim)}/>
                </CBView>
                <ClaimPopup ref={this.claimPopup}/>
            </CBContainer>
        );
    }
}
