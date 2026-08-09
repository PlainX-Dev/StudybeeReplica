import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch09 = Chapter(
  id: 'ch09',
  number: 9,
  title: T('Vägmarkeringar och signaler', 'Road markings and signals'),
  summary: T(
    'Linjerna i asfalten, trafiksignalerna och polisens tecken — och i vilken ordning '
        'de gäller när de säger emot varandra.',
    'The lines in the asphalt, the traffic lights and police signals — and which one wins when they '
        'contradict each other.',
  ),
  icon: Icons.traffic_rounded,
  colorIndex: 4,
  minutes: 12,
  sections: [
    Section(
      'ch09.1',
      T('Längsgående linjer', 'Longitudinal lines'),
      [
        SignRow(['M-mitt', 'M-varning', 'M-spärr', 'M-kombi'],
            caption: T('Mittlinje, varningslinje, spärrlinje, kombinerad linje',
                'Centre line, warning line, solid line, combined line')),
        SignRow(['M-kant', 'M-körfält'],
            caption: T('Kantlinje och körfältslinje', 'Edge line and lane line')),
        TableBlock(
          [T('Linje', 'Line'), T('Utseende', 'Looks like'), T('Får du korsa?', 'May you cross?')],
          [
            [T('Mittlinje', 'Centre line'), T('korta streck, långa glapp', 'short dashes, long gaps'),
                T('Ja', 'Yes')],
            [T('Varningslinje', 'Warning line'), T('långa streck, korta glapp', 'long dashes, short gaps'),
                T('Ja, men något gör det olämpligt', 'Yes, but something makes it unwise')],
            [T('Spärrlinje', 'Solid line'), T('heldragen', 'continuous'),
                T('Nej', 'No')],
            [T('Kombinerad', 'Combined'), T('en heldragen + en streckad', 'one solid + one dashed'),
                T('Följ linjen närmast dig', 'Follow the line nearest you')],
          ],
        ),
        Trap(T(
          'Vid kombinerad linje gäller din egen sida. Är den streckad på din sida får du korsa, '
              'även om den mötande inte får.',
          'With a combined line, your own side decides. If the line on your side is dashed you may cross, '
              'even though oncoming traffic may not.',
        )),
      ],
    ),
    Section(
      'ch09.2',
      T('Tvärgående markeringar och ytor', 'Transverse markings and areas'),
      [
        SignRow(['M-stopp', 'M-väjning', 'M-övergång', 'M-cykel'],
            caption: T('Stopplinje, väjningslinje, övergångsställe, cykelpassage',
                'Stop line, give-way line, crossing, cycle passage')),
        SignRow(['M-spärromr', 'M-parkruta', 'M-hållplats'],
            caption: T('Spärrområde, parkeringsruta, hållplats',
                'Hatched area, parking bay, bus stop')),
        Bullets([
          T('Väjningslinjens trianglar ("hajtänder") pekar mot den som har väjningsplikt.',
              'The triangles of the give-way line ("shark teeth") point at whoever must yield.'),
          T('Spärrområde får du varken köra in på eller stanna i.',
              'You may neither drive into nor stop in a hatched area.'),
          T('Gul markering betyder att stannande eller parkering är begränsad.',
              'A yellow marking means stopping or parking is restricted.'),
          T('Saknas markeringar gäller ändå alla vanliga regler — snö döljer linjer, inte lagar.',
              'Missing markings change nothing about the rules — snow hides lines, not laws.'),
        ]),
      ],
    ),
    Section(
      'ch09.3',
      T('Trafiksignaler', 'Traffic signals'),
      [
        SignRow(['S-röd', 'S-rödgul', 'S-gul', 'S-grön', 'S-blinkgul'],
            caption: T('Signalbilderna i tur och ordning', 'The signal sequence')),
        Facts([
          (T('Rött', 'Red'), T('stanna före stopplinjen', 'stop before the line')),
          (T('Rött + gult', 'Red + amber'),
              T('grönt kommer — men du får ännu inte köra', 'green is coming — but you still may not go')),
          (T('Gult', 'Amber'),
              T('stanna, om du kan göra det utan fara', 'stop, if you can do it safely')),
          (T('Grönt', 'Green'),
              T('kör om vägen är fri och du kan lämna korsningen',
                  'go if the road is clear and you can clear the junction')),
          (T('Blinkande gult', 'Flashing amber'),
              T('signalen ur funktion — vanliga väjningsregler gäller',
                  'signal out of service — normal priority rules apply')),
          (T('Grön pil', 'Green arrow'),
              T('fri väg i pilens riktning, men väj mot gående',
                  'clear in the arrow’s direction, but give way to pedestrians')),
        ]),
        Trap(T(
          'Grönt ljus betyder inte "kör". Det betyder "du får köra om vägen är fri". '
              'Kör aldrig in i en korsning du inte kan lämna.',
          'Green does not mean "go". It means "you may go if the road is clear". Never enter a junction you '
              'cannot clear.',
        )),
      ],
    ),
    Section(
      'ch09.4',
      T('Polisens tecken och rangordningen', 'Police signals and the pecking order'),
      [
        SignRow(['S-polis-stopp', 'S-polis-kör'],
            caption: T('Stopp och kör fram', 'Stop and proceed')),
        Steps([
          T('Polisman eller annan vakt.', 'A police officer or other traffic warden.'),
          T('Trafiksignal.', 'Traffic signals.'),
          T('Vägmärke.', 'Road signs.'),
          T('Vägmarkering.', 'Road markings.'),
          T('Allmänna trafikregler, till exempel högerregeln.',
              'General traffic rules, for example the right-hand rule.'),
        ]),
        Hook(T(
          'Polis slår signal, signal slår skylt, skylt slår målad linje, linje slår högerregeln. '
              'Fem nivåer — lär dem uppifrån och ner och du löser varje krockfråga.',
          'Police beat lights, lights beat signs, signs beat paint, paint beats the right-hand rule. Five '
              'levels — learn them top down and every conflict question solves itself.',
        )),
        Bullets([
          T('Polismans tecken gäller alltid först, även mot grönt ljus.',
              'A police officer’s signal always comes first, even against a green light.'),
          T('Uppsträckt arm = stopp för alla som möter armen.',
              'A raised arm = stop for everyone facing it.'),
          T('Utsträckt arm åt sidan = stopp för trafik som kommer mot armen, fri väg längs armen.',
              'An arm out to the side = stop for traffic facing the arm, clear along it.'),
          T('Vid vägarbete gäller flaggvaktens tecken på samma sätt.',
              'At roadworks a flagman’s signals work the same way.'),
        ]),
      ],
    ),
  ],
);
