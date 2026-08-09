import '../../core/l10n.dart';
import '../../models/content.dart';
import 'sign_art.dart';

const _pedAndBike = '<g transform="translate(-22,0) scale(0.6)">$pedWhite</g>'
    '<g transform="translate(30,14) scale(0.52)">$bikeWhite</g>';

const _splitPedBike = '<rect x="48" y="6" width="4" height="88" fill="$kWhite"/>'
    '<g transform="translate(-26,10) scale(0.46)">$bikeWhite</g>'
    '<g transform="translate(38,10) scale(0.46)">$pedWhite</g>';

const _endSlash = '<path d="M12 88 L88 12" stroke="#C8102E" stroke-width="9" stroke-linecap="round"/>';

const _weave = '<g fill="none" stroke="$kWhite" stroke-width="9" stroke-linecap="round">'
    '<path d="M26 92 V52 c0 -16 22 -16 22 -32 V8"/><path d="M74 92 V52 c0 -16 -22 -16 -22 -32 V8"/></g>';

const _deadEnd = '<g fill="$kWhite"><rect x="42" y="34" width="16" height="60"/>'
    '<rect x="20" y="18" width="60" height="14" rx="4"/></g>';

const _passingPlace = '<g fill="$kWhite"><rect x="42" y="6" width="16" height="88"/>'
    '<path d="M58 30 h26 v34 H58 z"/></g>';

const _lowerSpeed = '<g fill="$kWhite"><circle cx="50" cy="50" r="40"/></g>'
    '<circle cx="50" cy="50" r="34" fill="$kBlue"/>';

/// D — mandatory signs. Blue disc: *this is what you must do*.
final signsD = <RoadSign>[
  RoadSign(
    id: 'D1-1',
    cat: SignCat.mandatory,
    name: T('Påbjuden körriktning — rakt fram', 'Mandatory direction — straight ahead'),
    meaning: T('Du måste köra rakt fram. Påbudet gäller i korsningen efter märket.',
        'You must drive straight on. The instruction applies at the junction after the sign.'),
    svg: mandatory(arrowUp()),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D1-2',
    cat: SignCat.mandatory,
    name: T('Påbjuden körriktning — höger', 'Mandatory direction — right'),
    meaning: T('Du måste svänga höger.', 'You must turn right.'),
    svg: mandatory(arrowRight()),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D1-3',
    cat: SignCat.mandatory,
    name: T('Påbjuden körriktning — vänster', 'Mandatory direction — left'),
    meaning: T('Du måste svänga vänster.', 'You must turn left.'),
    svg: mandatory(arrowLeft()),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D1-4',
    cat: SignCat.mandatory,
    name: T('Påbjuden körriktning — rakt fram eller höger',
        'Mandatory direction — straight or right'),
    meaning: T('Du får köra rakt fram eller svänga höger, men inte vänster.',
        'You may go straight on or turn right, but not left.'),
    svg: mandatory(arrowUpRight()),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D1-5',
    cat: SignCat.mandatory,
    name: T('Påbjuden körriktning — rakt fram eller vänster',
        'Mandatory direction — straight or left'),
    meaning: T('Du får köra rakt fram eller svänga vänster.',
        'You may go straight on or turn left.'),
    svg: mandatory(arrowUpLeft()),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D1-6',
    cat: SignCat.mandatory,
    name: T('Påbjuden körriktning — höger eller vänster',
        'Mandatory direction — right or left'),
    meaning: T('Du måste svänga, åt något håll — rakt fram är inte tillåtet.',
        'You must turn, either way — straight on is not allowed.'),
    svg: mandatory(arrowsBoth()),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D2',
    cat: SignCat.mandatory,
    name: T('Påbjuden körbana', 'Mandatory carriageway'),
    meaning: T('Du ska passera hindret på den sida pilen visar.',
        'Pass the obstacle on the side the arrow shows.'),
    svg: mandatory(arrowUpRight()),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D3',
    cat: SignCat.mandatory,
    name: T('Cirkulationsplats', 'Roundabout'),
    meaning: T('Kör medurs runt rondellen. Märket i sig ger ingen väjningsplikt — det gör '
        'väjningspliktsmärket vid infarten.',
        'Drive clockwise around the island. The sign itself creates no duty to give way — the give-way '
            'sign at the entry does.'),
    svg: mandatory(roundaboutWhite, scale: 0.62),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D4',
    cat: SignCat.mandatory,
    name: T('Påbjuden cykelbana', 'Mandatory cycle path'),
    meaning: T('Banan är avsedd för cyklande och förare av moped klass II.',
        'The path is for cyclists and class II moped riders.'),
    svg: mandatory(bikeWhite, scale: 0.5),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D5',
    cat: SignCat.mandatory,
    name: T('Påbjuden gångbana', 'Mandatory footpath'),
    meaning: T('Banan är avsedd för gående.', 'The path is for pedestrians.'),
    svg: mandatory(pedWhite, scale: 0.52),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D6',
    cat: SignCat.mandatory,
    name: T('Påbjuden gång- och cykelbana', 'Shared foot and cycle path'),
    meaning: T('Gående och cyklister delar samma yta — cyklisten ska visa hänsyn.',
        'Pedestrians and cyclists share the surface — the cyclist must show consideration.'),
    svg: mandatory(_pedAndBike, scale: 0.62),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D7',
    cat: SignCat.mandatory,
    name: T('Påbjudna gång- och cykelbanor', 'Separated foot and cycle paths'),
    meaning: T('Gående och cyklister har varsin sida av banan.',
        'Pedestrians and cyclists each have their own side.'),
    svg: mandatory(_splitPedBike, scale: 0.7),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D8',
    cat: SignCat.mandatory,
    name: T('Påbjuden ridväg', 'Mandatory bridleway'),
    meaning: T('Vägen är avsedd för ridning.', 'The path is intended for riding.'),
    svg: mandatory(horse, scale: 0.5),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D10',
    cat: SignCat.mandatory,
    name: T('Påbjudet körfält för fordon i linjetrafik', 'Mandatory lane for scheduled services'),
    meaning: T('Kollektivkörfält — bara buss, och taxi där det anges. Du får inte köra där.',
        'A bus lane — buses only, plus taxis where stated. You may not drive in it.'),
    svg: mandatory(busWhite, scale: 0.56),
    sectionId: 'ch07.1',
  ),
  RoadSign(
    id: 'D11',
    cat: SignCat.mandatory,
    name: T('Slut på påbjuden bana eller körfält', 'End of mandatory path or lane'),
    meaning: T('Påbudet upphör.', 'The instruction ends.'),
    svg: mandatory('$bikeWhite$_endSlash', scale: 0.5),
    sectionId: 'ch07.1',
  ),
];

/// E — instruction signs. Blue rectangles: *this is how this road works*.
final signsE = <RoadSign>[
  RoadSign(
    id: 'E1',
    cat: SignCat.instruction,
    name: T('Motorväg', 'Motorway'),
    meaning: T('Motorvägsregler gäller: minst 40 km/h konstruktiv hastighet, ingen backning, '
        'ingen U-sväng, inga gående eller cyklar.',
        'Motorway rules apply: minimum design speed 40 km/h, no reversing, no U-turns, no pedestrians '
            'or bicycles.'),
    svg: blueBox(motorwayArt, scale: 0.62),
    sectionId: 'ch07.2',
  ),
  RoadSign(
    id: 'E2',
    cat: SignCat.instruction,
    name: T('Motorväg upphör', 'End of motorway'),
    meaning: T('Motorvägen slutar. Räkna med mötande trafik, korsningar och lägre hastighet.',
        'The motorway ends. Expect oncoming traffic, junctions and lower speeds.'),
    svg: blueBox('$motorwayArt$_endSlash', scale: 0.62),
    sectionId: 'ch07.2',
  ),
  RoadSign(
    id: 'E3',
    cat: SignCat.instruction,
    name: T('Motortrafikled', 'Clearway'),
    meaning: T('Nästan samma regler som motorväg, men körbanorna kan vara odelade — mötande trafik finns.',
        'Almost the same rules as a motorway, but the carriageways may be undivided — oncoming traffic exists.'),
    svg: blueBox(clearwayArt, scale: 0.62),
    sectionId: 'ch07.2',
  ),
  RoadSign(
    id: 'E4',
    cat: SignCat.instruction,
    name: T('Motortrafikled upphör', 'End of clearway'),
    meaning: T('Motortrafikleden slutar och vanliga vägregler gäller.',
        'The clearway ends and ordinary road rules apply.'),
    svg: blueBox('$clearwayArt$_endSlash', scale: 0.62),
    sectionId: 'ch07.2',
  ),
  RoadSign(
    id: 'E5',
    cat: SignCat.instruction,
    name: T('Tättbebyggt område', 'Built-up area'),
    meaning: T('Bashastigheten 50 km/h gäller, liksom alla tätortsregler — om inget annat skyltas.',
        'The default 50 km/h limit applies, along with all urban rules — unless otherwise posted.'),
    svg: blueZone(''),
    sectionId: 'ch07.2',
    overlay: '50',
    overlaySize: 0.30,
    overlayDy: -0.06,
  ),
  RoadSign(
    id: 'E6',
    cat: SignCat.instruction,
    name: T('Tättbebyggt område upphör', 'End of built-up area'),
    meaning: T('Nu gäller bashastigheten 70 km/h om inget annat anges.',
        'The default 70 km/h limit now applies unless otherwise posted.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<rect x="3" y="5" width="94" height="90" rx="6" fill="$kWhite"/>'
        '<rect x="6" y="8" width="88" height="84" rx="4" fill="$kBlue"/>'
        '<rect x="16" y="18" width="68" height="52" rx="3" fill="$kWhite"/>'
        '<path d="M14 84 L86 16" stroke="#C8102E" stroke-width="8" stroke-linecap="round"/></svg>',
    sectionId: 'ch07.2',
    overlay: '50',
    overlaySize: 0.28,
    overlayDy: -0.06,
  ),
  RoadSign(
    id: 'E7',
    cat: SignCat.instruction,
    name: T('Gågata', 'Pedestrian street'),
    meaning: T('Endast varuleveranser och behörig trafik. Gångfart, och väjningsplikt när du kör ut.',
        'Deliveries and authorised traffic only. Walking pace, and give way to everyone when you leave.'),
    svg: blueBox('${place(pedWhite, scale: 0.55, dx: -16)}'
        '${place(children, scale: 0.4, dx: 26, dy: 10)}', scale: 0.7),
    sectionId: 'ch07.2',
  ),
  RoadSign(
    id: 'E8',
    cat: SignCat.instruction,
    name: T('Gågata upphör', 'End of pedestrian street'),
    meaning: T('Gågatan slutar. Vanliga regler gäller — men du har väjningsplikt när du kör ut.',
        'The pedestrian street ends. Ordinary rules apply — but you give way as you leave.'),
    svg: blueBox('${place(pedWhite, scale: 0.55, dx: -16)}$_endSlash', scale: 0.7),
    sectionId: 'ch07.2',
  ),
  RoadSign(
    id: 'E9',
    cat: SignCat.instruction,
    name: T('Gångfartsområde', 'Walking-speed zone'),
    meaning: T('Kör i gångfart, väj mot gående, parkera bara på markerade platser, '
        'och väj mot alla när du kör ut.',
        'Drive at walking pace, give way to pedestrians, park only in marked bays, and give way to '
            'everyone when leaving.'),
    svg: blueBox('${place(pedWhite, scale: 0.5, dx: -20, dy: 4)}'
        '${place(carSideWhite, scale: 0.42, dx: 24, dy: 16)}'
        '${place(children, scale: 0.3, dx: 24, dy: -20)}', scale: 0.72),
    sectionId: 'ch07.2',
  ),
  RoadSign(
    id: 'E10',
    cat: SignCat.instruction,
    name: T('Gångfartsområde upphör', 'End of walking-speed zone'),
    meaning: T('Området slutar. Kom ihåg väjningsplikten mot alla när du kör ut.',
        'The zone ends. Remember you give way to everyone as you leave.'),
    svg: blueBox('${place(pedWhite, scale: 0.5, dx: -20, dy: 4)}'
        '${place(carSideWhite, scale: 0.42, dx: 24, dy: 16)}$_endSlash', scale: 0.72),
    sectionId: 'ch07.2',
  ),
  RoadSign(
    id: 'E11',
    cat: SignCat.instruction,
    name: T('Rekommenderad lägre hastighet', 'Recommended lower speed'),
    meaning: T('En rekommendation, inte ett förbud — men den finns av en anledning.',
        'A recommendation, not a prohibition — but it exists for a reason.'),
    svg: blueBox(_lowerSpeed, scale: 0.78),
    sectionId: 'ch07.2',
    overlay: '30',
    overlaySize: 0.26,
    overlayColor: 0xFFFFFFFF,
  ),
  RoadSign(
    id: 'E13',
    cat: SignCat.instruction,
    name: T('Rekommenderad högsta hastighet', 'Recommended maximum speed'),
    meaning: T('Anger vad som är lämpligt, till exempel i en kurva. Den skyltade gränsen gäller fortfarande.',
        'States what is appropriate, for example in a bend. The posted legal limit still applies.'),
    svg: blueBox(_lowerSpeed, scale: 0.78),
    sectionId: 'ch07.2',
    overlay: '70',
    overlaySize: 0.26,
    overlayColor: 0xFFFFFFFF,
  ),
  RoadSign(
    id: 'E16',
    cat: SignCat.instruction,
    name: T('Sammanvävning', 'Merging traffic'),
    meaning: T('Två körfält blir ett. Väv varannan bil — det är snabbast för alla.',
        'Two lanes become one. Zip merge, every other car — it is fastest for everyone.'),
    svg: blueBox(_weave, scale: 0.66),
    sectionId: 'ch07.3',
  ),
  RoadSign(
    id: 'E17',
    cat: SignCat.instruction,
    name: T('Enkelriktad trafik', 'One-way traffic'),
    meaning: T('Trafiken går bara åt ett håll. Här får du parkera på båda sidor om inget annat anges.',
        'Traffic runs one way only. You may park on both sides here unless otherwise stated.'),
    svg: blueBox(oneWayArt, scale: 0.8),
    sectionId: 'ch07.3',
  ),
  RoadSign(
    id: 'E18',
    cat: SignCat.instruction,
    name: T('Återvändsväg', 'Dead end'),
    meaning: T('Vägen tar slut. Du måste vända och köra tillbaka samma väg.',
        'The road ends. You will have to turn around and come back.'),
    svg: blueBox(_deadEnd, scale: 0.7),
    sectionId: 'ch07.3',
  ),
  RoadSign(
    id: 'E19',
    cat: SignCat.instruction,
    name: T('Mötesplats', 'Passing place'),
    meaning: T('En breddning där du kan mötas på en smal väg.',
        'A widened spot where you can pass on a narrow road.'),
    svg: blueBox(_passingPlace, scale: 0.7),
    sectionId: 'ch07.3',
  ),
  RoadSign(
    id: 'E20',
    cat: SignCat.instruction,
    name: T('Parkering', 'Parking'),
    meaning: T('Här får du parkera. Tilläggstavlor talar om när, hur länge och för vem.',
        'You may park here. Supplementary plates say when, for how long and for whom.'),
    svg: blueBox('', scale: 0.5),
    sectionId: 'ch07.3',
    overlay: 'P',
    overlaySize: 0.52,
    overlayColor: 0xFFFFFFFF,
  ),
];
