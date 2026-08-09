import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch07 = Chapter(
  id: 'ch07',
  number: 7,
  title: T('Påbuds- och anvisningsmärken (D, E)', 'Mandatory and instruction signs (D, E)'),
  summary: T(
    'Blå märken: de runda säger vad du måste göra, de fyrkantiga berättar vilka regler '
        'som gäller på just den här vägen.',
    'Blue signs: the round ones tell you what you must do, the rectangular ones tell you which rules '
        'apply on this particular road.',
  ),
  icon: Icons.turn_slight_right_rounded,
  colorIndex: 2,
  minutes: 12,
  sections: [
    Section(
      'ch07.1',
      T('Påbudsmärken (D)', 'Mandatory signs (D)'),
      [
        Para(T(
          'Blå rund skiva med vit symbol: du MÅSTE göra det symbolen visar. Påbudet gäller i '
              'korsningen närmast efter märket, eller där det sätts upp.',
          'A blue disc with a white symbol: you MUST do what the symbol shows. It applies at the junction '
              'immediately after the sign, or where it is posted.',
        )),
        SignRow(['D1-1', 'D1-2', 'D1-3', 'D1-4', 'D1-5', 'D1-6'],
            caption: T('Påbjuden körriktning', 'Mandatory direction of travel')),
        SignRow(['D2', 'D3', 'D10', 'D11'],
            caption: T('Påbjuden körbana, cirkulationsplats, kollektivkörfält, slutmärke',
                'Mandatory carriageway, roundabout, bus lane, end sign')),
        SignRow(['D4', 'D5', 'D6', 'D7', 'D8'],
            caption: T('Cykelbana, gångbana, gemensam bana, delade banor, ridväg',
                'Cycle path, footpath, shared path, separated paths, bridleway')),
        Trap(T(
          'D3 (cirkulationsplats) ger dig ingen väjningsplikt i sig — den säger bara "kör medurs". '
              'Väjningsplikten kommer från B1 vid infarten, som nästan alltid sitter där.',
          'D3 (roundabout) creates no duty to give way by itself — it only says "go clockwise". The duty '
              'comes from the B1 give-way sign at the entry, which is almost always there.',
        )),
      ],
    ),
    Section(
      'ch07.2',
      T('Vägtyper och områden (E)', 'Road types and zones (E)'),
      [
        SignRow(['E1', 'E2', 'E3', 'E4'],
            caption: T('Motorväg och motortrafikled, början och slut',
                'Motorway and clearway, start and end')),
        SignRow(['E5', 'E6'],
            caption: T('Tättbebyggt område börjar och upphör',
                'Built-up area begins and ends')),
        SignRow(['E7', 'E8', 'E9', 'E10'],
            caption: T('Gågata och gångfartsområde, början och slut',
                'Pedestrian street and walking-speed zone, start and end')),
        SignRow(['E11', 'E13'],
            caption: T('Rekommenderad lägre och högsta hastighet',
                'Recommended lower and maximum speed')),
        Facts([
          (T('E5 Tättbebyggt område', 'E5 Built-up area'),
              T('50 km/h och tätortsregler gäller', '50 km/h and urban rules apply')),
          (T('E6 Tättbebyggt område upphör', 'E6 End of built-up area'),
              T('70 km/h gäller om inget annat skyltas', '70 km/h unless otherwise posted')),
          (T('E9 Gångfartsområde', 'E9 Walking-speed zone'),
              T('gångfart, väjningsplikt mot gående, parkering endast på markerade platser',
                  'walking pace, give way to pedestrians, parking only in marked bays')),
          (T('Utfart från E7 eller E9', 'Leaving E7 or E9'),
              T('väjningsplikt mot alla', 'give way to everyone')),
        ]),
        Hook(T(
          'Blå fyrkant = "så funkar den här vägen". Rund blå = "gör så här". '
              'Förväxlar du dem, tänk: fyrkanten informerar, cirkeln beordrar.',
          'Blue rectangle = "here is how this road works". Blue circle = "do this". If you mix them up: '
              'the rectangle informs, the circle commands.',
        )),
      ],
    ),
    Section(
      'ch07.3',
      T('Övriga anvisningsmärken', 'Other instruction signs'),
      [
        SignRow(['E16', 'E17', 'E18', 'E19', 'E20'],
            caption: T('Sammanvävning, enkelriktat, återvändsväg, mötesplats, parkering',
                'Merging, one-way, dead end, passing place, parking')),
        Bullets([
          T('Vid sammanvävning väver ni varannan bil. Det är både lagligt och snabbast.',
              'At a merge, take turns every other car. It is both legal and fastest.'),
          T('På enkelriktad gata får du parkera på båda sidor om inget annat anges — och köra om till höger.',
              'On a one-way street you may park on both sides unless stated otherwise — and overtake on the right.'),
          T('P-märket i sig säger inget om tid eller avgift. Det står på tilläggstavlan.',
              'The P sign itself says nothing about time or fees. That is on the supplementary plate.'),
        ]),
      ],
    ),
  ],
);
