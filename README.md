# Cloud Skills Monitoring Server

[![build](https://github.com/Jennas-Lee/cloud-skills-monitoring-server/actions/workflows/main.yml/badge.svg)](https://github.com/Jennas-Lee/cloud-skills-monitoring-server/actions/workflows/main.yml)
[![License](https://img.shields.io/github/license/Jennas-Lee/cloud-skills-monitoring-server)](https://github.com/Jennas-Lee/cloud-skills-monitoring-server/blob/v0.0.1/LICENSE)
![Version](https://img.shields.io/github/package-json/v/Jennas-Lee/cloud-skills-monitoring-server)

- [Introduction](#introduction)
- [How to Use](#how-to-use)

# Introduction

This project is a server to monitor player's monitor.

# How to Use

## Create a Streaming Server

You can use docker-compose or run only streaming server.

### Use docker-compose with Client Web Server

[Check this document.](https://github.com/Jennas-Lee/cloud-skills-monitoring-client#use-docker-compose-with-streaming-server)

### Pull and Run Streaming Server Only

``` shell
docker pull ghcr.io/cloud-skills-monitoring-server:latest
docker run -itd \
    -p 1935:1935 \
    -p <PORT>:8000 \
    -v <RECORDED MEDIA DIRECTORY>:/media \
    ghcr.io/cloud-skills-monitoring-server:latest
```

## Set OBS Studio

![Turn on OBS Studio and Go to `Settings` Menu](docs/obs-1.png)

Turn on OBS Studio and Enter `Settings` Menu.

![Go to `Stream` Tab and Enter Server Settings](docs/obs-2.png)

Go to `Stream` Tab and Enter Server Settings.

`Service` : **Custom...**

`Server` : rtmp://**&lt;Your Streaming Server Address&gt;**/live

`Stream Key` : **&lt;Streaming Name What You Want&gt;** (ex. 101)

![Go to `Video` Tab and Enter Video Resolution Settings](docs/obs-3.png)

Go to `Video` Tab and Enter Video Resolution Settings

`Base (Canvas) Resolution` : **3840x1080**

`Output (Scaled) Resolution` : **3840x1080**

![Add two `Display Capture` Sources and Add Two Monitors](docs/obs-4.png)

Add two `Display Capture` Sources and Add Two Monitors.

![Click `Start Streaming`](docs/obs-5.png)

Click `Start Streaming`!