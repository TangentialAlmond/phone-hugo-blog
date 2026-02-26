<h1 align="center"> 📱 Self-hosting a website on a mobile phone 📱
 </h1>

![License](https://img.shields.io/badge/License-MIT-yellow)
[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

This repository is a barebones set up for a website self-hosted on a mobile phone.

## Hardware
In terms of hardware, you'll need:
- mobile phone
- optionally a laptop/desktop

The entire setup can be done on the mobile device; the laptop/desktop makes editing files easier. In my case, I used a Huawei Mate 20 with 6 GB RAM and 128 GB storage capacity, did the initial setup on the phone before transitioning to editing the files using a laptop (<span style="color:red">read about my experience here</span>).

## Software
### Set up Termux on your mobile phone
1. Factory reset the mobile phone and uninstall any optional applications.
2. Download F-Droid.
3. Download "Termux Terminal emulator with packages" via F-Droid.
4. Huawei phones have an aggressive battery manager which can kill Termux and unintentionally disrupt your website. If you're using another device, look into whether your device has such Termux disruptors. For Huawei phones, check the following settings:
    - Go to _Settings > Battery > App Launch_. Toggle Termux to "Manage manually" and ensure all three toggles ("Auto launch", "Secondary launch", and "Run in background") are "ON".
    - Go to _Settings > Battery > More Battery Settings_ and enable "Stay connected when device sleeps".
5. Run the following command in Termux to wakelock it:
    ```bash
    termux-wake-lock
    ```

### Set up this repo on your phone
1. Clone this git repo.
    ```bash
    git clone 
    ```
2. <span style="color:red">CONTINUE HERE WITH STEPS TO SET UP GIT REPO.</span>

### Optional: Connect your phone to your laptop via SSH
#### On your phone via Termux
1. Update and upgrade packages, and install openssh.
    ```bash
    pkg update -y && pkg upgrade -y
    pkg install openssh
    ```
2. Set a password by running the following command. You'll be prompted to type in a password twice. Remember this password as you'll need it to connect your phone to your laptop!
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
#### On your laptop/desktop via Terminal
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
4. Now you can access your phone's git repo remotely by:
   ```bash
   git remote add phone phone:~/repos/blog.git
   ```
   And you can tunnel to your phone's Termux terminal directly by:
   ```bash
   ssh phone
   ```