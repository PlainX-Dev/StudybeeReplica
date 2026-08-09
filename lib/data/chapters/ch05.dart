import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch05 = Chapter(
  id: 'ch05',
  number: 5,
  title: T('Varningsmärken (A)', 'Warning signs (A)'),
  summary: T(
    'Alla varningsmärken: vägens form, djur och människor, korsningar och järnväg, '
        'och de faror som inte passar någon annanstans.',
    'Every warning sign: the shape of the road, animals and people, junctions and railways, '
        'and the hazards that fit nowhere else.',
  ),
  icon: Icons.warning_rounded,
  colorIndex: 0,
  minutes: 12,
  sections: [
    Section(
      'ch05.1',
      T('Så läser du ett varningsmärke', 'How to read a warning sign'),
      [
        Para(T(
          'Gul triangel med röd ram: något finns längre fram som du behöver veta om. '
              'Märket förbjuder ingenting och ger dig inga rättigheter — det ger dig tid.',
          'A yellow triangle with a red border: something is ahead that you need to know about. It '
              'prohibits nothing and grants nothing — it gives you time.',
        )),
        Facts([
          (T('Placering inom tättbebyggt område', 'Placement inside built-up areas'),
              T('5–75 meter före faran', '5–75 metres before the hazard')),
          (T('Placering utanför tättbebyggt område', 'Placement outside built-up areas'),
              T('150–250 meter före faran', '150–250 metres before the hazard')),
          (T('Annat avstånd', 'A different distance'),
              T('anges på tilläggstavla', 'is stated on a supplementary plate')),
          (T('Vad du ska göra', 'What you must do'),
              T('anpassa farten så att du kan hantera faran',
                  'adapt your speed so you can handle the hazard')),
        ]),
        Hook(T(
          'Triangel = tänk. Rund = regel. Fyrkant = fakta. Tre former, tre roller — '
              'det är hela vägmärkessystemet i en mening.',
          'Triangle = think. Round = rule. Rectangle = fact. Three shapes, three jobs — that is the whole '
              'sign system in one sentence.',
        )),
      ],
    ),
    Section(
      'ch05.2',
      T('Vägens form och skick', 'The shape and state of the road'),
      [
        SignRow(['A1', 'A2', 'A3', 'A4'],
            caption: T('Kurvor och lutningar', 'Bends and gradients')),
        SignRow(['A5', 'A6', 'A7', 'A25'],
            caption: T('Avsmalning, bro, kaj, mötande trafik',
                'Narrowing, bridge, quay, oncoming traffic')),
        SignRow(['A8', 'A9'],
            caption: T('Ojämn väg och farthinder', 'Uneven road and speed hump')),
        Bullets([
          T('Vid nedförslutning: växla ner och motorbromsa. Ligger du på bromsen hela backen '
              'överhettas de och tappar verkan.',
              'On a descent: change down and engine brake. Riding the brakes down the hill overheats them '
                  'and they fade.'),
          T('Vid avsmalnande väg är den som har hindret på sin sida den som väntar.',
              'Where the road narrows, whoever has the obstacle on their side is the one who waits.'),
          T('Kurvmärket visar åt vilket håll den första kurvan går — läs pilens riktning.',
              'The bend sign shows which way the first bend goes — read the direction of the symbol.'),
        ]),
      ],
    ),
    Section(
      'ch05.3',
      T('Människor och djur', 'People and animals'),
      [
        SignRow(['A13', 'A14', 'A15', 'A16'],
            caption: T('Övergångsställe, gående, barn, cyklande',
                'Crossing, pedestrians, children, cyclists')),
        SignRow(['A17', 'A18', 'A31', 'A32', 'A33'],
            caption: T('Skidåkare, ridande, långsamma fordon, dragdjur, skoter',
                'Skiers, riders, slow vehicles, animal-drawn vehicles, snowmobiles')),
        SignRow(['A19-1', 'A19-2', 'A19-3', 'A19-4', 'A19-5'],
            caption: T('Varning för djur — älg, rådjur, ren, nötkreatur, vildsvin',
                'Animal warnings — elk, deer, reindeer, cattle, wild boar')),
        Bullets([
          T('Varning för barn betyder att du ska räkna med det oförutsägbara, inte bara titta efter barn.',
              'The children sign means expect the unpredictable, not merely look out for children.'),
          T('Ser du ett djur — räkna med fler. Bromsa rakt, väj inte.',
              'See one animal — expect more. Brake straight, do not swerve.'),
          T('Viltolycka ska alltid anmälas till polisen på 112, även om djuret sprang vidare.',
              'A wildlife collision must always be reported to the police on 112, even if the animal ran off.'),
        ]),
      ],
    ),
    Section(
      'ch05.4',
      T('Korsningar, signaler och järnväg', 'Junctions, signals and railways'),
      [
        SignRow(['A28', 'A29', 'A30', 'A22'],
            caption: T('Vägkorsning, prioriterad korsning, cirkulationsplats, signal',
                'Junction, priority junction, roundabout, traffic signals')),
        SignRow(['A35', 'A36', 'A37', 'A38', 'A39'],
            caption: T('Järnvägskorsning med och utan bommar, spårväg, avstånd, kryssmärke',
                'Level crossings with and without barriers, tramway, distance, St Andrew’s cross')),
        Facts([
          (T('Kryssmärke med ett kryss', 'Single St Andrew’s cross'), T('ett spår', 'one track')),
          (T('Kryssmärke med dubbelt kryss', 'Double cross'), T('flera spår', 'several tracks')),
          (T('Avståndsmärke: tre streck', 'Distance sign: three bars'), T('ca 300 m', 'about 300 m')),
          (T('Stanna/parkera vid plankorsning', 'Stopping at a level crossing'),
              T('förbjudet inom 30 m', 'prohibited within 30 m')),
        ]),
        Trap(T(
          'A28 (vanlig korsning) betyder högerregeln. A29 (tjock stam i symbolen) betyder att '
              'du är den prioriterade. Skillnaden är en linjes tjocklek — och hela väjningsplikten.',
          'A28 (plain crossroads) means the right-hand rule. A29 (thick stem in the symbol) means you are '
              'the priority road. The difference is one line’s thickness — and the entire duty to give way.',
        )),
      ],
    ),
    Section(
      'ch05.5',
      T('Övriga faror', 'Other hazards'),
      [
        SignRow(['A10', 'A11', 'A12', 'A27'],
            caption: T('Slirig väg, stenskott, stenras, svag vägkant',
                'Slippery road, chippings, falling rocks, soft verge')),
        SignRow(['A20', 'A21', 'A34', 'A26'],
            caption: T('Vägarbete, slut på vägarbete, kö, tunnel',
                'Roadworks, end of roadworks, queues, tunnel')),
        SignRow(['A23', 'A24', 'A40'],
            caption: T('Lågt flygande flygplan, sidvind, annan fara',
                'Low-flying aircraft, crosswind, other danger')),
        Hook(T(
          'A40 (utropstecknet) är jokern. Ser du den, läs tilläggstavlan — där står vad som '
              'faktiskt väntar.',
          'A40 (the exclamation mark) is the wildcard. When you see it, read the plate underneath — that '
              'is where the actual hazard is named.',
        )),
      ],
    ),
  ],
);
