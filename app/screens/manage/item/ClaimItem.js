import React from 'react';
import {View} from 'react-native';
import {
    CBAvatar,
    CBIcon,
    CBShadow,
    CBSkeleton,
    CBText,
    CBTouchableOpacity,
    CBView
} from 'components';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {strings} from "controls/i18n";
import dimens from "configs/dimens";
import colors from "configs/colors";
import CBControl from "controls/CBControl";

const ClaimItem = React.memo(({index, claim, onPress, onPressPopup}) => {
    const {theme} = useTheme();
    // const {agent} = EmployeeStore;
    // const positions = employee?.type;
    // const isWorking = employee?.isWorking;
    // const agentList = agent?.find(i => i?.id === employee?.agentId);
    // const rolesData = employee?.account?.roles;
    // const isDefinedRoles = rolesData !== undefined;
    // const roleLength = isDefinedRoles ? rolesData.length : 0;
    // const roleItem = (isDefinedRoles && roleLength !== 0) ?  rolesData.map(i => i?.name) : null;
    // const operableScopesData = employee?.account?.operableScope;
    // const isLock = employee?.account?.is_prg_status === 3;
    // const isDefinedOperableScopes = operableScopesData !== undefined ;
    // const isNullOperableScopes = operableScopesData !== null;
    // const operableScopeLength = (isDefinedOperableScopes && isNullOperableScopes) ? operableScopesData?.length : 0;
    // const firstOperable = (operableScopeLength > 0) ? agent.find(i => i.id === operableScopesData[0].toString()) : null;
    //
    // const agentName = agentList?.name;
    // const roles = roleItem !== null ? roleItem.toString() : null;
    // const operableScopes = (operableScopeLength > 0) ? operableScopeLength === 1 ? firstOperable?.name : firstOperable?.name + `+ ${operableScopeLength - 1} khác` : strings('text_all_agents');

    return (
        <CBShadow key={index} style={{backgroundColor: theme.colors.background}}>
            <CBTouchableOpacity style={{padding: 15}} define={'none'}>
                <CBView key={index} define={'none'}>
                    <CBView style={[appStyles.item, {padding: 0}]} define={'none'}>
                        <CBView style={[appStyles.row]}>
                            <CBView>
                                <CBAvatar
                                    size={80}
                                    source={require('assets/images/claimava.jpeg')}
                                    containerStyle={{ borderRadius: 30}}
                                />
                            </CBView>
                            <CBView style={{marginLeft: 20}}>
                                <CBTouchableOpacity  define={'none'} onPress={onPress}>
                                    <CBText style={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'GoogleSans-Bold', color: theme.colors.primary}]} define={'none'}>
                                        {claim?.claimType}
                                    </CBText>
                                </CBTouchableOpacity>
                                <CBView style={{marginTop: 5}} define={'none'}>
                                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Bold'}]} define={'none'}>
                                        { claim?.description.length < 32 ? claim?.description : `${claim?.description.substring(0,31)}...`}
                                    </CBText>
                                </CBView>
                                <CBView style={[appStyles.row, {marginTop: 5}]} define={'none'}>
                                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText, color: theme.colors.grey0, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>
                                        {'Issuer: '}
                                    </CBText>
                                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>
                                        { claim?.issuer.length < 27 ? claim?.issuer : `${claim?.issuer.substring(0,26)}...`}
                                    </CBText>
                                </CBView>
                                <CBView style={[appStyles.row, {marginTop: 5}]} define={'none'}>
                                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>
                                        {'From: ' + claim?.from }
                                    </CBText>
                                    <CBText style={[appStyles.text, {marginLeft: 5, fontSize: dimens.mediumText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>
                                        {'To: ' + claim?.to}
                                    </CBText>
                                </CBView>
                            </CBView>
                            {/*<CBTouchableOpacity style={[appStyles.shadow, {marginRight: -15}]} onPress={onPressPopup}>*/}
                            {/*    <CBIcon type={'ionicon'} name={'ellipsis-vertical'} size={24}/>*/}
                            {/*</CBTouchableOpacity>*/}
                        </CBView>
                    </CBView>
                    {/*<CBView style={[appStyles.item, {padding: 0, marginTop: 10}]} define={'none'}>*/}
                    {/*    <CBView style={[appStyles.row]}>*/}
                    {/*        <CBView style={{flex: 1.3}} define={'none'}>*/}
                    {/*            <CBText style={[appStyles.text, {fontSize: dimens.normalText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>*/}
                    {/*                From*/}
                    {/*            </CBText>*/}
                    {/*        </CBView>*/}
                    {/*        <CBView style={{flex: 1}} define={'none'}>*/}
                    {/*            <CBText style={[appStyles.text, {fontSize: dimens.normalText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>*/}
                    {/*                To*/}
                    {/*            </CBText>*/}
                    {/*        </CBView>*/}
                    {/*    </CBView>*/}
                    {/*</CBView>*/}
                    {/*<CBView style={[appStyles.item, {padding: 0, marginTop: 10}]} define={'none'}>*/}
                    {/*    <CBView style={[appStyles.row]}>*/}
                    {/*        <CBView style={{flex: 1.3}} define={'none'}>*/}
                    {/*            <CBText style={[appStyles.text, {fontSize: dimens.normalText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>*/}
                    {/*                Description*/}
                    {/*            </CBText>*/}
                    {/*        </CBView>*/}
                    {/*        <CBView style={{flex: 1}} define={'none'}>*/}
                    {/*            <CBText style={[appStyles.text, {fontSize: dimens.normalText, color: theme.colors.grey1, fontFamily: 'GoogleSans-Medium'}]} define={'none'}>*/}
                    {/*                Expired Date*/}
                    {/*            </CBText>*/}
                    {/*        </CBView>*/}
                    {/*    </CBView>*/}
                    {/*</CBView>*/}
                    {/*<CBView style={[appStyles.item, {padding: 0, marginTop: 10}]} define={'none'}>*/}
                    {/*    <CBView style={[appStyles.mark, { backgroundColor: isWorking ? colors.ocean : colors.gray}]} define={'none'}>*/}
                    {/*        <CBText style={[appStyles.text, {color: isWorking ? theme.colors.primary : theme.colors.grey1}]} define={'none'}>*/}
                    {/*            {isWorking ? strings('text_is_working'): strings('text_not_work')}*/}
                    {/*        </CBText>*/}
                    {/*    </CBView>*/}
                    {/*</CBView>*/}
                </CBView>
            </CBTouchableOpacity>
        </CBShadow>
    );
});

const ClaimSkeleton = React.memo(({index}) => {
    const {theme} = useTheme();
    return (
        <CBShadow key={index} style={{backgroundColor: theme.colors.background}}>
            <CBSkeleton style={{padding: 15}}>
                <View style={{width: '25%', height: 10, borderRadius: 4, marginTop: 10}}/>
                <View style={{width: '50%', height: 10, borderRadius: 10, marginTop: 15}}/>
                <View style={{width: '80%', height: 8, borderRadius: 10, marginTop: 15}}/>
                <View style={{width: '80%', height: 8, borderRadius: 10, marginTop: 15}}/>
                <View style={{width: 30, height: 30, borderRadius: 15, position: 'absolute', top: 10, right: 50}}/>
            </CBSkeleton>
        </CBShadow>
    );
});

export {ClaimItem, ClaimSkeleton};
