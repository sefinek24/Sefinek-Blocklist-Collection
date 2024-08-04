<!-- SEO DATA FOR BLOCKLIST.SEIFNEK.NET
* Title       : How to Install Unbound for Pi-hole: A Comprehensive Guide
* Description : Enhance the performance and security of your Pi-hole setup by installing Unbound, a powerful DNS resolver. Follow this step-by-step guide for seamless integration.
* Tags        : Pi-hole, Unbound, DNS resolver, DNS security, DNS encryption, cybersecurity, cyber-security, DNSSEC, open-source, performance optimization, secure DNS, installation guide, network security, DNS configuration, DNS-over-TLS, DNS-over-HTTPS, ad blocking, Raspberry Pi, DNS integrity
* Canonical   : /viewer/tutorials/How_to_install_Unbound_for_Pi-hole
-->

# 🤖 Boost Pi-hole Performance with Unbound DNS Resolver
If you're looking to boost the performance and security of your [Pi-hole](../info/What%20is%20Pi-hole.md) setup, installing Unbound is a great choice.

Unbound, a highly efficient DNS resolver, specializes in bolstering the security measures associated with domain-to-IP address translations.
Notably, it employs robust encryption protocols such as DNS-over-TLS and DNS-over-HTTPS, significantly enhancing the confidentiality and integrity of DNS queries.
Emphasizing DNSSEC (Domain Name System Security Extensions), Unbound authenticates and validates DNS data, mitigating risks related to DNS spoofing and tampering.
Its open-source nature fosters continual improvements and transparency within the cyber-security community, making it a reliable choice for enhancing the safety and reliability of domain-to-IP translations.

> For more details, refer to the [Unbound - Pi-hole documentation](https://docs.pi-hole.net/guides/dns/unbound).

## » Step 1: Prerequisites
### a) Before initiating the installation process, ensure you have the following:
- A Raspberry Pi or another device running Pi-hole
- Access to the terminal or SSH

### b) Update your system
Ensure your system is up-to-date by executing the following commands:
```bash
sudo apt update && sudo apt upgrade
```

## » Step 2 (optional): Remove unnecessary APT dependencies
Would you like to free up space on your hard drive? You can achieve this by running the following command, which will remove unnecessary dependencies.
```bash
sudo apt autoremove
```


## » [Step 2](https://docs.pi-hole.net/guides/dns/unbound/#setting-up-pi-hole-as-a-recursive-dns-server-solution): Install Unbound
To install Unbound, execute the following command:
```bash
sudo apt install unbound
```
After installation, you may likely encounter a startup error for the Unbound service. Ignore this.


## » Step 3: Download the current root hints file
```bash
wget https://www.internic.net/domain/named.root -qO- | sudo tee /var/lib/unbound/root.hints
```
Update it approximately every six months! Keep in mind that this file changes infrequently.

### Cron
If you're unable or unwilling to update this file regularly, you can add a new cron job.
1. Enter the command sudo `sudo crontab -e` to edit the crontab file. In this specific case, remember to prefix `crontab -e` with `sudo` to ensure the cron job has the necessary permissions.
2. Paste the new Cron job into the file:
   ```cronexp
   30 6 1 * * wget -qO- https://www.internic.net/domain/named.root | sudo tee /var/lib/unbound/root.hints >/dev/null 2>&1
   ```
   Remember to add a new line at the bottom of the file.
3. Save the file. To start from now on, your device will update the file automatically at <a href="https://crontab.guru/#30_6_1_*_*" target="_blank">06:30 every first day of the month</a>.


## » Step 4: Configure Unbound
1. With Unbound installed, you need to configure it to work with Pi-hole by running the following command:
   ```bash
   sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
   ```

2. Paste the following configuration into the file:
<details>
  <summary>Click here to show the content of the `conf` file</summary>

   ```yaml
   server:
      # If no logfile is specified, syslog is used
      # logfile: "/var/log/unbound/unbound.log"
      verbosity: 0

      interface: 127.0.0.1
      port: 5335
      do-ip4: yes
      do-udp: yes
      do-tcp: yes

      # May be set to yes if you have IPv6 connectivity
      do-ip6: no

      # You want to leave this to no unless you have *native* IPv6. With 6to4 and
      # Terredo tunnels your web browser should favor IPv4 for the same reasons
      prefer-ip6: no

      # Use this only when you downloaded the list of primary root servers!
      # If you use the default dns-root-data package, unbound will find it automatically
      root-hints: "/var/lib/unbound/root.hints"

      # Trust glue only if it is within the server's authority
      harden-glue: yes

      # Require DNSSEC data for trust-anchored zones, if such data is absent, the zone becomes BOGUS
      harden-dnssec-stripped: yes

      # Don't use Capitalization randomization as it known to cause DNSSEC issues sometimes
      # see https://discourse.pi-hole.net/t/unbound-stubby-or-dnscrypt-proxy/9378 for further details
      use-caps-for-id: no

      # Reduce EDNS reassembly buffer size.
      # IP fragmentation is unreliable on the Internet today, and can cause
      # transmission failures when large DNS messages are sent via UDP. Even
      # when fragmentation does work, it may not be secure; it is theoretically
      # possible to spoof parts of a fragmented DNS message, without easy
      # detection at the receiving end. Recently, there was an excellent study
      # >>> Defragmenting DNS - Determining the optimal maximum UDP response size for DNS <<<
      # by Axel Koolhaas, and Tjeerd Slokker (https://indico.dns-oarc.net/event/36/contributions/776)
      # in collaboration with NLnet Labs explored DNS using real world data from the
      # the RIPE Atlas probes and the researchers suggested different values for
      # IPv4 and IPv6 and in different scenarios. They advise that servers should
      # be configured to limit DNS messages sent over UDP to a size that will not
      # trigger fragmentation on typical network links. DNS servers can switch
      # from UDP to TCP when a DNS response is too big to fit in this limited
      # buffer size. This value has also been suggested in DNS Flag Day 2020.
      edns-buffer-size: 1232

      # Perform prefetching of close to expired message cache entries
      # This only applies to domains that have been frequently queried
      prefetch: yes

      # One thread should be sufficient, can be increased on beefy machines.
      # In reality for most users running on small networks or on a single machine, it should be unnecessary to seek performance enhancement by increasing num-threads above 1.
      num-threads: 1

      # Ensure kernel buffer is large enough to not lose messages in traffic spikes
      so-rcvbuf: 1m

      # Ensure privacy of local IP ranges
      private-address: 192.168.0.0/16
      private-address: 169.254.0.0/16
      private-address: 172.16.0.0/12
      private-address: 10.0.0.0/8
      private-address: fd00::/8
      private-address: fe80::/10
   ```
   </details>

## » Step 5: Restart Unbound
To apply the changes, restart Unbound by running the following commands:
```bash
sudo service unbound restart
```


## » Step 6: Test Unbound
Verify Unbound's functionality with the following command:
```bash
dig sefinek.net @127.0.0.1 -p 5335
```
Upon running the command, you should receive a response similar to:
```ini
; <<>> DiG 9.16.1-Ubuntu <<>> sefinek.net @127.0.0.1 -p 5335
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 6319
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;sefinek.net.                   IN      A

;; ANSWER SECTION:
sefinek.net.            255     IN      A       188.114.97.11
sefinek.net.            255     IN      A       188.114.96.11

;; Query time: 4 msec
;; SERVER: 127.0.0.1#5335(127.0.0.1)
;; WHEN: Sat Nov 25 06:21:25 CET 2023
;; MSG SIZE  rcvd: 72
```

This output indicates successful resolution of the `sefinek.net` domain to its corresponding IP addresses (`188.114.97.11` and `188.114.96.11`).
Confirming this result means Unbound is operating as expected.<br><br>
Yay! We've successfully obtained the IP address for [sefinek.net](https://sefinek.net)!


## » Step 6: Configure Pi-hole to use Unbound
1. Open the Pi-hole web interface in your browser.
2. Log in to the dashboard.
3. Navigate to Settings and then DNS.
4. Scroll down and append `127.0.0.1#5335` to the `Custom DNS servers field`.
5. Save & Apply


## » Step 7: Final tests
It's vital to ensure that everything is operating flawlessly.
You can verify the functionality of your DNS resolver by visiting https://d3ward.github.io/toolz/adblock.html. This tool helps test the effectiveness of your ad-blocking setup.

### 🎉 You have successfully installed Unbound for Pi-hole!