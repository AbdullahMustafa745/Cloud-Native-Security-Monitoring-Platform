#!/bin/bash

# -------------------------------------------------------
# DoS Simulation Attack Script
# Sends continuous HTTP requests to simulate high traffic
# Used to test Prometheus alert detection
# -------------------------------------------------------

TARGET="http://<NODE-IP>:<NODEPORT>"

echo "Starting traffic simulation..."

while true; do
    curl -s $TARGET > /dev/null
done

