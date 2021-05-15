#!/bin/sh

set -e

dest=$1

if [ ! -d "$dest" ]; then
	echo "Usage: $0 <firmware-data-dir>"
	exit 1
fi

rm -rf dist
npm run build

find dist -type f -name *legacy* | xargs -r rm
find dist -type f -name *map* | xargs -r rm
find dist -type f | xargs -rn 1 gzip

rm -rf $dest/webroot
mkdir $dest/webroot
cp -av dist/* $dest/webroot/

du -sh dist

