FROM node:22-slim

RUN set -x \
  && apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y --no-install-recommends \
    git \
    vim \
    less \
    curl \
    jq \
    android-sdk \
    openjdk-17-jdk \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && npm i -g npm@latest \
  && npm i -g @google/gemini-cli

ENV LESSCHARSET=utf-8
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /usr/src/app
COPY ./profile.d/alias.sh /etc/profile.d

USER node
