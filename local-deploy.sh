#!/usr/bin/env bash

plist=tomato-tracker;

launchctl stop ~/Library/LaunchAgents/com.user.$plist.plist
launchctl unload -w ~/Library/LaunchAgents/com.user.$plist.plist
launchctl load -w ~/Library/LaunchAgents/com.user.$plist.plist
launchctl start -w ~/Library/LaunchAgents/com.user.$plist.plist
