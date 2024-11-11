#!/bin/bash


current_pid=$$

kill_except() {
    echo "Killing processes except for /bin/sh, /bin/bash, and bash..."
    pids=$(ps aux | awk -v current_pid="$current_pid" '
        $11 != "/bin/sh" && $11 != "/bin/bash" && $11 != "bash" && 
        $2 ~ /^[0-9]+$/ && $2 != current_pid {print $2}
    ')
    if [ -z "$pids" ]; then
        echo "No processes to kill."
    else
        for pid in $pids; do
            if kill -TERM "$pid" 2>/dev/null; then
                echo "Terminated process with PID: $pid"
            else
                if ps -p "$pid" > /dev/null; then
                    echo "Failed to terminate process with PID: $pid - No such process"
                fi
            fi
        done
    fi
}

kill_except
