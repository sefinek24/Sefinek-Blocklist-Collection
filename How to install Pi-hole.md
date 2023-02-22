# 🍒 How to install Pi-hole?
### 🔧 Step 1: Install Pi-hole
To use Pi-hole, you'll need to install it on your device. You can do this by following the instructions on the Pi-hole website: https://pi-hole.net.

### 🌐 Step 2: Configure Pi-hole
Once Pi-hole is installed, you'll need to configure it to work with your network. This involves setting Pi-hole as your DNS server. To do this, follow these steps:
1. Open your router's configuration page.
2. Look for the DNS settings and enter the IP address of your Pi-hole as the primary DNS server.
3. Save the settings and restart your router.

### 🛡️ Step 3: Block unwanted domains
Pi-hole comes with a pre-installed list of domains that are known to serve ads or track your activity. However, you can also add your own list of domains to block. To do this, follow these steps:
1. Log in to your Pi-hole admin console.
2. Click on "Group Management" and create a new group.
3. Click on "Tools" and select "Pi-hole's Blocklist" to add domains to your blocklist.

### 🔄 Step 4: Update Pi-hole
To keep Pi-hole up-to-date, you'll need to update it regularly. You can do this by following these steps:
1. Log in to your Pi-hole admin console.
2. Click on "Tools" and select "Update Pi-hole".
3. Follow the prompts to update Pi-hole to the latest version.

### 📊 Step 5: Monitor Pi-hole activity
Finally, it's important to monitor Pi-hole activity to ensure that it's working correctly. You can do this by logging in to your Pi-hole admin console and checking the dashboard for information on blocked domains and activity on your network.

### 📝 Conclusion
Using Pi-hole can be a great way to enhance online safety and protect your network from unwanted ads and malicious websites. By following these simple steps, you can set up Pi-hole on your device and start blocking unwanted domains today!

# 📌 Additional information
### 🌠 Main
- Pi-hole is a free and open-source DNS-based ad blocker that blocks ads and trackers at the network level.
- It can be installed on a variety of devices, including Raspberry Pi, Docker containers, and virtual machines.
- Pi-hole uses a variety of blocklists to block ads and trackers, including popular lists like AdBlock, EasyList, and AdAway.
- Pi-hole can also be used to block entire domains, rather than just individual ads or trackers.
- In addition to ad-blocking, Pi-hole also provides basic network-level malware protection.
- Pi-hole can be configured to work with a variety of devices, including smartphones, smart TVs, and gaming consoles.
- Pi-hole does not require any additional software or browser extensions to work.
- Pi-hole is not a replacement for a VPN or antivirus software, but it can be used in conjunction with them for added protection.

### 📶 Port Forwarding
If you are running Pi-hole on a device behind a router, you may need to set up port forwarding to ensure that Pi-hole can communicate with devices on your network. To do this, you'll need to log in to your router's configuration page and forward port 53 to the IP address of the device running Pi-hole.

### 🐧 Pi-hole on Linux
Pi-hole is designed to work on a variety of operating systems, including Linux. If you're running Linux, you can install Pi-hole using the command line. Simply open your terminal and follow the instructions on the Pi-hole website.

### 🚦 Testing Pi-hole
After setting up Pi-hole, you may want to test whether it's working correctly. To do this, you can use the Pi-hole "debug" tool, which will run a series of tests and provide feedback on any issues that it finds. You can access the debug tool from your Pi-hole admin console by clicking on "Tools" and selecting "Generate Debug Log".

### 🌍 Pi-hole and VPNs
If you use a virtual private network (VPN), you may need to configure Pi-hole to work with your VPN. This will involve setting up Pi-hole as your DNS server for the VPN connection. The steps for doing this will vary depending on the VPN software you're using, so be sure to check the documentation for your specific VPN.

### 📉 Pi-hole Performance
Pi-hole is designed to be lightweight and efficient, but its performance may be affected by factors such as the number of devices on your network and the complexity of the websites you're visiting. If you experience slow browsing or other issues, you may want to consider upgrading the hardware running Pi-hole or adjusting its settings to optimize performance.