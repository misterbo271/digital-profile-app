import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppStore from 'stores/AppStore';
import {observer} from 'mobx-react';

//import AuthLoading from 'screens/AuthLoading';
import {UserStack} from 'screens/UserNavigator';

const Stack = createStackNavigator();
export const RootStack = observer(() => {
    const {mode} = AppStore;
    // if (mode === 'AuthLoading') {
    //     return (
    //         <Stack.Navigator initialRouteName={'AuthLoading'}>
    //             <Stack.Screen name={'AuthLoading'} component={AuthLoading} options={{headerShown: false}}/>
    //         </Stack.Navigator>
    //     );
    // } else if (mode === 'User') {
    // if (mode == 'User'){
    //     return <UserStack/>;
    // } else {
    //     return null;
    // }
    return <UserStack/>;
});


