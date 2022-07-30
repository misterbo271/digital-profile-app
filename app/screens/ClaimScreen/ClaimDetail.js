import React from 'react';
import {CBAvatar, CBContainer, CBScrollView, CBText, CBView} from 'components';
import CBControl from 'controls/CBControl';
import CBHandler from 'handlers/CBHandler';
import HTMLView from 'react-native-htmlview';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

import Base from 'screens/Base';
import dimens from "configs/dimens";

const claimData = require('../../assets/jsons/dataClaim.json')

export default class ClaimDetail extends Base {

    constructor(props) {
        super(props);
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
                    <CBView style={[appStyles.row]}>
                        <CBAvatar
                            size={80}
                            source={require('assets/images/claimava.jpeg')}
                            containerStyle={{ borderRadius: 30}}
                        />
                        <CBView>
                            <CBText style={[appStyles.text, {marginLeft: 25, fontSize: dimens.largeText, fontFamily: 'GoogleSans-Bold', color: theme.colors.primary}]} define={'none'}>
                                {claim?.claimType}
                            </CBText>
                            <CBText style={[appStyles.text, {marginLeft: 25, marginTop: 5}]} define={'title'}>{'Title: '+ claim?.action}</CBText>
                            <CBText style={[appStyles.text, {marginLeft: 25, marginTop: 5}]} define={'title'}>{claim?.schema}</CBText>
                        </CBView>
                    </CBView>
                    <CBView style={[appStyles.row]}>
                        <CBText style={[appStyles.text, {marginTop: 15}]} define={'title'}>{'Issuer: '}</CBText>
                        <CBText style={[appStyles.text, {marginTop: 15}]} define={'title'}>{claim?.issuer}</CBText>
                    </CBView>
                    <HTMLView
                        style={{marginTop: 10}}
                        stylesheet={htmlStyles}
                        textComponentProps={{style: htmlStyles.p}}
                        value={`<p>${claim?.description}</p>`}
                        onLinkPress={this.onLinkPress}
                    />
                    <CBView style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <CBText style={[appStyles.text, {textAlign: 'right', marginTop: 10}]} define={'text'}>{'From: ' + claim?.from }</CBText>
                        <CBText style={[appStyles.text, {marginLeft: 10, textAlign: 'right', marginTop: 10}]} define={'text'}>{'To: ' + claim?.to}</CBText>
                    </CBView>
                </CBScrollView>
            </CBContainer>
        );
    }
}
