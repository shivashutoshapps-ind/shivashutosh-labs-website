#!/bin/bash

APP="/opt/apps/shivashutosh-labs"

# Explicitly trust the application directory for systemd git execution
GIT_CMD="git -c safe.directory=$APP"

cd "$APP" || exit 1

$GIT_CMD fetch origin master

LOCAL=$($GIT_CMD rev-parse HEAD)
REMOTE=$($GIT_CMD rev-parse origin/master)

if [ "$LOCAL" != "$REMOTE" ]; then
    $GIT_CMD reset --hard origin/master
    npm ci
    npm run build
    systemctl restart shivashutosh-labs.service
fi
