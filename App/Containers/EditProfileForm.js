// @flow

import React from 'react'
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import {
  Content,
  Container,
  Card,
  CardItem,
  Input,
  Button,
  Text,
  Form,
  Item,
  Label
} from 'native-base'
import { connect } from 'react-redux'
import Styles from './Styles/EditProfileFormStyle'
import {Images, Metrics} from '../Themes'
import MapView from 'react-native-maps'
import UsersActions from '../Redux/UsersRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import ProfilePhotoUploader from './ProfilePhotoUploader'
import CommonHeader from '../Components/CommonHeader'
import UserContact from '../Components/UserContact'
import NamedLogo from '../Components/NamedLogo'
import AppConfig from '../Config/AppConfig'

type ProfilePostProps = {
  dispatch: () => any,
  uuid: string,
  attemptProfilePost: () => void,
  profile: Object
}

class EditProfileForm extends React.Component {
  props: ProfilePostProps

  state: {
    name: string,
    email: string,
    phone: string,
    telegramId: string,
    faircoinAddress: string,
    visibleHeight: number,
    uuid: string,
    latitude: float,
    longitude: float,
    formChanged: boolean,
    topLogo: {
      width: number
    },
  }

  isAttempting: boolean
  keyboardDidShowListener: Object
  keyboardDidHideListener: Object

  constructor (props: ProfilePostProps) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      telegramId: '',
      faircoinAddress: '',
      longitude: '',
      latitude: '',
      formChanged: false,
      visibleHeight: Metrics.screenHeight,
      uuid: null
    }
    this.isAttempting = false
  }

  assignProfileToState (profile) {
    this.state.name = profile.name
    this.state.email = profile.email
    this.state.phone = profile.phone
    this.state.telegramId = profile.telegram_id
    this.state.faircoinAddress = profile.faircoin_address
    this.state.uuid= profile.uuid
    this.state.longitude = parseFloat(profile.location.longitude)
    this.state.latitude = parseFloat(profile.location.latitude)
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468 or https://github.com/facebook/react-native/issues/14275
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)

    this.assignProfileToState(this.props.profile)
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

  handlePressPost = () => {
    var { name, email, phone, telegramId, faircoinAddress, longitude, latitude, uuid } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.setState({ formChanged: false})
    this.props.attemptProfilePost(name, email, phone, telegramId, faircoinAddress, longitude, latitude, uuid)
  }

  handleChangeName = (text) => {
    this.setState({ name: text, formChanged: true })
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text, formChanged: true })
  }

  handleChangePhone = (text) => {
    this.setState({ phone: text, formChanged: true })
  }

  handleChangeTelegramId= (text) => {
    this.setState({ telegramId: text, formChanged: true })
  }

  handleChangeFaircoinAddress = (text) => {
    this.setState({ faircoinAddress: text, formChanged: true })
  }

  handleChangeMap = (region) => {
    this.setState({ longitude: region.longitude, latitude: region.latitude, formChanged: true})
  }

  renderPublishButtonText (formChanged) {
    if (this.props.posting) {
      return (
        <Text style={Styles.buttonText}>{I18n.t('Publishing')}</Text>
      )
    } else if (formChanged) { 
      return (
        <Text style={Styles.buttonText}>{I18n.t('Publish')}</Text>
      )
    } else {
      return (
        <Text style={Styles.buttonText}>{I18n.t('Published')}</Text>
      )
    }
  }

  renderFaircoinAddressInput (faircoinAddress, editable) {
    if (AppConfig.FaircoinEnabled) {
    return (
      <Item floatingLabel>
        <Label>{I18n.t('Faircoin Address')}</Label>
        <Input
          ref='faircoinAddress'
          value={faircoinAddress}
          editable={editable}
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize='sentences'
          onChangeText={this.handleChangeFaircoinAddress}
          numberOfLines={8}
          underlineColorAndroid='transparent'
          onSubmitEditing={() => this.refs.phone.focus()}
          />
        <Text style={Styles.errorLabel}>
          { (this.props.error && this.props.error.faircoin_address) ? this.props.error['faircoin_address'][0] : ''}
        </Text>
      </Item>
    )
    } else {
      return (<Item />)
    }
  }

  render () {
    const {
      name,
      email,
      phone,
      telegramId,
      faircoinAddress,
      longitude,
      latitude,
      formChanged
    } = this.state
    const editable = !this.props.posting
    return (
      <Container>
        <CommonHeader title={I18n.t('Edit Profile')} />
        <Content padder>
          <Card>
            <NamedLogo />
            <ProfilePhotoUploader user={this.props.profile} />
            <Form>
              <Item floatingLabel>
                <Label>{I18n.t('Name')}</Label>
                <Input
                  ref='name'
                  value={name}
                  editable={editable}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='words'
                  autoCorrect={false}
                  onChangeText={this.handleChangeName}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={() => this.refs.email.focus()}
                  />
              </Item>
                <Text style={Styles.errorLabel}>
                  { (this.props.error && this.props.error.name) ? this.props.error['name'][0] : ''}
                </Text>

            <Item floatingLabel>
              <Label>{I18n.t('Email')}</Label>
              <Input
                ref='email'
                value={email}
                editable={editable}
                keyboardType='email-address'
                returnKeyType='next'
                autoCapitalize='sentences'
                autoCorrect
                onChangeText={this.handleChangeEmail}
                numberOfLines={8}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.telegramId.focus()}
                />
            </Item>
              <Text style={Styles.errorLabel}>
                { (this.props.error && this.props.error.email) ? this.props.error['email'][0] : ''}
              </Text>

          <Item floatingLabel>
            <Label>{I18n.t('Telegram Id')}</Label>
            <Input
              ref='telegramId'
              value={telegramId}
              editable={editable}
              keyboardType='email-address'
              returnKeyType='next'
              autoCapitalize='sentences'
              onChangeText={this.handleChangeTelegramId}
              numberOfLines={8}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.phone.focus()}
              />
          </Item>
            <Text style={Styles.errorLabel}>
              { (this.props.error && this.props.error.telegram_id) ? this.props.error['telegram_id'][0] : ''}
            </Text>

          <Item floatingLabel>
            <Label>{I18n.t('Phone')}</Label>
            <Input
              ref='phone'
              value={phone}
              editable={editable}
              keyboardType='phone-pad'
              returnKeyType='next'
              autoCorrect={false}
              onChangeText={this.handleChangePhone}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressPost}
              />
          </Item>
          <Text style={Styles.errorLabel}>
            { (this.props.error && this.props.error.phone) ? this.props.error['phone'][0] : ''}
          </Text>
          <Text style={Styles.errorLabel}>
            { (this.props.error && this.props.error.non_field_errors) ? this.props.error['non_field_errors'][0] : ''}
          </Text>

          {this.renderFaircoinAddressInput(faircoinAddress, editable)}

          <Content style={Styles.mapSection}>
            <Label>{I18n.t('Where do you offer your services:')}</Label>
            <MapView
              style={Styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.032,
                longitudeDelta: 0.031
              }}
              onRegionChangeComplete={this.handleChangeMap}
              >
              <MapView.Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude}}
                title={"title"}
                description={"description"}
              />
            </MapView>
          </Content>

          </Form>
          <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressPost}>
            <CardItem style={Styles.buttonCta}>
              {this.renderPublishButtonText(formChanged)}
            </CardItem>
          </TouchableOpacity>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.users.postError,
    profile: state.users.entities[state.login.user.uuid],
    posting: state.users.posting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptProfilePost:
      (name, email, phone, telegramId, faircoinAddress, longitude, latitude, uuid) => dispatch(
        UsersActions.profilePostRequest(
          name,
          email,
          phone,
          telegramId,
          faircoinAddress,
          longitude,
          latitude,
          uuid
        )
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm)
