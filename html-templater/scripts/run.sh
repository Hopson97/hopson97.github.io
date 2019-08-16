#!/bin/bash

if [ "$1" = "release" ]
then
    ./bin/release/html-templater 
else
    ./bin/debug/html-templater 
fi