LORG - A tool for advanced HTTPD logfile security analysis. Pre-alpha.
Previously developed as http://sourceforge.net/projects/webforensik/

--------------------------------------- FAQ ---------------------------------------

Q: What does LORG stand for?
A: Emm... 'Logfile Outlier Recognition and Gathering'. Also it's an old Irish word ([ˈl̪ˠɔɾˠə]) for trace, track, trail.

Q: Why would anyone call a programm LORG?
A: All the other cool names had already been taken.

Q: What is LORG all about?
A: It's a PHP-CLI programm that implements various detection techniques to automatically scan your HTTPD logfiles for attacks against web applications.

Q: A CLI programm? Why in hell PHP?
A: At the beginning it seemes a good idea to easily integrate PHPIDS.

Q: What logfile formats are supported?
A: Out of the box, common, combined (Apache, nginx) and some more are supported. Other mod_log_config[1]-compatible formats can be easily defined by editing $allowed_input_types in the code.

Q: What about W3C-extended/IIS log file formats?
A: Convert, using e.g. http://rebex.net/rconvlog/

Q: I have many seperate logfiles to scan!
A: Merge, using e.g. http://code.google.com/p/logmerge. If you have several access.log.n.gz files, try e.g. `gunzip access.log.*.gz && cat access.* > merged.log'.

Q: I want to exclude certain noisy clients (e.g. security scanners) from detection. How to do that?
A: Pre-process to logfile using grep/sed/awk.

Q: How to anonymize logs?
A: Pre-process to logfile using grep/sed/awk (on Remote-User, Remote-Logname, IP address, ...).

Q: Why does the urldecode switch (-u) have no effect on detection results?
A: The -u switch only affects visualization in the output file. For detection, all HTTP requests are automatically url-decoded before processing.

Q: Is it possible to output *all* incidents (including harmless ones)?
A: Yes. Use `-t 0'.

Q: How fast is LORG?
A: LORG's performance is primarily dependend on the selected detect mode (-d). While mode 'chars' is pretty fast, 'mcshmm' might take more time (while beeing more accurate). Other performance killers are the use of additional attack vectors (-a) and DNS/DNSBL (-h, -b) lookups.

Q: How to speed it up?
A: Try setting `$only_check_webapps = true' in the code.

Q: How much memory does LORG require?
A: Depending on which detection modes are selected, LORG requires up to the size of the processed logfile.

Q: How to decrease memory usage?
A: Disable summarization (`-n').

Q: Will it work on Windows?
A: No.

--
[1] http://httpd.apache.org/docs/current/mod/mod_log_config.html

<<<<<<< HEAD

----------------------------------- KNOWN ISSUES ----------------------------------

* To make the PHPIDS detection module work, there needs to be a symlink IDS -> . in the phpids/ folder
* Geotargeting is incompatible with an Debian/Ubuntu package `php5-geoip' installation and then switched off automatically
* When showing the results within an SIMILE Exhibit map, your web browser might hang if more than several thousand results are to be displayed
* And many more...
