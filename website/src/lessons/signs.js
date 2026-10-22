LESSONS.signs = {
  title: 'Road signs and road markings',
  minutes: 27,
  updated: '2026-10-22T14:00:00Z',
  intro: 'Signs and markings tell you what you must do, what you must not do and what lies ahead. On the test you must recognise them quickly, so learn the shapes and colours first and the details second.',
  sections: [
    {
      h: 'Shapes and colours',
      body: '<p>You can tell what kind of sign it is before you read the symbol:</p><ul>' +
        '<li><strong>Warning signs</strong>: triangles with a yellow background and red border. They warn of a danger ahead, for example a crossroads. The <strong>moose sign</strong> (älg) warns that moose may cross the road: lower your speed, watch the verges and be ready to slow down. Dawn and dusk are high-risk times.</li>' +
        '<li><strong>Prohibition signs</strong>: round with a red border. They tell you what you must <em>not</em> do (including speed limits).</li>' +
        '<li><strong>Mandatory signs</strong>: round and blue. They tell you what you <em>must</em> do, for example straight ahead only. The <strong>pass on the right</strong> sign means you must pass on the right side of the sign and of the traffic island it stands on.</li>' +
        '<li><strong>Information signs</strong>: mostly blue rectangles, such as parking, motorway and pedestrian crossing.</li>' +
        '<li><strong>Priority signs</strong> have their own shapes: the upside-down triangle (give way), the octagon (stop) and the yellow diamond (priority road).</li></ul>',
      pics: [{ signs: ['w-crossroads', 'no-overtaking', 'mandatory-straight', 'parking'], labels: ['Warning', 'Prohibition', 'Mandatory', 'Information'] }, { signs: ['w-moose', 'pass-right'], labels: ['Warning', 'Mandatory'] }],
    },
    {
      h: 'Priority signs',
      body: '<p><strong>Give way</strong> (väjningsplikt): let traffic on the road you are entering pass; stop only if needed. <strong>Stop</strong> (stopplikt): always stop completely at the stop line, even if the road is clear, then give way. ' +
        'The <strong>yellow diamond</strong> marks a priority road (huvudled): side roads give way to you. When it is crossed out, the priority road ends and the normal rules apply again: check the signs at each junction, and where there are none the right-hand rule applies.</p>' +
        '<p>At narrow places, the red-ringed sign means <em>you</em> give way to oncoming traffic; the blue square means oncoming traffic gives way to you.</p>',
      pics: [{ signs: ['yield', 'stop', 'main-road', 'end-main-road'], labels: ['Give way', 'Stop', 'Priority road', 'End of priority road'] }, { signs: ['oncoming-priority', 'priority-over-oncoming'], labels: ['You give way', 'You have priority'] }],
    },
    {
      h: 'Common prohibition signs',
      body: '<ul><li><strong>No entry</strong> (white bar): you may not drive in from this direction.</li>' +
        '<li><strong>No vehicles</strong> (empty red ring): no vehicle traffic in either direction.</li>' +
        '<li><strong>No overtaking</strong>: you may not overtake motor vehicles other than two-wheeled mopeds and motorcycles. You may still overtake a cyclist if it is safe.</li>' +
        '<li><strong>No parking</strong> (one red bar): you may still stop to let passengers on or off, or to load goods.</li>' +
        '<li><strong>No stopping</strong> (red cross): no stopping and no parking at all, not even to drop off a passenger. You may only stop if the traffic situation forces you to.</li></ul>',
      pics: [{ signs: ['no-entry', 'no-vehicles', 'no-parking', 'no-stopping'], labels: ['No entry', 'No vehicles', 'No parking', 'No stopping'] }],
    },
    {
      h: 'Lines along the road',
      body: '<p>A normal <strong>centre line</strong> has short dashes and long gaps. A <strong>warning line</strong> has long dashes and short gaps: you may cross it, but something dangerous or a solid line is coming. A <strong>solid line</strong> (spärrlinje) must not be crossed or straddled. It is used where driving in the oncoming lane would be dangerous, for example because visibility is too short. ' +
        'If there is a double line, follow the line nearest to you. Traffic with the broken line on its side may cross it.</p>',
      pics: [{ road: { lanes: 2, centre: 'warning', you: { lane: 'right', y: 320 } } }, { road: { lanes: 2, centre: 'solid-left', you: { lane: 'right', y: 320 } } }],
    },
    {
      h: 'Lines across the road and crossings',
      body: '<p><strong>Shark teeth</strong> (a give way line) show where to stop if you must give way. A <strong>stop line</strong> is a solid bar, used with the stop sign or traffic lights. ' +
        'A <strong>zebra crossing</strong> has wide white stripes: give way to pedestrians who are on it or about to step onto it. A <strong>cycle crossing</strong> is marked with square blocks: slow down and let cyclists who are on it or about to ride onto it cross.</p>' +
        '<p>The blue square <strong>pedestrian crossing sign</strong> stands at the crossing itself. The warning triangle with a pedestrian is put up in advance, where the crossing may be hard to see.</p>',
      pics: [{ signs: ['w-pedestrian-crossing', 'ped-crossing'], labels: ['Warning', 'Pedestrian crossing'] }, { junction: { arms: ['E', 'S', 'W'], you: { arm: 'S', path: 'right' }, signs: { S: 'yield' }, lines: { S: 'yield' }, crossings: ['E'], bikeCrossings: ['W'] } }],
    },
    {
      h: 'Zones and speed',
      body: '<p>In a <strong>gångfartsområde</strong> (walking-pace zone) you drive at walking pace, give way to pedestrians and park only where marked. ' +
        'Where no speed limit is signed, the basic limit is <strong>50 km/h</strong> in built-up areas and <strong>70 km/h</strong> outside them. ' +
        'The <strong>M</strong> sign marks a passing place on a narrow road; never park there.</p>',
      pics: [{ signs: ['pedestrian-zone', 'meeting-place', 'ped-crossing', 'bike-crossing'], labels: ['Walking-pace zone', 'Passing place', 'Pedestrian crossing', 'Cycle crossing'] }],
    },
  ],
  keyFacts: [
    'Warning signs are yellow triangles with a red border.',
    'Round red-bordered signs forbid; round blue signs order.',
    'Moose warning sign: lower your speed and watch the verges, especially at dawn and dusk.',
    'At a stop sign you must always stop completely at the stop line.',
    'Give way: stop only if traffic is coming on the road you are entering.',
    'No parking still allows stopping to let passengers off or to load goods; no stopping does not.',
    'The no-overtaking sign does not stop you overtaking a cyclist.',
    'Never cross a solid line on your side; a warning line warns of danger ahead.',
    'Give way to pedestrians on or about to step onto a zebra crossing.',
    'Gångfartsområde: walking pace, give way to pedestrians, park only where marked.',
    'Basic speed limit: 50 km/h in built-up areas, 70 km/h outside.',
  ],
};
