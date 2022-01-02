#  Faircoin Discovery App
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

This app is intended to be the base for many different alternative currencies, social currencies and marketplace apps.

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Change your App name. Replace `FaircoinDiscovery` by your currency name. Find and replace with your favorite editor. Or with the following commands:
  * `$ find . -type f  -exec sed -i 's/faircoindiscovery/bitcoinbazaar/g' {} \;`
  * `$ find . -type f  -exec sed -i 's/FaircoinDiscovery/BitcoinBazaar/g' {} \;`
  * `$ find . -type f  -exec sed -i 's/Faircoin Discovery/Bitcoin Bazaar/g' {} \;`


**Step 4:** Install the Application with `npm install`

**Step 5:** Generate ios and android folders with `react-native eject`

**Step 6:** Link the libraries with `react-native link`

**Step 7:** Now you are able to run the app with `react-native run-android`. For more info go to the next section: How to Run the App

**Step 8:** In order to make Location and Camera (among other services) to work you should replace the files inside ios and android folders by their copy in `BuildFiles`. Check out the `Readme.md` in that folder.  

## :arrow_forward: How to run the App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`



## :arrow_forward: Set your Icons
### Logo inside de app
Overwrite the files:
  - `App/Images/Images/top_logo.png`
  - `App/Images/top_logo@2x.png`
  - `App/Images/top_logo@3x.png`

### App Icon

  - You should have installed https://www.npmjs.com/package/react-native-icon
  - Check you have installed Imagemagick
  - Place a copy of your logo in: MyCurrency/icon.png
  - Run this command to create the app icons:
    - `$ ./node_modules/.bin/react-native-icon`.
  - Run the following commands to set up the logo inside the app:
    - `$ convert icon.png -resize 320x320 App/Images/top_logo.png`
    - `$ convert icon.png -resize 640x640 App/Images/top_logo@2x.png`  
    - `$ convert icon.png -resize 1280x1280 App/Images/top_logo@3x.png`


## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.


This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

## :open_file_folder: Related Articles
Ignite Documentation - [Ignite Wiki https://github.com/infinitered/ignite/wiki](https://github.com/infinitered/ignite/wiki)
