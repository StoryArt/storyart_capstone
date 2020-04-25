#!/bin/bash
./euraka-server/run.sh &
./user-service/run.sh &
./story-service/run.sh &
./api-gateway/run.sh &
./comment-service/run.sh

