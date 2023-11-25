# 🤖 How to Install Unbound for Pi-hole?
If you want to improve the performance and security of your [Pi-hole](../info/What%20is%20Pi-hole.md)
setup, you can install Unbound, a DNS resolver that provides more advanced features than the default DNS server used by Pi-hole.

> [Unbound - Pi-hole documentation](https://docs.pi-hole.net/guides/dns/unbound)

# ⭐ Prerequisites
Before you start the installation process, make sure you have:
- A Raspberry Pi or another device running Pi-hole
- Access to the terminal or SSH
- Basic knowledge of the command-line interface (CLI)

## » Step 1: Update Your System
Ensure your system is up-to-date by running the following commands:
```bash
sudo apt update
sudo apt upgrade
```

## » Step 2: Install Unbound
To install Unbound, run the following command:
```bash
sudo apt install unbound
```

## » Step 3: Configure Pi-hole to use Unbound
Next, you need to configure Pi-hole to use Unbound as its DNS resolver.
1. Open the Pi-hole configuration file by running the following command:
    ```bash
    sudo nano /etc/pihole/setupVars.conf
    ```
2. Find the line that starts with `PIHOLE_DNS_1=` and change the value to `127.0.0.1#5335`:
    ```yaml
    PIHOLE_DNS_1=127.0.0.1#5335
    ```
3. Save the changes and exit the editor by pressing `Ctrl+X`, then `Y`, and then `Enter`.

## » Step 4: Configure Unbound
1. With Unbound installed, you need to configure it to work with Pi-hole by running the following command:
    ```bash
    sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
    ```
2. Paste the following configuration into the file:
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
    #root-hints: "/var/lib/unbound/root.hints"

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
    # by Axel Koolhaas, and Tjeerd Slokker (https://indico.dns-oarc.net/event/36/contributions/776/)
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

    # One thread should be sufficient, can be increased on beefy machines. In reality for most users running on small networks or on a single machine, it should be unnecessary to seek performance enhancement by increasing num-threads above 1.
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

## » Step 5: Restart Unbound and Pi-hole
To apply the changes, restart Unbound and Pi-hole by running the following commands:
```bash
sudo service unbound restart
sudo service pihole-FTL restart
```

## » Step 6: Verify the Setup
To verify that Pi-hole is using Unbound as the DNS resolver, run the following command:
```bash
pihole -d
```

This command generates a debug log. Look for the following line in the log:
```yaml
[✓] DNS service is running
```
If you see this line, Pi-hole is using Unbound as the DNS resolver.

# 🎉 Congratulations!
You have successfully installed Unbound for Pi-hole.