LESSONS.parking = {
  title: 'Stopping & parking',
  minutes: 20,
  intro: 'A car standing in the wrong place can hide a child from other drivers, block a bus or force cyclists out into traffic. The law separates stopping from parking, and some places ban one or both.',
  sections: [
    {
      h: 'Stopping or parking?',
      body: '<p>Traffic law uses two different words, and the test checks that you know the difference.</p>' +
        '<ul><li><strong>Parking</strong> (parkering) means leaving the vehicle standing, with or without the driver, for any reason other than: to avoid danger or because of the traffic (for example a queue), to let <strong>passengers get on or off</strong>, or to <strong>load or unload goods</strong>.</li>' +
        '<li><strong>Stopping</strong> (stannande) is a short stop that is not parking, for example letting a friend out of the car or unloading a box at a shop.</li></ul>' +
        '<p>It does not matter whether you sit in the car or leave the engine running. If you wait ten minutes for a friend who is shopping, you are <strong>parked</strong>.</p>',
    },
    {
      h: 'Which side of the road',
      body: '<ul><li>On a two-way road you must stop and park on the <strong>right-hand side</strong> in your direction of travel. This also applies when you only stop to let a passenger out.</li>' +
        '<li>On a <strong>one-way road</strong> you may stop and park on <strong>both</strong> the right and the left side.</li>' +
        '<li>Park close to the edge of the road and along it, unless markings show another way to park.</li></ul>',
      pics: [{ road: { lanes: 'oneway2', signs: [{ name: 'one-way', y: 40, side: 'right' }], objects: [{ kind: 'car', x: 166, y: 230, dir: 'up', label: 'A', color: 'red' }, { kind: 'car', x: 234, y: 300, dir: 'up', label: 'B', color: 'green' }] } }],
    },
    {
      h: 'Where you must not stop or park',
      body: '<p>In these places you may neither stop nor park, unless the traffic forces you to or you must stop to avoid danger:</p>' +
        '<ul><li>On a <strong>pedestrian crossing</strong> (övergångsställe) or within <strong>10 metres before</strong> it. Cars standing there hide pedestrians from other drivers.</li>' +
        '<li>On a <strong>cycle crossing</strong> (cykelöverfart).</li>' +
        '<li>In a <strong>junction</strong> or within <strong>10 metres</strong> of the nearest edge of the crossing carriageway.</li>' +
        '<li>In a <strong>tunnel</strong> and on a <strong>level crossing</strong> (railway crossing).</li>' +
        '<li>On a <strong>cycle path</strong> or in a <strong>cycle lane</strong>.</li>' +
        '<li>On or near a <strong>hilltop</strong> or a <strong>bend</strong> where the view is limited.</li>' +
        '<li>So close to a <strong>solid line</strong> (spärrlinje) that other vehicles would have to cross it to get past you.</li>' +
        '<li>Where your car would hide a <strong>road sign or traffic light</strong>.</li></ul>',
      pics: [{ road: { lanes: 2, crossing: 110, signs: [{ name: 'ped-crossing', y: 76, side: 'right' }], objects: [{ kind: 'car', x: 234, y: 160, dir: 'up', label: 'A', color: 'red' }, { kind: 'car', x: 234, y: 340, dir: 'up', label: 'B', color: 'green' }] } }],
    },
    {
      h: 'Where you must not park',
      body: '<p>In these places a short <strong>stop</strong> to let passengers out or to load goods may be allowed if it is safe, but you must not <strong>park</strong>:</p>' +
        '<ul><li>At a <strong>bus stop</strong> (busshållplats). Buses need the space to pull in.</li>' +
        '<li>In front of the <strong>entrance to a property</strong>, so that vehicles find it hard to drive in or out.</li>' +
        '<li>At a <strong>passing place</strong> (mötesplats, the M sign) on a narrow road.</li>' +
        '<li>On a <strong>priority road</strong> (huvudled), inside or outside built-up areas. Use a lay-by or a side road to rest.</li>' +
        '<li>Within <strong>30 metres</strong> of a level crossing.</li>' +
        '<li>In a <strong>walking-pace zone</strong> (gångfartsområde), except at places marked for parking.</li></ul>' +
        '<p>On a <strong>motorway</strong> or an <strong>expressway</strong> (motortrafikled) you may stop or park only at places marked for it, such as rest areas. Stopping anywhere else is allowed only in an emergency, for example a breakdown.</p>',
      pics: [{ road: { lanes: 2, busStop: 190, objects: [{ kind: 'car', x: 258, y: 190, dir: 'up', label: 'A', color: 'red' }] } }],
    },
    {
      h: 'Parking signs',
      body: '<ul><li><strong>No parking</strong> (A, förbud att parkera fordon): blue with a red border and <strong>one red bar</strong>. You may not park, but you may stop to let passengers on or off or to load and unload.</li>' +
        '<li><strong>No stopping or parking</strong> (B, förbud att stanna och parkera fordon): blue with a red border and a <strong>red cross</strong>. You may not even stop to drop someone off. Only stopping forced by the traffic is allowed.</li>' +
        '<li><strong>Parking</strong> (C): the blue P sign shows where parking is allowed.</li></ul>' +
        '<p>Signs that ban stopping or parking apply only on the <strong>side of the road where they stand</strong>, and normally up to the next junction unless a plate says otherwise.</p>' +
        '<p><strong>Plates</strong> under the signs can limit the time you may park, require a fee or a <strong>parking disc</strong> (parkeringsskiva), or reserve the space for certain vehicles. Times on plates: <strong>black</strong> numbers apply on weekdays, numbers in <strong>brackets</strong> on the day before a Sunday or public holiday, and <strong>red</strong> numbers on Sundays and public holidays. Always read every plate before you leave the car.</p>',
      pics: [{ signs: ['no-parking', 'no-stopping', 'parking'], labels: ['A', 'B', 'C'] }],
    },
    {
      h: 'Leaving the car',
      body: '<ul><li>Before you leave the car: switch off the engine, apply the <strong>parking brake</strong>, take the key and lock the car.</li>' +
        '<li>Parked facing <strong>downhill</strong> next to a kerb: turn the front wheels <strong>towards the kerb</strong>, so that the car rolls into it if the brake fails.</li>' +
        '<li>If you must leave the car at the edge of an <strong>unlit road in the dark</strong>, use the <strong>parking lights</strong> (parkeringsljus, position lights) so others can see it. Do not leave full beam or fog lights on, as they dazzle oncoming drivers.</li></ul>',
    },
    {
      h: 'Opening the door safely',
      body: '<p>A door that opens suddenly can throw a passing cyclist off the bike. Before <strong>you</strong> or your passengers open a door, check the <strong>mirror</strong> and look back over your <strong>shoulder</strong> for cyclists and other traffic. Wait until they have passed.</p>' +
        '<p>Passengers should get out on the side facing the pavement when they can.</p>',
      pics: [{ road: { lanes: 2, you: { x: 234, y: 200 }, objects: [{ kind: 'bike', x: 206, y: 330, dir: 'up', label: 'C', color: 'green' }] } }],
    },
  ],
  keyFacts: [
    'Letting passengers on or off and loading goods is stopping, not parking. Waiting for someone is parking, even with the engine running.',
    'On a two-way road, stop and park on the right side in your direction of travel. On a one-way road both sides are allowed.',
    'No stopping or parking on a pedestrian crossing or within 10 m before it.',
    'No stopping or parking in a junction or within 10 m of the crossing carriageway.',
    'No stopping or parking in a tunnel, on a level crossing, on a cycle crossing or in a cycle lane.',
    'No parking at a bus stop, at a passing place, in front of a property entrance, on a priority road, or within 30 m of a level crossing.',
    'On motorways and expressways: stop or park only at marked places, such as rest areas.',
    'One red bar = no parking. Red cross = no stopping or parking. They apply on the side of the road where the sign stands.',
    'On unlit roads in the dark, a standing car shows parking lights.',
    'Check the mirror and look over your shoulder for cyclists before you open the door.',
  ],
};
