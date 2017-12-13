#!/usr/bin/env bash

npm publish --access=public && git push && echo -e "\n\n- - - don't forget to tag the release on github! - - -\n\n"
