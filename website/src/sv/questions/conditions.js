/* Svenska: mörker, väder, vinterkörning och vilt */
SV.q({
  'conditions-01': {
    q: 'Du kör med helljus på en mörk landsväg. En bil kommer emot dig. Vad gör du?',
    options: [
      'Behåller helljuset tills den andra föraren bländar av först',
      'Släcker strålkastarna en kort stund',
      'Bländar av först när bilen är precis bredvid dig',
      'Bländar av i god tid så att du inte bländar den mötande föraren',
    ],
    explain: 'Blända av i god tid före mötet så att du inte bländar den mötande föraren. Helljuset bländar långt innan bilen når fram till dig.',
  },
  'conditions-02': {
    q: 'Du blir bländad av strålkastarna på en mötande bil. Vad ska du göra?',
    options: [
      'Slår på helljuset för att blända tillbaka',
      'Tittar rakt in i ljuset så att du kan bedöma var bilen är',
      'Sänker farten och riktar blicken mot högra vägkanten',
    ],
    explain: 'Sänk farten, stanna vid behov, och titta mot högra kanten av ditt körfält så att du behåller din position. Att blända tillbaka gör bara att ni båda ser sämre.',
  },
  'conditions-03': {
    q: 'En person går längs kanten av den här vägen i mörker. Vad gör att du kan upptäcka personen tidigast?',
    options: [
      'Mörka kläder',
      'En vit t-shirt',
      'Att personen går i samma riktning som trafiken',
      'En reflex',
    ],
    explain: 'En reflex lyser upp i ljuset från strålkastarna och syns på mycket längre avstånd än även ljusa kläder. En fotgängare i mörka kläder upptäcks mycket sent när du kör med halvljus.',
  },
  'conditions-04': {
    q: 'Du kör i tät dimma som den här. Hur fort får du köra?',
    options: [
      'Med en hastighet som gör att du kan stanna inom den sträcka du kan se',
      'Enligt hastighetsgränsen, så länge du har lyset tänt',
      'Så fort att du hela tiden ser bakljusen på bilen framför',
      'I 30 km/h, som är den lagstadgade gränsen i dimma',
    ],
    explain: 'Du måste alltid kunna stanna inom den sträcka du kan se är fri. I dimma kan den vara mycket kort. Att följa bakljusen på bilen framför lockar dig att köra för fort och för nära.',
  },
  'conditions-05': {
    q: 'Vilket ljus hjälper dig mest i dimma som den här, utan att blända någon?',
    options: [
      'Helljus',
      'Bara parkeringsljus',
      'Halvljus, plus främre dimljus om bilen har sådana',
      'Varningsblinkers under körning',
    ],
    explain: 'Helljuset reflekteras i dimman och gör sikten sämre. Halvljus, och främre dimljus om du har sådana, lyser upp vägen lågt och nära bilen.',
  },
  'conditions-06': {
    q: 'När får du använda dimbakljuset?',
    options: [
      'Så fort det är mörkt',
      'När det regnar lätt',
      'Vid dålig sikt, till exempel i tät dimma, men inte när det bländar en förare bakom dig',
      'Alltid på motorväg',
    ],
    explain: 'Dimbakljuset är mycket starkt. Använd det bara när sikten är riktigt dålig, och släck det när dimman lättar eller när en bil kör nära bakom dig.',
  },
  'conditions-07': {
    q: 'Du kör genom djupt vatten på vägen i kraftigt regn och plötsligt känns ratten lätt. Vad händer och vad gör du?',
    options: [
      'Vattenplaning: släpp gasen och håll ratten stilla utan att tvärbromsa',
      'Vattenplaning: tvärbromsa direkt',
      'Lufttrycket i däcken är för högt: gör en kraftig styrrörelse för att få grepp',
      'Det är normalt i regn: behåll farten',
    ],
    explain: 'När däcken glider på ett lager vatten tappar de kontakten med vägen. Släpp gasen mjukt och håll hjulen rakt tills greppet kommer tillbaka. Kraftig inbromsning eller styrrörelse kan få bilen att sladda.',
  },
  'conditions-08': {
    q: 'Det börjar regna efter en lång torrperiod. Varför behöver du vara extra försiktig i början?',
    options: [
      'Damm, gummi och olja på vägen blandas med vattnet och gör vägen mycket hal',
      'Regnet gör att bromsarna överhettas',
      'Regnet gör vägbanan grövre',
    ],
    explain: 'Det första regnet efter torrt väder lyfter smuts och olja från vägbanan och bildar en hal hinna tills kraftigare regn har spolat bort den.',
  },
  'conditions-09': {
    q: 'Det är en kall och klar morgon. Vägen du kör på är torr och det finns en bro längre fram. Vad bör du tänka på?',
    options: [
      'Broar är oftast varmare än vägen på grund av vattnet under',
      'Bron kan vara isig även om resten av vägen inte är det',
      'Is bildas bara på broar på eftermiddagen',
    ],
    explain: 'Broar kyls både ovanifrån och underifrån, så de fryser före resten av vägen. Skuggiga partier och öppna, blåsiga sträckor är också typiska ställen för svartis.',
  },
  'conditions-10': {
    q: 'Vid vilken temperatur är en isig väg oftast halast?',
    options: [
      'Runt 0 °C, när det finns vatten ovanpå isen',
      'Runt -20 °C',
      'Temperaturen påverkar inte hur hal isen är',
    ],
    explain: 'Isen är som halast runt noll grader, när ett tunt lager vatten bildas ovanpå. Mycket kall och torr is ger oftast något bättre grepp.',
  },
  'conditions-11': {
    q: 'När måste en bil ha vinterdäck i Sverige?',
    options: [
      '1 oktober till 30 april, oavsett väder',
      'Bara när det snöar',
      'Från första snöfallet till 15 april',
      '1 december till 31 mars, när det är vinterväglag',
    ],
    explain: 'Vinterdäck är obligatoriska från 1 december till 31 mars när det är vinterväglag, det vill säga snö, is, snömodd eller frost på någon del av vägen.',
  },
  'conditions-12': {
    q: 'När får du normalt använda dubbdäck?',
    options: [
      '1 oktober till 15 april, och utanför den perioden om det är vinterväglag',
      'Bara 1 december till 31 mars',
      'Hela året',
      'Bara på vägar utanför tättbebyggt område',
    ],
    explain: 'Dubbdäck är tillåtna från 1 oktober till 15 april. Utanför den perioden får de bara användas om det är, eller kan antas bli, vinterväglag.',
  },
  'conditions-13': {
    q: 'Vilket är det minsta tillåtna mönsterdjupet för vinterdäck under perioden då vinterdäck krävs?',
    options: ['1,6 mm', '2 mm', '3 mm', '5 mm'],
    explain: 'Vinterdäck måste ha minst 3 mm mönsterdjup när de är obligatoriska. Sommardäck måste ha minst 1,6 mm, men ett större mönsterdjup ger bättre grepp på våt väg.',
  },
  'conditions-14': {
    q: 'Vilket är det lagstadgade minsta mönsterdjupet för sommardäck?',
    options: ['1,6 mm', '3 mm', '1 mm', '4 mm'],
    explain: 'Det lagstadgade minimikravet för sommardäck är 1,6 mm. Greppet på våt väg blir tydligt sämre långt innan dess, så många experter rekommenderar att du byter tidigare.',
  },
  'conditions-15': {
    q: 'Din bil är täckt av snö efter en natt utomhus. Vad måste du göra innan du kör?',
    options: [
      'Skrapa ett litet hål i vindrutan att titta genom',
      'Börja köra och låta värmen smälta snön',
      'Bara rengöra vindrutan och strålkastarna',
      'Rengöra rutor, speglar, lyktor och registreringsskyltar, och ta bort snön från taket',
    ],
    explain: 'Du behöver full sikt runt om, och andra trafikanter måste kunna se dina lyktor och registreringsskyltar. Snö som ligger kvar på taket kan glida ner över vindrutan när du bromsar eller blåsa mot bilarna bakom.',
  },
  'conditions-16': {
    q: 'Du ser det här märket i skymningen. När är risken störst att möta älg och hjort?',
    options: [
      'Mitt på dagen',
      'Bara på vintern',
      'Bara under jaktsäsongen',
      'I gryning och skymning',
    ],
    explain: 'Älg och hjort är mest aktiva i gryning och skymning, då ljuset dessutom är dåligt. Sänk farten där märket står och håll uppsikt över vägkanterna och skogsbrynet.',
  },
  'conditions-17': {
    q: 'En älg har just korsat vägen framför dig och går in i skogen. Vad bör du räkna med?',
    options: [
      'Fler djur kan följa efter, så sänk farten och var beredd att stanna',
      'Ingenting mer, vägen är fri nu',
      'Älgen kommer alltid tillbaka samma väg',
    ],
    explain: 'Älg och hjort rör sig ofta i grupp, och en kalv följer oftast efter sin mamma. Om ett djur korsar vägen ska du räkna med fler.',
  },
  'conditions-18': {
    q: 'Ett rådjur dyker plötsligt upp i ditt körfält. Vad gör du?',
    options: [
      'Väjer kraftigt ut i det mötande körfältet',
      'Bromsar så hårt du kan och behåller kontrollen över bilen',
      'Gasar för att hinna förbi innan djuret rör sig',
      'Tutar och behåller farten',
    ],
    explain: 'Bromsa så hårt du kan. En kraftig undanmanöver kan föra dig ut i mötande trafik eller av vägen, vilket ofta är värre än att köra på djuret. Vilt kan dessutom hoppa åt ett oväntat håll.',
  },
  'conditions-19': {
    q: 'Du kör på ett rådjur. Det springer iväg in i skogen. Vad måste du göra?',
    options: [
      'Ingenting, eftersom djuret kunde springa därifrån',
      'Anmäla det till närmaste jägare',
      'Märka ut olycksplatsen och anmäla olyckan till polisen',
      'Köra vidare och anmäla det inom en vecka',
    ],
    explain: 'Efter en viltolycka med till exempel älg, hjort eller vildsvin måste du märka ut platsen och anmäla olyckan till polisen (112), även om djuret sprang därifrån. En eftersöksjägare kan då leta efter det skadade djuret.',
  },
  'conditions-20': {
    q: 'Efter en kollision med vilket av de här djuren måste du anmäla till polisen?',
    options: ['En hare', 'En räv', 'Ett vildsvin', 'En grävling'],
    explain: 'Skyldigheten att märka ut platsen och anmäla till polisen gäller större vilt som älg, hjort, vildsvin, björn, varg och lodjur. Den gäller inte små djur som hare, räv eller grävling.',
  },
  'conditions-21': {
    q: 'Den lågt stående solen lyser dig rakt i ögonen. Vad gör du?',
    options: [
      'Behåller farten och tittar på vägmarkeringarna',
      'Sänker farten, fäller ner solskyddet och ser till att vindrutan är ren',
      'Blundar med ena ögat',
      'Kör tätt bakom bilen framför så att du ser dess bromsljus',
    ],
    explain: 'Lågt stående sol kan dölja fotgängare och cyklister helt. Sänk farten, använd solskyddet eller solglasögon och håll vindrutan ren både invändigt och utvändigt, eftersom smuts sprider ljuset.',
  },
  'conditions-22': {
    q: 'Du har precis mött en bil i mörker med halvljus. Vad måste du se upp för direkt efter mötet?',
    options: [
      'Ingenting, vägen är fri nu när bilen har passerat',
      'Fotgängare eller cyklister i det mörka område som ditt halvljus inte lyste upp',
      'Att dina strålkastare kan ha slocknat',
    ],
    explain: 'Under mötet lyser halvljuset bara upp en kort sträcka och dina ögon ställer om sig efter det mötande ljuset. Någon som går vid vägkanten kan döljas där. Slå på helljuset igen när det inte bländar någon.',
  },
  'conditions-23': {
    q: 'Du kör bakom en annan bil på en snöig väg. Hur ska du ändra avståndet jämfört med på torr väg?',
    options: [
      'Behålla samma avstånd, vinterdäcken väger upp snön',
      'Korta det så att du kan följa spåren efter bilen framför',
      'Öka det rejält, eftersom bromssträckan blir mycket längre',
    ],
    explain: 'På snö och is kan bromssträckan bli många gånger längre än på torr väg, även med bra vinterdäck. Öka avståndet till framförvarande rejält.',
  },
  'conditions-24': {
    q: 'Du kör i mörker tätt bakom bil B. Vilket ljus ska du använda?',
    options: ['Helljus', 'Bara parkeringsljus', 'Bara dimljus', 'Halvljus'],
    explain: 'Helljuset skulle blända föraren framför via backspeglarna. Använd halvljus när du kör nära bakom ett annat fordon, precis som vid möte.',
  },
});
