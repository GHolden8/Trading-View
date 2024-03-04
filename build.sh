#!/bin/bash
# Build script, linux edition
# Needless to say, this needs root

#!/bin/bash

# Function to extract JSON values
extract_json_value() {
    local json="$1"
    local key="$2"
    local result=$(echo "$json" | grep -o "\"$key\": *\"[^\"]*\"" | sed -E "s/\"$key\": *\"([^\"]*)\"/\1/")
    echo "$result"
}

JSONFILE=$PWD/DatabaseConnector/db_config.json

JSON=$(cat "$JSONFILE")

USER=$(extract_json_value "$JSON" "username")
PASS=$(extract_json_value "$JSON" "password")

sudo /etc/init.d/mysql start
sudo mysql -u$USER -p$PASS -e "$(cat $(find -name database_setup_script.sql))"

python3 -m pip install -r requirements.txt
python3 server.py --populate