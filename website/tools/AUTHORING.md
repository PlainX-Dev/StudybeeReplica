# Writing questions and lessons

The site trains for the **Swedish B-licence theory test** (Trafikverket kunskapsprov),
taken in English. Traffic drives on the right. Signs are Swedish (yellow fill).

## Files

- `src/questions/<topic>.js` — questions for one topic
- `src/lessons/<topic>.js` — the lesson for one topic

Topic ids (see `src/topics.js`): `signs`, `priority`, `turning`, `speed`, `parking`, `roads`,
`vulnerable`, `people`, `conditions`, `vehicle`, `environment`, `emergency`.

Check your work with `node tools/validate.js <topic>` and look at the pictures with
`NODE_PATH=$(npm root -g) node tools/preview.js <topic> /some/dir/out.png` (then view the PNG).

## Question format

```js
QB.push(
  {
    id: 'priority-01',            // <topic>-NN, unique
    topic: 'priority',
    q: 'You are driving the blue car (YOU) and want to turn left. Who must give way?',
    img: { junction: { /* see picture specs */ } },   // optional
    options: ['You must give way to car B', 'Car B must give way to you', 'Whoever arrives first goes first'],
    answer: 0,                    // index of the correct option (options are shuffled on screen)
    explain: 'When you turn left you must give way to oncoming traffic going straight ahead or turning right.',
  },
);
```

Rules:
- 3 or 4 options (2 only for true/false style), exactly one correct.
- Wrong options must be plausible: the mistakes real learners make.
- `explain` teaches the rule in 1–3 sentences: why the answer is right and, where useful, why the tempting wrong answer is wrong.
- Write plain English, as the real test does. No "all of the above".
- Never write anything you are not sure is the current Swedish rule. Leave the fact out instead.
- Practical questions ("Would you turn here?", "Who goes first?", "What do you do now?") should get a picture.
- Options must not mention their position ("the first one").

## Picture specs (`img`)

All pictures are drawn by `src/scenes.js`. Read its header comments for every option. Summary:

### `{ sign: 'yield' }` / `{ signs: ['yield','stop','main-road'], labels: ['A','B','C'] }`
Sign names: run `node -e "require('./src/scenes.js'); console.log(Signs.list().join(' '))"`.

### `{ junction: {...} }` — top-down, 400×400, YOU come from the bottom (`'S'`).
```js
{ junction: {
  arms: ['N','E','S','W'],                 // drop one for a T-junction
  you: { arm: 'S', path: 'left' },         // path: left | right | straight | uturn | stop
  vehicles: [{ arm: 'E', path: 'straight', kind: 'car', color: 'red', label: 'B' }],
       // kind: car bus truck bike moped tractor ambulance police tram; lane:'out' = driving away;
       // inside:true = already in the middle of the junction; at: distance from centre (default 85)
  peds: [{ arm: 'N', x: 0.2, label: 'P' }], // pedestrian on that arm's crossing (x -0.5..0.5)
  crossings: ['N'], bikeCrossings: ['E'],  // zebra / cycle crossing on that arm
  signs: { S: 'yield', E: 'main-road' },   // sign at that approach (string or array)
  lines: { S: 'yield' },                   // 'yield' (shark teeth) or 'stop' line
  lights: { S: 'red' },                    // red | yellow | green | red-yellow | green-left | green-right | yellow-flash
} }
```
Compass: N top, E right, W left. A car on arm E drives west (towards the centre).
"From your right" when you come from S = arm **E**. Oncoming = arm **N**.

### `{ roundabout: {...} }`
```js
{ roundabout: { you: { arm: 'S', exit: 'W' }, vehicles: [{ ring: 20, label: 'B', exit: 'N' }, { arm: 'E', label: 'C' }],
  signs: { S: 'yield' }, crossings: ['S'], showIndicator: 'right' } }
```
`ring` is the angle of a car already on the roundabout: 0 = east side, 90 = south, 180 = west, 270 = north.
Traffic goes anticlockwise (S → E → N → W).

### `{ road: {...} }` — top-down straight road, YOU drive up the page.
```js
{ road: { lanes: 2, centre: 'dashed',     // lanes: 2 | 4 (divided, two each way) | 'oneway2'
          // centre: dashed | warning (long dashes) | solid | double | solid-left | solid-right | barrier
  you: { lane: 'right', y: 320, path: 'overtake' },  // path: straight | overtake | change-left | change-right | pull-in | stop
  objects: [{ kind: 'tractor', lane: 'right', y: 200, label: 'T', color: 'green' },
            { kind: 'car', lane: 'oncoming', y: 40, label: 'B' }],
          // lanes: right left oncoming oncoming2 shoulder far-shoulder verge far-verge; or give x
          // kinds: car bus truck bike moped tractor ambulance police ped child ball moose deer cone
  crossing: 120, busStop: 180, signs: [{ name: 'no-overtaking', y: 250, side: 'right' }], solidEdge: false } }
```

### `{ view: {...} }` — driver's-eye view, 400×300.
```js
{ view: { time: 'day'|'dusk'|'night', weather: 'rain'|'snow'|'fog', curve: -1..1, crest: true,
  lanes: 2 | 1 | 'motorway', centre: 'dashed'|'solid'|'none',
  signs: [{ name: 'w-moose', side: 'right', d: 0.25 }],          // d: 0 near … 0.9 far
  objects: [{ kind: 'child', x: 0.9, d: 0.3, label: 'A' }],      // x: 0 centre line, 0.5 your lane, -0.5 oncoming lane, ±1.2 verge
          // kinds: car truck bus tractor bike ped child ball moose deer; car options: facing:'toward', braking:true
  crossing: 0.3, snowbanks: true, icy: true, glare: true, headlights: true } }
```

## Lesson format

```js
LESSONS.priority = {
  title: 'Right of way at junctions',
  minutes: 20,
  intro: 'One or two sentences on why this matters.',
  sections: [
    { h: 'The right-hand rule', body: '<p>HTML: p, ul/li, strong, em only.</p>', pics: [ /* optional picture specs */ ] },
  ],
  keyFacts: ['Short, testable facts. 5–10 of them.'],
};
```
