import type { Module } from '../types';

export const MODULES: Module[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // MODULE 1: The Poker Universe
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'module1',
    title: 'The Poker Universe',
    tagline: 'Start from zero — learn the deck, hand rankings, and the table.',
    icon: '🃏',
    weekEquivalent: 'Week 1',
    badgeId: 'first-hand',
    belt: 'white',
    color: '#9ca3af',
    treatiseSections: [1],
    lessons: [
      {
        id: 'module1-lesson1',
        title: 'The Deck of Cards',
        estimatedMinutes: 5,
        xpReward: 10,
        keyTerms: [
          { term: 'Suit', definition: 'One of four card categories: Spades ♠, Hearts ♥, Diamonds ♦, Clubs ♣' },
          { term: 'Rank', definition: 'The value of a card: 2 through Ace (highest)' },
        ],
        sections: [
          {
            type: 'text',
            content: 'A standard deck has 52 cards. Every card has two properties: a **rank** (its number or face value) and a **suit** (its symbol category).',
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: 'The 4 suits are: ♠ Spades, ♥ Hearts, ♦ Diamonds, ♣ Clubs. No suit is stronger than another — suits only matter for flushes.',
          },
          {
            type: 'text',
            content: 'The 13 ranks from lowest to highest are: **2, 3, 4, 5, 6, 7, 8, 9, T (Ten), J (Jack), Q (Queen), K (King), A (Ace)**.',
          },
          {
            type: 'card-demo',
            content: 'Here are all four Aces — one in each suit:',
            cards: [
              { rank: 'A', suit: 'spades' },
              { rank: 'A', suit: 'hearts' },
              { rank: 'A', suit: 'diamonds' },
              { rank: 'A', suit: 'clubs' },
            ],
          },
          {
            type: 'key-point',
            content: '4 suits × 13 ranks = 52 cards total. Every card in the deck is unique.',
          },
        ],
      },
      {
        id: 'module1-lesson2',
        title: 'Hand Rankings',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'Hand', definition: 'Your best 5-card combination from your 2 hole cards + 5 community cards' },
          { term: 'Royal Flush', definition: 'A-K-Q-J-T all of the same suit — the best possible hand' },
          { term: 'Kicker', definition: 'A high card that breaks ties between equal-ranked hands' },
        ],
        sections: [
          {
            type: 'text',
            content: 'In Texas Hold\'em, each player makes their best 5-card poker hand using any combination of their 2 private cards and 5 community cards. Here are all hand rankings from best to worst:',
          },
          {
            type: 'table',
            content: 'Hand Rankings (Best → Worst)',
            tableData: {
              headers: ['Rank', 'Name', 'Example', 'Frequency'],
              rows: [
                ['1 (Best)', 'Royal Flush', 'A♠ K♠ Q♠ J♠ T♠', 'Extremely rare'],
                ['2', 'Straight Flush', '9♥ 8♥ 7♥ 6♥ 5♥', 'Very rare'],
                ['3', 'Four of a Kind (Quads)', 'K♠ K♥ K♦ K♣ Q♠', 'Rare'],
                ['4', 'Full House', 'J♠ J♥ J♦ 9♠ 9♥', 'Uncommon'],
                ['5', 'Flush', 'A♣ T♣ 7♣ 4♣ 2♣', 'Uncommon'],
                ['6', 'Straight', 'Q♠ J♥ T♦ 9♣ 8♠', 'Moderate'],
                ['7', 'Three of a Kind (Trips)', 'T♠ T♥ T♦ K♠ 7♣', 'Moderate'],
                ['8', 'Two Pair', 'A♠ A♥ 8♦ 8♣ K♠', 'Common'],
                ['9', 'One Pair', 'Q♠ Q♥ 9♦ 7♣ 3♠', 'Very common'],
                ['10 (Worst)', 'High Card', 'A♠ K♥ J♦ 7♣ 3♠', 'Most common'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Example:** If the board shows K♠ K♥ 7♦ 7♣ 2♠ and you hold A♠ K♦, you have Three Kings (trips using the pair on board + your King). If you held 7♠ 7♥, you\'d have Four Sevens — much stronger!',
          },
          {
            type: 'callout',
            calloutType: 'tip',
            content: '**Memory trick:** Royal > Straight > Four > Full > Flush > Straight > Three > Two > One > None. Or remember: "Really Strong Four-legged Felines Sometimes Take Two Legs Once Naked"',
          },
        ],
      },
      {
        id: 'module1-lesson3',
        title: 'How a Hand is Played',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Hole Cards', definition: 'Your 2 private cards that only you can see' },
          { term: 'Community Cards', definition: 'The 5 shared cards dealt face-up in the middle of the table' },
          { term: 'Pot', definition: 'The total money (or chips) in the middle that the winner takes' },
          { term: 'Blind', definition: 'A forced bet made before cards are dealt to create initial action' },
          { term: 'Preflop', definition: 'The first betting round, before any community cards are shown' },
          { term: 'Flop', definition: 'The first 3 community cards dealt face-up' },
          { term: 'Turn', definition: 'The 4th community card' },
          { term: 'River', definition: 'The 5th and final community card' },
        ],
        sections: [
          {
            type: 'text',
            content: 'A Texas Hold\'em hand follows four **streets** (betting rounds). Let\'s walk through each step.',
          },
          {
            type: 'table',
            content: 'The Four Streets of Play',
            tableData: {
              headers: ['Street', 'Cards Shown', 'What Happens'],
              rows: [
                ['Preflop', 'None (2 hole cards dealt)', 'Players receive 2 private cards. Small blind and big blind post forced bets. Action goes around the table.'],
                ['Flop', '3 community cards', '3 cards are dealt face-up. Another round of betting.'],
                ['Turn', '4th community card', '1 more card is added. Bets get bigger (in limit poker). Another betting round.'],
                ['River', '5th community card', 'Final card. Final betting round. If multiple players remain, it goes to showdown.'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**Fold any time.** At any point in any betting round, you can fold (give up your hand). This loses any chips you\'ve already put in, but you risk no more.',
          },
          {
            type: 'text',
            content: 'The player who wins takes all the chips in the pot. They win either by having the best hand at showdown, or by being the last player remaining after everyone else folds.',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Example hand:** You hold A♠ K♦. Flop: K♠ 7♥ 2♣. You have top pair (a pair of Kings) with an Ace kicker — a strong hand! Turn: T♦ (a blank). River: K♥. Now you have three Kings. You bet and your opponent folds. You win the pot.',
          },
        ],
      },
      {
        id: 'module1-lesson4',
        title: 'The Table & Positions',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'Position', definition: 'Where you sit relative to the dealer button — determines betting order' },
          { term: 'Button (BTN)', definition: 'The dealer position; acts last after the flop — the most powerful seat' },
          { term: 'Blinds', definition: 'Small Blind (SB) and Big Blind (BB) — forced bets that drive action' },
          { term: 'UTG (Under the Gun)', definition: 'The first player to act preflop — the weakest position' },
        ],
        sections: [
          {
            type: 'text',
            content: 'In poker, **where you sit matters enormously**. The table has named positions, and position determines the betting order. Acting **last** is a huge advantage because you see what everyone else did before deciding.',
          },
          {
            type: 'position-table',
            content: 'A 9-player poker table with position names',
          },
          {
            type: 'table',
            content: 'Position Hierarchy (Strongest → Weakest)',
            tableData: {
              headers: ['Position', 'Abbreviation', 'Acts When Postflop', 'Strength'],
              rows: [
                ['Button', 'BTN', 'Last (best)', '★★★★★'],
                ['Cutoff', 'CO', 'Second to last', '★★★★☆'],
                ['Hijack', 'HJ', 'Third to last', '★★★☆☆'],
                ['Lojack', 'LJ', 'Fourth to last', '★★☆☆☆'],
                ['Under the Gun +2', 'UTG+2', 'Early', '★★☆☆☆'],
                ['Under the Gun +1', 'UTG+1', 'Early', '★★☆☆☆'],
                ['Under the Gun', 'UTG', 'First (worst)', '★☆☆☆☆'],
                ['Small Blind', 'SB', 'Second to last preflop, first postflop', '★☆☆☆☆'],
                ['Big Blind', 'BB', 'Last preflop, second postflop', '★★☆☆☆'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**The Button is King.** Acting last means you see everyone else\'s action before deciding. You have maximum information. The Small Blind is the opposite — you act first in every postflop street with the least information.',
          },
          {
            type: 'key-point',
            content: 'Play **tighter** (fewer hands) in early position. Play **wider** (more hands) in late position. This is the first rule of position.',
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MODULE 2: The Information Game
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'module2',
    title: 'The Information Game',
    tagline: 'Stop thinking in hands. Start thinking in ranges.',
    icon: '🧠',
    weekEquivalent: 'Weeks 1–2',
    badgeId: 'range-ranger',
    belt: 'blue',
    color: '#3b82f6',
    treatiseSections: [1, 2],
    lessons: [
      {
        id: 'module2-lesson1',
        title: 'Poker is Not About Cards',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'Information game', definition: 'Poker\'s true nature — managing uncertainty about hidden cards' },
          { term: 'GTO', definition: 'Game Theory Optimal — a strategy that cannot be systematically exploited' },
          { term: 'Exploit', definition: 'Deviating from balanced play to profit when opponents make predictable mistakes' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Most beginners think poker is about "having good cards." They\'re wrong. Poker is an **information game** — a repeated decision problem under hidden information.',
          },
          {
            type: 'table',
            content: 'What Each Element of Poker Really Means',
            tableData: {
              headers: ['Surface Feature', 'What It Actually Is'],
              rows: [
                ['Cards', 'Private information'],
                ['Bets', 'Information transmission + risk transfer'],
                ['Position', 'Information advantage'],
                ['Stack depth', 'Future threat capacity'],
                ['Board texture', 'Equity-distribution shift'],
                ['Ranges', 'Probability distributions over hidden hands'],
                ['GTO', 'Equilibrium strategy over those distributions'],
                ['Exploit', 'Profiting from opponent deviations'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**A weak player asks:** "Do I have top pair?"\n\n**A strong player asks:** "What does my range look like against villain\'s range on this board, and which hands want to bet?"',
          },
          {
            type: 'key-point',
            content: 'GTO = your **defensive baseline** (cannot be exploited). Exploitative play = how you **make money** when opponents make mistakes.',
          },
        ],
      },
      {
        id: 'module2-lesson2',
        title: 'The Mental Upgrade: Think in Ranges',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'Range', definition: 'The complete set of hands a player can plausibly hold given their actions' },
          { term: 'Range advantage', definition: 'When your total range has more equity than your opponent\'s range' },
          { term: 'Board interaction', definition: 'How much the community cards connect with a player\'s likely range' },
        ],
        sections: [
          {
            type: 'text',
            content: 'The single most important shift in poker thinking is moving from **hand thinking** to **range thinking**.',
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**Beginner thinks:** "I have A♠Q♠."\n\n**Modern poker thinks:** "I am holding one combo inside my preflop opening range. On this flop, my range has certain equity and nut-density properties against villain\'s range."',
          },
          {
            type: 'text',
            content: 'Imagine you raise from the Button. The Big Blind calls. Your button raising range likely contains: strong pairs (AA–TT), medium pairs (99–22), strong broadways (AK, AQ, AJ), suited aces (A2s+), suited kings, suited connectors.',
          },
          {
            type: 'text',
            content: 'Now the flop comes **A♣ 7♦ 2♠**. Who has range advantage? You (the raiser) do — because your range has more Ace-x hands, more AA and AK.',
          },
          {
            type: 'text',
            content: 'But if the flop comes **8♠ 7♠ 6♦**, now the Big Blind has an advantage — their range contains more 8-7, 7-6, 9-8 type hands that connect with this coordinated board.',
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: '**The same hand can be strong or weak depending on range context.** AA on A-7-2 rainbow is very strong. AA on 9-8-7 two-tone is vulnerable.',
          },
          {
            type: 'key-point',
            content: 'Always ask: "What does my RANGE look like against their RANGE on this BOARD?" — not just "what do I have?"',
          },
        ],
      },
      {
        id: 'module2-lesson3',
        title: 'Range Notation',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 's (suited)', definition: 'Same suit — e.g., AKs means Ace and King of the same suit' },
          { term: 'o (offsuit)', definition: 'Different suits — e.g., AKo means Ace and King of different suits' },
          { term: 'A2s+', definition: 'All suited Ace-x hands from A2 up to AK' },
          { term: 'TT+', definition: 'Pocket Tens and all stronger pairs (TT, JJ, QQ, KK, AA)' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Poker uses shorthand notation to describe ranges compactly. Learning this notation is essential.',
          },
          {
            type: 'table',
            content: 'Range Notation Reference',
            tableData: {
              headers: ['Notation', 'Meaning', 'Example hands'],
              rows: [
                ['AA', 'Exactly pocket Aces', 'A♠A♥, A♠A♦, A♠A♣, A♥A♦, A♥A♣, A♦A♣'],
                ['AKs', 'Ace-King suited only', 'A♠K♠, A♥K♥, A♦K♦, A♣K♣'],
                ['AKo', 'Ace-King offsuit only', 'AK where suits differ (12 combos)'],
                ['AK', 'Ace-King (both suited and offsuit)', 'All 16 combinations'],
                ['TT+', 'Tens or better (pairs)', 'TT, JJ, QQ, KK, AA'],
                ['A2s+', 'All suited Aces', 'A2s, A3s, A4s, ..., AKs'],
                ['87s', 'Eight-Seven suited', 'Only hands of the same suit'],
                ['JTo', 'Jack-Ten offsuit', 'Only different-suit combos'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'tip',
            content: 'The "+" symbol means "this hand and all stronger versions." So JJ+ means JJ, QQ, KK, AA. ATs+ means ATs, AJs, AQs, AKs.',
          },
          {
            type: 'key-point',
            content: 'Think of a range as a **set of hand labels**, not individual cards. "I\'m in UTG\'s raising range" means you could hold any hand in that set.',
          },
        ],
      },
      {
        id: 'module2-lesson4',
        title: 'The Range Grid',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: '13×13 grid', definition: 'A visual representation of all 169 possible starting hand categories' },
          { term: 'Pair diagonal', definition: 'The diagonal from top-left (AA) to bottom-right (22) — all pocket pairs' },
          { term: 'Suited triangle', definition: 'Upper-right triangle of the grid — all suited non-pair hands' },
          { term: 'Offsuit triangle', definition: 'Lower-left triangle — all offsuit non-pair hands' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Poker has exactly 169 unique starting hand types. We organize them in a 13×13 grid with ranks across both axes (A at top-left, 2 at bottom-right).',
          },
          {
            type: 'range-grid',
            content: 'This is the range grid. The diagonal (top-left to bottom-right) contains pocket pairs. Hands above the diagonal are suited. Hands below are offsuit.',
            rangeHighlight: [],
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**AA** is the top-left corner (strongest pair). **22** is the bottom-right corner (weakest pair). **AKs** is just to the right of AA (suited hands are upper-right). **AKo** is just below AA (offsuit hands are lower-left).',
          },
          {
            type: 'key-point',
            content: 'You can describe any range by coloring in cells on this grid. A wider range (more hands) fills more cells. A tight range fills fewer.',
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MODULE 3: Counting What Matters
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'module3',
    title: 'Counting What Matters',
    tagline: 'Master combinatorics, EV, pot odds, and MDF.',
    icon: '🔢',
    weekEquivalent: 'Weeks 1–2',
    badgeId: 'math-wizard',
    belt: 'blue',
    color: '#8b5cf6',
    treatiseSections: [3, 4, 5, 6],
    lessons: [
      {
        id: 'module3-lesson1',
        title: 'Combinatorics: The Arithmetic of Hidden Info',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'Combos', definition: 'The number of distinct ways a hand can be dealt' },
          { term: 'Pocket pair', definition: '6 combinations — e.g., AA can be dealt in 6 ways (C(4,2) = 6)' },
          { term: 'Suited hand', definition: '4 combinations — one per suit' },
          { term: 'Offsuit hand', definition: '12 combinations — 4 suits × 4 suits minus 4 suited = 12' },
        ],
        sections: [
          {
            type: 'text',
            content: 'There are **1,326** possible two-card starting hands in Hold\'em (52 choose 2). But we group them into 169 classes. Within each class, the number of specific card-combinations varies.',
          },
          {
            type: 'table',
            content: 'Combo Counts — The Three Core Rules',
            tableData: {
              headers: ['Hand Type', 'Example', 'Combos', 'Why'],
              rows: [
                ['Pocket pair', 'AA', '6', 'Choose 2 from 4 suits: C(4,2) = 6'],
                ['Suited hand', 'AKs', '4', 'One per suit (♠♥♦♣)'],
                ['Offsuit hand', 'AKo', '12', '4×4=16 total, minus 4 suited = 12'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**AK total = 16 combos** = 4 (AKs) + 12 (AKo). This is why offsuit hands appear far more often than suited hands — 12 vs 4.',
          },
          {
            type: 'text',
            content: 'This matters because **probability lives in combos, not hand labels**. If someone says "I put him on AK," you should think "that\'s up to 16 combos." If you see the A♠ on the board and you hold A♦, there are fewer remaining Ace combinations in villain\'s range.',
          },
          {
            type: 'key-point',
            content: 'Memorize: **Pairs = 6, Suited = 4, Offsuit = 12.** These three numbers are the foundation of combo counting.',
          },
        ],
      },
      {
        id: 'module3-lesson2',
        title: 'Blockers',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'Blocker', definition: 'A card you hold that reduces the combinations of a strong hand your opponent can have' },
          { term: 'Good bluff blocker', definition: 'Blocks opponent\'s calling hands while unblocking their folding hands' },
          { term: 'Anti-blocker', definition: 'When your cards don\'t block villain\'s folds — you want villain to be able to fold' },
        ],
        sections: [
          {
            type: 'text',
            content: 'A **blocker** is a card in your hand that removes possible hands from your opponent\'s range. When you hold a card, your opponent cannot hold that exact card.',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Board: K♠ Q♠ 7♦ 4♣ 2♠ (three spades)**\n\nIf you hold **A♠**, your opponent cannot have A♠-x♠ for the nut flush. You "block" the nut flush. This makes A♠ a powerful bluffing card.',
          },
          {
            type: 'table',
            content: 'Bluff Blocker Checklist',
            tableData: {
              headers: ['Quality', 'Description', 'Why It Matters'],
              rows: [
                ['Blocks calling hands', 'Your card is in villain\'s strong hand range', 'Fewer nutted hands call your bluff'],
                ['Unblocks folding hands', 'Your card is NOT in villain\'s weak hand range', 'More weak hands remain available to fold'],
                ['Poor showdown value', 'Your hand loses if called by marginal hands', 'Pure bluff — needs fold equity to profit'],
                ['Credible value line', 'Your betting pattern could represent strong hands', 'Villain must consider you might have the nuts'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: '**Blockers are NOT magic.** They are small probability adjustments within a broader EV calculation. A blocker that reduces nutted combos from 12 to 9 helps — but if the EV is already clearly negative, a blocker won\'t save you.',
          },
        ],
      },
      {
        id: 'module3-lesson3',
        title: 'Expected Value (EV)',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'EV (Expected Value)', definition: 'The average profit or loss of an action taken many times' },
          { term: '+EV', definition: 'A decision that earns money on average over time' },
          { term: '-EV', definition: 'A decision that loses money on average over time' },
          { term: 'Bluff break-even', definition: 'The minimum fold frequency needed for a bluff to be profitable' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Every poker decision has an **Expected Value (EV)** — the average outcome if you made that decision thousands of times. EV is the only scoreboard that matters.',
          },
          {
            type: 'formula',
            formulaLabel: 'Expected Value Formula',
            formula: 'EV = (probability of winning × amount won) − (probability of losing × amount lost)',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Bluff example:** Pot = $100. You bet $50 as a bluff.\n\nYour risk: $50. Your reward if villain folds: $100.\n\nBreak-even fold frequency = Bet ÷ (Pot + Bet) = 50 ÷ 150 = **33.3%**\n\nIf villain folds more than 33.3% of the time, your bluff is +EV.',
          },
          {
            type: 'formula',
            formulaLabel: 'Bluff Break-Even Formula',
            formula: 'Required folds = Bet ÷ (Pot + Bet)',
          },
          {
            type: 'key-point',
            content: 'EV is not about winning individual hands — it\'s about making correct decisions that profit **over thousands of repetitions**. You can make a +EV call and still lose the hand.',
          },
        ],
      },
      {
        id: 'module3-lesson4',
        title: 'Pot Odds',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Pot odds', definition: 'The ratio of pot size to the call amount — tells you minimum equity needed to call' },
          { term: 'Required equity', definition: 'The minimum win percentage that makes calling profitable' },
          { term: 'Equity', definition: 'Your probability of winning the pot if all remaining cards are dealt out' },
        ],
        sections: [
          {
            type: 'text',
            content: 'When facing a bet, **pot odds** tell you the minimum equity your hand needs to make calling profitable.',
          },
          {
            type: 'formula',
            formulaLabel: 'Required Equity Formula',
            formula: 'Required equity = Call ÷ (Pot + Bet + Call)',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Example:** Pot = $100. Villain bets $50. You must call $50.\n\nRequired equity = 50 ÷ (100 + 50 + 50) = 50 ÷ 200 = **25%**\n\nIf your hand wins at least 25% of the time against villain\'s betting range, calling is profitable.',
          },
          {
            type: 'table',
            content: 'Bet Size Reference Table',
            tableData: {
              headers: ['Villain Bet (% of pot)', 'Required Equity to Call', 'Villain\'s Bluff Needs Folds', 'Your MDF'],
              rows: [
                ['33% pot', '20%', '25%', '75%'],
                ['50% pot', '25%', '33.3%', '66.7%'],
                ['100% pot', '33.3%', '50%', '50%'],
                ['200% pot', '40%', '66.7%', '33.3%'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: '**Pot odds ≠ MDF.** Pot odds answer: "Is THIS HAND allowed to call?" MDF answers: "How much of MY RANGE must continue?" These are different questions that beginners constantly confuse.',
          },
        ],
      },
      {
        id: 'module3-lesson5',
        title: 'Minimum Defense Frequency (MDF)',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'MDF', definition: 'Minimum Defense Frequency — the fraction of your range that must continue to prevent auto-profitable bluffs' },
          { term: 'Auto-profitable bluff', definition: 'A bluff that profits regardless of which specific hands you hold, purely because you fold too much' },
          { term: 'Balanced opponent', definition: 'A player using an optimal mix of value hands and bluffs' },
        ],
        sections: [
          {
            type: 'text',
            content: 'MDF tells you how much of your **range** (not just your current hand) must continue against a bet to prevent your opponent from profitably bluffing with any two cards.',
          },
          {
            type: 'formula',
            formulaLabel: 'Minimum Defense Frequency',
            formula: 'MDF = Pot ÷ (Pot + Bet)',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Example:** Pot = $100. Villain bets $100.\n\nMDF = 100 ÷ 200 = **50%**\n\nYou must continue (call or raise) with at least 50% of your range. If you fold more than 50%, villain profits by bluffing with any cards.',
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: '**MDF has limitations!** It assumes a balanced opponent on a river-like situation with no future streets. Against a player who NEVER bluffs, defending to MDF frequency means paying off value hands repeatedly. MDF protects you against balance — not against honesty.',
          },
          {
            type: 'key-point',
            content: 'GTO says: defend enough against a **balanced** opponent. Exploit says: if villain is unbalanced (never bluffs), fold more than MDF suggests.',
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MODULE 4: Position Power
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'module4',
    title: 'Position Power',
    tagline: 'Position is the single biggest structural advantage in poker.',
    icon: '📍',
    weekEquivalent: 'Weeks 3–4',
    badgeId: 'position-pro',
    belt: 'purple',
    color: '#a855f7',
    treatiseSections: [9, 10, 11, 12],
    lessons: [
      {
        id: 'module4-lesson1',
        title: 'The Position Hierarchy',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'In position (IP)', definition: 'Acting after your opponent — seeing their action before deciding' },
          { term: 'Out of position (OOP)', definition: 'Acting before your opponent — forced to act with less information' },
          { term: 'RFI', definition: 'Raise First In — opening the pot with no other raises before you' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Position is the structural advantage of acting after your opponents. It\'s worth chips — every hand, every street.',
          },
          {
            type: 'position-table',
            content: 'Position strength visualization',
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**Why Button is King:** (1) Acts last postflop on every street. (2) Only two players left to beat (blinds). (3) Controls pot size with position. (4) Can steal blinds profitably. (5) Realizes equity better — can see opponent\'s check before deciding.',
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: '**Small Blind is awkward:** You\'ve invested money (half a BB), but you act FIRST on every postflop street. You have the least information postflop despite being invested. Play tight from SB.',
          },
        ],
      },
      {
        id: 'module4-lesson2',
        title: 'Opening Ranges by Position',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'Opening range', definition: 'The set of hands you raise with when first to act preflop' },
          { term: 'Linear range', definition: 'Top hands straight down — used when value-raising is primary goal' },
          { term: 'Polarized range', definition: 'Very strong hands + bluffs — used when raising for maximum pressure' },
          { term: 'Condensed range', definition: 'Many medium-strength hands — typical for calling ranges' },
        ],
        sections: [
          {
            type: 'text',
            content: 'How wide you open preflop depends on position. The core principle: **play tighter early, wider late.**',
          },
          {
            type: 'table',
            content: 'Opening Range Guidelines by Position',
            tableData: {
              headers: ['Position', 'Open Width', 'Key Hands', 'Avoid'],
              rows: [
                ['UTG', 'Tight (~15%)', 'TT+, AJs+, KQs, AQo+', 'Weak offsuit aces, weak kings, trash connectors'],
                ['HJ', 'Medium-tight (~20%)', '77+, ATs+, KJs+, QJs, AJo+', 'Weak offsuit hands, disconnected trash'],
                ['CO', 'Medium (~25%)', '55+, A8s+, KTs+, QTs+, JTs', 'Very weak offsuit hands'],
                ['BTN', 'Wide (~40–50%)', 'Most pairs, broadways, suited hands, suited connectors', 'Only the very worst trash'],
                ['SB', 'Raise or fold', 'Raise wide vs single opponent BB, else fold', 'Limping is generally weak'],
                ['BB', 'Defend wide', 'Wide defense vs opens, especially small opens', 'Dominated junk, reverse-implied-odds hands'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Example of range types:**\n\n**Linear (3-betting from BTN vs CO):** AK, KK, QQ, JJ, TT, AQs — all strong hands in a row.\n\n**Polarized (3-betting from BTN vs CO):** KK, AA, AKs + A5s, A4s, 76s — nuts + bluffs, skip medium hands.',
          },
        ],
      },
      {
        id: 'module4-lesson3',
        title: 'Big Blind Defense',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'BB defense', definition: 'Calling (or re-raising) an open raise from the Big Blind position' },
          { term: 'Discount', definition: 'Big Blind already has 1BB invested, so calls cost less relatively' },
          { term: 'Reverse implied odds', definition: 'When a hand makes second-best hands that lose big pots but wins small ones' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Big Blind is unique: you\'ve already invested 1BB, so calling an open raise only costs you the **difference** (if someone raises to 3BB, you\'re calling 2BB, not 3BB). This discount allows wider defense.',
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**Defend wider than intuition suggests** vs small opens. A BTN open to 2.5BB into a 1BB BB means you\'re getting 3.5:1.5 = 2.3:1 pot odds. Many hands are worth a call.',
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: '**Don\'t defend junk.** Avoid: weak offsuit disconnected hands (T2o, 83o, 52o), dominated hands (K3o, J4o), hands with reverse implied odds that make second-best frequently.',
          },
        ],
      },
      {
        id: 'module4-lesson4',
        title: 'Stack Depth',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Big blinds (BB)', definition: 'The standard unit of stack measurement in poker' },
          { term: 'Deep stacks', definition: '100BB+ — implied odds are high, playable hands gain value' },
          { term: 'Short stacks', definition: 'Under 25BB — fold equity becomes critical, push/fold poker dominates' },
          { term: 'Implied odds', definition: 'Future money you can win if you hit a strong hand' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Stack depth — measured in big blinds — fundamentally changes which hands have value.',
          },
          {
            type: 'table',
            content: 'Stack Depth Strategic Character',
            tableData: {
              headers: ['Stack Depth', 'Strategic Mode', 'Hands That Gain Value'],
              rows: [
                ['100BB+', 'Deep poker — implied odds reign', 'Suited connectors, small pairs, nut-making hands'],
                ['60BB', 'Standard tournament depth', 'High-card hands, pairs, 3-bet pots matter more'],
                ['40BB', 'Increased pressure', 'Stack-off thresholds change, value hands stronger'],
                ['25BB', 'Rejam stacks', 'Open size matters, shoving pressure increases'],
                ['15BB', 'Push/fold mode', 'High cards, pocket pairs, blockers'],
                ['<10BB', 'Shove/fold emergency', 'Any reasonable equity + fold equity'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**76s deep vs short:** At 100BB, 76s is gold — you can win a 100BB pot when you flop a straight. At 12BB, A5o may be better: it has a blocker to Aces and decent high-card equity for the shove.',
          },
        ],
      },
      {
        id: 'module4-lesson5',
        title: 'Tournaments vs Cash Games',
        estimatedMinutes: 5,
        xpReward: 10,
        keyTerms: [
          { term: 'ICM', definition: 'Independent Chip Model — accounts for the fact that tournament chips have nonlinear money value' },
          { term: 'Chip EV', definition: 'Raw chip value — used in cash games' },
          { term: '$EV', definition: 'Dollar expected value — used in tournaments; accounts for prize structure' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Cash games use **chip EV**: every chip won equals one chip of value. Tournaments use **$EV** (dollar value), which is nonlinear due to the prize structure.',
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**ICM reality:** Doubling your chips in a tournament does NOT double your prize equity. Surviving is worth money. This makes calling all-ins much tighter near the bubble or pay jumps.',
          },
          {
            type: 'key-point',
            content: '**Tournament rule:** Aggression (shoving) gains value; calling off loses value. When you shove, you can win immediately via folds. When you call a shove, you must win at showdown AND risk elimination.',
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MODULE 5: Reading the Board
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'module5',
    title: 'Reading the Board',
    tagline: 'Every flop tells a story. Learn to read whose story it is.',
    icon: '🎯',
    weekEquivalent: 'Weeks 5–6',
    badgeId: 'board-reader',
    belt: 'purple',
    color: '#f59e0b',
    treatiseSections: [13, 14, 15],
    lessons: [
      {
        id: 'module5-lesson1',
        title: 'The Postflop Decision Engine',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Postflop', definition: 'Any street after preflop (flop, turn, or river)' },
          { term: 'SPR (Stack-to-Pot Ratio)', definition: 'Effective stacks divided by pot size — determines commitment thresholds' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Before every postflop decision, a strong player runs through a mental checklist. Most beginners skip straight to "I have top pair, I bet." That\'s primitive.',
          },
          {
            type: 'table',
            content: 'The 10-Step Postflop Decision Engine',
            tableData: {
              headers: ['Step', 'Question to Ask'],
              rows: [
                ['1', 'What were the preflop ranges?'],
                ['2', 'Who has range advantage?'],
                ['3', 'Who has nut advantage?'],
                ['4', 'Who has position?'],
                ['5', 'What is the stack-to-pot ratio (SPR)?'],
                ['6', 'What does the board texture do to equity distribution?'],
                ['7', 'Which hands in my range want to bet?'],
                ['8', 'Which bet size expresses my range\'s objective?'],
                ['9', 'Which hands should I check?'],
                ['10', 'How is villain deviating from theory?'],
              ],
            },
          },
          {
            type: 'key-point',
            content: 'This checklist alone puts you ahead of most casual players. Practice running through it quickly until it becomes automatic.',
          },
        ],
      },
      {
        id: 'module5-lesson2',
        title: 'Board Texture: Static vs Dynamic',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'Static board', definition: 'A flop where hand strengths are unlikely to change dramatically on turn/river' },
          { term: 'Dynamic board', definition: 'A flop where many turn/river cards dramatically shift equities' },
          { term: 'Rainbow', definition: 'Three different suits — no flush draws possible' },
          { term: 'Monotone', definition: 'All three cards the same suit — maximum flush draw danger' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Board texture describes how the community cards interact with player ranges. The most important dimension: **static vs dynamic**.',
          },
          {
            type: 'board-demo',
            content: 'Static board: A♣ 7♦ 2♠ — top pair likely stays strong, limited draws',
            cards: [
              { rank: 'A', suit: 'clubs' },
              { rank: '7', suit: 'diamonds' },
              { rank: '2', suit: 'spades' },
            ],
          },
          {
            type: 'text',
            content: '**Static boards** are dry, disconnected, rainbow flops where the nuts are unlikely to change. A72 rainbow: top pair is almost certainly the best hand type throughout, and draws are scarce.',
          },
          {
            type: 'board-demo',
            content: 'Dynamic board: 9♠ 8♠ 7♦ — connected, two-tone, many straights and flush draws possible',
            cards: [
              { rank: '9', suit: 'spades' },
              { rank: '8', suit: 'spades' },
              { rank: '7', suit: 'diamonds' },
            ],
          },
          {
            type: 'text',
            content: '**Dynamic boards** are connected, suited, or coordinated flops where many turn cards dramatically change hand strengths. 9-8-7 with two spades: straights complete, flush draws develop, top pair can be crushed.',
          },
          {
            type: 'table',
            content: 'Board Texture Reference',
            tableData: {
              headers: ['Board Type', 'Examples', 'Preflop Raiser Strategy', 'BB Caller Strategy'],
              rows: [
                ['Dry/Static', 'A72r, K83r, QQ4r', 'Bet small frequently', 'Check often, defend with equity'],
                ['Wet/Dynamic', '987tt, JT8s, 654r', 'Check more, bet larger', 'Lead more, defend aggressively'],
                ['Paired', 'AA6r, KK4r, 772r', 'Small frequent bets (hard to have trips)', 'Bluff-catch selectively'],
                ['High connected', 'KQJr, QJTr', 'Mixed strategies, value-heavy', 'Nutted range matters a lot'],
              ],
            },
          },
        ],
      },
      {
        id: 'module5-lesson3',
        title: 'Range Advantage vs Nut Advantage',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Range advantage', definition: 'Your overall range has more equity (wins more often) than opponent\'s range' },
          { term: 'Nut advantage', definition: 'You hold more combinations of the strongest possible hands on this board' },
          { term: 'Capped range', definition: 'A range with no nutted hands — opponent knows you can\'t have the best hand' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Range advantage and nut advantage are **different concepts** that affect strategy differently. Many beginners conflate them.',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Range Advantage:** UTG raises, Big Blind calls. Flop: A♣ K♦ 4♠.\n\nUTG has more AA, KK, AK, AQ in their range. UTG has RANGE ADVANTAGE — their overall range wins more equity.',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Nut Advantage:** Button raises, Big Blind calls. Flop: 7♠ 6♠ 5♦.\n\nBig Blind has more 9-8, 8-7, 7-6, 6-5, 5-5, 6-6, 7-7 in their range. Big Blind has NUT ADVANTAGE — more of the best hands on this board.',
          },
          {
            type: 'table',
            content: 'Strategic Implications by Advantage Type',
            tableData: {
              headers: ['Situation', 'Typical Strategy'],
              rows: [
                ['Range advantage, weak nut advantage', 'Small, frequent bets — pressure wide portions of opponent\'s range'],
                ['Strong nut advantage, polarized', 'Larger bets / overbets — extract from second-best hands'],
                ['No advantage, out of position', 'More checking — protect range, avoid face-up situations'],
                ['Villain is capped', 'More pressure — they can\'t hold the nuts'],
                ['You are capped', 'More bluff-catching, avoid bloating pots against nutted hands'],
              ],
            },
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MODULE 6: Betting Language
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'module6',
    title: 'Betting Language',
    tagline: 'Every bet is a sentence. Learn the language.',
    icon: '💬',
    weekEquivalent: 'Weeks 5–6',
    badgeId: 'bet-sizer',
    belt: 'brown',
    color: '#d97706',
    treatiseSections: [16, 17, 18, 19],
    lessons: [
      {
        id: 'module6-lesson1',
        title: '7 Reasons to Bet',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'Value bet', definition: 'Bet to get called by worse hands — you want the call' },
          { term: 'Bluff', definition: 'Bet with a weak hand hoping opponent folds a better one' },
          { term: 'Equity denial', definition: 'Forcing opponent to fold hands with drawing equity they would otherwise realize' },
          { term: 'Protection', definition: 'Betting to prevent draws from cheaply seeing future cards' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Old-school poker said: "Bet for value or bluff." Modern poker recognizes 7 reasons to bet, and your hand may bet for multiple reasons simultaneously.',
          },
          {
            type: 'table',
            content: 'The 7 Reasons to Bet',
            tableData: {
              headers: ['Reason', 'Goal', 'Example'],
              rows: [
                ['Value', 'Get called by worse hands', 'Top pair betting for calls from middle pair'],
                ['Equity denial', 'Force draws to fold or pay', 'Bet top pair on wet board to deny flush draws'],
                ['Fold equity', 'Make better hands fold', 'Bluff with missed draw on dry river'],
                ['Pot building', 'Build pot with strong hand advantage', 'C-bet with AA on A-high dry board'],
                ['Polarization', 'Represent a balanced betting range', 'Mix bluffs with value to stay unexploitable'],
                ['Force indifference', 'Put bluff-catchers in a tough spot', 'Bet sizing that makes KQ marginally indifferent'],
                ['Exploit over/underfolding', 'Exploit specific opponent tendencies', 'Bet more vs a player who folds too often to c-bets'],
              ],
            },
          },
          {
            type: 'key-point',
            content: 'Modern poker adds: "Bet because your **range** benefits from putting money in at this node" — not just because your specific hand is strong.',
          },
        ],
      },
      {
        id: 'module6-lesson2',
        title: 'Bet Sizing as Language',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Overbet', definition: 'A bet larger than the pot size — maximizes pressure, requires strong range advantage' },
          { term: 'Range bet', definition: 'A small bet made with your entire range — suited to boards where you have strong range advantage' },
          { term: 'Pot-sized bet', definition: '100% of the pot — strong polarization signal' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Bet size is a **language** that communicates your range\'s distribution. Different sizes mean different things about the hands you can have.',
          },
          {
            type: 'table',
            content: 'Bet Sizing Guide',
            tableData: {
              headers: ['Bet Size', 'Strategic Signal', 'When to Use'],
              rows: [
                ['25–33% pot', 'Range pressure, thin value, equity denial', 'Dry boards where you have range advantage; many weak hands need to fold or pay'],
                ['50–75% pot', 'Selective value and bluffing', 'Semi-polarized situations; both value and draws'],
                ['100% pot', 'Strong polarization', 'River or boards where you have nut advantage; denying drawing equity'],
                ['125–200% pot (overbet)', 'Maximum nut advantage, capped opponent', 'River spots where villain is capped and you have many nutted hands'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Small bet example (A♣ 7♦ 2♠ — dry):** You raised preflop, BB calls. This board heavily favors your range. A 25–33% pot bet puts pressure on ALL of BB\'s weak hands cheaply.\n\n**Large bet example (river with flush complete):** You hold the nut flush with a capped opponent. A pot or overbet extracts maximum from second-best hands.',
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: 'Overbets are NOT "I feel strong" bets. They are **range-geometry bets** — only valid when your range has many more nutted hands than villain\'s range and villain\'s range is capped.',
          },
        ],
      },
      {
        id: 'module6-lesson3',
        title: 'Continuation Betting',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'C-bet (continuation bet)', definition: 'A bet on the flop (or later street) by the preflop aggressor' },
          { term: 'C-bet frequency', definition: 'How often you bet as the preflop raiser on a given board texture' },
          { term: 'Delayed c-bet', definition: 'Checking the flop as aggressor, then betting the turn' },
        ],
        sections: [
          {
            type: 'text',
            content: 'A **continuation bet** (c-bet) is a bet by the preflop raiser on a later street, "continuing" their preflop aggression. Modern poker rejects automatic c-betting — you must think about each spot.',
          },
          {
            type: 'table',
            content: '6 Questions Before C-Betting',
            tableData: {
              headers: ['Question', 'If Yes →', 'If No →'],
              rows: [
                ['Does my range have advantage?', 'Lean toward betting', 'Check more often'],
                ['Does this board favor my opponent?', 'Check more', 'Bet more freely'],
                ['Am I in position?', 'Wider c-bet range', 'Tighter c-bet, protect checking range'],
                ['Is the board static or dynamic?', 'Bet small if static', 'Bet larger or check if dynamic'],
                ['What size does my range prefer?', 'Use appropriate size', 'Reconsider whether to bet'],
                ['What does THIS hand accomplish by betting?', 'Proceed with bet', 'Consider checking'],
              ],
            },
          },
          {
            type: 'table',
            content: 'C-Bet Board Guide',
            tableData: {
              headers: ['Board Type', 'C-Bet Approach', 'Example'],
              rows: [
                ['A-high dry rainbow', 'Frequent, small (25–33%)', 'A♦ 8♣ 3♠'],
                ['K-high dry rainbow', 'Frequent, small', 'K♠ 8♥ 3♦'],
                ['Paired dry boards', 'Frequent, small', 'Q♠ Q♣ 4♦'],
                ['Low connected two-tone', 'Check more, larger when you bet', '8♠ 7♠ 6♦'],
                ['Coordinated boards favoring BB', 'Check frequently', '5♣ 6♦ 7♣'],
              ],
            },
          },
        ],
      },
      {
        id: 'module6-lesson4',
        title: 'Donk Betting',
        estimatedMinutes: 5,
        xpReward: 10,
        keyTerms: [
          { term: 'Donk bet', definition: 'When the preflop CALLER leads into the preflop AGGRESSOR — opposite of standard c-bet dynamics' },
        ],
        sections: [
          {
            type: 'text',
            content: 'A **donk bet** is when the preflop caller bets first into the preflop aggressor. Old-school advice said "never donk." Modern theory says: rarely, but sometimes valid.',
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: 'Big Blind may donk more on boards that heavily favor BB\'s range: low connected boards (5♣ 6♦ 7♣), turn cards completing BB\'s straights/two-pair, or spots where the aggressor checked back on the flop and became "capped" (revealing a weak range).',
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: '**Beginner rule: avoid donk betting until you understand range shifts deeply.** Most beginner donk bets are information leaks — they give away hand strength without strategic purpose.',
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MODULE 7: The Full Game
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'module7',
    title: 'The Full Game',
    tagline: 'Turn, river, bluffing, and the art of equity realization.',
    icon: '🌊',
    weekEquivalent: 'Weeks 7–8',
    badgeId: 'river-shark',
    belt: 'brown',
    color: '#0ea5e9',
    treatiseSections: [20, 21, 22, 23, 24, 25],
    lessons: [
      {
        id: 'module7-lesson1',
        title: 'Turn Play',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Double barrel', definition: 'Betting both flop and turn as the preflop aggressor' },
          { term: 'Barrel card', definition: 'A turn card that improves your hand\'s value or perceived range' },
          { term: 'Probe bet', definition: 'A bet by the caller when the preflop aggressor checked back the flop' },
        ],
        sections: [
          {
            type: 'text',
            content: 'The turn is where poker gets expensive. The pot is larger, ranges are narrower, and every decision carries more weight.',
          },
          {
            type: 'table',
            content: 'Turn Decision Framework',
            tableData: {
              headers: ['Question', 'Impact on Decision'],
              rows: [
                ['Did the turn card favor my range?', 'Yes → barrel; No → slow down or check'],
                ['Did it complete draws?', 'Yes → reconsider betting (villain may have improved)'],
                ['Does it give me new equity?', 'Yes (picked up draw) → good barrel'],
                ['Does it block villain\'s continues?', 'Yes → barrel pressure increases'],
                ['Is villain\'s range capped from flop action?', 'Yes → more pressure possible'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Good barrel card:** You c-bet A♠ 5♠ on K♠ 8♦ 3♣. Turn: 2♠. You now have a nut-flush draw + wheel draw. Great barrel — adds real equity AND your range looks strong.\n\n**Bad barrel card:** You c-bet AK on 9♠ 8♠ 4♦. Turn: 7♠. This completes the spade flush and many straights for villain\'s suited/connected range. Slow down.',
          },
        ],
      },
      {
        id: 'module7-lesson2',
        title: 'River Polarization',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'Value hand', definition: 'A hand that profits by being called — it beats most of villain\'s calling range' },
          { term: 'Bluff', definition: 'A hand that only profits when villain folds — it loses at showdown to most calling hands' },
          { term: 'Bluff-catcher', definition: 'A hand that beats bluffs but loses to value bets — the marginal decision hand' },
          { term: 'Give-up', definition: 'A hand with so little equity vs villain\'s range that it checks and folds to any bet' },
        ],
        sections: [
          {
            type: 'text',
            content: 'The river is the purest game-theory street — no future cards, no drawing equity. Every hand falls into one of four categories.',
          },
          {
            type: 'table',
            content: 'The 4 River Hand Categories',
            tableData: {
              headers: ['Category', 'Action', 'Example (board: A♣ K♦ 8♠ 4♥ 2♣)'],
              rows: [
                ['Value', 'Bet for calls — wants to be called', 'AK (two pair), KK (set), A8 (two pair)'],
                ['Bluff', 'Bet hoping villain folds — can\'t win at showdown', 'Q♠J♠ (missed straight), 7♠6♠ (missed flush)'],
                ['Bluff-catcher', 'Check/call — beats bluffs, loses to value', 'KQ (second pair), A4 (two pair but weak)'],
                ['Give-up', 'Check/fold — too weak to call or bluff profitably', '5♠6♦ (total air, no blockers)'],
              ],
            },
          },
          {
            type: 'formula',
            formulaLabel: 'River Bluff Ratio (at equilibrium)',
            formula: 'Bluffs ÷ Value = Bet ÷ (Pot + Bet)',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Pot-sized river bet equilibrium:** Bluffs/Value = 1:2. So your river betting range should be ⅔ value hands, ⅓ bluffs. If you bet pot-sized river with only value hands, villain can correctly fold all bluff-catchers.',
          },
        ],
      },
      {
        id: 'module7-lesson3',
        title: 'Bluff Selection',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Bluff blocker', definition: 'A card in your hand that reduces villain\'s strongest calling hands' },
          { term: 'Anti-blocker', definition: 'Your hand doesn\'t block villain\'s weak folding hands — leaving them available to fold' },
          { term: 'Credible value line', definition: 'Your betting pattern makes sense for hands villain would need to worry about' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Not all bluffs are created equal. A good river bluff has multiple favorable properties.',
          },
          {
            type: 'table',
            content: 'The 5-Item Bluff Selection Checklist',
            tableData: {
              headers: ['Property', 'Requirement', 'Why It Matters'],
              rows: [
                ['Blocks calls', 'Your cards overlap with villain\'s nutted calling hands', 'Reduces combos that beat you when called'],
                ['Unblocks folds', 'Your cards don\'t overlap with villain\'s folding hands', 'Leaves more hands available to fold'],
                ['Poor showdown value', 'Your hand loses to most of villain\'s range at showdown', 'If it had showdown value, checking is often better'],
                ['Credible value line', 'Your betting sequence represents hands villain fears', 'Villain must consider you might have value'],
                ['Fits all streets', 'Your actions make sense across flop/turn/river', 'Disconnected lines are transparent bluffs'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**Board: K♠ Q♠ 7♦ 4♣ 2♠ (three spades)**\n\n**Good bluff:** You hold A♠ J♦ — the A♠ blocks nut flush (A♠ x♠). Villain has fewer nutted calling hands. Your line credibly represents having flopped the flush draw and made it.\n\n**Bad bluff:** You hold J♠ T♠ — you actually have a strong flush and should value-bet! Or you hold A♦J♦ — no spade blocker means villain\'s flush combos are unblocked.',
          },
        ],
      },
      {
        id: 'module7-lesson4',
        title: 'Equity Realization',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'Equity realization', definition: 'The fraction of theoretical equity that converts to actual EV given position, playability, and future action' },
          { term: 'Implied odds', definition: 'Future money you can win when you hit a strong hand' },
          { term: 'Reverse implied odds', definition: 'Future money you can lose when you make second-best hands' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Raw equity (win probability if all cards are dealt out) is NOT the same as actual EV. A hand can have 40% raw equity but realize far less.',
          },
          {
            type: 'table',
            content: 'Equity Realization Factors',
            tableData: {
              headers: ['Factor', 'Improves Realization', 'Hurts Realization'],
              rows: [
                ['Position', 'In position (IP)', 'Out of position (OOP)'],
                ['Hand type', 'Nut potential, clear draws', 'Dominated, no nut draws'],
                ['Playability', 'Easy decisions postflop', 'Reverse implied odds, awkward spots'],
                ['Suit strength', 'Suited hands', 'Offsuit hands'],
                ['Connectivity', 'Connected hands', 'Disconnected hands'],
                ['Blockers', 'Block opponent nuts', 'Block opponent folds'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**A2o vs 98s at 100BB:** A2o has decent raw equity (any ace-high showdown wins), but realizes equity poorly — out of position, dominated by AK/AQ/AJ, and makes weak two-pair often beaten by better two-pair. 98s has less raw equity but realizes better: makes straights, flushes, can bluff effectively, playable in many spots.',
          },
        ],
      },
      {
        id: 'module7-lesson5',
        title: 'Multiway Pots',
        estimatedMinutes: 5,
        xpReward: 10,
        keyTerms: [
          { term: 'Multiway', definition: 'Three or more players in the pot — dramatically changes strategy' },
          { term: 'Range collision', definition: 'When multiple players can have strong hands in the same range area' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Multiway pots are NOT just heads-up poker with more players. The strategic dynamics change fundamentally.',
          },
          {
            type: 'table',
            content: 'How Multiway Changes Everything',
            tableData: {
              headers: ['Concept', 'Heads-Up', 'Multiway (3+ players)'],
              rows: [
                ['Bluffing frequency', 'Can bluff fairly often vs one opponent', 'Dramatically reduced — two people to bluff out'],
                ['Value threshold', 'Top pair usually strong enough to bet', 'Often need two pair or better to bet confidently'],
                ['Equity denial', 'Worth pursuing with one opponent', 'Harder to deny equity to two opponents simultaneously'],
                ['Nut advantage', 'Matters, but ranges can be balanced', 'Matters enormously — only very strong hands bet comfortably'],
                ['C-betting', 'Frequent on many boards', 'Much more selective — avoid c-bet air'],
              ],
            },
          },
          {
            type: 'key-point',
            content: '**Multiway rule:** Play more straightforwardly. Bet value-heavy, bluff less, avoid marginal stack-offs, respect raises. Prefer nut draws (flush draw with an Ace) over weak draws (gutshot with no backup).',
          },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MODULE 8: Exploit Mode
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'module8',
    title: 'Exploit Mode',
    tagline: 'GTO protects you. Exploitation is where the money lives.',
    icon: '⚔️',
    weekEquivalent: 'Weeks 11–12',
    badgeId: 'exploit-master',
    belt: 'black',
    color: '#ef4444',
    treatiseSections: [26, 27, 28, 29, 30, 31, 32, 33],
    lessons: [
      {
        id: 'module8-lesson1',
        title: 'GTO vs Exploitative Play',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'GTO (Game Theory Optimal)', definition: 'An unexploitable strategy — no opponent can increase EV by deviating against it' },
          { term: 'Exploitative play', definition: 'Deviating from GTO to profit specifically from opponent mistakes' },
          { term: 'Nash equilibrium', definition: 'A strategy profile where neither player can improve by unilaterally changing strategy' },
        ],
        sections: [
          {
            type: 'text',
            content: 'GTO and exploitative play serve different purposes. Understanding their relationship is key to becoming a complete player.',
          },
          {
            type: 'table',
            content: 'GTO vs Exploit: The Core Distinction',
            tableData: {
              headers: ['', 'GTO', 'Exploitative'],
              rows: [
                ['Purpose', 'Defense — cannot be exploited', 'Offense — maximize profit from leaks'],
                ['Against balanced opponent', 'Maximally effective', 'No better than GTO'],
                ['Against leaky opponent', 'Leaves money on table', 'Maximally profitable'],
                ['Risk', 'Can be exploited in return', 'Requires correct leak identification'],
                ['Requires', 'Understanding equilibrium distributions', 'Reading opponents accurately'],
              ],
            },
          },
          {
            type: 'callout',
            calloutType: 'warning',
            content: '**Exploit only when you can NAME the leak.** Bad exploit: "I feel like he\'s weak." Good exploit: "He folds 70% to flop c-bets in single-raised pots over 500 hands, so I increase c-bet frequency on range-advantage boards."',
          },
          {
            type: 'key-point',
            content: 'GTO is your **default**. Exploitative deviation is a **measured adjustment** based on observed, named, quantified opponent behavior.',
          },
        ],
      },
      {
        id: 'module8-lesson2',
        title: 'The Exploitation Matrix',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'Overfolder', definition: 'A player who folds too often — exploit by bluffing more frequently' },
          { term: 'Calling station', definition: 'A player who calls too much — exploit by value betting thinner and bluffing less' },
          { term: 'Population tendency', definition: 'A mistake made by most players at a given stakes level' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Every opponent leak has a corresponding exploit. Learning to identify leaks and apply the right counter is the core skill of winning poker.',
          },
          {
            type: 'table',
            content: 'The Exploitation Matrix',
            tableData: {
              headers: ['Opponent Leak', 'Counter Exploit'],
              rows: [
                ['Folds too much to c-bets', 'C-bet more frequently, add bluffs to c-betting range'],
                ['Calls too much (calling station)', 'Value bet thinner, bluff much less or never'],
                ['3-bets too little preflop', 'Open wider — they won\'t punish you'],
                ['3-bets too much preflop', '4-bet bluff more, trap with nutted hands'],
                ['Never bluffs the river', 'Overfold bluff-catchers — their bets are all value'],
                ['Overbluffs the river', 'Bluff-catch wider with marginal hands'],
                ['Passive postflop', 'Bet for value relentlessly, don\'t slowplay'],
                ['Aggressive maniac', 'Induce with traps, call down with strong hands'],
                ['Limp-calls too much', 'Iso-raise with value-heavy range, deny them cheap entries'],
                ['Overfolds the big blind', 'Steal wide from BTN/CO/SB'],
                ['Defends BB too wide', 'Value bet postflop more — they miss the flop often'],
                ['Under-defends vs overbets', 'Overbet bluff more on rivers where they fold too much'],
              ],
            },
          },
        ],
      },
      {
        id: 'module8-lesson3',
        title: 'Population Tendencies',
        estimatedMinutes: 6,
        xpReward: 10,
        keyTerms: [
          { term: 'Population exploit', definition: 'An adjustment valid against most players at a given stakes level, without reading any individual' },
          { term: 'Fit-or-fold', definition: 'A player who bets when they connect with the board and folds when they miss — very exploitable' },
          { term: 'Nit', definition: 'An overly tight-passive player who rarely bluffs and plays only nutted hands' },
        ],
        sections: [
          {
            type: 'text',
            content: 'At lower stakes, entire player populations share common leaks. You can exploit these tendencies without needing hand-specific reads.',
          },
          {
            type: 'table',
            content: 'Common Low-Stakes Leaks and Adjustments',
            tableData: {
              headers: ['Common Leak', 'How to Exploit'],
              rows: [
                ['Under-3-betting preflop', 'Open wider — less re-raising pressure'],
                ['Calling too wide preflop', 'Play straightforward postflop, don\'t try to bluff them off equity'],
                ['Underbluffing rivers', 'Fold more to river bets — their range is value-heavy'],
                ['Overcalling small and medium bets', 'Value bet thinner and more frequently'],
                ['Overfolding to large river bets', 'Overbet bluff more on rivers'],
                ['Fit-or-fold on flop', 'C-bet wide on boards where they can\'t have connected'],
                ['Not protecting checking ranges', 'Float and attack — their checks are often weak'],
                ['Bet sizing reveals hand strength', 'Read their sizing — small bet = weak, large bet = strong (usually)'],
              ],
            },
          },
          {
            type: 'key-point',
            content: '**The money at low stakes is not in beautiful GTO mixing.** It\'s in recognizing obvious mistakes repeated thousands of times.',
          },
        ],
      },
      {
        id: 'module8-lesson4',
        title: 'Mental Game & Study',
        estimatedMinutes: 7,
        xpReward: 10,
        keyTerms: [
          { term: 'Variance', definition: 'Natural statistical swings — you can play correctly and lose for extended stretches' },
          { term: 'EV tracking', definition: 'Tracking your expected value separate from actual results — the true measure of performance' },
          { term: 'Solver workflow', definition: 'A systematic process for studying specific spots using GTO solvers' },
        ],
        sections: [
          {
            type: 'text',
            content: 'Poker has enormous variance. The professional mindset is: **your job is not to win today — it\'s to make +EV decisions repeatedly under uncertainty.**',
          },
          {
            type: 'table',
            content: 'Bankroll & Mental Game Principles',
            tableData: {
              headers: ['Principle', 'Why It Matters'],
              rows: [
                ['Never play with needed money', 'Scared money makes scared decisions'],
                ['Track EV, not just results', 'Good decisions + bad variance still shows in EV'],
                ['Review hands — both winning AND losing', 'Winning hands have leaks too; you need to find them'],
                ['Don\'t move up from one heater', 'A 300BB upswing is within normal variance'],
                ['Don\'t chase losses', 'Tilt compounds mistakes — it\'s a spiral'],
                ['Separate bad outcome from bad decision', 'You can lose with AA vs 72o and that\'s fine'],
              ],
            },
          },
          {
            type: 'table',
            content: '11-Step Solver Study Workflow',
            tableData: {
              headers: ['Step', 'Action'],
              rows: [
                ['1', 'Pick ONE spot (e.g., BTN raise vs BB call, 100BB)'],
                ['2', 'Define preflop ranges (simplified is fine)'],
                ['3', 'Set stack depth and pot size'],
                ['4', 'Define bet sizes for the tree'],
                ['5', 'Run or inspect the solution'],
                ['6', 'Study aggregate strategy frequencies'],
                ['7', 'Ask WHY the solver prefers certain actions'],
                ['8', 'Simplify into human rules: "On dry ace-high, bet small frequently"'],
                ['9', 'Compare your actual hands to the solution'],
                ['10', 'Identify: was my deviation theoretical error or valid exploit?'],
                ['11', 'Extract invariants — general rules that hold across many spots'],
              ],
            },
          },
          {
            type: 'key-point',
            content: 'Don\'t memorize solver frequencies. Extract **invariants** — general truths that hold across many spots. "Ace-high dry boards favor the preflop raiser" is an invariant. "Bet 33% on A72r with exactly QJo" is not.',
          },
        ],
      },
      {
        id: 'module8-lesson5',
        title: 'The Compressed Doctrine',
        estimatedMinutes: 8,
        xpReward: 10,
        keyTerms: [
          { term: 'Compressed doctrine', definition: 'The most essential MPT principles distilled into a single reference page' },
        ],
        sections: [
          {
            type: 'text',
            content: 'This is the one-page summary of everything you\'ve learned. The transformation from beginner to dangerous player.',
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**PREFLOP**\n• Play tighter early position, wider late position\n• Button is money — play it aggressively\n• Big Blind defends wide but not absolute trash\n• 3-bet with coherent linear or polarized logic\n• Stack depth changes everything\n• In tournaments, calling off is more dangerous than shoving',
          },
          {
            type: 'callout',
            calloutType: 'concept',
            content: '**FLOP**\n• Bet range advantage boards (dry/static with raiser advantage)\n• Check more on boards that smash the defender\n• Small bets pressure wide, weak ranges cheaply\n• Large bets need polarization justification\n• Multiway = bluff less, value more',
          },
          {
            type: 'callout',
            calloutType: 'example',
            content: '**TURN**\n• Barrel cards that favor your range or add equity to your hand\n• Slow down on cards that improve villain\'s calling range\n• Probe bet when villain\'s check-back capped their range\n• Protection matters more as the pot grows',
          },
          {
            type: 'callout',
            calloutType: 'tip',
            content: '**RIVER**\n• Value or bluff. Medium hands mostly check.\n• Use blockers to select bluffs — block calls, unblock folds\n• Never bluff calling stations\n• Never hero-call underbluffing nits\n• MDF protects against balanced opponents, not honest ones',
          },
          {
            type: 'key-point',
            content: '**The hierarchy:** Rules → Math → Ranges → Game Theory → Solver Patterns → Human Exploits. The weak player asks: "What should I do with my hand?" The strong player asks: "What does my range want to do against villain\'s range on this texture, and how does their behavior let me deviate?"',
          },
        ],
      },
    ],
  },
];

export function getModule(id: string): Module | undefined {
  return MODULES.find(m => m.id === id);
}

export function getLesson(moduleId: string, lessonId: string) {
  return getModule(moduleId)?.lessons.find(l => l.id === lessonId);
}

export function getModuleLessonIds(moduleId: string): string[] {
  return getModule(moduleId)?.lessons.map(l => l.id) ?? [];
}

export function isModuleUnlocked(moduleId: string, completedModules: string[]): boolean {
  const index = MODULES.findIndex(m => m.id === moduleId);
  if (index === 0) return true;
  const prevModule = MODULES[index - 1];
  return completedModules.includes(prevModule.id);
}
