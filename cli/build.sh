#!/bin/bash
##################
# 打包
##################

# 开始执行git
git fetch --all 
LatestTag=$(git describe --tags `git rev-list --tags --max-count=1`)
echo $LatestTag
git checkout -b $LatestTag