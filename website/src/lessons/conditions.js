LESSONS.conditions = {
  title: 'Winter, darkness & wildlife',
  minutes: 25,
  intro: 'Swedish roads are dark, icy and full of wildlife for much of the year. The basic rule never changes: you must be able to stop within the distance you can see to be clear.',
  sections: [
    {
      h: 'Driving in the dark',
      body: '<ul><li>Use <strong>full beam</strong> on dark roads, but switch to <strong>dipped beam</strong> in good time when meeting someone or when you are close behind another vehicle.</li>' +
        '<li>If you are <strong>dazzled</strong>: slow down, and look towards the <strong>right edge</strong> of the road. Stop if you cannot see.</li>' +
        '<li>Just after meeting, pedestrians and cyclists can be hidden in the dark area your dipped beam did not reach.</li>' +
        '<li>A pedestrian with a <strong>reflector</strong> is seen from much further away than one in dark clothes.</li></ul>',
      pics: [{ view: { time: 'night', lanes: 2, headlights: true } }],
    },
    {
      h: 'Rain and fog',
      body: '<p><strong>Aquaplaning</strong>: the tyres ride on water and the steering goes light. Ease off the accelerator and hold the wheel steady; do not brake hard or steer sharply. The first rain after a dry spell makes the road extra slippery.</p>' +
        '<p>In <strong>fog</strong>, use dipped beam (and front fog lights if you have them), not full beam. Use the <strong>rear fog light</strong> only in really poor visibility and switch it off if it dazzles someone behind you.</p>',
      pics: [{ view: { time: 'day', weather: 'fog', lanes: 2, objects: [{ kind: 'car', x: 0.5, d: 0.6, color: 'red' }] } }],
    },
    {
      h: 'Winter tyres and tread',
      body: '<ul><li><strong>Winter tyres</strong> are required <strong>1 December – 31 March</strong> when there are winter road conditions.</li>' +
        '<li><strong>Studded tyres</strong> are allowed <strong>1 October – 15 April</strong>, and outside that period if there are (or may be) winter road conditions.</li>' +
        '<li>Minimum tread: <strong>3 mm</strong> for winter tyres in the winter period, <strong>1.6 mm</strong> for summer tyres.</li></ul>',
    },
    {
      h: 'Ice and snow',
      body: '<p>Ice is most slippery around <strong>0 °C</strong>, when water lies on top. <strong>Bridges</strong>, shady spots and open stretches freeze first. On snow and ice the braking distance is many times longer, so keep a much longer following distance.</p>' +
        '<p>Before driving, clear <strong>all windows, mirrors, lights and number plates</strong>, and the roof. An engine block heater makes cold starts easier on the engine and gives a clear windscreen sooner.</p>',
      pics: [{ view: { time: 'day', weather: 'snow', lanes: 2, snowbanks: true, objects: [{ kind: 'car', x: 0.5, d: 0.45, color: 'red' }] } }],
    },
    {
      h: 'Low sun',
      body: '<p>Low sun can hide cyclists and pedestrians completely. Slow down, use the sun visor or sunglasses, and keep the windscreen clean inside and out.</p>',
      pics: [{ view: { time: 'day', lanes: 2, glare: true, objects: [{ kind: 'bike', x: 0.85, d: 0.35, color: 'grey' }] } }],
    },
    {
      h: 'Wildlife',
      body: '<p>Moose and deer are most active at <strong>dawn and dusk</strong>. When one animal crosses, <strong>more may follow</strong>. If an animal appears in front of you, <strong>brake hard</strong> and keep control; a sharp swerve into oncoming traffic or the ditch is often worse.</p>' +
        '<p>After a collision with, for example, a <strong>moose, deer, wild boar, bear, wolf or lynx</strong>, you must <strong>mark the place</strong> and <strong>report it to the police</strong> (112), even if the animal ran away.</p>',
      pics: [{ view: { time: 'dusk', lanes: 2, objects: [{ kind: 'moose', x: -1.3, d: 0.3, label: 'M' }] } }],
    },
  ],
  keyFacts: [
    'Dip your headlights in good time when meeting or following another vehicle.',
    'Dazzled: slow down and look at the right edge of the road.',
    'Always be able to stop within the distance you can see.',
    'Winter tyres: required 1 Dec – 31 Mar in winter road conditions.',
    'Studded tyres: 1 Oct – 15 Apr (longer if winter conditions).',
    'Tread: at least 3 mm on winter tyres in the winter period, 1.6 mm on summer tyres.',
    'Ice is most slippery around 0 °C; bridges freeze first.',
    'Wildlife is most active at dawn and dusk, and more animals may follow.',
    'Hit a moose, deer or wild boar: mark the place and report to the police.',
  ],
};
