#!/bin/bash

if [ -e config.sh ]; then
  source ./config.sh
fi

$psql_exe -f sql/osm.railways.sql
$psql_exe -f sql/osm.railway.cross_way_nodes.sql
$psql_exe -f sql/osm.railway.crossings.sql -o results/railway.crossings.geojson
$psql_exe -f sql/osm.railway.islands.sql
$psql_exe -f sql/osm.railway.islands.main.sql -o results/railway.islands.main.geojson
$psql_exe -f sql/osm.railway.islands.service.sql -o results/railway.islands.service.geojson
$psql_exe -f sql/osm.railway.dead.ends.sql -o results/railway.dead.ends.geojson
$psql_exe -f sql/osm.railway.sharp.turns.sql -o results/railway.sharp.turns.geojson

exit 0
