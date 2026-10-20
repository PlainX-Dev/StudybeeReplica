LESSONS.people = {
  title: 'Alcohol, fatigue & risk',
  minutes: 20,
  intro: 'Most crashes are caused by the driver, not the car or the road. Alcohol, drugs, tiredness, distraction and overconfidence all make you see less and react later.',
  sections: [
    {
      h: 'Alcohol',
      body: '<ul><li>Drink driving (<em>rattfylleri</em>): <strong>0.2 per mille</strong> in the blood or <strong>0.10 mg/l</strong> in exhaled air.</li>' +
        '<li>Gross drink driving (<em>grov rattfylleri</em>): <strong>1.0 per mille</strong> (0.50 mg/l) or more, or lower if your driving was clearly affected.</li>' +
        '<li>Only <strong>time</strong> removes alcohol. Coffee, food, fresh air or a shower do not help.</li>' +
        '<li>After a heavy evening you can still be over the limit <strong>the next morning</strong>.</li></ul>',
      pics: [{ view: { time: 'day', lanes: 2, curve: 0.3, objects: [{ kind: 'car', x: -0.5, d: 0.55, facing: 'toward', color: 'grey' }] } }],
    },
    {
      h: 'Drugs and medicine',
      body: '<p>Sweden has <strong>zero tolerance</strong> for illegal drugs: any trace in the blood is drug driving, unless it is medicine prescribed to you.</p>' +
        '<p>A <strong>red warning triangle</strong> on a medicine means it can affect your ability to drive. Read the leaflet, ask the pharmacist, and decide honestly whether you are fit to drive. You are responsible.</p>',
    },
    {
      h: 'Fatigue',
      body: '<p>Tiredness slows your reactions as much as alcohol. Warning signs: yawning, heavy eyelids, drifting in the lane, not remembering the last kilometres. You can fall asleep for a few seconds (micro-sleep) without knowing it.</p>' +
        '<p><strong>Only sleep helps.</strong> Open windows, music and coffee give minutes at most. Stop somewhere safe and rest. The risk is highest <strong>late at night and early in the morning</strong>.</p>',
      pics: [{ view: { time: 'night', lanes: 'motorway', centre: 'none' } }],
    },
    {
      h: 'Attention, phones and vision',
      body: '<ul><li>You must <strong>not hold a mobile phone</strong> in your hand while driving. Hands-free is allowed but still takes attention.</li>' +
        '<li>Drivers search for cars and often <strong>miss cyclists, mopeds and pedestrians</strong> ("looked but did not see").</li>' +
        '<li>At higher speed your <strong>field of vision narrows</strong>, so you notice less at the sides.</li>' +
        '<li>Alcohol, drugs and tiredness make your <strong>reaction time longer</strong>, so your stopping distance grows.</li></ul>',
      pics: [{ view: { time: 'day', lanes: 2, objects: [
        { kind: 'car', x: -0.5, d: 0.5, facing: 'toward', color: 'blue' }, { kind: 'bike', x: 1.0, d: 0.35, color: 'yellow', label: 'C' }] } }],
    },
    {
      h: 'Attitude, stress and young drivers',
      body: '<p>New drivers, especially young ones, have a much higher crash risk. They lack experience in spotting risks and often <strong>overestimate their ability</strong>. Friends in the car can push you to take risks.</p>' +
        '<p>Stress and anger make you drive aggressively for little gain. Plan extra time, accept delays, and let other drivers\' mistakes go.</p>' +
        '<p>The compulsory <strong>risk education</strong> (riskutbildning) has two parts, both done before the driving test: part 1 on alcohol, drugs, fatigue and risky behaviour; part 2 driving on a slippery track.</p>',
    },
    {
      h: 'Seat belts and children',
      body: '<ul><li>The <strong>driver</strong> is responsible for passengers <strong>under 15</strong> using a belt or child restraint. Passengers 15 and over are responsible themselves.</li>' +
        '<li>Children <strong>shorter than 135 cm</strong> must use a child seat, booster or other suitable child restraint.</li>' +
        '<li>Never put a <strong>rear-facing child seat</strong> in front of an <strong>active airbag</strong>.</li></ul>',
    },
  ],
  keyFacts: [
    'Drink-driving limit: 0.2 per mille (0.10 mg/l breath).',
    'Gross drink driving: 1.0 per mille (0.50 mg/l breath) or more.',
    'Only time removes alcohol from the body.',
    'Zero tolerance for illegal drugs; red triangle on medicine = may affect driving.',
    'Only sleep cures tiredness — stop and rest.',
    'Holding a mobile phone while driving is forbidden.',
    'Driver is responsible for belts of passengers under 15.',
    'Children under 135 cm need a child restraint; no rear-facing seat in front of an active airbag.',
    'Riskutbildning: two parts, both before the driving test.',
  ],
};
