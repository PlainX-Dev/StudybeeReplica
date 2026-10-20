/*
 * The 30-day plan. Each task is one of:
 *   { type: 'lesson', topic }                       read a lesson
 *   { type: 'practice', topics: [...], n }          practice set ('weak' = your weakest topics right now)
 *   { type: 'signs', n }                            sign recognition drill (n = 0 means every sign)
 *   { type: 'review' }                              redo your mistakes
 *   { type: 'mock' }                                full 65-question timed mock exam
 *   { type: 'facts' }                               read the key-facts sheet
 *   { type: 'todo', text }                          real-world task you tick off yourself
 * `goal` is the score to aim for on the day's practice or mock.
 */
window.PLAN = [
  // ---------------------------------------------------------------- week 1
  { day: 1, week: 1, title: 'Start line', focus: 'Get set up, learn how signs are built, and find your baseline.', tasks: [
    { type: 'todo', text: 'Check that your learner permit (körkortstillstånd) is valid at transportstyrelsen.se.' },
    { type: 'todo', text: 'Book your theory test at trafikverket.se for day 29–31 of this plan. Times fill up, so do it today.' },
    { type: 'lesson', topic: 'signs' },
    { type: 'signs', n: 20 },
    { type: 'practice', topics: ['signs', 'priority', 'turning', 'speed', 'vulnerable'], n: 20, label: 'Baseline quiz' },
  ], goal: 'No target yet. The baseline shows where you start.' },
  { day: 2, week: 1, title: 'Who goes first?', focus: 'The right-hand rule, give-way and stop signs, priority roads.', tasks: [
    { type: 'lesson', topic: 'priority' },
    { type: 'practice', topics: ['priority'], n: 20 },
    { type: 'signs', n: 15 },
  ], goal: '70% on the priority set.' },
  { day: 3, week: 1, title: 'Turning and lanes', focus: 'Where to position the car, indicating, roundabouts.', tasks: [
    { type: 'lesson', topic: 'turning' },
    { type: 'practice', topics: ['turning'], n: 20 },
    { type: 'review' },
  ], goal: '70% on the turning set.' },
  { day: 4, week: 1, title: 'Junction drill', focus: 'Picture questions only: read the junction, then decide.', tasks: [
    { type: 'practice', topics: ['priority', 'turning'], n: 25, label: 'Junction drill' },
    { type: 'practice', topics: ['signs'], n: 15 },
    { type: 'review' },
  ], goal: '80% on the junction drill.' },
  { day: 5, week: 1, title: 'Speed and distance', focus: 'Speed limits, stopping distances, overtaking.', tasks: [
    { type: 'lesson', topic: 'speed' },
    { type: 'practice', topics: ['speed'], n: 20 },
    { type: 'review' },
  ], goal: '75% on the speed set.' },
  { day: 6, week: 1, title: 'Stopping and parking', focus: 'Where you may stop, where you may park, and the distances.', tasks: [
    { type: 'lesson', topic: 'parking' },
    { type: 'practice', topics: ['parking'], n: 20 },
    { type: 'signs', n: 20 },
  ], goal: '75% on the parking set.' },
  { day: 7, week: 1, title: 'Week 1 checkpoint', focus: 'A mixed test of everything from this week.', tasks: [
    { type: 'practice', topics: ['signs', 'priority', 'turning', 'speed', 'parking'], n: 40, label: 'Week 1 checkpoint' },
    { type: 'review' },
  ], goal: '75% on the checkpoint. Below that, redo day 4.' },

  // ---------------------------------------------------------------- week 2
  { day: 8, week: 2, title: 'Road types', focus: 'Motorways, expressways, rural roads and level crossings.', tasks: [
    { type: 'lesson', topic: 'roads' },
    { type: 'practice', topics: ['roads'], n: 20 },
    { type: 'todo', text: 'Check that Risk 1 (riskettan) is done or booked. You must complete it before the test.' },
  ], goal: '75% on the road-types set.' },
  { day: 9, week: 2, title: 'Other road users', focus: 'Pedestrians, cyclists, buses and emergency vehicles.', tasks: [
    { type: 'lesson', topic: 'vulnerable' },
    { type: 'practice', topics: ['vulnerable'], n: 20 },
    { type: 'practice', topics: ['priority'], n: 10, label: 'Right-of-way refresher' },
  ], goal: '75% on the road-users set.' },
  { day: 10, week: 2, title: 'The driver', focus: 'Alcohol, drugs, tiredness, phones and risk.', tasks: [
    { type: 'lesson', topic: 'people' },
    { type: 'practice', topics: ['people'], n: 20 },
    { type: 'review' },
  ], goal: '80% on the human-factors set.' },
  { day: 11, week: 2, title: 'Winter, dark and wildlife', focus: 'Swedish conditions: ice, darkness, moose.', tasks: [
    { type: 'lesson', topic: 'conditions' },
    { type: 'practice', topics: ['conditions'], n: 20 },
    { type: 'signs', n: 20 },
  ], goal: '75% on the conditions set.' },
  { day: 12, week: 2, title: 'Hazard day', focus: 'Spot what can go wrong before it does.', tasks: [
    { type: 'practice', topics: ['vulnerable', 'conditions', 'people'], n: 30, label: 'Hazard mix' },
    { type: 'review' },
  ], goal: '80% on the hazard mix.' },
  { day: 13, week: 2, title: 'Rules mix', focus: 'Speed, parking and road types together.', tasks: [
    { type: 'practice', topics: ['speed', 'parking', 'roads'], n: 30, label: 'Rules mix' },
    { type: 'practice', topics: ['priority', 'turning'], n: 15, label: 'Junction drill' },
  ], goal: '80% on the rules mix.' },
  { day: 14, week: 2, title: 'First mock exam', focus: 'Your first full test: the 65 scored questions in 50 minutes. The real test adds 5 unscored trial questions.', tasks: [
    { type: 'mock' },
    { type: 'review' },
  ], goal: '46 of 65 (70%). The real pass mark is 52.' },

  // ---------------------------------------------------------------- week 3
  { day: 15, week: 3, title: 'Know your car', focus: 'Licence rules, lights, tyres, loads and trailers.', tasks: [
    { type: 'lesson', topic: 'vehicle' },
    { type: 'practice', topics: ['vehicle'], n: 20 },
    { type: 'review' },
  ], goal: '75% on the vehicle set.' },
  { day: 16, week: 3, title: 'Eco-driving', focus: 'Drive smoothly and save fuel.', tasks: [
    { type: 'lesson', topic: 'environment' },
    { type: 'practice', topics: ['environment'], n: 15 },
    { type: 'practice', topics: ['weak'], n: 15, label: 'Weak-topic boost' },
  ], goal: '80% on the eco set.' },
  { day: 17, week: 3, title: 'When things go wrong', focus: 'Accidents, first aid and breakdowns.', tasks: [
    { type: 'lesson', topic: 'emergency' },
    { type: 'practice', topics: ['emergency'], n: 20 },
    { type: 'todo', text: 'Check that Risk 2 (risktvåan, the skid course) is done or booked. You also need it before the test.' },
  ], goal: '80% on the emergencies set.' },
  { day: 18, week: 3, title: 'Weak spots', focus: 'The plan picks the topics you score lowest on.', tasks: [
    { type: 'practice', topics: ['weak'], n: 30, label: 'Weak-topic boost' },
    { type: 'review' },
  ], goal: '80% on your weakest topics.' },
  { day: 19, week: 3, title: 'Picture drill', focus: 'Junctions, roundabouts and hazards: the questions people fail most.', tasks: [
    { type: 'practice', topics: ['priority', 'turning', 'vulnerable'], n: 30, label: 'Picture drill' },
    { type: 'signs', n: 25 },
  ], goal: '85% on the picture drill.' },
  { day: 20, week: 3, title: 'Second mock exam', focus: 'Full timed test.', tasks: [
    { type: 'mock' },
    { type: 'review' },
  ], goal: '52 of 65 (a pass).' },
  { day: 21, week: 3, title: 'Reset', focus: 'Reread the lessons for your two weakest topics and clear your mistakes.', tasks: [
    { type: 'lesson', topic: 'weak' },
    { type: 'review' },
    { type: 'facts' },
  ], goal: 'Mistakes list under 15 questions.' },

  // ---------------------------------------------------------------- week 4
  { day: 22, week: 4, title: 'Full mix', focus: 'Everything, in test proportions.', tasks: [
    { type: 'practice', topics: ['all'], n: 40, label: 'Full mix' },
    { type: 'signs', n: 0 },
  ], goal: '85% on the full mix and every sign right.' },
  { day: 23, week: 4, title: 'Third mock exam', focus: 'Full timed test.', tasks: [
    { type: 'mock' },
    { type: 'review' },
  ], goal: '55 of 65 (85%).' },
  { day: 24, week: 4, title: 'Key facts', focus: 'The numbers and rules that the test likes to ask.', tasks: [
    { type: 'facts' },
    { type: 'practice', topics: ['weak'], n: 40, label: 'Weak-topic boost' },
  ], goal: '85% on your weakest topics.' },
  { day: 25, week: 4, title: 'Fourth mock exam', focus: 'Full timed test.', tasks: [
    { type: 'mock' },
    { type: 'review' },
  ], goal: '57 of 65 (88%).' },
  { day: 26, week: 4, title: 'Signs and junctions', focus: 'The two areas worth the most points.', tasks: [
    { type: 'signs', n: 0 },
    { type: 'practice', topics: ['priority', 'turning'], n: 25, label: 'Junction drill' },
  ], goal: '90%+.' },
  { day: 27, week: 4, title: 'Fifth mock exam', focus: 'Full timed test.', tasks: [
    { type: 'mock' },
    { type: 'review' },
  ], goal: '59 of 65 (90%).' },
  { day: 28, week: 4, title: 'Clear the list', focus: 'Empty your mistakes list completely.', tasks: [
    { type: 'practice', topics: ['weak'], n: 30, label: 'Weak-topic boost' },
    { type: 'review' },
  ], goal: 'Mistakes list empty.' },
  { day: 29, week: 4, title: 'Dress rehearsal', focus: 'Last full mock. Treat it exactly like the real test.', tasks: [
    { type: 'mock' },
    { type: 'review' },
  ], goal: '60 of 65 or better. If you score lower, move your test date and repeat days 24–29.' },
  { day: 30, week: 4, title: 'Test ready', focus: 'Light review, then rest.', tasks: [
    { type: 'facts' },
    { type: 'review' },
    { type: 'todo', text: 'Pack valid ID. Check the test time and address in your Trafikverket booking.' },
    { type: 'todo', text: 'Sleep properly tonight. Do not cram the night before.' },
  ], goal: 'Calm and rested. You have done the work.' },
];

/* How many questions from each topic go into a 65-question mock exam. */
window.MOCK_MIX = {
  signs: 7, priority: 9, turning: 6, speed: 6, parking: 4, roads: 5,
  vulnerable: 7, people: 6, conditions: 5, vehicle: 4, environment: 3, emergency: 3,
};
window.MOCK = { questions: 65, minutes: 50, pass: 52 };
