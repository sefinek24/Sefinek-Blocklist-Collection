/^[0-9]/ {progress=$0; next}
/Content-Length:/ {size=$2; next}
/[^0-9]B\/s/ {speed=$2}
END {
  print progress
  print "Adres URL: " url
  print "Lokalizacja pliku: " location
  system("host " url " | grep -oE \"([0-9]{1,3}\\.){3}[0-9]{1,3}\"")
  print "Rozmiar pliku: " size
  print "Prędkość pobierania: " speed
}
