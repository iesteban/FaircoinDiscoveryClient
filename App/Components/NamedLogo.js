// @flow

import React from 'react'
import { TouchableOpacity,
  Image,
  Text,
} from 'react-native'
import {
  Content,
} from 'native-base'
import { Images } from '../Themes'
import AppConfig from '../Config/AppConfig'
import Styles from './Styles/NamedLogoStyle'

export default class FullButton extends React.Component {

  render () {
    return (
      <Content>
        <Image source={Images.logo} style={Styles.topLogo} />
        <Text style={Styles.textLogo}> {AppConfig.AppShortName} </Text>
      </Content>

    )
  }
}
