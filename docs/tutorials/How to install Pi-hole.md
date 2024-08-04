<!-- SEO DATA FOR BLOCKLIST.SEIFNEK.NET
* Title       : Step-by-Step Guide: How to Install and Configure Pi-hole for your network
* Description : Discover the step-by-step process to install and configure Pi-hole, the open-source DNS-based ad blocker. Enhance online safety by blocking unwanted ads and trackers at the network level.
* Tags        : pi-hole, ad blocking, network-level security, internet privacy, open-source software, online advertising, malware protection, device compatibility, Raspberry Pi, Docker containers, cybersecurity tips, ad-blocker setup, DNS configuration, network monitoring, software updates, Unbound resolver, ufw firewall, SSH protocol, VPN integration, antivirus software, ad-blocker efficiency, performance optimization, website complexity, blocklists, EasyList, AdAway, DNS server configuration
* Canonical   : /viewer/tutorials/How_to_install_Pi-hole
-->

# 🍒 How to install and configure Pi-hole? Step by step
Pi-hole stands as a free and open-source DNS-based ad blocker that effectively bars ads and trackers at the network level.
Installing it on your device ensures heightened online safety by shielding against unwanted ads and malicious websites.
Let's delve into the step-by-step process of installing and configuring Pi-hole:

## 🔧 Step 0: Update your operating system
```bash
sudo apt update && sudo apt upgrade
```

## 🔧 Step 1: Install Pi-hole (One-Step Automated Installation)
Those who want to get started quickly and conveniently may install Pi-hole using the following command:
```bash
curl -sSL https://install.pi-hole.net | bash
```

## 🌐 Step 2: Configure
After installing Pi-hole, it's necessary to configure it to work with your network by setting it up as the DNS server.
Here are the steps to follow:
1. Open your router's configuration page.
2. Look for DNS settings and enter the Pi-hole IP address (192.168.X.XXX) as the primary DNS server.
3. Save the settings. In some cases, a restart of your router may be required. If you are using Windows, you can also execute the command `ipconfig /FLUSHDNS` in the command prompt.

## 🛡️ Step 3: Block unwanted domains (important)
Pi-hole comes with a pre-installed list of domains known to display ads or track user activity.
However, you can also add a custom list of domains to block. Here's how:
1. Log in to your Pi-hole admin console.
2. Click on `Adlists`.
3. Add new URL addresses from [this list](../lists/md/Pi-hole.md) or generate your own list using [🍒 Pi-hole Blocklist customization (recommended)](https://sefinek.net/blocklist-generator/pihole).

## 🔄 Step 4: Ensure you have the latest version of Pi-hole (recommended)
To keep Pi-hole up to date, it needs regular updates. Here's how to do it:
1. Open the terminal and connect to your server using the SSH protocol.
2. Execute the following command: `pihole -up`

## 🛡️ Step 6: Additional Security Measures (recommended)
### a) Install the Unbound resolver
Click [here](./How%20to%20install%20Unbound%20for%20Pi-hole.md) to learn how to do it.

### b) Enable ufw firewall if possible
1. Execute the following command to do so:
    ```bash
    sudo ufw allow
    ```
2. Open ports for `SSH [22]`, `HTTP [80]`, `HTTPS [443] for the new Pi-hole 6 version` & `DNS [53]`:
    ```bash
    sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 53
    ```
3. Check the firewall status:
    ```bash
    sudo ufw status
    ```
4. Verify that everything is working correctly. Visit the Pi-hole dashboard and check if you can log in via SSH.

## 📊 Step 7: Monitor Pi-hole activity
To ensure Pi-hole is functioning correctly, it's important to monitor its activity. Here's how to do it:
1. Log in to the Pi-hole admin console.
2. Check the dashboard for information on blocked domains and activity on your network.

## 📝 Conclusion
By following these straightforward steps, you can set up Pi-hole on your device and begin blocking unwanted domains today!
Pi-hole is versatile, compatible with various devices like Raspberry Pi, Docker containers, and virtual machines.
Offering fundamental network-level ad-blocking and malware protection, it's adaptable to multiple devices such as smartphones, smart TVs, and gaming consoles.

It's crucial to remember that while Pi-hole enhances security, it isn't a substitute for a VPN or antivirus software.
Nonetheless, when used alongside them, it provides an extra layer of protection.

In summary, Pi-hole is an effective and free ad-blocking solution that can enhance your online privacy and security. Try it out today!


## ❌ With what will Pi-hole and similar software not work?
1. Cloudflare Warp - https://1.1.1.1


## 📌 Additional information
### 🌠 General
- Pi-hole utilizes various blocklists, including well-known ones like EasyList, and AdAway, to effectively block ads and trackers.
- It can block entire domains rather than singular ads or trackers, enhancing its efficiency.
- Pi-hole functions independently without the need for extra software or browser extensions.

### 🐧 Installing Pi-hole on Linux
Pi-hole is compatible with various operating systems, including Linux, and can be installed through the command line.

### 🚦 Testing Pi-hole
After installation, verify Pi-hole's functionality using the "debug" tool available in the admin console. Access it by navigating to `Tools` and selecting `Generate Debug Log`.

### 🌍 Pi-hole and VPNs
To integrate Pi-hole with a virtual private network (VPN), configure Pi-hole as the DNS server for the VPN connection.
The configuration steps will vary based on your VPN software; refer to your VPN's documentation for guidance.

### 📉 Pi-hole Performance
While Pi-hole is designed to be resource-efficient, its performance can still be affected by factors like network device quantity and website complexity.
Consider hardware upgrades or settings modifications to enhance Pi-hole's performance if encountering slow browsing or related issues.