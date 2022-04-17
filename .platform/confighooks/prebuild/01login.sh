#!/bin/bash
USER=$(/opt/elasticbeanstalk/bin/get-config environment -k USER)
PASSWD=$(/opt/elasticbeanstalk/bin/get-config environment -k PASSWD)
docker login -u $USER -p $PASSWD          