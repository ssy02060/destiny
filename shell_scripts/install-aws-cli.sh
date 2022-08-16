#!/bin/bash
cd ~
sudo apt update
sudo wget https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip
sudo apt install unzip
sudo unzip awscli-exe-linux-x86_64.zip
sudo ./aws/install
aws --version