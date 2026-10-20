/* Svenska: Väjningsregler och företräde */
SV.q({
  'priority-01': {
    q: 'Du (DU) kör rakt fram i en korsning utan vägmärken, trafiksignaler eller vägmarkeringar. Bil B kommer från höger och kör också rakt fram. Vem kör först?',
    options: [
      'Du kör först, eftersom du kör rakt fram',
      'Bil B kör först',
      'Den som kommer först till korsningen',
    ],
    explain: 'I en omärkt korsning gäller högerregeln: du har väjningsplikt mot fordon som kommer från höger. B kommer från höger, så B kör först.',
  },
  'priority-02': {
    q: 'Omärkt korsning. Du kör rakt fram. Bil B kommer från vänster och kör också rakt fram. Vem har väjningsplikt?',
    options: [
      'Du har väjningsplikt mot B',
      'B har väjningsplikt mot dig',
      'Ingen behöver väja när båda kör rakt fram',
    ],
    explain: 'Du kommer från höger sett från B, så enligt högerregeln har B väjningsplikt mot dig. Du ska ändå köra försiktigt och kontrollera att B verkligen stannar.',
  },
  'priority-03': {
    q: 'Du följer vägen rakt fram. En mindre väg ansluter från höger och det finns inga vägmärken. Bil B kommer ut från sidovägen och svänger vänster. Vem har väjningsplikt?',
    options: [
      'Du har väjningsplikt mot B',
      'B har väjningsplikt, eftersom den kommer från en mindre väg',
      'B har väjningsplikt, eftersom den svänger',
    ],
    explain: 'I Sverige finns ingen särskild regel för T-korsningar eller "större" vägar. Utan vägmärken gäller högerregeln, och B kommer från höger, så du väjer.',
  },
  'priority-04': {
    q: 'Omärkt korsning. Du vill svänga vänster. Bil B är mötande och kör rakt fram. Får du svänga före B?',
    options: [
      'Ja, eftersom du kom först till korsningen',
      'Ja, om du blinkade i god tid',
      'Nej, du har väjningsplikt mot B',
    ],
    explain: 'En förare som svänger vänster har väjningsplikt mot mötande trafik som kör rakt fram eller svänger höger. Att blinka ger dig aldrig företräde.',
  },
  'priority-05': {
    q: 'Omärkt korsning. Alla kör rakt fram. I vilken ordning kör fordonen?',
    options: [
      'B, du, C',
      'Du, B, C',
      'C, du, B',
      'B, C, du',
    ],
    explain: 'B har ingen till höger om sig, så B kör först. Du har väjningsplikt mot B (till höger om dig), men C har väjningsplikt mot dig (du är till höger om C). Alltså: B, sedan du, sedan C.',
  },
  'priority-06': {
    q: 'Det står ett väjningspliktsmärke där du kommer. Bil B kommer från vänster på den korsande vägen. Vem har väjningsplikt?',
    options: [
      'B, eftersom du kommer från höger',
      'Du har väjningsplikt mot B',
      'Ingen, eftersom du kör rakt fram',
    ],
    explain: 'Märket Väjningsplikt betyder att du har väjningsplikt mot all trafik på vägen du kör ut på, både från vänster och från höger. Högerregeln hjälper dig inte längre.',
  },
  'priority-07': {
    q: 'Du kommer fram till den här stoppskylten och stopplinjen. Ingen annan trafik syns. Vad måste du göra?',
    options: [
      'Sakta in och köra vidare, eftersom det är fritt',
      'Stanna bara om det kommer trafik',
      'Stanna helt vid stopplinjen och sedan köra vidare när det är säkert',
    ],
    explain: 'Stopplikt betyder att du alltid måste stanna helt, även om vägen ser tom ut, och sedan lämna företräde åt all trafik på den korsande vägen.',
  },
  'priority-08': {
    q: 'Du kör på en huvudled. Bil B kommer från höger och har väjningsplikt. Vem kör först?',
    options: [
      'Du kör först',
      'B kör först, eftersom den kommer från höger',
      'Den som kommer först till korsningen',
    ],
    explain: 'Trafik på huvudled har företräde framför trafik från sidovägar, och B har dessutom ett väjningspliktsmärke. Högerregeln gäller inte här.',
  },
  'priority-09': {
    q: 'Du kör på huvudleden och vill svänga vänster. Bil B är mötande på samma huvudled och kör rakt fram. Vem kör först?',
    options: [
      'Du, eftersom du kör på huvudleden',
      'B kör först',
      'Du, eftersom B har väjningsplikt mot trafik som svänger',
    ],
    explain: 'Huvudleden ger dig bara företräde framför trafiken från sidovägarna. Mellan dig och B, som båda kör på huvudleden, gäller den vanliga regeln: när du svänger vänster väjer du för mötande trafik.',
  },
  'priority-10': {
    q: 'Du och C har båda väjningsplikt. B kör på huvudleden. Du vill svänga vänster; C kör rakt fram. I vilken ordning kör ni?',
    options: [
      'B, du, C',
      'Du, C, B',
      'B, C, du',
      'C, B, du',
    ],
    explain: 'B kör på huvudleden, så både du och C väjer för B. Mellan dig och C gäller den vanliga regeln: du svänger vänster och väjer därför för C, som är mötande och kör rakt fram. Ordning: B, C, du.',
  },
  'priority-11': {
    q: 'Du har grönt ljus och vill svänga vänster. Mötande bil B har också grönt och kör rakt fram. Vad gör du?',
    options: [
      'Kör ut i korsningen och väntar tills B har passerat, sedan svänger du',
      'Svänger direkt, eftersom du har grönt',
      'Stannar bakom stopplinjen tills det blir rött',
    ],
    explain: 'Grönt ljus tar inte bort regeln att den som svänger vänster ska väja för mötande trafik. Du får köra fram i korsningen och svänga när B har passerat, så länge du inte står i vägen för B.',
  },
  'priority-12': {
    q: 'Din signal visar en grön pil som pekar åt vänster. Vad betyder den?',
    options: [
      'Det är förbjudet att svänga vänster i den här korsningen',
      'Du får köra i pilens riktning',
      'Du måste stanna först, sedan får du svänga vänster',
    ],
    explain: 'En grön pil betyder att du får köra i den riktning pilen visar. Trafik som korsar din väg har normalt rött, men håll alltid utkik efter någon som inte har stannat.',
  },
  'priority-13': {
    q: 'Trafiksignalerna blinkar gult och det finns inga vägmärken. Du kör rakt fram och bil B kommer från höger. Vem kör först?',
    options: [
      'Du, eftersom blinkande gult betyder att du får köra',
      'Den som kommer först till korsningen',
      'Bil B kör först',
    ],
    explain: 'Blinkande gult betyder att signalerna inte reglerar trafiken: kör försiktigt och följ vägmärkena. Finns det inga vägmärken gäller högerregeln, så du väjer för B som kommer från höger.',
  },
  'priority-14': {
    q: 'Signalerna blinkar gult. Bil B, som kommer från höger, har väjningsplikt. Du kör rakt fram. Vem kör först?',
    options: [
      'Du kör först, eftersom B har väjningsplikt',
      'B kör först, eftersom den kommer från höger',
      'Båda måste stanna och komma överens med ögonkontakt',
    ],
    explain: 'När signalerna blinkar gult gäller vägmärkena. B har väjningsplikt och måste väja för dig, trots att B kommer från höger.',
  },
  'priority-15': {
    q: 'Din trafiksignal visar rött och gult samtidigt. Vad betyder det?',
    options: [
      'Du får köra om korsningen är fri',
      'Stopp: det blir snart grönt, men du får inte köra ännu',
      'Det blir snart rött; kör igenom snabbt',
    ],
    explain: 'Rött och gult samtidigt betyder att signalen snart slår om till grönt. Du måste ändå vänta vid stopplinjen tills det blir grönt.',
  },
  'priority-16': {
    q: 'Du närmar dig korsningen. Ljuset slår om från grönt till gult medan du fortfarande är så långt bort att du kan stanna säkert. Vad ska du göra?',
    options: [
      'Öka farten så att du hinner igenom före rött',
      'Stanna vid stopplinjen',
      'Fortsätta i samma fart: gult betyder kör försiktigt',
    ],
    explain: 'Gult efter grönt betyder stopp. Du får bara köra vidare om du är så nära att du inte kan stanna säkert.',
  },
  'priority-17': {
    q: 'Du kör ut från en parkeringsplats (din väg på bilden är utfarten från parkeringen) och vill svänga höger. Bil B kommer från vänster på vägen. Vem kör först?',
    options: [
      'Du kör först: du kommer från höger sett från B',
      'B kör först',
      'Den som kommer först till korsningen',
    ],
    explain: 'Utfartsregeln: när du kör ut från en parkeringsplats, bensinstation, privat tomt eller liknande ut på en väg har du väjningsplikt mot all trafik på vägen, från båda hållen.',
  },
  'priority-18': {
    q: 'Du kör rakt fram. Bil B kör ut från en bensinstation till höger om dig och svänger vänster. Vem har väjningsplikt?',
    options: [
      'Du, eftersom B kommer från höger',
      'B, eftersom den kör ut från en bensinstation',
      'B, eftersom den svänger vänster',
    ],
    explain: 'En förare som kör ut från en bensinstation har väjningsplikt mot all trafik på vägen (utfartsregeln). Högerregeln gäller inte vid en sådan utfart.',
  },
  'priority-19': {
    q: 'Du svänger höger. Gående P går över vägen du svänger in på, på övergångsstället. Vad gör du?',
    options: [
      'Svänger framför P innan P når din sida',
      'Tutar och svänger',
      'Väntar och låter P gå över först',
    ],
    explain: 'När du svänger har du väjningsplikt mot gående som korsar vägen du svänger in på. Vid ett obevakat övergångsställe ska du dessutom lämna företräde åt alla som är ute på det eller precis ska gå ut på det.',
  },
  'priority-20': {
    q: 'Du har grönt ljus och svänger vänster. Gående P går över vägen du svänger in på. Vem går först?',
    options: [
      'Den gående',
      'Du, eftersom du har grönt',
      'Du, eftersom den gående borde ha väntat',
    ],
    explain: 'Gående som korsar vägen du svänger in på kan ha grönt samtidigt som du. När du svänger har du väjningsplikt mot dem.',
  },
  'priority-21': {
    q: 'Du närmar dig en cykelöverfart utan trafiksignaler. En cyklist är på väg att cykla ut på den. Vad måste du göra?',
    options: [
      'Hålla farten: cyklister ska alltid vänta på bilar',
      'Tuta för att varna cyklisten',
      'Lämna företräde och låta cyklisten korsa',
    ],
    explain: 'Vid en cykelöverfart utan trafiksignaler eller polis har förare väjningsplikt mot cyklister (och förare av moped klass II) som är ute på överfarten eller precis ska köra ut på den. Kör fram i låg fart så att du kan stanna.',
  },
  'priority-22': {
    q: 'En polis dirigerar trafiken i en korsning som också har trafiksignaler och väjningspliktsmärken. Vad ska du följa i första hand?',
    options: [
      'Trafiksignalerna',
      'Polisen',
      'Vägmärkena',
      'Högerregeln',
    ],
    explain: 'Rangordningen är: polisens tecken, sedan trafiksignaler, sedan vägmärken och sist de allmänna trafikreglerna, till exempel högerregeln.',
  },
  'priority-23': {
    q: 'Omärkt korsning. Du kör rakt fram. Mötande bil B vill svänga vänster tvärs över din väg. Vem kör först?',
    options: [
      'B, eftersom B kom först till korsningen',
      'Du kör först',
      'B, eftersom du kommer från vänster sett från B',
    ],
    explain: 'B svänger vänster och har väjningsplikt mot mötande trafik som kör rakt fram, alltså dig.',
  },
  'priority-24': {
    q: 'Du kör rakt fram. Cyklist B kommer ut från en cykelbana till höger om dig och ut på vägen. Vem har väjningsplikt?',
    options: [
      'Cyklisten har väjningsplikt mot dig',
      'Du har väjningsplikt: cyklisten kommer från höger',
      'Du har väjningsplikt, eftersom cyklister alltid har företräde',
    ],
    explain: 'Utfartsregeln gäller också när man lämnar en cykelbana: en cyklist som cyklar ut från en cykelbana på vägen har väjningsplikt mot trafiken på vägen.',
  },
  'priority-25': {
    q: 'Du kör på huvudleden och svänger vänster. B är mötande på huvudleden och kör rakt fram. C har väjningsplikt. I vilken ordning kör ni?',
    options: [
      'Du, B, C',
      'B, C, du',
      'C, B, du',
      'B, du, C',
    ],
    explain: 'C har väjningsplikt och väntar på er båda. Du svänger vänster, så du väjer för B som är mötande och kör rakt fram. Ordning: B, du, C.',
  },
  'priority-26': {
    q: 'Du vill svänga höger ut på den korsande vägen. Det står ett väjningspliktsmärke där du kommer. Bil B kommer från vänster. Vad gör du?',
    options: [
      'Svänger höger direkt: B kör rakt fram och svänger inte',
      'Väntar på B och svänger sedan',
      'Svänger direkt, eftersom du bara svänger höger',
    ],
    explain: 'En högersväng tar dig ändå in i B:s körfält. Med väjningsplikt måste du väja för all trafik på vägen du kör ut på, även trafik från vänster.',
  },
});
