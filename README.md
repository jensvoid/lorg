## LORG
### A tool for advanced HTTPD logfile security analysis.

Web server log files are the primary source of information to reconstruct the course of events when vulnerable web applications are exploited. However, extracting the relevant information from huge files can be a difficult task. LORG aims to implement various state of the art approaches to detect attacks against web applications within HTTP traffic logs (e.g. Apache's access_log), including signature-based, statistical and machine learning techniques. Detected incidents are subsequently classified into hand-crafted and automated to distinguish whether the attacker is a man or a machine. GeoIP- and DNSBL lookups can be performed to see if the attacks originate from a certain geolocation or botnet. Furthermore attacks can be quantified in terms of success or failure, based on anomalies within the size of HTTP responses, HTTP response codes or active replay of attacks.

**Pre-alpha. Previously developed as http://sourceforge.net/projects/webforensik/**

### USAGE
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

### DOCS

* Thesis [2012]: [Implementation of a Framework for Advanced HTTPD Logfile Security Analysis](https://github.com/jensvoid/lorg/tree/master/papers/2012-web-application-forensics.pdf)
* Project Description [2012, German]: [WebForensik - Forensische Analyse von Apache HTTPD Logfiles](https://github.com/jensvoid/lorg/tree/master/papers/2012-webforensik-german.pdf)
* Presentation [2013]: [Web Application Forensics - Slides for a Talk at Hack in Paris 2013](https://github.com/jensvoid/lorg/tree/master/papers/2013-hip-conference-slides.pdf)

### FAQ

**Q:** _What does LORG stand for?_  
**A:** Emm... 'Logfile Outlier Recognition and Gathering'. Also it is an old Irish word ([ˈl̪ˠɔɾˠə]) for trace, track, trail.

**Q:** _Why would anyone call a programm LORG?_  
**A:** Unfortunately all the other cool names had already been taken.

**Q:** _What is LORG all about?_  
**A:** It's a PHP-CLI programm that implements various detection techniques to automatically scan your HTTPD logfiles for attacks against web applications.

**Q:** _A CLI programm? Why in hell use PHP?_  
**A:** At the beginning it seemed a good idea, because PHPIDS could be easily integrated. Then things got bigger than expected...

**Q:** _What logfile formats are supported?_  
**A:** Out of the box, common, combined (Apache, nginx) and some other formats are supported. All mod_log_config (http://httpd.apache.org/docs/current/mod/mod_log_config.html) compatible formats like `'custom' => '%h %l %u %t \"%r\" %>s %b %{X-Forwarded-For}'` can be parsed, if correctly defined in `$allowed_input_types` in the code.

**Q:** _What about W3C-extended (IIS) log file formats?_  
**A:** Convert, using e.g. http://rebex.net/rconvlog/

**Q:** _How do i can various separate logfiles at once?_  
**A:** Merge, using e.g. http://code.google.com/p/logmerge. If you have several access.log.*.gz files, try something like `gunzip access.log.*.gz && cat access.log.* > merged.log`.

**Q:** _How to whitelist/exclude certain noisy clients (e.g. legimimate pentesting security scanners) from detection?_  
**A:** `grep -v` is your friend.

**Q:** _Why does the urldecode switch (`-u`) have no effect on detection results?_  
**A:** The `-u` switch only affects visualization (= output file). For detection, all HTTP requests are automatically url-decoded before processing.

**Q:** _Is it possible to output *all* incidents, including harmless ones?_  
**A:** Yes. Use `-t 0`.

**Q:** _How fast is LORG?_  
**A:** LORG's performance is primarily dependend on the selected detect mode (`-d`). While the 'chars' mode performs acceptable (about 50.000 loglines per minute), advanced learning algorithms like 'mcshmm' will take much longer (while beeing more accurate). To speed up processing, try to set `$only_check_webapps = true` in the code and do not use any additional attack vectors (`-a`) or DNS/DNSBL (`-h`, `-b`) lookups, as they can be performance killers.

**Q:** _How much memory does LORG require?_  
**A:** LORG was written with low memory in mind. Depending on the selected detection modes it might still require up to the size of the processed logfile in the worst case. If summarization is disabled (`-n`), LORG should not require more than 4MB of memory as all loglines are parsed, analyzed and directly written to the output file without caching.

**Q:** _Will it work on Windows?_  
**A:** No.


### KNOWN ISSUES

* To make the PHPIDS detection mode work, a symlink `IDS -> .` needs to be created in the `phpids/` folder
* Geotargeting is incompatible with the `php5-geoip` Debian/Ubuntu package
* When showing the results within an SIMILE Exhibit map, your web browser might hang if several thousand or more results are to be displayed
* And many, many more...
