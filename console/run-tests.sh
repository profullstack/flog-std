#!/bin/sh

for file in test/*; do
  ../deps/flog/flog $file
done
