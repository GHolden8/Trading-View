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

curdir=$PWD
cd ./REACTPlayground/stockbase

npm install
npm run build

cd $curdir

sudo /etc/init.d/mysql start
echo "Setting up database..."
sudo mysql -u$USER -p$PASS -e "source $(find -name database_setup_script.sql)"


echo "Database setup complete. Starting pip install..."
python3 -m pip install -r requirements.txt
echo "Requirements installed. Populating database..."
python3 server.py --populate --exitafter

echo "Build script complete. Run start_server.sh to start the server."