LESSONS.priority = {
  title: 'Right of way at junctions',
  minutes: 25,
  intro: 'Many serious crashes happen at junctions, when two drivers both think they may go first. Learn the order: police signals, then traffic lights, then signs, then the general rules such as the right-hand rule. Right of way is never something you take: even when you have it, watch that the other driver really gives way.',
  sections: [
    {
      h: 'The right-hand rule (högerregeln)',
      body: '<p>At a junction where nothing else decides (no police, no working traffic lights, no signs), the <strong>right-hand rule</strong> applies: when two vehicles\' paths cross, the driver who has the other vehicle on their <strong>right</strong> must give way.</p>' +
        '<ul><li>It does not matter which road looks bigger, whether it is a T-junction, or who arrives first.</li>' +
        '<li>Going straight ahead does not give you priority over a vehicle from your right.</li>' +
        '<li>If a vehicle comes from your <strong>left</strong>, you are on its right, so it must give way to you. Still check that it really slows down.</li>' +
        '<li>With several vehicles, work it out pair by pair. A vehicle with nobody on its right goes first.</li></ul>',
      pics: [
        { junction: { you: { arm: 'S', path: 'straight' }, vehicles: [{ arm: 'E', path: 'straight', color: 'red', label: 'B' }] } },
        { junction: { arms: ['N', 'E', 'S'], you: { arm: 'S', path: 'straight' }, vehicles: [{ arm: 'E', path: 'left', color: 'green', label: 'B' }] } },
      ],
    },
    {
      h: 'Give way and stop (väjningsplikt and stopplikt)',
      body: '<p>The <strong>give-way sign</strong> (väjningsplikt) is a red-bordered triangle pointing down. It is often backed up by a line of white triangles across your lane (shark teeth).</p>' +
        '<ul><li>You must give way to <strong>all</strong> traffic on the road you are entering, from <strong>both left and right</strong>. The right-hand rule no longer helps you.</li>' +
        '<li>Show clearly and in good time that you will give way, by slowing down or stopping. Only drive on when you can do so without forcing anyone to brake or swerve.</li>' +
        '<li>Turning right does not change this: you still enter the lane of traffic coming from your left.</li></ul>' +
        '<p>The <strong>stop sign</strong> (stopplikt) means the same as give way, plus you must <strong>stop completely</strong>, every time, even when the road is empty. Stop at the <strong>stop line</strong>. If there is no line, stop where you can see properly into the crossing road.</p>',
      pics: [
        { signs: ['yield', 'stop'], labels: ['A', 'B'] },
        { junction: { you: { arm: 'S', path: 'straight' }, vehicles: [{ arm: 'W', path: 'straight', color: 'red', label: 'B' }], signs: { S: 'yield' }, lines: { S: 'yield' } } },
        { junction: { arms: ['E', 'S', 'W'], you: { arm: 'S', path: 'stop' }, vehicles: [{ arm: 'E', path: 'straight', color: 'green', label: 'B' }], signs: { S: 'stop' }, lines: { S: 'stop' } } },
      ],
    },
    {
      h: 'Priority road (huvudled)',
      body: '<p>The <strong>priority road sign</strong> (huvudled) is a yellow diamond with a white border. On a priority road you have right of way over traffic coming out of the side roads: they have give-way or stop signs.</p>' +
        '<ul><li>The right-hand rule does not apply between you and the side roads. A car from a side road on your right must wait for you.</li>' +
        '<li>The priority road only gives you priority over the <strong>side roads</strong>. Between two vehicles on the priority road, the normal rules apply. If you turn left, you still give way to oncoming traffic on the priority road.</li>' +
        '<li>The <strong>end of priority road</strong> sign (huvudled upphör) marks where the priority road ends. After it you no longer have priority: at the next junction the signs, or if there are none, the right-hand rule decide.</li></ul>',
      pics: [
        { signs: ['main-road', 'end-main-road'], labels: ['A', 'B'] },
        { junction: { you: { arm: 'S', path: 'straight' }, vehicles: [{ arm: 'E', path: 'straight', color: 'red', label: 'B' }], signs: { S: 'main-road', E: 'yield', W: 'yield' }, lines: { E: 'yield', W: 'yield' } } },
      ],
    },
    {
      h: 'Turning left and turning across people',
      body: '<p>When you <strong>turn left</strong> you must give way to <strong>oncoming</strong> traffic that goes straight ahead or turns right. This applies at unmarked junctions, on a priority road and at green traffic lights alike. Indicating early never gives you priority.</p>' +
        '<ul><li>If the oncoming car turns left across <em>your</em> path while you go straight, it is the other driver who must give way.</li>' +
        '<li>In a junction with give-way signs for two side roads facing each other, both give way to the priority road first. Between the two of them, the one turning left gives way to the one going straight.</li>' +
        '<li>When you turn (left or right), you must give way to <strong>pedestrians</strong> crossing the road you turn into. They can have green at the same time as you.</li></ul>',
      pics: [
        { junction: { you: { arm: 'S', path: 'left' }, vehicles: [{ arm: 'N', path: 'straight', color: 'orange', label: 'B' }] } },
        { junction: { you: { arm: 'S', path: 'right' }, crossings: ['E'], peds: [{ arm: 'E', x: 0.1, label: 'P' }] } },
      ],
    },
    {
      h: 'Coming out: the exit rule (utfartsregeln)',
      body: '<p>When you drive out onto a road from a <strong>car park, petrol station, private property</strong> or a <strong>pedestrian priority zone</strong> (gångfartsområde), or out from a <strong>cycle path</strong> or off-road, you must give way to <strong>all traffic on the road</strong>, from both directions. The right-hand rule does not apply to an exit like this.</p>' +
        '<ul><li>It works the other way too: a car coming out of a petrol station on your right must wait for you.</li>' +
        '<li>A cyclist riding out from a cycle path onto the road must give way to traffic on the road.</li>' +
        '<li>An exit is often recognisable by a dropped kerb or by the pavement or cycle path continuing across it.</li></ul>',
      pics: [
        { junction: { arms: ['E', 'S', 'W'], you: { arm: 'S', path: 'right' }, vehicles: [{ arm: 'W', path: 'straight', color: 'red', label: 'B' }] } },
        { junction: { arms: ['N', 'E', 'S'], you: { arm: 'S', path: 'straight' }, vehicles: [{ arm: 'E', path: 'left', kind: 'bike', color: 'green', label: 'B' }] } },
      ],
    },
    {
      h: 'Roundabouts and cycle crossings',
      body: '<p>A roundabout (cirkulationsplats) is a junction like any other: priority is decided by the signs. Almost every entry has a <strong>give-way sign</strong> and shark teeth, so you give way to the traffic already on the roundabout, and drive anticlockwise round it.</p>' +
        '<p>Where a cycle route crosses the road there are two kinds of crossing:</p>' +
        '<ul><li><strong>Cycle crossing</strong> (cykelöverfart), shown by the cycle crossing sign: if there are no traffic lights or police, drivers must give way to cyclists and class II moped riders who are on it or about to ride onto it. Approach at a low speed so you can stop.</li>' +
        '<li><strong>Cycle passage</strong> (cykelpassage), without that sign: here the <strong>cyclist</strong> must give way to vehicles on the road. As a driver you must still take care and slow down if needed.</li></ul>',
      pics: [
        { roundabout: { you: { arm: 'S', exit: 'N' }, vehicles: [{ ring: 140, label: 'B', color: 'red', exit: 'E' }], signs: { S: 'yield', E: 'yield', N: 'yield', W: 'yield' } } },
        { sign: 'bike-crossing' },
      ],
    },
    {
      h: 'Police, traffic lights, emergency vehicles and trams',
      body: '<p>The order of precedence is: <strong>police signals</strong>, then <strong>traffic lights</strong>, then <strong>road signs</strong>, then the <strong>general rules</strong> such as the right-hand rule. A police officer\'s signal overrides a green light.</p>' +
        '<ul><li>Red and yellow together means the light will soon turn green: you must still wait. Yellow after green means stop, unless you are too close to stop safely.</li>' +
        '<li>A green arrow lets you drive in the direction it points.</li>' +
        '<li><strong>Flashing yellow</strong> means the lights are not controlling traffic: follow the signs, and if there are none, the right-hand rule.</li>' +
        '<li>An <strong>emergency vehicle</strong> (utryckningsfordon) using its blue lights and siren must be given a free way. Move aside or stop in a safe place, and do not block the junction.</li>' +
        '<li>A <strong>tram</strong> (spårvagn) has a long braking distance and cannot steer away from you. Never count on a tram stopping for you.</li></ul>',
      pics: [
        { junction: { you: { arm: 'S', path: 'left' }, vehicles: [{ arm: 'N', path: 'straight', color: 'red', label: 'B' }], lights: { S: 'green', N: 'green', E: 'red', W: 'red' } } },
        { junction: { you: { arm: 'S', path: 'stop' }, vehicles: [{ arm: 'E', path: 'straight', kind: 'ambulance', label: 'A' }], lights: { S: 'green', E: 'red' } } },
      ],
    },
  ],
  keyFacts: [
    'Order of precedence: police signals, traffic lights, signs, then general rules like the right-hand rule.',
    'Right-hand rule: with nothing signed, give way to vehicles coming from your right.',
    'Give-way sign: give way to all traffic on the road you enter, from both sides.',
    'Stop sign: always stop completely at the stop line, then give way to all traffic.',
    'On a priority road, side-road traffic gives way to you; the end-of-priority-road sign ends this.',
    'When turning left, give way to oncoming traffic going straight ahead or turning right, even at a green light.',
    'Exit rule: coming out of a car park, petrol station, property or cycle path, give way to all traffic on the road.',
    'At a cycle crossing (cykelöverfart) without lights or police, drivers give way to cyclists; at a cycle passage the cyclist gives way.',
    'Flashing yellow lights: follow the signs, and with no signs the right-hand rule.',
    'Give emergency vehicles with blue lights and siren a free way.',
  ],
};
