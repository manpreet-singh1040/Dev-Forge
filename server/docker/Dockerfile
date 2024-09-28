# Use the official Ubuntu base image
FROM ubuntu:latest

# Update the package list and install g++ in a single RUN command
RUN apt-get update && apt-get install -y g++ && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y git

