/* Svenska: Svängar, placering, körfält, cirkulationsplatser, U-svängar, sammanflätning, körfältsbyten och backning */
SV.q({
  'turning-01': {
    q: 'Du ska svänga höger i den här korsningen. Var ska bilen vara placerad innan du svänger?',
    options: ['Nära vägens högra kant', 'Nära mittlinjen', 'Mitt på vägen, så att svängen blir vidare'],
    explain: 'Före en högersväng placerar du bilen nära vägens högra kant, och du svänger i en snäv kurva in på den högra sidan av den nya vägen.',
  },
  'turning-02': {
    q: 'Du ska svänga vänster på en vanlig väg med dubbelriktad trafik. Var ska bilen vara placerad innan du svänger?',
    options: ['Nära vägens högra kant', 'Nära mittlinjen, på din sida av den', 'Över mittlinjen, i det mötande körfältet'],
    explain: 'Före en vänstersväng på en väg med dubbelriktad trafik placerar du bilen nära mittlinjen men på din egen sida av den. Trafiken bakom kan då passera till höger om dig.',
  },
  'turning-03': {
    q: 'Du kör på en enkelriktad gata och ska svänga vänster. Var ska du placera bilen?',
    options: ['Nära den högra kanten', 'Mitt på gatan', 'Nära den vänstra kanten'],
    explain: 'På en enkelriktad gata finns ingen mötande trafik, så före en vänstersväng flyttar du dig ut nära den vänstra kanten.',
  },
  'turning-04': {
    q: 'Du ska svänga höger. Cyklist B cyklar rakt fram, strax framför dig till höger. Vad gör du?',
    options: ['Svänger snabbt framför cyklisten', 'Låter cyklisten passera först och svänger sedan', 'Tutar så att cyklisten stannar'],
    explain: 'När du svänger höger korsar du vägen för cyklister som ska rakt fram. Titta i backspegeln och i döda vinkeln, och låt dem passera innan du svänger.',
  },
  'turning-05': {
    q: 'Du svänger vänster. Fotgängare P går på övergångsstället på vägen som du svänger in på. Vad gör du?',
    options: ['Stannar före övergångsstället och låter P gå över', 'Kör bakom P när P har passerat mitten', 'Svänger: P måste vänta på trafiken'],
    explain: 'När du svänger har du väjningsplikt mot gående som korsar vägen du svänger in på, och vid ett obevakat övergångsställe mot alla som är på det eller på väg ut på det.',
  },
  'turning-06': {
    q: 'Omärkt korsning. Du ska svänga vänster. Mötande bil B svänger höger in på samma väg. Kan du svänga nu?',
    options: ['Ja, eftersom B svänger', 'Ja, eftersom B är till vänster om dig', 'Nej, du har väjningsplikt mot B'],
    explain: 'När du svänger vänster har du väjningsplikt mot mötande fordon som kör rakt fram eller svänger höger. B svänger höger in på samma väg, så B kör först.',
  },
  'turning-07': {
    q: 'Omärkt korsning. Du ska svänga höger. Mötande bil B ska svänga vänster in på samma väg. Vem kör först?',
    options: ['Du kör först', 'B kör först', 'Den som kommer först till korsningen'],
    explain: 'B svänger vänster och har väjningsplikt mot mötande trafik som kör rakt fram eller svänger höger, alltså mot dig.',
  },
  'turning-08': {
    q: 'Det här märket står där du kör fram mot korsningen. Får du svänga höger här?',
    options: ['Ja, om det inte kommer någon trafik', 'Nej, det är förbjudet att svänga höger', 'Ja, det är bara bilar med släp som inte får'],
    explain: 'Märket betyder förbud mot sväng höger för fordon i den här korsningen. Du måste köra rakt fram eller svänga vänster i stället.',
  },
  'turning-09': {
    q: 'Det här märket står där du kör fram mot korsningen, och du ville svänga vänster. Vad gör du?',
    options: ['Svänger försiktigt vänster', 'Kör rakt fram och hittar en annan väg', 'Gör en U-sväng i korsningen'],
    explain: 'Det runda blå märket är ett påbudsmärke: du måste köra rakt fram. Det är inte tillåtet att svänga vänster (eller att vända) här.',
  },
  'turning-10': {
    q: 'Det här märket står där du kör fram mot korsningen. Du ska svänga vänster. Är det tillåtet?',
    options: ['Ja, märket förbjuder bara U-sväng', 'Nej, märket förbjuder alla vänstersvängar', 'Nej, du måste köra rakt fram'],
    explain: 'Märket förbjuder bara U-sväng. Det är fortfarande tillåtet att svänga vänster in på den korsande vägen.',
  },
  'turning-11': {
    q: 'Du vill göra en U-sväng i korsningen. Bil B kommer emot dig. Vad gör du?',
    options: ['Svänger innan B kommer fram: B får sakta in', 'Väntar tills B har passerat; vänder bara om du inte hindrar någon', 'U-sväng är bara tillåten vid trafiksignaler'],
    explain: 'Du får bara göra en U-sväng om det kan ske utan fara eller hinder för annan trafik. Låt B passera först.',
  },
  'turning-12': {
    q: 'Du ska köra in i cirkulationsplatsen. Bil B är redan i cirkulationsplatsen och kommer från vänster. Vad gör du?',
    options: ['Kör in först: B är till vänster om dig', 'Lämnar företräde åt B och kör sedan in', 'Kör in samtidigt, sida vid sida'],
    explain: 'Cirkulationsplatser i Sverige har normalt märket för väjningsplikt vid varje infart, så du har väjningsplikt mot trafik som redan är i cirkulationsplatsen.',
  },
  'turning-13': {
    q: 'Du kör redan i cirkulationsplatsen. Bil B väntar vid infarten framför dig, där det finns ett märke för väjningsplikt. Vem kör först?',
    options: ['B, eftersom B är till höger om dig', 'Du kör först', 'Den som blinkar först'],
    explain: 'B har väjningsplikt och måste lämna företräde åt dig, eftersom du redan är i cirkulationsplatsen.',
  },
  'turning-14': {
    q: 'Du ska lämna cirkulationsplatsen vid första avfarten. Hur blinkar du?',
    options: ['Höger blinker, och den är på tills du har kört ut', 'Vänster blinker, eftersom du kör in i cirkulationsplatsen', 'Ingen blinker: du följer bara vägen'],
    explain: 'Du blinkar alltid höger innan du lämnar en cirkulationsplats. När det är den första avfarten blinkar du höger redan när du kör fram mot cirkulationsplatsen.',
  },
  'turning-15': {
    q: 'Du ska lämna cirkulationsplatsen vid avfarten till vänster i bilden (W). När ska du slå på höger blinker?',
    options: ['Redan innan du kör in i cirkulationsplatsen', 'När du har passerat avfarten före din', 'Aldrig: färdvägen är en vänstersväng, så du blinkar vänster när du kör ut'],
    explain: 'Blinka höger när du har passerat avfarten före den du ska ta. Om du blinkar tidigare tror förare som väntar vid de tidigare in- och utfarterna att du ska köra ut där.',
  },
  'turning-16': {
    q: 'Du kör i det inre körfältet i en cirkulationsplats med två körfält och vill ta nästa avfart. En bil kör bredvid dig i det yttre körfältet. Vad gör du?',
    options: ['Kör ut mot avfarten: bilar i det yttre körfältet måste släppa ut dig', 'Lämnar företräde åt bilen i det yttre körfältet innan du byter körfält', 'Tutar och byter körfält'],
    explain: 'Att flytta sig från det inre till det yttre körfältet är ett körfältsbyte, och när du byter körfält har du väjningsplikt mot trafiken i det körfält du byter till.',
  },
  'turning-17': {
    q: 'Du står vid en infart med väjningsplikt. Cirkulationsplatsen är tom. Bil B väntar vid nästa infart, till höger om dig. Måste du vänta på B?',
    options: ['Ja, B kommer från höger', 'Nej, du får köra in: B är inte i cirkulationsplatsen', 'Ja, den bil som kom först kör först'],
    explain: 'Väjningsplikten gäller mot trafik som redan är i cirkulationsplatsen. B är inte där än. När du väl är i cirkulationsplatsen har B väjningsplikt mot dig.',
  },
  'turning-18': {
    q: 'Du kör i ett körfält med en körfältspil som pekar rakt fram. Du inser att du ville svänga höger. Vad gör du?',
    options: ['Svänger höger från ditt körfält om ingen kommer', 'Följer pilen och kör rakt fram, och hittar sedan en annan väg', 'Stannar och väntar på en lucka för att byta till körfältet för högersväng'],
    explain: 'Körfältspilar visar åt vilket håll du ska köra från det körfältet. Om du ligger i fel körfält följer du pilen och hittar en annan väg, i stället för att svänga eller stanna.',
  },
  'turning-19': {
    q: 'Du vill byta till vänster körfält. Bil B kör i vänster körfält, en bit bakom dig. Vem har väjningsplikt?',
    options: ['Du har väjningsplikt mot B', 'B måste släppa in dig när du blinkar', 'Den som ligger först'],
    explain: 'Den som byter körfält har väjningsplikt mot trafiken i det körfält man byter till. Att blinka ger dig inte företräde. Titta först i backspegeln och i döda vinkeln.',
  },
  'turning-20': {
    q: 'Vänster körfält tar slut vid konerna. Trafiken går långsamt och det är kö. Bil B i vänster körfält vill köra in framför dig. Hur ska du göra?',
    options: ['Minska avståndet så att B inte kommer in', 'Håller jämn fart och släpper in B: varannan bil från varje körfält', 'Stannar och vinkar in alla bilar från vänster körfält'],
    explain: 'I långsam trafik där två körfält blir ett använder ni blixtlåsprincipen: förarna turas om, en från varje körfält. B, som byter körfält, måste se till att det är säkert, men du bör samarbeta.',
  },
  'turning-21': {
    q: 'Trafiken står i långsam kö. Ditt körfält tar slut vid konerna längre fram. Var ska du byta in?',
    options: ['Stanna nu och vänta på en stor lucka', 'Kör vidare i ditt körfält till nära där det tar slut, och byt sedan in varannan bil', 'Kör på vägrenen förbi kön'],
    explain: 'I långsam trafik med kö är det bäst att använda båda körfälten fram till där det ena tar slut och sedan turas om att byta in (blixtlåsprincipen). Du måste ändå se till att körfältsbytet är säkert.',
  },
  'turning-22': {
    q: 'Du har kört förbi avfarten du skulle ta på en motorväg. Vad får du göra?',
    options: ['Backa försiktigt på vägrenen', 'Göra en U-sväng genom en öppning i mittremsan', 'Fortsätta till nästa avfart'],
    explain: 'Det är förbjudet att backa och göra U-sväng på motorväg. Kör vidare till nästa avfart.',
  },
  'turning-23': {
    q: 'När du backar ut från en parkeringsplats ut på en gata, vem har väjningsplikt?',
    options: ['Du har väjningsplikt mot all annan trafik', 'Trafiken på gatan måste stanna för dig', 'Bara gående har väjningsplikt mot dig'],
    explain: 'Du får bara backa om det kan ske utan fara eller hinder för andra. Backa långsamt, titta runt om bilen och låt andra passera.',
  },
  'turning-24': {
    q: 'När du svänger vänster i en korsning mellan vägar med dubbelriktad trafik, var ska bilen hamna?',
    options: ['I den högra halvan av vägen du svänger in på', 'I den vänstra halvan, och sedan flytta över', 'Där det finns plats'],
    explain: 'Efter svängen måste du vara på den högra sidan av den nya vägen. Skär inte genom kurvan in i körfältet som är avsett för trafik som kommer emot dig.',
  },
  'turning-25': {
    q: 'Det här märket står där du kör fram mot korsningen. Var måste du köra?',
    options: ['Rakt fram eller till höger', 'Du måste svänga höger', 'Till höger, eller göra en U-sväng'],
    explain: 'Ett runt blått märke med en pil är ett påbudsmärke: här måste du svänga höger.',
  },
  'turning-26': {
    q: 'Du blinkar för att visa att du vill byta körfält. Vad ger blinkningen dig?',
    options: ['Företräde framför trafiken i det andra körfältet', 'Inget mer än att andra får veta vad du tänker göra', 'Rätt att byta körfält efter tre blinkningar'],
    explain: 'Blinkern talar bara om för andra vad du tänker göra. Du måste ändå kontrollera att körfältsbytet är säkert och lämna företräde åt trafiken i det andra körfältet.',
  },
});
