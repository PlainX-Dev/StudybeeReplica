import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch06 = Chapter(
  id: 'ch06',
  number: 6,
  title: T('Väjnings- och förbudsmärken (B, C)', 'Priority and prohibitory signs (B, C)'),
  summary: T(
    'Märkena som bestämmer vem som kör först och vad som är förbjudet — inklusive '
        'hastighet, omkörning och parkering.',
    'The signs that decide who goes first and what is banned — including speed, overtaking and parking.',
  ),
  icon: Icons.do_not_disturb_on_rounded,
  colorIndex: 1,
  minutes: 14,
  sections: [
    Section(
      'ch06.1',
      T('Väjningspliktsmärken (B)', 'Priority signs (B)'),
      [
        SignRow(['B1', 'B2', 'B3', 'B4'],
            caption: T('Väjningsplikt, stopplikt, övergångsställe, huvudled',
                'Give way, stop, pedestrian crossing, priority road')),
        SignRow(['B5', 'B6', 'B7', 'B8'],
            caption: T('Huvudled upphör, möte, mötande väjer, cykelöverfart',
                'End of priority, meeting, oncoming yields, cycle crossing')),
        TableBlock(
          [T('Märke', 'Sign'), T('Du måste', 'You must')],
          [
            [T('B1 Väjningsplikt', 'B1 Give way'),
                T('sakta ner, vara beredd att stanna, väja', 'slow, be ready to stop, yield')],
            [T('B2 Stopplikt', 'B2 Stop'),
                T('stanna helt, varje gång', 'come to a full stop, every time')],
            [T('B4 Huvudled', 'B4 Priority road'),
                T('inget — men var vaksam ändå', 'nothing — but stay alert anyway')],
            [T('B6 Väjningsplikt mot mötande', 'B6 Give way to oncoming'),
                T('vänta tills passagen är fri', 'wait until the gap is clear')],
            [T('B8 Cykelöverfart', 'B8 Cycle crossing'),
                T('väja mot cyklande', 'give way to cyclists')],
          ],
        ),
        Trap(T(
          'B6 och B7 är varandras spegelbild. Den röda pilen visar alltid den som ska vänta. '
              'Är den röda pilen din riktning — då är det du som väjer.',
          'B6 and B7 are mirror images. The red arrow always marks whoever waits. If the red arrow points '
              'your way, you are the one giving way.',
        )),
      ],
    ),
    Section(
      'ch06.2',
      T('Förbud mot vissa fordonsslag', 'Bans on particular vehicles'),
      [
        Para(T(
          'Runt märke med röd ram = förbud. Om inget annat anges gäller förbudet från märket '
              'fram till nästa korsning.',
          'A round sign with a red border = a ban. Unless something else is stated, it applies from the '
              'sign to the next junction.',
        )),
        SignRow(['C1', 'C2', 'C3', 'C4'],
            caption: T('Infart, alla fordon, motordrivna fordon, fler än två hjul',
                'No entry, all vehicles, motor vehicles, more than two wheels')),
        SignRow(['C5', 'C6', 'C7', 'C8', 'C9'],
            caption: T('Motorcykel, släpvagn, tung lastbil, traktor, farligt gods',
                'Motorcycle, trailer, heavy lorry, tractor, dangerous goods')),
        SignRow(['C10', 'C11', 'C12', 'C13', 'C14', 'C15'],
            caption: T('Cykel, moped II, dragdjur, terrängfordon, ridning, gångtrafik',
                'Bicycle, class II moped, animal-drawn, off-road, riding, pedestrians')),
        SignRow(['C44'], caption: T('Förbud mot dubbdäck', 'No studded tyres')),
        Trap(T(
          'C1 (förbud mot infart) och C2 (förbud mot trafik med fordon) blandas ihop. '
              'C1 är en röd rund skiva med en vit stapel — den möter dig i fel ände av en enkelriktad gata.',
          'C1 (no entry) and C2 (no vehicles) get confused. C1 is a red disc with a white bar — you meet it '
              'at the wrong end of a one-way street.',
        )),
      ],
    ),
    Section(
      'ch06.3',
      T('Mått och vikt', 'Dimensions and weight'),
      [
        SignRow(['C16', 'C17', 'C18'],
            caption: T('Bredd, höjd, längd', 'Width, height, length')),
        SignRow(['C19', 'C20', 'C21', 'C22'],
            caption: T('Bruttovikt fordon och fordonståg, axeltryck, boggitryck',
                'Gross weight vehicle and combination, axle load, bogie load')),
        Bullets([
          T('Måtten gäller inklusive last — en cykelhållare eller takbox räknas med.',
              'Dimensions include the load — a bike rack or roof box counts.'),
          T('Bruttovikt är vad fordonet väger just nu, inte vad det får väga.',
              'Gross weight here means what the vehicle weighs right now, not what it may weigh.'),
          T('Fri höjd under 4,5 meter måste skyltas — därför finns höjdmärket över huvud taget.',
              'A clear height below 4.5 metres must be signposted — that is why the height sign exists at all.'),
        ]),
      ],
    ),
    Section(
      'ch06.4',
      T('Hastighet och omkörning', 'Speed and overtaking'),
      [
        SignRow(['C31-30', 'C31-50', 'C31-70', 'C31-110'],
            caption: T('Hastighetsbegränsning', 'Speed limit')),
        SignRow(['C27', 'C28', 'C29', 'C30'],
            caption: T('Omkörningsförbud och slutmärken',
                'Overtaking bans and their end signs')),
        SignRow(['C32', 'C33', 'C34'],
            caption: T('Tillfällig begränsning upphör, stopp vid tull, stopp för ändamål',
                'End of temporary limit, stop at customs, stop for stated purpose')),
        Facts([
          (T('Hastighetsmärket gäller', 'A speed sign applies'),
              T('tills ett nytt märke, en korsning eller tättbebyggt-märke ändrar det',
                  'until another sign, a junction or a built-up area sign changes it')),
          (T('Omkörningsförbud gäller', 'The overtaking ban covers'),
              T('motordrivna fordon — cykel och moped klass II får du passera',
                  'motor vehicles — you may still pass bicycles and class II mopeds')),
          (T('Med släp', 'With a trailer'),
              T('högst 80 km/h även om skylten säger 110',
                  'max 80 km/h even where the sign says 110')),
        ]),
      ],
    ),
    Section(
      'ch06.5',
      T('Parkeringsförbud', 'Parking bans'),
      [
        SignRow(['C35', 'C39', 'C40'],
            caption: T('Förbud att parkera, förbud att stanna och parkera, ändamålsplats',
                'No parking, no stopping or parking, reserved bay')),
        SignRow(['C36', 'C37', 'C38'],
            caption: T('Udda datum, jämnt datum, datumparkering',
                'Odd dates, even dates, date parking')),
        Facts([
          (T('C35 Förbud att parkera', 'C35 No parking'),
              T('du får stanna för av- och påstigning eller lastning',
                  'you may stop to drop off, pick up or load')),
          (T('C39 Förbud att stanna och parkera', 'C39 No stopping or parking'),
              T('du får inte ens stanna, annat än när trafiken kräver det',
                  'you may not even stop, except when traffic requires it')),
          (T('Var förbudet slutar', 'Where the ban ends'),
              T('vid nästa korsning, eller där ett slutmärke sitter',
                  'at the next junction, or where an end sign is posted')),
        ]),
        Hook(T(
          'Ett rött streck = parkera inte. Två röda streck (kryss) = stanna inte heller. '
              'Fler streck, färre möjligheter.',
          'One red stripe = do not park. Two red stripes (a cross) = do not even stop. More stripes, fewer '
              'options.',
        )),
      ],
    ),
  ],
);
