# lorg
## A tool for advanced HTTPD logfile security analysis. Pre-alpha.
Previously developed as http://sourceforge.net/projects/webforensik/

--------------------------------------- FAQ ---------------------------------------

Q: What does LORG stand for?
A: Emm... 'Logfile Outlier Recognition and Gathering'. Also it's an old Irish word ([ˈl̪ˠɔɾˠə]) for trace, track, trail.

Q: Why would anyone call a programm LORG?
A: Unfortunately all the other cool names had already been taken.

Q: What is LORG all about?
A: It's a PHP-CLI programm that implements various detection techniques to automatically scan your HTTPD logfiles for attacks against web applications.

Q: A CLI programm? Why in hell use PHP?
A: At the beginning it seemed a good idea, because PHPIDS could be easily integrated. Then things got bigger than expected...

Q: What logfile formats are supported?
A: Out of the box, common, combined (Apache, nginx) and some other formats are supported. All mod_log_config[1] compatible formats can be read, if defined in $allowed_input_types in the code.

Q: What about W3C-extended (IIS) log file formats?
A: Convert, using e.g. http://rebex.net/rconvlog/

Q: How do i can various separate logfiles at once?
A: Merge, using e.g. http://code.google.com/p/logmerge. If you have several access.log.*.gz files, try something like `gunzip access.log.*.gz && cat access.log.* > merged.log'.

Q: I want to exclude certain noisy clients (e.g. legimimate pentesting security scanners) from detection. How to do that?
A: `grep -v' is your friend.

Q: How to anonymize logs?
A: Pre-process the logfile using grep/sed/awk (on Remote-User, Remote-Logname, IP address, ...).

Q: Why does the urldecode switch (-u) have no effect on detection results?
A: The -u switch only affects visualization (= output file). For detection, all HTTP requests are automatically url-decoded before processing.

Q: Is it possible to output *all* incidents, including harmless ones?
A: Yes. Use `-t 0'.

Q: How fast is LORG?
A: LORG's performance is primarily dependend on the selected detect mode (-d). While mode 'chars' is pretty fast, 'mcshmm' might take more time (while beeing more accurate).

Q: How to speed it up?
A: Try setting `$only_check_webapps = true' in the code. Do not use any additional attack vectors (-a) or DNS/DNSBL (-h, -b) lookups, as they can be performance killers.

Q: How much memory does LORG require?
A: LORG was written with low memory in mind. Depending on the selected detection modes it might still require up to the size of the processed logfile. If summarization is disabled (`-n'), LORG should not require more than 4MB of memory as all loglines are parsed, analyzed and directly written to the output file without memcaching.

Q: Will it work on Windows?
A: No.

--
[1] http://httpd.apache.org/docs/current/mod/mod_log_config.html


----------------------------------- KNOWN ISSUES ----------------------------------

* To make the PHPIDS detection mode work, a symlink `IDS -> .' needs to be created in the phpids/ folder
* Geotargeting is incompatible with the `php5-geoip' Debian/Ubuntu package
* When showing the results within an SIMILE Exhibit map, your web browser might hang if several thousand or more results are to be displayed
* And many, many more...
