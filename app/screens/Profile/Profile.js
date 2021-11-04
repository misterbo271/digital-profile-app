// import React from 'react';
// import {CBContainer, CBText} from 'components';
// import {appStyles} from 'configs/styles';
//
// import Base from 'screens/Base';
//
// export default class Profile extends Base {
//
//     render() {
//         return (
//             <CBContainer style={{alignItems: 'center', justifyContent: 'center'}}>
//                 <CBText style={appStyles.text} define={'text'}>{'Profile'}</CBText>
//             </CBContainer>
//         );
//     }
// }
import React, { Component } from 'react'
import {
    Alert,
    Image,
    Linking,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native'
import CBHeader from 'components/CBHeader'
import CBListItem from 'components/CBListItem'
import {CBAvatar, CBImage} from "app/components";
import IdentifyIcon from './images/identifyIcon'
import {strings} from 'controls/i18n';
import {appStyles} from 'configs/styles'
import colors from 'configs/colors'
import {CBIcon} from "app/components";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            count: 1,
            type: '',
            showFormMailBox: false,
            showModalTks: false,
            isShowLoading: false
        }
    }

    //Luu y bien isSignIned
    componentDidMount() {
        if (this.props.isSignIned) {
            // this.props.membershipActions.getMembershipDetails()
        }
    }

    render() {
        const {isSignIned, membershipData, studentInfo, customer, registerType} = this.props
        let userInformation = {
            // identify: studentInfo.user_id,
            // fullName: studentInfo.fullname,
            // avatar: studentInfo.image
        }
        // if (registerType === 'GOOGLE') {
        //     userInformation = {
        //         identify: customer.email,
        //         fullName: customer.name ? customer.name : studentInfo.fullname || '',
        //         avatar: customer.avatar
        //     }
        // }

        return (
            <View style={appStyles.container_profile}>
                <CBHeader
                    titleStyle={{
                        color: '#ffffff',
                        fontSize: 18,
                        lineHeight: 24,
                        fontWeight: 'bold'
                    }}
                    title={strings('account')}
                    titleColor="#ffffff"
                    containerStyles={{ backgroundColor: colors.primaryColor, paddingBottom: 16 }}
                />
                <ScrollView style={{ flex: 1 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        // onPress={() => {
                        //     isSignIned ? this._goAccountInformationScreen(isSignIned) : this.props.navActions.goLoginScreen()
                        // }}
                    >
                    <View style={[appStyles.userInfo]}>
                            {/*// isSignIned*/}
                            {/*//     ? (*/}
                            <View style={appStyles.mid}>
                                <View style={appStyles.subrow}>
                                    <Text style={appStyles.fullName}>
                                        {/*{userInformation.fullName}*/}
                                        Miên PV
                                    </Text>
                                    <CBIcon type={'material-community'} name={'pencil'} size={18} color={colors.mediumBlue}/>
                                </View>

                                <View style={appStyles.subInformationContainer}>
                                    <IdentifyIcon/>
                                    {/*<Text style={appStyles.subInformation}>{userInformation.identify}</Text>*/}
                                    <Text style={appStyles.subInformation}>Thành viên Ưu tú</Text>
                                </View>
                            </View>
                            {/*// )*/}
                            {/*// : (*/}
                            {/*//     <View style={{ flex: 4 }}>*/}
                            {/*//         <Text style={{*/}
                            {/*//             fontSize: 20,*/}
                            {/*//             lineHeight: 28,*/}
                            {/*//             color: '#005596',*/}
                            {/*//             fontFamily: 'GoogleSans-Bold',*/}
                            {/*//             letterSpacing: -0.3*/}
                            {/*//         }}>{I18n.t('tickets.login_required')}</Text>*/}
                            {/*//         <View*/}
                            {/*//             style={styles.loginContainer}>*/}
                            {/*//             <TouchableOpacity*/}
                            {/*//                 onPress={() => this.props.navActions.goLoginScreen()}*/}
                            {/*//                 style={styles.button}*/}
                            {/*//             >*/}
                            {/*//                 <Text style={{ color: '#FA7D1E', fontSize: 14 }}>*/}
                            {/*//                     {I18n.t('LOGIN')}*/}
                            {/*//                 </Text>*/}
                            {/*//             </TouchableOpacity>*/}
                            {/*//         </View>*/}
                            {/*//     </View>*/}
                            {/*// )}*/}
                        {/*USER AVATAR*/}
                        <View style={{ flex: 0.5 }}>
                            {/*{isSignIned && userInformation.avatar*/}
                            {/*?*/}
                            {/*     <FastImage style={{ width: 72, height: 72, borderRadius: 18 }} source={{ uri: userInformation.avatar }}/>*/}
                                {/*:*/}
                            {/*<View style={appStyles.userInfoLeft}>*/}
                            {/*        <Icon name={'account'} size={60} color={colors.mediumBlue}/>*/}
                            {/*    </View>}*/}
                            <CBAvatar
                                size={81}
                                source={require('../../assets/images/avatar.png')}
                                containerStyle={{ borderRadius: 30}}
                            />
                        </View>
                    </View>
                    </TouchableOpacity>
                    <View style={[appStyles.ListItemContainer]}>
                        <View style={[appStyles.subListItem, { backgroundColor: colors.lightGreen }]}>
                          <CBListItem
                            titleColor={colors.green}
                            borderBottomColor={colors.lightBorder}
                            covidWarning
                            leftIcon="school-outline"
                            hasBorderBottom={false}
                            title={'Trường học của tôi'}
                            isSignIned={true}
                            // onPress={() => {
                            //   this._goRewardScreen(isSignIned)
                            // }}/>
                            />
                        </View>

                        {/*List2*/}
                        <View style={appStyles.subListItem}>
                            {/*{(isSignIned && membershipData != null)*/}
                            {/*  ?*/}
                            <CBListItem
                                borderBottomColor={colors.lightBorder}
                                hasBorderBottom={true}
                                title={'Bảng điểm'}
                                leftIcon='trophy-outline'
                                // description={description}
                                isSignIned={isSignIned}
                                // onPress={() => {
                                //   this._goMemberShipCardScreen(isSignIned)
                                // }}/>
                            />
                            {/*    : <ListItem*/}
                            {/*        borderBottomColor={appColors.lightBorder}*/}
                            {/*        hasBorderBottom={true}*/}
                            {/*        leftIcon='star-outline'*/}
                            {/*        title={I18n.t('member_point')}*/}
                            {/*        isSignIned={isSignIned}*/}
                            {/*        onPress={() => {*/}
                            {/*          this._goMemberShipCardScreen(isSignIned)*/}
                            {/*        }}/>*/}
                            {/*}*/}
                            <CBListItem
                                borderBottomColor={colors.lightBorder}
                                leftIcon='calendar-multiple'
                                hasBorderBottom={false}
                                title={'Thời khoá biểu'}
                                isSignIned={isSignIned}
                                // onPress={() => {
                                //   this._goLocationScreen(isSignIned)
                                // }}/>
                            />
                        </View>

                        {/*List 3*/}
                        <View style={appStyles.subListItem}>
                            <CBListItem
                                borderBottomColor={colors.lightBorder}
                                leftIcon='calendar-text'
                                hasBorderBottom={true}
                                title={'Lịch thi'}
                                isSignIned={isSignIned}
                                // onPress={() => {
                                //   this._goCardManagementScreen(isSignIned)
                                // }}/>
                            />
                            <CBListItem
                                borderBottomColor={colors.lightBorder}
                                leftIcon='key-star'
                                hasBorderBottom={false}
                                title={'Đăng ký dự thi & cấp chứng chỉ'}
                                isSignIned={isSignIned}
                                // onPress={() => {
                                //   this._goMyReviewScreen(isSignIned)
                                // }}/>
                            />
                        </View>

                        {/*List 4*/}

                        <View style={appStyles.subListItem}>
                            <CBListItem
                                leftIcon="cog-outline"
                                hasBorderBottom={false}
                                title={'Cài đặt'}
                                isSignIned={true}
                                // onPress={this._goSettingsScreen}
                                borderBottomColor={colors.lightBorder}
                            />
                            <CBListItem
                              hasBorderBottom={true}
                              leftIcon="help-circle-outline"
                              title={'Hỗ trợ & Góp ý'}
                              isSignIned={true}
                              // onPress={this._callHotline}
                              // hotline="1900 6027"
                              borderBottomColor={colors.lightBorder}
                              // description={'Từ 08h00 - 23h00 hằng ngày'}
                            />
                            {/*{isSignIned && (*/}
                                <CBListItem
                                    leftIcon="logout-variant"
                                    hasBorderBottom={false}
                                    title={'Đăng xuất'}
                                    isSignIned={true}
                                    // onPress={this._logOut}
                                    borderBottomColor={colors.lightBorder}
                                />
                            {/*// )}*/}
                        </View>

                    </View>
                </ScrollView>
            </View>
        )



    }
}
export default Profile




