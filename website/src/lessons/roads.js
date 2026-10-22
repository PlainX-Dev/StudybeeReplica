LESSONS.roads = {
  title: 'Motorways, rural roads & railways',
  minutes: 25,
  updated: '2026-10-22T14:00:00Z',
  intro: 'Different roads have different rules. Motorways are the safest roads per kilometre, but mistakes at high speed are severe. On country roads the dangers are oncoming traffic, wild animals and railway crossings, where a train can never stop in time for you.',
  sections: [
    {
      h: 'Motorways and expressways',
      body: '<p>A <strong>motorway</strong> (motorväg) starts at the motorway sign and ends at the same sign with a red diagonal bar. An <strong>expressway</strong> (motortrafikled) has its own sign. The same basic rules apply on both.</p>' +
        '<ul><li>Only <strong>motor vehicles built for, and allowed to drive at, at least 40 km/h</strong> may use them.</li>' +
        '<li><strong>Pedestrians, cyclists and moped riders</strong> are not allowed. A class II moped, for example, is built for at most 25 km/h and may not drive there.</li>' +
        '<li>Expressways often have <strong>no central barrier</strong> between the directions, so oncoming traffic can be close.</li>' +
        '<li>Follow the speed limit on the signs. After the end-of-motorway sign, expect a lower speed limit, junctions and slower road users.</li></ul>',
      pics: [{ signs: ['motorway', 'end-motorway', 'expressway'] }],
    },
    {
      h: 'Joining and leaving the motorway',
      body: '<p><strong>Joining:</strong> you drive onto the motorway via the <strong>acceleration lane</strong>. Use it to <strong>match your speed</strong> to the traffic on the motorway, signal, and merge into a suitable gap.</p>' +
        '<ul><li>You must <strong>give way</strong> to traffic already on the motorway. They do not have to make room for you.</li>' +
        '<li>Do not stop at the end of the acceleration lane unless there is truly no gap.</li></ul>' +
        '<p><strong>Leaving:</strong> move to the right lane <strong>in good time</strong> and signal. Keep your speed until you are on the <strong>deceleration lane</strong>, then slow down there. Braking in the through lane can cause rear-end collisions.</p>' +
        '<p>If you <strong>miss your exit</strong>, drive on to the next one.</p>',
      pics: [
        { road: { lanes: 4, you: { x: 316, y: 330, path: 'change-left' }, objects: [{ kind: 'car', lane: 'right', y: 300, label: 'B', color: 'red' }], signs: [{ name: 'motorway', y: 60, side: 'right' }] } },
        { road: { lanes: 4, you: { lane: 'right', y: 330, path: 'change-right' } } },
      ],
    },
    {
      h: 'Driving on the motorway, and breakdowns',
      body: '<ul><li>Drive in the <strong>right lane</strong>. Use the lanes to the left for <strong>overtaking</strong>, then signal and move back to the right when it is safe.</li>' +
        '<li><strong>Never reverse or make a U-turn</strong>, and never use gaps in the central reservation.</li>' +
        '<li><strong>Stopping is only allowed in an emergency</strong>, such as a breakdown or illness. That includes the hard shoulder. To rest or use your phone, go to a rest area or leave the motorway.</li></ul>' +
        '<p><strong>If you break down:</strong> try to roll onto the hard shoulder, as far to the right as possible. Then:</p>' +
        '<ul><li>Turn on the <strong>hazard lights</strong> and put on <strong>reflective vests</strong>.</li>' +
        '<li>Get everyone out on the side <strong>away from traffic</strong> and wait <strong>behind the crash barrier</strong>. Do not stay in the car or stand behind it.</li>' +
        '<li>Put out the <strong>warning triangle</strong> if it can be done safely, and call for help.</li></ul>',
      pics: [{ road: { lanes: 4, you: { x: 318, y: 220 } } }],
    },
    {
      h: '2+1 roads',
      body: '<p>A <strong>2+1 road</strong> has a <strong>central barrier</strong> (mitträcke), often a cable barrier, between the directions. The lanes alternate: on some sections you have <strong>two lanes</strong>, on others only <strong>one</strong>.</p>' +
        '<ul><li>On a <strong>one-lane section</strong> you cannot overtake. Keep a safe distance and wait for the two-lane section.</li>' +
        '<li>On a <strong>two-lane section</strong>, drive in the right lane and use the left lane to overtake.</li>' +
        '<li>Only start an overtaking that you can <strong>finish before the left lane ends</strong>. If you will not make it, ease off and move in <strong>behind</strong> the vehicle. Never break the speed limit to get past.</li>' +
        '<li>When the left lane ends, the driver in that lane must merge into the right lane. Drivers in the right lane should help by keeping a gap.</li></ul>',
      pics: [
        { road: { lanes: 2, centre: 'barrier', you: { lane: 'right', y: 330 }, objects: [{ kind: 'truck', lane: 'right', y: 200, label: 'T', color: 'orange' }] } },
        { road: { lanes: 'oneway2', you: { lane: 'left', y: 320, path: 'straight' }, objects: [{ kind: 'truck', lane: 'right', y: 210, label: 'T', color: 'orange' }] } },
      ],
    },
    {
      h: 'Rural roads and wild animals',
      body: '<ul><li><strong>Keep to the right</strong>, especially before <strong>hilltops and bends</strong>, where you cannot see oncoming traffic. Never overtake there.</li>' +
        '<li>If an obstacle, such as a parked truck, is <strong>on your side</strong> of a narrow road, you should normally let oncoming traffic pass first.</li>' +
        '<li>On narrow roads, <strong>passing places</strong> (mötesplats, sign M) are for meeting and letting others pass. Use the one on your side. If it is on the other side, wait opposite it so the oncoming driver can use it. <strong>Never park</strong> in a passing place.</li>' +
        '<li>On long, steep downhill slopes (warned by the <strong>steep hill</strong> sign), use a <strong>lower gear</strong> so the engine brakes, and use the footbrake when needed. Braking with the footbrake all the way down can <strong>overheat the brakes</strong> so they lose their effect. Never coast in neutral.</li></ul>' +
        '<p><strong>Wild animals</strong> such as moose and deer are most active at <strong>dawn and dusk</strong>. Where the warning sign is up, slow down and watch the verges. If one animal crosses, <strong>more may follow</strong>.</p>' +
        '<p>If you hit a moose, deer, wild boar or other large wild animal, you must <strong>report it to the police</strong> (call 112) and <strong>mark the place</strong>, even if the animal ran off.</p>',
      pics: [
        { view: { time: 'dusk', lanes: 2, signs: [{ name: 'w-moose', side: 'right', d: 0.2 }], objects: [{ kind: 'moose', x: 1.1, d: 0.5 }] } },
        { view: { lanes: 1, signs: [{ name: 'meeting-place', side: 'right', d: 0.22 }], objects: [{ kind: 'car', x: 0, d: 0.6, facing: 'toward', label: 'B', color: 'red' }] } },
        { signs: ['w-steep-down', 'w-moose'] },
      ],
    },
    {
      h: 'Level crossings',
      body: '<p>A <strong>level crossing</strong> (plankorsning) is where the road crosses a railway. Warning signs tell you which kind is ahead:</p>' +
        '<ul><li>The sign showing a <strong>barrier</strong>: level crossing <strong>with barriers</strong>.</li>' +
        '<li>The sign showing a <strong>steam train</strong>: level crossing <strong>without barriers</strong>. There may be no warning lights either, so slow down, <strong>look and listen</strong> in both directions, and stop if a train is coming.</li>' +
        '<li>At the crossing itself stands the <strong>cross sign</strong> (kryssmärke), a white X with a red border. A <strong>double cross</strong> means there is <strong>more than one track</strong>: another train may come after the first.</li></ul>' +
        '<p>When the <strong>red lights flash</strong> or the barriers start to move, <strong>stop</strong>. Never try to beat the barriers or drive around them. Wait until the barriers are fully up and the lights have gone out.</p>' +
        '<p><strong>Never stop on the tracks.</strong> Only drive onto a crossing if there is room for your whole car on the other side.</p>' +
        '<p>If your car gets <strong>stuck on the tracks</strong>: get everyone out and <strong>well away from the railway at once</strong>. Then call <strong>112</strong>, or the number shown at the crossing, so trains can be stopped.</p>',
      pics: [{ signs: ['w-level-crossing-gates', 'w-level-crossing'] }],
    },
    {
      h: 'Tunnels',
      body: '<ul><li>Use <strong>dipped headlights</strong> and take off your sunglasses before you enter.</li>' +
        '<li>Keep a <strong>good distance</strong> to the vehicle in front.</li>' +
        '<li>Do not stop, reverse or make a U-turn, except in an emergency or when traffic stops.</li></ul>' +
        '<p><strong>If there is a fire</strong> and you cannot drive on, <strong>smoke</strong> is the main danger. Stop as far to the side as possible, <strong>switch off the engine</strong>, <strong>leave the key in the car</strong> so rescue services can move it, and walk to the nearest <strong>emergency exit</strong>.</p>',
    },
  ],
  keyFacts: [
    'Motorways and expressways: only motor vehicles built for, and allowed to drive at, at least 40 km/h. No pedestrians, cyclists or mopeds.',
    'Joining: match your speed on the acceleration lane and give way to traffic already on the motorway.',
    'Leaving: move right in good time and slow down on the deceleration lane, not in the through lane.',
    'On a motorway or expressway: no reversing, no U-turns, and no stopping except in an emergency. Missed your exit? Drive on to the next one.',
    'Breakdown: hazard lights, reflective vests, everyone out away from traffic and behind the barrier, then warning triangle if safe.',
    '2+1 road: only overtake on the two-lane section, and only if you can finish before the lane ends.',
    'Passing place (M): use the one on your side; never park in it.',
    'Hit a large wild animal: report it to the police and mark the place.',
    'Long steep downhill: lower gear and engine braking. Constant footbrake can overheat the brakes.',
    'Level crossing: never stop on the tracks; stop when red lights flash. Stuck? Everyone out and away, then call 112.',
    'Tunnel fire: engine off, key left in the car, walk to the emergency exit.',
  ],
};
