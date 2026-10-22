/* Lesson: accidents, first aid & breakdowns */
LESSONS.emergency = {
  title: 'Accidents, first aid & breakdowns',
  minutes: 20,
  updated: '2026-10-22',
  intro: 'If you arrive at an accident, what you do in the first minutes can save lives. Learn the order: make the scene safe, call 112, then L-ABC.',
  sections: [
    {
      h: 'Make the scene safe',
      body: '<ul><li>Stop safely and switch on the <strong>hazard lights</strong>.</li>' +
        '<li>Put on a <strong>reflective vest</strong>, especially in the dark.</li>' +
        '<li>Place the <strong>warning triangle well behind</strong> the vehicles, further back on fast roads and <strong>before a crest or bend</strong>, so drivers are warned in time.</li>' +
        '<li>Switch off the ignition of crashed cars to reduce the risk of fire.</li></ul>',
      pics: [
        { road: { lanes: 2, you: { lane: 'right', y: 110 }, objects: [{ kind: 'cone', x: 223, y: 360, label: 'B' }, { kind: 'car', lane: 'oncoming', y: 260, color: 'grey' }] } },
      ],
    },
    {
      h: 'Call 112',
      body: '<p>Tell the operator <strong>where</strong> the accident is, <strong>what</strong> has happened and <strong>how many</strong> are injured. Do not hang up until you are told to. If there are several helpers, ask one person to call while you help.</p>',
    },
    {
      h: 'L-ABC',
      body: '<ul><li><strong>L – Life-threatening location</strong> (livsfarligt läge): move the injured only if they are in danger, for example from traffic or fire, or if you cannot give life-saving first aid where they are. Moving an injured person can make injuries worse, especially to the neck and back.</li>' +
        '<li><strong>A – Airway and breathing</strong> (andning): open the airway. Unconscious but breathing normally → <strong>recovery position</strong>. Not breathing normally → <strong>CPR, 30 compressions : 2 breaths</strong>, and use a defibrillator (AED) if one arrives. A public AED is made for <strong>anyone</strong> to use: switch it on and follow its spoken instructions. It only gives a shock if needed, and you continue CPR when it tells you to.</li>' +
        '<li><strong>B – Bleeding</strong> (blödning): press hard directly on the wound, raise the injured part, apply a pressure bandage.</li>' +
        '<li><strong>C – Circulation / shock</strong> (cirkulation, chock): pale, cold, sweaty, fast weak pulse. Let them lie down, keep them warm and calm, give nothing to eat or drink.</li></ul>' +
        '<p>Leave a motorcyclist\'s <strong>helmet on</strong> unless you must remove it to keep the airway open or give CPR.</p>',
    },
    {
      h: 'Your duties after an accident',
      body: '<p>Everyone <strong>involved</strong> in a traffic accident must <strong>stop</strong>, help anyone injured and give their <strong>name and address</strong> to the others involved. Leaving without doing so (smitning) is a crime. If you damage a parked car and the owner is not there, leave your details for the owner and tell the police.</p>',
    },
    {
      h: 'Breakdowns',
      body: '<ul><li>If the engine stops, use the car\'s speed to roll as far off the lane as you can, and switch on the hazard lights. Steering and brakes are heavier without the engine running.</li>' +
        '<li>On a <strong>motorway</strong>: try to reach an exit or the hard shoulder. Get everyone out on the side away from traffic and wait <strong>behind the crash barrier</strong>, well away from the car. Never stand behind or in front of it.</li></ul>',
      pics: [
        { road: { lanes: 4, you: { x: 316, y: 200 }, objects: [{ kind: 'ped', x: 352, y: 250, label: 'A', color: 'yellow' }, { kind: 'car', lane: 'right', y: 330, color: 'red' }, { kind: 'car', lane: 'left', y: 80, color: 'grey' }] } },
      ],
    },
    {
      h: 'Fire, water and tunnels',
      body: '<ul><li><strong>Fire/smoke</strong>: stop, switch off the engine, get everyone out and away, call 112. Do not open the bonnet wide.</li>' +
        '<li><strong>Into water</strong>: undo the seat belt and get out through a side window at once, before the car sinks.</li>' +
        '<li><strong>Fire in a tunnel</strong> and you cannot drive out: stop, hazard lights on, engine off, <strong>leave the key</strong>, walk to the nearest emergency exit. Never turn or reverse.</li></ul>',
    },
  ],
  keyFacts: [
    'First make the scene safe: hazard lights, reflective vest, warning triangle well behind (before a crest or bend).',
    'Call 112: where, what happened, how many injured.',
    'L-ABC: Life-threatening location, Airway/breathing, Bleeding, Circulation/shock.',
    'Unconscious and breathing normally: recovery position.',
    'Not breathing normally: CPR 30 compressions to 2 breaths, and use an AED if available.',
    'Stop bleeding by pressing directly on the wound.',
    'Shock: lie down, keep warm and calm, nothing to eat or drink.',
    'Leave a motorcyclist\'s helmet on unless it must come off for the airway or CPR.',
    'If you are involved in an accident you must stop, help and give your name and address.',
    'Motorway breakdown: wait behind the crash barrier, never behind or in front of the car.',
  ],
};
