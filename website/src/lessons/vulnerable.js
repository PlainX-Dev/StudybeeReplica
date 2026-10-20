LESSONS.vulnerable = {
  title: 'Pedestrians, cyclists, buses & emergency vehicles',
  minutes: 20,
  intro: 'Pedestrians, cyclists, moped riders and horse riders have no protection around them. The law gives them priority in many places, and the test checks that you know where and that you expect their mistakes.',
  sections: [
    {
      h: 'Zebra crossings',
      body: '<p>At an <strong>unguarded</strong> zebra crossing (no traffic lights or police) you must <strong>give way to pedestrians who are on the crossing or about to step onto it</strong>, from either side of the road. Adjust your speed early so you can stop.</p>' +
        '<ul><li>You must <strong>not overtake</strong> immediately before or on an unguarded zebra crossing.</li>' +
        '<li>If the car ahead or beside you slows down before a crossing, assume someone is crossing in front of it whom you cannot see.</li>' +
        '<li>At a crossing with traffic lights, the lights decide; but never drive into someone who is still crossing when your light turns green.</li></ul>',
      pics: [
        { road: { lanes: 2, centre: 'dashed', crossing: 150, you: { lane: 'right', y: 330, path: 'straight' },
          objects: [{ kind: 'ped', x: 258, y: 150, label: 'P', rot: 270 }], signs: [{ name: 'ped-crossing', y: 185, side: 'right' }] } },
      ],
    },
    {
      h: 'Turning, cyclists and mopeds',
      body: '<p>When you <strong>turn</strong> at a junction you must give way to <strong>pedestrians crossing the road you turn into</strong>, and to cyclists and class II moped riders on or about to ride onto a <strong>cycle crossing</strong> there. When you turn left, a cyclist coming towards you is oncoming traffic: give way.</p>' +
        '<p>When you pass a cyclist, leave a <strong>wide gap</strong>. If oncoming traffic stops you doing that, stay behind. Expect a cyclist to swerve out round a parked car or a hole in the road.</p>' +
        '<ul><li>Moped class I: built for max <strong>45 km/h</strong>, rides on the road.</li><li>Moped class II: built for max <strong>25 km/h</strong>, often uses the cycle path.</li></ul>',
      pics: [
        { junction: { arms: ['N', 'E', 'S', 'W'], you: { arm: 'S', path: 'left' }, vehicles: [{ arm: 'N', path: 'straight', kind: 'bike', color: 'green', label: 'C' }] } },
      ],
    },
    {
      h: 'Children, elderly people and others',
      body: '<p><strong>Children</strong> are small, act on impulse and cannot judge speed and distance. A <strong>ball</strong> in the road means a child may follow. People getting off a <strong>bus</strong> often cross in front of it.</p>' +
        '<p><strong>Elderly</strong> people may walk slowly and see or hear less well. A <strong>white cane</strong> means the person is blind or visually impaired.</p>' +
        '<p>Pass <strong>horse riders</strong> slowly and with plenty of space, without using the horn.</p>',
      pics: [
        { view: { time: 'day', lanes: 2, objects: [
          { kind: 'car', x: 1.1, d: 0.42, color: 'blue' }, { kind: 'car', x: 1.1, d: 0.12, color: 'grey' },
          { kind: 'ball', x: 0.75, d: 0.27 }] } },
      ],
    },
    {
      h: 'Buses leaving a stop',
      body: '<p>In a <strong>built-up area</strong> on a road with a speed limit of <strong>50 km/h or lower</strong>, you must slow down and, if needed, stop to let a bus that is <strong>indicating</strong> pull out from a bus stop.</p>' +
        '<p>Whenever you pass a stopped bus, slow down and watch for people walking out in front of it.</p>',
      pics: [
        { road: { lanes: 2, centre: 'dashed', busStop: 170, you: { lane: 'right', y: 340, path: 'straight' },
          objects: [{ kind: 'bus', x: 260, y: 170, label: 'B', color: 'blue', dir: 'up', path: 'change-left' }],
          signs: [{ name: 'speed-50', y: 300, side: 'right' }] } },
      ],
    },
    {
      h: 'Emergency vehicles',
      body: '<p>You must give free passage to an emergency vehicle that uses <strong>blue lights and siren</strong>, whether it comes from behind or towards you. Move to the right and slow down or stop, calmly and in a way the emergency driver can predict. Do not brake hard right in front of it, and do not drive against a red light into crossing traffic.</p>',
      pics: [
        { road: { lanes: 2, centre: 'dashed', you: { lane: 'right', y: 220, path: 'pull-in' }, objects: [{ kind: 'ambulance', lane: 'right', y: 360, label: 'A' }] } },
      ],
    },
    {
      h: 'Pedestrian priority zones',
      body: '<p>In a <strong>gångfartsområde</strong> (blue sign with a house, people and a car) vehicles may drive at <strong>walking pace</strong> only and must <strong>give way to pedestrians</strong>.</p>',
      pics: [{ sign: 'pedestrian-zone' }],
    },
  ],
  keyFacts: [
    'Unguarded zebra crossing: give way to pedestrians on it or about to step onto it, from both sides.',
    'Never overtake immediately before or on an unguarded zebra crossing.',
    'When turning, give way to pedestrians crossing the road you turn into and to cyclists on a cycle crossing there.',
    'A cyclist coming towards you is oncoming traffic: give way when you turn left.',
    'Built-up area, limit 50 km/h or lower: let an indicating bus pull out from its stop.',
    'Blue lights and siren: give free passage — move right, slow down or stop.',
    'Gångfartsområde: walking pace, and pedestrians have priority.',
    'A ball in the road means a child may follow; people may walk out in front of a stopped bus.',
    'Moped class I: max 45 km/h. Moped class II: max 25 km/h.',
  ],
};
