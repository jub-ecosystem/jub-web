#!/bin/bash
readonly IMAGE_NAME=${1:-"nachocode/jub:ui-0.0.1a3-nightly"}

docker build -f ./Dockerfile -t "$IMAGE_NAME" .