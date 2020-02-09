#!/bin/bash
cd /home/ubuntu/app/logistic/backend
node cronjob.js >> /home/ubuntu/app/logistic/backend/logs/cron.log

