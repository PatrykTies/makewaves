# Makewaves

React Native, AWS Amplify, push notifications, admin auth

# To start - use 3 separte terminals

npx react-native start
npm run ios
npm run android

## Android studio install guide

[android-studio](https://developer.android.com/studio/install)
Now add more packages in Android Studio by:
open studio -> welcome screen choose Configure (bottom right) -> dropdown select SDK Manager
tick latest stable Android SDK - eg. Pie
Now switch to tab SDK Tools:
tick Android Emulator, Android SDK Build Tools, Android SDK Tools, Google play services, Intel x86 Emulator...
Click Apply -> OK

## more installs for Android

```bash
brew install --cask adoptopenjdk/openjdk/adoptopenjdk8
```

## Update .bash or .zsh file for Android Studio

https://reactnative.dev/docs/environment-setup
dont forget to update .bash file from above guide,

in terminal:
echo $SHELL -> returns which profie file you have
vim ~/.zshrc -> press i to start adding, ESC , :wq to save/exit

just add those in :

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Android Emulator install guide

https://docs.expo.io/workflow/android-studio-emulator/

In Android Studio welcome screen click on Configure -> AVD Manager -> Create Virtual Device -> add one with Google Play Store enabled

## Start Android Emulator

Open Android studio -> AVD Manager -> press "play" button on emulator you want.

## Notes on running 2 emulators at once

Debugging can be enabled only from one emulator, otherwise you wont be able to have both open - one will error.

## Adding custom fonts

https://medium.com/@aravindmnair/add-custom-fonts-to-react-native-0-60-easily-in-3-steps-fcd71459f4c9

## License

[apache-2.0](https://choosealicense.com/licenses/apache-2.0/)

# Known issues

1.Fonts conflict with react-native-icons 2. Android read fonts in fontFamily from file name
iOS read fonts in fontFamily from font name, NOT A FILENAME
eg: Android -> fontFamily: 'SF-Pro-Display-Ultralight',
iOS -> fontFamily: 'SF Pro Display Ultralight',
This happen to only few fonts , it works OK for most fonts for both OS
https://dev.to/kennymark/using-custom-fonts-in-react-native-21j7
and
https://stackoverflow.com/questions/42410354/unrecognized-font-family-on-ios-simulator-with-react-native
