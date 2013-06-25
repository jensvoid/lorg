## LORG
### A tool for advanced HTTPD logfile security analysis.
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
**A:** Out of the box, common, combined (Apache, nginx) and some other formats are supported. All mod_log_config (http://httpd.apache.org/docs/current/mod/mod_log_config.html) compatible formats can be read, if defined in $allowed_input_types in the code.

**Q:** _What about W3C-extended (IIS) log file formats?_  
**A:** Convert, using e.g. http://rebex.net/rconvlog/

**Q:** _How do i can various separate logfiles at once?_  
**A:** Merge, using e.g. http://code.google.com/p/logmerge. If you have several access.log.*.gz files, try something like `gunzip access.log.*.gz && cat access.log.* > merged.log`.

**Q:** _I want to exclude certain noisy clients (e.g. legimimate pentesting security scanners) from detection. How to do that?_  
**A:** `grep -v` is your friend.

**Q:** _How to anonymize logs?_  
**A:** Pre-process the logfile using grep/sed/awk (on Remote-User, Remote-Logname, IP address, ...).

**Q:** _Why does the urldecode switch (`-u`) have no effect on detection results?_  
**A:** The `-u` switch only affects visualization (= output file). For detection, all HTTP requests are automatically url-decoded before processing.

**Q:** _Is it possible to output *all* incidents, including harmless ones?_  
**A:** Yes. Use `-t 0`.

**Q:** _How fast is LORG?_  
**A:** LORG's performance is primarily dependend on the selected detect mode (`-d`). While mode 'chars' is pretty fast, 'mcshmm' might take more time (while beeing more accurate).

**Q:** _How to speed it up?_  
**A:** Try setting `$only_check_webapps = true` in the code. Do not use any additional attack vectors (`-a`) or DNS/DNSBL (`-h`, `-b`) lookups, as they can be performance killers.

**Q:** _How much memory does LORG require?_  
**A:** LORG was written with low memory in mind. Depending on the selected detection modes it might still require up to the size of the processed logfile. If summarization is disabled (`-n`), LORG should not require more than 4MB of memory as all loglines are parsed, analyzed and directly written to the output file without memcaching.

**Q:** _Will it work on Windows?_  
**A:** No.


### KNOWN ISSUES

* To make the PHPIDS detection mode work, a symlink `IDS -> .` needs to be created in the phpids/ folder
* Geotargeting is incompatible with the 'php5-geoip' Debian/Ubuntu package
* When showing the results within an SIMILE Exhibit map, your web browser might hang if several thousand or more results are to be displayed
* And many, many more...
