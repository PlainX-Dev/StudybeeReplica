LESSONS.turning = {
  title: 'Turning, lanes & roundabouts',
  minutes: 25,
  updated: '2026-10-22T14:00:00Z',
  intro: 'Most junction crashes happen when someone turns or changes lanes. Show what you plan to do in good time, put the car in the right place on the road, and give way to everyone whose path you cross.',
  sections: [
    {
      h: 'Indicating and turning right',
      body: '<p>Use the <strong>indicator</strong> (körriktningsvisare, blinkers) <strong>in good time</strong> before you turn, change lanes or pull out, so that others can see what you plan to do. Switch it off when you have finished. Indicating only tells others your plan: it <strong>never gives you priority</strong>.</p>' +
        '<ul><li>Before a <strong>right turn</strong>, position the car <strong>close to the right-hand edge</strong> of the road.</li>' +
        '<li>Turn in a <strong>tight curve</strong> into the right-hand side of the new road.</li>' +
        '<li>Check your mirror and blind spot on the right before you turn: cyclists and moped riders may be beside you.</li></ul>',
      pics: [{ junction: { you: { arm: 'S', path: 'right' } } }],
    },
    {
      h: 'Turning left',
      body: '<ul><li>On an ordinary <strong>two-way road</strong>, position the car <strong>close to the centre line, on your own side of it</strong>. Traffic behind you can then pass on your right.</li>' +
        '<li>On a <strong>one-way street</strong> there is no oncoming traffic, so move over <strong>close to the left-hand edge</strong>.</li>' +
        '<li>Turn so that you end up in the <strong>right-hand half</strong> of the road you turn into. Do not cut the corner into the lane meant for traffic coming towards you.</li>' +
        '<li>When you turn left you must <strong>give way to oncoming vehicles</strong> going straight ahead or turning right. If you turn right and an oncoming car turns left into the same road, the oncoming car must give way to you.</li></ul>',
      pics: [{ junction: { you: { arm: 'S', path: 'left' }, vehicles: [{ arm: 'N', path: 'straight', color: 'red', label: 'B' }] } }],
    },
    {
      h: 'Pedestrians and cyclists when you turn',
      body: '<p>When you turn, you cross the path of people going straight on.</p>' +
        '<ul><li>Give way to <strong>pedestrians crossing the road you are turning into</strong>.</li>' +
        '<li>At a pedestrian crossing without traffic lights or a police officer, give way to pedestrians who are on the crossing or about to step onto it.</li>' +
        '<li><strong>Cyclists and moped riders going straight on</strong> beside you, for example on your right when you turn right, must be allowed to pass before you turn. Check the mirror and the <strong>blind spot</strong>, and never turn in front of them.</li></ul>',
      pics: [
        { junction: { you: { arm: 'S', path: 'right', at: 115 }, vehicles: [{ arm: 'S', path: 'straight', kind: 'bike', color: 'green', label: 'B', at: 50 }] } },
        { junction: { you: { arm: 'S', path: 'left' }, crossings: ['W'], peds: [{ arm: 'W', x: 0.2, label: 'P' }] } },
      ],
    },
    {
      h: 'Choosing your lane',
      body: '<ul><li>Choose the right <strong>lane</strong> (körfält) <strong>in good time</strong> before the junction: as a rule, the right-hand lane to turn right and the left-hand lane to turn left.</li>' +
        '<li><strong>Arrows painted in the lane</strong> show which way you must drive from that lane. If you find yourself in the wrong lane, <strong>follow the arrow</strong> and find another way. Do not turn from the wrong lane or stop to wait for a gap.</li>' +
        '<li>Blue round signs are <strong>mandatory</strong>: A means you must turn right, B means you must drive straight on (so no left turn and no U-turn). Red-bordered signs forbid: C means no left turn and D means no right turn (go straight on or turn left instead).</li></ul>',
      pics: [{ signs: ['mandatory-right', 'mandatory-straight', 'no-left-turn', 'no-right-turn'], labels: ['A', 'B', 'C', 'D'] }],
    },
    {
      h: 'Changing lanes and zip merging',
      body: '<ul><li>When you <strong>change lanes</strong> (körfältsbyte) you must <strong>give way to traffic in the lane you move into</strong>. Check your mirrors and blind spot, indicate in good time, and only move over when there is room.</li>' +
        '<li>Your indicator does not give you priority. Traffic in the other lane does not have to let you in just because you indicate.</li>' +
        '<li>Where two lanes become one in <strong>slow, queuing traffic</strong>, use the <strong>zip method</strong> (blixtlåsprincipen): drive on in both lanes to near where the lane ends, then take turns, <strong>one car from each lane</strong>.</li>' +
        '<li>The driver who changes lanes must still make sure it is safe. If you are in the lane that continues, keep an even speed and let the merging car in: do not close the gap.</li></ul>',
      pics: [{ road: { lanes: 'oneway2', you: { lane: 'right', y: 300, path: 'straight' }, objects: [
        { kind: 'car', lane: 'left', y: 210, label: 'B', color: 'green', dir: 'up', path: 'change-right' },
        { kind: 'cone', lane: 'left', y: 80 }, { kind: 'cone', lane: 'left', y: 50 }, { kind: 'cone', lane: 'left', y: 20 },
      ] } }],
    },
    {
      h: 'Roundabouts',
      body: '<p>In a roundabout (cirkulationsplats) you always drive round <strong>anticlockwise</strong>, keeping the centre island on your left.</p>' +
        '<ul><li>Roundabouts in Sweden normally have a <strong>give-way sign</strong> at every entry. You then give way to traffic <strong>already in the roundabout</strong>. You do not have to wait for cars at other entries, and once you are in the roundabout, cars at the entries must give way to you.</li>' +
        '<li>The blue roundabout sign only tells you to drive round anticlockwise. It does not by itself give anyone priority: look for the give-way sign.</li>' +
        '<li>Choose your lane before you enter and follow the lane markings. Moving from the inner to the outer lane is a <strong>lane change</strong>, so you must give way to traffic in the outer lane.</li>' +
        '<li>Indicate <strong>right</strong> when you have <strong>passed the exit before the one you want</strong>. If you indicate earlier, drivers waiting at the earlier entries and exits think you are leaving there. If you leave at the first exit, indicate right already as you approach.</li>' +
        '<li><strong>Long vehicles</strong> such as buses and lorries may need more than one lane to get round. Keep back, and do not drive alongside them in the roundabout.</li></ul>',
      pics: [{ roundabout: { you: { arm: 'S', exit: 'W' }, vehicles: [{ ring: 145, label: 'B', color: 'red' }], signs: { S: 'yield', E: 'yield', N: 'yield', W: 'yield' } } }],
    },
    {
      h: 'U-turns and reversing',
      body: '<ul><li>You may make a <strong>U-turn</strong> (U-sväng) only if it can be done <strong>without danger or obstruction</strong> to other traffic. Let oncoming traffic pass first.</li>' +
        '<li>U-turns are forbidden where a <strong>no U-turn sign</strong> applies. That sign bans only U-turns: turning left is still allowed.</li>' +
        '<li>On a <strong>motorway</strong> and an <strong>expressway</strong> (motortrafikled) you must <strong>never turn round or reverse</strong>. If you miss your exit, drive on to the next one.</li>' +
        '<li><strong>Reversing</strong> (backning) is allowed only if it causes no danger or obstruction, and only for as short a distance as you need. Reverse slowly, look all around, and give way to all other traffic, for example when you reverse out of a parking space.</li></ul>',
      pics: [
        { sign: 'no-u-turn' },
        { junction: { you: { arm: 'S', path: 'uturn' }, vehicles: [{ arm: 'N', path: 'straight', color: 'red', label: 'B' }] } },
      ],
    },
  ],
  keyFacts: [
    'Indicate in good time. Indicating tells others your plan but never gives you priority.',
    'Right turn: close to the right-hand edge, then a tight curve.',
    'Left turn on a two-way road: close to the centre line on your own side. On a one-way street: close to the left-hand edge.',
    'After a left turn you must be in the right-hand half of the new road. Do not cut the corner.',
    'Turning left, give way to oncoming traffic going straight ahead or turning right.',
    'When you turn, give way to pedestrians crossing the road you turn into and to cyclists going straight on.',
    'Lane arrows are binding. In the wrong lane, follow the arrow and find another way.',
    'When you change lanes, give way to traffic in the lane you move into.',
    'Zip method (blixtlåsprincipen): in slow traffic where two lanes become one, take turns, one car from each lane.',
    'Roundabout with give-way signs: give way to traffic already in it. Indicate right after passing the exit before yours.',
    'No U-turns or reversing on motorways and expressways. Reverse only short distances and give way to everyone.',
  ],
};
