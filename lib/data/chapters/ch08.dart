import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch08 = Chapter(
  id: 'ch08',
  number: 8,
  title: T('Vägvisning och tilläggstavlor', 'Guide signs and supplementary plates'),
  summary: T(
    'Färgkoderna på vägvisare, servicemärken, upplysningsmärken och de små gula tavlorna '
        'som ändrar innebörden av märket ovanför.',
    'The colour codes on direction signs, service signs, notice signs, and the small yellow plates '
        'that change what the sign above them means.',
  ),
  icon: Icons.signpost_rounded,
  colorIndex: 3,
  minutes: 9,
  sections: [
    Section(
      'ch08.1',
      T('Vägvisare och service', 'Direction and service signs'),
      [
        Para(T(
          'Färgen på en vägvisare berättar vilken sorts väg målet nås via. Det är hela systemet, '
              'och det frågas om på provet.',
          'The colour of a direction sign tells you what kind of road leads to the destination. That is the '
              'whole system, and the test asks about it.',
        )),
        TableBlock(
          [T('Färg', 'Colour'), T('Betyder', 'Means')],
          [
            [T('Grön', 'Green'), T('motorväg eller motortrafikled', 'motorway or clearway')],
            [T('Blå', 'Blue'), T('annan allmän väg', 'other public road')],
            [T('Vit', 'White'), T('lokalt mål inom tätorten', 'local destination within the town')],
            [T('Gul', 'Yellow'), T('industri- eller verksamhetsområde', 'industrial or business area')],
            [T('Orange', 'Orange'), T('omledning förbi vägarbete eller hinder', 'diversion past roadworks')],
            [T('Brun', 'Brown'), T('turistmål och sevärdheter', 'tourist destinations and attractions')],
          ],
        ),
        SignRow(['F-vägvisare', 'F-motorvägsvisare', 'F-omledning'],
            caption: T('Vägvisare i olika färger', 'Direction signs in different colours')),
        SignRow(['G-drivmedel', 'G-restaurang', 'G-toalett', 'G-sjukhus', 'G-telefon'],
            caption: T('Servicemärken', 'Service signs')),
      ],
    ),
    Section(
      'ch08.2',
      T('Upplysningsmärken och anordningar', 'Notice signs and devices'),
      [
        SignRow(['J-info', 'J-färja', 'X-markeringsskärm'],
            caption: T('Upplysning, färjeläge, markeringsskärm',
                'Notice, ferry berth, barrier board')),
        Bullets([
          T('Markeringsskärmar och stolpar med reflex leder dig förbi hinder och vägarbeten.',
              'Barrier boards and reflective posts guide you past obstacles and roadworks.'),
          T('Snedstrecken på skärmen lutar mot den sida du ska passera på.',
              'The stripes on the board slope towards the side you should pass on.'),
          T('Vid vägarbete gäller flaggvakt och tillfälliga skyltar före de fasta märkena.',
              'At roadworks a flagman and temporary signs override the permanent ones.'),
        ]),
      ],
    ),
    Section(
      'ch08.3',
      T('Tilläggstavlor (T)', 'Supplementary plates (T)'),
      [
        Para(T(
          'Den gula tavlan under ett märke ändrar eller preciserar märkets innebörd. Läser du '
              'inte tavlan har du inte läst skylten.',
          'The yellow plate under a sign changes or narrows what the sign means. If you have not read the '
              'plate, you have not read the sign.',
        )),
        SignRow(['T-avstånd', 'T-sträcka', 'T-tid'],
            caption: T('Avstånd, sträckans längd, tidsangivelse',
                'Distance, length of stretch, time')),
        SignRow(['T-pskiva', 'T-undantag', 'T-rörelsehindrad'],
            caption: T('P-skiva, undantag, rörelsehindrad',
                'Parking disc, exception, disabled permit')),
        Facts([
          (T('Svarta siffror', 'Black figures'), T('vardagar utom dag före helgdag', 'weekdays')),
          (T('Siffror inom parentes', 'Figures in brackets'),
              T('vardag före sön- och helgdag', 'the day before a Sunday or public holiday')),
          (T('Röda siffror', 'Red figures'), T('sön- och helgdagar', 'Sundays and public holidays')),
          (T('Tavla utan tider', 'A plate with no times'),
              T('gäller dygnet runt, alla dagar', 'applies around the clock, every day')),
        ]),
        Hook(T(
          'Svart = vanlig vardag. Parentes = "dagen före". Rött = helg. '
              'Färgen på siffran är hela svaret.',
          'Black = ordinary weekday. Brackets = "the day before". Red = holiday. The colour of the figures '
              'is the entire answer.',
        )),
        Trap(T(
          'En tidsangivelse på en P-tavla betyder att avgiften eller begränsningen gäller under '
              'de tiderna — inte att parkering är förbjuden övrig tid.',
          'A time on a parking plate means the charge or restriction applies during those hours — not that '
              'parking is banned outside them.',
        )),
      ],
    ),
  ],
);
