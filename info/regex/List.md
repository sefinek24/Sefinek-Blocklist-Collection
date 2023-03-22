# 🔠 Regex filters provided by [MMotti](https://github.com/mmotti)

## 📋 Main regular expressions:
```regexp
^ad([sxv]?[0-9]*|system)[_.-]([^.[:space:]]+\.){1,}|[_.-]ad([sxv]?[0-9]*|system)[_.-]
^(.+[_.-])?adse?rv(er?|ice)?s?[0-9]*[_.-]
^(.+[_.-])?telemetry[_.-]
^adim(age|g)s?[0-9]*[_.-]
^adtrack(er|ing)?[0-9]*[_.-]
^advert(s|is(ing|ements?))?[0-9]*[_.-]
^aff(iliat(es?|ion))?[_.-]
^analytics?[_.-]
^banners?[_.-]
^beacons?[0-9]*[_.-]
^count(ers?)?[0-9]*[_.-]
^mads\.
^pixels?[-.]
^stat(s|istics)?[0-9]*[_.-]
```


## 🗑️ Removed regular expressions:
1. `^count(ers?)?[0-9]*[_.-]` - This expression has been removed because it was blocking access to [counter-strike.net](https://www.counter-strike.net).

<h3>
    <a href="../../README.md">« Go to main page</a>
</h3>