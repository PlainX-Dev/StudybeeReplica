import '../../core/l10n.dart';
import '../../models/content.dart';
import 'sign_art.dart';

const _noEntry = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
    '<circle cx="50" cy="50" r="47" fill="$kRed"/>'
    '<rect x="16" y="41" width="68" height="18" rx="4" fill="$kYellow"/></svg>';

const _twoVehicles = '<g transform="translate(-6,10) scale(0.62)">$carSide</g>'
    '<g transform="translate(46,42) scale(0.5)">$motorcycle</g>';

const _carAndTrailer = '<g transform="translate(-2,14) scale(0.6)">$carSide</g>'
    '<g fill="$kBlack"><rect x="56" y="40" width="40" height="22" rx="4"/>'
    '<circle cx="76" cy="66" r="10"/></g><circle cx="76" cy="66" r="4" fill="$kYellow"/>';

const _studdedTyre = '<g fill="$kBlack">'
    '<circle cx="50" cy="50" r="34"/></g><circle cx="50" cy="50" r="16" fill="$kYellow"/>'
    '<g fill="$kYellow"><rect x="46" y="10" width="8" height="10" rx="2"/>'
    '<rect x="46" y="80" width="8" height="10" rx="2"/>'
    '<rect x="10" y="46" width="10" height="8" rx="2"/>'
    '<rect x="80" y="46" width="10" height="8" rx="2"/>'
    '<rect x="20" y="20" width="9" height="9" rx="2" transform="rotate(45 24 24)"/>'
    '<rect x="71" y="71" width="9" height="9" rx="2" transform="rotate(45 76 76)"/></g>';

const _twoCarsOvertake = '<g transform="translate(-14,6) scale(0.6)">$carSide</g>'
    '<g transform="translate(28,44) scale(0.6)" opacity="1">$carSide</g>';

const _truckOvertake = '<g transform="translate(-16,6) scale(0.58)">$truck</g>'
    '<g transform="translate(30,46) scale(0.55)">$carSide</g>';

const _dangerousGoods = '<g fill="$kBlack">'
    '<rect x="8" y="34" width="46" height="30" rx="4"/>'
    '<path d="M56 44 h18 l14 14 v6 H56 z"/>'
    '<circle cx="24" cy="70" r="10"/><circle cx="72" cy="70" r="10"/></g>'
    '<circle cx="24" cy="70" r="4" fill="$kYellow"/><circle cx="72" cy="70" r="4" fill="$kYellow"/>'
    '<rect x="18" y="14" width="30" height="16" rx="3" fill="$kBlack"/>';

const _widthArrows = '<g fill="$kBlack">'
    '<path d="M4 50 L26 32 v12 h48 V32 l22 18 -22 18 V56 H26 v12 z"/></g>';

const _heightArrows = '<g fill="$kBlack">'
    '<path d="M50 4 L68 26 H56 v48 h12 L50 96 32 74 h12 V26 H32 z"/></g>';

const _lengthTruck = '<g transform="translate(0,10) scale(0.7)">$truck</g>'
    '<path d="M4 84 h92 M8 78 v12 M92 78 v12" stroke="$kBlack" stroke-width="6" fill="none"/>';

const _axle = '<g fill="$kBlack"><rect x="18" y="30" width="64" height="12" rx="5"/>'
    '<circle cx="24" cy="62" r="18"/><circle cx="76" cy="62" r="18"/>'
    '<path d="M46 6 h8 v22 h-8 z"/><path d="M36 22 l14 14 14 -14 z"/></g>';

/// C — prohibitory signs. Yellow disc, red ring: *this is not allowed here*.
/// Unless a plate says otherwise, the ban runs from the sign to the next junction.
final signsC = <RoadSign>[
  RoadSign(
    id: 'C1',
    cat: SignCat.prohibition,
    name: T('Förbud mot infart med fordon', 'No entry'),
    meaning: T('Du får inte köra in här. Sitter oftast i mynningen av en enkelriktad gata.',
        'You may not drive in here. Usually at the far end of a one-way street.'),
    svg: _noEntry,
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C2',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med fordon', 'No vehicles'),
    meaning: T('Inga fordon alls får passera — inte ens cykel, som ju också är ett fordon.',
        'No vehicles at all may pass — not even a bicycle, which counts as a vehicle.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C3',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med annat motordrivet fordon än moped klass II',
        'No motor vehicles except class II mopeds'),
    meaning: T('Bilar, motorcyklar och EU-mopeder är förbjudna. Cykel och moped klass II får passera.',
        'Cars, motorcycles and EU mopeds are banned. Bicycles and class II mopeds may pass.'),
    svg: prohibit(_twoVehicles, scale: 0.62),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C4',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med motordrivet fordon med fler än två hjul',
        'No motor vehicles with more than two wheels'),
    meaning: T('Bilar och lastbilar förbjudna; motorcykel och moped får passera.',
        'Cars and lorries banned; motorcycles and mopeds may pass.'),
    svg: prohibit(carSide, scale: 0.56),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C5',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med motorcykel och moped klass I',
        'No motorcycles or class I mopeds'),
    meaning: T('Motorcyklar och EU-mopeder får inte passera.',
        'Motorcycles and EU mopeds may not pass.'),
    svg: prohibit(motorcycle, scale: 0.54),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C6',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med motordrivet fordon med tillkopplad släpvagn',
        'No motor vehicles with a trailer'),
    meaning: T('Du får inte passera med släp. Vanligt i branta backar och smala gator.',
        'You may not pass towing a trailer. Common on steep hills and narrow streets.'),
    svg: prohibit(_carAndTrailer, scale: 0.58),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C7',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med tung lastbil', 'No heavy goods vehicles'),
    meaning: T('Lastbil med totalvikt över 3,5 ton får inte passera.',
        'Lorries with a gross weight over 3.5 tonnes may not pass.'),
    svg: prohibit(truck, scale: 0.56),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C8',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med traktor och motorredskap klass II',
        'No tractors or class II machinery'),
    meaning: T('Långsamma arbetsfordon får inte passera.',
        'Slow working vehicles may not pass.'),
    svg: prohibit(tractor, scale: 0.56),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C9',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med fordon lastat med farligt gods',
        'No vehicles carrying dangerous goods'),
    meaning: T('Gäller transporter av farligt gods, typiskt vid tunnlar och vattenskyddsområden.',
        'Applies to dangerous-goods transports, typically at tunnels and water protection areas.'),
    svg: prohibit(_dangerousGoods, scale: 0.58),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C10',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med cykel och moped klass II',
        'No bicycles or class II mopeds'),
    meaning: T('Cyklar och långsamma mopeder får inte passera.',
        'Bicycles and slow mopeds may not pass.'),
    svg: prohibit(bike, scale: 0.48),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C11',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med moped klass II', 'No class II mopeds'),
    meaning: T('Endast moped klass II är förbjuden — cykel får passera.',
        'Only class II mopeds are banned — bicycles may pass.'),
    svg: prohibit(moped, scale: 0.54),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C12',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med fordon förspänt med dragdjur',
        'No animal-drawn vehicles'),
    meaning: T('Hästekipage får inte passera.', 'Horse-drawn vehicles may not pass.'),
    svg: prohibit(horse, scale: 0.5),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C13',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med terrängmotorfordon och terrängsläp',
        'No off-road motor vehicles'),
    meaning: T('Snöskoter och terrängfordon får inte passera.',
        'Snowmobiles and off-road vehicles may not pass.'),
    svg: prohibit(tractor, scale: 0.5),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C14',
    cat: SignCat.prohibition,
    name: T('Förbud mot ridning', 'No horse riding'),
    meaning: T('Ridning är förbjuden på vägen eller leden.',
        'Riding is prohibited on this road or trail.'),
    svg: prohibit(horse, scale: 0.5, slash: true),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C15',
    cat: SignCat.prohibition,
    name: T('Förbud mot gångtrafik', 'No pedestrians'),
    meaning: T('Gående får inte gå här — typiskt på motorväg och i tunnlar.',
        'Pedestrians may not walk here — typically on motorways and in tunnels.'),
    svg: prohibit(ped, scale: 0.5),
    sectionId: 'ch06.2',
  ),
  RoadSign(
    id: 'C16',
    cat: SignCat.prohibition,
    name: T('Begränsad fordonsbredd', 'Width limit'),
    meaning: T('Fordon bredare än angivet mått, inklusive last, får inte passera.',
        'Vehicles wider than the stated measurement, load included, may not pass.'),
    svg: prohibit(_widthArrows, scale: 0.5, dy: -8),
    sectionId: 'ch06.3',
    overlay: '2,5 m',
    overlaySize: 0.17,
    overlayDy: 0.14,
  ),
  RoadSign(
    id: 'C17',
    cat: SignCat.prohibition,
    name: T('Begränsad fordonshöjd', 'Height limit'),
    meaning: T('Fri höjd är lägre än 4,5 m. Räkna med taklast och antenn.',
        'The clear height is below 4.5 m. Remember roof loads and aerials.'),
    svg: prohibit(_heightArrows, scale: 0.46, dx: -18),
    sectionId: 'ch06.3',
    overlay: '3,5 m',
    overlaySize: 0.17,
    overlayDy: 0.02,
  ),
  RoadSign(
    id: 'C18',
    cat: SignCat.prohibition,
    name: T('Begränsad fordonslängd', 'Length limit'),
    meaning: T('Fordon eller fordonståg längre än angivet mått får inte passera.',
        'Vehicles or combinations longer than the stated measurement may not pass.'),
    svg: prohibit(_lengthTruck, scale: 0.5, dy: -8),
    sectionId: 'ch06.3',
    overlay: '10 m',
    overlaySize: 0.16,
    overlayDy: 0.16,
  ),
  RoadSign(
    id: 'C19',
    cat: SignCat.prohibition,
    name: T('Begränsad bruttovikt på fordon', 'Gross weight limit, vehicle'),
    meaning: T('Fordonets faktiska vikt just nu får inte överstiga angivet ton-tal.',
        'The vehicle’s actual weight right now may not exceed the stated tonnage.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.3',
    overlay: '3,5t',
    overlaySize: 0.30,
  ),
  RoadSign(
    id: 'C20',
    cat: SignCat.prohibition,
    name: T('Begränsad bruttovikt på fordonståg', 'Gross weight limit, combination'),
    meaning: T('Gäller bil och släp tillsammans.', 'Applies to car and trailer together.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.3',
    overlay: '12t',
    overlaySize: 0.30,
  ),
  RoadSign(
    id: 'C21',
    cat: SignCat.prohibition,
    name: T('Begränsat axeltryck', 'Axle load limit'),
    meaning: T('Vikten som bärs av en enskild axel får inte överstiga angivet värde.',
        'The weight carried by a single axle may not exceed the stated value.'),
    svg: prohibit(_axle, scale: 0.46, dy: -10),
    sectionId: 'ch06.3',
    overlay: '8t',
    overlaySize: 0.18,
    overlayDy: 0.16,
  ),
  RoadSign(
    id: 'C22',
    cat: SignCat.prohibition,
    name: T('Begränsat boggitryck', 'Bogie load limit'),
    meaning: T('Gäller två närliggande axlar tillsammans.',
        'Applies to two adjacent axles together.'),
    svg: prohibit(_axle, scale: 0.46, dy: -10),
    sectionId: 'ch06.3',
    overlay: '12t',
    overlaySize: 0.18,
    overlayDy: 0.16,
  ),
  RoadSign(
    id: 'C27',
    cat: SignCat.prohibition,
    name: T('Förbud mot omkörning', 'No overtaking'),
    meaning: T('Du får inte köra om andra motordrivna fordon. Cyklar och mopeder klass II får du passera.',
        'You may not overtake other motor vehicles. Bicycles and class II mopeds you may pass.'),
    svg: prohibit(_twoCarsOvertake, scale: 0.66),
    sectionId: 'ch06.4',
  ),
  RoadSign(
    id: 'C28',
    cat: SignCat.prohibition,
    name: T('Slut på förbud mot omkörning', 'End of no-overtaking'),
    meaning: T('Omkörningsförbudet upphör — men bara omkörningsförbudet.',
        'The overtaking ban ends — and only the overtaking ban.'),
    svg: prohibitEnd(_twoCarsOvertake, scale: 0.66),
    sectionId: 'ch06.4',
  ),
  RoadSign(
    id: 'C29',
    cat: SignCat.prohibition,
    name: T('Förbud mot omkörning med tung lastbil', 'No overtaking by heavy lorries'),
    meaning: T('Gäller endast tunga lastbilar — personbilar får köra om.',
        'Applies only to heavy lorries — cars may still overtake.'),
    svg: prohibit(_truckOvertake, scale: 0.66),
    sectionId: 'ch06.4',
  ),
  RoadSign(
    id: 'C30',
    cat: SignCat.prohibition,
    name: T('Slut på förbud mot omkörning med tung lastbil',
        'End of no-overtaking for heavy lorries'),
    meaning: T('Förbudet för tunga lastbilar upphör.',
        'The ban for heavy lorries ends.'),
    svg: prohibitEnd(_truckOvertake, scale: 0.66),
    sectionId: 'ch06.4',
  ),
  RoadSign(
    id: 'C31-30',
    cat: SignCat.prohibition,
    name: T('Hastighetsbegränsning 30', 'Speed limit 30'),
    meaning: T('Högsta tillåtna hastighet 30 km/h. Vanligt vid skolor och bostadsgator.',
        'Maximum permitted speed 30 km/h. Common at schools and residential streets.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.4',
    overlay: '30',
    overlaySize: 0.40,
  ),
  RoadSign(
    id: 'C31-50',
    cat: SignCat.prohibition,
    name: T('Hastighetsbegränsning 50', 'Speed limit 50'),
    meaning: T('Högsta tillåtna hastighet 50 km/h — samma som bashastigheten i tätort.',
        'Maximum 50 km/h — the same as the default limit inside built-up areas.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.4',
    overlay: '50',
    overlaySize: 0.40,
  ),
  RoadSign(
    id: 'C31-70',
    cat: SignCat.prohibition,
    name: T('Hastighetsbegränsning 70', 'Speed limit 70'),
    meaning: T('Högsta tillåtna hastighet 70 km/h — bashastigheten utanför tätort.',
        'Maximum 70 km/h — the default limit outside built-up areas.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.4',
    overlay: '70',
    overlaySize: 0.40,
  ),
  RoadSign(
    id: 'C31-110',
    cat: SignCat.prohibition,
    name: T('Hastighetsbegränsning 110', 'Speed limit 110'),
    meaning: T('Högsta tillåtna hastighet 110 km/h — men med släp gäller ändå 80.',
        'Maximum 110 km/h — but with a trailer you are still limited to 80.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.4',
    overlay: '110',
    overlaySize: 0.34,
  ),
  RoadSign(
    id: 'C32',
    cat: SignCat.prohibition,
    name: T('Tillfällig hastighetsbegränsning upphör', 'End of temporary speed limit'),
    meaning: T('Den tillfälliga begränsningen slutar; bashastigheten eller den skyltade gäller igen.',
        'The temporary limit ends; the default or posted limit applies again.'),
    svg: prohibitEnd('', scale: 0.4),
    sectionId: 'ch06.4',
    overlay: '70',
    overlaySize: 0.34,
  ),
  RoadSign(
    id: 'C33',
    cat: SignCat.prohibition,
    name: T('Stopp vid tull', 'Stop at customs'),
    meaning: T('Du måste stanna för tullkontroll.', 'You must stop for customs control.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.4',
    overlay: 'TULL',
    overlaySize: 0.16,
  ),
  RoadSign(
    id: 'C34',
    cat: SignCat.prohibition,
    name: T('Stopp för angivet ändamål', 'Stop for stated purpose'),
    meaning: T('Du måste stanna av det skäl som anges på märket, till exempel poliskontroll.',
        'You must stop for the reason given on the sign, for example a police check.'),
    svg: prohibitPlain(),
    sectionId: 'ch06.4',
    overlay: 'POLIS',
    overlaySize: 0.14,
  ),
  RoadSign(
    id: 'C35',
    cat: SignCat.prohibition,
    name: T('Förbud mot att parkera fordon', 'No parking'),
    meaning: T('Du får inte parkera — men du får stanna för att släppa av någon eller lasta.',
        'You may not park — but you may stop to drop someone off or load goods.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<circle cx="50" cy="50" r="47" fill="$kRed"/><circle cx="50" cy="50" r="38" fill="$kBlue"/>'
        '<path d="M24 76 L76 24" stroke="$kRed" stroke-width="10" stroke-linecap="round"/></svg>',
    sectionId: 'ch06.5',
  ),
  RoadSign(
    id: 'C36',
    cat: SignCat.prohibition,
    name: T('Förbud mot att parkera på dag med udda datum', 'No parking on odd dates'),
    meaning: T('Parkering förbjuden på den sidan under udda datum.',
        'Parking prohibited on this side on odd-numbered dates.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<circle cx="50" cy="50" r="47" fill="$kRed"/><circle cx="50" cy="50" r="38" fill="$kBlue"/>'
        '<path d="M24 76 L76 24" stroke="$kRed" stroke-width="10" stroke-linecap="round"/>'
        '<rect x="42" y="14" width="16" height="16" rx="3" fill="$kWhite"/></svg>',
    sectionId: 'ch06.5',
  ),
  RoadSign(
    id: 'C37',
    cat: SignCat.prohibition,
    name: T('Förbud mot att parkera på dag med jämnt datum', 'No parking on even dates'),
    meaning: T('Parkering förbjuden på den sidan under jämna datum.',
        'Parking prohibited on this side on even-numbered dates.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<circle cx="50" cy="50" r="47" fill="$kRed"/><circle cx="50" cy="50" r="38" fill="$kBlue"/>'
        '<path d="M24 76 L76 24" stroke="$kRed" stroke-width="10" stroke-linecap="round"/>'
        '<rect x="34" y="14" width="14" height="14" rx="3" fill="$kWhite"/>'
        '<rect x="54" y="14" width="14" height="14" rx="3" fill="$kWhite"/></svg>',
    sectionId: 'ch06.5',
  ),
  RoadSign(
    id: 'C38',
    cat: SignCat.prohibition,
    name: T('Datumparkering', 'Date parking'),
    meaning: T('Jämnt datum → parkera på sidan med jämna husnummer. Udda datum → udda sida.',
        'Even date → park on the side with even house numbers. Odd date → odd side.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<circle cx="50" cy="50" r="47" fill="$kRed"/><circle cx="50" cy="50" r="38" fill="$kBlue"/>'
        '<path d="M24 76 L76 24" stroke="$kRed" stroke-width="10" stroke-linecap="round"/>'
        '<rect x="30" y="12" width="12" height="12" rx="3" fill="$kWhite"/>'
        '<rect x="46" y="12" width="12" height="12" rx="3" fill="$kWhite"/>'
        '<rect x="62" y="12" width="12" height="12" rx="3" fill="$kWhite"/></svg>',
    sectionId: 'ch06.5',
  ),
  RoadSign(
    id: 'C39',
    cat: SignCat.prohibition,
    name: T('Förbud mot att stanna och parkera fordon', 'No stopping or parking'),
    meaning: T('Du får varken stanna eller parkera. Undantag: om trafiken kräver det, eller för att undvika fara.',
        'You may neither stop nor park. Exception: when traffic requires it, or to avoid danger.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<circle cx="50" cy="50" r="47" fill="$kRed"/><circle cx="50" cy="50" r="38" fill="$kBlue"/>'
        '<path d="M24 76 L76 24 M24 24 L76 76" stroke="$kRed" stroke-width="10" '
        'stroke-linecap="round"/></svg>',
    sectionId: 'ch06.5',
  ),
  RoadSign(
    id: 'C40',
    cat: SignCat.prohibition,
    name: T('Ändamålsplats', 'Reserved-purpose bay'),
    meaning: T('Platsen är reserverad för ett visst ändamål — lastplats, taxi, buss eller laddning.',
        'The space is reserved for a stated purpose — loading, taxi, bus or charging.'),
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<circle cx="50" cy="50" r="47" fill="$kRed"/><circle cx="50" cy="50" r="38" fill="$kBlue"/>'
        '${place(chargingArt, scale: 0.44)}</svg>',
    sectionId: 'ch06.5',
  ),
  RoadSign(
    id: 'C44',
    cat: SignCat.prohibition,
    name: T('Förbud mot trafik med fordon med dubbdäck', 'No studded tyres'),
    meaning: T('Dubbdäcksförbud, vanligt på enskilda gator i större städer av luftkvalitetsskäl.',
        'A studded-tyre ban, common on individual streets in big cities for air quality reasons.'),
    svg: prohibit(_studdedTyre, scale: 0.62),
    sectionId: 'ch06.2',
  ),
];
