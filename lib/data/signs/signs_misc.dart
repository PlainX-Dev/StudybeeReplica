import '../../core/l10n.dart';
import '../../models/content.dart';
import 'sign_art.dart';

// ── Markings: painted on a strip of asphalt ────────────────────────────────

const _dashCentre = '<rect x="46" y="6" width="8" height="20" rx="2" fill="$kWhite"/>'
    '<rect x="46" y="40" width="8" height="20" rx="2" fill="$kWhite"/>'
    '<rect x="46" y="74" width="8" height="20" rx="2" fill="$kWhite"/>';

const _warnLine = '<rect x="46" y="4" width="8" height="36" rx="2" fill="$kWhite"/>'
    '<rect x="46" y="52" width="8" height="36" rx="2" fill="$kWhite"/>';

const _solidLine = '<rect x="46" y="4" width="8" height="92" rx="2" fill="$kWhite"/>';

const _edgeLine = '<rect x="10" y="4" width="7" height="92" rx="2" fill="$kWhite"/>'
    '<rect x="83" y="4" width="7" height="92" rx="2" fill="$kWhite"/>';

const _laneLine = '<rect x="46" y="10" width="8" height="26" rx="2" fill="$kWhite"/>'
    '<rect x="46" y="46" width="8" height="26" rx="2" fill="$kWhite"/>'
    '<rect x="46" y="82" width="8" height="14" rx="2" fill="$kWhite"/>';

const _combined = '<rect x="40" y="4" width="8" height="92" rx="2" fill="$kWhite"/>'
    '<rect x="54" y="6" width="8" height="20" rx="2" fill="$kWhite"/>'
    '<rect x="54" y="40" width="8" height="20" rx="2" fill="$kWhite"/>'
    '<rect x="54" y="74" width="8" height="20" rx="2" fill="$kWhite"/>';

const _stopLine = '<rect x="8" y="44" width="84" height="14" rx="2" fill="$kWhite"/>';

const _giveWayTeeth = '<g fill="$kWhite">'
    '<path d="M10 40 h16 l-8 20 z"/><path d="M32 40 h16 l-8 20 z"/>'
    '<path d="M54 40 h16 l-8 20 z"/><path d="M76 40 h16 l-8 20 z"/></g>';

const _zebraMark = '<g fill="$kWhite">'
    '<rect x="8" y="14" width="14" height="72" rx="2"/><rect x="30" y="14" width="14" height="72" rx="2"/>'
    '<rect x="52" y="14" width="14" height="72" rx="2"/><rect x="74" y="14" width="14" height="72" rx="2"/></g>';

const _cycleSquares = '<g fill="$kWhite">'
    '<rect x="8" y="30" width="14" height="14"/><rect x="30" y="30" width="14" height="14"/>'
    '<rect x="52" y="30" width="14" height="14"/><rect x="74" y="30" width="14" height="14"/>'
    '<rect x="8" y="56" width="14" height="14"/><rect x="30" y="56" width="14" height="14"/>'
    '<rect x="52" y="56" width="14" height="14"/><rect x="74" y="56" width="14" height="14"/></g>';

const _hatched = '<g stroke="$kWhite" stroke-width="6" fill="none">'
    '<path d="M50 6 L18 44 M50 26 L18 64 M50 46 L18 84 M50 6 L82 44 M50 26 L82 64 M50 46 L82 84"/>'
    '<path d="M50 4 V96" stroke-width="7"/></g>';

const _parkBox = '<g stroke="$kWhite" stroke-width="7" fill="none">'
    '<path d="M14 14 h72 v72 h-72 z"/></g>';

const _busBox = '<g stroke="#F5C518" stroke-width="7" fill="none">'
    '<path d="M12 20 h76 v60 h-76 z"/></g>';

// ── Signals ────────────────────────────────────────────────────────────────

String _light({required bool red, required bool amber, required bool green}) =>
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
    '<rect x="26" y="4" width="48" height="92" rx="10" fill="#22222A"/>'
    '<circle cx="50" cy="26" r="14" fill="${red ? '#E4002B' : '#4A2027'}"/>'
    '<circle cx="50" cy="50" r="14" fill="${amber ? '#FFB020' : '#4A3A20'}"/>'
    '<circle cx="50" cy="74" r="14" fill="${green ? '#2FBF71' : '#1E4030'}"/></svg>';

const _policeStop = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
    '<rect width="100" height="100" rx="10" fill="#EAF2FB"/>'
    '<g fill="#1B3A63"><circle cx="50" cy="22" r="12"/>'
    '<path d="M36 38 h28 l10 26 -10 4 -6 -14 v18 l8 26 -9 4 -9 -24 -9 24 -9 -4 8 -26 v-18 '
    'l-6 14 -10 -4 z"/></g>'
    '<path d="M50 10 v-8" stroke="#1B3A63" stroke-width="6"/></svg>';

const _policeGo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
    '<rect width="100" height="100" rx="10" fill="#EAF2FB"/>'
    '<g fill="#1B3A63"><circle cx="50" cy="24" r="12"/>'
    '<path d="M34 40 h32 v10 h10 l14 -14 6 7 -18 19 H66 v10 l8 26 -9 4 -9 -24 -9 24 -9 -4 8 -26 z"/></g></svg>';

// ── Guide, service and notice ──────────────────────────────────────────────

const _guideArrow = '<g fill="$kWhite"><path d="M6 30 h68 l20 20 -20 20 H6 z"/></g>';

/// Markings, plates, signals and the guide/service families.
final signsMisc = <RoadSign>[
  // ── Vägmarkeringar ──────────────────────────────────────────────────────
  RoadSign(
    id: 'M-mitt',
    cat: SignCat.marking,
    name: T('Mittlinje', 'Centre line'),
    meaning: T('Skiljer körriktningarna. Korta streck med långa mellanrum — du får korsa den.',
        'Separates the directions of travel. Short dashes with long gaps — you may cross it.'),
    svg: asphalt(_dashCentre),
    sectionId: 'ch09.1',
  ),
  RoadSign(
    id: 'M-varning',
    cat: SignCat.marking,
    name: T('Varningslinje', 'Warning line'),
    meaning: T('Långa streck, korta mellanrum. Du får korsa den, men något gör det olämpligt — '
        'skymd sikt eller en korsning.',
        'Long dashes, short gaps. You may cross it, but something makes it unwise — poor visibility '
            'or a junction.'),
    svg: asphalt(_warnLine),
    sectionId: 'ch09.1',
  ),
  RoadSign(
    id: 'M-spärr',
    cat: SignCat.marking,
    name: T('Spärrlinje (heldragen linje)', 'Solid line'),
    meaning: T('Du får inte korsa eller köra på den. Undantag finns bara när det behövs för '
        'att passera ett hinder.',
        'You may not cross or drive on it. The only exception is when you must pass an obstacle.'),
    svg: asphalt(_solidLine),
    sectionId: 'ch09.1',
  ),
  RoadSign(
    id: 'M-kombi',
    cat: SignCat.marking,
    name: T('Kombinerad spärr- och varningslinje', 'Combined solid and warning line'),
    meaning: T('Regeln följer linjen närmast dig: är den heldragen på din sida får du inte korsa.',
        'The rule follows the line nearest you: if the line on your side is solid, you may not cross.'),
    svg: asphalt(_combined),
    sectionId: 'ch09.1',
  ),
  RoadSign(
    id: 'M-kant',
    cat: SignCat.marking,
    name: T('Kantlinje', 'Edge line'),
    meaning: T('Visar var körbanan slutar. Innanför den är vägren — inte körfält.',
        'Shows where the carriageway ends. Outside it is the shoulder — not a lane.'),
    svg: asphalt(_edgeLine),
    sectionId: 'ch09.1',
  ),
  RoadSign(
    id: 'M-körfält',
    cat: SignCat.marking,
    name: T('Körfältslinje', 'Lane line'),
    meaning: T('Skiljer körfält i samma riktning. Byt körfält bara efter tecken och kontroll.',
        'Separates lanes going the same way. Change lanes only after signalling and checking.'),
    svg: asphalt(_laneLine),
    sectionId: 'ch09.1',
  ),
  RoadSign(
    id: 'M-stopp',
    cat: SignCat.marking,
    name: T('Stopplinje', 'Stop line'),
    meaning: T('Här ska fordonet stå helt stilla vid stopplikt eller rött ljus.',
        'The vehicle must be completely still here at a stop sign or red light.'),
    svg: asphalt(_stopLine),
    sectionId: 'ch09.2',
  ),
  RoadSign(
    id: 'M-väjning',
    cat: SignCat.marking,
    name: T('Väjningslinje ("hajtänder")', 'Give-way line (“shark teeth”)'),
    meaning: T('Markerar var du ska väja. Trianglarna pekar mot dig som har väjningsplikt.',
        'Marks where you give way. The triangles point at the driver who must yield.'),
    svg: asphalt(_giveWayTeeth),
    sectionId: 'ch09.2',
  ),
  RoadSign(
    id: 'M-övergång',
    cat: SignCat.marking,
    name: T('Övergångsställe', 'Pedestrian crossing'),
    meaning: T('Breda vita band. Du får inte stanna eller parkera inom 10 meter före.',
        'Wide white bands. You may not stop or park within 10 metres before it.'),
    svg: asphalt(_zebraMark),
    sectionId: 'ch09.2',
  ),
  RoadSign(
    id: 'M-cykel',
    cat: SignCat.marking,
    name: T('Cykelpassage eller cykelöverfart', 'Cycle passage or cycle crossing'),
    meaning: T('Rutmarkering. Vid cykelpassage väjer cyklisten; vid skyltad cykelöverfart väjer du.',
        'A chequered marking. At a cycle passage the cyclist gives way; at a signed cycle crossing you do.'),
    svg: asphalt(_cycleSquares),
    sectionId: 'ch09.2',
  ),
  RoadSign(
    id: 'M-spärromr',
    cat: SignCat.marking,
    name: T('Spärrområde', 'Hatched area'),
    meaning: T('Snedstreckad yta som du inte får köra in på eller stanna i.',
        'A hatched area you may not drive into or stop in.'),
    svg: asphalt(_hatched),
    sectionId: 'ch09.2',
  ),
  RoadSign(
    id: 'M-parkruta',
    cat: SignCat.marking,
    name: T('Parkeringsruta', 'Parking bay'),
    meaning: T('Du ska stå inom rutan. Står du utanför räknas det som felparkering.',
        'You must stand inside the bay. Outside it counts as illegal parking.'),
    svg: asphalt(_parkBox),
    sectionId: 'ch09.2',
  ),
  RoadSign(
    id: 'M-hållplats',
    cat: SignCat.marking,
    name: T('Hållplatsmarkering', 'Bus stop marking'),
    meaning: T('Gul markering vid hållplats. Stanna eller parkera inte 20 meter före eller '
        '5 meter efter hållplatsmärket.',
        'A yellow marking at a bus stop. Do not stop or park 20 metres before or 5 metres after the '
            'stop sign.'),
    svg: asphalt(_busBox),
    sectionId: 'ch09.2',
  ),

  // ── Trafiksignaler ──────────────────────────────────────────────────────
  RoadSign(
    id: 'S-röd',
    cat: SignCat.signal,
    name: T('Rött ljus', 'Red light'),
    meaning: T('Stanna före stopplinjen. Rött betyder stopp, utan undantag.',
        'Stop before the line. Red means stop, with no exceptions.'),
    svg: _light(red: true, amber: false, green: false),
    sectionId: 'ch09.3',
  ),
  RoadSign(
    id: 'S-rödgul',
    cat: SignCat.signal,
    name: T('Rött och gult', 'Red and amber'),
    meaning: T('Grönt kommer strax. Du får fortfarande inte köra — gör dig bara redo.',
        'Green is coming. You still may not go — just get ready.'),
    svg: _light(red: true, amber: true, green: false),
    sectionId: 'ch09.3',
  ),
  RoadSign(
    id: 'S-gul',
    cat: SignCat.signal,
    name: T('Gult ljus', 'Amber light'),
    meaning: T('Stanna — om du kan göra det utan fara. Är du för nära korsningen kör du vidare.',
        'Stop — if you can do so safely. If you are too close to the junction, carry on.'),
    svg: _light(red: false, amber: true, green: false),
    sectionId: 'ch09.3',
  ),
  RoadSign(
    id: 'S-grön',
    cat: SignCat.signal,
    name: T('Grönt ljus', 'Green light'),
    meaning: T('Du får köra om vägen är fri. Grönt ger dig ingen rätt att blockera korsningen '
        'eller köra på gående.',
        'You may go if the road is clear. Green never entitles you to block the junction or drive into '
            'pedestrians.'),
    svg: _light(red: false, amber: false, green: true),
    sectionId: 'ch09.3',
  ),
  RoadSign(
    id: 'S-blinkgul',
    cat: SignCat.signal,
    name: T('Blinkande gult', 'Flashing amber'),
    meaning: T('Signalen är ur bruk eller varnar. Vanliga väjningsregler gäller — oftast högerregeln '
        'eller skyltarna.',
        'The signal is out of service or warning you. Normal priority rules apply — usually the right-hand '
            'rule or the signs.'),
    svg: _light(red: false, amber: true, green: false),
    sectionId: 'ch09.3',
  ),
  RoadSign(
    id: 'S-polis-stopp',
    cat: SignCat.signal,
    name: T('Polisens tecken: stopp', 'Police signal: stop'),
    meaning: T('Uppsträckt arm betyder stopp för alla riktningar som möter armen. '
        'Polismans tecken gäller före både signaler och märken.',
        'A raised arm means stop for every direction facing it. A police officer’s signal overrides both '
            'lights and signs.'),
    svg: _policeStop,
    sectionId: 'ch09.4',
  ),
  RoadSign(
    id: 'S-polis-kör',
    cat: SignCat.signal,
    name: T('Polisens tecken: kör fram', 'Police signal: proceed'),
    meaning: T('Utsträckt arm åt sidan och vinkande rörelse: du får köra.',
        'An arm extended to the side with a beckoning motion: you may proceed.'),
    svg: _policeGo,
    sectionId: 'ch09.4',
  ),

  // ── Tilläggstavlor ──────────────────────────────────────────────────────
  RoadSign(
    id: 'T-avstånd',
    cat: SignCat.plate,
    name: T('Avstånd till platsen', 'Distance to the point'),
    meaning: T('Avståndet fram till där märket ovanför börjar gälla.',
        'The distance to where the sign above starts to apply.'),
    svg: platePlain(),
    sectionId: 'ch08.3',
    overlay: '200 m',
    overlaySize: 0.18,
  ),
  RoadSign(
    id: 'T-sträcka',
    cat: SignCat.plate,
    name: T('Sträckans längd', 'Length of the stretch'),
    meaning: T('Hur långt märket ovanför gäller.', 'How far the sign above applies.'),
    svg: platePlain(),
    sectionId: 'ch08.3',
    overlay: '2 km',
    overlaySize: 0.18,
  ),
  RoadSign(
    id: 'T-tid',
    cat: SignCat.plate,
    name: T('Tidsangivelse', 'Time plate'),
    meaning: T('Svarta siffror = vardagar. Siffror inom parentes = vardag före sön- och helgdag. '
        'Röda siffror = sön- och helgdag.',
        'Black figures = weekdays. Figures in brackets = the day before a Sunday or holiday. Red figures = '
            'Sundays and holidays.'),
    svg: platePlain(),
    sectionId: 'ch08.3',
    overlay: '8–18',
    overlaySize: 0.18,
  ),
  RoadSign(
    id: 'T-pskiva',
    cat: SignCat.plate,
    name: T('Parkeringsskiva', 'Parking disc required'),
    meaning: T('Ställ in ankomsttiden på P-skivan, avrundat uppåt till närmaste halvtimme.',
        'Set your arrival time on the disc, rounded up to the next half hour.'),
    svg: platePlain(),
    sectionId: 'ch08.3',
    overlay: '2 tim',
    overlaySize: 0.18,
  ),
  RoadSign(
    id: 'T-undantag',
    cat: SignCat.plate,
    name: T('Undantag från förbudet', 'Exception to the ban'),
    meaning: T('Anger vem eller vad som slipper förbudet ovanför, till exempel behörig trafik.',
        'States who or what is exempt from the ban above, for example authorised traffic.'),
    svg: platePlain(),
    sectionId: 'ch08.3',
    overlay: 'Gäller ej\nbehörig trafik',
    overlaySize: 0.11,
  ),
  RoadSign(
    id: 'T-rörelsehindrad',
    cat: SignCat.plate,
    name: T('Rörelsehindrad med tillstånd', 'Holders of a disabled permit'),
    meaning: T('Platsen eller undantaget gäller den som har parkeringstillstånd för rörelsehindrad.',
        'The bay or exemption applies to holders of a disabled parking permit.'),
    svg: plate(
        '<g fill="$kBlack"><circle cx="58" cy="16" r="10"/>'
        '<path d="M44 32 h14 v22 h22 v12 H58 c-8 0 -14 -6 -14 -14 z"/>'
        '<circle cx="44" cy="66" r="24" fill="none" stroke="$kBlack" stroke-width="8"/></g>',
        scale: 0.5),
    sectionId: 'ch08.3',
  ),

  // ── Lokaliserings-, upplysnings- och servicemärken ──────────────────────
  RoadSign(
    id: 'F-vägvisare',
    cat: SignCat.guide,
    name: T('Vägvisare', 'Direction sign'),
    meaning: T('Blå botten = vanlig väg. Grön = motorväg eller motortrafikled. '
        'Vit = lokalt mål. Gul/orange = omledning.',
        'Blue = ordinary road. Green = motorway or clearway. White = local destination. '
            'Yellow/orange = diversion.'),
    svg: panel(_guideArrow, fill: kBlue, scale: 0.72),
    sectionId: 'ch08.1',
  ),
  RoadSign(
    id: 'F-motorvägsvisare',
    cat: SignCat.guide,
    name: T('Vägvisare för motorväg', 'Motorway direction sign'),
    meaning: T('Grön botten betyder att målet nås via motorväg eller motortrafikled.',
        'A green background means the destination is reached via a motorway or clearway.'),
    svg: panel(_guideArrow, fill: kGreen, scale: 0.72),
    sectionId: 'ch08.1',
  ),
  RoadSign(
    id: 'F-omledning',
    cat: SignCat.guide,
    name: T('Omledningsvisare', 'Diversion sign'),
    meaning: T('Orange botten leder dig runt ett hinder eller ett vägarbete.',
        'An orange background routes you around an obstruction or roadworks.'),
    svg: panel(_guideArrow, fill: '#F08000', scale: 0.72),
    sectionId: 'ch08.1',
  ),
  RoadSign(
    id: 'G-drivmedel',
    cat: SignCat.service,
    name: T('Drivmedel', 'Fuel'),
    meaning: T('Servicemärke: bensinstation eller laddstation i närheten.',
        'Service sign: a petrol or charging station nearby.'),
    svg: panel(fuelArt, fill: kBlue, scale: 0.6),
    sectionId: 'ch08.1',
  ),
  RoadSign(
    id: 'G-restaurang',
    cat: SignCat.service,
    name: T('Restaurang', 'Restaurant'),
    meaning: T('Servering i närheten — och en påminnelse om att pausa varannan timme.',
        'Food nearby — and a reminder to break every two hours.'),
    svg: panel(foodArt, fill: kBlue, scale: 0.6),
    sectionId: 'ch08.1',
  ),
  RoadSign(
    id: 'G-toalett',
    cat: SignCat.service,
    name: T('Toalett', 'Toilet'),
    meaning: T('Toalett vid rastplats eller station.', 'Toilets at a rest area or station.'),
    svg: panel(wcArt, fill: kBlue, scale: 0.6),
    sectionId: 'ch08.1',
  ),
  RoadSign(
    id: 'G-sjukhus',
    cat: SignCat.service,
    name: T('Sjukhus', 'Hospital'),
    meaning: T('Sjukhus i närheten. Räkna med utryckningsfordon.',
        'A hospital nearby. Expect emergency vehicles.'),
    svg: panel(hospitalArt, fill: kBlue, scale: 0.56),
    sectionId: 'ch08.1',
  ),
  RoadSign(
    id: 'G-telefon',
    cat: SignCat.service,
    name: T('Nödtelefon', 'Emergency telephone'),
    meaning: T('Nödtelefon, vanlig i tunnlar och på motorvägar.',
        'An emergency telephone, common in tunnels and on motorways.'),
    svg: panel(phoneArt, fill: kBlue, scale: 0.54),
    sectionId: 'ch08.1',
  ),
  RoadSign(
    id: 'J-info',
    cat: SignCat.notice,
    name: T('Upplysningsmärke', 'Notice sign'),
    meaning: T('Upplyser om något som är bra att veta men som inte styr hur du kör.',
        'Tells you something useful that does not govern how you drive.'),
    svg: panel(infoArt, fill: kBlue, scale: 0.5),
    sectionId: 'ch08.2',
  ),
  RoadSign(
    id: 'J-färja',
    cat: SignCat.notice,
    name: T('Färjeläge', 'Ferry berth'),
    meaning: T('Färja. Följ personalens anvisningar, dra åt handbromsen och stäng av motorn ombord.',
        'A ferry. Follow the crew’s instructions, apply the handbrake and switch off on board.'),
    svg: panel(ferry, fill: kBlue, scale: 0.6),
    sectionId: 'ch08.2',
  ),
  RoadSign(
    id: 'X-markeringsskärm',
    cat: SignCat.notice,
    name: T('Markeringsskärm', 'Barrier board'),
    meaning: T('Röd-gula fält som visar var du inte får köra. Snedstrecken lutar mot den sida '
        'du ska passera.',
        'Red and yellow panels showing where you may not drive. The stripes slope towards the side '
            'you should pass.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<rect x="4" y="30" width="92" height="40" rx="4" fill="$kYellow"/>'
        '<g fill="$kRed"><path d="M4 70 L30 30 h20 L24 70 z"/>'
        '<path d="M44 70 L70 30 h20 L64 70 z"/></g>'
        '<rect x="4" y="30" width="92" height="40" rx="4" fill="none" stroke="$kBlack" '
        'stroke-width="3"/></svg>',
    sectionId: 'ch08.2',
  ),
];
