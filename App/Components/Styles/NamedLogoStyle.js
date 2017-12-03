import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default {
  topLogo: {
    alignSelf: 'center',
    height: Metrics.images.namedLogo,
    resizeMode: 'contain'
  },
  textLogo: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.cta
  },

  ...ApplicationStyles.screen
}
