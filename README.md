# Mobile Flashcards
## Final project for React Native course - Udacity React Nanodegree

### Project Description
Mobile flashcards app built for iOS using [React Native](https://facebook.github.io/react-native/), [create-react-native-app](https://github.com/react-community/create-react-native-app), and
[Expo](https://expo.io/).

The app allows users to set up decks of notecards with questions and answers. Users can add new
decks and add cards to existing decks. Users can also take quizzes where they test themselves with
each flippable card. The user marks each card as correct or incorrect. At the end of the quiz, the
user is shown a page with the percentage of questions answered correctly.



### Requirements
An iOS device running iOS 11 or a Mac running the iOS simulator.

For iOS device you will need to install [Expo's app from the App
Store](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8). See Expo [directions page](https://docs.expo.io/versions/latest/introduction/installation.html) for more
detailsi about the app. Direction about using the app to open the project are in Setup below.

For running on Mac, you will nee Xcode installed in order to use the iOS simulator. See [Xcode
site](https://developer.apple.com/xcode/) for details.

The app has been tested on a physical iPhone 6 device with iOS 11.03 installed. All functionality,
including notifications, function on the iPhone 6. The app has also been tested on simulators with
iOS 11 for iPhone SE, iPhone 6s, and iPhone 7 Plus, but the notification feature does not work
properly within the simulator (the simulator never returns ‘granted’ when you check for permissions).
If you click on the Notifications tab in the simulator, there will always be a loading spinner displayed.

### Setup

In the terminal, clone the project on to your machine.
```
git clone https://github.com/tmo345/reactnd-flashcards-project3.git
```
Change into directory.
```
cd reactnd-flashcards-project3
```

Install project dependencies.
```
yarn install
```

Create-react-native-app provides yarn start which starts the app in development mode.
```
yarn start
```
#### Using Expo App
A screen in the terminal will show a QR code which you can use the "Scan QR Code" option in the expo
app on the iOS device to scan. This will build the app and run it on the device.

#### Using iOS simulator on Mac
There is an option in the menu that yarn start opens, "i", which will attempt to open iOS simulator
and install the Expo app on it and automatically build the app. See "iOS simulator" section of [Expo
documentation](https://docs.expo.io/versions/latest/introduction/installation.html) for tips if you
run into problems.

