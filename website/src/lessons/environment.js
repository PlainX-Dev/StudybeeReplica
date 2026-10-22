/* Lesson: eco-driving & environment */
LESSONS.environment = {
  title: 'Eco-driving & environment',
  minutes: 15,
  updated: '2026-10-22T14:00:00Z',
  intro: 'The way you drive can change your fuel use a lot. Eco-driving (sparsam körning) also makes you a calmer and safer driver, and the test checks that you know why.',
  sections: [
    {
      h: 'Drive smoothly and look ahead',
      body: '<ul><li><strong>Look far ahead</strong> and keep a good distance, so you can adjust your speed smoothly instead of braking and accelerating.</li>' +
        '<li><strong>Shift up early</strong> and drive in the highest gear that suits the speed: low revs use less fuel and make less noise. <strong>Hard acceleration at high revs</strong> makes the most engine noise, and traffic noise affects people\'s health, especially in built-up areas.</li>' +
        '<li>Release the accelerator early before a red light, queue or junction and let the car roll <strong>in gear</strong>.</li></ul>',
      pics: [
        { junction: { arms: ['N', 'E', 'S', 'W'], you: { arm: 'S', path: 'straight', at: 175 }, lights: { S: 'red' } } },
      ],
    },
    {
      h: 'Engine braking, speed and idling',
      body: '<p>When you <strong>engine-brake</strong> with a gear engaged, a modern engine uses <strong>no fuel</strong>. In neutral it uses fuel to idle, and you lose engine braking, so the brakes have to work harder. <strong>Never switch off the engine while moving</strong>: steering and brakes get much heavier.</p>' +
        '<p><strong>Speed costs fuel</strong>: air resistance increases sharply as speed rises, so a little lower speed on long trips saves a lot.</p>' +
        '<p><strong>Do not idle</strong>: switch off the engine when you have to wait. An idling engine wastes fuel and pollutes, and many municipalities have local rules against it.</p>',
      pics: [
        { view: { time: 'day', lanes: 2, curve: 0.2, signs: [{ name: 'w-steep-down', side: 'right', d: 0.3 }] } },
      ],
    },
    {
      h: 'Cold starts',
      body: '<p>A cold engine uses more fuel, wears more and gives off much more harmful exhaust. The <strong>catalytic converter only works well when it is warm</strong>, so short trips are the worst.</p>' +
        '<ul><li>Use an <strong>engine block heater</strong> (motorvärmare) in cold weather.</li><li>Do not warm the engine by idling; drive off gently instead.</li><li>Combine errands into one trip, and walk or cycle short distances.</li></ul>',
      pics: [
        { view: { time: 'dusk', weather: 'snow', snowbanks: true, lanes: 2 } },
      ],
    },
    {
      h: 'The car itself',
      body: '<ul><li>Keep the <strong>right tyre pressure</strong>: too low increases rolling resistance, fuel use and wear. Check with cold tyres.</li>' +
        '<li><strong>Remove the roof box</strong> or rack when you do not need it: it adds air resistance.</li>' +
        '<li>Do not carry <strong>unnecessary weight</strong>: every extra kilo has to be accelerated each time you speed up, so it costs most in stop-and-go town driving.</li><li>Air conditioning increases fuel use.</li></ul>',
    },
    {
      h: 'Emissions and fuels',
      body: '<ul><li><strong>Carbon dioxide (CO2)</strong> from fossil fuels drives climate change. The amount depends directly on how much fuel you burn; a catalytic converter <strong>does not</strong> reduce CO2.</li>' +
        '<li>The catalytic converter reduces carbon monoxide, hydrocarbons and nitrogen oxides.</li>' +
        '<li><strong>Studded tyres</strong> wear the road into small particles that are harmful to breathe, and they are noisy.</li>' +
        '<li><strong>Electric cars</strong> have no exhaust emissions while driving, but tyres and brakes still create particles. Hybrids and electric cars recover energy when slowing down (regenerative braking): the electric motor works as a generator and charges the battery. Smooth, early slowing down recovers more.</li>' +
        '<li><strong>Renewable fuels</strong> (biogas, ethanol, HVO) come from biological material and add much less new CO2 than petrol and diesel.</li></ul>',
    },
  ],
  keyFacts: [
    'Shift up early and use the highest suitable gear.',
    'Engine braking in gear uses no fuel; coasting in neutral does.',
    'Look ahead and release the accelerator early instead of braking late.',
    'Higher speed = much more air resistance = more fuel.',
    'Switch off the engine instead of idling, and do not warm up the engine by idling.',
    'The catalytic converter only works well when warm, so cold starts and short trips pollute most. Use an engine block heater.',
    'Correct tyre pressure, no roof box and no unnecessary weight all save fuel.',
    'A catalytic converter does not reduce CO2; only using less fossil fuel does.',
    'Studded tyres create harmful road-dust particles and noise.',
  ],
};
