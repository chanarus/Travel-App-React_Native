#!/bin/bash

title() {
  CYAN='\033[0;36m'
  PURPLE='\033[0;35m'
  BLUE='\033[0;34m'
  NC='\033[0m' # No Color

  BOLD=$(tput bold)
  NORMAL=$(tput sgr0)

  TITLE=$@
  echo -e "${BLUE}${BOLD}${TITLE}${NORMAL}${NC}"
}

# delete watchman
delete_watchman() {
  title Deleting Watchman
  watchman watch-del-all
}

#delete temporary files
delete_temporary_files() {
  title Deleting temporary files
  rm -rf $TMPDIR/react-*
  rm -rf $TMPDIR/npm-*
  rm -rf $TMPDIR/haste-*
  rm -rf $TMPDIR/metro-*
}

# delete and reinstall node modules
reset_node_modules() {
  title Delete and install node modules
  rm -rf node_modules
  npm install
}

# delete and re-install CocoaPods, if any
reset_pods() {
  title Delete and re-install CocoaPods
  rm -rf ios/Pods
  cd ios
  pod cache clean --all
  pod repo update
  pod install
}

# clean native build folders (as seen above)
clean_builds() {
  title Clean native build foldersClean native build folders
  ./android/gradlew clean -p ./android/
  rm -rf ios/build
}


# clean iOS simulator files
clean_ios_simulator() {
  title Clean iOS simulator files
  rm -rf ~/Library/Developer/Xcode/DerivedData/Sprii-*
}

start_server() {
  title Starting...
  npm start -- --reset-cache
}

delete_watchman
echo -e "\n"
delete_temporary_files
echo -e "\n"
reset_node_modules
echo -e "\n"
reset_pods
echo -e "\n"
clean_builds
echo -e "\n"
clean_ios_simulator
echo -e "\n"
start_server