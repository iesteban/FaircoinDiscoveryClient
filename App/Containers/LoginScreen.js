// @flow

import React from 'react'
import {
  Text,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import {
  Container,
  Content,
  Card,
  Body,
  Input,
  Form,
  Item,
  Label,
  Button
} from 'native-base'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import { Metrics } from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import CommonHeader from '../Components/CommonHeader'
import NamedLogo from '../Components/NamedLogo'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
}

class LoginScreen extends React.Component {

  props: LoginScreenProps

  state: {
    email: string,
    password: string,
    visibleHeight: number,
    topLogo: {
      width: number
    }
  }

  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: LoginScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    const { email, password } = this.state
    this.props.attemptLogin(email, password)
  }

  handleChangeEmail= (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { email, password } = this.state
    const { fetching } = this.props
    const editable = !fetching

    return (
      <Container>
        <CommonHeader title={I18n.t('Login')} />
        <Content padder>
          <Card>
            <NamedLogo />
            <Form>
              <Item floatingLabel>
                <Label>{I18n.t('email')}</Label>
                <Input
                  ref='email'
                  value={email}
                  editable={editable}
                  keyboardType='email-address'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this.handleChangeEmail}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={() => this.refs.password.focus()}
                />
              </Item>
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.email) ? this.props.error['email'][0] : ''}
              </Text>

              <Item floatingLabel>
                <Label>{I18n.t('Password')}</Label>
                <Input
                  ref='password'
                  value={password}
                  editable={editable}
                  keyboardType='default'
                  returnKeyType='go'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry
                  onChangeText={this.handleChangePassword}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={this.handlePressLogin}
                />
              </Item>
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.password) ? this.props.error['password'][0] : ''}
              </Text>

              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.non_field_errors) ? this.props.error['non_field_errors'][0] : ''}
              </Text>

              <Content>
                <Body>
                  <Button
                    transparent
                    info
                    onPress={NavigationActions.recoverPassword}
                    >
                    <Text>{I18n.t('Forgot password?')}</Text>
                  </Button>
                </Body>
              </Content>

              <Button
                block
                onPress={this.handlePressLogin}
                >
                <Text> {I18n.t('signIn')} </Text>
              </Button>

              <Button
                block
                light
                onPress={NavigationActions.pop}
                >
                <Text>{I18n.t('cancel')}</Text>
              </Button>
            </Form>
          </Card>
        </Content>
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password) => dispatch(LoginActions.loginRequest(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
