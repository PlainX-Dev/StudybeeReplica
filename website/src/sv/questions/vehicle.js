/* Svenska: vehicle */
SV.q({
  'vehicle-01': {
    q: 'Vilken är den högsta totalvikt en bil får ha för att du ska få köra den med B-körkort?',
    options: ['2 500 kg', '3 000 kg', '3 500 kg', '4 250 kg'],
    explain: 'B-körkort gäller för bilar med en totalvikt på högst 3 500 kg. Totalvikten är bilens vikt plus den största last den är godkänd för, inte vad den väger tom. 4 250 kg är gränsen för bil med släpvagn med B96, inte för bilen själv.',
  },
  'vehicle-02': {
    q: 'Hur många passagerare, föraren oräknad, får ett fordon som du kör med B-körkort vara byggt för?',
    options: ['Högst 8', 'Högst 6', 'Högst 9', 'Hur många som helst, så länge totalvikten är under 3 500 kg'],
    explain: 'Ett fordon för B-körkort får ha högst 8 sittplatser utöver förarplatsen. En minibuss med fler passagerarplatser kräver körkort med behörighet D, även om den är lätt.',
  },
  'vehicle-03': {
    q: 'Med B-körkort får du alltid dra en lätt släpvagn, oavsett vad bilen väger. Vad är en lätt släpvagn?',
    options: ['En släpvagn med en totalvikt på högst 500 kg', 'En släpvagn med en totalvikt på högst 750 kg', 'En släpvagn med en totalvikt på högst 1 000 kg', 'Alla släpvagnar utan egna bromsar'],
    explain: 'En lätt släpvagn har en totalvikt på högst 750 kg. Du får dra den med B-körkort efter vilken bil som helst som du får köra. En tyngre släpvagn är bara tillåten om hela ekipaget håller sig inom gränserna.',
  },
  'vehicle-04': {
    q: 'Din bil har en totalvikt på 1 900 kg. Du vill dra en släpvagn med en totalvikt på 1 400 kg (bilen är godkänd för att dra den). Räcker B-körkort?',
    options: ['Nej, alla släpvagnar över 750 kg kräver BE-behörighet', 'Ja, eftersom ekipagets sammanlagda totalvikt är 3 300 kg, vilket inte är mer än 3 500 kg', 'Nej, du behöver B96 för alla släpvagnar som är tyngre än bilens tjänstevikt', 'Ja, men bara på vägar med lägre hastighetsgräns än 70 km/h'],
    explain: 'En släpvagn som är tyngre än 750 kg är tillåten med B-körkort om bilens och släpvagnens sammanlagda totalvikt är högst 3 500 kg. 1 900 + 1 400 = 3 300 kg, så B räcker. Bilens registreringsuppgifter måste förstås också tillåta att den drar den släpvagnen.',
  },
  'vehicle-05': {
    q: 'Du vill dra en släpvagn med en bil där bilens och släpvagnens sammanlagda totalvikt blir 4 000 kg. Vilken behörighet behöver du?',
    options: ['B räcker eftersom bilen ensam väger under 3 500 kg', 'C1, eftersom ekipaget räknas som lastbil', 'B96 eller BE', 'B, om släpvagnen har egna bromsar'],
    explain: 'När ekipaget väger mer än 3 500 kg (och släpvagnen mer än 750 kg) räcker inte B. B96 tillåter ekipage upp till 4 250 kg och BE tillåter tyngre släpvagnar. Att släpvagnen har bromsar påverkar inte vilken behörighet du behöver.',
  },
  'vehicle-06': {
    q: 'Du har haft körkort i ett år när det återkallas för ett allvarligt trafikbrott. Vad måste du göra innan du får köra igen?',
    options: ['Bara vänta tills spärrtiden är slut', 'Göra om körprovet, men inte kunskapsprovet', 'Skaffa ett nytt körkortstillstånd och göra om både kunskapsprovet och körprovet', 'Betala böter och gå en endagskurs'],
    explain: 'De två första åren med körkort är en prövotid. Om körkortet återkallas under prövotiden måste du skaffa ett nytt körkortstillstånd och klara både kunskapsprovet och körprovet igen innan du får ett nytt körkort.',
  },
  'vehicle-07': {
    q: 'Du kör en klar och solig dag som den här. Vilket ljus måste vara tänt?',
    options: ['Inget ljus behövs i dagsljus', 'Halvljus eller varselljus', 'Bara positionsljus', 'Helljus, så att mötande trafik ser dig'],
    explain: 'I Sverige ska en bil alltid ha ljus tänt under färd: i dagsljus halvljus eller varselljus. I mörker behöver du halvljus eller helljus, eftersom varselljus inte lyser upp vägen och ofta inte tänder bakljusen.',
  },
  'vehicle-08': {
    q: 'Du kör med helljus på en mörk landsväg. En bil kommer emot dig. Vad gör du?',
    options: ['Behåller helljuset tills den andra föraren bländar av först', 'Släcker alla strålkastare en kort stund', 'Blinkar med helljuset för att varna den andra föraren', 'Bländar av till halvljus i god tid så att du inte bländar den andra föraren'],
    explain: 'Blända av i god tid när du möter ett annat fordon, så att du inte bländar föraren. Att vänta på att den andra föraren ska blända av först, eller att blinka med helljuset, gör bara att ni båda blir bländade en stund.',
  },
  'vehicle-09': {
    q: 'Det är mörkt och du kör på kort avstånd bakom den här bilen. Vilket ljus ska du använda?',
    options: ['Halvljus', 'Helljus, så att du ser förbi bilen', 'Bara dimljus', 'Bara varselljus'],
    explain: 'Helljuset bländar föraren framför dig via backspeglarna, så använd halvljus när du kör nära bakom ett annat fordon. Varselljus räcker inte i mörker.',
  },
  'vehicle-10': {
    q: 'Du kör i tät dimma som den här. Vad gäller för dimbakljuset?',
    options: ['Det ska vara tänt så fort du kör i mörker', 'Det får användas när sikten är kraftigt nedsatt och ska släckas när sikten blir bättre', 'Det ersätter bromsljusen i dimma', 'Det ska alltid vara tänt i regn så att du syns'],
    explain: 'Dimbakljuset är mycket starkt. Använd det bara när sikten verkligen är dålig, till exempel i tät dimma, och släck det när sikten blir bättre. Annars bländar det förarna bakom dig och kan dölja dina bromsljus.',
  },
  'vehicle-11': {
    q: 'När ska du använda varningsblinkers?',
    options: ['När du parkerar en kort stund där det inte är tillåtet att parkera', 'När du kör långsamt i kraftigt regn', 'När du vill tacka en annan förare', 'När ditt fordon har stannat på en plats där det kan vara en fara för annan trafik, till exempel efter ett motorstopp'],
    explain: 'Varningsblinkers varnar andra för att ditt stillastående fordon kan vara en fara, till exempel efter ett motorstopp eller vid en olycka. De gör inte otillåten parkering godtagbar.',
  },
  'vehicle-12': {
    q: 'Ett barn springer plötsligt ut på vägen. Din bil har ABS-bromsar. Hur bromsar du?',
    options: ['Pumpar snabbt med bromspedalen', 'Bromsar försiktigt så att hjulen inte låser sig', 'Trycker ner bromspedalen hårt och håller den nedtryckt, och styr undan om det behövs', 'Bromsar hårt och drar i handbromsen samtidigt'],
    explain: 'Med ABS bromsar du så hårt du kan och håller pedalen nedtryckt, även om den vibrerar. ABS hindrar hjulen från att låsa sig, så att du fortfarande kan styra runt faran. Om du pumpar med bromsen blir stoppsträckan längre.',
  },
  'vehicle-13': {
    q: 'Vägen är isig och det kommer en kurva. Din bil har antisladdsystem (ESC). Vad gäller?',
    options: ['ESC gör att du kan ta kurvan i normal sommarhastighet', 'ESC fungerar bara på torr väg', 'Med ESC behöver du inga vinterdäck', 'ESC kan hjälpa till att förhindra sladd, men kan inte sätta fysikens lagar ur spel, så du måste ändå sänka farten'],
    explain: 'ESC bromsar enskilda hjul för att hjälpa bilen att hålla den tänkta kursen, men om du kör för fort för väggreppet kan systemet inte rädda dig. Anpassa hastigheten efter förhållandena.',
  },
  'vehicle-14': {
    q: 'Det är vinter och vägarna ser ut så här. Vilket är det minsta tillåtna mönsterdjupet på vinterdäcken på din bil?',
    options: ['1,6 mm', '3 mm', '5 mm', 'Det finns inget minsta mönsterdjup för vinterdäck'],
    explain: 'Vinterdäck på en personbil ska ha ett mönsterdjup på minst 3 mm när de används vid vinterväglag. 1,6 mm är det minsta mönsterdjupet för sommardäck. Mer mönster än minimikravet ger mycket bättre grepp på snö och snömodd.',
  },
  'vehicle-15': {
    q: 'Du vill att ett litet barn i en bakåtvänd bilbarnstol ska sitta i framsätet på passagerarsidan. Vad måste du kontrollera?',
    options: ['Att krockkudden på passagerarsidan är avstängd', 'Att sätet är skjutet så långt bak som möjligt', 'Ingenting, bakåtvända bilbarnstolar är säkra var som helst', 'Att krockkudden på passagerarsidan är påslagen'],
    explain: 'En bakåtvänd bilbarnstol får aldrig placeras framför en aktiv krockkudde. Om krockkudden löser ut träffar den bilbarnstolens rygg med stor kraft och kan döda barnet.',
  },
  'vehicle-16': {
    q: 'När du trycker på bromspedalen känns den mjuk och går längre ner än vanligt. Vad ska du göra?',
    options: ['Fortsätta köra och pumpa med bromsen när du behöver den', 'Köra vidare men hålla längre avstånd', 'Inte köra bilen förrän bromsarna har kontrollerats och reparerats', 'Fylla på spolarvätska'],
    explain: 'En mjuk eller sjunkande bromspedal är tecken på ett allvarligt bromsfel, till exempel ett läckage eller luft i systemet. Bromsarna kan sluta fungera helt, så kör inte bilen förrän den är reparerad.',
  },
  'vehicle-17': {
    q: 'En röd varningslampa (till exempel oljetryckslampan) tänds på instrumentpanelen medan du kör. Vad gör du?',
    options: ['Stannar så snart det är säkert, stänger av motorn och tar reda på vad som är fel', 'Struntar i den till nästa service', 'Kör fortare för att hinna hem innan något går sönder', 'Stänger av och startar motorn under färd för att nollställa lampan'],
    explain: 'En röd varningslampa betyder ett allvarligt fel. Stanna så snart du kan göra det säkert och stäng av motorn. Om du kör vidare utan oljetryck kan motorn förstöras på några minuter. Gula eller orange lampor betyder oftast att bilen bör kontrolleras snart.',
  },
  'vehicle-18': {
    q: 'Du har långa plankor på ett takräcke och de sticker ut bakom bilen. När måste lasten märkas ut särskilt?',
    options: ['Bara när den sticker ut mer än 3 m', 'Aldrig, så länge du kör långsamt', 'Bara på motorväg', 'När den sticker ut mer än 1 m bakom fordonet'],
    explain: 'Last som sticker ut mer än 1 m bakom fordonet måste vara tydligt utmärkt så att andra ser var den slutar. All last måste också vara säkrad så att den inte kan falla av eller glida.',
  },
  'vehicle-19': {
    q: 'Du lånar en väns bil. Vem ansvarar under körningen för att bilen är i trafiksäkert skick och att lasten är säkrad?',
    options: ['Din vän, eftersom vännen äger bilen', 'Du, som förare', 'Verkstaden som senast servade bilen', 'Besiktningsföretaget'],
    explain: 'Föraren ansvarar under körningen för att fordonet är i trafiksäkert skick och för lasten. Kontrollera ljus, däck och bromsar innan du kör iväg, även i en bil som inte är din.',
  },
  'vehicle-20': {
    q: 'Din bil har fått körförbud efter att ha underkänts vid kontrollbesiktningen. Var får du köra den?',
    options: ['Ingenstans alls, den måste bärgas', 'Var som helst under den första månaden', 'Bara till en ny besiktning, eller till och från en plats där den ska repareras', 'Bara i dagsljus'],
    explain: 'En bil med körförbud får bara köras till en besiktning, eller till och från en reparation, den kortaste lämpliga vägen. All annan körning är förbjuden.',
  },
  'vehicle-21': {
    q: 'Vem ansvarar för att en bil har giltig trafikförsäkring och besiktas i tid?',
    options: ['Ägaren', 'Den som kör bilen mest', 'Den som sålde bilen', 'Polisen'],
    explain: 'Den registrerade ägaren ansvarar för trafikförsäkring, besiktning och fordonsskatt. Föraren ansvarar för att bilen är säker när den körs.',
  },
  'vehicle-22': {
    q: 'Du kör den blå bilen (DU) och vill byta till vänster körfält. Du har tittat i backspeglarna. Vad mer måste du göra?',
    options: ['Titta över vänster axel för att kontrollera döda vinkeln, där bil B kan vara dold', 'Ingenting, backspeglarna visar allt', 'Blinka och byta körfält direkt; bil B måste lämna företräde', 'Tuta innan du byter körfält'],
    explain: 'Backspeglarna lämnar döda vinklar bredvid och strax bakom bilen. Ett fordon som bil B kan vara dolt där, så vrid på huvudet och titta över axeln innan du byter körfält. Att du blinkar ger dig inte rätt att byta körfält.',
  },
});
