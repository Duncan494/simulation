#!/bin/bash

cd /srv/http/sim.alexjameswright.net
sudo -u http git fetch
sudo -u http git reset --hard origin/master
sudo -u http gulp -f gulp/gulpfile.js --cwd .