import React, {PureComponent} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, ThemeContext} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

export default class CBSearchBox extends PureComponent {

    static contextType = ThemeContext;

    static propTypes = {
        clearable: PropTypes.bool
    };

    static defaultProps = {
        clearable: true
    };

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            value: '',
            hasFocus: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value) {
            return {
                value: nextProps.value
            };
        }
        return null;
    }

    focus() {
        this.textInput.current.blur(); // Hot fix android 9.0
        this.textInput.current.focus();
    }

    blur() {
        this.textInput.current.blur();
    }

    onChangeText = (value) => {
        const {onChangeText} = this.props;
        if (onChangeText && typeof onChangeText === 'function') {
            onChangeText(value);
        }
    };

    onFocus = () => {
        this.setState({
            hasFocus: true
        }, () => {
            const {onFocus} = this.props;
            if (onFocus && typeof onFocus === 'function') {
                onFocus();
            }
        });
    };

    onBlur = () => {
        this.setState({
            hasFocus: false
        }, () => {
            const {onBlur} = this.props;
            if (onBlur && typeof onBlur === 'function') {
                onBlur();
            }
        });
    };

    onClear = () => {
        this.onChangeText('');
    };

    render() {
        const {theme} = this.context;
        const inputStyle = helpers('input', theme.colors.scheme);
        const {style, clearable} = this.props;
        const {value, hasFocus} = this.state;
        return (
            <View style={[appStyles.box, appStyles.lonely, appStyles.case, {borderColor: hasFocus ? theme.colors.primary : theme.colors.divider}, style]}>
                <Icon type={'ionicon'} style={{marginHorizontal: 10}} name={'search'} color={theme.colors.grey3} size={20}/>
                <TextInput
                    ref={this.textInput}
                    {...this.props}
                    style={[appStyles.input, appStyles.single, inputStyle]}
                    underlineColorAndroid={'transparent'}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    placeholderTextColor={theme.colors.grey3}
                    autoCapitalize={'none'}
                    value={value}
                    onChangeText={this.onChangeText}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}/>
                {value && value.length > 0 && clearable ? <TouchableOpacity style={appStyles.action} onPress={this.onClear}>
                    <Icon type={'ionicon'} name={'close-circle'} color={theme.colors.hide} size={20}/>
                </TouchableOpacity> : null}
            </View>
        );
    }
}
