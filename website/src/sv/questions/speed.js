/* Svenska: Hastighet, avstånd och omkörning */
SV.q({
  'speed-01': {
    q: 'Du kör inom tättbebyggt område. Det finns inga vägmärken om hastighetsbegränsning. Vilken är den högsta hastighet du får köra i?',
    options: ['30 km/h', '40 km/h', '50 km/h', '60 km/h'],
    explain: 'Bashastigheten inom tättbebyggt område är 50 km/h. Alla andra hastighetsbegränsningar måste visas med vägmärken.',
  },
  'speed-02': {
    q: 'Du kör utanför tättbebyggt område. Det finns inga vägmärken om hastighetsbegränsning. Vilken är den högsta hastighet du får köra i?',
    options: ['50 km/h', '70 km/h', '80 km/h', '90 km/h'],
    explain: 'Bashastigheten utanför tättbebyggt område är 70 km/h. Högre gränser, som 80, 90 eller mer, gäller bara där de är skyltade.',
  },
  'speed-03': {
    q: 'Du passerar de här märkena på en gata intill en skola. Vad gäller?',
    options: [
      'Du får köra högst 30 km/h',
      'Gränsen 30 km/h gäller bara när det syns barn',
      '30 km/h är den lägsta hastighet du får köra i',
      'Gränsen 30 km/h gäller bara under terminerna',
    ],
    explain: 'Märket för hastighetsbegränsning är en regel, inte ett råd: du får inte köra fortare än 30 km/h. Det gäller hela tiden om inte en tilläggstavla anger tider. Varningsmärket talar om att det kan finnas barn nära vägen.',
  },
  'speed-04': {
    q: 'Du kör på en motorväg och passerar det här märket. Vilken är den högsta hastighet du får köra i?',
    options: [
      '120 km/h, motorvägens högsta hastighet gäller alltid',
      '90 km/h',
      '120 km/h, men bara medan du kör om',
      '110 km/h',
    ],
    explain: 'På motorväg och motortrafikled gäller den hastighetsbegränsning som skyltarna visar, här 110 km/h. Gränsen gäller också när du kör om: du får aldrig överskrida den för att komma förbi någon.',
  },
  'speed-05': {
    q: 'Hastighetsbegränsningen är 70 km/h. Det är tät dimma och du ser bara ungefär 40 meter framåt. Hur fort ska du köra?',
    options: [
      '70 km/h, den skyltade hastigheten',
      'Så långsamt att du kan stanna på den sträcka som du kan se är fri',
      'I samma hastighet som bilen framför, och följa dess baklyktor',
      '70 km/h med helljus på, så att du ser längre',
    ],
    explain: 'Hastighetsbegränsningen är den högsta tillåtna hastigheten under goda förhållanden, inte ett mål. Du ska alltid kunna stanna på den sträcka som du kan se är fri. Helljus gör det värre i dimma eftersom ljuset reflekteras tillbaka mot dig.',
  },
  'speed-06': {
    q: 'Du kör med halvljus på en obelyst väg och har mötande trafik. Hur ska du anpassa hastigheten?',
    options: [
      'Håll hastighetsbegränsningen, ljuset spelar ingen roll',
      'Kör lika fort som med helljus',
      'Kör inte fortare än att du kan stanna på den sträcka som ljuset visar är fri',
      'Kör högst 30 km/h tills den andra bilen har passerat',
    ],
    explain: 'Halvljuset lyser upp en mycket kortare sträcka än helljuset. Hastigheten ska låta dig stanna på den sträcka som du kan se är fri, så du behöver ofta sänka farten när du blänkar av.',
  },
  'speed-07': {
    q: 'Du närmar dig ett backkrön på en smal väg och kan inte se vad som finns på andra sidan. Vad ska du göra?',
    options: [
      'Hålla väl till höger och sänka farten så att du kan stanna om något finns precis bakom krönet',
      'Köra mitt på vägen så att mötande förare ser dig',
      'Öka farten för att snabbt komma över krönet',
      'Tuta och behålla farten',
    ],
    explain: 'Bakom ett backkrön kan det finnas ett mötande fordon, en cyklist eller en stillastående bil. Håll till höger och anpassa hastigheten så att du kan stanna på den sträcka du kan se.',
  },
  'speed-08': {
    q: 'Vad menas med reaktionssträcka?',
    options: [
      'Sträckan från att du börjar bromsa tills bilen står still',
      'Hela sträckan som bilen behöver för att stanna',
      'Avståndet mellan dig och fordonet framför',
      'Sträckan bilen färdas från att du upptäcker en fara tills du börjar bromsa',
    ],
    explain: 'Reaktionssträckan är hur långt bilen färdas medan du upptäcker faran och flyttar foten till bromsen. Bilen håller full fart under den tiden.',
  },
  'speed-09': {
    q: 'Du dubblar hastigheten, till exempel från 40 till 80 km/h. Ungefär vad händer med bromssträckan?',
    options: [
      'Den blir ungefär dubbelt så lång',
      'Den blir ungefär fyra gånger så lång',
      'Den blir ungefär tre gånger så lång',
      'Den blir ungefär lika lång med bra bromsar',
    ],
    explain: 'Bromssträckan ökar med hastigheten i kvadrat. Dubbla hastigheten ger ungefär fyra gånger så lång bromssträcka, och också fyra gånger så stort krockvåld.',
  },
  'speed-10': {
    q: 'Vad är stoppsträcka?',
    options: [
      'Bara bromssträckan',
      'Bromssträckan minus reaktionssträckan',
      'Reaktionssträckan plus bromssträckan',
      'Sträckan du kan se framför dig',
    ],
    explain: 'Stoppsträckan är reaktionssträckan plus bromssträckan: allt från att du upptäcker faran tills bilen står still.',
  },
  'speed-11': {
    q: 'Du kör i 90 km/h. Din reaktionstid är 1 sekund. Ungefär hur långt färdas bilen innan du ens börjar bromsa?',
    options: ['Ungefär 90 meter', 'Ungefär 50 meter', 'Ungefär 9 meter', 'Ungefär 25 meter'],
    explain: 'I 90 km/h färdas bilen 25 meter varje sekund (90 ÷ 3,6). Hela den sträckan körs i full fart innan bromsarna gör något.',
  },
  'speed-12': {
    q: 'Jämfört med en krock i 50 km/h, hur mycket mer energi finns det i en krock i 70 km/h?',
    options: ['Ungefär lika mycket', 'Ungefär 40 % mer', 'Ungefär dubbelt så mycket', 'Ungefär fem gånger så mycket'],
    explain: 'Energin ökar med hastigheten i kvadrat: (70 ÷ 50)² är ungefär 2. En liten höjning av hastigheten ger en mycket våldsammare krock, och därför används låga hastighetsbegränsningar där det finns fotgängare och cyklister.',
  },
  'speed-13': {
    q: 'Vilket av följande gör din reaktionssträcka längre?',
    options: [
      'Att vara trött eller distraherad, till exempel av mobilen',
      'Våt vägbana',
      'Slitna däck',
      'Att köra i nedförsbacke',
    ],
    explain: 'Trötthet, distraktion, alkohol och droger gör att du reagerar långsammare, så bilen hinner längre innan du bromsar. Våt väg, slitna däck och nedförsbackar gör bromssträckan längre, inte reaktionssträckan.',
  },
  'speed-14': {
    q: 'Du kör bakom bil B på torr väg under goda förhållanden. Vilket avstånd rekommenderas?',
    options: [
      'Minst 1 sekund',
      'Minst 3 sekunder',
      'Ungefär 10 meter, oavsett hastighet',
      'Så nära att ingen kan köra in emellan',
    ],
    explain: 'Använd tresekundersregeln: när B passerar en fast punkt, till exempel en stolpe, ska du inte nå samma punkt förrän minst 3 sekunder senare. Eftersom avståndet räknas i sekunder blir det längre ju fortare du kör.',
  },
  'speed-15': {
    q: 'Vägen är täckt av snö och is. Vilket avstånd ska du hålla till bilen framför?',
    options: [
      'Exakt 3 sekunder, det räcker alltid',
      'Ungefär 1 sekund, eftersom trafiken går långsamt',
      'Tätt bakom, så att du kan köra i dess spår',
      'Mycket mer än 3 sekunder',
    ],
    explain: 'Tre sekunder är minimum under goda förhållanden. På snö och is blir bromssträckan många gånger längre, så du behöver ett mycket längre avstånd.',
  },
  'speed-16': {
    q: 'Du vill köra om bil B. Strax framför finns ett övergångsställe utan trafiksignaler. Får du köra om här?',
    options: [
      'Ja, om det inte syns några fotgängare',
      'Ja, om du tutar först',
      'Ja, om B kör under hastighetsbegränsningen',
      'Nej, du får inte köra om strax före eller på ett sådant övergångsställe',
    ],
    explain: 'Du får inte köra om strax före eller på ett övergångsställe som inte regleras med trafiksignaler eller av en polis (obevakat övergångsställe). Bil B kan skymma en fotgängare som är på väg ut.',
  },
  'speed-17': {
    q: 'Bil B framför dig har gett tecken för vänstersväng och placerat sig mot mitten av vägen för att svänga vänster. Du ska köra rakt fram. På vilken sida ska du passera B?',
    options: [
      'Till höger om B, om det finns plats',
      'Till vänster om B, som vid en vanlig omkörning',
      'Du måste alltid vänta bakom B tills den har svängt',
      'På valfri sida, där det finns mest plats',
    ],
    explain: 'Omkörning sker normalt till vänster. Men ett fordon som har gett tecken och placerat sig för att svänga vänster ska köras om till höger.',
  },
  'speed-18': {
    q: 'Bil B kör om dig. Vad gör du?',
    options: [
      'Ökar farten lite så att B kommer förbi snabbare',
      'Håller till höger och ökar inte farten',
      'Kör mot mittlinjen så att B ser dig',
      'Bromsar hårt så att B kan köra in direkt',
    ],
    explain: 'När du blir omkörd ska du hålla så långt till höger som behövs och får inte öka hastigheten. Gör det lätt för B att komma förbi och tillbaka in.',
  },
  'speed-19': {
    q: 'Du vill köra om lastbil T. Bil C bakom dig har redan svängt ut för att köra om. Vad gör du?',
    options: [
      'Svänger ut direkt, du låg bakom T först',
      'Ger tecken och svänger ut, C får bromsa för dig',
      'Stannar kvar bakom T och låter C köra förbi först',
      'Ökar farten så att C inte kommer förbi',
    ],
    explain: 'Du får inte påbörja en omkörning om ett fordon bakom dig redan har börjat köra om dig. Kontrollera speglarna och döda vinkeln innan du svänger ut.',
  },
  'speed-20': {
    q: 'Du kommer ikapp cyklist C. Bil B kommer emot dig. Vad gör du?',
    options: [
      'Sänker farten och väntar bakom C tills du kan köra förbi med gott avstånd i sidled',
      'Kör förbi C nu och håller dig nära C så att du inte behöver komma ut mot B',
      'Tutar så att C flyttar ut på vägrenen',
      'Kör förbi C med hjulen på mittlinjen och klämmer dig förbi B',
    ],
    explain: 'När du kör om en cyklist ska du hålla betryggande avstånd i sidled. Med mötande trafik finns det inte plats för det, så vänta bakom C tills vägen är fri.',
  },
  'speed-21': {
    q: 'Du kör bakom traktor T före en kurva. Mittlinjen är heldragen. Får du köra om?',
    options: [
      'Ja, traktorer är så långsamma att det är tillåtet',
      'Ja, om du tutar först',
      'Ja, om traktorföraren vinkar förbi dig',
      'Nej, du får inte korsa spärrlinjen, och kurvan skymmer mötande trafik',
    ],
    explain: 'Du får inte korsa eller köra på en spärrlinje. Du får inte heller köra om i eller strax före en kurva, eller på andra platser där du inte ser tillräckligt långt framåt.',
  },
  'speed-22': {
    q: 'Vad kan hända om du åker fast för att ha kört mycket fortare än hastighetsbegränsningen?',
    options: [
      'Bara en varning första gången',
      'Böter, och vid grov fortkörning kan körkortet återkallas',
      'Ingenting, så länge ingen skadades',
      'Bara böter, aldrig att du förlorar körkortet',
    ],
    explain: 'Fortkörning straffas med böter. Om fortkörningen är grov kan körkortet också återkallas under en tid.',
  },
  'speed-23': {
    q: 'Du tog körkort för åtta månader sedan. Det återkallas för att du har kört alldeles för fort. Vad gäller när du vill ha körkort igen?',
    options: [
      'Du får tillbaka det automatiskt när spärrtiden är slut',
      'Du behöver bara betala böterna',
      'Du måste klara både kunskapsprovet och körprovet igen',
      'Du behöver bara göra om körprovet',
    ],
    explain: 'De första två åren med körkort är en prövotid. Om körkortet återkallas under prövotiden måste du klara både kunskapsprovet och körprovet igen.',
  },
  'speed-24': {
    q: 'Får du köra långt under hastighetsbegränsningen?',
    options: [
      'Ja, men du får inte utan giltigt skäl köra så långsamt att du hindrar annan trafik i onödan',
      'Nej, du måste alltid köra i den skyltade hastigheten',
      'Ja, hur långsamt som helst på alla vägar',
      'Bara på motorväg',
    ],
    explain: 'Hastighetsbegränsningen är en högsta gräns, och ofta behöver du köra långsammare. Men att utan giltigt skäl köra så långsamt att andra hindras i onödan är inte tillåtet, och det kan locka andra till riskabla omkörningar.',
  },
});
