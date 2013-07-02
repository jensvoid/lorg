## LORG
### A tool for advanced HTTPD logfile security analysis and forensics

Web server log files are the primary source of information to reconstruct the course of events if you got pwned due to vulnerable web applications. However, extracting the relevant information from huge files can be a difficult task. LORG is a tool aimed at security professionals and administrators to simplify the job of finding the 'needle in a haystack' (aka vulnerable web application) in a scenario of post-attack forensics. It aims to implement various state of the art approaches to detect attacks against web applications within HTTP traffic logs (e.g. Apache's `access_log`), including signature-based, statistical and machine learning techniques. Detected incidents are subsequently grouped into sessions which are classified as 'hand-crafted' or automated to distinguish whether the attacker is a man or a machine. In addition, geoIP- and DNSBL lookups can be performed to see if the attacks originate from a certain geolocation or botnet. Furthermore attacks can be quantified in terms of success or failure, based on anomalies within the size of HTTP responses, HTTP response codes or active replay of suspicious requests.

**Pre-alpha. Previously developed as [WebForensik](http://sourceforge.net/projects/webforensik/).**

### Getting started

Read the documentation in the [Wiki](https://github.com/jensvoid/lorg/wiki/).

### Usage
```
Usage: lorg [-i input_type] [-o output_type] [-d detect_mode]
            [-a add_vector] [-c client_ident] [-b dnsbl_type]
            [-q quantification] [-t threshold] [-v verbosity]
            [-n] [-u] [-h] [-g] [-p] input_file [output_file]

 -i allowed input formats: common combined vhost logio cookie
 -o allowed output formats: html json xml csv
 -d allowed detect modes: chars phpids mcshmm dnsbl geoip all
 -a additional attack vectors: path argnames cookie agent all
 -c allowed client identfiers: host session user logname all
 -b allowed dnsbl types: tor proxy zombie spam dialup all
 -q allowed quantification types: status bytes replay all
 -t threshold level as value from 0 to n (default: 10)
 -v verbosity level as value from 0 to 3 (default: 1)
 -n do not summarize results, output single incidents
 -u urldecode encoded requests (affects reports only)
 -h try to convert numerical addresses into hostnames
 -g enable geotargeting (separate files are needed!)
 -p perform a naive tamper detection test on logfile

```

### Additional Resources

* Presentation [2013]: [Web Application Forensics - Slides for a Talk at Hack in Paris 2013](https://github.com/jensvoid/lorg/tree/master/papers/2013-hip-conference-slides.pdf)
* Thesis [2012]: [Implementation of a Framework for Advanced HTTPD Logfile Security Analysis](https://github.com/jensvoid/lorg/tree/master/papers/2012-web-application-forensics.pdf)
* Project Description [2012, German]: [WebForensik - Forensische Analyse von Apache HTTPD Logfiles](https://github.com/jensvoid/lorg/tree/master/papers/2012-webforensik-german.pdf)
