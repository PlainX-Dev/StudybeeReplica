import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch02 = Chapter(
  id: 'ch02',
  number: 2,
  title: T('Grundregler och placering', 'Ground rules and positioning'),
  summary: T(
    'Hänsynsregeln, var på vägen du ska vara, avstånd, tecken, backning och vändning.',
    'The duty of care, where on the road you belong, distance, signalling, reversing and turning around.',
  ),
  icon: Icons.route_rounded,
  colorIndex: 1,
  minutes: 13,
  sections: [
    Section(
      'ch02.1',
      T('Grundreglerna — hela trafiklagens ryggrad',
          'The ground rules — the backbone of the whole traffic code'),
      [
        Para(T(
          'Innan någon detaljregel finns tre grundregler. De gäller alltid, även när ingen '
              'skylt säger något, och de används som facit när en fråga verkar sakna svar.',
          'Before any detailed rule there are three ground rules. They always apply, even when no sign '
              'says anything, and they are the fallback when a question seems to have no answer.',
        )),
        Steps([
          T('Var uppmärksam och visa hänsyn mot alla trafikanter.',
              'Be attentive and show consideration to every road user.'),
          T('Uppträd så att du inte i onödan hindrar eller stör annan trafik.',
              'Behave so that you do not needlessly obstruct or disturb other traffic.'),
          T('Visa särskild hänsyn mot barn, äldre, skolpatruller och personer med funktionsnedsättning.',
              'Show particular care towards children, the elderly, school patrols and people with disabilities.'),
        ]),
        LawBox(
          T('Trafikförordningen (1998:1276) 2 kap. 1 §',
              'Traffic Ordinance (1998:1276) ch. 2 § 1'),
          T(
            'För att undvika trafikolyckor ska en trafikant iaktta den omsorg och varsamhet '
                'som krävs med hänsyn till omständigheterna.',
            'To avoid traffic accidents a road user shall exercise the care and caution required by '
                'the circumstances.',
          ),
        ),
        Hook(T(
          'Om du inte vet svaret på en fråga: välj det alternativ som är mest hänsynsfullt '
              'och minst egoistiskt. Grundreglerna gör att det nästan alltid är rätt.',
          'If you do not know the answer: pick the option that is most considerate and least selfish. '
              'The ground rules make that answer right surprisingly often.',
        )),
      ],
    ),
    Section(
      'ch02.2',
      T('Placering på vägen', 'Positioning on the road'),
      [
        Para(T(
          'Sverige har högertrafik. Du kör så nära högra vägkanten som är lämpligt med hänsyn '
              'till säkerheten — inte i diket, men inte heller i mitten "för att det känns tryggt".',
          'Sweden drives on the right. You keep as close to the right-hand edge as is appropriate for '
              'safety — not in the ditch, but not hogging the middle "because it feels safe" either.',
        )),
        Bullets([
          T('Finns körfält ska du hålla dig i ett av dem — inte grensla linjen.',
              'Where there are lanes, stay inside one of them — do not straddle the line.'),
          T('På väg med flera körfält i din riktning inom tättbebyggt område får du välja det '
              'körfält som passar din färdväg.',
              'On a multi-lane road in your direction inside a built-up area you may choose the lane '
                  'that suits your route.'),
          T('Utanför tättbebyggt område ska du hålla dig i det högra körfältet och bara använda '
              'de vänstra för omkörning eller sväng.',
              'Outside built-up areas keep to the right-hand lane and use the left ones only for '
                  'overtaking or turning.'),
          T('Före högersväng: placera dig långt till höger. Före vänstersväng: nära mittlinjen '
              '(eller i vänster körfält på enkelriktad gata).',
              'Before a right turn: position well to the right. Before a left turn: close to the centre '
                  'line (or in the left lane on a one-way street).'),
          T('Kollektivkörfält är bara för buss, taxi (där det anges) och utryckningsfordon.',
              'Bus lanes are only for buses, taxis (where indicated) and emergency vehicles.'),
          T('Spärrområde (vitmålad triangel/yta) får du inte köra in i.',
              'You may not drive into a hatched exclusion area (spärrområde).'),
        ]),
        Facts([
          (T('Grundprincip', 'Basic principle'), T('Håll till höger', 'Keep right')),
          (T('Byta körfält', 'Changing lane'),
              T('bara när det kan ske utan fara — blinka, kolla spegel + blindfläck',
                  'only when it can be done without danger — indicate, mirror + blind spot')),
          (T('Vävning/ritsläsning', 'Zip merging'),
              T('varannan bil, växelvis, där körfältet tar slut',
                  'every other car, alternating, where the lane ends')),
        ]),
        Trap(T(
          'Att ligga kvar i vänster körfält på motorväg "för att man snart ska svänga" är fel — '
              'du ska tillbaka till höger så snart det är lämpligt efter omkörningen.',
          'Sitting in the left lane on a motorway "because I turn off soon" is wrong — you return to the '
              'right as soon as it is appropriate after overtaking.',
        )),
      ],
    ),
    Section(
      'ch02.3',
      T('Avstånd framåt och i sidled', 'Distance ahead and sideways'),
      [
        Para(T(
          'Avstånd är den billigaste säkerhetsutrustning som finns. Det kostar ingenting och '
              'ger dig tid — och tid är det enda som räddar dig när något oväntat händer.',
          'Distance is the cheapest safety equipment there is. It costs nothing and buys you time — and '
              'time is the only thing that saves you when something unexpected happens.',
        )),
        Facts([
          (T('Torr väg, bra sikt', 'Dry road, good visibility'), T('3 sekunder', '3 seconds')),
          (T('Regn, halka, mörker', 'Rain, slippery road, darkness'),
              T('minst 6 sekunder', 'at least 6 seconds')),
          (T('Bakom tung lastbil', 'Behind a heavy truck'),
              T('extra långt — du ser ingenting annars', 'extra long — otherwise you see nothing')),
          (T('Vid omkörning av cyklist', 'When passing a cyclist'),
              T('minst 1,5 meter i sidled', 'at least 1.5 metres sideways')),
        ]),
        Para(T(
          'Så mäter du tre sekunder: välj ett fast föremål vid vägen — en skylt, en stolpe. '
              'När bilen framför passerar den, räkna "ett tusen ett, ett tusen två, ett tusen tre". '
              'Är du framme innan du är klar ligger du för nära.',
          'How to measure three seconds: pick a fixed object by the road — a sign, a post. When the car '
              'ahead passes it, count "one thousand one, one thousand two, one thousand three". If you '
              'reach it before you finish, you are too close.',
        )),
        Hook(T(
          '3 sekunder torrt, 6 sekunder blött. Dubbla vid dåligt väglag — samma siffra som '
              'bromssträckan gör när friktionen halveras.',
          '3 seconds dry, 6 seconds wet. Double it in bad conditions — the same doubling your braking '
              'distance does when grip is halved.',
        )),
      ],
    ),
    Section(
      'ch02.4',
      T('Tecken och signaler från dig', 'Signals you give'),
      [
        Bullets([
          T('Blinkers ska ges i god tid före varje sväng, körfältsbyte, start från vägkant '
              'och stannande.',
              'Indicate in good time before every turn, lane change, pulling out from the kerb and stopping.'),
          T('Tecknet ska ges tills manövern är klar — och sedan slås av.',
              'Keep the signal on until the manoeuvre is finished — then switch it off.'),
          T('Blinkers ger dig ingen rätt. Den informerar; den fråntar dig inte väjningsplikten.',
              'An indicator grants you no right of way. It informs; it does not remove your duty to give way.'),
          T('Varningsblinkers används vid stillastående fordon som utgör fara, vid bogsering '
              'och vid kö-slut på motorväg.',
              'Hazard lights are for a stationary vehicle that creates danger, when being towed, and to '
                  'warn of the end of a queue on a motorway.'),
          T('Ljudsignal (tuta) får bara användas för att avvärja fara. Ljussignal (blink med helljus) '
              'får användas i samma syfte och vid omkörning utanför tättbebyggt område.',
              'The horn may only be used to avert danger. Flashing headlights may be used for the same '
                  'purpose and when overtaking outside built-up areas.'),
          T('Stopplykta och backljus är också tecken — de tänds automatiskt och andra läser dem.',
              'Brake lights and reversing lights are signals too — they come on automatically and others read them.'),
        ]),
        Trap(T(
          'Du blinkar höger i en cirkulationsplats — men först när du passerat avfarten före din. '
              'Blinkar du för tidigt tolkar den som väntar det som att du svänger ut, och kör.',
          'You indicate right in a roundabout — but only once you have passed the exit before yours. '
              'Indicate too early and the driver waiting reads it as "he is coming out" and pulls into your path.',
        )),
      ],
    ),
    Section(
      'ch02.5',
      T('Backning, vändning och start från vägkant',
          'Reversing, turning around and moving off'),
      [
        Para(T(
          'De här tre manövrarna har en sak gemensamt: du rör dig på ett sätt andra inte förväntar sig. '
              'Därför bär du hela ansvaret.',
          'These three manoeuvres share one thing: you are moving in a way others do not expect. That is '
              'why the entire responsibility is yours.',
        )),
        Bullets([
          T('Backning får bara ske när det kan ske utan fara eller hinder för andra.',
              'Reversing is allowed only when it can be done without danger or obstruction to others.'),
          T('Du har väjningsplikt mot alla när du backar, vänder eller startar från vägkanten.',
              'You must give way to everyone when reversing, turning around or moving off from the kerb.'),
          T('Titta bakåt genom rutan, inte bara i kameran eller spegeln.',
              'Look back through the window, not only at the camera or mirror.'),
          T('Backa aldrig på motorväg eller motortrafikled — inte ens vid missad avfart.',
              'Never reverse on a motorway or clearway — not even if you missed your exit.'),
          T('U-sväng är tillåten om den kan göras utan fara eller hinder, och inte är förbjuden med '
              'skylt eller heldragen linje.',
              'A U-turn is allowed if it can be made without danger or obstruction, and is not banned '
                  'by a sign or a solid line.'),
        ]),
        Facts([
          (T('Väjningsplikt vid backning', 'Duty to give way when reversing'),
              T('mot alla trafikanter', 'to every road user')),
          (T('Backa på motorväg', 'Reversing on a motorway'), T('förbjudet', 'prohibited')),
          (T('Start från vägkant', 'Moving off from the kerb'),
              T('väjningsplikt mot passerande trafik', 'give way to passing traffic')),
        ]),
        Hook(T(
          'Backa – Vända – Starta = "BVS: Bara Ditt Ansvar". I alla tre har du väjningsplikt mot '
              'precis alla.',
          'Reverse – turn around – move off: in all three you give way to absolutely everyone. '
              'No exceptions, no shared blame.',
        )),
      ],
    ),
  ],
);
