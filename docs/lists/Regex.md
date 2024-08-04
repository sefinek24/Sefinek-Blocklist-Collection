<h1 align="center">
    🔠 Regex filters provided by <a href="https://github.com/mmotti">MMotti</a>
</h1>

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
^mads\.
^pixels?[-.]
```

## 🤔 Explanation
<div align="center">
    <img src="../../images/regex/main/1.png" alt="1">
    <img src="../../images/regex/main/2.png" alt="2">
    <img src="../../images/regex/main/3.png" alt="3">
    <img src="../../images/regex/main/4.png" alt="4">
    <img src="../../images/regex/main/5.png" alt="5">
    <img src="../../images/regex/main/6.png" alt="6">
    <img src="../../images/regex/main/7.png" alt="7"><br>
    <img src="../../images/regex/main/8.png" alt="8"><br>
    <img src="../../images/regex/main/9.png" alt="9"><br>
    <img src="../../images/regex/main/10.png" alt="10"><br>
    <img src="../../images/regex/main/11.png" alt="11"><br>
    <img src="../../images/regex/main/12.png" alt="12">
</div>

## 🗑️ Removed regular expressions
1. `^count(ers?)?[0-9]*[_.-]` - This expression has been removed because it was blocking access to [counter-strike.net](https://www.counter-strike.net).
2. `^stat(s|istics)?[0-9]*[_.-]` - It is blocking access to [stats.uptimerobot.com](https://stats.uptimerobot.com)

## 🤔 Explanation
<div align="center">
    <img src="../../images/regex/removed/1.png" alt="Removed">
</div>

<h3 style="display: flex; justify-content: space-between;">
    <div align="left"><a href="../info/What%20is%20Regex.md">« Go back - Index.md</a></div>
    <div align="right"><a href="https://extendsclass.com/regex-tester.html">Online Regex tester and visualizer »</a></div>
    <!-- fuck this shit lol idk how to write this -->
</h3>
