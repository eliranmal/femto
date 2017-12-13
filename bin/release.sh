#!/usr/bin/env bash

npm publish --access=public && git push && git push --tags -f
