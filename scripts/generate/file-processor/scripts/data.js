exports.CATEGORIES = [{
	title: 'Blocks websites dedicated to anime, manga, cosplay, vtubers, hentai, and other NSFW degeneracy',
	description: 'Active, inactive, and parked domains. Nekomimi, otaku, shonen, yuri, yaoi, bishounen, ecchi, kawaii, tsundere, yandere, waifu, isekai, and other popular anime-related terms. Also blocks websites promoting or featuring explicit content, NSFW materials (hentai), and communities revolving around anime fan culture, including cosplayers and vtubers.',
	category: 'Anime',
	// grex "anime" "manga" "nekomimi" "nekomusume" "hentai" "vtuber" "cosplay" "otaku" "shonen" "shoujo" "yuri" "yaoi" "ecchi" "isekai" "kawaii" "tsundere" "yandere" "yande.re" "waifu" "seinen" "doujinshi" "bishounen" "shojo" "chibi" "bishojo" "doujin" "seiyuu" "harem" "meido" "lolicon" "fudanshi" "kuudere" "genki" "lightnovel" "wotaku" "gawr-gura" "mori-calliope" "inugami-korone" "usada-pekora" "shirakami-fubuki" "houshou-marine" "ninomae-inanis" "amelia-watson" "kizuna-ai" "nyanners" "ironmouse" "veibae" "projekt-melody" "tokino-sora" "sakura-miko" "takanashi-kiara" "watson-amelia" "akai-haato" "ayunda-risu" "moona-hoshinova" "pavolia-reine" "oozora-subaru" "roboco-san" "himemori-luna" "nekomiya-hinata" "nekoha-shizuku" "kureiji-ollie" "shylily" "selen-tatsuki"
	regex: /(?:s(?:hirakami\\-fub|elen\\-tats)uk|k(?:izuna\\-a|awai)|(?:doujins|ecc)h|fudansh|(?:hent|isek)a|chib|genk|y(?:ao|ur))i|(?:m(?:oona\\-hoshinov|ang)|nekomiya\\-hinat|himemori\\-lun|watson\\-ameli)a|(?:takanashi\\-kia|gawr\\-gu)ra|n(?:eko(?:ha\\-shizuku|mimi)|inomae\\-inanis|yanners)|inugami\\-korone|houshou\\-marine|p(?:rojekt\\-melody|avolia\\-reine)|(?:oozora\\-subar|ayunda\\-ris|seiyu|waif)u|(?:amelia\\-watso|(?:bishoun|s(?:ho|ei)n)e|lolico)n|(?:mori\\-calliop|kureiji\\-olli|nekomusum|ironmous|yande\.r|tsunder|yander|kuuder|veiba|anim)e|usada\\-pekora|(?:s(?:akura\\-mik|hou?j)|akai\\-haat|meid)o|tokino\\-sora|lightnovel|roboco\\-san|bishojo|(?:cospla|shylil)y|doujin|vtuber|w?otaku|harem/i,
	file: 'anime/main.txt',
}, {
	title: 'Blocks most LGBTQ+ websites, including those that promote or oppose LGBTQ+ content',
	description: 'Active, inactive, and parked domains. Some of them may also share pornographic content.',
	category: 'LGBTQ+',
	// grex "lgbt" "pride" "gay" "geje" "gejowski" "lesbian" "lesbijka" "lesbijki" "lesbijek" "lesbijska" "bisexual" "biseksualny" "biseksualna" "biseksualni" "transgender" "transseksualista" "transseksualistka" "transowa" "transseksualny" "transseksualna" "transexual" "transsexual" "transexual" "transowy" "tranzytowy" "nonbinary" "niebinarny" "niebinarna" "asexual" "aseksualny" "aseksualna" "aseksualni" "pansexual" "panseksualny" "panseksualna" "aromantic" "aromantyczny" "aromantyczna" "aromantyczni" "demisexual" "demiseksualny" "demiseksualna" "cisgender" "cispłciowy" "cispłciowa" "genderfluid" "genderqueer" "queer" "queers" "lesbijka" "lesbijki" "aseksualny" "aseksualna" "interseksualny" "interseksualna" "interseksualni" "polyamory" "poliamoria" "poliamoryczny" "polysexual" "poliseksualny" "poliseksualna" "bigender" "dwupłciowy" "agender" "bezpłciowy" "two-spirit" "dwuduchowy" "allosexual" "alloseksualny" "alloseksualna" "alloromantic" "alloromantyczny" "alloromantyczna" "nonconforming" "niekonformistyczny" "niekonformistyczna" "pangender" "pangenderowy" "demiboy" "demichłopiec" "demigirl" "demidziewczyna" "intergender" "interplciowy" "multisexual" "multi-seksualny" "omnisexual" "omniseksualny" "queerplatonic" "queerplatoniczny" "skoliosexual" "skolioseksualny" "third-gender" "trzecia-plec" "xenogender" "ksenoplciowy" "graysexual" "demigender" "neutrois" "androgyne" "biromantic" "panromantic"
	regex: /(?:nie(?:konformistycz|binar)n|(?:alloromantycz|(?:(?:poli|(?:allo|pan))|demi)seksual)n|transseksualn)[ay]|t(?:r(?:ansseksualistk?a|zecia\\-plec)|wo\\-spirit)|(?:queerplatoni|poliamory)czny|multi\\-seksualny|skoliose(?:ksualny|xual)|(?:demidziewczyn|poliamori|lesbijsk)a|inter(?:seksualn[aiy]|gender)|queer(?:platonic)?|n(?:onconforming|eutrois)|omnise(?:ksualny|xual)|(?:a(?:llo)?romanti|panromanti|biromanti)c|demichłopiec|(?:(?:third\\-|(?:(?:trans|(?:bi|a))|cis))|xeno)gender|aromantyczn[aiy]|(?:pangenderow|interplciow|ksenoplciow|(?:dwuduch|tranzyt)ow|(?:dwu|bez)płciow|polyamor|nonbinar|demibo|ga)y|ge(?:nderfluid|j(?:owski|e))|genderqueer|(?:bi|a)seksualn[aiy]|(?:(?:(?:(?:trans|(?:(?:(?:(?:allo|pan)|demi)|a)|bi))|tran)|(?:gra|pol)y)|multi)sexual|cispłciow[ay]|demigender|pangender|androgyne|lesbi(?:j(?:ek|k[ai])|an)|transow[ay]|demigirl|queers|pride|lgbt/i,
	file: 'sites/lgbtqplus2.txt',
}, {
	title: 'Blocks websites related to gambling, betting, and casinos',
	description: 'Active, inactive, and parked domains. Includes websites related to online casinos, poker, sports betting, lottery, slot machines, blackjack, roulette, and other forms of gambling and betting activities.',
	category: 'Gambling',
	// grex "casino" "poker" "betting" "roulette" "blackjack" "slots" "gambling" "lottery" "jackpot" "craps" "bookmaker" "keno" "sweepstakes" "betonline" "scratchcards"
	regex: /s(?:cratchcard|(?:weepstake|lot))s|b(?:lackjack|ookmaker)|betonline|gambling|roulette|jackpot|lottery|betting|(?:casi|ke)no|craps|poker/i,
	file: 'gambling/sefinek.hosts2.txt',
}, {
	title: 'Blocks websites with adult content, pornography, and explicit material',
	description: 'Active, inactive, and parked domains. Includes websites featuring pornography, erotic material, camgirl platforms, escort services, BDSM communities, swingers, and other explicit content related to adult entertainment.',
	category: 'Adult',
	// grex "porn" "xxx" "nude" "sexual" "erotic" "bdsm" "voyeur" "camgirl" "escort" "prostitution" "stripclub" "lingerie" "adultsite" "adultcontent" "playboy" "hustler" "sexting" "pornstars" "adultchat" "erotism" "hardcoreporn" "hentai" "yuri" "yaoi" "ecchi" "tribbing" "pegging" "polyamory" "bdsmcommunity" "swingers" "kink"
	regex: /bdsmcommunity|prostitution|h(?:ardcoreporn|entai)|adult(?:c(?:onten|ha)t|site)|p(?:olyamor|laybo)y|pornstars|s(?:tripclub|wingers)|tribbing|(?:lingeri|nud)e|eroti(?:sm|c)|hustler|camgirl|(?:pegg|sext)ing|voyeur|sexual|escort|(?:ecch|y(?:ao|ur))i|bdsm|porn|kink|xxx/i,
	file: 'porn/sefinek.hosts2.txt',
}, {
	title: 'Blocks websites related to piracy, illegal downloads, torrents, and copyright infringement',
	description: 'Active, inactive, and parked domains. Includes websites offering illegal downloads, torrent files, cracked software, serial keys, hacking tools, and other content related to copyright infringement and piracy.',
	category: 'Piracy',
	// grex "torrent" "pirate" "crack" "warez" "keygen" "serial" "hacking" "illegaldownload" "hacktools" "illegalstream" "crackme" "piratebay"
	regex: /illegal(?:download|stream)|piratebay|hack(?:tools|ing)|crackme|torrent|pirate|keygen|serial|crack|warez/i,
	file: 'piracy/sefinek.hosts.txt',
}, {
	title: 'Blocks websites promoting racism, hate speech, and extremist ideologies',
	description: 'Active, inactive, and parked domains. Includes websites promoting racism, white supremacy, xenophobia, homophobia, antisemitism, islamophobia, and other forms of hate speech and extremist ideologies, such as neo-Nazism and fascism.',
	category: 'Hate Speech',
	// grex "racism" "nazi" "whitesupremacy" "whitenationalism" "antisemitism" "antiislam" "kukluxklan" "neonazi" "extremism" "radicalism" "hatespeech" "holocaustdenial" "xenophobia" "homophobia" "islamophobia" "antisemite" "fascism" "supremacy" "whitepride" "alt-right" "neonazism" "ethnonationalism"
	regex: /ethnonationalism|white(?:nationalism|supremacy|pride)|h(?:olocaustdenial|atespeech)|antisemitism|islamophobia|a(?:ntisemite|lt\\-right)|kukluxklan|radicalism|(?:hom|xen)ophobia|supremacy|(?:neonazis|antiisla)m|(?:extrem|(?:fas|ra)c)ism|neonazi|nazi/i,
	file: 'hate-and-junk/sefinek.hosts.txt',
}, {
	title: 'Blocks most sites related to e-sport',
	description: 'Active, inactive, and parked domains. Includes websites related to major e-sports tournaments, platforms for competitive gaming, and organizations such as ESL, FaceIT, The International, and Overwatch League.',
	category: 'E-Sport',
	// grex "esport" "e-sport" "the-international" "overwatch-league" "esl-pro-league" "intel-extreme" "blast-premier" "pgl-major" "pubg-global-championship" "fifae-world-cup" "faceit" "esea.net" "oleksandr-kostyliev" "nicolai-reedtz" "mathieu-herbaut" "nikola-kovac" "patrik-lindberg" "marcelo-david" "finn-andersen" "peter-rasmussen" "andreas-hojsleth" "gabriel-toledo" "olof-kajbjer" "michael-grzesiek" "lee-sang-hyeok" "danil-ishutin" "johan-sundstein" "tyson-ngo" "kyle-giersdorf" "kyle-jackson" "luka-perkovic" "rasmus-winther" "carl-martin-erik-larsson" "kenny-schrub" "christopher-alesund" "jesper-wecksell" "ladislav-kovacs" "challengermode" "sostronk" "gamersclub" "pvpro.com" "popflash.site"
	regex: /p(?:ubg\\-global\\-championship|atrik\\-lindberg|vpro\\.com)|(?:carl\\-martin\\-erik\\-larsso|(?:peter\\-rasmus|finn\\-ander)se|kyle\\-jackso)n|oleksandr\\-kostyliev|ch(?:ristopher\\-alesund|allengermode)|the\\-international|m(?:ichael\\-grzesiek|athieu\\-herbaut)|(?:overwatch\\-leagu|esl\\-pro\\-leagu|popflash\\.sit|intel\\-extrem)e|andreas\\-hojsleth|fifae\\-world\\-cup|l(?:adislav\\-kovacs|uka\\-perkovic)|j(?:esper\\-wecksell|ohan\\-sundstein)|gabriel\\-toledo|k(?:yle\\-giersdorf|enny\\-schrub)|nicolai\\-reedtz|(?:lee\\-sang\\-hyeo|sostron)k|rasmus\\-winther|marcelo\\-david|(?:blast\\-premi|olof\\-kajbj)er|danil\\-ishutin|nikola\\-kovac|gamersclub|tyson\\-ngo|pgl\\-major|(?:e(?:s(?:ea\\.ne|por)|\\-spor)|facei)t/i,
	// grex "finesport" "livesport" "thesport" "familjenesport" "simplesport" "cyclesport" "teamsport" "worldsport" "allsport" "realsport" "prosport" "schoolsport" "football" "basketball" "volleyball" "baseball" "athletics" "olympics" "marathon" "runningsport" "watersport" "motorsport" "outdoorsport"
	whitelist: /(?:f(?:amilje|i)n|liv|th)esport|(?:running|(?:outdo|mot)or|w(?:ater|orld)|team|(?:rea|al)l|pro)sport|s(?:chool|imple)sport|(?:bas(?:ket|e)|foot)ball|volleyball|cyclesport|athletics|marathon|olympics/i,
	file: 'sites/esport.txt',
}, {
	title: 'Blocks most social media platforms and related services (beta)',
	description: 'Active, inactive, and parked domains. Blocks websites such as Facebook, Instagram, Twitter, TikTok, and other social media platforms.',
	category: 'Social Media',
	// grex "facebook" "twitter" "instagram" "tiktok" "snapchat" "linkedin" "pinterest" "reddit" "tumblr"
	regex: /instagram|pinterest|facebook|linkedin|(?:snapcha|reddi)t|t(?:(?:witte|umbl)r|iktok)/i,
	file: 'sites/social-media.txt',
}, {
	title: 'Blocks streaming media platforms like YouTube, Netflix, Spotify, and others (beta)',
	description: 'Active, inactive, and parked domains. Blocks websites for video and audio streaming services such as YouTube, Netflix, Spotify, Disney+, Hulu, and Twitch.',
	category: 'Streaming Media',
	// grex "youtube" "netflix" "spotify" "disneyplus" "hulu" "twitch" "vimeo" "soundcloud" "hbo"
	regex: /s(?:oundcloud|potify)|disneyplus|netflix|youtube|twitch|vimeo|h(?:ulu|bo)/i,
	file: 'sites/streaming-media.txt',
}, {
	title: 'Blocks e-commerce websites and online shopping platforms (beta)',
	description: 'Active, inactive, and parked domains. Blocks online shopping websites like Amazon, eBay, AliExpress, Etsy, Wish, and others.',
	category: 'Shopping',
	// grex "amazon" "ebay" "aliexpress" "etsy" "wish" "shopify" "zalando" "ikea" "alibaba" "ebay-kleinanzeigen" "olx" "allegro"
	regex: /ebay\\-kleinanzeigen|a(?:li(?:express|baba)|mazon)|shopify|allegro|zalando|ebay|wish|ikea|etsy|olx/i,
	file: 'sites/shopping.txt',
}, {
	title: 'Blocks news websites and media outlets (beta)',
	description: 'Active, inactive, and parked domains. Blocks websites of popular news outlets such as CNN, BBC, Fox News, Al Jazeera, RT, and others.',
	category: 'News Media',
	// grex "foxnews" "aljazeera" "reuters" "nytimes" "washingtonpost" "thetimes" "bloomberg"
	regex: /washingtonpost|aljazeera|bloomberg|(?:thetime|(?:(?:foxnew|reuter)|nytime))s/i,
	file: 'sites/news-media.txt',
}, {
	title: 'Blocks productivity tools and collaboration platforms (beta)',
	description: 'Active, inactive, and parked domains. Blocks websites for productivity tools such as Google Docs, Office365, Slack, Zoom, Trello, Notion, and others.',
	category: 'Productivity',
	// grex "googledocs" "office365" "slack" "zoom" "trello" "notion" "asana" "microsoftteams" "dropbox" "confluence" "jira" "clickup"
	regex: /microsoftteams|c(?:onfluence|lickup)|googledocs|office365|dropbox|notion|trello|asana|slack|zoom|jira/i,
	file: 'sites/productivity.txt',
}];

exports.GLOBAL_WHITELIST = [];

exports.fileUrls = [
	// Misc
	{ url: 'https://raw.githubusercontent.com/shreshta-labs/newly-registered-domains/main/nrd-1w.csv', name: 'shreshta-labs_nrd-1w.txt' },
	{ url: 'https://github.com/spaze/domains/raw/main/tld-cz.txt', name: 'spaze_tld-cz.txt' },

	// xRuffKez
	{ url: 'https://raw.githubusercontent.com/xRuffKez/NRD/main/nrd-30day_part1.txt', name: 'xRuffKez_nrd-30day-part1.txt' },
	{ url: 'https://raw.githubusercontent.com/xRuffKez/NRD/main/nrd-30day_part2.txt', name: 'xRuffKez_nrd-30day-part2.txt' },

	// whoisds
	{ url: 'https://whoisds.com/whois-database/newly-registered-domains/MjAyNC0wOC0xMi56aXA=/nrd', name: 'whoisds1.zip' },
	{ url: 'https://whoisds.com/whois-database/newly-registered-domains/MjAyNC0wOC0xMS56aXA=/nrd', name: 'whoisds2.zip' },
	{ url: 'https://whoisds.com/whois-database/newly-registered-domains/MjAyNC0wOC0xMC56aXA=/nrd', name: 'whoisds3.zip' },
	{ url: 'https://whoisds.com/whois-database/newly-registered-domains/MjAyNC0wOC0wOS56aXA=/nrd', name: 'whoisds4.zip' },

	// tb0hdan
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/generic_lgbt/domain2multi-lgbt00.txt.xz', name: 'tb0hdan_generic-lgbt.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/generic_gay/domain2multi-gay00.txt.xz', name: 'tb0hdan_generic-gay.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de00.txt.xz', name: 'tb0hdan_d2m-de00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de01.txt.xz', name: 'tb0hdan_d2m-de01.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de02.txt.xz', name: 'tb0hdan_d2m-de02.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de03.txt.xz', name: 'tb0hdan_d2m-de03.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de04.txt.xz', name: 'tb0hdan_d2m-de04.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de05.txt.xz', name: 'tb0hdan_d2m-de05.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de06.txt.xz', name: 'tb0hdan_d2m-de06.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/germany/domain2multi-de07.txt.xz', name: 'tb0hdan_d2m-de07.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/poland/domain2multi-pl00.txt.xz', name: 'tb0hdan_d2m-pl00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/poland/domain2multi-pl01.txt.xz', name: 'tb0hdan_d2m-pl01.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/poland/domain2multi-pl02.txt.xz', name: 'tb0hdan_d2m-pl02.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/united_states/domain2multi-us00.txt.xz', name: 'tb0hdan_d2m-us00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/united_kingdom/domain2multi-uk00.txt.xz', name: 'tb0hdan_d2m-uk00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/united_kingdom/domain2multi-uk01.txt.xz', name: 'tb0hdan_d2m-uk01.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/united_kingdom/domain2multi-uk02.txt.xz', name: 'tb0hdan_d2m-uk02.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/venezuela/domain2multi-ve00.txt.xz', name: 'tb0hdan_d2m-ve00.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/australia/domain2multi-au00.txt.xz', name: 'tb0hdan_d2m-au00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/australia/domain2multi-au01.txt.xz', name: 'tb0hdan_d2m-au01.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/australia/domain2multi-au02.txt.xz', name: 'tb0hdan_d2m-au02.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/austria/domain2multi-at00.txt.xz', name: 'tb0hdan_d2m-at00.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/south_africa/domain2multi-za00.txt.xz', name: 'tb0hdan_d2m-za00.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/canada/domain2multi-ca00.txt.xz', name: 'tb0hdan_d2m-ca00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/canada/domain2multi-ca01.txt.xz', name: 'tb0hdan_d2m-ca01.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/chile/domain2multi-cl00.txt.xz', name: 'tb0hdan_d2m-cl00.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/new_zealand/domain2multi-nz00.txt.xz', name: 'tb0hdan_d2m-nz00.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/philippines/domain2multi-ph00.txt.xz', name: 'tb0hdan_d2m-ph00.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/israel/domain2multi-il00.txt.xz', name: 'tb0hdan_d2m-il00.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/thailand/domain2multi-th00.txt.xz', name: 'tb0hdan_d2m-th00.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/brazil/domain2multi-br00.txt.xz', name: 'tb0hdan_d2m-br00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/brazil/domain2multi-br01.txt.xz', name: 'tb0hdan_d2m-br01.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/brazil/domain2multi-br02.txt.xz', name: 'tb0hdan_d2m-br02.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/brazil/domain2multi-br03.txt.xz', name: 'tb0hdan_d2m-br03.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/sweden/domain2multi-se00.txt.xz', name: 'tb0hdan_d2m-se00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/sweden/domain2multi-se01.txt.xz', name: 'tb0hdan_d2m-se01.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/spain/domain2multi-es00.txt.xz', name: 'tb0hdan_d2m-es00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/spain/domain2multi-es01.txt.xz', name: 'tb0hdan_d2m-es01.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/france/domain2multi-fr00.txt.xz', name: 'tb0hdan_d2m-fr00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/france/domain2multi-fr01.txt.xz', name: 'tb0hdan_d2m-fr01.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/france/domain2multi-fr02.txt.xz', name: 'tb0hdan_d2m-fr02.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/france/domain2multi-fr03.txt.xz', name: 'tb0hdan_d2m-fr03.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/netherlands/domain2multi-nl00.txt.xz', name: 'tb0hdan_d2m-nl00.xz' },
	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/netherlands/domain2multi-nl01.txt.xz', name: 'tb0hdan_d2m-nl01.xz' },

	{ url: 'https://github.com/tb0hdan/domains/raw/master/data/iceland/domain2multi-is00.txt.xz', name: 'tb0hdan_d2m-is00.xz' },
];