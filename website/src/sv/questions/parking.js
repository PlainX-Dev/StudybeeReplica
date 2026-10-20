/* Svenska: Stannande och parkering */
SV.q({
  'parking-01': {
    q: 'Du kör in till sidan av gatan så att din kompis kan kliva ur bilen och kör sedan vidare. Vad har du gjort enligt trafikreglerna?',
    options: [
      'Parkerat',
      'Stannat, men inte parkerat',
      'Varken stannat eller parkerat',
      'Parkerat, eftersom motorn var igång',
    ],
    explain: 'Att stanna för att låta passagerare stiga på eller av, eller för att lasta och lossa gods, räknas inte som parkering. Parkering är när fordonet står stilla av något annat skäl (köer i trafiken och att undvika fara räknas inte heller som parkering).',
  },
  'parking-02': {
    q: 'Du sitter kvar i bilen med motorn igång och väntar i tio minuter på en kompis som handlar. Är det parkering?',
    options: [
      'Nej, eftersom du sitter i bilen',
      'Nej, eftersom motorn är igång',
      'Ja, att vänta på det här sättet räknas som parkering',
      'Bara om du väntar längre än en timme',
    ],
    explain: 'Parkering är när fordonet står stilla av något annat skäl än trafiken, för att undvika fara eller för att låta passagerare stiga på eller av eller lasta gods. Det spelar ingen roll om föraren sitter i bilen eller om motorn är igång.',
  },
  'parking-03': {
    q: 'Det här är en vanlig gata med dubbelriktad trafik. Vilken bil är rätt parkerad?',
    options: [
      'Bil A',
      'Bil B',
      'Båda bilarna',
      'Ingen av bilarna',
    ],
    explain: 'På en väg med dubbelriktad trafik ska du stanna eller parkera på högra sidan i din färdriktning. Bil B står på vänster sida av vägen sett i sin färdriktning. Bara på en enkelriktad väg får du använda båda sidorna.',
  },
  'parking-04': {
    q: 'Bil A är parkerad på vänster sida av en enkelriktad gata. Inget annat förbjuder parkering där. Är bilen rätt parkerad?',
    options: [
      'Nej, du ska alltid parkera på högra sidan',
      'Ja, på en enkelriktad väg får du stanna och parkera på båda sidorna',
      'Bara om föraren sitter kvar i bilen',
      'Bara när det är mörkt',
    ],
    explain: 'Huvudregeln är att du stannar och parkerar på högra sidan i färdriktningen, men på en enkelriktad väg får både vänster och höger sida användas.',
  },
  'parking-05': {
    q: 'Bil A är parkerad strax före övergångsstället. Bil B är parkerad ungefär 20 meter före. Vilken bil bryter mot reglerna?',
    options: [
      'Bara bil A',
      'Bara bil B',
      'Båda bilarna',
      'Ingen av bilarna',
    ],
    explain: 'Du får inte stanna eller parkera på ett övergångsställe eller inom 10 meter före det. Parkerade bilar där skymmer gående för andra förare. Bil B står tillräckligt långt bort.',
  },
  'parking-06': {
    q: 'Bil A står ett par meter från kanten på den korsande vägen. Bil B står en bra bit mer än 10 meter bort. Vilken bil är felparkerad?',
    options: [
      'Bil B',
      'Ingen av bilarna',
      'Båda bilarna',
      'Bil A',
    ],
    explain: 'Du får inte stanna eller parkera i en korsning eller inom 10 meter från närmaste kant på den korsande körbanan. Bil A skymmer sikten och gör det svårare för andra att svänga.',
  },
  'parking-07': {
    q: 'Du kör på den här vägen utanför tättbebyggt område och vill parkera en stund för att vila. Får du parkera vid vägkanten här?',
    options: [
      'Ja, bara du slår på varningsblinkers',
      'Ja, om du parkerar på högra sidan',
      'Nej, utanför tättbebyggt område får du inte parkera på huvudled; använd en parkeringsficka eller en sidoväg',
      'Bara i dagsljus',
    ],
    explain: 'Den gula romben visar att vägen är huvudled. Utanför tättbebyggt område får du inte parkera på huvudled. Att stanna en kort stund, till exempel för att släppa av en passagerare, är fortfarande tillåtet om det kan ske säkert.',
  },
  'parking-08': {
    q: 'Får du parkera din bil i busshållplatsens ficka, där bil A står?',
    options: [
      'Ja, om ingen buss syns till',
      'Ja, i högst tio minuter',
      'Ja, utanför bussens tidtabell',
      'Nej, du får inte parkera vid en busshållplats',
    ],
    explain: 'Det är förbjudet att parkera vid en busshållplats. Bussarna behöver platsen för att kunna köra in, och passagerarna måste kunna stiga på och av säkert.',
  },
  'parking-09': {
    q: 'Var är det förbjudet att ens stanna bilen (om inte trafiken tvingar dig)?',
    options: [
      'I en plankorsning',
      'På högra sidan av en gata med dubbelriktad trafik',
      'På en markerad parkeringsplats',
      '20 meter efter en korsning',
    ],
    explain: 'Du får aldrig stanna i en plankorsning (järnvägskorsning). Andra platser där det är förbjudet att stanna är bland annat tunnlar, övergångsställen och 10 meter före dem samt korsningar.',
  },
  'parking-10': {
    q: 'Trafiken flyter normalt och du vill stanna en kort stund inne i en vägtunnel för att kolla vägen. Är det tillåtet?',
    options: [
      'Ja, om du slår på varningsblinkers',
      'Ja, om du stannar nära den högra tunnelväggen',
      'Nej, du får inte stanna eller parkera i en tunnel',
      'Bara i tunnlar som är kortare än 500 meter',
    ],
    explain: 'Det är förbjudet att stanna och parkera i en tunnel. Du får bara stanna där på grund av trafiken (till exempel i kö) eller i en nödsituation, som vid motorstopp.',
  },
  'parking-11': {
    q: 'Strax efter det här märket vill du stanna en minut för att lasta av en tung låda vid en butik. Är det tillåtet?',
    options: [
      'Nej, märket förbjuder allt stannande',
      'Ja, att lasta och lossa är inte parkering, så ett kort stopp för det är tillåtet',
      'Bara om du låter motorn vara igång',
      'Bara om du har parkeringstillstånd',
    ],
    explain: 'Det här är märket Förbud att parkera fordon. Att stanna för att lasta eller lossa gods, eller för att låta passagerare stiga på eller av, är inte parkering och är därför tillåtet om det kan göras säkert.',
  },
  'parking-12': {
    q: 'Strax efter det här märket vill du snabbt stanna för att släppa av en passagerare. Är det tillåtet?',
    options: [
      'Ja, om det tar mindre än en minut',
      'Ja, att släppa av passagerare räknas aldrig som stannande',
      'Ja, om du slår på varningsblinkers',
      'Nej, märket förbjuder både stannande och parkering',
    ],
    explain: 'Märket Förbud att stanna och parkera fordon (rött kryss på blå botten) förbjuder både stannande och parkering. Inte ens ett snabbt stopp för att släppa av någon är tillåtet. Du får bara stanna om trafiken tvingar dig.',
  },
  'parking-13': {
    q: 'På den här enkelriktade gatan står märket Förbud att parkera fordon bara på högra sidan. Bil A är parkerad på vänster sida. Är det tillåtet (om ingen annan regel förbjuder det)?',
    options: [
      'Ja, ett parkeringsmärke gäller bara på den sida av vägen där det står',
      'Nej, märket gäller på båda sidorna av gatan',
      'Nej, du får aldrig parkera på vänster sida',
      'Bara om bil A står vänd åt andra hållet',
    ],
    explain: 'Märken som förbjuder stannande eller parkering gäller på den sida av vägen där de är uppsatta. På en enkelriktad väg får du parkera på vänster sida, så bil A står rätt.',
  },
  'parking-14': {
    q: 'Var får du parkera i ett område med det här märket?',
    options: [
      'Var som helst, bara gående kan ta sig förbi',
      'Bara på platser som är markerade för parkering',
      'Ingenstans, bilar är helt förbjudna',
      'Var som helst i högst 15 minuter',
    ],
    explain: 'I ett gångfartsområde får du bara parkera på platser som är markerade för parkering. Du ska också köra i gångfart och lämna gående företräde.',
  },
  'parking-15': {
    q: 'Du vill parkera några minuter på gatan precis framför infarten till någon annans tomt. Är det tillåtet?',
    options: [
      'Ja, om du är tillbaka inom fem minuter',
      'Ja, om du lämnar ett telefonnummer i rutan',
      'Nej, du får inte parkera så att du blockerar in- eller utfarten till en fastighet',
      'Ja, om det inte finns något parkeringsmärke',
    ],
    explain: 'Du får inte parkera framför en in- eller utfart till en fastighet på ett sätt som gör det svårt för fordon att köra in eller ut.',
  },
  'parking-16': {
    q: 'Får du stanna i ett cykelfält för att släppa av en passagerare?',
    options: [
      'Ja, det tar bara ett ögonblick',
      'Ja, om ingen cyklist syns till',
      'Ja, om du slår på varningsblinkers',
      'Nej, du får inte stanna eller parkera i ett cykelfält',
    ],
    explain: 'Det är förbjudet att stanna eller parkera på en cykelbana eller i ett cykelfält. Det tvingar ut cyklisterna i körfältet.',
  },
  'parking-17': {
    q: 'Du parkerar i nedförsbacke intill en trottoarkant. Åt vilket håll ska du vrida framhjulen?',
    options: [
      'Mot trottoarkanten',
      'Bort från trottoarkanten',
      'Rakt fram',
      'Det spelar ingen roll om parkeringsbromsen är åtdragen',
    ],
    explain: 'I nedförsbacke vrider du hjulen mot trottoarkanten så att bilen rullar in i den om bromsen släpper. Dra också åt parkeringsbromsen och lämna bilen med en växel i (backen) eller i läge P.',
  },
  'parking-18': {
    q: 'Du ska lämna din parkerade bil en kort stund. Vad bör du göra?',
    options: [
      'Låta motorn vara igång så att bilen håller sig varm',
      'Stänga av motorn, dra åt parkeringsbromsen, ta med nyckeln och låsa bilen',
      'Lämna nyckeln i bilen så att du inte tappar bort den',
      'Låta varningsblinkers vara på',
    ],
    explain: 'Innan du lämnar bilen stänger du av motorn, drar åt parkeringsbromsen, tar med nyckeln och låser. Det hindrar bilen från att rulla iväg och gör det svårare att stjäla den.',
  },
  'parking-19': {
    q: 'Du måste parkera vid kanten av den här obelysta landsvägen när det är mörkt. Vilket ljus ska bilen ha tänt medan den står där?',
    options: [
      'Inget ljus, för att spara batteriet',
      'Helljus',
      'Parkeringsljus (positionsljus)',
      'Dimljus',
    ],
    explain: 'Ett fordon som står på en obelyst väg i mörker ska ha parkeringsljus (positionsljus) tänt så att andra trafikanter ser det. Strålkastare eller dimljus skulle blända mötande förare.',
  },
  'parking-20': {
    q: 'Du (DU) har parkerat på högra sidan av gatan och vill öppna dörren. Vad ska du göra först?',
    options: [
      'Öppna dörren snabbt så att du inte hindrar trafiken',
      'Titta i backspegeln och vrid på huvudet bakåt efter cyklist C och annan trafik',
      'Tuta och sedan öppna dörren',
      'Ingenting, cyklister ska hålla säkert avstånd till parkerade bilar',
    ],
    explain: 'Innan du öppnar en dörr ska du noga kontrollera bakåt. En cyklist som passerar nära en parkerad bil kan kastas omkull av en dörr som plötsligt öppnas. Vänta tills C har passerat.',
  },
  'parking-21': {
    q: 'Du vill stanna strax efter det här backkrönet för att titta på utsikten. Är det tillåtet?',
    options: [
      'Ja, om du parkerar långt ut till höger',
      'Nej, du får inte stanna i eller nära ett backkrön där sikten är skymd',
      'Ja, om du slår på varningsblinkers',
      'Ja, i dagsljus',
    ],
    explain: 'Det är förbjudet att stanna och parkera i eller nära ett backkrön eller en kurva där sikten är skymd. Förare som kommer över krönet skulle inte hinna se din bil i tid.',
  },
  'parking-22': {
    q: 'På den här smala vägen har bil A parkerat vid M-skylten. Är det tillåtet?',
    options: [
      'Ja, mötesplatser är till för parkering',
      'Ja, i högst 30 minuter',
      'Bara om föraren håller sig i närheten',
      'Nej, du får inte parkera på en mötesplats',
    ],
    explain: 'M-skylten visar en mötesplats, som måste hållas fri så att fordon kan mötas eller släppa förbi andra. Det är inte tillåtet att parkera där.',
  },
  'parking-23': {
    q: 'Du (DU) har stannat på vänster sida av den här gatan med dubbelriktad trafik, sett i din färdriktning, för att släppa av en passagerare. Är det tillåtet?',
    options: [
      'Ja, att släppa av passagerare är aldrig begränsat',
      'Ja, om det tar mindre än en minut',
      'Nej, på en väg med dubbelriktad trafik ska du stanna på högra sidan i din färdriktning',
      'Ja, om det inte finns någon mötande trafik',
    ],
    explain: 'På en väg med dubbelriktad trafik ska både stannande och parkering ske på högra sidan i din färdriktning. Bara på enkelriktade vägar får du använda vänster sida.',
  },
  'parking-24': {
    q: 'Vad betyder det här märket?',
    options: [
      'Här är parkering tillåten; tilläggstavlor under märket kan begränsa tiden eller ange vem som får parkera',
      'Parkering är förbjuden',
      'Polisstation längre fram',
      'Du får parkera på vilken sida av vägen som helst, när som helst',
    ],
    explain: 'Det blå P-märket visar en plats där parkering är tillåten. Läs alltid eventuella tilläggstavlor, som kan ange tidsgränser, kräva avgift eller reservera platsen för vissa fordon.',
  },
});
