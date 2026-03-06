<h1 align="center"> Self-hosting a website on a mobile phone
 </h1>

![License](https://img.shields.io/badge/License-MIT-yellow)
[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

This repository is a barebones set up for a website self-hosted on a mobile phone. In my case, I used a Huawei Mate 20 with 6 GB RAM and 128 GB storage capacity, did the initial setup on the phone before transitioning to editing the files using a laptop. I also wrote a [blog post](https://tangentialalmond.cc/posts/self-hosting-blog/) about what learnt that gives a background on my choice of tech stack.

## Table of contents
- [Table of contents](#table-of-contents)
- [Preview](#preview)
- [Hardware](#hardware)
- [Mobile phone set up](#mobile-phone-set-up)
  - [Set up Termux](#set-up-termux)
  - [Clone repo and install styling dependencies](#clone-repo-and-install-styling-dependencies)
  - [Configure your domain](#configure-your-domain)
  - [Launch the website](#launch-the-website)
- [Creating new posts](#creating-new-posts)
- [Optional: Connect your phone to your laptop via SSH](#optional-connect-your-phone-to-your-laptop-via-ssh)
  - [On your phone via Termux](#on-your-phone-via-termux)
  - [On your laptop/desktop via Terminal](#on-your-laptopdesktop-via-terminal)

## Preview
Here's a preview of the bare bones website:


## Hardware
In terms of hardware, you'll need:
- mobile phone
- optionally a laptop/desktop

The entire setup can be done on the mobile device; the laptop/desktop makes editing files easier.

## Mobile phone set up
### Set up Termux
1. Factory reset the mobile phone and uninstall any optional applications.
2. Install F-Droid.
3. Install "Termux Terminal emulator with packages" via F-Droid.
4. Huawei phones have an aggressive battery manager which can kill Termux and unintentionally disrupt your website. If you're using another device, look into whether your device has such Termux disruptors. For Huawei phones, check the following settings:
    - Go to _Settings > Battery > App Launch_. Toggle Termux to "Manage manually" and ensure all three toggles ("Auto launch", "Secondary launch", and "Run in background") are "ON".
    - Go to _Settings > Battery > More Battery Settings_ and enable "Stay connected when device sleeps".
5. Run the following command in Termux to wakelock it:
    ```bash
    termux-wake-lock
    ```
6. Install dependencies.
   ```bash
   pkg update -y && pkg upgrade -y
   pkg install git nodejs-lts hugo cloudflared -y
   ```

### Clone repo and install styling dependencies
1. Clone this git repo (which will create a new directory called "blog" with the files from this repo).
    ```bash
    git clone https://github.com/TangentialAlmond/phone-hugo-blog blog
    cd blog
    ```
2. Install dependencies for styling (Tailwind CSS + daisyUI).
    ```bash
    npm ci
    ```

### Configure your domain
1. Set up a CloudFlare account and purchase a domain name or use an auto-generated trial domain name (the free option).
2. Authenticate CloudFlare.
   ```bash
   cloudflared tunnel login
   ```
3. Create your tunnel.
    ```bash
    cloudflared tunnel create blog
    ```
4. Open (or create) your CloudFlare config file.
    ```bash
    nano ~/.cloudflared/config.yml
    ```                
5. Paste the following snippet in (replacing with your domain) to point to Hugo's local port (default `1313`):
   ```yaml
   ingress:
    - hostname: your-domain.com
      service: http://127.0.0.1:1313
    - service: http_status:404
   ```

### Launch the website
1. Run the launch script.
   ```bash
   bash scripts/launch.sh
   ```

You're ready to go! 👏

## Creating new posts
This repo uses **Archetypes** to automate metadata.
1. To create a new post with a pre-formatted slug and date, simply run:
    ```bash
   hugo new posts/my-new-post.md
   ```
2. A file will be created in `content/posts` with `draft: true`. Write the contents of your post in the file and set `draft: false` to make the file i.e. post go live.
3. If you've connected your phone to your laptop, you can `git push` the post:
   ```bash
   git push -u phone main
   ```
The post should appear. If it does not:
- check if `draft: true` has been set in the frontmatter of your post
- re-run the launch script on your phone by:
  - **Terminate the website:** Press "CTRL" and "C".
  - **Re-launch the website:** `bash scripts/launch.sh`

## Optional: Connect your phone to your laptop via SSH
Editing posts and/or the website can be challenging via Termux. To make these processes more comfortable, you can connect your phone to your laptop/desktop via SSH. This set up enables you to use your editor of choice on your laptop/desktop, where you can:
- set up your editor to tunnel to your phone
- use git to push/pull updates between your phone and laptop/desktop via [bare repo](#a-note-on-the-bare-repo)
- or other creative set ups!

### On your phone via Termux
1. Install openssh.
    ```bash
    pkg install openssh
    ```
2. Set a password by running the following command. You'll be prompted to type in a password twice. Remember this password as you'll need it to connect your phone to your laptop.
   ```bash
   passwd
   ```
3. Get your connection details:
    - **Username:** run `whoami` (which returns something like `u0_123`).
    - **IP address:** run `ifconfig`. Under `wlan0`, look for your `inet` address (e.g. `192.168.1.15`)
4. Start the server.
    ```bash
    sshd
    ```
### On your laptop/desktop via Terminal
1. Set up a SSH key (if you haven't already). Press enter twice to save the key in the default location (usually `/Users/{username}/.ssh/id_ed25519`) and skip the passphrase setup.
   ```bash
   ssh-keygen -t ed25519 -C "{your email address}"
   ```
2. Open (or create) your SSH config file.
    ```bash
    nano ~/.ssh.config
    ```
3. Paste the following snippet in (replacing the details with your phone's usename and IP address). You'll be prompted to input the password.
   ```text
   Host phone
        HostName {IP address}
        Post 8022
        User {username}
        IdentityFile ~/.ssh/id_ed25519
   ```
4. You can tunnel to your phone's Termux terminal directly by:
   ```bash
   ssh phone
   ```
5. To enable `git push` from your laptop to your phone, run the following in Termux:
   ```bash
   # Run in the cloned repo in your phone e.g. in the blog directory
   git config receive.denyCurrentBranch updateInstead
   ```