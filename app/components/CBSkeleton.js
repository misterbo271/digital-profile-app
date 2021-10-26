import React, {useEffect} from 'react';
import {Animated, useColorScheme, View} from 'react-native';
import {helpers} from 'configs/themes';

const CBSkeleton = ({style, children, minOpacity = 0.3, maxOpacity = 1.0}) => {
    const opacity = new Animated.Value(0);
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);
    const scheme = useColorScheme();
    const skeletonColor = helpers('skeleton', scheme);
    return (
        <Animated.View
            style={[{
                opacity: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [maxOpacity, minOpacity]
                })
            }, style]}>
            {React.Children.map(children, (i, k) => <View key={k} style={[i.props.style, {backgroundColor: skeletonColor}]}/>)}
        </Animated.View>
    );
};

export default CBSkeleton;
