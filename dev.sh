#!/usr/bin/env bash

activate() {
    osascript
        -e 'tell application "iTerm" to activate'
}

openTab() {
    osascript \
        -e 'tell application "System Events" to tell process "iTerm" to keystroke "t" using command down'
}

runCmd() {
    osascript \
        -e "tell application \"System Events\" to tell process \"iTerm\" to keystroke \"$1\"" \
        -e 'tell application "System Events" to tell process "iTerm" to key code 52'
}

appPath=/Users/hayden/MEGA/projects/tomato-tracker
runCmd "cd $appPath"  &&
wsd
openTab &&
runCmd "cd $appPath && node server.js"
openTab &&
runCmd "cd $appPath/client && yarn start"
