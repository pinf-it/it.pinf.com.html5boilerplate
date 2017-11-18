#!/usr/bin/env bash.origin.script

depend {
    "git": "@com.github/bash-origin/bash.origin.gitscm#s1"
}

function EXPORTS_getJSRequirePath {
    echo "$__DIRNAME__/_#_org.bashorigin_#_s1.js"
}

function EXPORTS_copy_minimal_as_base {

    completePath="$__RT_DIRNAME__/complete"
    minimalPath="$__RT_DIRNAME__/minimal"

    CALL_git ensure_cloned_commit \
        "$completePath" \
        "git@github.com:h5bp/html5-boilerplate.git" \
        "v6.0.1"

    if [ ! -e "$minimalPath" ]; then
        rsync --recursive "$__DIRNAME__/minimal/" "$minimalPath/"
        rsync --ignore-existing --recursive "$completePath/dist/css/" "$minimalPath/css/"
    fi

    BO_log "$VERBOSE" "Copy '$minimalPath/' to '$(pwd)/'"

    rsync --ignore-existing --recursive "$minimalPath/" "$(pwd)/"
}
