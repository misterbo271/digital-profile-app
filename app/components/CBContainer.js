import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, useColorScheme, View} from 'react-native';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBContainer = ({style, children, removeIOS = false, keyboardVerticalOffset = 0}) => {
    const scheme = useColorScheme();
    const containerStyle = helpers('container', scheme);
    const contentStyle = helpers('content', scheme);
    return (
        <SafeAreaView style={[appStyles.container, containerStyle]}>
            {!removeIOS && Platform.OS === 'ios' ? <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={keyboardVerticalOffset} behavior={'padding'}>
                <View style={[appStyles.content, style, contentStyle]}>
                    {children}
                </View>
            </KeyboardAvoidingView> :
            <View style={[appStyles.content, style, contentStyle]}>
                {children}
            </View>}
        </SafeAreaView>
    );
};

export default CBContainer;
