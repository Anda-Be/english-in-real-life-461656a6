import restaurantImg from "@/assets/lesson-restaurant.jpg";
import airportImg from "@/assets/lesson-airport.jpg";
import interviewImg from "@/assets/lesson-interview.jpg";
import friendsImg from "@/assets/lesson-friends.jpg";
import onlineImg from "@/assets/lesson-online.jpg";
import socialImg from "@/assets/lesson-social.jpg";
import doctorImg from "@/assets/lesson-doctor.jpg";
import apartmentImg from "@/assets/lesson-apartment.jpg";
import customerServiceImg from "@/assets/lesson-customer-service.jpg";
import meetingImg from "@/assets/lesson-meeting.jpg";


export type DialogLine = { speaker: string; en: string };

export type VocabItem = {
  term: string;
  type: "idiom" | "phrasal" | "collocation" | "expression" | "word";
  meaning: string; // Romanian gloss (kept as the only RO content — these are new items to learn)
  example: string; // English
};

export type Exercise =
  | {
      kind: "fill";
      prompt: string;
      answers: string[];
      hint?: string;
    }
  | {
      kind: "choice";
      prompt: string;
      options: string[];
      correct: number;
      explain?: string;
    }
  | {
      kind: "transform";
      prompt: string;
      sentence: string;
      answers: string[];
      hint?: string;
    };

export type MatchPair = { en: string; ro: string };

export type Lesson = {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  image: string;
  level: "B2+" | "C1" | "C1+";
  cefr: string;
  summary: string;
  dialog: DialogLine[];
  explanations: { title: string; body: string }[];
  vocabulary: VocabItem[];
  exercises: Exercise[];
  freePrompt: { prompt: string; hint: string };
  match: MatchPair[];
};

export const LESSONS: Lesson[] = [
  // =========================================================================
  // RESTAURANT
  // =========================================================================
  {
    slug: "restaurant",
    title: "Dining Out",
    tagline: "Ordering, complaining and praising — politely",
    emoji: "🍝",
    image: restaurantImg,
    level: "C1",
    cefr: "Semi-formal register · indirect politeness · culinary vocabulary",
    summary:
      "How English does politeness at the table: ordering with grace, sending something back without causing offence, and talking about food like a connoisseur.",
    dialog: [
      { speaker: "Host", en: "Good evening. Do you have a reservation with us tonight?" },
      { speaker: "You", en: "Yes, under Popescu — a table for two, around 8." },
      { speaker: "Host", en: "Perfect. Would you prefer to be seated by the window, or somewhere a bit quieter?" },
      { speaker: "You", en: "Somewhere quieter would be lovely, thanks." },
      { speaker: "Waiter", en: "Can I get you anything to drink while you're looking at the menu?" },
      { speaker: "You", en: "I'd love a glass of whatever red you'd recommend with the lamb." },
      { speaker: "Waiter", en: "Excellent choice. Are you ready to order, or would you like a few more minutes?" },
      { speaker: "You", en: "I think we're set. I'll go with the pappardelle to start, and the lamb shank as a main." },
      { speaker: "Waiter", en: "Any allergies or dietary requirements I should flag with the kitchen?" },
      { speaker: "You", en: "Nothing major — I'd just rather it wasn't too heavily seasoned." },
      { speaker: "You (later)", en: "Sorry to bother you — I think there's been a slight mix-up. I ordered the lamb medium, but this is closer to well done." },
      { speaker: "Waiter", en: "I'm so sorry about that. Let me take it back and have the chef sort it out straight away." },
      { speaker: "You", en: "Could we get the bill whenever you have a moment? And is service included?" },
    ],
    explanations: [
      {
        title: "Indirect politeness: distancing as a tool",
        body: "At C1, English politeness is mostly grammatical distance between you and the request. Compare: ‘I want…’ → ‘I'd like…’ → ‘I was wondering if I could…’. The more layers — pretérite, past modal, embedded question — the more polite. ‘Could we possibly…’ is the standard register; ‘I don't suppose you could…’ is extra polite.",
      },
      {
        title: "Hedging a complaint",
        body: "English speakers don't say ‘This is wrong.’ They hedge: ‘There's been a slight mix-up’, ‘I think there might be a small issue with…’, ‘I'm afraid this isn't quite what I ordered.’ ‘I'm afraid’ has nothing to do with fear — it's a marker of polite regret.",
      },
      {
        title: "Collocations with ‘order’ and ‘bill’",
        body: "Verbs that pair naturally with order: place an order, take an order, get an order wrong, rush an order. For the bill: settle the bill (pay), split the bill (share), foot the bill (pay for everything — idiomatic). ‘Service charge’ / ‘gratuity’ = the tip that's already included.",
      },
      {
        title: "Connoisseur vocabulary for food",
        body: "Texture: crispy, crunchy, tender, succulent, dense, flaky. Flavour: rich, delicate, savoury, tangy, smoky, earthy. Criticism: bland, overcooked, underseasoned, stodgy (heavy and dull). Praise: cooked to perfection, beautifully presented, packed with flavour.",
      },
      {
        title: "‘Would rather’ + past for polite preferences",
        body: "‘I'd rather it wasn't too spicy.’ Note: after ‘would rather’ + a different subject, the verb goes into the past (a subjunctive use). Not ‘I'd rather it isn't’. This is the natural way to express ‘I'd prefer it not to be…’.",
      },
    ],
    vocabulary: [
      { term: "to flag (something) with someone", type: "phrasal", meaning: "a semnala / a aduce în atenție", example: "I'll flag your dietary requirements with the chef." },
      { term: "a mix-up", type: "expression", meaning: "o confuzie, o încurcătură (politicos)", example: "There's been a small mix-up with our order." },
      { term: "to settle the bill", type: "collocation", meaning: "a achita nota", example: "Shall we settle the bill and head out?" },
      { term: "cooked to perfection", type: "collocation", meaning: "gătit impecabil", example: "The steak was cooked to perfection." },
      { term: "to be packed with flavour", type: "idiom", meaning: "plin de aromă", example: "This curry is absolutely packed with flavour." },
      { term: "to wash (something) down with", type: "phrasal", meaning: "a stropi / a duce jos cu (băutură)", example: "We washed it down with a crisp Sauvignon." },
      { term: "I don't suppose…", type: "expression", meaning: "formulă super-politicoasă pentru a cere ceva", example: "I don't suppose you could bring some extra napkins?" },
      { term: "stodgy", type: "word", meaning: "greoi, sățios (peiorativ)", example: "The pudding was a bit stodgy for my taste." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "I was ____ if we could possibly move to a quieter table.",
        answers: ["wondering"],
        hint: "Maximum-politeness opener: ‘I was ___ if…’",
      },
      {
        kind: "choice",
        prompt: "The most natural C1 way to complain politely:",
        options: [
          "This food is bad. Change it.",
          "I'm afraid there's been a slight mix-up with my order.",
          "Excuse me, I don't like this.",
        ],
        correct: 1,
        explain: "‘I'm afraid’ + ‘a slight mix-up’ is classic British hedging.",
      },
      {
        kind: "transform",
        prompt: "Rewrite politely using ‘would rather’:",
        sentence: "Please don't season it heavily.",
        answers: [
          "i'd rather it wasn't seasoned heavily",
          "i would rather it wasn't seasoned heavily",
          "i'd rather it weren't seasoned heavily",
        ],
        hint: "‘I'd rather it ___ + past’.",
      },
      {
        kind: "fill",
        prompt: "We were going to ____ the bill, but he insisted on paying.",
        answers: ["split"],
        hint: "Collocation — share the bill",
      },
      {
        kind: "choice",
        prompt: "‘Stodgy’ best describes:",
        options: ["a light, clear soup", "a heavy, doughy pudding", "a fresh, tangy starter"],
        correct: 1,
      },
    ],
    freePrompt: {
      prompt:
        "Write a short review (60–80 words) of a restaurant you've been to. Use at least: one collocation from the lesson, one texture adjective, and one polite hedge for a minor criticism.",
      hint: "Open with ‘We popped in for…’ or ‘Tucked away on a side street, …’.",
    },
    match: [
      { en: "I don't suppose you could…", ro: "Nu cumva ați putea…" },
      { en: "There's been a slight mix-up.", ro: "A fost o mică încurcătură." },
      { en: "Cooked to perfection.", ro: "Gătit impecabil." },
      { en: "Packed with flavour.", ro: "Plin de aromă." },
      { en: "Shall we split the bill?", ro: "Împărțim nota?" },
      { en: "A tad overdone.", ro: "Puțin prea făcut." },
      { en: "Service is included.", ro: "Taxa de serviciu e inclusă." },
    ],
  },

  // =========================================================================
  // AIRPORT
  // =========================================================================
  {
    slug: "airport",
    title: "Navigating the Airport",
    tagline: "Transactional English under pressure",
    emoji: "✈️",
    image: airportImg,
    level: "C1",
    cefr: "Transactional English under pressure · travel phrasal verbs",
    summary:
      "Cryptic announcements, missed connections, lost luggage. Airport English calls for precise phrasal verbs and a calm, firm tone.",
    dialog: [
      { speaker: "Agent", en: "Good morning. Could I see your passport and booking reference, please?" },
      { speaker: "You", en: "Here you go. I'm hoping to check in two bags and keep one as carry-on." },
      { speaker: "Agent", en: "Just so you know, your carry-on looks a touch oversized — could you pop it on the sizer?" },
      { speaker: "You", en: "Of course. … There — does that fit?" },
      { speaker: "Agent", en: "Just barely. I'll let it through. Would you like to upgrade to extra legroom for £25?" },
      { speaker: "You", en: "I'll pass, thanks. Any chance of an aisle seat though?" },
      { speaker: "Agent", en: "Done. Boarding starts at 10:40 from Gate 24. Heads-up — the gate is a fair walk, so don't dawdle." },
      { speaker: "PA", en: "This is a final boarding call for passenger Popescu travelling to Lisbon. Please make your way to Gate 24 immediately." },
      { speaker: "You (later, at baggage claim)", en: "Excuse me — I've been waiting for my suitcase for about 40 minutes and it still hasn't come through. I think it may have been delayed." },
      { speaker: "Staff", en: "I'll need to file a missing-baggage report. Could you describe the bag and confirm your onward address?" },
    ],
    explanations: [
      {
        title: "Essential travel phrasal verbs",
        body: "check in (register at the desk), check out (leave a hotel), board (get on the plane), take off (depart), touch down (land), look out for (watch for), make it to (manage to reach), put through (be connected). ‘I just made it to the gate’ = I got there at the very last moment.",
      },
      {
        title: "Decoding airport announcements fast",
        body: "‘Final boarding call’ = the very last call (the gate is already closing). ‘Now boarding by row’ = boarding in row groups. ‘Flight delayed / cancelled / rescheduled.’ ‘Gate change.’ ‘Please proceed to…’ = move towards… ‘Last call for…’ = final chance for…",
      },
      {
        title: "C1 hedging for problems",
        body: "Don't say ‘My bag is lost!’ Say ‘I think my bag may have been delayed’ or ‘It appears my bag hasn't come through yet.’ ‘It appears’, ‘it seems’ and ‘may have + past participle’ both soften the claim and sound more professional.",
      },
      {
        title: "Idioms for delays and rushing",
        body: "to cut it fine (to leave it dangerously late), to miss the boat (miss your chance / your plane), a stone's throw away (very close), a fair walk (a long way), to dawdle (to dally), to be held up (to be delayed).",
      },
      {
        title: "Impersonal passive: the style of announcements",
        body: "Announcements lean on the passive: ‘Passengers are kindly requested to…’, ‘Smoking is not permitted’, ‘Liquids must be placed in a clear bag.’ Memorise the rhythm — you'll recognise it instantly in any airport in the world.",
      },
    ],
    vocabulary: [
      { term: "to cut it fine", type: "idiom", meaning: "a o lăsa pe ultima sută de metri", example: "We cut it fine — boarding had already started." },
      { term: "a fair walk", type: "expression", meaning: "destul de departe", example: "Gate 24 is a fair walk from security." },
      { term: "to come through", type: "phrasal", meaning: "(despre bagaje) a apărea pe bandă", example: "My suitcase still hasn't come through." },
      { term: "heads-up", type: "expression", meaning: "atenționare amicală", example: "Heads-up — there's a long queue at security." },
      { term: "to be held up", type: "phrasal", meaning: "a fi întârziat / blocat", example: "I was held up at passport control." },
      { term: "onward journey", type: "collocation", meaning: "călătoria de continuare", example: "Enjoy your onward journey to Madrid." },
      { term: "stopover / layover", type: "word", meaning: "escală scurtă / lungă (UK / US)", example: "We've got a three-hour layover in Frankfurt." },
      { term: "to make it to (the gate)", type: "phrasal", meaning: "a reuși să ajungi", example: "We just about made it to the gate in time." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "We had to run — we were really ____ it fine.",
        answers: ["cutting"],
        hint: "Idiom: leaving it dangerously late",
      },
      {
        kind: "choice",
        prompt: "The most polite way to report a missing bag:",
        options: [
          "You lost my bag!",
          "Where is my bag?? It's not here!",
          "I think my bag may have been delayed — it hasn't come through yet.",
        ],
        correct: 2,
      },
      {
        kind: "transform",
        prompt: "Rewrite in the impersonal passive (announcement style):",
        sentence: "You cannot bring liquids through security.",
        answers: [
          "liquids are not permitted through security",
          "liquids are not allowed through security",
          "liquids may not be brought through security",
        ],
      },
      {
        kind: "fill",
        prompt: "I was ____ up at passport control for nearly an hour.",
        answers: ["held"],
      },
      {
        kind: "choice",
        prompt: "UK vs US difference:",
        options: [
          "‘Stopover’ is British, ‘layover’ is American.",
          "They're perfect synonyms.",
          "‘Layover’ always means more than 24 hours.",
        ],
        correct: 0,
        explain: "In general usage, Brits say ‘stopover’, Americans say ‘layover’.",
      },
    ],
    freePrompt: {
      prompt:
        "Write a 4–5 sentence message to a colleague explaining that your flight has been delayed and you'll be late to a meeting. Use the impersonal passive and at least one hedge.",
      hint: "‘My flight's been…’, ‘It looks like I won't be able to make it until…’.",
    },
    match: [
      { en: "Final boarding call", ro: "Ultima chemare pentru îmbarcare" },
      { en: "We cut it fine.", ro: "Am ajuns pe ultima sută." },
      { en: "Heads-up.", ro: "Atenție / un mic avertisment." },
      { en: "A fair walk away", ro: "Destul de departe" },
      { en: "Held up at security", ro: "Întârziat la control" },
      { en: "Onward journey", ro: "Călătoria de continuare" },
      { en: "Carry-on / hand luggage", ro: "Bagaj de mână" },
    ],
  },

  // =========================================================================
  // INTERVIEW
  // =========================================================================
  {
    slug: "interview",
    title: "The Job Interview",
    tagline: "Sound senior, structured and self-aware",
    emoji: "💼",
    image: interviewImg,
    level: "C1+",
    cefr: "Professional register · STAR answers · strategic hedging",
    summary:
      "C1 interview English: STAR-structured answers, leadership vocabulary, and how to talk about failure without minimising it.",
    dialog: [
      { speaker: "Interviewer", en: "Thanks for coming in. To kick things off, could you walk me through your background?" },
      { speaker: "You", en: "Of course. I've spent the past five years in product marketing, most recently leading go-to-market for a B2B SaaS platform. Before that, I cut my teeth in a small agency, which gave me a really hands-on grounding." },
      { speaker: "Interviewer", en: "What drew you to this role specifically?" },
      { speaker: "You", en: "Honestly, two things. First, the scope — owning a category end-to-end is exactly the stretch I'm looking for. Second, your team's reputation for shipping fast without cutting corners." },
      { speaker: "Interviewer", en: "Tell me about a time you had to push back on a senior stakeholder." },
      { speaker: "You", en: "Sure. Our CMO was set on a campaign I felt wouldn't land with our ICP. I pulled together quick user interviews and walked her through the findings rather than the opinion. She ultimately green-lit a reframed version — and it outperformed projections by 30%." },
      { speaker: "Interviewer", en: "And a time something didn't go to plan?" },
      { speaker: "You", en: "We rushed a launch to hit a board deadline and the messaging fell flat. I owned it in the post-mortem, restructured how we validate copy, and that framework is still in use." },
      { speaker: "Interviewer", en: "Where do you see yourself in three years?" },
      { speaker: "You", en: "Ideally, leading a team and shaping strategy at the function level — but I'm wary of over-engineering the path. The next 12 months matter more than the next 36." },
    ],
    explanations: [
      {
        title: "The STAR framework for behavioural questions",
        body: "S = Situation (context, one sentence), T = Task (your role), A = Action (what YOU did — first-person verbs), R = Result (quantified where possible). ‘Tell me about a time…’ always expects STAR. Aim for 60–90 second answers. Avoid ‘we did’ — interviewers want to hear ‘I did’.",
      },
      {
        title: "Strong verbs for CVs and interviews",
        body: "spearheaded, scaled, drove, owned, shipped, delivered, restructured, streamlined, secured, championed, led, mentored, untangled. Avoid ‘helped’, ‘was involved in’, ‘assisted with’ — they all say ‘I wasn't really in charge’.",
      },
      {
        title: "Strategic hedging vs weakness",
        body: "Good: ‘I'd argue that…’, ‘My take is…’, ‘It's worth noting that…’, ‘On balance, I'd say…’. Weak: ‘I think maybe…’, ‘Sort of…’, ‘I'm not sure but…’. Hedge the OPINION, never the COMPETENCE.",
      },
      {
        title: "Talking about failure like a pro",
        body: "Formula: what happened → what you learnt → what you changed systemically. Never ‘it was the team's fault’, never ‘nothing comes to mind’. Use ‘I owned it’, ‘I took the hit’, ‘lessons learned’. Failure without learning = red flag.",
      },
      {
        title: "Useful professional idioms",
        body: "to cut your teeth (to learn the trade), to hit the ground running (to be productive from day one), to think outside the box (creative — clichéd, avoid!), to move the needle (to have measurable impact), to drop the ball (to fail / miss), to be on the same page (to agree), to take ownership (to take responsibility).",
      },
    ],
    vocabulary: [
      { term: "to cut your teeth (in/on something)", type: "idiom", meaning: "a-ți face mâna, a te forma profesional", example: "I cut my teeth in a fast-paced agency." },
      { term: "to push back (on)", type: "phrasal", meaning: "a te opune, a contesta politicos", example: "I had to push back on the timeline." },
      { term: "to move the needle", type: "idiom", meaning: "a avea impact real, măsurabil", example: "This campaign actually moved the needle on revenue." },
      { term: "to take ownership", type: "collocation", meaning: "a-ți asuma responsabilitatea", example: "She took ownership of the entire launch." },
      { term: "to ship fast", type: "collocation", meaning: "a livra produse rapid", example: "We ship fast but rarely cut corners." },
      { term: "to cut corners", type: "idiom", meaning: "a face rabat la calitate", example: "We refuse to cut corners on testing." },
      { term: "to fall flat", type: "phrasal", meaning: "a eșua, a nu rezona", example: "The opening joke completely fell flat." },
      { term: "a stretch role", type: "collocation", meaning: "rol care te scoate din zona de confort", example: "This would be a real stretch role for me." },
      { term: "to green-light", type: "phrasal", meaning: "a aproba un proiect", example: "The board green-lit the budget." },
      { term: "post-mortem", type: "word", meaning: "analiză după un proiect (succes sau eșec)", example: "Let's do a quick post-mortem on Friday." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "I ____ my teeth in a small startup before joining a corporate.",
        answers: ["cut"],
      },
      {
        kind: "choice",
        prompt: "A C1-level answer to ‘What's your biggest weakness?’:",
        options: [
          "I'm a perfectionist.",
          "I have no weaknesses.",
          "I used to take on too much myself — I've been actively delegating more, and it's freed up my team to grow.",
        ],
        correct: 2,
        explain: "Real weakness + corrective action + result. Never ‘perfectionist’ (tired cliché).",
      },
      {
        kind: "transform",
        prompt: "Strengthen the verb (replace ‘helped with’):",
        sentence: "I helped with the product launch.",
        answers: [
          "i led the product launch",
          "i drove the product launch",
          "i spearheaded the product launch",
          "i owned the product launch",
          "i shipped the product launch",
        ],
        hint: "led / drove / spearheaded / owned / shipped",
      },
      {
        kind: "fill",
        prompt: "I had to ____ back on the deadline — it simply wasn't realistic.",
        answers: ["push"],
      },
      {
        kind: "choice",
        prompt: "Which is the strongest STAR closer?",
        options: [
          "…and that's basically what happened.",
          "…which boosted conversion by 22% quarter-on-quarter.",
          "…and the team was happy.",
        ],
        correct: 1,
        explain: "Quantify the result. ‘Boosted X by Y%’ is the standard.",
      },
    ],
    freePrompt: {
      prompt:
        "Give a STAR answer to ‘Tell me about a time you turned around a difficult situation’ (80–120 words). Use at least two strong verbs and one quantified result (real or plausible).",
      hint: "Situation (1) → Task (1) → Action (3–4 sentences, ‘I…’) → Result (numbers).",
    },
    match: [
      { en: "to cut your teeth", ro: "a te forma profesional" },
      { en: "to move the needle", ro: "a avea impact real" },
      { en: "to push back on", ro: "a te opune politicos" },
      { en: "to cut corners", ro: "a face rabat la calitate" },
      { en: "to take ownership", ro: "a-ți asuma" },
      { en: "to hit the ground running", ro: "a fi productiv din prima zi" },
      { en: "a stretch role", ro: "rol provocator" },
      { en: "to green-light", ro: "a aproba" },
    ],
  },

  // =========================================================================
  // FRIENDS
  // =========================================================================
  {
    slug: "friends",
    title: "Hanging Out with Friends",
    tagline: "Native casual: contractions, slang, dry irony",
    emoji: "☕",
    image: friendsImg,
    level: "C1",
    cefr: "Slang · irony · conversational pragmatics",
    summary:
      "Native casual conversation: contractions, slang, controlled sarcasm, idiomatic expressions. The gap between textbook English and pub English.",
    dialog: [
      { speaker: "Alex", en: "Long time no see! How've you been?" },
      { speaker: "You", en: "Can't complain, honestly. Work's been mental, but I'm getting there. You?" },
      { speaker: "Alex", en: "Same old, same old. Actually, I've been meaning to catch up with you for ages." },
      { speaker: "You", en: "Tell me about it. We keep saying we'll grab a drink and it never happens." },
      { speaker: "Alex", en: "What about Friday? There's this new place that's supposed to be brilliant." },
      { speaker: "You", en: "Friday works. Shall we say 7-ish? My treat — I owe you one from last time." },
      { speaker: "Alex", en: "Don't be daft, we'll split it. By the way, did you hear about Sarah's new gig?" },
      { speaker: "You", en: "No way — spill the beans." },
      { speaker: "Alex", en: "She packed in the consultancy and is going freelance. Bold move, but it's so her." },
      { speaker: "You", en: "Good for her. Anyway, I should probably get going — early start tomorrow." },
      { speaker: "Alex", en: "Fair enough. Friday it is. Take care!" },
    ],
    explanations: [
      {
        title: "Connected speech: how it actually sounds",
        body: "‘How have you been’ → ‘How've you been’ (/haʊv juː biːn/). ‘I have been meaning to’ → ‘I've been meaning to’. ‘What about’ → ‘Whaddabout’. ‘Going to’ → ‘gonna’, ‘want to’ → ‘wanna’, ‘got to’ → ‘gotta’. Rarely written, almost always spoken. A C1 listener hears them and uses them.",
      },
      {
        title: "Casual discourse markers",
        body: "‘Anyway’ = changes topic. ‘Actually’ = corrects or adds. ‘By the way’ = side info. ‘I mean…’ = clarifies. ‘Like, …’ (filler) = like, sort of. ‘You know what I mean?’ = seeks agreement. ‘To be fair…’ = concedes nuance.",
      },
      {
        title: "British vs American — living differences",
        body: "UK: brilliant / mental / cheers / mate / proper good / take the mickey / knackered. US: awesome / crazy / thanks / dude / really good / make fun of / exhausted. ‘I'm pissed’ = UK angry, US drunk. ‘Pants’ = UK underwear, US trousers. Keep both registers in mind.",
      },
      {
        title: "British irony and understatement",
        body: "‘Not bad’ can mean ‘excellent’. ‘A bit of a nightmare’ = a disaster. ‘Quite good’ = mediocre-to-good. ‘I wouldn't say no’ = yes, please. The British use understatement as a cultural signature. Don't take it literally.",
      },
      {
        title: "Social phrasal verbs",
        body: "to catch up (to compare news), to hang out (to spend time), to drop by/in (to stop by), to bail on (to cancel abruptly), to flake out (to be unreliable, to cancel), to pack in (to quit a job), to fall out with (to argue with), to make up (to reconcile), to put up with (to tolerate).",
      },
    ],
    vocabulary: [
      { term: "long time no see", type: "expression", meaning: "nu ne-am văzut de mult", example: "Long time no see! What's new?" },
      { term: "to catch up (with someone)", type: "phrasal", meaning: "a se pune la curent", example: "We need to catch up soon!" },
      { term: "can't complain", type: "expression", meaning: "nu mă pot plânge", example: "Work's busy but I can't complain." },
      { term: "to spill the beans", type: "idiom", meaning: "a divulga o veste", example: "Come on, spill the beans!" },
      { term: "to pack (something) in", type: "phrasal", meaning: "a renunța la (job, hobby)", example: "He packed in his job to travel." },
      { term: "to bail (on someone)", type: "phrasal", meaning: "a anula în ultimul moment", example: "Sorry I bailed on you last night." },
      { term: "knackered", type: "word", meaning: "epuizat (UK)", example: "I'm absolutely knackered." },
      { term: "fair enough", type: "expression", meaning: "OK, e logic / e corect", example: "Fair enough — see you Friday then." },
      { term: "tell me about it", type: "expression", meaning: "ironic: „nici nu-mi mai zice”", example: "— Mondays are rough. — Tell me about it." },
      { term: "good for (you/her/him)", type: "expression", meaning: "bravo, mă bucur pentru tine", example: "She got promoted — good for her!" },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "We really need to ____ up — it's been months.",
        answers: ["catch"],
      },
      {
        kind: "choice",
        prompt: "In the UK, ‘I'm absolutely knackered’ means:",
        options: ["I'm furious.", "I'm exhausted.", "I'm drunk."],
        correct: 1,
      },
      {
        kind: "choice",
        prompt: "A British speaker says ‘Not bad at all, actually’. They most likely mean:",
        options: ["Mediocre.", "Excellent (understatement).", "Awful."],
        correct: 1,
        explain: "Classic understatement. ‘Not bad’ can be real praise.",
      },
      {
        kind: "transform",
        prompt: "Rewrite informally, using contractions and a phrasal verb:",
        sentence: "He has decided to leave his job and travel.",
        answers: [
          "he's decided to pack in his job and travel",
          "he's packed in his job to travel",
          "he's decided to pack his job in and travel",
        ],
      },
      {
        kind: "fill",
        prompt: "Don't ____ on me again — last time you cancelled an hour before!",
        answers: ["bail", "flake"],
        hint: "Phrasal verb for cancelling abruptly",
      },
    ],
    freePrompt: {
      prompt:
        "Write a short text exchange (5–6 messages) with a friend who wants to meet up this weekend. Use at least three casual elements (contractions, a phrasal verb, slang, an idiom).",
      hint: "‘Mate, you free…?’, ‘Can't, I'm…’, ‘Fair enough’, ‘How about…?’",
    },
    match: [
      { en: "Long time no see!", ro: "Nu ne-am văzut de mult!" },
      { en: "Spill the beans.", ro: "Spune tot." },
      { en: "I'm knackered.", ro: "Sunt epuizat." },
      { en: "Tell me about it.", ro: "Nici nu-mi mai zice." },
      { en: "Fair enough.", ro: "OK, e corect." },
      { en: "Don't bail on me.", ro: "Nu mă lăsa baltă." },
      { en: "Good for her!", ro: "Bravo ei!" },
      { en: "My treat.", ro: "Fac eu cinste." },
    ],
  },

  // =========================================================================
  // ONLINE
  // =========================================================================
  {
    slug: "online",
    title: "Online: Chat, Email & Slack",
    tagline: "Three registers, three sets of rules",
    emoji: "💬",
    image: onlineImg,
    level: "C1",
    cefr: "Digital registers · professional email · tone",
    summary:
      "Three distinct registers: chatting with friends, posting on team Slack, emailing a client. Same language, three different worlds.",
    dialog: [
      { speaker: "WhatsApp", en: "u free 2nite? new burger place opened lol" },
      { speaker: "You", en: "yeah down for it. 8?" },
      { speaker: "Slack #team", en: "Quick one, team — anyone got bandwidth to QA the onboarding flow today? 🙏" },
      { speaker: "You (Slack)", en: "I can take a look after standup. Drop the Loom and acceptance criteria here?" },
      { speaker: "Email", en: "Subject: Q3 proposal — quick clarification\n\nHi Sarah,\n\nI hope this finds you well. Thanks for sending the draft proposal across on Friday — I've had a chance to review it in detail.\n\nOn the whole, it looks really strong. There are just two points I wanted to flag before we sign off:\n\n1. The scope under section 3 reads slightly ambiguously — could we tighten the deliverables?\n2. The timeline assumes a two-week QA window, which I suspect may be optimistic given the holiday period.\n\nHappy to jump on a call this week if that's easier. Otherwise, let me know your thoughts when you get a moment — no rush.\n\nMany thanks,\nAlex" },
    ],
    explanations: [
      {
        title: "Three registers, three sets of rules",
        body: "CHAT (friends): lowercase, no punctuation, abbreviations (u, ur, idk, lol, lmao, brb), emoji freely. SLACK (colleagues): short sentences, occasional emoji 🙏 ✅, direct tone, ‘quick one’ / ‘bandwidth’ / ‘let me circle back’. EMAIL (external): full paragraphs, proper opening + closing, no emoji, polite hedging.",
      },
      {
        title: "Anatomy of a C1 email",
        body: "1) Specific subject line (‘Q3 proposal — quick clarification’, not ‘Hi’). 2) Appropriate greeting: ‘Dear Ms Roberts’ (formal) / ‘Hi Sarah’ (known). 3) Warm-up line (‘I hope this finds you well’ — accepted cliché). 4) Context (‘Thanks for…’). 5) Main request with hedging. 6) Clear next step. 7) Sign-off: ‘Many thanks’, ‘Best regards’, ‘Kind regards’.",
      },
      {
        title: "Professional email hedges",
        body: "‘I just wanted to check…’, ‘Could I possibly ask…’, ‘I was wondering whether…’, ‘It might be worth…’, ‘I suspect…’, ‘I'd be inclined to…’, ‘On the off-chance you have a moment…’. All soften the ask without weakening it.",
      },
      {
        title: "Slack / email acronyms to know",
        body: "ASAP (as soon as possible), EOD (end of day), EOW (end of week), FYI (for your information), FYA (for your action), TL;DR (too long; didn't read — summary), OOO (out of office), WFH (work from home), PTO (paid time off), KPI/OKR (objectives), 1:1 (one-to-one meeting), heads-up, circle back, loop in, sync up.",
      },
      {
        title: "Tone: how to avoid sounding rude by accident",
        body: "‘Per my last email’ = passive-aggressive; use ‘As mentioned previously…’. ‘K.’ = cold; at least ‘Sounds good!’. ‘Why didn't you…?’ → ‘Just curious — what was the thinking behind…?’. Add ‘please’, ‘when you get a chance’, ‘happy to discuss’.",
      },
    ],
    vocabulary: [
      { term: "to loop (someone) in", type: "phrasal", meaning: "a include pe cineva pe email/chat", example: "Looping in Sarah for visibility." },
      { term: "to circle back", type: "phrasal", meaning: "a reveni asupra unui subiect", example: "Let's circle back on this next week." },
      { term: "to sign off (on)", type: "phrasal", meaning: "a aproba final / a încheia", example: "Once legal signs off, we can ship." },
      { term: "to flag (something)", type: "phrasal", meaning: "a semnala atent", example: "Just flagging a small issue with section 3." },
      { term: "EOD / EOW", type: "expression", meaning: "sfârșitul zilei / săptămânii", example: "I'll have it to you by EOD." },
      { term: "bandwidth", type: "word", meaning: "capacitate (timp/energie) pentru ceva", example: "I don't have the bandwidth this week." },
      { term: "no rush", type: "expression", meaning: "nu e grabă", example: "Whenever you get a chance — no rush." },
      { term: "to touch base", type: "idiom", meaning: "a lua scurt legătura", example: "Let's touch base on Thursday." },
      { term: "I hope this finds you well", type: "expression", meaning: "clișeu acceptat de deschidere de email", example: "Hi Mark, I hope this finds you well." },
      { term: "kind regards / many thanks", type: "collocation", meaning: "închideri standard de email", example: "Kind regards, Alex" },
    ],
    exercises: [
      {
        kind: "choice",
        prompt: "The most appropriate C1 email subject line:",
        options: [
          "Hi",
          "Quick question!!!",
          "Q3 proposal — quick clarification",
        ],
        correct: 2,
      },
      {
        kind: "fill",
        prompt: "Looping ____ Sarah for visibility on this.",
        answers: ["in"],
        hint: "Phrasal verb: include someone",
      },
      {
        kind: "transform",
        prompt: "Soften the tone (rewrite politely):",
        sentence: "Why didn't you reply to my last email?",
        answers: [
          "just checking in — did my last email reach you ok?",
          "just following up on my last email — let me know when you get a chance",
          "just wanted to follow up on my previous email when you have a moment",
        ],
        hint: "‘Just following up…’ + ‘when you get a chance’",
      },
      {
        kind: "choice",
        prompt: "‘Per my last email’ in a reply is:",
        options: [
          "Professional and clear.",
          "Passive-aggressive — avoid.",
          "Very polite.",
        ],
        correct: 1,
        explain: "Famously read as passive-aggressive. Use ‘As mentioned previously’ or just resummarise.",
      },
      {
        kind: "fill",
        prompt: "I don't have the ____ this week — could we push it to next?",
        answers: ["bandwidth", "capacity"],
      },
    ],
    freePrompt: {
      prompt:
        "Write a short email (80–100 words) to a client asking for feedback on a project. Use: a specific subject, a warm-up line, the request with hedging, a suggested deadline, and a professional sign-off.",
      hint: "‘I hope this finds you well…’, ‘I'd be grateful if…’, ‘by EOW’, ‘Kind regards’.",
    },
    match: [
      { en: "To loop in", ro: "A include pe email" },
      { en: "To circle back", ro: "A reveni asupra subiectului" },
      { en: "To touch base", ro: "A lua scurt legătura" },
      { en: "No rush", ro: "Nu e grabă" },
      { en: "EOD", ro: "Sfârșitul zilei" },
      { en: "Bandwidth", ro: "Capacitate / timp" },
      { en: "Kind regards", ro: "Cu respect" },
      { en: "To sign off", ro: "A aproba final" },
    ],
  },

  // =========================================================================
  // SOCIAL MEDIA
  // =========================================================================
  {
    slug: "social-media",
    title: "Social Media & Internet Culture",
    tagline: "Captions, comments, memes, vibes",
    emoji: "📱",
    image: socialImg,
    level: "C1",
    cefr: "Living English · meme literacy · Gen-Z slang",
    summary:
      "Captions, comments, DMs, memes. Internet English moves fast — Gen-Z vocabulary, meta-irony, and the thin line between cool and cringe.",
    dialog: [
      { speaker: "IG caption", en: "currently down a Lisbon rabbit hole 🇵🇹 send recs" },
      { speaker: "Comment", en: "okay but the lighting in that second pic is unreal ✨" },
      { speaker: "Reply", en: "right?? pure golden hour magic, no filter" },
      { speaker: "TikTok caption", en: "POV: you said \"just one drink\" three hours ago 🙃 #relatable" },
      { speaker: "DM", en: "hey! saw your story — that café screams my aesthetic. drop the @ when you have a sec?" },
      { speaker: "You", en: "ahaha it's called Brew & Bloom — tiny, no wifi, perfect vibes. you'd live there." },
      { speaker: "X / Twitter", en: "hot take: airport coffee is good, actually. fight me." },
      { speaker: "Reply", en: "this is the wildest thing I've read all week 😭" },
    ],
    explanations: [
      {
        title: "Internet grammar: the new rules",
        body: "Deliberate lowercase = casual, ironic, ‘chill’ tone. ALL CAPS = shouting or strong emphasis. A full stop at the end of a text reads as dry, even annoyed. ‘lol’ and ‘lmao’ rarely mean actual laughing anymore — they're softeners. ‘K.’ is curt; ‘kk’ is friendly.",
      },
      {
        title: "Active Gen-Z slang (2025)",
        body: "slay (excellent), no cap (no lie / serious), it's giving X (gives off the vibe of X), main character energy (central, charismatic presence), the algorithm fed me (it showed up in my feed), unhinged (wild — often positive), iconic, lowkey/highkey (somewhat / intensely), tea (gossip), spill the tea, era (phase: ‘my running era’), based (boldly opinionated), mid (mediocre), it ate (it was flawless), delulu (delusional — self-mocking).",
      },
      {
        title: "Meme literacy: recognised structures",
        body: "‘POV: you…’ = the character's perspective. ‘No one: / Me: …’ = nobody asked, but here it is. ‘It's giving [adjective]’ = gives off the vibe of. ‘Tell me you're X without telling me you're X.’ ‘This is the [adj]-est thing.’ These are meme frames — recognise them, deploy them in the right context.",
      },
      {
        title: "Meta-irony and self-deprecation",
        body: "Online English runs on ironic self-deprecation: ‘i am once again opening LinkedIn to feel bad about myself’, ‘crying screaming throwing up’ (about something tiny), ‘I cannot be normal about this’. Don't read it literally — it's humour through exaggeration.",
      },
      {
        title: "The line between cool and cringe",
        body: "Cringe = forced, late or misplaced use. ‘How do you do, fellow kids?’ energy. Rules: 1) don't use slang you don't fully understand, 2) a corporate brand using ‘slay’ = instant cringe, 3) slang ages FAST (one year = expired). Watch first, deploy later.",
      },
    ],
    vocabulary: [
      { term: "to go down a rabbit hole", type: "idiom", meaning: "a te pierde adâncit într-un subiect", example: "I went down a Wikipedia rabbit hole about octopuses." },
      { term: "it's giving (X)", type: "expression", meaning: "transmite vibe-ul de X (Gen-Z)", example: "This outfit is giving main-character energy." },
      { term: "hot take", type: "collocation", meaning: "opinie controversată / curajoasă", example: "Hot take: emails are better than meetings." },
      { term: "the algorithm fed me", type: "expression", meaning: "mi-a apărut în feed", example: "The algorithm fed me 3 hours of bread-making videos." },
      { term: "to drop the @", type: "expression", meaning: "a trimite numele de utilizator", example: "Drop the @ — I need to follow her." },
      { term: "no cap", type: "expression", meaning: "fără minciună, serios", example: "That was the best meal I've ever had, no cap." },
      { term: "lowkey / highkey", type: "expression", meaning: "oarecum / intens", example: "I lowkey want to move to Portugal." },
      { term: "main character energy", type: "expression", meaning: "carismă, atitudine de protagonist", example: "She walked in with full main character energy." },
      { term: "to spill the tea", type: "idiom", meaning: "a spune bârfa", example: "Okay, spill the tea — what happened at dinner?" },
      { term: "mid", type: "word", meaning: "mediocru (peiorativ)", example: "Honestly, the sequel was mid." },
      { term: "cringe (adj/n)", type: "word", meaning: "jenant / jena", example: "That ad was peak cringe." },
      { term: "to be unhinged (positive)", type: "expression", meaning: "delicios de nebun", example: "Her comedy is genuinely unhinged — I love it." },
    ],
    exercises: [
      {
        kind: "choice",
        prompt: "‘This outfit is giving main character energy’ means:",
        options: [
          "The clothes belong to the main character.",
          "The outfit projects charisma, protagonist energy.",
          "The outfit is too plain.",
        ],
        correct: 1,
      },
      {
        kind: "fill",
        prompt: "I went down a 3-hour ____ ____ on medieval recipes.",
        answers: ["rabbit hole"],
      },
      {
        kind: "choice",
        prompt: "A corporate brand posts ‘we just dropped our new collection — it slays, no cap’. A native reaction:",
        options: ["Very cool, they'll buy.", "Cringe — forced marketing slang.", "Very professional."],
        correct: 1,
      },
      {
        kind: "transform",
        prompt: "Write an Instagram caption (max 12 words) for a morning coffee photo. Use deliberate lowercase:",
        sentence: "I am drinking coffee on a beautiful Tuesday morning.",
        answers: ["tuesday morning energy ☕"],
        hint: "There isn't one correct answer. Try something short and casual: ‘slow tuesday’, ‘coffee era’, ‘it's giving monday again’. The displayed answer is just one example.",
      },
      {
        kind: "choice",
        prompt: "Which sentence sounds most ironic / Gen-Z?",
        options: [
          "I really enjoyed the film.",
          "i cannot be normal about this movie. crying. screaming. throwing up.",
          "The film was quite good.",
        ],
        correct: 1,
      },
    ],
    freePrompt: {
      prompt:
        "Write a caption (max 25 words) + a friend's comment + your reply. Topic: first day in a new city. Use lowercase, an emoji, and a meme structure (‘POV:’, ‘it's giving’, ‘no one: / me:’).",
      hint: "Caption → comment → reply. Read it out loud: if it sounds like a bank's copywriter, loosen it up.",
    },
    match: [
      { en: "It's giving main character energy.", ro: "Transmite carismă de protagonist." },
      { en: "Hot take", ro: "Părere controversată" },
      { en: "Spill the tea", ro: "Dă bârfa" },
      { en: "Down a rabbit hole", ro: "Adâncit într-o spirală de subiect" },
      { en: "The algorithm fed me…", ro: "Mi-a apărut în feed…" },
      { en: "Lowkey obsessed", ro: "Cam obsedat(ă)" },
      { en: "Mid", ro: "Mediocru" },
      { en: "Peak cringe", ro: "Culmea jenei" },
    ],
  },



  // =========================================================================
  // DOCTOR'S APPOINTMENT
  // =========================================================================
  {
    slug: "doctor",
    title: "At the Doctor's",
    tagline: "Describing symptoms and understanding a diagnosis — without panicking",
    emoji: "🩺",
    image: doctorImg,
    level: "C1",
    cefr: "Medical register · symptom vocabulary · hedged self-diagnosis",
    summary:
      "How to walk into a GP's office and actually be understood: pinpointing symptoms, answering screening questions, and parsing the doctor's careful, often non-committal English.",
    dialog: [
      { speaker: "Receptionist", en: "Morning. Have you been with us before, or is this your first visit?" },
      { speaker: "You", en: "First time, actually. I registered online last week." },
      { speaker: "Receptionist", en: "Lovely. Take a seat — Dr Bennett will call you through in a moment." },
      { speaker: "Doctor", en: "Come in, have a seat. So, what seems to be the trouble today?" },
      { speaker: "You", en: "I've had this nagging headache for about a week now, mostly behind my eyes, and it's been getting worse." },
      { speaker: "Doctor", en: "On a scale of one to ten, how would you rate the pain at its worst?" },
      { speaker: "You", en: "Maybe a seven. It comes and goes, but lately it's been keeping me up at night." },
      { speaker: "Doctor", en: "Any nausea, dizziness, or sensitivity to light along with it?" },
      { speaker: "You", en: "A bit of dizziness, yes. And I've been feeling run down generally." },
      { speaker: "Doctor", en: "Right. Let's have a quick look. Any history of migraines in the family?" },
      { speaker: "You", en: "My mum used to get them, but I've never had anything like this before." },
      { speaker: "Doctor", en: "It's most likely tension-related, but I'd like to rule out anything more serious. I'll refer you for a blood test, and in the meantime I'll prescribe something to take the edge off." },
      { speaker: "You", en: "How long should I give it before coming back if it doesn't clear up?" },
      { speaker: "Doctor", en: "If you're not feeling significantly better within ten days, do book a follow-up." },
    ],
    explanations: [
      {
        title: "Present perfect for ongoing symptoms",
        body: "Symptoms still happening at the time of the consultation take present perfect (continuous when emphasising duration): ‘I've had a headache for a week’, ‘I've been feeling dizzy since Monday’. The simple past (‘I had a headache’) sounds like it's over — and the doctor will tick the wrong box.",
      },
      {
        title: "Doctor's hedging: ‘most likely’, ‘rule out’, ‘unlikely to be’",
        body: "Doctors almost never commit. Listen for ‘it's most likely…’, ‘it could be…’, ‘I'd like to rule out…’, ‘it's unlikely to be anything serious, but…’. ‘Rule out’ = to exclude as a possibility. None of this means they don't know; it's professional caution.",
      },
      {
        title: "Phrasal verbs that survive only in clinical English",
        body: "to come down with (something) = to start getting an illness; to come on (of symptoms) = to start; to wear off = to fade (of medicine); to flare up = to suddenly get worse; to clear up = to resolve; to take the edge off = to make less severe (often of pain).",
      },
      {
        title: "Pain vocabulary by quality, not just intensity",
        body: "Sharp, stabbing, throbbing, dull, nagging, shooting, aching, burning, tight, splitting (typically of headache). ‘A nagging pain’ is mild but persistent. ‘A splitting headache’ is severe. ‘It comes and goes’ = intermittent — the standard phrase you'll hear and use.",
      },
      {
        title: "Polite imperatives in clinical instructions",
        body: "‘Do book a follow-up’ — the ‘do’ here is emphatic-polite, not commanding. Other softeners: ‘Pop your sleeve up for me’, ‘Just lie back’, ‘Let's have a quick look’. The ‘let's’ and ‘we’ in ‘How are we feeling today?’ are the famous clinical ‘we’ — slightly patronising but ubiquitous.",
      },
    ],
    vocabulary: [
      { term: "to come down with (something)", type: "phrasal", meaning: "a se îmbolnăvi de", example: "I think I'm coming down with the flu." },
      { term: "to take the edge off", type: "idiom", meaning: "a mai atenua (durerea / disconfortul)", example: "These tablets should take the edge off the pain." },
      { term: "to rule (something) out", type: "phrasal", meaning: "a exclude (un diagnostic)", example: "We'll do a scan to rule out anything more serious." },
      { term: "a nagging pain", type: "collocation", meaning: "o durere persistentă, surdă", example: "I've had a nagging pain in my lower back for days." },
      { term: "to flare up", type: "phrasal", meaning: "a se agrava brusc (de obicei cronic)", example: "My asthma flares up in the spring." },
      { term: "run down", type: "expression", meaning: "epuizat, slăbit (general)", example: "I've been feeling really run down lately." },
      { term: "to clear up", type: "phrasal", meaning: "a se rezolva / a trece (de la sine)", example: "The rash should clear up within a few days." },
      { term: "a splitting headache", type: "collocation", meaning: "o durere de cap cumplită", example: "I woke up with a splitting headache." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "I've ____ feeling dizzy since yesterday morning.",
        answers: ["been"],
        hint: "Present perfect continuous — ongoing symptom.",
      },
      {
        kind: "choice",
        prompt: "‘I'd like to rule out anything more serious’ means:",
        options: [
          "I'm sure it's nothing.",
          "I want to exclude the possibility of something worse.",
          "I refuse to consider serious causes.",
        ],
        correct: 1,
        explain: "‘Rule out’ = exclude as a possibility, usually via tests.",
      },
      {
        kind: "transform",
        prompt: "Rewrite using a phrasal verb from the lesson:",
        sentence: "I think I'm starting to get a cold.",
        answers: [
          "i think i'm coming down with a cold",
          "i think i am coming down with a cold",
        ],
        hint: "‘to ___ ___ ___ something’ = to start being ill with",
      },
      {
        kind: "fill",
        prompt: "The painkillers will ____ the edge off until you see the specialist.",
        answers: ["take"],
        hint: "Idiom: ___ the edge off.",
      },
      {
        kind: "choice",
        prompt: "Which best describes a ‘nagging’ pain?",
        options: ["sudden and sharp", "mild but won't go away", "burning and intense"],
        correct: 1,
      },
    ],
    freePrompt: {
      prompt:
        "Imagine you're describing a recent minor illness to your GP. Write 60–90 words. Use at least: one present perfect for duration, one pain adjective, and one phrasal verb from the lesson.",
      hint: "Start with ‘I've been feeling… for about…’.",
    },
    match: [
      { en: "What seems to be the trouble?", ro: "Cu ce vă pot ajuta? (la medic)" },
      { en: "It comes and goes.", ro: "Vine și pleacă (intermitent)." },
      { en: "I've been feeling run down.", ro: "Mă simt epuizat(ă) / fără chef." },
      { en: "To rule out anything serious.", ro: "A exclude ceva grav." },
      { en: "To take the edge off.", ro: "A mai atenua (durerea)." },
      { en: "I'll prescribe you something.", ro: "Vă prescriu ceva." },
      { en: "Book a follow-up.", ro: "Programați-vă un control." },
    ],
  },

  // =========================================================================
  // RENTING AN APARTMENT
  // =========================================================================
  {
    slug: "apartment",
    title: "Renting a Flat",
    tagline: "Viewing a place, negotiating terms, and reading between the agent's lines",
    emoji: "🔑",
    image: apartmentImg,
    level: "C1",
    cefr: "Property vocabulary · negotiation register · euphemism decoding",
    summary:
      "The English rental market runs on euphemisms (‘cosy’, ‘characterful’) and contractual fine print. This lesson teaches you to view a flat critically, ask the right questions, and push back politely on terms.",
    dialog: [
      { speaker: "Agent", en: "So this is the main living area — south-facing, gets gorgeous light in the afternoons." },
      { speaker: "You", en: "It's smaller than it looked online. Are the dimensions on the listing accurate?" },
      { speaker: "Agent", en: "Roughly, yes. It's a cosy space, but very efficient — every inch is usable." },
      { speaker: "You", en: "‘Cosy’ usually means ‘small’, doesn't it? What's the square footage?" },
      { speaker: "Agent", en: "Just over forty square metres. Bedroom's through here — generous storage, as you can see." },
      { speaker: "You", en: "Is the rent negotiable, or is the listed price set in stone?" },
      { speaker: "Agent", en: "There may be some wiggle room if you're willing to sign a longer lease — say, two years instead of one." },
      { speaker: "You", en: "What about bills? Are utilities included, or are we looking at extras on top?" },
      { speaker: "Agent", en: "Council tax and water are included; you'd be responsible for gas, electricity and internet." },
      { speaker: "You", en: "And how much is the deposit? Is it the standard five weeks' rent?" },
      { speaker: "Agent", en: "Five weeks, held in a government-protected scheme. You'd get it back at the end of the tenancy, minus any deductions." },
      { speaker: "You", en: "One concern — that damp patch on the ceiling. Has the landlord looked into it?" },
      { speaker: "Agent", en: "It's been flagged. The landlord's lined up a contractor to sort it before move-in." },
      { speaker: "You", en: "If we decide to go ahead, how soon would we need to put down a holding deposit?" },
    ],
    explanations: [
      {
        title: "Estate-agent euphemisms — the decoder ring",
        body: "‘Cosy’ = small. ‘Compact’ = very small. ‘Characterful’ = old, possibly draughty. ‘Up-and-coming area’ = not yet safe at night. ‘In need of some TLC’ (tender loving care) = needs work. ‘Deceptively spacious’ = looks small but isn't (this one is actually positive). ‘A real opportunity’ = a problem someone else will inherit.",
      },
      {
        title: "Conditionals for negotiation",
        body: "Second conditional is the negotiator's tool: ‘If we signed a two-year lease, would you consider knocking off £50?’, ‘Would you be willing to include the white goods if we moved in next week?’. The past tense (‘signed’, ‘moved’) makes the offer hypothetical and therefore non-committal — easy to walk back from.",
      },
      {
        title: "Property vocabulary — UK vs US",
        body: "UK: flat, lift, ground floor, first floor, garden, tap, hob, fortnight, deposit, letting agent, tenancy, landlord. US equivalents: apartment, elevator, first floor, second floor, yard, faucet, stove, two weeks, security deposit, real estate agent, lease, landlord. Bills: council tax (UK property tax to the local council).",
      },
      {
        title: "‘To be looking at’ + cost / time / problem",
        body: "‘You're looking at around £200 a month for bills.’ ‘We're looking at a six-week turnaround.’ ‘If we don't fix it now, we're looking at structural damage.’ It's a softener: the speaker isn't telling you, they're inviting you to look with them. Very common in commercial / contractual English.",
      },
      {
        title: "Phrasal verbs for arranging and committing",
        body: "to line up (a contractor) = to arrange in advance; to put down (a deposit) = to pay upfront; to fall through (of a deal) = to collapse before completion; to go through with (something) = to follow through on a commitment; to back out = to withdraw at the last minute.",
      },
    ],
    vocabulary: [
      { term: "wiggle room", type: "idiom", meaning: "marjă de negociere, spațiu de manevră", example: "There might be some wiggle room on the price." },
      { term: "set in stone", type: "idiom", meaning: "bătut în cuie, definitiv", example: "The deadline isn't set in stone." },
      { term: "to put (something) down", type: "phrasal", meaning: "a depune (un avans)", example: "We had to put down two months' rent as a deposit." },
      { term: "to fall through", type: "phrasal", meaning: "a pica (un acord, o tranzacție)", example: "The sale fell through at the last minute." },
      { term: "to flag (something) up", type: "phrasal", meaning: "a semnala, a aduce în atenție", example: "I flagged it up with the landlord weeks ago." },
      { term: "in need of some TLC", type: "expression", meaning: "are nevoie de îngrijire / reparații", example: "The kitchen's in need of some TLC." },
      { term: "to be on top of", type: "expression", meaning: "în plus față de, peste", example: "There's a service charge on top of the rent." },
      { term: "to look into (something)", type: "phrasal", meaning: "a investiga, a se ocupa de", example: "I'll look into the heating issue this week." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "Is the price ____ in stone, or is there room to negotiate?",
        answers: ["set"],
        hint: "Idiom: ___ in stone = fixed.",
      },
      {
        kind: "choice",
        prompt: "An agent describes a flat as ‘characterful’. They probably mean:",
        options: [
          "modern and beautifully renovated",
          "old, quirky, possibly draughty",
          "in a famous neighbourhood",
        ],
        correct: 1,
        explain: "Classic estate-agent euphemism for ‘old and unrenovated’.",
      },
      {
        kind: "transform",
        prompt: "Rewrite as a negotiating offer using the second conditional:",
        sentence: "We sign a two-year lease and you reduce the rent.",
        answers: [
          "if we signed a two-year lease, would you reduce the rent",
          "if we signed a two-year lease would you reduce the rent",
          "would you reduce the rent if we signed a two-year lease",
        ],
        hint: "‘If we ___ (past), would you ___?’",
      },
      {
        kind: "fill",
        prompt: "The deal ____ through because they couldn't get a mortgage.",
        answers: ["fell"],
        hint: "Phrasal: ___ through = to collapse.",
      },
      {
        kind: "choice",
        prompt: "‘Wiggle room’ means:",
        options: ["a small room", "space to negotiate or adjust", "an awkward layout"],
        correct: 1,
      },
    ],
    freePrompt: {
      prompt:
        "Write a short email (70–100 words) to a letting agent after a flat viewing. Include: one polite negotiation using the second conditional, one concern you'd like flagged, and one question about the lease.",
      hint: "Open with ‘Thanks for showing us round the flat on Saturday.’",
    },
    match: [
      { en: "Is there any wiggle room on the price?", ro: "Există marjă de negociere la preț?" },
      { en: "It's set in stone.", ro: "E bătut în cuie." },
      { en: "Are utilities included?", ro: "Sunt utilitățile incluse?" },
      { en: "To put down a deposit.", ro: "A depune un avans / garanție." },
      { en: "The deal fell through.", ro: "Tranzacția a picat." },
      { en: "On top of the rent.", ro: "În plus față de chirie." },
      { en: "In need of some TLC.", ro: "Are nevoie de niște îngrijire / reparații." },
    ],
  },

  // =========================================================================
  // CUSTOMER SERVICE / COMPLAINT BY PHONE
  // =========================================================================
  {
    slug: "customer-service",
    title: "Calling Customer Service",
    tagline: "Getting a refund without losing your cool",
    emoji: "📞",
    image: customerServiceImg,
    level: "C1",
    cefr: "Service register · assertive politeness · escalation language",
    summary:
      "How to ring a company about a faulty product or wrong charge, stay firm but courteous, and escalate without burning the bridge. The English here is performative — both sides know the script.",
    dialog: [
      { speaker: "Agent", en: "Thanks for calling support. You're through to Daniel — how can I help you today?" },
      { speaker: "You", en: "Hi Daniel. I placed an order last Tuesday and it arrived this morning, but the item's damaged." },
      { speaker: "Agent", en: "I'm really sorry to hear that. Could I take your order number, please?" },
      { speaker: "You", en: "Of course — it's GB-447-921." },
      { speaker: "Agent", en: "Thank you. Bear with me one moment while I pull that up… Right, I can see the order. Could you describe the damage?" },
      { speaker: "You", en: "The screen is cracked, and the packaging looks like it was crushed in transit." },
      { speaker: "Agent", en: "I do apologise. I can offer you a partial refund of twenty percent if you'd like to keep the item." },
      { speaker: "You", en: "I appreciate the offer, but I'd rather have a full refund or a replacement, to be honest. The item isn't usable in this condition." },
      { speaker: "Agent", en: "Understood. In that case, I'll arrange a free return and process a full refund once we receive it back." },
      { speaker: "You", en: "How long is the refund likely to take once you've got the item?" },
      { speaker: "Agent", en: "Typically three to five working days, depending on your bank." },
      { speaker: "You", en: "That's a bit longer than I was hoping for. Is there any way to speed that up?" },
      { speaker: "Agent", en: "I'm afraid not on my end, but I'll flag it as priority so it's handled as soon as it lands with us." },
      { speaker: "You", en: "Alright, that works. Could I get that confirmation in writing as well?" },
      { speaker: "Agent", en: "Absolutely — I'll send it through to the email on your account in the next few minutes." },
    ],
    explanations: [
      {
        title: "The ritual of customer-service openings",
        body: "Agents follow a near-fixed script: ‘You're through to [name]’ (= speaking with), ‘How can I help today?’, ‘Bear with me’ (= please wait), ‘Let me pull that up’ (= retrieve on screen). Mirroring this register — calm, named, structured — gets you better service than launching straight into the complaint.",
      },
      {
        title: "Soft refusal with ‘I appreciate…, but…’",
        body: "‘I appreciate the offer, but…’ / ‘I take your point, but…’ / ‘I understand, but…’ acknowledges the agent has made an effort, then declines. It's miles more effective than ‘No, that's not enough’. Pair it with what you actually want (‘I'd rather have…’) so the conversation moves forward.",
      },
      {
        title: "Modal hedging when asking for more",
        body: "‘Is there any way to…?’, ‘Would it be possible to…?’, ‘Could you possibly…?’ — all polite ways to push. ‘I was hoping you might be able to…’ is the most deferential. These soften a request that's actually an expectation. Notice that even agents use them when delivering bad news: ‘I'm afraid not’ is the standard refusal.",
      },
      {
        title: "Escalation vocabulary",
        body: "to escalate (this) = to push up the chain; to speak to your supervisor / manager; to lodge a formal complaint; to log a case / ticket; to file a chargeback (with the bank); a goodwill gesture (= compensation offered without admitting fault). Knowing the words signals you're a serious caller and often shortcuts the negotiation.",
      },
      {
        title: "Future-in-the-past for soft expectations",
        body: "‘That's a bit longer than I was hoping for.’ ‘I was expecting it to arrive yesterday.’ Past continuous + future-tinged verb (hope, expect, wonder) lets you express disappointment without accusation. The agent isn't attacked; the timeline is.",
      },
    ],
    vocabulary: [
      { term: "to bear with (someone)", type: "phrasal", meaning: "a avea răbdare cu (cineva)", example: "Bear with me — I'm pulling up your account now." },
      { term: "to pull (something) up", type: "phrasal", meaning: "a deschide / a afișa (pe ecran)", example: "Let me pull up your order details." },
      { term: "a goodwill gesture", type: "collocation", meaning: "gest de bunăvoință (compensație fără a recunoaște vina)", example: "We'd like to offer a £20 voucher as a goodwill gesture." },
      { term: "to escalate (something)", type: "word", meaning: "a escalada, a transmite mai sus", example: "I'd like to escalate this to your manager, please." },
      { term: "to chase (something) up", type: "phrasal", meaning: "a urmări, a insista pentru", example: "I had to chase up the refund three times." },
      { term: "to land with (someone)", type: "phrasal", meaning: "a ajunge la cineva (de a fi gestionat)", example: "Once it lands with the warehouse, we'll process it." },
      { term: "in transit", type: "expression", meaning: "în tranzit, pe drum", example: "The parcel was damaged in transit." },
      { term: "to lodge a complaint", type: "collocation", meaning: "a depune o reclamație", example: "I'd like to lodge a formal complaint." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "Could you ____ with me while I check your account?",
        answers: ["bear"],
        hint: "Phrasal verb: ___ with me = please wait.",
      },
      {
        kind: "choice",
        prompt: "The most C1-appropriate way to refuse a partial refund:",
        options: [
          "No, I want a full refund.",
          "That's not enough.",
          "I appreciate the offer, but I'd rather have a full refund.",
        ],
        correct: 2,
        explain: "Acknowledge + decline + state preference. Classic soft-refusal pattern.",
      },
      {
        kind: "transform",
        prompt: "Rewrite to express polite disappointment about a delay:",
        sentence: "That delivery time is too long for me.",
        answers: [
          "that's a bit longer than i was hoping for",
          "that is a bit longer than i was hoping for",
          "that's longer than i was hoping for",
        ],
        hint: "‘That's a bit longer than I was ___ for.’",
      },
      {
        kind: "fill",
        prompt: "I'd like to ____ this to your supervisor, please.",
        answers: ["escalate"],
        hint: "Verb — push up the chain.",
      },
      {
        kind: "choice",
        prompt: "A ‘goodwill gesture’ is:",
        options: [
          "an apology in writing",
          "compensation offered without admitting fault",
          "a friendly conversation with the agent",
        ],
        correct: 1,
      },
    ],
    freePrompt: {
      prompt:
        "Write a short complaint message (70–100 words) to a company about a delayed or faulty order. Use: one soft-refusal pattern, one hedged request, and one escalation phrase.",
      hint: "Open with ‘I'm writing regarding order #…’.",
    },
    match: [
      { en: "Bear with me a moment.", ro: "Aveți puțină răbdare." },
      { en: "Let me pull that up.", ro: "Să verific în sistem." },
      { en: "I appreciate the offer, but…", ro: "Apreciez oferta, dar…" },
      { en: "A goodwill gesture.", ro: "Un gest de bunăvoință (compensație)." },
      { en: "To escalate this.", ro: "A transmite mai sus / a escalada." },
      { en: "Damaged in transit.", ro: "Deteriorat în transport." },
      { en: "I'd like to lodge a complaint.", ro: "Aș dori să depun o reclamație." },
    ],
  },

  // =========================================================================
  // WORKPLACE MEETING
  // =========================================================================
  {
    slug: "meeting",
    title: "Speaking Up in Meetings",
    tagline: "Proposing, disagreeing and steering the room — without dominating it",
    emoji: "💼",
    image: meetingImg,
    level: "C1+",
    cefr: "Business register · diplomatic disagreement · meeting choreography",
    summary:
      "The English meeting is a choreography of turn-taking, hedged proposals and surgical disagreement. This lesson covers the phrases that let you contribute confidently, push back politely and bring others in.",
    dialog: [
      { speaker: "Chair", en: "Right, let's get started. Thanks for making time — I know everyone's diary is packed this week." },
      { speaker: "Chair", en: "First on the agenda: the Q3 roadmap. Anya, would you like to kick us off?" },
      { speaker: "Anya", en: "Sure. Before I dive in, just a heads-up — the numbers I'm about to share are still provisional." },
      { speaker: "Anya", en: "The headline is that we're tracking slightly behind on adoption, but ahead on revenue." },
      { speaker: "Marco", en: "Sorry to jump in — could you clarify what you mean by ‘behind on adoption’? Behind forecast, or behind last quarter?" },
      { speaker: "Anya", en: "Good question. Behind forecast — last quarter we're actually up." },
      { speaker: "You", en: "Can I just build on Anya's point for a second? If we're up year-on-year but behind forecast, the issue might be with how we're forecasting, not with the product itself." },
      { speaker: "Marco", en: "I take your point, but I'd push back slightly — our forecasts have been pretty solid all year." },
      { speaker: "You", en: "Fair enough. I'm not saying we throw them out, just that we revisit the assumptions." },
      { speaker: "Chair", en: "Good — let's park that for now and pick it up in a separate session. Anything else on the roadmap?" },
      { speaker: "Anya", en: "One more thing, if I may — we'll need a decision on the pricing tier by end of next week, otherwise it'll slip into Q4." },
      { speaker: "Chair", en: "Noted. Can we action that with you, Marco, by Friday?" },
      { speaker: "Marco", en: "Will do. I'll loop in Sarah and circle back to the group on Thursday." },
      { speaker: "Chair", en: "Perfect. Let's wrap up there — thanks everyone." },
    ],
    explanations: [
      {
        title: "Floor-taking without rudeness",
        body: "‘Sorry to jump in, but…’, ‘Can I just come in here?’, ‘If I could add something quickly…’, ‘Just to build on that…’ — all let you interrupt without sounding like you're interrupting. The apology (‘sorry to…’) is performative — nobody actually thinks you're sorry — but it's the price of admission.",
      },
      {
        title: "Diplomatic disagreement: agree-then-pivot",
        body: "‘I take your point, but…’, ‘I see where you're coming from, however…’, ‘That's a fair point — I'd just add…’, ‘I'd push back slightly on that.’ Always acknowledge first, then pivot. Bare ‘I disagree’ is fine in informal teams but reads as combative in most professional rooms.",
      },
      {
        title: "Meeting verbs you'll only meet in meetings",
        body: "to kick off = to start; to dive in = to begin in detail; to park (something) = to set aside for later; to loop (someone) in = to include in a thread/discussion; to circle back = to return to a topic; to action (something) = to assign as a task (verb, jargon); to land on = to reach (a decision); to wrap up = to conclude.",
      },
      {
        title: "Hedging proposals with conditionals and softeners",
        body: "‘What if we tried…?’, ‘Could we maybe…?’, ‘One option might be to…’, ‘I wonder whether it'd be worth…’. Putting the proposal in question form invites engagement instead of forcing a yes/no. ‘Just an idea, but…’ is the universal disclaimer that lets you float something risky.",
      },
      {
        title: "Bringing others in — the chair's toolkit",
        body: "‘What are your thoughts, Sarah?’, ‘Anything to add from your side, Marco?’, ‘Let's hear from the team on the ground.’ Senior English speakers actively pull quieter voices in — it's a status move, not a kindness. Learn the phrases even if you're not chairing; using them yourself looks remarkably mature.",
      },
    ],
    vocabulary: [
      { term: "to kick off", type: "phrasal", meaning: "a începe (o ședință, un proiect)", example: "Shall we kick off with the budget update?" },
      { term: "to park (something)", type: "phrasal", meaning: "a pune deoparte (pentru mai târziu)", example: "Let's park that and come back to it next week." },
      { term: "to loop (someone) in", type: "phrasal", meaning: "a include pe cineva (în conversație / email)", example: "I'll loop you in on the email thread." },
      { term: "to circle back", type: "phrasal", meaning: "a reveni asupra unui subiect", example: "Let me check with the team and circle back tomorrow." },
      { term: "to action (something)", type: "word", meaning: "a aloca ca sarcină, a transforma în acțiune (jargon)", example: "Can we action that with marketing by Monday?" },
      { term: "a heads-up", type: "expression", meaning: "o avertizare, un avertisment prietenos", example: "Just a heads-up — the deck isn't final yet." },
      { term: "to push back (on something)", type: "phrasal", meaning: "a contesta (politicos)", example: "I'd push back on that assumption a little." },
      { term: "to wrap up", type: "phrasal", meaning: "a încheia, a concluziona", example: "Let's wrap up — we're out of time." },
    ],
    exercises: [
      {
        kind: "fill",
        prompt: "Sorry to ____ in, but could you clarify that figure?",
        answers: ["jump", "come", "cut"],
        hint: "Phrasal verb for polite interruption.",
      },
      {
        kind: "choice",
        prompt: "The most diplomatic way to disagree at C1+ is:",
        options: [
          "I disagree completely.",
          "That's wrong.",
          "I take your point, but I'd push back slightly on that.",
        ],
        correct: 2,
        explain: "Acknowledge then pivot — the agree-then-pivot template.",
      },
      {
        kind: "transform",
        prompt: "Rewrite as a hedged proposal:",
        sentence: "We should postpone the launch.",
        answers: [
          "what if we postponed the launch",
          "could we maybe postpone the launch",
          "one option might be to postpone the launch",
          "i wonder whether it'd be worth postponing the launch",
          "i wonder whether it would be worth postponing the launch",
        ],
        hint: "Start with ‘What if we…’, ‘Could we maybe…’ or ‘One option might be to…’.",
      },
      {
        kind: "fill",
        prompt: "Let's ____ that for now and pick it up next week.",
        answers: ["park"],
        hint: "Meeting jargon: ___ a topic = set aside.",
      },
      {
        kind: "choice",
        prompt: "‘I'll loop you in’ means:",
        options: [
          "I'll get back to you eventually.",
          "I'll include you in the conversation / thread.",
          "I'll loop the recording back.",
        ],
        correct: 1,
      },
    ],
    freePrompt: {
      prompt:
        "Write a short meeting contribution (60–90 words) in which you (1) politely interrupt, (2) build on someone's point, and (3) push back gently on a different point. Use at least three phrases from the lesson.",
      hint: "Open with ‘Sorry to jump in, but…’.",
    },
    match: [
      { en: "Shall we kick off?", ro: "Începem?" },
      { en: "Let's park that for now.", ro: "Să lăsăm asta deoparte deocamdată." },
      { en: "I'll loop you in.", ro: "Te includ și pe tine (în conversație)." },
      { en: "I'd push back slightly on that.", ro: "Aș contesta puțin acest lucru." },
      { en: "Just a heads-up.", ro: "Doar o avertizare prietenoasă." },
      { en: "Let's circle back to this.", ro: "Să revenim la acest subiect." },
      { en: "Let's wrap up there.", ro: "Să încheiem aici." },
    ],
  },
];

export const LESSONS_BY_SLUG: Record<string, Lesson> = Object.fromEntries(
  LESSONS.map((l) => [l.slug, l]),
);

