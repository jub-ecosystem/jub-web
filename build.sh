#!/bin/bash
readonly IMAGE_NAME=${1:-"nachcode/jub:ui-0.0.1a0"}

docker build -f ./Dockerfile -t "$IMAGE_NAME" .