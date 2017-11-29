#  Android/iOS folders files

The goal of this repository is to hold the different files that will be overwrited by $react-native eject (which will recreate android and ios folders). 

The location of the files listed in this directory are:
* android/app/build.gradle
* android/app/src/main/AndroidManifest.xml
* ios/AlternativeCurrencyApp/Info.plist
* android/gradle.properties

## Android signing
Keep in mind that replacing android/app/build.gradle will ask you to have set up the different signing files for android. Check out this doc to sign your app: 
https://facebook.github.io/react-native/docs/signed-apk-android.html

In case you didn't want to sign your app now, you can go back by deleting the android folder and re-generating it again with `react-native eject` and `react-native link`

