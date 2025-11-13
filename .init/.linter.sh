#!/bin/bash
cd /home/kavia/workspace/code-generation/mobile-optimized-widget-development-224167-224176/mobile_widget_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

