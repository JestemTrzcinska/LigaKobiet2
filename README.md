# LigaKobiet2
 
Developers setup

MacOS

cd app
npm install
sudo gem install cocoapods
cd ios && pod install && cd ../

if: xcrun: error: SDK "iphoneos" cannot be located
run: sudo xcode-select --switch /Applications/Xcode.app)
then: pod install

if: xcode-select: error: invalid developer directory '/Applications/Xcode.app'
do: install Xcode 
run: sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
do: accept Xcode licence
then: pod install

npm run ios


Android 

cd app
npm install 
 tbc.
npm run android