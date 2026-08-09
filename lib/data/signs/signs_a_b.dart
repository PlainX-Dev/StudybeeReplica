import '../../core/l10n.dart';
import '../../models/content.dart';
import 'sign_art.dart';

// Extra pictograms used only by this file.
const _bridge = '<g fill="$kBlack"><rect x="4" y="52" width="92" height="10"/>'
    '<rect x="10" y="62" width="10" height="30"/><rect x="80" y="62" width="10" height="30"/>'
    '<path d="M30 52 L50 24 L70 52 z" fill="none" stroke="$kBlack" stroke-width="8"/></g>';

const _quay = '<g fill="$kBlack"><path d="M4 44 h44 v10 H4 z"/>'
    '<path d="M14 20 h30 v20 H14 z"/><circle cx="22" cy="46" r="7"/><circle cx="40" cy="46" r="7"/>'
    '</g><g stroke="#2C7DF7" stroke-width="7" fill="none" stroke-linecap="round">'
    '<path d="M52 68 c8 -8 16 8 24 0 s16 -8 20 0"/>'
    '<path d="M52 86 c8 -8 16 8 24 0 s16 -8 20 0"/></g>';

const _uneven = '<g fill="$kBlack"><path d="M4 74 c14 -30 26 -30 38 0 c14 -34 26 -34 40 0 '
    'l14 0 v12 H4 z"/></g>';

const _chippings = '<g fill="$kBlack">'
    '<path d="M8 44 h44 v20 H8 z"/><circle cx="18" cy="68" r="8"/><circle cx="44" cy="68" r="8"/>'
    '<path d="M62 30 l10 -6 6 8 -10 6 z"/><path d="M80 48 l12 -4 4 10 -12 4 z"/>'
    '<path d="M66 62 l10 -2 3 9 -10 3 z"/><path d="M86 74 l10 -2 3 9 -10 2 z"/></g>';

const _skier = '<g fill="$kBlack"><circle cx="48" cy="14" r="9"/>'
    '<path d="M40 26 h16 l16 18 -6 8 -12 -12 -4 14 12 16 -4 20 h-10 l2 -18 -14 -16 z"/>'
    '<path d="M6 84 h88 v8 H6 z"/><path d="M70 40 l6 -18 6 2 -6 20 z"/></g>';

const _rider = '<g fill="$kBlack">'
    '<rect x="24" y="42" width="44" height="20" rx="9"/>'
    '<path d="M64 46 l14 -12 6 -12 8 4 -6 14 6 6 -6 8 z"/>'
    '<rect x="28" y="58" width="7" height="30" rx="3"/><rect x="40" y="58" width="7" height="30" rx="3"/>'
    '<rect x="54" y="58" width="7" height="30" rx="3"/><rect x="63" y="58" width="7" height="30" rx="3"/>'
    '<circle cx="44" cy="12" r="9"/>'
    '<path d="M36 24 h16 l8 16 -6 6 -6 -8 v10 l-4 10 h-12 z"/></g>';

const _horseCart = '<g fill="$kBlack">'
    '<rect x="8" y="42" width="34" height="18" rx="6"/>'
    '<path d="M38 44 l12 -10 5 -10 7 3 -5 12 5 5 -5 7 z"/>'
    '<rect x="12" y="58" width="6" height="24" rx="3"/><rect x="30" y="58" width="6" height="24" rx="3"/>'
    '<rect x="50" y="40" width="40" height="22" rx="4"/>'
    '<circle cx="60" cy="72" r="12" fill="none" stroke="$kBlack" stroke-width="7"/>'
    '<circle cx="86" cy="72" r="12" fill="none" stroke="$kBlack" stroke-width="7"/></g>';

const _snowmobile = '<g fill="$kBlack">'
    '<path d="M10 74 h70 c8 0 12 -4 12 -10 V52 c0 -6 -6 -10 -12 -10 H54 l-8 -12 H28 l-6 16 H12 '
    'c-6 0 -8 4 -8 8 v14 c0 4 2 6 6 6 z"/>'
    '<rect x="6" y="80" width="88" height="9" rx="4"/>'
    '<path d="M62 24 h20 v7 H62 z"/></g>';

const _softVerge = '<g fill="$kBlack">'
    '<path d="M8 20 h30 v58 H8 z" opacity="0.25"/>'
    '<path d="M44 12 h16 v52 h-16 z"/>'
    '<path d="M44 66 l-14 22 h48 l-14 -22 z"/>'
    '<circle cx="34" cy="84" r="9"/><circle cx="70" cy="84" r="9"/></g>';

const _distanceBars = '<g fill="$kRed">'
    '<rect x="12" y="18" width="76" height="14" rx="5" transform="rotate(20 50 25)"/>'
    '<rect x="12" y="44" width="76" height="14" rx="5" transform="rotate(20 50 51)"/>'
    '<rect x="12" y="70" width="76" height="14" rx="5" transform="rotate(20 50 77)"/></g>';

const _twoWay = '<g fill="$kBlack">'
    '<path d="M30 92 V28 l-11 0 17 -22 17 22 h-11 v64 z" transform="translate(-6,0)"/>'
    '<path d="M70 8 v64 l11 0 -17 22 -17 -22 h11 V8 z" transform="translate(6,0)"/></g>';

const _mainCross = '<g fill="$kBlack"><rect x="40" y="4" width="20" height="92"/>'
    '<rect x="4" y="44" width="92" height="12"/></g>';

/// A — warning signs. Yellow triangle, red border: *something ahead needs your
/// attention*. They are always placed in time for you to react.
final signsA = <RoadSign>[
  RoadSign(
    id: 'A1',
    cat: SignCat.warning,
    name: T('Varning för farlig kurva', 'Dangerous bend'),
    meaning: T('En kurva som är skarpare än den ser ut. Sänk farten innan kurvan, inte i den.',
        'A bend sharper than it looks. Slow down before it, not in it.'),
    svg: warn(bendRight),
    sectionId: 'ch05.2',
  ),
  RoadSign(
    id: 'A2',
    cat: SignCat.warning,
    name: T('Varning för flera farliga kurvor', 'Several dangerous bends'),
    meaning: T('Två eller flera kurvor efter varandra. Första pilen visar åt vilket håll den första går.',
        'Two or more bends in a row. The first curve of the symbol shows which way the first bend goes.'),
    svg: warn(doubleBendRight),
    sectionId: 'ch05.2',
  ),
  RoadSign(
    id: 'A3',
    cat: SignCat.warning,
    name: T('Varning för nedförslutning', 'Steep descent'),
    meaning: T('Brant nedförsbacke. Växla ner och motorbromsa så att bromsarna inte överhettas.',
        'A steep downhill. Change down and use the engine to brake so the brakes do not overheat.'),
    svg: warn(steepDown, scale: 0.5),
    sectionId: 'ch05.2',
    overlay: '10%',
    overlaySize: 0.16,
    overlayDy: 0.20,
  ),
  RoadSign(
    id: 'A4',
    cat: SignCat.warning,
    name: T('Varning för stigning', 'Steep ascent'),
    meaning: T('Brant uppförsbacke. Välj rätt växel i tid och räkna med långsamma fordon.',
        'A steep uphill. Choose the right gear in time and expect slow vehicles.'),
    svg: warn(steepUp, scale: 0.5),
    sectionId: 'ch05.2',
    overlay: '10%',
    overlaySize: 0.16,
    overlayDy: 0.20,
  ),
  RoadSign(
    id: 'A5',
    cat: SignCat.warning,
    name: T('Varning för avsmalnande väg', 'Road narrows'),
    meaning: T('Vägen blir smalare. Sänk farten och var beredd att lämna företräde vid möte.',
        'The road gets narrower. Slow down and be ready to give way when meeting.'),
    svg: warn(narrowBoth),
    sectionId: 'ch05.2',
  ),
  RoadSign(
    id: 'A6',
    cat: SignCat.warning,
    name: T('Varning för bro', 'Opening bridge'),
    meaning: T('Öppningsbar bro. Räkna med att behöva stanna och vänta.',
        'An opening bridge ahead. Expect to have to stop and wait.'),
    svg: warn(_bridge),
    sectionId: 'ch05.2',
  ),
  RoadSign(
    id: 'A7',
    cat: SignCat.warning,
    name: T('Varning för kaj', 'Quayside or riverbank'),
    meaning: T('Vägen slutar vid vatten utan räcke. Var extra försiktig i mörker och dimma.',
        'The road ends at water with no barrier. Take extra care in darkness and fog.'),
    svg: warn(_quay, scale: 0.5),
    sectionId: 'ch05.2',
  ),
  RoadSign(
    id: 'A8',
    cat: SignCat.warning,
    name: T('Varning för ojämn väg', 'Uneven road'),
    meaning: T('Gropar, sättningar eller tjälskott. Sänk farten — hög fart skadar både bilen och styrförmågan.',
        'Potholes, subsidence or frost damage. Slow down — speed hurts both the car and your control.'),
    svg: warn(_uneven),
    sectionId: 'ch05.2',
  ),
  RoadSign(
    id: 'A9',
    cat: SignCat.warning,
    name: T('Varning för farthinder', 'Speed hump'),
    meaning: T('Ett fysiskt farthinder. Kör över det långsamt och rakt.',
        'A physical traffic-calming hump. Cross it slowly and straight.'),
    svg: warn(bump),
    sectionId: 'ch05.2',
  ),
  RoadSign(
    id: 'A10',
    cat: SignCat.warning,
    name: T('Varning för slirig väg', 'Slippery road'),
    meaning: T('Vägen kan vara hal av is, vatten, lera eller löv. Bromsa mjukt och håll längre avstånd.',
        'The road may be slippery from ice, water, mud or leaves. Brake gently and keep more distance.'),
    svg: warn(slipperyRoad, scale: 0.5),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A11',
    cat: SignCat.warning,
    name: T('Varning för stenskott', 'Loose chippings'),
    meaning: T('Löst grus som kastas upp. Sänk farten och håll långt avstånd — annars spräcker du någons ruta.',
        'Loose gravel thrown up by tyres. Slow down and keep well back — otherwise you crack somebody’s windscreen.'),
    svg: warn(_chippings),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A12',
    cat: SignCat.warning,
    name: T('Varning för stenras', 'Falling rocks'),
    meaning: T('Sten kan ligga på vägen eller falla ner. Titta långt fram och stanna inte under branten.',
        'Rocks may be on the road or fall onto it. Look far ahead and do not stop under the slope.'),
    svg: warn(fallingRocks),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A13',
    cat: SignCat.warning,
    name: T('Varning för övergångsställe', 'Pedestrian crossing ahead'),
    meaning: T('Ett övergångsställe kommer. Du har väjningsplikt mot gående som gått ut eller är på väg ut.',
        'A pedestrian crossing ahead. You must give way to pedestrians on it or about to step onto it.'),
    svg: warn('$zebra${place(ped, scale: 0.6, dx: 18, dy: -14)}', scale: 0.5),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A14',
    cat: SignCat.warning,
    name: T('Varning för gående', 'Pedestrians'),
    meaning: T('Gående rör sig i eller vid körbanan, ofta utan gångbana.',
        'Pedestrians move on or beside the carriageway, often with no footway.'),
    svg: warn(ped),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A15',
    cat: SignCat.warning,
    name: T('Varning för barn', 'Children'),
    meaning: T('Barn i närheten — skola, lekplats, busshållplats. Räkna med det oväntade.',
        'Children nearby — school, playground, bus stop. Expect the unexpected.'),
    svg: warn(children, scale: 0.5),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A16',
    cat: SignCat.warning,
    name: T('Varning för cyklande och mopedförare', 'Cyclists and moped riders'),
    meaning: T('Cyklister eller mopedister korsar eller färdas på vägen. Håll 1,5 meter sidoavstånd vid omkörning.',
        'Cyclists or mopeds cross or travel on the road. Keep 1.5 metres of clearance when passing.'),
    svg: warn(bike, scale: 0.46),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A17',
    cat: SignCat.warning,
    name: T('Varning för skidåkare', 'Skiers'),
    meaning: T('Skidspår korsar vägen. Vanligt i fjällen och vid längdspår.',
        'A ski trail crosses the road. Common in the mountains and near cross-country tracks.'),
    svg: warn(_skier, scale: 0.5),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A18',
    cat: SignCat.warning,
    name: T('Varning för ridande', 'Horse riders'),
    meaning: T('Ryttare på vägen. Passera långsamt och tyst — hästar skräms av motorljud.',
        'Riders on the road. Pass slowly and quietly — horses startle at engine noise.'),
    svg: warn(_rider, scale: 0.5),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A19-1',
    cat: SignCat.warning,
    name: T('Varning för älg', 'Elk (moose)'),
    meaning: T('Älg kan korsa vägen. Störst risk i gryning och skymning. Bromsa rakt hellre än att väja.',
        'Elk may cross. Highest risk at dawn and dusk. Brake straight rather than swerve.'),
    svg: warn(moose, scale: 0.48),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A19-2',
    cat: SignCat.warning,
    name: T('Varning för rådjur', 'Deer'),
    meaning: T('Rådjur rör sig i grupp — ser du ett, räkna med fler.',
        'Deer move in groups — if you see one, expect more.'),
    svg: warn(deer, scale: 0.48),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A19-3',
    cat: SignCat.warning,
    name: T('Varning för ren', 'Reindeer'),
    meaning: T('Renar i stora flockar, framför allt i norra Sverige. De rör sig oberäkneligt.',
        'Reindeer in large herds, mainly in northern Sweden. They move unpredictably.'),
    svg: warn(reindeer, scale: 0.48),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A19-4',
    cat: SignCat.warning,
    name: T('Varning för nötkreatur', 'Cattle'),
    meaning: T('Kor kan gå på eller korsa vägen, ofta vid betesmarker.',
        'Cattle may walk on or cross the road, often near pastures.'),
    svg: warn(cattle, scale: 0.48),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A19-5',
    cat: SignCat.warning,
    name: T('Varning för vildsvin', 'Wild boar'),
    meaning: T('Vildsvin rör sig oftast i skymning och natt, och alltid i grupp.',
        'Wild boar move mostly at dusk and night, and always in groups.'),
    svg: warn(wildBoar, scale: 0.5),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A20',
    cat: SignCat.warning,
    name: T('Varning för vägarbete', 'Roadworks'),
    meaning: T('Vägarbete pågår. Sänk farten till skyltad hastighet — vägarbetare står oskyddade.',
        'Roadworks ahead. Drop to the posted speed — the workers stand unprotected.'),
    svg: warn(roadworks, scale: 0.5),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A21',
    cat: SignCat.warning,
    name: T('Slut på sträcka med vägarbete', 'End of roadworks'),
    meaning: T('Vägarbetet är slut och vanliga regler och hastigheter gäller igen.',
        'The roadworks end and normal rules and speeds apply again.'),
    svg: warn('$roadworks<path d="M8 8 L92 92" stroke="$kBlack" stroke-width="9" '
        'stroke-linecap="round"/>', scale: 0.5),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A22',
    cat: SignCat.warning,
    name: T('Varning för flerfärgssignal', 'Traffic signals'),
    meaning: T('Trafiksignal längre fram, ofta där du inte ser den i tid.',
        'Traffic signals ahead, often where you cannot see them in time.'),
    svg: warn(trafficLight, scale: 0.42),
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A23',
    cat: SignCat.warning,
    name: T('Varning för lågt flygande flygplan', 'Low-flying aircraft'),
    meaning: T('Flygplan passerar lågt över vägen. Ljud och skugga kan överraska.',
        'Aircraft pass low over the road. The noise and shadow can startle you.'),
    svg: warn(airplane, scale: 0.46),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A24',
    cat: SignCat.warning,
    name: T('Varning för sidvind', 'Crosswind'),
    meaning: T('Kraftig sidvind. Håll stadigt i ratten, särskilt på broar och när du passerar lastbilar.',
        'Strong crosswind. Hold the wheel firmly, especially on bridges and when passing lorries.'),
    svg: warn(wind, scale: 0.5),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A25',
    cat: SignCat.warning,
    name: T('Varning för mötande trafik', 'Two-way traffic'),
    meaning: T('Mötande trafik börjar — vanligt där en motorväg övergår i vanlig väg.',
        'Oncoming traffic begins — common where a motorway becomes an ordinary road.'),
    svg: warn(_twoWay, scale: 0.46),
    sectionId: 'ch05.2',
  ),
  RoadSign(
    id: 'A26',
    cat: SignCat.warning,
    name: T('Varning för tunnel', 'Tunnel'),
    meaning: T('Tunnel längre fram. Tänd halvljus, ta av solglasögonen och håll avstånd.',
        'A tunnel ahead. Dipped beam on, sunglasses off, keep your distance.'),
    svg: warn(tunnelArt, scale: 0.46),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A27',
    cat: SignCat.warning,
    name: T('Varning för svag vägkant', 'Soft verge or high edge'),
    meaning: T('Vägkanten bär inte. Kör inte ut i kanten — bilen kan dras ner i diket.',
        'The verge will not carry your weight. Stay off the edge — the car can be dragged into the ditch.'),
    svg: warn(_softVerge, scale: 0.5),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A28',
    cat: SignCat.warning,
    name: T('Varning för vägkorsning', 'Junction ahead'),
    meaning: T('En korsning där högerregeln gäller. Alla vägar är likvärdiga — sänk farten.',
        'A junction where the right-hand rule applies. All roads are equal — slow down.'),
    svg: warn(crossroads, scale: 0.44),
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A29',
    cat: SignCat.warning,
    name: T('Varning för vägkorsning där anslutande trafik har väjningsplikt',
        'Junction where connecting traffic must give way'),
    meaning: T('Du kör på den prioriterade vägen — men lita aldrig blint på att den andra väjer.',
        'You are on the priority road — but never blindly trust that the other driver yields.'),
    svg: warn(_mainCross, scale: 0.44),
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A30',
    cat: SignCat.warning,
    name: T('Varning för cirkulationsplats', 'Roundabout ahead'),
    meaning: T('En cirkulationsplats kommer. Välj körfält i god tid efter vilken avfart du ska ta.',
        'A roundabout ahead. Choose your lane early according to the exit you want.'),
    svg: warn(roundaboutArrows, scale: 0.44),
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A31',
    cat: SignCat.warning,
    name: T('Varning för långsamtgående fordon', 'Slow-moving vehicles'),
    meaning: T('Traktorer och motorredskap kan komma ut på vägen. Deras topphastighet är låg.',
        'Tractors and machinery may join the road. Their top speed is low.'),
    svg: warn(tractor, scale: 0.5),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A32',
    cat: SignCat.warning,
    name: T('Varning för fordon med förspänt dragdjur', 'Horse-drawn vehicles'),
    meaning: T('Hästekipage på vägen. Passera långsamt, brett och utan att tuta.',
        'Horse-drawn vehicles on the road. Pass slowly, widely and without the horn.'),
    svg: warn(_horseCart, scale: 0.52),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A33',
    cat: SignCat.warning,
    name: T('Varning för terrängskotertrafik', 'Snowmobiles'),
    meaning: T('Skoterled korsar vägen. Vanligt i fjällen — räkna med att de kommer snabbt.',
        'A snowmobile trail crosses the road. Common in the mountains — they arrive fast.'),
    svg: warn(_snowmobile, scale: 0.52),
    sectionId: 'ch05.3',
  ),
  RoadSign(
    id: 'A34',
    cat: SignCat.warning,
    name: T('Varning för kö', 'Queues likely'),
    meaning: T('Köbildning framför. Håll avstånd och slå på varningsblinkers om du blir sist i kön.',
        'Queues ahead. Keep your distance and use hazard lights if you become the last car in the queue.'),
    svg: warn(queue, scale: 0.46),
    sectionId: 'ch05.5',
  ),
  RoadSign(
    id: 'A35',
    cat: SignCat.warning,
    name: T('Varning för järnvägskorsning med bommar', 'Level crossing with barriers'),
    meaning: T('Plankorsning med bommar. Stanna aldrig på spåren och kör aldrig runt en fälld bom.',
        'A level crossing with barriers. Never stop on the tracks and never drive round a lowered barrier.'),
    svg: warn(barrier, scale: 0.5),
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A36',
    cat: SignCat.warning,
    name: T('Varning för järnvägskorsning utan bommar', 'Level crossing without barriers'),
    meaning: T('Plankorsning utan bommar. Sänk farten, stäng av musiken och titta åt båda hållen.',
        'A level crossing with no barriers. Slow down, turn off the music and look both ways.'),
    svg: warn(train, scale: 0.46),
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A37',
    cat: SignCat.warning,
    name: T('Varning för korsning med spårväg', 'Tramway crossing'),
    meaning: T('Spårvagnar korsar vägen. Spårvagn har normalt företräde och kan inte väja.',
        'Trams cross the road. A tram normally has priority and cannot swerve.'),
    svg: warn(tram, scale: 0.46),
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A38',
    cat: SignCat.warning,
    name: T('Avstånd till plankorsning', 'Distance to level crossing'),
    meaning: T('Tre streck = cirka 300 m, två = 200 m, ett = 100 m till järnvägskorsningen.',
        'Three bars ≈ 300 m, two ≈ 200 m, one ≈ 100 m to the level crossing.'),
    svg: warn(_distanceBars, scale: 0.6, dy: 4),
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A39',
    cat: SignCat.warning,
    name: T('Kryssmärke', 'St Andrew’s cross'),
    meaning: T('Står omedelbart vid plankorsningen. Ett kryss = ett spår, dubbelkryss = flera spår.',
        'Stands right at the level crossing. One cross = single track, double cross = several tracks.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<circle cx="50" cy="50" r="46" fill="$kYellow" stroke="$kRed" stroke-width="6"/>'
        '$stAndrew</svg>',
    sectionId: 'ch05.4',
  ),
  RoadSign(
    id: 'A40',
    cat: SignCat.warning,
    name: T('Varning för annan fara', 'Other danger'),
    meaning: T('En fara som inget annat märke täcker. Tilläggstavlan berättar vilken.',
        'A hazard no other sign covers. The supplementary plate tells you which.'),
    svg: warn(exclamation, scale: 0.5),
    sectionId: 'ch05.5',
  ),
];

/// B — priority signs. These decide who goes first, and they override the
/// right-hand rule completely.
final signsB = <RoadSign>[
  RoadSign(
    id: 'B1',
    cat: SignCat.priority,
    name: T('Väjningsplikt', 'Give way'),
    meaning: T('Du ska väja mot korsande trafik. Du behöver inte stanna om vägen är fri, '
        'men du måste kunna göra det.',
        'You must give way to crossing traffic. You need not stop if the road is clear, but you must be '
            'able to.'),
    svg: giveWay(),
    sectionId: 'ch06.1',
  ),
  RoadSign(
    id: 'B2',
    cat: SignCat.priority,
    name: T('Stopplikt', 'Stop'),
    meaning: T('Du måste stanna helt vid stopplinjen, varje gång — även om korsningen är tom.',
        'You must come to a complete stop at the line, every time — even if the junction is empty.'),
    svg: stopOctagon(),
    sectionId: 'ch06.1',
    overlay: 'STOP',
    overlaySize: 0.24,
    overlayColor: 0xFFFFFFFF,
  ),
  RoadSign(
    id: 'B3',
    cat: SignCat.priority,
    name: T('Övergångsställe', 'Pedestrian crossing'),
    meaning: T('Här är ett övergångsställe. Väj mot gående som gått ut eller står i begrepp att gå ut.',
        'A pedestrian crossing. Give way to pedestrians on it or about to step onto it.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="$kBlue" stroke="$kWhite" stroke-width="4"/>'
        '${place('<path d="M6 96 L26 44 h12 L18 96 z M32 96 L52 44 h12 L44 96 z M58 96 L78 44 h12 L70 96 z" '
            'fill="$kWhite"/>${place(pedWhite, scale: 0.55, dy: -26)}', scale: 0.5)}</svg>',
    sectionId: 'ch06.1',
  ),
  RoadSign(
    id: 'B4',
    cat: SignCat.priority,
    name: T('Huvudled', 'Priority road'),
    meaning: T('Du kör på huvudled — korsande trafik har väjningsplikt. Högerregeln gäller inte.',
        'You are on a priority road — crossing traffic must give way. The right-hand rule does not apply.'),
    svg: priority(),
    sectionId: 'ch06.1',
  ),
  RoadSign(
    id: 'B5',
    cat: SignCat.priority,
    name: T('Huvudled upphör', 'End of priority road'),
    meaning: T('Huvudleden slutar. Från nästa korsning gäller högerregeln igen.',
        'The priority road ends. From the next junction the right-hand rule applies again.'),
    svg: priority(ended: true),
    sectionId: 'ch06.1',
  ),
  RoadSign(
    id: 'B6',
    cat: SignCat.priority,
    name: T('Väjningsplikt mot mötande trafik', 'Give way to oncoming traffic'),
    meaning: T('Vägen räcker inte för två. Du är den som ska vänta.',
        'The road is not wide enough for two. You are the one who waits.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<circle cx="50" cy="50" r="47" fill="$kRed"/><circle cx="50" cy="50" r="38" fill="$kYellow"/>'
        '${place(meetingArrows(youGiveWay: true), scale: 0.58)}</svg>',
    sectionId: 'ch06.1',
  ),
  RoadSign(
    id: 'B7',
    cat: SignCat.priority,
    name: T('Mötande trafik har väjningsplikt', 'Oncoming traffic must give way'),
    meaning: T('Du får köra först genom passagen — men kör ändå försiktigt.',
        'You go through the narrow section first — but still take care.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<rect x="8" y="4" width="84" height="92" rx="6" fill="$kBlue" stroke="$kWhite" stroke-width="4"/>'
        '${place(meetingArrows(youGiveWay: false), scale: 0.62)}</svg>',
    sectionId: 'ch06.1',
  ),
  RoadSign(
    id: 'B8',
    cat: SignCat.priority,
    name: T('Cykelöverfart', 'Cycle crossing'),
    meaning: T('Här har DU väjningsplikt mot cyklande. Skiljer sig från en cykelpassage, där cyklisten väjer.',
        'Here YOU give way to cyclists. Different from a cycle passage, where the cyclist gives way.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<path d="M50 4 L96 50 L50 96 L4 50 Z" fill="$kBlue" stroke="$kWhite" stroke-width="4"/>'
        '${place(bikeWhite, scale: 0.42)}</svg>',
    sectionId: 'ch06.1',
  ),
];
