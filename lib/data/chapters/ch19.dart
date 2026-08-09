import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch19 = Chapter(
  id: 'ch19',
  number: 19,
  title: T('Olycka, säkerhet och första hjälpen', 'Crashes, safety and first aid'),
  summary: T(
    'Bälte, krockkudde, barn i bil, vad lagen kräver på en olycksplats och L-ABC när '
        'någon är skadad.',
    'Belts, airbags, children in cars, what the law demands at a crash scene, and L-ABC when '
        'someone is hurt.',
  ),
  icon: Icons.medical_services_rounded,
  colorIndex: 1,
  minutes: 14,
  sections: [
    Section(
      'ch19.1',
      T('Bälte och krockkudde', 'Belts and airbags'),
      [
        Bullets([
          T('Bältet är obligatoriskt för alla i bilen, både fram och bak. Föraren ansvarar för '
              'att barn under 15 år är fastspända.',
              'Belts are compulsory for everyone, front and rear. The driver is responsible for ensuring '
                  'children under 15 are restrained.'),
          T('Bältet ska sitta tajt över höftbenet och över axeln — aldrig under armen eller bakom ryggen.',
              'The belt must sit tight over the hip bone and across the shoulder — never under the arm or '
                  'behind the back.'),
          T('En obältad person i baksätet kan döda den som sitter framför vid en krock.',
              'An unbelted rear passenger can kill the person in front of them in a crash.'),
          T('Krockkudden är ett komplement till bältet, inte en ersättning. Utan bälte kan den '
              'skada dig allvarligt.',
              'The airbag complements the belt, it does not replace it. Without a belt it can injure you badly.'),
          T('Håll minst 25–30 cm mellan bröstkorgen och ratten.',
              'Keep at least 25–30 cm between your chest and the wheel.'),
          T('Nackskyddet ska nå upp till hjässans nivå och sitta nära bakhuvudet — det förebygger '
              'whiplash.',
              'The head restraint should reach the top of your head and sit close behind it — that is what '
                  'prevents whiplash.'),
        ]),
        Facts([
          (T('Barn kortare än 135 cm', 'Children shorter than 135 cm'),
              T('ska använda bilbarnstol eller bälteskudde',
                  'must use a child seat or booster')),
          (T('Bakåtvänd barnstol', 'Rear-facing child seat'),
              T('rekommenderas till ca 4 års ålder', 'recommended up to about age 4')),
          (T('Bakåtvänd stol i framsätet', 'Rear-facing seat in the front'),
              T('endast om krockkudden är avstängd', 'only if the airbag is switched off')),
          (T('Ansvar för barn under 15 år', 'Responsibility for children under 15'),
              T('förarens', 'the driver’s')),
          (T('Ansvar för egen bältesanvändning från 15 år', 'Own responsibility for the belt from 15'),
              T('passagerarens', 'the passenger’s')),
        ]),
        Trap(T(
          'En bakåtvänd barnstol i framsätet med aktiv krockkudde är livsfarlig — kudden träffar '
              'barnets huvud. Detta är en klassisk provfråga.',
          'A rear-facing child seat in the front with a live airbag is lethal — the bag strikes the child’s '
              'head. This is a classic test question.',
        )),
      ],
    ),
    Section(
      'ch19.2',
      T('Dina skyldigheter vid en olycka', 'Your duties at a crash'),
      [
        Para(T(
          'Lagen kräver att du stannar. Att köra vidare från en olycka du varit inblandad i är '
              'smitning och en grund för att återkalla körkortet.',
          'The law requires you to stop. Driving away from a crash you were involved in is a hit-and-run and '
              'a ground for revoking the licence.',
        )),
        Steps([
          T('Stanna — alltid, även vid en liten skada och även om du inte anser dig vållande.',
              'Stop — always, even for minor damage and even if you consider yourself blameless.'),
          T('Varna andra: varningsblinkers, varselväst, varningstriangel på betryggande avstånd.',
              'Warn others: hazard lights, hi-vis vest, warning triangle at a safe distance.'),
          T('Hjälp skadade och larma 112 om någon är skadad.',
              'Help the injured and call 112 if anyone is hurt.'),
          T('Lämna namn och adress till övriga inblandade, och till den vars egendom skadats.',
              'Give your name and address to everyone involved, and to whoever owns the damaged property.'),
          T('Har du skadat egendom och ingen finns på plats — kontakta ägaren eller polisen.',
              'If you damaged property and nobody is there — contact the owner or the police.'),
          T('Har någon skadats allvarligt eller dött, eller är ni oense: ring polisen.',
              'If someone is seriously hurt or killed, or you disagree about what happened: call the police.'),
        ]),
        Facts([
          (T('Larmnummer', 'Emergency number'), T.same('112')),
          (T('Varningstriangel', 'Warning triangle'),
              T('placeras så att den varnar i god tid — på motorväg långt bakom',
                  'placed so it warns in good time — far back on a motorway')),
          (T('Smitning', 'Leaving the scene'),
              T('brott och grund för återkallelse', 'a crime and grounds for revocation')),
          (T('Viltolycka', 'Wildlife collision'), T('ska alltid anmälas', 'must always be reported')),
        ]),
      ],
    ),
    Section(
      'ch19.3',
      T('L-ABC — ordningen som räddar liv', 'L-ABC — the order that saves lives'),
      [
        Para(T(
          'När flera är skadade och du är ensam måste du prioritera. L-ABC ger dig ordningen — '
              'gör den i tur och ordning, och gå aldrig vidare förrän steget innan är löst.',
          'When several people are hurt and you are alone you must prioritise. L-ABC gives you the order — '
              'work through it and never move on until the previous step is handled.',
        )),
        Steps([
          T('L — Livsfarligt läge. Flytta den skadade bara om platsen är farlig (brand, trafik, vatten).',
              'L — Life-threatening position. Move the casualty only if the place itself is dangerous (fire, '
                  'traffic, water).'),
          T('A — Andning. Skapa fri luftväg: böj huvudet bakåt, lyft hakan. Andas personen inte: '
              'starta HLR, 30 kompressioner och 2 inblåsningar.',
              'A — Airway and breathing. Open the airway: tilt the head back, lift the chin. Not breathing: '
                  'start CPR, 30 compressions and 2 breaths.'),
          T('B — Blödning. Stoppa stora blödningar med direkt tryck och högläge.',
              'B — Bleeding. Stop major bleeding with direct pressure and elevation.'),
          T('C — Chock. Lägg personen ner med benen högt, håll varm, prata lugnande, ge inget att dricka.',
              'C — Circulatory shock. Lay them down with legs raised, keep them warm, talk calmly, give nothing '
                  'to drink.'),
        ]),
        Bullets([
          T('Ta av hjälmen på en motorcyklist bara om du måste för att skapa fri luftväg.',
              'Remove a motorcyclist’s helmet only if you must, to open the airway.'),
          T('Medvetslös som andas läggs i stabilt sidoläge.',
              'An unconscious person who is breathing goes into the recovery position.'),
          T('Chock känns igen på blek, kallsvettig hud, snabb svag puls och oro.',
              'Shock shows as pale clammy skin, a fast weak pulse and anxiety.'),
          T('Stanna hos den skadade och prata — ensamhet förvärrar chocken.',
              'Stay with the casualty and keep talking — being alone makes shock worse.'),
        ]),
        Hook(T(
          'L-A-B-C: Livsfarligt läge, Andning, Blödning, Chock. Fyra bokstäver i den ordningen — '
              'och en fråga på provet nästan varje gång.',
          'L-A-B-C: dangerous Location, Airway, Bleeding, Circulatory shock. Four letters in that order — and '
              'a test question almost every time.',
        )),
      ],
    ),
    Section(
      'ch19.4',
      T('Säkerhetsutrustning i och kring bilen', 'Safety equipment in and around the car'),
      [
        Bullets([
          T('Varningstriangel ska finnas i bilen och användas vid stopp som utgör fara.',
              'A warning triangle must be carried and used when a stop creates danger.'),
          T('Varselväst räddar liv om du måste kliva ur på en mörk väg — förvara den i kupén, '
              'inte i bagageluckan.',
              'A hi-vis vest saves lives if you must step out on a dark road — keep it in the cabin, not the boot.'),
          T('Brandsläckare och första förband är inte lagkrav i Sverige men starkt rekommenderat.',
              'A fire extinguisher and first-aid kit are not legally required in Sweden but strongly recommended.'),
          T('Isskrapa, startkablar och en filt hör till vinterbilen.',
              'An ice scraper, jump leads and a blanket belong in the winter car.'),
          T('eCall larmar automatiskt vid krock i nyare bilar — men ersätter inte att du själv larmar.',
              'eCall alerts the emergency services automatically in newer cars — but does not replace calling '
                  'yourself.'),
        ]),
        Facts([
          (T('Varningstriangel', 'Warning triangle'), T('lagkrav i bilen', 'legally required in the car')),
          (T('Varselväst', 'Hi-vis vest'), T('inte lagkrav, men rekommenderas starkt',
              'not required by law, but strongly recommended')),
          (T('Brandsläckare', 'Fire extinguisher'), T('rekommenderas', 'recommended')),
        ]),
      ],
    ),
  ],
);
