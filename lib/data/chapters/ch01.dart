import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch01 = Chapter(
  id: 'ch01',
  number: 1,
  title: T('Körkortet och lagen', 'The licence and the law'),
  summary: T(
    'Behörigheter, vägen till körkortet, övningskörning, prövotid och vad som händer när det går fel.',
    'Categories, the road to your licence, supervised driving, the probation period and what happens when it goes wrong.',
  ),
  icon: Icons.badge_rounded,
  colorIndex: 0,
  minutes: 14,
  sections: [
    Section(
      'ch01.1',
      T('Behörigheter — vad får du köra?', 'Categories — what may you drive?'),
      [
        Para(T(
          'Ett körkort är uppdelat i behörigheter. Varje bokstav är en egen rätt att '
              'köra en viss sorts fordon. Provet frågar oftast om B, men det förväntar '
              'sig att du känner igen de andra.',
          'A licence is split into categories. Each letter is a separate right to drive '
              'a certain kind of vehicle. The test mostly asks about B, but it expects '
              'you to recognise the others.',
        )),
        TableBlock(
          [T('Behörighet', 'Category'), T('Får köra', 'May drive'), T('Ålder', 'Age')],
          [
            [
              T.same('AM'),
              T('Moped klass I (EU-moped), max 45 km/h', 'Moped class I (EU moped), max 45 km/h'),
              T.same('15')
            ],
            [
              T.same('A1'),
              T('Lätt motorcykel, max 125 cc / 11 kW', 'Light motorcycle, max 125 cc / 11 kW'),
              T.same('16')
            ],
            [
              T.same('A2'),
              T('Mellanstor motorcykel, max 35 kW', 'Medium motorcycle, max 35 kW'),
              T.same('18')
            ],
            [
              T.same('A'),
              T('Motorcykel utan effektbegränsning', 'Motorcycle with no power limit'),
              T('20 (24 utan A2)', '20 (24 without A2)')
            ],
            [
              T.same('B'),
              T('Personbil och lätt lastbil, totalvikt högst 3 500 kg, högst 8 passagerarplatser',
                  'Car and light truck, gross weight max 3 500 kg, max 8 passenger seats'),
              T.same('18')
            ],
            [
              T.same('B96'),
              T('Bil + släp, sammanlagd totalvikt högst 4 250 kg',
                  'Car + trailer, combined gross weight max 4 250 kg'),
              T.same('18')
            ],
            [
              T.same('BE'),
              T('Bil + släp med totalvikt högst 3 500 kg (ekipage upp till 7 000 kg)',
                  'Car + trailer of max 3 500 kg (combination up to 7 000 kg)'),
              T.same('18')
            ],
            [
              T.same('C1 / C'),
              T('Tung lastbil (C1 upp till 7 500 kg)', 'Heavy truck (C1 up to 7 500 kg)'),
              T.same('18 / 21')
            ],
            [
              T.same('D1 / D'),
              T('Buss (D1 högst 16 passagerare)', 'Bus (D1 max 16 passengers)'),
              T.same('21 / 24')
            ],
          ],
        ),
        Facts([
          (T('B — högsta totalvikt', 'B — max gross weight'), T.same('3 500 kg')),
          (T('B — passagerarplatser', 'B — passenger seats'), T('högst 8 + föraren', 'max 8 + driver')),
          (T('B — släp utan extra behörighet', 'B — trailer with no extra category'),
              T('släpets totalvikt högst 750 kg, eller ekipaget högst 3 500 kg',
                  'trailer max 750 kg gross, or combination max 3 500 kg')),
          (T('Åldersgräns B', 'Minimum age B'), T.same('18')),
          (T('Övningskörning B från', 'Supervised driving B from'), T.same('16')),
        ]),
        Hook(T(
          'B = Bil, 3,5 ton, 8 platser. Tre tal att fästa vid handen: 3-5-0-0 kilo, '
              '8 passagerare, 18 år. Säg dem högt tre gånger — de kommer på provet.',
          'B = car, 3.5 tonnes, 8 seats. Three numbers to nail: 3 500 kilos, 8 passengers, '
              '18 years. Say them out loud three times — they show up on the test.',
        )),
        LawBox(
          T('Körkortslagen (1998:488) 2 kap.', 'Driving Licence Act (1998:488) ch. 2'),
          T(
            'Behörigheten B ger rätt att köra personbil och lätt lastbil med en totalvikt av '
                'högst 3 500 kilogram och som är konstruerad för högst åtta passagerare utöver föraren.',
            'Category B gives the right to drive a car or light truck with a gross weight of at most '
                '3 500 kilograms, built for at most eight passengers besides the driver.',
          ),
        ),
        Trap(T(
          'Frågan gäller ofta totalvikt, inte tjänstevikt. Totalvikt = bilen full med '
              'folk och last. Läser du "tjänstevikt 3 500 kg" är det en annan sak.',
          'The question is usually about gross weight (totalvikt), not kerb weight. Gross weight = '
              'the car fully loaded with people and luggage. If it says "kerb weight 3 500 kg" that is '
              'a different thing entirely.',
        )),
      ],
    ),
    Section(
      'ch01.2',
      T('Vägen till körkortet', 'The road to your licence'),
      [
        Para(T(
          'Ordningen spelar roll, och provet gillar att fråga om vad som måste vara klart '
              'innan vad. Så här ser kedjan ut för behörighet B.',
          'The order matters, and the test likes to ask what has to be done before what. '
              'Here is the chain for category B.',
        )),
        Steps([
          T('Ansök om körkortstillstånd hos Transportstyrelsen. Du fyller i en hälsodeklaration '
              'och lämnar ett synintyg.',
              'Apply for a learner’s permit (körkortstillstånd) from the Transport Agency. You fill in '
                  'a health declaration and submit an eyesight certificate.'),
          T('Övningskör — i trafikskola eller privat med godkänd handledare.',
              'Practise — at a driving school or privately with an approved supervisor.'),
          T('Gå Riskutbildning del 1 (alkohol, droger, trötthet, risker) och del 2 (halkbanan). '
              'Båda gäller i 5 år.',
              'Take Risk training part 1 (alcohol, drugs, fatigue, risk) and part 2 (the skid pan). '
                  'Both are valid for 5 years.'),
          T('Klara teoriprovet (kunskapsprovet).',
              'Pass the theory test (kunskapsprovet).'),
          T('Klara körprovet inom 4 månader från godkänt teoriprov.',
              'Pass the driving test within 4 months of passing the theory test.'),
          T('Körkortet tillverkas och skickas hem. Du får hämta ut det med legitimation.',
              'The licence is produced and posted to you; you collect it with photo ID.'),
        ]),
        Facts([
          (T('Godkänt teoriprov gäller', 'A passed theory test is valid for'), T('4 månader', '4 months')),
          (T('Riskutbildning 1 + 2 gäller', 'Risk training 1 + 2 valid for'), T('5 år', '5 years')),
          (T('Provtid teoriprov', 'Theory test duration'), T('50 minuter', '50 minutes')),
          (T('Antal frågor', 'Number of questions'),
              T('70 (65 räknas + 5 testfrågor)', '70 (65 counted + 5 trial questions)')),
          (T('Godkänt', 'Pass mark'), T('52 av 65 rätt', '52 out of 65 correct')),
          (T('Provspråk', 'Test languages'),
              T('svenska, engelska eller arabiska; tolk kan beviljas',
                  'Swedish, English or Arabic; an interpreter can be granted')),
        ]),
        Hook(T(
          'Kedjan: TILLSTÅND → ÖVNING → RISK 1 & 2 → TEORI → KÖRPROV. '
              'Tänk "TÖRT-K": Tillstånd, Övning, Risk, Teori, Körprov.',
          'The chain: PERMIT → PRACTICE → RISK 1 & 2 → THEORY → DRIVING TEST. '
              'Think "PPRTD" — and remember risk training must be done *before* you may take the driving test.',
        )),
        Trap(T(
          'Riskutbildningen måste vara klar innan körprovet — inte innan teoriprovet. '
              'Och 4-månadersklockan startar när teoriprovet är godkänt.',
          'Risk training must be finished before the *driving* test, not before the theory test. '
              'And the 4-month clock starts when you pass the theory test.',
        )),
      ],
    ),
    Section(
      'ch01.3',
      T('Övningskörning och handledare', 'Supervised driving and the supervisor'),
      [
        Para(T(
          'Vid privat övningskörning är handledaren juridiskt förare. Det är handledaren '
              'som ansvarar för hur bilen framförs — därför är kraven på handledaren hårda.',
          'In private supervised driving the supervisor is legally the driver. The supervisor is '
              'responsible for how the car is driven — which is why the requirements are strict.',
        )),
        Bullets([
          T('Handledaren måste vara minst 24 år.', 'The supervisor must be at least 24 years old.'),
          T('Handledaren ska ha haft B-körkort i minst 5 av de senaste 10 åren.',
              'The supervisor must have held a category B licence for at least 5 of the last 10 years.'),
          T('Handledaren måste ha gått introduktionsutbildning (handledarutbildning) tillsammans med eleven.',
              'The supervisor must have taken the introductory course together with the learner.'),
          T('Handledarskapet godkänns av Transportstyrelsen och gäller i 5 år.',
              'The supervisor approval is granted by the Transport Agency and is valid for 5 years.'),
          T('Eleven måste ha körkortstillstånd och vara minst 16 år.',
              'The learner must hold a learner’s permit and be at least 16.'),
          T('Skylten "Övningskör" (grön) ska sitta väl synlig bakåt.',
              'The green "Övningskör" (learner) sign must be clearly visible from behind.'),
          T('Handledaren omfattas av samma nykterhetskrav som en förare — 0,2 ‰ gäller även hen.',
              'The supervisor is bound by the same sobriety rules as a driver — the 0.2 ‰ limit applies to them too.'),
        ]),
        Facts([
          (T('Handledarens ålder', 'Supervisor’s age'), T('minst 24 år', 'at least 24')),
          (T('Körkortsinnehav', 'Licence held'), T('5 av senaste 10 åren', '5 of the last 10 years')),
          (T('Handledarskapets giltighet', 'Approval valid'), T('5 år', '5 years')),
          (T('Elevens ålder', 'Learner’s age'), T('minst 16 år', 'at least 16')),
          (T('Introduktionsutbildning gäller', 'Introductory course valid for'), T('5 år', '5 years')),
        ]),
        Hook(T(
          '24 – 5 – 16 – 5. Handledaren är 24, har kört i 5 (av 10) år, eleven är 16, '
              'och allt gäller i 5 år. Läs som ett telefonnummer: 24-5-16-5.',
          '24 – 5 – 16 – 5. The supervisor is 24, has driven 5 (of 10) years, the learner is 16, '
              'and everything lasts 5 years. Read it like a phone number: 24-5-16-5.',
        )),
      ],
    ),
    Section(
      'ch01.4',
      T('Prövotid — dina första två år', 'The probation period — your first two years'),
      [
        Para(T(
          'Ett nytt körkort har prövotid i två år. Prövotiden räknas från den dag körkortet '
              'utfärdas första gången — inte från din första behörighet i en annan klass.',
          'A new licence carries a two-year probation period, counted from the day the licence is '
              'first issued — not from some earlier category you may already have held.',
        )),
        Bullets([
          T('Prövotiden är 2 år.', 'The probation period is 2 years.'),
          T('Återkallas körkortet under prövotiden måste du göra om hela förarprovet — '
              'både teoriprov och körprov — efter spärrtiden.',
              'If the licence is revoked during probation you must retake the entire test — both '
                  'theory and driving test — after the disqualification period.'),
          T('Utökar du med en ny behörighet startar ingen ny prövotid, men den gamla löper vidare.',
              'Adding a new category does not start a new probation period; the original one runs on.'),
          T('Prövotiden påverkar inte hastighetsgränser eller promillegränser — de är samma för alla.',
              'Probation does not change speed limits or alcohol limits — those are the same for everyone.'),
        ]),
        Trap(T(
          'Många tror att prövotiden innebär lägre hastighetsgränser eller nollgräns för alkohol. '
              'Fel. Skillnaden är enbart konsekvensen: en återkallelse tvingar fram ett helt nytt förarprov.',
          'Many believe probation means lower speed limits or a zero alcohol limit. It does not. The only '
              'difference is the consequence: a revocation forces you to sit the whole test again.',
        )),
      ],
    ),
    Section(
      'ch01.5',
      T('Återkallelse, varning och spärrtid', 'Revocation, warning and disqualification'),
      [
        Para(T(
          'Körkortslagen räknar upp tio punkter som kan leda till att körkortet återkallas. '
              'Du behöver inte kunna dem i ordning, men du ska känna igen dem.',
          'The Driving Licence Act lists ten grounds for revoking a licence. You do not need them in '
              'order, but you should recognise them.',
        )),
        Bullets([
          T('Rattfylleri eller grovt rattfylleri.', 'Drink-driving or aggravated drink-driving.'),
          T('Smitning från olycksplats.', 'Leaving the scene of an accident.'),
          T('Grov vårdslöshet i trafik.', 'Gross negligence in traffic.'),
          T('Väsentlig överträdelse: fortkörning, rödljus, stopplikt, väjningsplikt, farlig omkörning.',
              'A substantial offence: speeding, running a red light, ignoring a stop or give-way sign, dangerous overtaking.'),
          T('Upprepade förseelser — flera små brott tillsammans.',
              'Repeated offences — several small ones adding up.'),
          T('Opålitlighet i nykterhetshänseende.', 'Being unreliable regarding sobriety.'),
          T('Medicinska skäl: sjukdom eller synfel som gör dig olämplig.',
              'Medical grounds: illness or vision defects making you unfit.'),
          T('Att du inte följt ett villkor i körkortet, t.ex. glasögonkravet.',
              'Failing to comply with a condition on the licence, e.g. the glasses requirement.'),
          T('Att du inte följt föreläggande om läkarintyg.',
              'Failing to comply with an order to submit a medical certificate.'),
          T('Att du begär det själv.', 'Your own request.'),
        ]),
        Facts([
          (T('Spärrtid', 'Disqualification period'), T('1 månad – 3 år', '1 month – 3 years')),
          (T('Vanlig spärrtid vid rattfylleri', 'Typical period for drink-driving'),
              T('12 månader', '12 months')),
          (T('Vanlig spärrtid vid grovt rattfylleri', 'Typical period for aggravated drink-driving'),
              T('minst 24 månader', 'at least 24 months')),
          (T('Alternativ till återkallelse', 'Alternative to revocation'),
              T('varning, om förseelsen är mindre allvarlig', 'a warning, if the offence is less serious')),
        ]),
        Hook(T(
          'Tänk på återkallelsegrunderna som "de fyra F:en": Fylla, Fortkörning, Fly (smitning) '
              'och Fel på förarens hälsa. Resten är varianter.',
          'Think of the grounds as the four F’s: Full (drunk), Fast (speeding), Flee (hit and run) '
              'and Fitness (health). The rest are variations.',
        )),
      ],
    ),
    Section(
      'ch01.6',
      T('Fordonet på papperet: ägande, skatt, försäkring',
          'The car on paper: ownership, tax, insurance'),
      [
        Para(T(
          'Bakom varje bil finns ett vägtrafikregister. Provet frågar gärna om vad ägaren måste '
              'ha ordnat för att bilen lagligt får rulla.',
          'Behind every car sits the vehicle register. The test likes to ask what the owner must have '
              'sorted out before the car may legally roll.',
        )),
        Bullets([
          T('Trafikförsäkring är obligatorisk för alla fordon i trafik. Saknas den tas en '
              'trafikförsäkringsavgift ut — den är dyrare än försäkringen.',
              'Third-party motor insurance is compulsory for every vehicle in use. Without it you pay '
                  'an uninsured-vehicle fee, which costs more than the insurance would have.'),
          T('Trafikförsäkringen täcker skador på andra personer och andras egendom — aldrig din egen bil.',
              'Third-party insurance covers injury to people and damage to other people’s property — never your own car.'),
          T('Halvförsäkring lägger till brand, stöld, glas, maskinskada och räddning. '
              'Helförsäkring lägger till vagnskada på din egen bil.',
              'Partial cover adds fire, theft, glass, machinery damage and recovery. Comprehensive adds '
                  'damage to your own car.'),
          T('Ägarbyte ska anmälas — anmäl direkt vid överlåtelsen så slipper du ansvar för böter och skatt.',
              'A change of owner must be reported — do it at once so you are not left liable for fines and tax.'),
          T('Fordonsskatt ska vara betald. Obetald skatt eller utebliven besiktning ger körförbud.',
              'Vehicle tax must be paid. Unpaid tax or a missed inspection puts the car under a driving ban.'),
          T('Avställd bil får inte köras på väg, inte ens till besiktningen.',
              'A car taken off the road (avställd) may not be driven on public roads, not even to the inspection.'),
        ]),
        Trap(T(
          'Körförbud gäller fordonet, inte föraren. Kör du ett fordon med körförbud är det du som '
              'kör som bötfälls — även om du lånat bilen.',
          'A driving ban attaches to the vehicle, not the driver. If you drive a banned vehicle you get '
              'the fine, even if you only borrowed it.',
        )),
      ],
    ),
  ],
);
