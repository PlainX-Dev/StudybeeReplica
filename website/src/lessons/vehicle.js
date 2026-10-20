/* Lesson: vehicle, lights, loads & licence */
LESSONS.vehicle = {
  title: 'Vehicle, lights, loads & licence',
  minutes: 20,
  intro: 'You must know what your licence lets you drive and tow, and you are responsible for the car being safe every time you drive it. These questions are pure rules, so they are easy points if you learn the numbers.',
  sections: [
    {
      h: 'What a B licence allows',
      body: '<p>With a <strong>B licence</strong> you may drive:</p><ul>' +
        '<li>Cars with a <strong>total weight of at most 3,500 kg</strong> (total weight = the car plus the maximum load it is approved for).</li>' +
        '<li>Vehicles with seats for <strong>at most 8 passengers</strong> besides the driver.</li>' +
        '<li>With a <strong>light trailer</strong> (total weight at most <strong>750 kg</strong>), behind any car you may drive.</li>' +
        '<li>With a <strong>heavier trailer</strong>, if the combined total weight of car + trailer is <strong>at most 3,500 kg</strong>.</li></ul>' +
        '<p>For heavier combinations you need <strong>B96</strong> (combination up to 4,250 kg) or <strong>BE</strong>. The car\'s registration must also allow it to tow the trailer.</p>',
    },
    {
      h: 'The probationary period (prövotid)',
      body: '<p>The first <strong>two years</strong> after you get your licence are a probationary period. If your licence is <strong>revoked</strong> during this time, you must get a new learner\'s permit and pass <strong>both the theory test and the driving test again</strong>.</p>',
    },
    {
      h: 'Lights',
      body: '<ul><li>You must always drive with lights on. In daylight: <strong>dipped beam or daytime running lights</strong>. In darkness: dipped or full beam.</li>' +
        '<li><strong>Full beam</strong>: dip it in good time when you meet traffic and when you drive close behind another vehicle, so you do not dazzle anyone.</li>' +
        '<li><strong>Rear fog light</strong>: only when visibility is really poor (thick fog, heavy snow). Switch it off when visibility improves; it dazzles drivers behind.</li>' +
        '<li><strong>Hazard lights</strong>: when your stopped vehicle may be a danger, for example after a breakdown or at an accident.</li></ul>',
      pics: [
        { view: { time: 'night', lanes: 2, curve: 0.2, objects: [{ kind: 'car', facing: 'toward', x: -0.5, d: 0.45, color: 'black' }] } },
      ],
    },
    {
      h: 'Brakes, ABS, ESC and tyres',
      body: '<ul><li>With <strong>ABS</strong>: in an emergency, press the brake pedal <strong>hard and keep it pressed</strong>. The wheels do not lock, so you can <strong>steer</strong> around the danger.</li>' +
        '<li><strong>ESC</strong> helps prevent skids, but it cannot give you more grip. Slow down on slippery roads anyway.</li>' +
        '<li>A <strong>soft or sinking brake pedal</strong> means a serious fault: do not drive.</li>' +
        '<li>Tread depth: at least <strong>1.6 mm</strong> on summer tyres and at least <strong>3 mm</strong> on winter tyres in winter conditions.</li>' +
        '<li>A <strong>red warning lamp</strong> on the dashboard: stop as soon as it is safe and switch off the engine. Yellow/orange: get it checked soon.</li></ul>',
      pics: [
        { view: { time: 'day', lanes: 2, objects: [{ kind: 'child', x: 0.8, d: 0.3 }, { kind: 'ball', x: 0.45, d: 0.28 }] } },
      ],
    },
    {
      h: 'Before you drive: seat, mirrors, blind spots, passengers',
      body: '<p>Adjust the seat, head restraint and mirrors <strong>before</strong> you set off. Mirrors always leave <strong>blind spots</strong>, so look over your shoulder before you change lanes or pull out.</p>' +
        '<p>Never put a <strong>rear-facing child seat</strong> in front of an <strong>active airbag</strong>.</p>',
      pics: [
        { road: { lanes: 4, you: { lane: 'right', y: 250, path: 'change-left' }, objects: [{ kind: 'car', lane: 'left', y: 300, color: 'red', label: 'B', dir: 'up' }] } },
      ],
    },
    {
      h: 'Loads, roof boxes and towing',
      body: '<ul><li>The <strong>driver</strong> is responsible for the load: it must be secured so it cannot slide or fall off.</li>' +
        '<li>A load that sticks out <strong>more than 1 m behind</strong> the vehicle must be clearly marked.</li>' +
        '<li>A roof box or heavy load changes how the car brakes and handles, especially in crosswinds. Do not exceed the car\'s maximum roof load and total weight.</li>' +
        '<li>A trailer must have working lights and be properly attached before every trip.</li></ul>',
    },
    {
      h: 'Inspection, insurance and who is responsible',
      body: '<ul><li>The <strong>owner</strong> is responsible for traffic insurance, vehicle inspection (besiktning) and vehicle tax.</li>' +
        '<li>The <strong>driver</strong> is responsible for the car being roadworthy while driving, even a borrowed car.</li>' +
        '<li>A car with a <strong>driving ban (körförbud)</strong> may only be driven to an inspection, or to and from a repair.</li></ul>',
    },
  ],
  keyFacts: [
    'B licence: total weight at most 3,500 kg and at most 8 passengers besides the driver.',
    'Light trailer = total weight at most 750 kg; a heavier trailer is OK on B if car + trailer total weight is at most 3,500 kg.',
    'B96 allows combinations up to 4,250 kg; beyond that you need BE.',
    'Probationary period: 2 years. Revoked licence = new learner\'s permit and both tests again.',
    'Always drive with lights: dipped beam or daytime running lights in daylight; dipped or full beam in darkness.',
    'With ABS: brake hard, keep the pedal down and steer.',
    'Winter tyres: at least 3 mm tread in winter conditions; summer tyres at least 1.6 mm.',
    'A load sticking out more than 1 m behind must be marked; the driver is responsible for securing it.',
    'Körförbud: drive only to inspection or to and from repair.',
    'Owner: insurance, inspection, tax. Driver: roadworthy car and secure load while driving.',
  ],
};
