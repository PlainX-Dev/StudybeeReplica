LESSONS.speed = {
  title: 'Speed, distance & overtaking',
  minutes: 25,
  intro: 'Speed decides how long it takes you to stop and how hard you hit if you cannot. The speed limit is the highest speed allowed, not a target: you must always drive so that you can stop within the distance you can see is clear.',
  sections: [
    {
      h: 'Speed limits',
      body: '<ul><li>Where no limit is signed, the <strong>basic speed limit</strong> (bashastighet) applies: <strong>50 km/h</strong> inside a built-up area (tättbebyggt område) and <strong>70 km/h</strong> outside.</li>' +
        '<li>Other limits are shown by <strong>speed limit signs</strong>, for example 30 or 40 km/h near schools and in residential streets, or higher limits on main roads.</li>' +
        '<li>On <strong>motorways</strong> and <strong>expressways</strong> (motortrafikled), follow the limit on the signs. The highest limit in Sweden is <strong>120 km/h</strong>, and only where it is signed.</li>' +
        '<li>A speed limit sign applies at all times unless an extra plate says otherwise. It also applies when you overtake.</li></ul>',
      pics: [{ signs: ['speed-30', 'speed-50', 'speed-70', 'speed-110'] }],
    },
    {
      h: 'Adapting your speed',
      body: '<p>You must adapt your speed to the road, the traffic, the weather and the <strong>visibility</strong>. The key rule: you must always be able to <strong>stop within the distance you can see is clear</strong>.</p>' +
        '<ul><li>In <strong>fog, rain or snow</strong>, and on <strong>ice</strong>, slow down well below the limit.</li>' +
        '<li>At night on <strong>dipped beam</strong> you see a much shorter distance, so drive slower.</li>' +
        '<li>Before <strong>hilltops and bends</strong> you cannot see what is coming: keep right and be ready to stop.</li>' +
        '<li>You may drive below the limit, but not so slowly, without good reason, that you hold up other traffic unnecessarily.</li></ul>',
      pics: [{ view: { time: 'day', weather: 'fog', lanes: 2, signs: [{ name: 'speed-70', side: 'right', d: 0.15 }] } }],
    },
    {
      h: 'Reaction, braking and stopping distance',
      body: '<ul><li><strong>Reaction distance</strong> (reaktionssträcka): how far the car travels from when you notice a danger until you start to brake. At 90 km/h the car moves <strong>25 metres every second</strong>. Tiredness, alcohol and distraction make it longer.</li>' +
        '<li><strong>Braking distance</strong> (bromssträcka): how far the car travels from when you start to brake until it stops. A wet or icy road, worn tyres and downhill slopes make it longer.</li>' +
        '<li><strong>Stopping distance</strong> (stoppsträcka) = reaction distance + braking distance.</li></ul>' +
        '<p><strong>Double the speed</strong> and the reaction distance doubles, but the <strong>braking distance and the crash energy become about four times as large</strong>. Even a small increase in speed makes a crash much more violent.</p>',
    },
    {
      h: 'Following distance',
      body: '<p>Use the <strong>three-second rule</strong> (tresekundersregeln). When the vehicle in front passes a fixed point, such as a post or a sign, count. You should not reach the same point until at least <strong>3 seconds</strong> later.</p>' +
        '<p>On <strong>wet, snowy or icy</strong> roads, in poor visibility, or behind a large vehicle that blocks your view, keep a <strong>much longer</strong> distance.</p>',
      pics: [{ road: { lanes: 2, centre: 'dashed', you: { lane: 'right', y: 330 }, objects: [{ kind: 'car', lane: 'right', y: 170, label: 'B', color: 'red' }] } }],
    },
    {
      h: 'How to overtake',
      body: '<ul><li>You normally overtake on the <strong>left</strong>. A vehicle that has signalled and moved over to <strong>turn left</strong> is overtaken on the <strong>right</strong>.</li>' +
        '<li>Before you start: the road ahead must be clear far enough, nobody behind you may have started to overtake you, and you must be able to get back in without forcing anyone to brake. Check mirrors and blind spot, and signal.</li>' +
        '<li>Never exceed the speed limit to get past.</li>' +
        '<li>When you overtake a <strong>cyclist or moped rider</strong>, keep a safe side distance. If oncoming traffic stops you doing that, wait behind.</li>' +
        '<li>When <strong>you are being overtaken</strong>: keep to the right and <strong>do not speed up</strong>.</li></ul>',
      pics: [{ road: { lanes: 2, centre: 'dashed', you: { lane: 'right', y: 330, path: 'overtake' }, objects: [{ kind: 'tractor', lane: 'right', y: 220, label: 'T', color: 'green' }] } }],
    },
    {
      h: 'Where you must not overtake',
      body: '<ul><li>Just before a <strong>hilltop</strong>, in or just before a <strong>bend</strong>, or anywhere else where you <strong>cannot see far enough</strong> ahead.</li>' +
        '<li>Just before or on a <strong>pedestrian crossing</strong> that is not controlled by traffic lights or a police officer.</li>' +
        '<li>Across a <strong>solid centre line</strong> (spärrlinje): you may not cross or straddle it.</li>' +
        '<li>Where a <strong>no-overtaking sign</strong> applies, for vehicles covered by the sign.</li></ul>',
      pics: [{ view: { lanes: 2, centre: 'solid', crest: true, objects: [{ kind: 'tractor', x: 0.5, d: 0.25, label: 'T' }] } }],
    },
    {
      h: 'Consequences of speeding',
      body: '<p>Speeding is punished with a <strong>fine</strong>. Serious speeding can also lead to your <strong>licence being revoked</strong>. If that happens during the two-year <strong>probation period</strong> (prövotid), you must pass both the theory test and the driving test again.</p>' +
        '<p>The real cost is the risk: higher speed means a longer stopping distance and a much harder impact, especially for pedestrians and cyclists.</p>',
    },
  ],
  keyFacts: [
    'Basic speed limit: 50 km/h in built-up areas, 70 km/h outside, when no other limit is signed.',
    'The speed limit is a maximum. Always be able to stop within the distance you can see is clear.',
    'Stopping distance = reaction distance + braking distance.',
    'Double the speed: about four times the braking distance and crash energy.',
    'At 90 km/h the car travels 25 metres every second.',
    'Keep at least 3 seconds to the vehicle in front, and much more on wet or icy roads.',
    'Overtake on the left; a vehicle turning left is overtaken on the right.',
    'No overtaking before hilltops, in bends, just before or on an uncontrolled pedestrian crossing, or across a solid line.',
    'Being overtaken: keep right and do not speed up.',
  ],
};
