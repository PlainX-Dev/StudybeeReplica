import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch15 = Chapter(
  id: 'ch15',
  number: 15,
  title: T('Miljö och sparsam körning', 'Environment and eco-driving'),
  summary: T(
    'Avgaser och vad de gör, sparsam körning i praktiken, drivmedel, miljözoner och '
        'tomgångsregler. Fem frågor på provet kommer härifrån.',
    'Exhaust gases and what they do, eco-driving in practice, fuels, environmental zones and idling '
        'rules. Five test questions come from here.',
  ),
  icon: Icons.eco_rounded,
  colorIndex: 9,
  minutes: 12,
  sections: [
    Section(
      'ch15.1',
      T('Avgaserna och vad de ställer till med', 'Exhaust gases and the damage they do'),
      [
        TableBlock(
          [T('Ämne', 'Substance'), T('Effekt', 'Effect')],
          [
            [
              T('Koldioxid (CO₂)', 'Carbon dioxide (CO₂)'),
              T('växthusgas — påverkar klimatet, minskar bara om du kör kortare eller snålare',
                  'greenhouse gas — affects the climate; only falls if you drive less or leaner')
            ],
            [
              T('Kolmonoxid (CO)', 'Carbon monoxide (CO)'),
              T('giftig, tar syrets plats i blodet — livsfarlig i slutna utrymmen',
                  'poisonous, takes oxygen’s place in the blood — lethal in enclosed spaces')
            ],
            [
              T('Kväveoxider (NOₓ)', 'Nitrogen oxides (NOₓ)'),
              T('försurar mark och vatten, ger andningsbesvär och marknära ozon',
                  'acidifies soil and water, causes breathing problems and ground-level ozone')
            ],
            [
              T('Kolväten (HC)', 'Hydrocarbons (HC)'),
              T('bidrar till marknära ozon, vissa är cancerframkallande',
                  'contribute to ground-level ozone, some are carcinogenic')
            ],
            [
              T('Partiklar (PM)', 'Particulates (PM)'),
              T('tränger ner i lungorna, vanligast från diesel och dubbdäck',
                  'penetrate deep into the lungs, mostly from diesel and studded tyres')
            ],
            [
              T('Svaveldioxid (SO₂)', 'Sulphur dioxide (SO₂)'),
              T('försurning — kraftigt minskad sedan svavlet togs bort ur bränslet',
                  'acidification — much reduced since sulphur was removed from fuel')
            ],
          ],
        ),
        Facts([
          (T('Katalysatorn renar', 'The catalytic converter cleans'),
              T('CO, HC och NOₓ — men inte koldioxid', 'CO, HC and NOₓ — but not carbon dioxide')),
          (T('Katalysatorn fungerar', 'The converter works'),
              T('först när den är varm, efter några kilometer',
                  'only when hot, after a few kilometres')),
          (T('Värst utsläpp', 'Worst emissions'),
              T('de första kilometrarna med kall motor', 'the first kilometres with a cold engine')),
          (T('Partiklar från dubbdäck', 'Particles from studded tyres'),
              T('sliter upp asfalt — stor lokal hälsopåverkan',
                  'grind up asphalt — a big local health impact')),
        ]),
        Hook(T(
          'Katalysatorn tar tre gifter (CO, HC, NOₓ) men rör inte CO₂. Vill du minska koldioxid '
              'finns bara ett sätt: bränn mindre bränsle.',
          'The catalytic converter removes three poisons (CO, HC, NOₓ) but never touches CO₂. There is only '
              'one way to cut carbon dioxide: burn less fuel.',
        )),
        Trap(T(
          'Kolmonoxid (CO) och koldioxid (CO₂) blandas ihop på nästan varje prov. '
              'CO = giftig, färglös, dödar i garaget. CO₂ = klimatet.',
          'Carbon monoxide (CO) and carbon dioxide (CO₂) get mixed up on almost every test. '
              'CO = poisonous, colourless, kills you in the garage. CO₂ = the climate.',
        )),
      ],
    ),
    Section(
      'ch15.2',
      T('Sparsam körning (eco-driving)', 'Eco-driving in practice'),
      [
        Bullets([
          T('Växla upp tidigt — runt 2 000 varv, och hoppa gärna över växlar.',
              'Change up early — around 2 000 rpm, and feel free to skip gears.'),
          T('Kör på högsta möjliga växel med lågt varvtal.',
              'Drive in the highest possible gear at low revs.'),
          T('Planera framåt: rulla mot rödljus i stället för att gasa och bromsa.',
              'Plan ahead: roll towards a red light instead of accelerating and braking.'),
          T('Motorbromsa med växeln i — moderna motorer stryper bränslet helt vid motorbromsning.',
              'Engine brake with the gear engaged — modern engines cut the fuel entirely when doing so.'),
          T('Undvik tomgång. Ska du stå stilla mer än en minut: stäng av motorn.',
              'Avoid idling. Standing still for more than a minute: switch the engine off.'),
          T('Rätt lufttryck i däcken kan spara flera procent bränsle.',
              'Correct tyre pressure can save several percent of fuel.'),
          T('Ta bort takbox och takräcke när de inte används — luftmotståndet växer med kvadraten '
              'på farten.',
              'Remove roof boxes and racks when unused — air resistance grows with the square of speed.'),
          T('Kör inte omkring med onödig vikt i bagageutrymmet.',
              'Do not carry unnecessary weight in the boot.'),
          T('Sänkt hastighet är den enskilt största besparingen: 110 i stället för 120 sparar '
              'omkring 10 procent.',
              'Lower speed is the single biggest saving: 110 instead of 120 saves around 10 percent.'),
        ]),
        Facts([
          (T('Sparsam körning kan sänka förbrukningen', 'Eco-driving can cut consumption by'),
              T('10–20 %', '10–20 %')),
          (T('Motorvärmare vintertid', 'Engine block heater in winter'),
              T('sparar bränsle och minskar utsläpp kraftigt vid kallstart',
                  'saves fuel and cuts cold-start emissions sharply')),
          (T('Tomgång', 'Idling'),
              T('högst 1 minut i de flesta kommuner', 'maximum 1 minute in most municipalities')),
          (T('Airconditionen', 'Air conditioning'),
              T('ökar förbrukningen med några procent', 'adds a few percent to consumption')),
        ]),
        Hook(T(
          'Sparsam körning = mjuk gas, tidig växling, blicken långt fram. Samma tre saker gör '
              'dig också till en säkrare förare — därför älskar provet dem.',
          'Eco-driving = gentle throttle, early gear changes, eyes far ahead. The same three things make you '
              'a safer driver too — which is why the test loves them.',
        )),
      ],
    ),
    Section(
      'ch15.3',
      T('Drivmedel och fordonstyper', 'Fuels and vehicle types'),
      [
        Bullets([
          T('Bensin och diesel är fossila. Diesel ger mer partiklar och kväveoxider, bensin mer '
              'kolmonoxid och kolväten.',
              'Petrol and diesel are fossil fuels. Diesel produces more particulates and NOₓ, petrol more '
                  'carbon monoxide and hydrocarbons.'),
          T('Etanol (E85), biogas, HVO och RME är förnybara och räknas som miljöbränslen.',
              'Ethanol (E85), biogas, HVO and RME are renewable and count as green fuels.'),
          T('Elbilar har inga avgaser alls lokalt; miljöpåverkan ligger i elproduktion och batteritillverkning.',
              'Electric cars have no local exhaust at all; their impact sits in electricity generation and '
                  'battery manufacture.'),
          T('Laddhybrid ger låga utsläpp bara om den faktiskt laddas.',
              'A plug-in hybrid is only low-emission if it is actually plugged in.'),
          T('Partikelfilter i dieselbilar fångar sot och måste regenereras — korta stadsturer sliter på det.',
              'A diesel particulate filter traps soot and must regenerate — short city trips wear it out.'),
        ]),
        Facts([
          (T('Miljözon klass 1', 'Environmental zone class 1'),
              T('reglerar tunga fordon', 'regulates heavy vehicles')),
          (T('Miljözon klass 2', 'Environmental zone class 2'),
              T('kräver minst Euro 5 bensin / Euro 6 diesel för personbil',
                  'requires at least Euro 5 petrol / Euro 6 diesel for cars')),
          (T('Miljözon klass 3', 'Environmental zone class 3'),
              T('endast el-, bränslecells- och vissa gasfordon',
                  'only electric, fuel-cell and certain gas vehicles')),
          (T('Trängselskatt', 'Congestion charge'),
              T('tas ut i Stockholm och Göteborg vissa tider',
                  'levied in Stockholm and Gothenburg at certain times')),
        ]),
      ],
    ),
    Section(
      'ch15.4',
      T('Buller och annan miljöpåverkan', 'Noise and other impacts'),
      [
        Bullets([
          T('Däckbuller dominerar över motorljud redan vid 40 km/h.',
              'Tyre noise dominates over engine noise already at 40 km/h.'),
          T('Buller ger sömnstörningar, stress och hjärt-kärlsjukdom hos dem som bor vid vägen.',
              'Noise causes sleep disturbance, stress and cardiovascular disease for people living by the road.'),
          T('Tvätta bilen i en tvätthall — oljerester och tungmetaller ska inte ner i dagvattnet.',
              'Wash the car in a proper car wash — oil and heavy metals must not run into storm drains.'),
          T('Lämna spillolja, batterier och däck till återvinning.',
              'Take waste oil, batteries and tyres to recycling.'),
          T('Vägsalt skyddar mot halka men skadar mark, grundvatten och bilens plåt.',
              'Road salt fights ice but harms soil, groundwater and the car’s bodywork.'),
        ]),
      ],
    ),
  ],
);
