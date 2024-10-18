#!/bin/bash

# Get the PID of the current script
current_pid=$$

# Function to kill processes except for specified commands and its own PID
kill_except() {
    echo "Killing processes except for /bin/sh, /bin/bash, and bash..."

    # List processes, filter out exceptions, and collect valid PIDs
    pids=$(ps aux | awk -v current_pid="$current_pid" '
        $11 != "/bin/sh" && $11 != "/bin/bash" && $11 != "bash" && 
        $2 ~ /^[0-9]+$/ && $2 != current_pid {print $2}
    ')

    # Check if there are any PIDs to kill
    if [ -z "$pids" ]; then
        echo "No processes to kill."
    else
        # Iterate through the list of PIDs and try to kill them
        for pid in $pids; do
            if kill -TERM "$pid" 2>/dev/null; then
                echo "Terminated process with PID: $pid"
            else
                # Check if the process no longer exists
                if ps -p "$pid" > /dev/null; then
                    echo "Failed to terminate process with PID: $pid - No such process"
                fi
            fi
        done
    fi
}

# Execute the function
kill_except
