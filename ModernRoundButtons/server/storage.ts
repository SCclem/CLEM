import type { Subject, Chapter } from "@shared/schema";

export interface IStorage {
  getSubjects(): Promise<Subject[]>;
  getSubject(id: string): Promise<Subject | undefined>;
  getChapter(subjectId: string, chapterId: string): Promise<Chapter | undefined>;
}

const createChapter = (
  id: string,
  subjectId: string,
  title: string,
  introduction: string,
  course: { title: string; content: string; examples?: string[] }[],
  summary: string[],
  exercises: { id: string; question: string; type: 'text' | 'multiple-choice'; options?: string[]; answer: string; explanation: string }[],
  externalLinks: { title: string; url: string; description: string }[],
  videoUrl: string
): Chapter => ({
  id,
  subjectId,
  title,
  introduction,
  course,
  summary,
  exercises,
  externalLinks,
  videoUrl,
});

const subjectsData: Subject[] = [
  {
    id: "francais",
    name: "Français",
    icon: "book-open",
    description: "Langue française, littérature, grammaire, conjugaison et expression écrite pour le brevet.",
    color: "#0055A4",
    chapters: [
      createChapter(
        "fr-1",
        "francais",
        "La poésie lyrique",
        "La poésie lyrique est une forme d'expression poétique où l'auteur exprime ses sentiments personnels, ses émotions et ses états d'âme. Elle tire son nom de la lyre, instrument de musique qui accompagnait les poèmes dans l'Antiquité grecque.",
        [
          {
            title: "Définition et caractéristiques",
            content: "La poésie lyrique se caractérise par l'expression du \"je\" poétique. Le poète partage ses émotions intimes : l'amour, la mélancolie, la joie, la douleur ou la contemplation de la nature. Cette poésie utilise souvent un vocabulaire des sentiments et des sensations.\n\nLes thèmes principaux sont : l'amour (heureux ou malheureux), la fuite du temps, la mort, la nature comme miroir des émotions, la nostalgie et le souvenir.",
            examples: [
              "\"Demain, dès l'aube, à l'heure où blanchit la campagne, je partirai.\" - Victor Hugo exprime sa douleur après la mort de sa fille.",
              "\"Je vis, je meurs ; je me brûle et me noie\" - Louise Labé décrit les contradictions de l'amour."
            ]
          },
          {
            title: "Les procédés poétiques",
            content: "Les poètes lyriques utilisent de nombreux procédés :\n\n• Les figures de style : métaphores, comparaisons, personnifications pour exprimer les émotions\n• Le rythme et la musicalité : alexandrins, rimes, allitérations, assonances\n• Le champ lexical des sentiments : cœur, âme, larmes, soupirs\n• Les interjections et exclamations : \"Ô\", \"Hélas\", \"Ah\"\n• L'utilisation du \"je\" et des pronoms personnels",
            examples: [
              "L'allitération en [l] dans \"Elle a vécu, Myrto, la jeune Tarentine\" évoque la douceur et la fluidité."
            ]
          },
          {
            title: "Les grands poètes lyriques",
            content: "Au fil des siècles, de nombreux poètes ont excellé dans ce genre :\n\n• Moyen Âge : Les troubadours (poésie courtoise)\n• Renaissance : Ronsard, Du Bellay (La Pléiade)\n• XIXe siècle : Lamartine, Hugo, Musset (Romantisme)\n• Baudelaire et Verlaine (modernité poétique)\n• XXe siècle : Apollinaire, Éluard, Aragon"
          }
        ],
        [
          "La poésie lyrique exprime les sentiments personnels du poète (amour, mélancolie, joie)",
          "Elle utilise le \"je\" poétique et un vocabulaire des émotions",
          "Les figures de style (métaphore, comparaison) renforcent l'expression des sentiments",
          "Le rythme et la musicalité sont essentiels (vers, rimes, sonorités)",
          "Les grands thèmes sont l'amour, le temps qui passe, la nature et la mort"
        ],
        [
          {
            id: "fr1-ex1",
            question: "Quel est le thème principal de la poésie lyrique ?",
            type: "multiple-choice",
            options: ["L'héroïsme et les batailles", "L'expression des sentiments personnels", "La description des paysages", "La critique de la société"],
            answer: "L'expression des sentiments personnels",
            explanation: "La poésie lyrique se caractérise avant tout par l'expression du 'je' poétique et des sentiments intimes de l'auteur : amour, mélancolie, joie, douleur."
          },
          {
            id: "fr1-ex2",
            question: "Identifiez la figure de style dans : \"Mon cœur est un oiseau blessé\"",
            type: "multiple-choice",
            options: ["Une comparaison", "Une métaphore", "Une personnification", "Une hyperbole"],
            answer: "Une métaphore",
            explanation: "C'est une métaphore car le cœur est directement assimilé à un oiseau blessé, sans mot de comparaison (comme, tel que)."
          },
          {
            id: "fr1-ex3",
            question: "D'où vient le mot \"lyrique\" ?",
            type: "text",
            answer: "De la lyre",
            explanation: "Le mot lyrique vient de la lyre, instrument de musique à cordes qui accompagnait les poèmes chantés dans l'Antiquité grecque."
          }
        ],
        [
          { title: "Lumni - La poésie lyrique", url: "https://www.lumni.fr/dossier/la-poesie-lyrique", description: "Cours complet sur la poésie lyrique avec exemples et exercices interactifs." },
          { title: "BnF - Anthologie de poésie", url: "https://gallica.bnf.fr/html/und/litteratures/la-poesie-francaise", description: "Collection de poèmes français numérisés, du Moyen Âge à nos jours." }
        ],
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      ),
      createChapter(
        "fr-2",
        "francais",
        "Le récit autobiographique",
        "L'autobiographie est un genre littéraire dans lequel l'auteur raconte sa propre vie. Le terme vient du grec : autos (soi-même), bios (vie) et graphein (écrire). C'est un pacte avec le lecteur où l'auteur s'engage à dire la vérité sur lui-même.",
        [
          {
            title: "Définition et pacte autobiographique",
            content: "L'autobiographie repose sur le \"pacte autobiographique\" défini par Philippe Lejeune : l'auteur, le narrateur et le personnage principal sont une seule et même personne. L'auteur s'engage à raconter la vérité sur sa vie.\n\nLes indices du pacte : le titre mentionne souvent \"ma vie\", \"mémoires\", \"souvenirs\", le nom du personnage est celui de l'auteur, l'emploi de la première personne du singulier.",
            examples: [
              "\"Les Confessions\" de Jean-Jacques Rousseau commence par : \"Je forme une entreprise qui n'eut jamais d'exemple...\"",
              "\"Si le grain ne meurt\" d'André Gide"
            ]
          },
          {
            title: "Les formes autobiographiques",
            content: "Il existe plusieurs formes d'écriture de soi :\n\n• L'autobiographie : récit rétrospectif de sa propre vie\n• Les mémoires : l'auteur témoigne de l'Histoire qu'il a vécue\n• Le journal intime : écriture au jour le jour, sans recul\n• L'autoportrait : description de soi à un moment donné\n• L'autofiction : mélange de réalité et de fiction",
            examples: [
              "\"Journal\" d'Anne Frank (journal intime)",
              "\"Enfance\" de Nathalie Sarraute (autobiographie dialoguée)"
            ]
          },
          {
            title: "Les enjeux de l'autobiographie",
            content: "Écrire sur soi répond à plusieurs motivations :\n\n• Se connaître soi-même : l'écriture permet une introspection\n• Témoigner : transmettre une expérience aux autres\n• Se justifier : expliquer ses choix et actions\n• Laisser une trace : lutter contre l'oubli et la mort\n• Revivre le passé : faire revivre des souvenirs heureux ou douloureux"
          }
        ],
        [
          "L'autobiographie = auteur = narrateur = personnage principal",
          "Le pacte autobiographique engage l'auteur à dire la vérité",
          "Différentes formes : autobiographie, mémoires, journal, autofiction",
          "L'écriture de soi permet l'introspection et le témoignage",
          "Le \"je\" rétrospectif porte un regard sur le \"je\" du passé"
        ],
        [
          {
            id: "fr2-ex1",
            question: "Qu'est-ce que le pacte autobiographique ?",
            type: "text",
            answer: "L'engagement de l'auteur à raconter la vérité sur sa vie, où auteur, narrateur et personnage sont une même personne.",
            explanation: "Le pacte autobiographique, défini par Philippe Lejeune, est un contrat implicite entre l'auteur et le lecteur : l'auteur s'engage à dire la vérité sur sa vie."
          },
          {
            id: "fr2-ex2",
            question: "Quelle forme autobiographique consiste à écrire au jour le jour ?",
            type: "multiple-choice",
            options: ["L'autobiographie", "Les mémoires", "Le journal intime", "L'autofiction"],
            answer: "Le journal intime",
            explanation: "Le journal intime est une écriture quotidienne, au fil des jours, sans le recul temporel qui caractérise l'autobiographie."
          }
        ],
        [
          { title: "Lumni - L'autobiographie", url: "https://www.lumni.fr/dossier/l-autobiographie", description: "Tout savoir sur le genre autobiographique et ses formes." },
          { title: "France Culture - Écrire sa vie", url: "https://www.franceculture.fr/litterature", description: "Émissions et podcasts sur les écritures du moi." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "fr-3",
        "francais",
        "Argumentation et discours",
        "Argumenter, c'est défendre une opinion en utilisant des arguments et des exemples pour convaincre ou persuader son interlocuteur. La maîtrise de l'argumentation est essentielle pour le brevet et dans la vie quotidienne.",
        [
          {
            title: "Convaincre et persuader",
            content: "Il existe deux stratégies argumentatives :\n\n• Convaincre fait appel à la raison : on utilise des arguments logiques, des faits, des statistiques. Le but est d'amener l'autre à adhérer par la réflexion.\n\n• Persuader fait appel aux émotions : on touche la sensibilité, on utilise des images fortes, des témoignages. Le but est de faire ressentir pour faire adhérer.",
            examples: [
              "Convaincre : \"Les études prouvent que le sport réduit le stress de 40%\"",
              "Persuader : \"Imaginez la joie de vos enfants quand ils pourront jouer dans un parc rénové\""
            ]
          },
          {
            title: "La structure de l'argumentation",
            content: "Un texte argumentatif se compose de :\n\n• La thèse : l'opinion défendue\n• Les arguments : les raisons qui soutiennent la thèse\n• Les exemples : les illustrations concrètes des arguments\n• Les connecteurs logiques : ils organisent le raisonnement (donc, car, en effet, cependant, or...)\n• La conclusion : reformulation de la thèse"
          },
          {
            title: "Les types d'arguments",
            content: "Différents types d'arguments peuvent être utilisés :\n\n• Argument d'autorité : citer un expert\n• Argument d'expérience : s'appuyer sur des faits vécus\n• Argument logique : raisonnement par cause/conséquence\n• Argument par l'exemple : cas concret\n• Argument par analogie : comparaison avec une situation similaire"
          }
        ],
        [
          "Convaincre = raison / Persuader = émotions",
          "Structure : thèse + arguments + exemples + conclusion",
          "Les connecteurs logiques organisent l'argumentation",
          "Types d'arguments : autorité, expérience, logique, exemple",
          "L'argumentation est présente partout : publicité, discours, débats"
        ],
        [
          {
            id: "fr3-ex1",
            question: "Quelle différence y a-t-il entre convaincre et persuader ?",
            type: "text",
            answer: "Convaincre fait appel à la raison, persuader fait appel aux émotions.",
            explanation: "Convaincre utilise des arguments logiques pour s'adresser à l'intelligence, tandis que persuader touche la sensibilité et les émotions."
          },
          {
            id: "fr3-ex2",
            question: "\"Comme le dit le célèbre scientifique...\" est un argument :",
            type: "multiple-choice",
            options: ["d'expérience", "d'autorité", "par analogie", "logique"],
            answer: "d'autorité",
            explanation: "L'argument d'autorité consiste à citer une personne reconnue comme expert ou référence dans un domaine pour appuyer sa thèse."
          }
        ],
        [
          { title: "Éduscol - L'argumentation", url: "https://eduscol.education.fr/", description: "Ressources officielles sur l'argumentation au collège." },
          { title: "Khan Academy - Argumentation", url: "https://fr.khanacademy.org/", description: "Exercices et leçons sur l'art d'argumenter." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "fr-4",
        "francais",
        "La conjugaison : temps composés",
        "Les temps composés sont formés de l'auxiliaire (avoir ou être) et du participe passé du verbe. Ils expriment une action antérieure à celle exprimée par le temps simple correspondant.",
        [
          {
            title: "Formation des temps composés",
            content: "Chaque temps simple a son temps composé correspondant :\n\n• Présent → Passé composé (j'ai mangé, je suis parti)\n• Imparfait → Plus-que-parfait (j'avais mangé, j'étais parti)\n• Futur simple → Futur antérieur (j'aurai mangé, je serai parti)\n• Passé simple → Passé antérieur (j'eus mangé, je fus parti)\n• Conditionnel présent → Conditionnel passé (j'aurais mangé, je serais parti)\n• Subjonctif présent → Subjonctif passé (que j'aie mangé, que je sois parti)",
            examples: [
              "Quand j'aurai fini mes devoirs (futur antérieur), je sortirai (futur simple)."
            ]
          },
          {
            title: "Choix de l'auxiliaire",
            content: "Le choix entre avoir et être dépend du verbe :\n\n• Auxiliaire AVOIR : la majorité des verbes (j'ai mangé, tu as lu)\n\n• Auxiliaire ÊTRE : \n  - Les verbes pronominaux (je me suis levé)\n  - Les verbes de mouvement/changement d'état : aller, venir, partir, arriver, entrer, sortir, monter, descendre, naître, mourir, devenir, rester, tomber, retourner\n\nAstuce mnémotechnique : DR MRS VANDERTRAMP (mourir, rester, sortir, venir, aller, naître, descendre, entrer, rentrer, tomber, retourner, arriver, monter, partir)"
          },
          {
            title: "L'accord du participe passé",
            content: "L'accord du participe passé suit des règles précises :\n\n• Avec ÊTRE : accord avec le sujet\n  \"Elle est partie\" / \"Ils sont venus\"\n\n• Avec AVOIR : accord avec le COD s'il est placé avant\n  \"Les fleurs que j'ai cueillies\" (COD \"que\" = les fleurs, placé avant)\n  \"J'ai cueilli des fleurs\" (COD après, pas d'accord)"
          }
        ],
        [
          "Temps composé = auxiliaire (avoir/être) + participe passé",
          "L'auxiliaire être s'utilise avec les verbes pronominaux et certains verbes de mouvement",
          "Avec être : accord du participe passé avec le sujet",
          "Avec avoir : accord avec le COD s'il est placé avant le verbe",
          "Chaque temps simple a son temps composé correspondant (antériorité)"
        ],
        [
          {
            id: "fr4-ex1",
            question: "Quel est le temps composé correspondant à l'imparfait ?",
            type: "multiple-choice",
            options: ["Le passé composé", "Le plus-que-parfait", "Le passé antérieur", "Le futur antérieur"],
            answer: "Le plus-que-parfait",
            explanation: "Le plus-que-parfait est le temps composé de l'imparfait. Il exprime une action antérieure à une autre action passée exprimée à l'imparfait."
          },
          {
            id: "fr4-ex2",
            question: "Accordez correctement : \"Les lettres que j'ai (écrire)...\"",
            type: "text",
            answer: "écrites",
            explanation: "Le COD 'que' (= les lettres, féminin pluriel) est placé avant l'auxiliaire avoir, donc le participe passé s'accorde : écrites."
          }
        ],
        [
          { title: "Bescherelle - Conjugaison", url: "https://bescherelle.com/", description: "Le site de référence pour la conjugaison française." },
          { title: "Ortholud - Exercices", url: "https://www.ortholud.com/", description: "Exercices interactifs de conjugaison." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "fr-5",
        "francais",
        "Le théâtre classique",
        "Le théâtre classique français du XVIIe siècle représente l'âge d'or du théâtre avec des auteurs comme Molière, Corneille et Racine. Il obéit à des règles strictes héritées de l'Antiquité.",
        [
          {
            title: "Les règles du théâtre classique",
            content: "Le théâtre classique suit la règle des trois unités :\n\n• Unité de temps : l'action doit se dérouler en 24 heures maximum\n• Unité de lieu : l'action se passe dans un seul endroit\n• Unité d'action : une seule intrigue principale\n\nAutres règles :\n• La bienséance : on ne montre pas la violence, la mort sur scène\n• La vraisemblance : l'action doit être crédible\n• La règle des 5 actes : exposition, nœud, péripéties, dénouement, conclusion",
            examples: [
              "Dans \"Phèdre\" de Racine, l'action se déroule en un jour, dans le palais de Trézène, autour d'une seule intrigue : l'amour interdit de Phèdre."
            ]
          },
          {
            title: "La comédie et la tragédie",
            content: "Deux grands genres s'opposent :\n\n• LA TRAGÉDIE (Corneille, Racine) :\n  - Personnages nobles (rois, princes)\n  - Registre soutenu, vers (alexandrins)\n  - Thèmes : honneur, devoir, fatalité, passion\n  - Fin malheureuse (mort du héros)\n  - But : inspirer terreur et pitié (catharsis)\n\n• LA COMÉDIE (Molière) :\n  - Personnages de la bourgeoisie ou du peuple\n  - Registre courant à familier, prose ou vers\n  - Thèmes : amour, argent, défauts humains\n  - Fin heureuse (mariage)\n  - But : faire rire pour corriger les mœurs"
          },
          {
            title: "Les grands auteurs",
            content: "• MOLIÈRE (1622-1673) : Le maître de la comédie\n  Œuvres : L'Avare, Le Malade imaginaire, Tartuffe, Le Misanthrope\n  \"Castigat ridendo mores\" : il corrige les mœurs par le rire\n\n• CORNEILLE (1606-1684) : Le maître de la tragédie héroïque\n  Œuvres : Le Cid, Horace, Cinna\n  Thème : le dilemme entre l'honneur et l'amour\n\n• RACINE (1639-1699) : Le maître de la tragédie passionnelle\n  Œuvres : Phèdre, Andromaque, Britannicus\n  Thème : les passions destructrices"
          }
        ],
        [
          "Règle des trois unités : temps (24h), lieu (un seul), action (une intrigue)",
          "Bienséance : pas de violence sur scène",
          "Tragédie : personnages nobles, fin malheureuse, alexandrins",
          "Comédie : personnages bourgeois, fin heureuse, faire rire pour corriger",
          "Grands auteurs : Molière (comédie), Corneille et Racine (tragédie)"
        ],
        [
          {
            id: "fr5-ex1",
            question: "Quelles sont les trois unités du théâtre classique ?",
            type: "text",
            answer: "Unité de temps, unité de lieu, unité d'action",
            explanation: "La règle des trois unités impose que l'action se déroule en 24h maximum, dans un seul lieu, avec une seule intrigue principale."
          },
          {
            id: "fr5-ex2",
            question: "Quel genre théâtral vise à inspirer 'terreur et pitié' ?",
            type: "multiple-choice",
            options: ["La comédie", "La tragédie", "La farce", "Le drame"],
            answer: "La tragédie",
            explanation: "La tragédie vise la catharsis : en montrant les passions des héros et leur chute, elle inspire terreur et pitié au spectateur, le purgeant de ses propres passions."
          }
        ],
        [
          { title: "Théâtre classique français", url: "https://www.theatre-classique.fr/", description: "Textes intégraux des pièces classiques en ligne." },
          { title: "Lumni - Le théâtre", url: "https://www.lumni.fr/dossier/le-theatre", description: "Dossier complet sur le théâtre classique." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "fr-6",
        "francais",
        "Grammaire : les propositions",
        "Une phrase complexe contient plusieurs propositions. Comprendre leur nature et leurs relations est essentiel pour analyser et écrire correctement.",
        [
          {
            title: "Phrase simple et phrase complexe",
            content: "• Phrase simple : un seul verbe conjugué = une seule proposition\n  Exemple : \"Le chat dort.\"\n\n• Phrase complexe : plusieurs verbes conjugués = plusieurs propositions\n  Exemple : \"Le chat dort (P1) parce qu'il est fatigué (P2).\"",
            examples: [
              "\"Je pense que tu as raison\" = 2 propositions (je pense / que tu as raison)"
            ]
          },
          {
            title: "Les trois types de propositions",
            content: "• PROPOSITION INDÉPENDANTE : elle a un sens complet par elle-même\n  \"Le soleil brille.\"\n\n• PROPOSITION PRINCIPALE : elle a un sens mais est complétée par une subordonnée\n  \"Je sais\" dans \"Je sais que tu viendras.\"\n\n• PROPOSITION SUBORDONNÉE : elle dépend de la principale, introduite par un mot subordonnant\n  \"que tu viendras\" dans \"Je sais que tu viendras.\""
          },
          {
            title: "Les relations entre propositions",
            content: "Les propositions peuvent être :\n\n• JUXTAPOSÉES : reliées par une ponctuation (virgule, point-virgule)\n  \"Il pleut, je reste chez moi.\"\n\n• COORDONNÉES : reliées par une conjonction de coordination (mais, ou, et, donc, or, ni, car)\n  \"Il pleut donc je reste chez moi.\"\n\n• SUBORDONNÉES : reliées par un mot subordonnant\n  \"Je reste chez moi parce qu'il pleut.\""
          }
        ],
        [
          "Proposition = groupe de mots organisé autour d'un verbe conjugué",
          "Phrase complexe = plusieurs propositions",
          "3 types : indépendante, principale, subordonnée",
          "Relations : juxtaposition, coordination, subordination",
          "Les subordonnées dépendent de la principale et sont introduites par un mot subordonnant"
        ],
        [
          {
            id: "fr6-ex1",
            question: "Combien de propositions dans : \"Quand il pleut, je lis un livre\" ?",
            type: "multiple-choice",
            options: ["1", "2", "3", "4"],
            answer: "2",
            explanation: "Il y a 2 propositions : \"Quand il pleut\" (subordonnée) et \"je lis un livre\" (principale). Chaque proposition contient un verbe conjugué."
          },
          {
            id: "fr6-ex2",
            question: "Quelle relation unit les propositions dans : \"Il travaille, il réussira\" ?",
            type: "multiple-choice",
            options: ["Coordination", "Subordination", "Juxtaposition", "Opposition"],
            answer: "Juxtaposition",
            explanation: "Les deux propositions sont séparées par une virgule, sans conjonction ni mot subordonnant : elles sont donc juxtaposées."
          }
        ],
        [
          { title: "Français facile - Propositions", url: "https://www.francaisfacile.com/", description: "Exercices sur les types de propositions." },
          { title: "Lumni - Grammaire", url: "https://www.lumni.fr/dossier/grammaire", description: "Cours de grammaire pour le collège." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  },
  {
    id: "maths",
    name: "Mathématiques",
    icon: "calculator",
    description: "Algèbre, géométrie, fonctions, statistiques et probabilités pour le brevet.",
    color: "#E63946",
    chapters: [
      createChapter(
        "math-1",
        "maths",
        "Le théorème de Pythagore",
        "Le théorème de Pythagore est l'un des théorèmes les plus importants en géométrie. Il établit une relation entre les longueurs des côtés d'un triangle rectangle.",
        [
          {
            title: "Énoncé du théorème",
            content: "Dans un triangle rectangle, le carré de la longueur de l'hypoténuse (le côté opposé à l'angle droit) est égal à la somme des carrés des longueurs des deux autres côtés.\n\nSi ABC est un triangle rectangle en A, alors :\nBC² = AB² + AC²\n\nL'hypoténuse BC est le plus grand côté, situé face à l'angle droit.",
            examples: [
              "Dans un triangle rectangle avec AB = 3 cm et AC = 4 cm, alors BC² = 3² + 4² = 9 + 16 = 25, donc BC = 5 cm."
            ]
          },
          {
            title: "Applications du théorème",
            content: "Le théorème de Pythagore permet de :\n\n• Calculer la longueur de l'hypoténuse :\n  BC = √(AB² + AC²)\n\n• Calculer la longueur d'un côté de l'angle droit :\n  AB = √(BC² - AC²)\n\n• Vérifier si un triangle est rectangle (réciproque) :\n  Si BC² = AB² + AC², alors le triangle est rectangle en A"
          },
          {
            title: "La réciproque du théorème",
            content: "Si dans un triangle ABC on a BC² = AB² + AC², alors le triangle ABC est rectangle en A.\n\nCette réciproque permet de démontrer qu'un triangle est rectangle en vérifiant l'égalité de Pythagore.",
            examples: [
              "Un triangle de côtés 5, 12 et 13. On vérifie : 13² = 169 et 5² + 12² = 25 + 144 = 169. Donc le triangle est rectangle."
            ]
          }
        ],
        [
          "Dans un triangle rectangle : hypoténuse² = côté1² + côté2²",
          "L'hypoténuse est le plus grand côté, face à l'angle droit",
          "On peut calculer un côté connaissant les deux autres",
          "La réciproque permet de prouver qu'un triangle est rectangle",
          "Triplets pythagoriciens célèbres : (3,4,5), (5,12,13), (8,15,17)"
        ],
        [
          {
            id: "math1-ex1",
            question: "Un triangle rectangle a des côtés de 6 cm et 8 cm pour l'angle droit. Quelle est la longueur de l'hypoténuse ?",
            type: "text",
            answer: "10 cm",
            explanation: "Hypoténuse² = 6² + 8² = 36 + 64 = 100. Donc hypoténuse = √100 = 10 cm."
          },
          {
            id: "math1-ex2",
            question: "Un triangle a des côtés de 7, 24 et 25. Est-il rectangle ?",
            type: "multiple-choice",
            options: ["Oui", "Non"],
            answer: "Oui",
            explanation: "On vérifie : 25² = 625 et 7² + 24² = 49 + 576 = 625. L'égalité est vérifiée, donc le triangle est rectangle (le plus grand côté est l'hypoténuse)."
          }
        ],
        [
          { title: "Khan Academy - Pythagore", url: "https://fr.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pythagorean-theorem", description: "Cours et exercices interactifs sur le théorème." },
          { title: "Maths et tiques", url: "https://www.maths-et-tiques.fr/", description: "Vidéos et exercices de mathématiques." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "math-2",
        "maths",
        "Le théorème de Thalès",
        "Le théorème de Thalès établit une propriété de proportionnalité dans une configuration géométrique avec des droites parallèles. C'est un outil fondamental pour calculer des longueurs.",
        [
          {
            title: "Configuration de Thalès",
            content: "Soit deux droites (d) et (d') sécantes en un point A. Si (BC) et (B'C') sont deux droites parallèles qui coupent (d) et (d'), on obtient une configuration de Thalès.\n\nOn distingue deux cas :\n• Les points B, B' sont d'un même côté de A (configuration en \"papillon\")\n• Les points B, B' sont de part et d'autre de A"
          },
          {
            title: "Énoncé du théorème",
            content: "Si (BB') // (CC'), alors :\n\nAB/AC = AB'/AC' = BB'/CC'\n\nCes rapports sont égaux. On peut ainsi calculer une longueur inconnue en utilisant la proportionnalité.",
            examples: [
              "Si AB = 3, AC = 5, AB' = 6, alors AC' = (5 × 6) / 3 = 10"
            ]
          },
          {
            title: "La réciproque de Thalès",
            content: "Si les points A, B, C sont alignés, les points A, B', C' sont alignés, et si :\nAB/AC = AB'/AC'\n\nAlors les droites (BB') et (CC') sont parallèles.\n\nAttention : il faut aussi vérifier que les points sont dans le même ordre sur chaque droite (B entre A et C si et seulement si B' entre A et C')."
          }
        ],
        [
          "Configuration : deux droites sécantes coupées par deux parallèles",
          "Théorème : égalité des rapports AB/AC = AB'/AC' = BB'/CC'",
          "Permet de calculer des longueurs par proportionnalité",
          "Réciproque : égalité des rapports ⟹ droites parallèles",
          "Vérifier l'alignement et l'ordre des points pour la réciproque"
        ],
        [
          {
            id: "math2-ex1",
            question: "Dans une configuration de Thalès, si AB = 4, AC = 6 et AB' = 8, calculer AC'.",
            type: "text",
            answer: "12",
            explanation: "Par le théorème de Thalès : AB/AC = AB'/AC', donc 4/6 = 8/AC'. AC' = (8 × 6) / 4 = 12."
          },
          {
            id: "math2-ex2",
            question: "Le théorème de Thalès repose sur quelle propriété ?",
            type: "multiple-choice",
            options: ["La symétrie", "La proportionnalité", "L'égalité des angles", "La rotation"],
            answer: "La proportionnalité",
            explanation: "Le théorème de Thalès établit l'égalité de rapports de longueurs, ce qui caractérise la proportionnalité."
          }
        ],
        [
          { title: "Maths et tiques - Thalès", url: "https://www.maths-et-tiques.fr/", description: "Cours complet et exercices sur le théorème de Thalès." },
          { title: "Lumni - Géométrie", url: "https://www.lumni.fr/dossier/geometrie", description: "Ressources sur la géométrie au collège." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "math-3",
        "maths",
        "Les fonctions linéaires et affines",
        "Les fonctions linéaires et affines sont des fonctions de référence dont la représentation graphique est une droite. Elles modélisent de nombreuses situations de proportionnalité.",
        [
          {
            title: "Fonction linéaire",
            content: "Une fonction linéaire est une fonction de la forme f(x) = ax où a est le coefficient de proportionnalité.\n\nPropriétés :\n• Sa représentation graphique est une droite passant par l'origine\n• a représente le coefficient directeur de la droite\n• Si a > 0, la fonction est croissante ; si a < 0, elle est décroissante",
            examples: [
              "f(x) = 3x est une fonction linéaire de coefficient 3",
              "g(x) = -2x est une fonction linéaire décroissante"
            ]
          },
          {
            title: "Fonction affine",
            content: "Une fonction affine est une fonction de la forme f(x) = ax + b où :\n• a est le coefficient directeur\n• b est l'ordonnée à l'origine\n\nPropriétés :\n• Sa représentation graphique est une droite\n• La droite coupe l'axe des ordonnées en (0, b)\n• Une fonction linéaire est une fonction affine avec b = 0",
            examples: [
              "f(x) = 2x + 3 : la droite passe par (0, 3) et a pour coefficient directeur 2"
            ]
          },
          {
            title: "Déterminer une fonction affine",
            content: "Pour déterminer une fonction affine, on peut :\n\n• Utiliser deux points A(x₁, y₁) et B(x₂, y₂) :\n  a = (y₂ - y₁) / (x₂ - x₁)\n  b = y₁ - a × x₁\n\n• Lire graphiquement :\n  b = ordonnée du point d'intersection avec l'axe des y\n  a = déplacement vertical / déplacement horizontal"
          }
        ],
        [
          "Fonction linéaire : f(x) = ax (proportionnalité, passe par l'origine)",
          "Fonction affine : f(x) = ax + b (droite quelconque)",
          "a = coefficient directeur, b = ordonnée à l'origine",
          "a > 0 : fonction croissante ; a < 0 : fonction décroissante",
          "Calcul de a : variation de y / variation de x"
        ],
        [
          {
            id: "math3-ex1",
            question: "Quelle est la nature de la fonction f(x) = 5x ?",
            type: "multiple-choice",
            options: ["Fonction constante", "Fonction linéaire", "Fonction affine non linéaire", "Fonction du second degré"],
            answer: "Fonction linéaire",
            explanation: "f(x) = 5x est de la forme f(x) = ax avec a = 5. C'est donc une fonction linéaire (cas particulier de fonction affine avec b = 0)."
          },
          {
            id: "math3-ex2",
            question: "Déterminer l'ordonnée à l'origine de f(x) = 3x - 7.",
            type: "text",
            answer: "-7",
            explanation: "Dans f(x) = ax + b, l'ordonnée à l'origine est b. Ici f(x) = 3x + (-7), donc b = -7."
          }
        ],
        [
          { title: "Khan Academy - Fonctions", url: "https://fr.khanacademy.org/math/algebra", description: "Cours sur les fonctions linéaires et affines." },
          { title: "Mathenpoche", url: "https://mathenpoche.sesamath.net/", description: "Exercices interactifs de mathématiques." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "math-4",
        "maths",
        "Les équations et inéquations",
        "Résoudre une équation, c'est trouver les valeurs de l'inconnue qui vérifient l'égalité. Les inéquations permettent de trouver un ensemble de solutions.",
        [
          {
            title: "Résolution d'équations du premier degré",
            content: "Une équation du premier degré est de la forme ax + b = 0.\n\nMéthode de résolution :\n1. Rassembler les termes en x d'un côté\n2. Rassembler les nombres de l'autre côté\n3. Diviser par le coefficient de x\n\nRègles :\n• On peut ajouter ou soustraire le même nombre des deux côtés\n• On peut multiplier ou diviser les deux côtés par le même nombre (≠ 0)",
            examples: [
              "3x + 5 = 17 → 3x = 17 - 5 → 3x = 12 → x = 4"
            ]
          },
          {
            title: "Équations produit",
            content: "Une équation produit est de la forme A × B = 0.\n\nPropriété fondamentale : Un produit est nul si et seulement si l'un des facteurs est nul.\n\nA × B = 0 ⟺ A = 0 ou B = 0\n\nOn résout donc chaque équation séparément.",
            examples: [
              "(x - 3)(2x + 1) = 0 → x - 3 = 0 ou 2x + 1 = 0 → x = 3 ou x = -0,5"
            ]
          },
          {
            title: "Les inéquations",
            content: "Une inéquation compare deux expressions avec <, >, ≤ ou ≥.\n\nMéthode : même principe que les équations, MAIS :\n• Si on multiplie ou divise par un nombre NÉGATIF, on INVERSE le sens de l'inégalité.\n\nLa solution est un intervalle, représenté sur une droite graduée.",
            examples: [
              "2x - 4 ≥ 0 → 2x ≥ 4 → x ≥ 2 → Solution : [2 ; +∞["
            ]
          }
        ],
        [
          "Équation du 1er degré : isoler x en gardant l'égalité équilibrée",
          "Équation produit : A × B = 0 ⟺ A = 0 ou B = 0",
          "Inéquation : attention au sens de l'inégalité si on multiplie/divise par un négatif",
          "Solution d'une inéquation = intervalle",
          "Toujours vérifier la solution en la remplaçant dans l'équation de départ"
        ],
        [
          {
            id: "math4-ex1",
            question: "Résoudre : 5x - 15 = 0",
            type: "text",
            answer: "x = 3",
            explanation: "5x - 15 = 0 → 5x = 15 → x = 15/5 = 3"
          },
          {
            id: "math4-ex2",
            question: "Résoudre : (x + 2)(x - 7) = 0",
            type: "text",
            answer: "x = -2 ou x = 7",
            explanation: "Équation produit : x + 2 = 0 donne x = -2, et x - 7 = 0 donne x = 7. Les deux solutions sont x = -2 et x = 7."
          }
        ],
        [
          { title: "Maths et tiques - Équations", url: "https://www.maths-et-tiques.fr/", description: "Cours et exercices sur les équations." },
          { title: "Lumni - Algèbre", url: "https://www.lumni.fr/dossier/algebre", description: "Révisions sur le calcul algébrique." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "math-5",
        "maths",
        "Statistiques et probabilités",
        "Les statistiques permettent d'analyser des données, les probabilités de prévoir des résultats aléatoires. Ces outils sont essentiels dans de nombreux domaines.",
        [
          {
            title: "Les indicateurs statistiques",
            content: "Pour résumer une série statistique, on utilise des indicateurs :\n\n• LA MOYENNE : somme des valeurs / effectif total\n  Formule : x̄ = (Σ nᵢ × xᵢ) / N\n\n• LA MÉDIANE : valeur qui partage l'effectif en deux parties égales\n  50% des valeurs sont en-dessous, 50% au-dessus\n\n• L'ÉTENDUE : différence entre la plus grande et la plus petite valeur\n  Étendue = max - min",
            examples: [
              "Notes : 8, 12, 14, 15, 16. Moyenne = (8+12+14+15+16)/5 = 13. Médiane = 14 (3ème valeur sur 5)."
            ]
          },
          {
            title: "Les probabilités",
            content: "La probabilité d'un événement mesure sa chance de se réaliser, entre 0 et 1.\n\nFormule classique (équiprobabilité) :\nP(A) = nombre de cas favorables / nombre de cas possibles\n\nPropriétés :\n• 0 ≤ P(A) ≤ 1\n• P(événement certain) = 1\n• P(événement impossible) = 0\n• P(Ā) = 1 - P(A) (probabilité de l'événement contraire)",
            examples: [
              "Lancer un dé : P(obtenir 6) = 1/6 ≈ 0,167"
            ]
          },
          {
            title: "Arbre de probabilités",
            content: "Un arbre de probabilités permet de représenter une expérience aléatoire à plusieurs étapes.\n\nRègles :\n• La somme des probabilités des branches issues d'un même nœud = 1\n• Pour calculer la probabilité d'un chemin : on multiplie les probabilités le long du chemin\n• Pour calculer la probabilité d'un événement : on additionne les probabilités des chemins favorables"
          }
        ],
        [
          "Moyenne = somme des valeurs / effectif",
          "Médiane = valeur du milieu (partage en 2 moitiés égales)",
          "Probabilité = cas favorables / cas possibles (entre 0 et 1)",
          "P(contraire) = 1 - P(événement)",
          "Arbre : on multiplie sur un chemin, on additionne les chemins"
        ],
        [
          {
            id: "math5-ex1",
            question: "Quelle est la probabilité d'obtenir pile en lançant une pièce ?",
            type: "multiple-choice",
            options: ["0", "1/4", "1/2", "1"],
            answer: "1/2",
            explanation: "Une pièce a 2 faces équiprobables. P(pile) = 1 cas favorable / 2 cas possibles = 1/2."
          },
          {
            id: "math5-ex2",
            question: "Calculer la moyenne de : 10, 12, 8, 15, 10",
            type: "text",
            answer: "11",
            explanation: "Moyenne = (10 + 12 + 8 + 15 + 10) / 5 = 55 / 5 = 11"
          }
        ],
        [
          { title: "Khan Academy - Statistiques", url: "https://fr.khanacademy.org/math/statistics-probability", description: "Cours sur les statistiques et probabilités." },
          { title: "Maths et tiques", url: "https://www.maths-et-tiques.fr/", description: "Exercices de probabilités." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "math-6",
        "maths",
        "Calcul littéral et identités remarquables",
        "Le calcul littéral permet de manipuler des expressions avec des lettres. Les identités remarquables sont des formules essentielles pour développer et factoriser.",
        [
          {
            title: "Développement et réduction",
            content: "Développer, c'est transformer un produit en somme.\nRéduire, c'est regrouper les termes semblables.\n\nRappels de distributivité :\n• k(a + b) = ka + kb (simple distributivité)\n• (a + b)(c + d) = ac + ad + bc + bd (double distributivité)",
            examples: [
              "3(2x + 5) = 6x + 15",
              "(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6"
            ]
          },
          {
            title: "Les identités remarquables",
            content: "Trois formules à connaître par cœur :\n\n• (a + b)² = a² + 2ab + b²\n  \"le carré de la somme\"\n\n• (a - b)² = a² - 2ab + b²\n  \"le carré de la différence\"\n\n• (a + b)(a - b) = a² - b²\n  \"le produit de la somme par la différence\"",
            examples: [
              "(x + 3)² = x² + 6x + 9",
              "(2x - 5)² = 4x² - 20x + 25",
              "(x + 4)(x - 4) = x² - 16"
            ]
          },
          {
            title: "Factorisation",
            content: "Factoriser, c'est transformer une somme en produit (opération inverse du développement).\n\nMéthodes :\n• Facteur commun : ab + ac = a(b + c)\n• Identités remarquables (dans l'autre sens) :\n  a² + 2ab + b² = (a + b)²\n  a² - 2ab + b² = (a - b)²\n  a² - b² = (a + b)(a - b)"
          }
        ],
        [
          "Développer = produit → somme / Factoriser = somme → produit",
          "(a + b)² = a² + 2ab + b²",
          "(a - b)² = a² - 2ab + b²",
          "(a + b)(a - b) = a² - b²",
          "Facteur commun : ab + ac = a(b + c)"
        ],
        [
          {
            id: "math6-ex1",
            question: "Développer : (x + 5)²",
            type: "text",
            answer: "x² + 10x + 25",
            explanation: "On applique (a + b)² = a² + 2ab + b² avec a = x et b = 5 : x² + 2×x×5 + 5² = x² + 10x + 25"
          },
          {
            id: "math6-ex2",
            question: "Factoriser : x² - 9",
            type: "text",
            answer: "(x + 3)(x - 3)",
            explanation: "On reconnaît a² - b² avec a = x et b = 3. On applique la formule : x² - 9 = (x + 3)(x - 3)"
          }
        ],
        [
          { title: "Mathenpoche - Calcul littéral", url: "https://mathenpoche.sesamath.net/", description: "Exercices de développement et factorisation." },
          { title: "Khan Academy - Algèbre", url: "https://fr.khanacademy.org/math/algebra", description: "Cours sur le calcul algébrique." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  },
  {
    id: "histoire",
    name: "Histoire",
    icon: "landmark",
    description: "De 1914 à nos jours : les deux guerres mondiales, la guerre froide, la construction européenne.",
    color: "#2A9D8F",
    chapters: [
      createChapter(
        "hist-1",
        "histoire",
        "La Première Guerre mondiale (1914-1918)",
        "La Première Guerre mondiale est un conflit majeur qui a bouleversé l'Europe et le monde. Cette \"Grande Guerre\" a mobilisé des millions de soldats et causé des destructions sans précédent.",
        [
          {
            title: "Les origines du conflit",
            content: "Au début du XXe siècle, l'Europe est divisée en deux blocs :\n\n• La Triple-Alliance : Allemagne, Autriche-Hongrie, Italie\n• La Triple-Entente : France, Royaume-Uni, Russie\n\nLes tensions sont multiples :\n• Rivalités coloniales entre grandes puissances\n• Nationalismes exacerbés (revanche française, panslavisme)\n• Course aux armements\n\nL'étincelle : le 28 juin 1914, l'archiduc François-Ferdinand est assassiné à Sarajevo. Le jeu des alliances entraîne toute l'Europe dans la guerre."
          },
          {
            title: "La guerre des tranchées",
            content: "Après la guerre de mouvement (été 1914), le front se stabilise : c'est la guerre de position.\n\nLa vie dans les tranchées :\n• Conditions de vie épouvantables : boue, rats, froid\n• Attaques meurtrières pour quelques mètres de terrain\n• Nouvelles armes : gaz, chars, aviation, mitrailleuses\n• Batailles sanglantes : Verdun (1916), la Somme (1916)\n\nLes soldats (\"poilus\" en France) souffrent physiquement et psychologiquement.",
            examples: [
              "La bataille de Verdun (février-décembre 1916) : 700 000 morts pour un gain territorial quasi nul."
            ]
          },
          {
            title: "Une guerre totale",
            content: "La guerre mobilise toutes les ressources des nations :\n\n• L'économie : reconversion des usines pour l'armement\n• Les femmes remplacent les hommes aux champs et à l'usine\n• La propagande pour maintenir le moral (\"bourrage de crâne\")\n• Les empires coloniaux fournissent des soldats (tirailleurs)\n\nL'entrée en guerre des États-Unis (1917) et l'armistice du 11 novembre 1918 mettent fin au conflit.\n\nBilan : 10 millions de morts, des millions de blessés (\"gueules cassées\"), une Europe traumatisée."
          }
        ],
        [
          "1914 : assassinat de François-Ferdinand → début de la guerre",
          "Guerre de tranchées : batailles meurtrières pour des gains minimes",
          "Guerre totale : économie, société, propagande mobilisées",
          "Nouvelles armes : gaz, chars, aviation",
          "11 novembre 1918 : armistice. Bilan : 10 millions de morts"
        ],
        [
          {
            id: "hist1-ex1",
            question: "Quel événement déclenche la Première Guerre mondiale ?",
            type: "multiple-choice",
            options: ["L'invasion de la Belgique", "L'assassinat de François-Ferdinand", "La déclaration de guerre de l'Allemagne", "La mobilisation russe"],
            answer: "L'assassinat de François-Ferdinand",
            explanation: "L'assassinat de l'archiduc héritier d'Autriche-Hongrie, le 28 juin 1914 à Sarajevo, déclenche le jeu des alliances qui mène à la guerre."
          },
          {
            id: "hist1-ex2",
            question: "Comment appelle-t-on les soldats français de la Première Guerre mondiale ?",
            type: "text",
            answer: "Les poilus",
            explanation: "Les soldats français sont surnommés les \"poilus\" en référence à leur apparence négligée dans les tranchées."
          }
        ],
        [
          { title: "Lumni - Première Guerre mondiale", url: "https://www.lumni.fr/dossier/la-premiere-guerre-mondiale", description: "Dossier complet sur la Grande Guerre." },
          { title: "Historial de la Grande Guerre", url: "https://www.historial.fr/", description: "Musée et ressources sur 14-18." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "hist-2",
        "histoire",
        "La Seconde Guerre mondiale (1939-1945)",
        "La Seconde Guerre mondiale est le conflit le plus meurtrier de l'Histoire. Elle oppose les puissances de l'Axe aux Alliés et se caractérise par des atrocités sans précédent, notamment le génocide des Juifs.",
        [
          {
            title: "Les causes et le déclenchement",
            content: "La montée des totalitarismes dans l'entre-deux-guerres crée les conditions de la guerre :\n\n• En Allemagne : Hitler au pouvoir (1933), politique expansionniste (Anschluss, Sudètes)\n• En Italie : Mussolini et le fascisme\n• Au Japon : expansionnisme en Asie\n\nLe 1er septembre 1939, l'Allemagne envahit la Pologne. La France et le Royaume-Uni déclarent la guerre à l'Allemagne.",
            examples: [
              "Les accords de Munich (1938) : les démocraties cèdent devant Hitler pour éviter la guerre - politique d'apaisement."
            ]
          },
          {
            title: "La France dans la guerre",
            content: "• Mai-juin 1940 : défaite française face à la Blitzkrieg (guerre éclair)\n• 22 juin 1940 : armistice. La France est divisée en zone occupée et zone libre\n• Le régime de Vichy : Pétain collabore avec l'Allemagne nazie\n• La Résistance s'organise : de Gaulle lance l'appel du 18 juin 1940\n• 6 juin 1944 : débarquement en Normandie. Libération progressive\n• 8 mai 1945 : capitulation de l'Allemagne"
          },
          {
            title: "Le génocide des Juifs",
            content: "La Shoah est le génocide des Juifs d'Europe par les nazis.\n\n• Première phase : ghettos, Einsatzgruppen (fusillades massives)\n• 1942 : \"Solution finale\" décidée à la conférence de Wannsee\n• Déportation vers les camps d'extermination : Auschwitz, Treblinka, Sobibor...\n• 6 millions de Juifs assassinés\n\nD'autres populations sont également persécutées : Tziganes (Roms), handicapés, homosexuels, opposants politiques.\n\nAprès la guerre : procès de Nuremberg (1945-1946) pour juger les criminels nazis."
          }
        ],
        [
          "1939 : invasion de la Pologne → début de la guerre",
          "1940 : défaite française, régime de Vichy (collaboration), Appel du 18 juin (Résistance)",
          "Shoah : génocide de 6 millions de Juifs dans les camps d'extermination",
          "6 juin 1944 : débarquement en Normandie",
          "8 mai 1945 : victoire des Alliés en Europe"
        ],
        [
          {
            id: "hist2-ex1",
            question: "Quelle est la date du débarquement en Normandie ?",
            type: "multiple-choice",
            options: ["8 mai 1945", "6 juin 1944", "18 juin 1940", "22 juin 1940"],
            answer: "6 juin 1944",
            explanation: "Le 6 juin 1944 (D-Day), les forces alliées débarquent sur les plages de Normandie, marquant le début de la libération de la France."
          },
          {
            id: "hist2-ex2",
            question: "Combien de Juifs ont été assassinés pendant la Shoah ?",
            type: "text",
            answer: "6 millions",
            explanation: "Environ 6 millions de Juifs ont été victimes du génocide nazi pendant la Seconde Guerre mondiale."
          }
        ],
        [
          { title: "Mémorial de la Shoah", url: "https://www.memorialdelashoah.org/", description: "Ressources pédagogiques sur le génocide des Juifs." },
          { title: "Lumni - Seconde Guerre mondiale", url: "https://www.lumni.fr/dossier/la-seconde-guerre-mondiale", description: "Dossier complet sur 39-45." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "hist-3",
        "histoire",
        "La Guerre froide (1947-1991)",
        "Après 1945, le monde se divise en deux blocs antagonistes : le bloc occidental (capitaliste, mené par les États-Unis) et le bloc soviétique (communiste, mené par l'URSS). C'est la Guerre froide : un affrontement indirect sans conflit armé direct entre les deux superpuissances.",
        [
          {
            title: "Un monde bipolaire",
            content: "Deux modèles s'affrontent :\n\n• Bloc de l'Ouest : démocratie libérale, économie de marché (capitalisme)\n  - Alliance : OTAN (1949)\n  - Plan Marshall pour reconstruire l'Europe\n\n• Bloc de l'Est : régimes communistes, économie planifiée\n  - Alliance : Pacte de Varsovie (1955)\n  - Domination soviétique sur l'Europe de l'Est (\"Rideau de fer\")\n\nL'Allemagne, symbole de cette division : RFA (Ouest) et RDA (Est). Berlin est coupée par un mur à partir de 1961.",
            examples: [
              "Winston Churchill parle du \"rideau de fer\" qui divise l'Europe (discours de Fulton, 1946)."
            ]
          },
          {
            title: "Les crises de la Guerre froide",
            content: "L'affrontement se manifeste par des crises graves :\n\n• Blocus de Berlin (1948-1949) : les Occidentaux organisent un pont aérien\n• Guerre de Corée (1950-1953) : premier conflit armé indirect\n• Crise de Cuba (1962) : le monde frôle la guerre nucléaire\n• Guerre du Vietnam (1964-1975) : intervention américaine contre le communisme\n• Guerre d'Afghanistan (1979-1989) : intervention soviétique\n\nLa course aux armements nucléaires (\"équilibre de la terreur\") empêche l'affrontement direct."
          },
          {
            title: "La fin de la Guerre froide",
            content: "Dans les années 1980, l'URSS s'affaiblit :\n\n• Économie en crise, course aux armements coûteuse\n• Gorbatchev lance la perestroïka (restructuration) et la glasnost (transparence)\n• 1989 : chute du mur de Berlin, libération des pays d'Europe de l'Est\n• 1991 : dissolution de l'URSS\n\nLes États-Unis restent la seule superpuissance mondiale."
          }
        ],
        [
          "Monde bipolaire : bloc Ouest (USA, capitalisme) vs bloc Est (URSS, communisme)",
          "Rideau de fer : division de l'Europe, mur de Berlin (1961-1989)",
          "Crises : Berlin, Cuba, Corée, Vietnam - jamais de guerre directe USA-URSS",
          "Équilibre de la terreur : dissuasion nucléaire",
          "1989 : chute du mur de Berlin. 1991 : fin de l'URSS"
        ],
        [
          {
            id: "hist3-ex1",
            question: "En quelle année le mur de Berlin a-t-il été construit ?",
            type: "multiple-choice",
            options: ["1949", "1955", "1961", "1989"],
            answer: "1961",
            explanation: "Le mur de Berlin a été construit en août 1961 pour empêcher les Allemands de l'Est de fuir vers l'Ouest."
          },
          {
            id: "hist3-ex2",
            question: "Quelle crise de 1962 a failli déclencher une guerre nucléaire ?",
            type: "text",
            answer: "La crise de Cuba",
            explanation: "En octobre 1962, la découverte de missiles soviétiques à Cuba a créé une tension extrême entre USA et URSS, qui a failli dégénérer en guerre nucléaire."
          }
        ],
        [
          { title: "Lumni - Guerre froide", url: "https://www.lumni.fr/dossier/la-guerre-froide", description: "Comprendre l'affrontement Est-Ouest." },
          { title: "INA - Archives audiovisuelles", url: "https://www.ina.fr/", description: "Documents d'époque sur la Guerre froide." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "hist-4",
        "histoire",
        "La Ve République",
        "En 1958, face à la crise algérienne, le général de Gaulle revient au pouvoir et fonde la Ve République. Ce régime, toujours en vigueur, renforce le pouvoir présidentiel.",
        [
          {
            title: "La naissance de la Ve République",
            content: "En 1958, la France est en crise :\n\n• La guerre d'Algérie (1954-1962) divise le pays\n• L'instabilité gouvernementale de la IVe République\n• Le putsch d'Alger (mai 1958) menace de guerre civile\n\nDe Gaulle est rappelé au pouvoir. Il fait adopter une nouvelle Constitution (28 septembre 1958) qui renforce le pouvoir exécutif.\n\nEn 1962, l'élection du président au suffrage universel direct renforce encore la fonction présidentielle.",
            examples: [
              "Depuis 1958, la France a connu 8 présidents de la République."
            ]
          },
          {
            title: "Les institutions de la Ve République",
            content: "La Constitution organise les pouvoirs :\n\n• LE PRÉSIDENT DE LA RÉPUBLIQUE :\n  - Élu pour 5 ans (depuis 2000) au suffrage universel direct\n  - Chef des armées, garant de la Constitution\n  - Nomme le Premier ministre, peut dissoudre l'Assemblée\n\n• LE GOUVERNEMENT :\n  - Le Premier ministre dirige l'action du gouvernement\n  - Responsable devant l'Assemblée nationale\n\n• LE PARLEMENT :\n  - Assemblée nationale (577 députés) : vote les lois, contrôle le gouvernement\n  - Sénat (348 sénateurs) : représente les collectivités territoriales"
          },
          {
            title: "L'évolution de la Ve République",
            content: "La Ve République a connu des évolutions :\n\n• 1962 : élection du président au suffrage universel direct\n• 1965 : première élection présidentielle (de Gaulle réélu)\n• 1986, 1997, 2002 : cohabitations (président et Premier ministre de bords opposés)\n• 2000 : passage du septennat au quinquennat\n• 2008 : réforme constitutionnelle renforçant le Parlement\n\nLa Ve République a su s'adapter tout en maintenant un régime présidentiel fort."
          }
        ],
        [
          "1958 : naissance de la Ve République (de Gaulle, nouvelle Constitution)",
          "1962 : élection du président au suffrage universel direct",
          "Président : chef de l'État, nomme le Premier ministre, chef des armées",
          "Parlement : Assemblée nationale (vote les lois) + Sénat",
          "2000 : quinquennat (mandat de 5 ans au lieu de 7)"
        ],
        [
          {
            id: "hist4-ex1",
            question: "En quelle année a été fondée la Ve République ?",
            type: "multiple-choice",
            options: ["1945", "1958", "1962", "1969"],
            answer: "1958",
            explanation: "La Ve République a été fondée en 1958, avec l'adoption de la nouvelle Constitution le 28 septembre 1958."
          },
          {
            id: "hist4-ex2",
            question: "Quelle est la durée actuelle du mandat présidentiel ?",
            type: "text",
            answer: "5 ans (quinquennat)",
            explanation: "Depuis la réforme de 2000, le mandat présidentiel est de 5 ans (quinquennat), contre 7 ans auparavant (septennat)."
          }
        ],
        [
          { title: "Vie publique - Institutions", url: "https://www.vie-publique.fr/", description: "Comprendre les institutions françaises." },
          { title: "Élysée - La présidence", url: "https://www.elysee.fr/", description: "Site officiel de la présidence de la République." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "hist-5",
        "histoire",
        "La construction européenne",
        "Après les destructions des deux guerres mondiales, les pays européens décident de s'unir pour garantir la paix et la prospérité. C'est le début de la construction européenne.",
        [
          {
            title: "Les débuts de l'Europe (1950-1957)",
            content: "L'idée européenne naît de la volonté de paix :\n\n• 9 mai 1950 : Déclaration Schuman (père fondateur)\n  Propose de mettre en commun le charbon et l'acier\n\n• 1951 : CECA (Communauté européenne du charbon et de l'acier)\n  6 pays : France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg\n\n• 1957 : Traité de Rome → création de la CEE (Communauté économique européenne)\n  Objectif : marché commun, libre circulation des marchandises",
            examples: [
              "Le 9 mai est devenu la Journée de l'Europe, célébrée chaque année."
            ]
          },
          {
            title: "L'élargissement de l'Europe",
            content: "L'Europe s'élargit progressivement :\n\n• 1973 : Royaume-Uni, Irlande, Danemark (9 membres)\n• 1981 : Grèce (10 membres)\n• 1986 : Espagne, Portugal (12 membres)\n• 1995 : Autriche, Suède, Finlande (15 membres)\n• 2004 : grand élargissement à l'Est (25 membres)\n• 2007-2013 : Roumanie, Bulgarie, Croatie (28 membres)\n• 2020 : Brexit - le Royaume-Uni quitte l'UE (27 membres)"
          },
          {
            title: "L'approfondissement de l'Union",
            content: "L'intégration européenne se renforce :\n\n• 1992 : Traité de Maastricht → création de l'Union européenne\n  - Citoyenneté européenne\n  - Monnaie unique prévue\n\n• 2002 : L'euro entre en circulation (19 pays actuellement)\n\n• Espace Schengen : libre circulation des personnes (26 pays)\n\nLes institutions : Parlement européen (élus par les citoyens), Commission européenne, Conseil de l'UE."
          }
        ],
        [
          "1950 : Déclaration Schuman (9 mai = Journée de l'Europe)",
          "1957 : Traité de Rome → CEE (6 pays fondateurs)",
          "1992 : Traité de Maastricht → Union européenne",
          "2002 : Mise en circulation de l'euro",
          "Aujourd'hui : 27 États membres, Parlement européen, Commission"
        ],
        [
          {
            id: "hist5-ex1",
            question: "Quel traité crée l'Union européenne en 1992 ?",
            type: "multiple-choice",
            options: ["Le traité de Rome", "Le traité de Maastricht", "Le traité de Lisbonne", "Le traité de Paris"],
            answer: "Le traité de Maastricht",
            explanation: "Le traité de Maastricht, signé en 1992, transforme la CEE en Union européenne et prévoit la création de l'euro."
          },
          {
            id: "hist5-ex2",
            question: "Combien de pays fondateurs comptait la CEE en 1957 ?",
            type: "text",
            answer: "6",
            explanation: "Les 6 pays fondateurs de la CEE sont : France, Allemagne, Italie, Belgique, Pays-Bas et Luxembourg."
          }
        ],
        [
          { title: "Union européenne - Site officiel", url: "https://european-union.europa.eu/", description: "Tout sur l'Union européenne." },
          { title: "Toute l'Europe", url: "https://www.touteleurope.eu/", description: "L'actualité et l'histoire de l'UE." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  },
  {
    id: "geographie",
    name: "Géographie",
    icon: "globe",
    description: "La France et l'Union européenne : territoires, aménagement, dynamiques spatiales.",
    color: "#457B9D",
    chapters: [
      createChapter(
        "geo-1",
        "geographie",
        "Les espaces productifs français",
        "La France possède des espaces productifs variés qui contribuent à sa richesse économique. Ces espaces se transforment sous l'effet de la mondialisation et des nouvelles technologies.",
        [
          {
            title: "Les espaces agricoles",
            content: "La France est la première puissance agricole européenne :\n\n• Agriculture intensive : Bassin parisien (céréales), Bretagne (élevage)\n• Agriculture méditerranéenne : viticulture, maraîchage\n• Évolutions : mécanisation, PAC (Politique agricole commune), agriculture biologique\n\nDéfis : concurrence mondiale, respect de l'environnement, maintien des exploitations.",
            examples: [
              "La Beauce est surnommée le \"grenier de la France\" pour sa production céréalière."
            ]
          },
          {
            title: "Les espaces industriels",
            content: "L'industrie française se transforme :\n\n• Anciennes régions industrielles en reconversion : Nord, Lorraine (mines, sidérurgie)\n• Nouvelles industries : technopoles (Sophia-Antipolis), industries de pointe\n• Délocalisations vers les pays à bas coûts\n• Réindustrialisation : attractivité, innovation\n\nLes métropoles concentrent les activités de haute technologie (recherche, numérique).",
            examples: [
              "Toulouse est un pôle aéronautique mondial grâce à Airbus."
            ]
          },
          {
            title: "Les espaces de services et touristiques",
            content: "Les services dominent l'économie française (75% des emplois) :\n\n• Métropoles : sièges sociaux, finance, commerce\n• Tourisme : France = 1ère destination mondiale\n  - Littoraux : Côte d'Azur, côte atlantique\n  - Montagnes : Alpes, Pyrénées (ski)\n  - Patrimoine : Paris, châteaux de la Loire\n\nEnjeux : saturation, tourisme durable, concurrence internationale."
          }
        ],
        [
          "Agriculture : 1ère puissance européenne, évolution vers le bio et la qualité",
          "Industrie : reconversion des anciennes régions, développement des technopoles",
          "Services : 75% des emplois, métropolisation",
          "Tourisme : France = 1ère destination mondiale",
          "Mondialisation : opportunités (export) et défis (concurrence, délocalisations)"
        ],
        [
          {
            id: "geo1-ex1",
            question: "Quel secteur représente 75% des emplois en France ?",
            type: "multiple-choice",
            options: ["L'agriculture", "L'industrie", "Les services", "La construction"],
            answer: "Les services",
            explanation: "Le secteur tertiaire (services) représente environ 75% des emplois en France, reflétant la tertiarisation de l'économie."
          },
          {
            id: "geo1-ex2",
            question: "Quel rang mondial la France occupe-t-elle pour le tourisme ?",
            type: "text",
            answer: "1er",
            explanation: "La France est la première destination touristique mondiale avec près de 90 millions de visiteurs par an."
          }
        ],
        [
          { title: "INSEE - Données économiques", url: "https://www.insee.fr/", description: "Statistiques sur l'économie française." },
          { title: "Géoconfluences", url: "http://geoconfluences.ens-lyon.fr/", description: "Ressources géographiques pour le secondaire." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "geo-2",
        "geographie",
        "Les aires urbaines en France",
        "La France est un pays fortement urbanisé. Les aires urbaines regroupent la majorité de la population et concentrent les activités économiques.",
        [
          {
            title: "Définition et organisation",
            content: "Une aire urbaine comprend :\n\n• Le pôle urbain : ville-centre + banlieue (zone dense)\n• La couronne périurbaine : communes dont au moins 40% des actifs travaillent dans le pôle\n\nOrganisation des grandes villes :\n• Centre-ville : commerces, services, patrimoine\n• Banlieues : habitat collectif ou pavillonnaire\n• Périphérie : zones commerciales, lotissements, espaces verts",
            examples: [
              "L'aire urbaine de Paris regroupe plus de 12 millions d'habitants, soit 18% de la population française."
            ]
          },
          {
            title: "L'étalement urbain",
            content: "Les villes s'étendent vers la périphérie (périurbanisation) :\n\nCauses :\n• Prix du foncier moins cher en périphérie\n• Recherche d'espace et de verdure\n• Développement de l'automobile\n\nConséquences :\n• Allongement des trajets domicile-travail\n• Dépendance à la voiture\n• Consommation d'espaces agricoles\n• Coûts d'équipement pour les communes"
          },
          {
            title: "Les dynamiques urbaines",
            content: "Les villes françaises évoluent :\n\n• Métropolisation : concentration des activités dans les grandes métropoles\n• Gentrification des centres-villes : rénovation, arrivée de populations aisées\n• Politique de la ville : rénovation des quartiers en difficulté\n• Développement durable : transports en commun, écoquartiers\n\n10 métropoles créées depuis 2015 pour renforcer le poids des grandes villes."
          }
        ],
        [
          "Aire urbaine = pôle urbain + couronne périurbaine",
          "85% des Français vivent dans une aire urbaine",
          "Périurbanisation : étalement vers les périphéries",
          "Métropolisation : concentration des activités dans les grandes villes",
          "Enjeux : mobilités durables, rénovation urbaine, mixité sociale"
        ],
        [
          {
            id: "geo2-ex1",
            question: "Que comprend une aire urbaine ?",
            type: "multiple-choice",
            options: ["Uniquement la ville-centre", "La ville-centre et sa banlieue", "Le pôle urbain et la couronne périurbaine", "La région entière"],
            answer: "Le pôle urbain et la couronne périurbaine",
            explanation: "L'aire urbaine comprend le pôle urbain (ville-centre + banlieue) et la couronne périurbaine (communes dépendantes du pôle pour l'emploi)."
          },
          {
            id: "geo2-ex2",
            question: "Comment appelle-t-on l'extension des villes vers les périphéries ?",
            type: "text",
            answer: "La périurbanisation",
            explanation: "La périurbanisation désigne l'extension des villes vers les espaces ruraux périphériques, créant un espace ni vraiment urbain ni vraiment rural."
          }
        ],
        [
          { title: "Géoconfluences - Urbanisation", url: "http://geoconfluences.ens-lyon.fr/", description: "Analyses sur l'urbanisation en France." },
          { title: "INSEE - Aires urbaines", url: "https://www.insee.fr/", description: "Données sur les aires urbaines françaises." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "geo-3",
        "geographie",
        "L'Union européenne, un territoire en construction",
        "L'Union européenne est un espace de 27 États qui s'est progressivement construit et organisé. Elle forme aujourd'hui un territoire aux dynamiques spatiales complexes.",
        [
          {
            title: "Un territoire contrasté",
            content: "L'UE présente de fortes disparités :\n\n• Centre (\"Banane bleue\") : de Londres à Milan, zone la plus développée\n  - Densité de population, richesse, industries, métropoles mondiales\n\n• Périphéries : régions moins développées\n  - Europe du Sud : Grèce, Sud de l'Italie, Portugal\n  - Europe de l'Est : pays entrés après 2004\n  - Périphéries nordiques : faible densité\n\nLe PIB par habitant varie de 1 à 3 entre les pays les plus riches et les plus pauvres.",
            examples: [
              "Le Luxembourg a un PIB/habitant 6 fois supérieur à celui de la Bulgarie."
            ]
          },
          {
            title: "Les politiques européennes",
            content: "L'UE mène des politiques pour réduire les inégalités :\n\n• Politique régionale : fonds structurels pour les régions en retard\n  - FEDER, FSE : financement d'infrastructures, formation\n\n• Politique agricole commune (PAC) : soutien aux agriculteurs\n\n• Réseaux transeuropéens (RTE) : liaisons de transport pour connecter le territoire\n  - LGV, autoroutes, couloirs aériens\n\n• Programmes : Erasmus+ (éducation), Horizon (recherche)"
          },
          {
            title: "Les frontières de l'UE",
            content: "L'UE a des frontières internes et externes :\n\n• Espace Schengen : libre circulation des personnes (26 pays)\n  - Suppression des contrôles aux frontières intérieures\n\n• Frontières externes : contrôlées\n  - Frontex : agence européenne de garde-frontières\n  - Pression migratoire (Méditerranée, Europe de l'Est)\n\n• Question de l'élargissement : candidats (Balkans, Turquie)"
          }
        ],
        [
          "Centre dynamique (\"Banane bleue\") vs périphéries moins développées",
          "Politique régionale : fonds structurels pour réduire les inégalités",
          "Réseaux transeuropéens pour connecter le territoire",
          "Espace Schengen : libre circulation des personnes",
          "Frontières externes : Frontex, enjeux migratoires"
        ],
        [
          {
            id: "geo3-ex1",
            question: "Comment appelle-t-on la zone la plus développée de l'UE ?",
            type: "multiple-choice",
            options: ["Le croissant d'or", "La banane bleue", "Le cœur européen", "La dorsale verte"],
            answer: "La banane bleue",
            explanation: "La \"banane bleue\" désigne le cœur économique de l'Europe, qui s'étend de Londres au nord de l'Italie en passant par le Benelux et l'Allemagne."
          },
          {
            id: "geo3-ex2",
            question: "Qu'est-ce que l'espace Schengen ?",
            type: "text",
            answer: "Un espace de libre circulation des personnes sans contrôle aux frontières intérieures",
            explanation: "L'espace Schengen regroupe 26 pays européens ayant supprimé les contrôles aux frontières intérieures, permettant la libre circulation des personnes."
          }
        ],
        [
          { title: "Toute l'Europe", url: "https://www.touteleurope.eu/", description: "L'Union européenne expliquée." },
          { title: "Europa - Portail UE", url: "https://europa.eu/", description: "Site officiel de l'Union européenne." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "geo-4",
        "geographie",
        "La France et ses territoires ultramarins",
        "La France ne se limite pas à la métropole. Elle possède des territoires répartis sur tous les océans, qui lui confèrent une présence mondiale.",
        [
          {
            title: "Localisation et statuts",
            content: "Les territoires ultramarins français sont situés sur tous les continents :\n\n• Océan Atlantique : Guadeloupe, Martinique, Guyane, Saint-Pierre-et-Miquelon\n• Océan Indien : La Réunion, Mayotte, îles Éparses\n• Océan Pacifique : Polynésie française, Nouvelle-Calédonie, Wallis-et-Futuna\n\nStatuts variés :\n• DROM (Départements et Régions d'Outre-Mer) : même statut que les départements métropolitains\n• COM (Collectivités d'Outre-Mer) : statuts particuliers",
            examples: [
              "Grâce à ses territoires ultramarins, la France possède la 2ème ZEE mondiale (Zone économique exclusive)."
            ]
          },
          {
            title: "Atouts et contraintes",
            content: "Ces territoires présentent des caractéristiques spécifiques :\n\nAtouts :\n• Richesses naturelles (biodiversité, ressources marines)\n• Position stratégique (bases militaires)\n• Tourisme (climat tropical)\n• ZEE étendue (pêche, ressources sous-marines)\n\nContraintes :\n• Éloignement de la métropole\n• Dépendance économique\n• Risques naturels (cyclones, volcans)\n• Taux de chômage élevé"
          },
          {
            title: "Aménagement et développement",
            content: "L'État et l'UE soutiennent le développement :\n\n• Octroi de mer : taxe protégeant les productions locales\n• Fonds européens (RUP - Régions ultrapériphériques)\n• Continuité territoriale : liaisons avec la métropole\n• Développement durable : protection de la biodiversité\n\nEnjeux : autonomie énergétique, diversification économique, adaptation au changement climatique."
          }
        ],
        [
          "Territoires répartis sur 3 océans : Atlantique, Indien, Pacifique",
          "Statuts : DROM (départements) et COM (collectivités)",
          "2ème ZEE mondiale grâce à l'outre-mer",
          "Atouts : ressources, tourisme, position stratégique",
          "Contraintes : éloignement, dépendance, risques naturels"
        ],
        [
          {
            id: "geo4-ex1",
            question: "Dans quel océan se trouve La Réunion ?",
            type: "multiple-choice",
            options: ["Océan Atlantique", "Océan Pacifique", "Océan Indien", "Mer des Caraïbes"],
            answer: "Océan Indien",
            explanation: "La Réunion est située dans l'océan Indien, à l'est de Madagascar."
          },
          {
            id: "geo4-ex2",
            question: "Que signifie ZEE ?",
            type: "text",
            answer: "Zone Économique Exclusive",
            explanation: "La ZEE est la zone maritime sur laquelle un État a des droits souverains pour l'exploitation des ressources (jusqu'à 200 milles nautiques des côtes)."
          }
        ],
        [
          { title: "Outre-mer.gouv.fr", url: "https://www.outre-mer.gouv.fr/", description: "Portail des territoires ultramarins." },
          { title: "Géoconfluences", url: "http://geoconfluences.ens-lyon.fr/", description: "Analyses géographiques sur l'outre-mer." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  },
  {
    id: "emc",
    name: "EMC (Enseignement Moral et Civique)",
    icon: "scale",
    description: "Citoyenneté, valeurs républicaines, droits et devoirs, engagement civique.",
    color: "#8338EC",
    chapters: [
      createChapter(
        "emc-1",
        "emc",
        "Les valeurs et principes de la République",
        "La République française repose sur des valeurs et des principes fondamentaux inscrits dans la Constitution. Ces valeurs guident la vie en société et garantissent les droits de chacun.",
        [
          {
            title: "La devise républicaine",
            content: "\"Liberté, Égalité, Fraternité\" - adoptée en 1848 :\n\n• LIBERTÉ : droits fondamentaux (expression, culte, circulation...)\n  - Limites : ne pas nuire à autrui\n\n• ÉGALITÉ : tous les citoyens ont les mêmes droits\n  - Égalité devant la loi, l'impôt, l'accès aux emplois publics\n\n• FRATERNITÉ : solidarité entre les citoyens\n  - Protection sociale, entraide, vivre-ensemble",
            examples: [
              "La devise figure sur les bâtiments publics, les pièces de monnaie et les documents officiels."
            ]
          },
          {
            title: "Les principes républicains",
            content: "La Constitution définit les principes de la République :\n\n• INDIVISIBLE : le territoire et le peuple sont un\n• LAÏQUE : séparation des Églises et de l'État (loi de 1905)\n  - Neutralité de l'État, liberté de conscience\n• DÉMOCRATIQUE : souveraineté du peuple\n• SOCIALE : protection et solidarité\n\nLa laïcité garantit la liberté de croire ou de ne pas croire, tout en maintenant la neutralité de l'État."
          },
          {
            title: "Les symboles de la République",
            content: "La France possède des symboles officiels :\n\n• Le drapeau tricolore (bleu, blanc, rouge)\n• La Marseillaise (hymne national)\n• Marianne (allégorie de la République)\n• Le 14 juillet (fête nationale)\n• Le coq gaulois\n• Le sceau de l'État\n\nCes symboles représentent l'identité nationale et les valeurs républicaines."
          }
        ],
        [
          "Devise : Liberté, Égalité, Fraternité",
          "Principes : République indivisible, laïque, démocratique et sociale",
          "Laïcité : séparation des Églises et de l'État (1905)",
          "Symboles : drapeau, Marseillaise, Marianne, 14 juillet",
          "Ces valeurs garantissent les droits et le vivre-ensemble"
        ],
        [
          {
            id: "emc1-ex1",
            question: "Quelle loi instaure la séparation des Églises et de l'État ?",
            type: "multiple-choice",
            options: ["Loi de 1789", "Loi de 1848", "Loi de 1905", "Loi de 1958"],
            answer: "Loi de 1905",
            explanation: "La loi du 9 décembre 1905 établit la séparation des Églises et de l'État, fondement de la laïcité à la française."
          },
          {
            id: "emc1-ex2",
            question: "Citez les trois mots de la devise républicaine.",
            type: "text",
            answer: "Liberté, Égalité, Fraternité",
            explanation: "La devise \"Liberté, Égalité, Fraternité\" exprime les valeurs fondamentales de la République française."
          }
        ],
        [
          { title: "Vie publique - République", url: "https://www.vie-publique.fr/", description: "Comprendre les valeurs républicaines." },
          { title: "Éduscol - EMC", url: "https://eduscol.education.fr/", description: "Ressources officielles d'EMC." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "emc-2",
        "emc",
        "La citoyenneté française et européenne",
        "Être citoyen, c'est appartenir à une communauté politique et disposer de droits et de devoirs. En France, on est à la fois citoyen français et citoyen européen.",
        [
          {
            title: "La citoyenneté française",
            content: "On acquiert la nationalité française par :\n• La naissance (droit du sang : parents français ; droit du sol : né en France)\n• La naturalisation (après résidence et intégration)\n\nLe citoyen français dispose de :\n• Droits civiques : vote, éligibilité\n• Droits civils : liberté, propriété, justice\n• Droits sociaux : éducation, santé, protection sociale\n\nDevoirs : respecter les lois, payer les impôts, participer à la défense nationale",
            examples: [
              "Le service national universel (SNU) remplace le service militaire depuis 2019."
            ]
          },
          {
            title: "La citoyenneté européenne",
            content: "Depuis le traité de Maastricht (1992), tout citoyen d'un État membre est aussi citoyen européen.\n\nDroits liés à la citoyenneté européenne :\n• Libre circulation dans l'UE\n• Vote aux élections municipales et européennes dans son pays de résidence\n• Protection diplomatique par tout État membre\n• Pétition au Parlement européen\n• Recours au Médiateur européen\n\nLa citoyenneté européenne s'ajoute à la citoyenneté nationale, elle ne la remplace pas."
          },
          {
            title: "L'engagement citoyen",
            content: "Le citoyen peut s'engager de diverses manières :\n\n• VOTER : participer à la vie démocratique\n• S'INFORMER : comprendre les enjeux de société\n• S'ENGAGER : associations, partis politiques, syndicats\n• DÉFENDRE : droits de l'homme, environnement, solidarité\n\nL'abstention est un danger pour la démocratie : elle affaiblit la légitimité des élus."
          }
        ],
        [
          "Citoyenneté française : droits civiques, civils et sociaux + devoirs",
          "Acquisition : naissance (sang/sol) ou naturalisation",
          "Citoyenneté européenne (1992) : libre circulation, vote local",
          "Devoirs : respecter les lois, impôts, défense nationale",
          "Engagement : voter, s'informer, s'engager dans la vie associative"
        ],
        [
          {
            id: "emc2-ex1",
            question: "Depuis quel traité existe la citoyenneté européenne ?",
            type: "multiple-choice",
            options: ["Traité de Rome (1957)", "Traité de Maastricht (1992)", "Traité de Lisbonne (2007)", "Traité de Paris (1951)"],
            answer: "Traité de Maastricht (1992)",
            explanation: "Le traité de Maastricht de 1992 a créé la citoyenneté européenne, qui s'ajoute à la citoyenneté nationale."
          },
          {
            id: "emc2-ex2",
            question: "Comment appelle-t-on le fait de ne pas aller voter ?",
            type: "text",
            answer: "L'abstention",
            explanation: "L'abstention est le fait de ne pas participer à un vote. Elle pose un problème démocratique car elle réduit la représentativité des élus."
          }
        ],
        [
          { title: "Service-public.fr - Citoyenneté", url: "https://www.service-public.fr/", description: "Droits et démarches du citoyen." },
          { title: "Europa - Citoyenneté UE", url: "https://europa.eu/", description: "Vos droits en tant que citoyen européen." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "emc-3",
        "emc",
        "La justice en France",
        "La justice est un pilier de la démocratie. Elle garantit le respect des droits de chacun et sanctionne les infractions. En France, la justice est rendue au nom du peuple français.",
        [
          {
            title: "Les principes de la justice",
            content: "La justice française repose sur des principes fondamentaux :\n\n• ÉGALITÉ : tous sont égaux devant la loi\n• INDÉPENDANCE : les juges sont indépendants du pouvoir politique\n• GRATUITÉ : l'accès à la justice est gratuit\n• PUBLICITÉ : les audiences sont publiques (sauf exceptions)\n• DROIT À LA DÉFENSE : chacun peut être assisté d'un avocat\n• PRÉSOMPTION D'INNOCENCE : innocent jusqu'à preuve du contraire",
            examples: [
              "\"Nul ne peut être arbitrairement détenu\" - Déclaration des droits de l'homme et du citoyen (1789)"
            ]
          },
          {
            title: "Les différents tribunaux",
            content: "La justice est organisée en deux ordres :\n\n• ORDRE JUDICIAIRE (litiges entre personnes, infractions) :\n  - Civil : tribunal judiciaire (litiges entre particuliers)\n  - Pénal : tribunal de police (contraventions), tribunal correctionnel (délits), cour d'assises (crimes)\n\n• ORDRE ADMINISTRATIF (litiges avec l'administration) :\n  - Tribunal administratif, Cour administrative d'appel, Conseil d'État\n\nLes mineurs sont jugés par des juridictions spécialisées (juge des enfants, tribunal pour enfants)."
          },
          {
            title: "Les sanctions et la réinsertion",
            content: "Les sanctions varient selon la gravité :\n\n• Contraventions : amendes\n• Délits : prison (jusqu'à 10 ans), amendes, travaux d'intérêt général\n• Crimes : réclusion criminelle (15 ans à perpétuité)\n\nLa justice vise aussi la réinsertion :\n• Suivi socio-judiciaire\n• Mesures éducatives pour les mineurs\n• Aménagements de peine (bracelet électronique, semi-liberté)"
          }
        ],
        [
          "Principes : égalité, indépendance, gratuité, présomption d'innocence",
          "Deux ordres : judiciaire (civil/pénal) et administratif",
          "Infractions : contraventions < délits < crimes",
          "Droit à la défense : avocat, recours en appel",
          "Double fonction : sanctionner et réinsérer"
        ],
        [
          {
            id: "emc3-ex1",
            question: "Quel tribunal juge les crimes ?",
            type: "multiple-choice",
            options: ["Tribunal de police", "Tribunal correctionnel", "Cour d'assises", "Tribunal judiciaire"],
            answer: "Cour d'assises",
            explanation: "La cour d'assises juge les crimes, les infractions les plus graves (meurtre, viol...). Elle est composée de magistrats professionnels et de jurés citoyens."
          },
          {
            id: "emc3-ex2",
            question: "Comment s'appelle le principe selon lequel on est innocent jusqu'à preuve du contraire ?",
            type: "text",
            answer: "La présomption d'innocence",
            explanation: "La présomption d'innocence signifie que toute personne est considérée comme innocente tant que sa culpabilité n'a pas été prouvée."
          }
        ],
        [
          { title: "Justice.gouv.fr", url: "https://www.justice.gouv.fr/", description: "Le portail du ministère de la Justice." },
          { title: "Vie publique - Justice", url: "https://www.vie-publique.fr/", description: "Comprendre le fonctionnement de la justice." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "emc-4",
        "emc",
        "Médias, liberté d'expression et esprit critique",
        "Dans une démocratie, la liberté d'expression est un droit fondamental. Les médias jouent un rôle essentiel d'information, mais il est nécessaire de développer son esprit critique face à l'information.",
        [
          {
            title: "La liberté d'expression",
            content: "La liberté d'expression est un droit fondamental :\n\n• Déclaration des droits de l'homme (1789) : article 11\n• Convention européenne des droits de l'homme : article 10\n\nElle inclut :\n• Liberté d'opinion : penser ce que l'on veut\n• Liberté de la presse : pluralisme des médias\n• Liberté d'information : accès à l'information\n\nLimites : diffamation, injure, incitation à la haine, atteinte à la vie privée",
            examples: [
              "La loi du 29 juillet 1881 garantit la liberté de la presse en France."
            ]
          },
          {
            title: "Le rôle des médias",
            content: "Les médias ont plusieurs fonctions :\n\n• INFORMER : rapporter les faits, expliquer l'actualité\n• FORMER L'OPINION : analyses, débats, éditoriaux\n• DIVERTIR : émissions culturelles, sportives\n• CONTRÔLER : \"4ème pouvoir\" - surveiller les autres pouvoirs\n\nLe pluralisme des médias (diversité des opinions) est essentiel pour la démocratie.\n\nAttention aux biais : ligne éditoriale, propriétaires des médias, course à l'audience."
          },
          {
            title: "Développer son esprit critique",
            content: "Face à l'information, il faut :\n\n• VÉRIFIER la source : qui est l'auteur ? Est-ce fiable ?\n• CROISER les informations : comparer plusieurs sources\n• DISTINGUER fait et opinion : le fait est vérifiable, l'opinion est subjective\n• DÉTECTER les fake news : images manipulées, titres racoleurs\n\nOutre les médias traditionnels, les réseaux sociaux diffusent de l'information (parfois fausse) : prudence et vérification sont nécessaires."
          }
        ],
        [
          "Liberté d'expression = droit fondamental (art. 11 DDHC)",
          "Limites : diffamation, injure, incitation à la haine",
          "Médias = informer, former, divertir, contrôler",
          "Pluralisme des médias essentiel pour la démocratie",
          "Esprit critique : vérifier les sources, croiser les informations, détecter les fake news"
        ],
        [
          {
            id: "emc4-ex1",
            question: "Quel article de la Déclaration des droits de l'homme garantit la liberté d'expression ?",
            type: "multiple-choice",
            options: ["Article 1", "Article 5", "Article 11", "Article 17"],
            answer: "Article 11",
            explanation: "L'article 11 de la Déclaration des droits de l'homme et du citoyen (1789) proclame : \"La libre communication des pensées et des opinions est un des droits les plus précieux de l'Homme.\""
          },
          {
            id: "emc4-ex2",
            question: "Comment appelle-t-on les fausses informations circulant sur internet ?",
            type: "text",
            answer: "Fake news (ou infox)",
            explanation: "Les fake news (ou infox en français) sont des informations fausses délibérément créées pour tromper. Elles se propagent rapidement sur les réseaux sociaux."
          }
        ],
        [
          { title: "CLEMI", url: "https://www.clemi.fr/", description: "Centre pour l'éducation aux médias et à l'information." },
          { title: "Les Décodeurs - Le Monde", url: "https://www.lemonde.fr/les-decodeurs/", description: "Vérification des informations et fact-checking." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  },
  {
    id: "svt",
    name: "SVT",
    icon: "leaf",
    description: "Sciences de la vie et de la Terre : génétique, évolution, système immunitaire, planète Terre.",
    color: "#2D6A4F",
    chapters: [
      createChapter(
        "svt-1",
        "svt",
        "La génétique et l'hérédité",
        "Chaque être vivant possède des caractères héréditaires transmis par ses parents. Ces caractères sont portés par les gènes, situés sur les chromosomes.",
        [
          {
            title: "Chromosomes et gènes",
            content: "L'information génétique est contenue dans le noyau des cellules :\n\n• Chromosomes : structures en forme de X visibles lors de la division cellulaire\n  - Humain : 23 paires = 46 chromosomes\n  - Paire 23 : chromosomes sexuels (XX = femme, XY = homme)\n\n• Gènes : portions de chromosome portant un caractère héréditaire\n  - Chaque gène peut exister sous différentes versions = allèles\n  - Allèle dominant (s'exprime toujours) / récessif (s'exprime si 2 copies)",
            examples: [
              "Le gène de la couleur des yeux peut avoir l'allèle \"marron\" (dominant) ou \"bleu\" (récessif)."
            ]
          },
          {
            title: "L'ADN",
            content: "L'ADN (Acide DésoxyriboNucléique) est la molécule de l'hérédité :\n\n• Structure : double hélice composée de 4 bases azotées (A, T, G, C)\n• Les bases sont complémentaires : A-T et G-C\n• La séquence des bases constitue le code génétique\n\nL'ADN contient les \"instructions\" pour fabriquer les protéines qui déterminent nos caractères."
          },
          {
            title: "La transmission des caractères",
            content: "Lors de la reproduction :\n\n• Chaque parent transmet la moitié de ses chromosomes (23)\n• L'enfant reçoit 46 chromosomes (23 du père + 23 de la mère)\n• Les allèles se recombinent, créant un individu unique\n\nMaladies génétiques : causées par des mutations (modifications de l'ADN)\n• Mucoviscidose, drépanocytose, trisomie 21 (3 chromosomes 21)"
          }
        ],
        [
          "Chromosome = structure portant les gènes (23 paires chez l'humain)",
          "Gène = portion de chromosome codant un caractère",
          "Allèles = versions d'un gène (dominant/récessif)",
          "ADN = molécule en double hélice (bases A, T, G, C)",
          "Hérédité : 23 chromosomes de chaque parent"
        ],
        [
          {
            id: "svt1-ex1",
            question: "Combien de paires de chromosomes possède un humain ?",
            type: "multiple-choice",
            options: ["22", "23", "46", "92"],
            answer: "23",
            explanation: "L'être humain possède 23 paires de chromosomes, soit 46 chromosomes au total. La 23ème paire détermine le sexe (XX ou XY)."
          },
          {
            id: "svt1-ex2",
            question: "Quelle molécule porte l'information génétique ?",
            type: "text",
            answer: "L'ADN",
            explanation: "L'ADN (Acide DésoxyriboNucléique) est la molécule qui porte l'information génétique sous forme de séquences de bases azotées."
          }
        ],
        [
          { title: "Lumni - Génétique", url: "https://www.lumni.fr/dossier/genetique", description: "Comprendre la génétique en vidéos." },
          { title: "Khan Academy - Biologie", url: "https://fr.khanacademy.org/science/biology", description: "Cours sur l'ADN et l'hérédité." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "svt-2",
        "svt",
        "Le système immunitaire",
        "Notre corps est constamment exposé à des micro-organismes. Le système immunitaire nous défend contre ces agressions grâce à différents mécanismes.",
        [
          {
            title: "Les barrières naturelles",
            content: "Notre corps possède des protections naturelles :\n\n• La peau : barrière physique imperméable\n• Les muqueuses : nez, bouche, intestin... + mucus qui piège les microbes\n• Les larmes, la salive : contiennent des enzymes antibactériennes\n\nSi un microbe franchit ces barrières, le système immunitaire entre en action."
          },
          {
            title: "La réaction immunitaire",
            content: "Deux types de réponses immunitaires :\n\n• RÉPONSE INNÉE (rapide, non spécifique) :\n  - Phagocytose : les phagocytes \"mangent\" les microbes\n  - Réaction inflammatoire : rougeur, chaleur, gonflement\n\n• RÉPONSE ADAPTATIVE (lente, spécifique) :\n  - Lymphocytes B : produisent des anticorps contre un antigène précis\n  - Lymphocytes T : détruisent les cellules infectées\n  - Mémoire immunitaire : l'organisme reconnaît un microbe déjà rencontré",
            examples: [
              "Après avoir eu la varicelle, on est généralement immunisé à vie grâce à la mémoire immunitaire."
            ]
          },
          {
            title: "La vaccination",
            content: "Le vaccin stimule la mémoire immunitaire :\n\n• On injecte un antigène inoffensif (microbe affaibli ou tué)\n• Le corps produit des anticorps et des cellules mémoires\n• Lors d'une vraie infection, la réponse est rapide et efficace\n\nVaccination = protection individuelle + collective (immunité de groupe)\n\nExemples : vaccins contre la rougeole, le tétanos, la grippe, le COVID-19..."
          }
        ],
        [
          "Barrières naturelles : peau, muqueuses, sécrétions",
          "Réponse innée : phagocytose, inflammation (rapide, non spécifique)",
          "Réponse adaptative : anticorps, lymphocytes (lente, spécifique)",
          "Mémoire immunitaire : protection durable après contact",
          "Vaccination : stimule la mémoire sans provoquer la maladie"
        ],
        [
          {
            id: "svt2-ex1",
            question: "Quel type de cellule produit les anticorps ?",
            type: "multiple-choice",
            options: ["Phagocytes", "Lymphocytes B", "Lymphocytes T", "Globules rouges"],
            answer: "Lymphocytes B",
            explanation: "Les lymphocytes B sont responsables de la production d'anticorps, des protéines spécifiques qui neutralisent les antigènes (microbes)."
          },
          {
            id: "svt2-ex2",
            question: "Comment appelle-t-on le processus par lequel les phagocytes détruisent les microbes ?",
            type: "text",
            answer: "La phagocytose",
            explanation: "La phagocytose est le mécanisme par lequel les phagocytes englobent et digèrent les micro-organismes pathogènes."
          }
        ],
        [
          { title: "Vaccination Info Service", url: "https://vaccination-info-service.fr/", description: "Tout savoir sur les vaccins." },
          { title: "Inserm - Immunité", url: "https://www.inserm.fr/", description: "Recherches sur le système immunitaire." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "svt-3",
        "svt",
        "L'évolution des êtres vivants",
        "La biodiversité actuelle est le résultat de millions d'années d'évolution. Les espèces changent au cours du temps, certaines disparaissent, de nouvelles apparaissent.",
        [
          {
            title: "Les preuves de l'évolution",
            content: "Plusieurs indices montrent que les espèces évoluent :\n\n• FOSSILES : traces d'organismes passés montrant des formes intermédiaires\n• ANATOMIE COMPARÉE : similitudes entre espèces (squelette des vertébrés)\n• EMBRYOLOGIE : ressemblances des embryons entre espèces proches\n• GÉNÉTIQUE : plus les espèces sont proches, plus leur ADN est similaire",
            examples: [
              "L'archéoptéryx est un fossile montrant une forme intermédiaire entre reptiles et oiseaux."
            ]
          },
          {
            title: "Les mécanismes de l'évolution",
            content: "L'évolution se produit par sélection naturelle (Darwin) :\n\n1. Les individus d'une espèce présentent des variations héréditaires\n2. Certaines variations sont avantageuses dans un environnement donné\n3. Les individus les mieux adaptés survivent et se reproduisent davantage\n4. Les caractères avantageux deviennent plus fréquents\n\nAu fil des générations, l'espèce change et peut donner naissance à de nouvelles espèces (spéciation)."
          },
          {
            title: "L'arbre du vivant",
            content: "Les espèces actuelles ont des ancêtres communs :\n\n• Tous les êtres vivants descendent d'un ancêtre commun (LUCA)\n• L'évolution produit un arbre généalogique du vivant\n• Plus deux espèces partagent de caractères, plus leur ancêtre commun est récent\n\nL'humain n'est pas \"plus évolué\" que les autres espèces : toutes sont le résultat de la même durée d'évolution."
          }
        ],
        [
          "Preuves : fossiles, anatomie comparée, embryologie, génétique",
          "Sélection naturelle : les mieux adaptés survivent et se reproduisent",
          "Variations + sélection = évolution des espèces",
          "Toutes les espèces ont des ancêtres communs",
          "L'évolution est un fait scientifique, pas une opinion"
        ],
        [
          {
            id: "svt3-ex1",
            question: "Qui a proposé la théorie de l'évolution par sélection naturelle ?",
            type: "multiple-choice",
            options: ["Mendel", "Darwin", "Pasteur", "Newton"],
            answer: "Darwin",
            explanation: "Charles Darwin a proposé la théorie de l'évolution par sélection naturelle dans son livre \"L'Origine des espèces\" (1859)."
          },
          {
            id: "svt3-ex2",
            question: "Comment appelle-t-on les traces d'organismes anciens conservées dans la roche ?",
            type: "text",
            answer: "Les fossiles",
            explanation: "Les fossiles sont des restes ou empreintes d'êtres vivants du passé conservés dans les roches sédimentaires."
          }
        ],
        [
          { title: "Muséum national d'histoire naturelle", url: "https://www.mnhn.fr/", description: "Ressources sur l'évolution et la biodiversité." },
          { title: "Lumni - Évolution", url: "https://www.lumni.fr/dossier/evolution", description: "Comprendre l'évolution du vivant." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "svt-4",
        "svt",
        "La Terre, une planète active",
        "La Terre est une planète dynamique : séismes, volcans, mouvements des continents... Ces phénomènes sont liés à l'activité interne de notre planète.",
        [
          {
            title: "Structure du globe terrestre",
            content: "La Terre est composée de couches concentriques :\n\n• CROÛTE : fine couche en surface (5-70 km)\n  - Croûte océanique (basalte) et continentale (granite)\n• MANTEAU : roche chaude (2900 km d'épaisseur)\n• NOYAU : fer et nickel (3500 km de rayon)\n  - Noyau externe liquide + noyau interne solide\n\nLa lithosphère (croûte + manteau supérieur rigide) repose sur l'asthénosphère (manteau visqueux)."
          },
          {
            title: "La tectonique des plaques",
            content: "La lithosphère est découpée en plaques qui bougent :\n\n• 12 grandes plaques + plusieurs plaques secondaires\n• Mouvement de quelques cm par an (convection du manteau)\n\nAux limites des plaques :\n• DORSALES (divergence) : plaques qui s'écartent, création de lithosphère\n• SUBDUCTION (convergence) : une plaque s'enfonce sous l'autre\n• FAILLES TRANSFORMANTES : plaques qui coulissent\n\nCes mouvements expliquent la répartition des séismes et des volcans.",
            examples: [
              "L'océan Atlantique s'agrandit de 2,5 cm par an grâce à la dorsale médio-atlantique."
            ]
          },
          {
            title: "Séismes et volcans",
            content: "Ces phénomènes sont liés aux mouvements des plaques :\n\n• SÉISMES : rupture brutale de roches libérant de l'énergie\n  - Foyer (point de rupture), épicentre (surface au-dessus du foyer)\n  - Magnitude (échelle de Richter) : intensité du séisme\n\n• VOLCANS : remontée de magma à la surface\n  - Éruptifs (explosifs) : subduction (montagne)\n  - Effusifs (coulées) : dorsales, points chauds (Hawaï)\n\nPrévention : surveillance, normes de construction parasismique."
          }
        ],
        [
          "Structure : croûte < manteau < noyau",
          "Lithosphère découpée en plaques tectoniques",
          "Mouvements : divergence, convergence, coulissement",
          "Séismes et volcans localisés aux limites des plaques",
          "Prévention des risques : surveillance et normes de construction"
        ],
        [
          {
            id: "svt4-ex1",
            question: "Comment appelle-t-on le point à la surface de la Terre situé juste au-dessus du foyer d'un séisme ?",
            type: "multiple-choice",
            options: ["Le foyer", "L'épicentre", "La faille", "La dorsale"],
            answer: "L'épicentre",
            explanation: "L'épicentre est le point à la surface de la Terre situé à la verticale du foyer (lieu de rupture des roches en profondeur)."
          },
          {
            id: "svt4-ex2",
            question: "Quelle est l'unité de mesure de l'intensité d'un séisme ?",
            type: "text",
            answer: "La magnitude (échelle de Richter)",
            explanation: "La magnitude, mesurée sur l'échelle de Richter, quantifie l'énergie libérée par un séisme. Chaque degré correspond à une énergie 30 fois supérieure."
          }
        ],
        [
          { title: "BRGM - Géologie", url: "https://www.brgm.fr/", description: "Bureau de recherches géologiques et minières." },
          { title: "Lumni - Géologie", url: "https://www.lumni.fr/dossier/geologie", description: "La structure de la Terre et la tectonique des plaques." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  },
  {
    id: "physique",
    name: "Physique-Chimie",
    icon: "atom",
    description: "Matière, énergie, électricité, mécanique, chimie pour le brevet.",
    color: "#F77F00",
    chapters: [
      createChapter(
        "phys-1",
        "physique",
        "L'énergie et ses transformations",
        "L'énergie existe sous différentes formes et peut passer de l'une à l'autre. C'est une notion centrale en physique et dans notre vie quotidienne.",
        [
          {
            title: "Les formes d'énergie",
            content: "L'énergie peut prendre plusieurs formes :\n\n• Énergie cinétique : liée au mouvement (Ec = ½mv²)\n• Énergie potentielle : liée à la position (Ep = mgh)\n• Énergie thermique : liée à la température\n• Énergie électrique : liée au courant électrique\n• Énergie lumineuse : transportée par la lumière\n• Énergie chimique : stockée dans les liaisons moléculaires\n• Énergie nucléaire : dans le noyau des atomes",
            examples: [
              "Une voiture en mouvement possède de l'énergie cinétique. Lorsqu'elle freine, cette énergie se transforme en chaleur (énergie thermique)."
            ]
          },
          {
            title: "Conservation et transfert d'énergie",
            content: "L'énergie obéit à une loi fondamentale :\n\nLOI DE CONSERVATION : L'énergie ne peut être ni créée ni détruite, seulement transformée.\n\nTransferts d'énergie :\n• Par travail mécanique (force × déplacement)\n• Par transfert thermique (chaleur)\n• Par rayonnement (lumière)\n\nLes conversions impliquent souvent des pertes (énergie dissipée en chaleur)."
          },
          {
            title: "Sources et production d'énergie",
            content: "Les sources d'énergie se classent en :\n\n• RENOUVELABLES : inépuisables à l'échelle humaine\n  - Solaire, éolien, hydraulique, biomasse, géothermie\n\n• NON RENOUVELABLES : stocks limités\n  - Fossiles (charbon, pétrole, gaz)\n  - Nucléaire (uranium)\n\nEnjeux : limiter les émissions de CO2, développer les énergies propres, économiser l'énergie."
          }
        ],
        [
          "Énergie = grandeur qui se conserve et se transforme",
          "Formes : cinétique, potentielle, thermique, électrique, chimique...",
          "Conservation : l'énergie totale reste constante",
          "Renouvelables : solaire, éolien, hydraulique",
          "Enjeux : transition énergétique, réduction des émissions de CO2"
        ],
        [
          {
            id: "phys1-ex1",
            question: "Quelle forme d'énergie possède un objet en mouvement ?",
            type: "multiple-choice",
            options: ["Énergie potentielle", "Énergie cinétique", "Énergie thermique", "Énergie chimique"],
            answer: "Énergie cinétique",
            explanation: "L'énergie cinétique est l'énergie liée au mouvement. Elle dépend de la masse et de la vitesse de l'objet (Ec = ½mv²)."
          },
          {
            id: "phys1-ex2",
            question: "Citez deux sources d'énergie renouvelables.",
            type: "text",
            answer: "Solaire, éolien (ou hydraulique, biomasse, géothermie)",
            explanation: "Les énergies renouvelables sont inépuisables à l'échelle humaine : solaire, éolien, hydraulique, biomasse, géothermie..."
          }
        ],
        [
          { title: "CEA - Énergie", url: "https://www.cea.fr/comprendre/Pages/energie/", description: "Tout savoir sur les énergies." },
          { title: "Lumni - Énergie", url: "https://www.lumni.fr/dossier/energie", description: "Les formes et sources d'énergie expliquées." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "phys-2",
        "physique",
        "L'électricité",
        "L'électricité est omniprésente dans notre quotidien. Comprendre les circuits électriques et les lois qui les régissent est essentiel.",
        [
          {
            title: "Le courant électrique",
            content: "Le courant électrique est un déplacement de charges :\n\n• Dans les métaux : déplacement d'électrons\n• Sens conventionnel : du + vers le - (inverse du sens réel des électrons)\n\nGrandeurs électriques :\n• Intensité (I) : quantité de charges par seconde (en Ampères, A)\n• Tension (U) : \"pression\" qui pousse les charges (en Volts, V)\n• Résistance (R) : opposition au passage du courant (en Ohms, Ω)",
            examples: [
              "Une pile AA fournit une tension de 1,5 V. Une prise électrique fournit du courant alternatif à 230 V."
            ]
          },
          {
            title: "Les lois des circuits",
            content: "Deux types de montages :\n\n• CIRCUIT SÉRIE : un seul chemin pour le courant\n  - L'intensité est la même partout : I = I1 = I2\n  - Les tensions s'additionnent : U = U1 + U2\n\n• CIRCUIT PARALLÈLE (dérivation) : plusieurs chemins\n  - La tension est la même aux bornes de chaque branche\n  - Les intensités s'additionnent : I = I1 + I2\n\nLoi d'Ohm : U = R × I"
          },
          {
            title: "Puissance et énergie électrique",
            content: "• PUISSANCE (P) : énergie consommée par unité de temps\n  P = U × I (en Watts, W)\n\n• ÉNERGIE (E) : puissance × temps\n  E = P × t (en Joules, ou en kWh)\n\nSécurité électrique :\n• Disjoncteur : coupe le circuit en cas de surintensité\n• Prise de terre : évacue les courants de fuite\n• Fusibles : protègent les appareils",
            examples: [
              "Une ampoule de 60 W allumée 5 heures consomme : E = 60 × 5 = 300 Wh = 0,3 kWh"
            ]
          }
        ],
        [
          "Intensité (I) en Ampères, Tension (U) en Volts, Résistance (R) en Ohms",
          "Loi d'Ohm : U = R × I",
          "Circuit série : même I, tensions s'additionnent",
          "Circuit parallèle : même U, intensités s'additionnent",
          "Puissance P = U × I (en Watts)"
        ],
        [
          {
            id: "phys2-ex1",
            question: "Quelle est la formule de la loi d'Ohm ?",
            type: "multiple-choice",
            options: ["U = R + I", "U = R × I", "U = R / I", "U = R - I"],
            answer: "U = R × I",
            explanation: "La loi d'Ohm établit que la tension U aux bornes d'un conducteur ohmique est égale au produit de sa résistance R par l'intensité I : U = R × I."
          },
          {
            id: "phys2-ex2",
            question: "Calcule l'intensité si U = 12 V et R = 4 Ω.",
            type: "text",
            answer: "3 A",
            explanation: "D'après la loi d'Ohm : I = U / R = 12 / 4 = 3 A"
          }
        ],
        [
          { title: "PhET - Simulations", url: "https://phet.colorado.edu/fr/simulations/filter?subjects=physics", description: "Simulations interactives d'électricité." },
          { title: "Lumni - Électricité", url: "https://www.lumni.fr/dossier/electricite", description: "Comprendre les circuits électriques." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "phys-3",
        "physique",
        "La structure de la matière",
        "Toute la matière est constituée d'atomes. Comprendre la structure de l'atome permet d'expliquer les propriétés de la matière et les réactions chimiques.",
        [
          {
            title: "L'atome",
            content: "L'atome est la plus petite unité de matière :\n\n• NOYAU (au centre) : protons (+) et neutrons (0)\n  - Très petit mais contient presque toute la masse\n\n• ÉLECTRONS (-) : tournent autour du noyau\n  - Même nombre que les protons (atome neutre)\n\nCaractéristiques :\n• Numéro atomique Z = nombre de protons\n• Nombre de masse A = protons + neutrons\n• Taille : environ 10⁻¹⁰ m",
            examples: [
              "L'atome de carbone : Z = 6 (6 protons, 6 électrons), A = 12 (6 protons + 6 neutrons)"
            ]
          },
          {
            title: "Les ions et les molécules",
            content: "• ION : atome ayant gagné ou perdu des électrons\n  - Cation (+) : a perdu des électrons (ex : Na⁺)\n  - Anion (-) : a gagné des électrons (ex : Cl⁻)\n\n• MOLÉCULE : assemblage d'atomes liés par des liaisons covalentes\n  - Formule chimique : indique les atomes et leur nombre\n  - Ex : H₂O (2 hydrogènes + 1 oxygène = eau)"
          },
          {
            title: "La classification périodique",
            content: "Le tableau périodique classe les éléments :\n\n• 118 éléments connus\n• Classés par numéro atomique croissant\n• Les colonnes (familles) regroupent des éléments aux propriétés similaires\n\nFamilles importantes :\n• Colonne 1 : métaux alcalins (Li, Na, K...)\n• Colonne 17 : halogènes (F, Cl, Br...)\n• Colonne 18 : gaz nobles (He, Ne, Ar...)"
          }
        ],
        [
          "Atome = noyau (protons + neutrons) + électrons",
          "Z = nombre de protons = nombre d'électrons (atome neutre)",
          "Ion = atome avec excès ou déficit d'électrons",
          "Molécule = atomes liés (ex : H₂O, CO₂)",
          "Tableau périodique : classement des éléments par propriétés"
        ],
        [
          {
            id: "phys3-ex1",
            question: "Quelles sont les particules situées dans le noyau de l'atome ?",
            type: "multiple-choice",
            options: ["Électrons et protons", "Protons et neutrons", "Électrons et neutrons", "Seulement des protons"],
            answer: "Protons et neutrons",
            explanation: "Le noyau de l'atome contient les protons (charge +) et les neutrons (sans charge). Les électrons (charge -) gravitent autour du noyau."
          },
          {
            id: "phys3-ex2",
            question: "Combien d'atomes d'oxygène dans la molécule CO₂ ?",
            type: "text",
            answer: "2",
            explanation: "Dans la formule CO₂, l'indice 2 après O indique qu'il y a 2 atomes d'oxygène pour 1 atome de carbone."
          }
        ],
        [
          { title: "CEA - Atome", url: "https://www.cea.fr/comprendre/Pages/matiere-univers/", description: "La structure de la matière expliquée." },
          { title: "PhET - Simulations atomiques", url: "https://phet.colorado.edu/fr/simulations/filter?subjects=chemistry", description: "Visualiser les atomes et molécules." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "phys-4",
        "physique",
        "Les réactions chimiques",
        "Une réaction chimique est une transformation de la matière : les réactifs sont transformés en produits. Les atomes sont conservés mais réarrangés.",
        [
          {
            title: "Transformation chimique",
            content: "Lors d'une réaction chimique :\n\n• Les RÉACTIFS (substances de départ) sont consommés\n• Des PRODUITS (nouvelles substances) sont formés\n• Les atomes sont conservés (pas de création ni destruction)\n\nÉquation-bilan : représente la réaction\n• Réactifs → Produits\n• L'équation doit être équilibrée (même nombre de chaque atome)",
            examples: [
              "Combustion du méthane : CH₄ + 2O₂ → CO₂ + 2H₂O"
            ]
          },
          {
            title: "Conservation de la masse",
            content: "Loi de Lavoisier :\n\"Rien ne se perd, rien ne se crée, tout se transforme.\"\n\nLa masse totale des réactifs = masse totale des produits\n\nPour équilibrer une équation :\n1. Compter les atomes de chaque élément de chaque côté\n2. Ajouter des coefficients devant les formules\n3. Vérifier l'équilibre"
          },
          {
            title: "Exemples de réactions",
            content: "• COMBUSTION : réaction avec le dioxygène\n  Combustible + O₂ → CO₂ + H₂O (+ énergie)\n\n• RÉACTION ACIDE-BASE : transfert de H⁺\n  Acide + Base → Sel + Eau\n\n• OXYDATION DES MÉTAUX : formation de rouille\n  Fe + O₂ + H₂O → rouille (oxyde de fer hydraté)\n\nIndices d'une réaction : changement de couleur, dégagement gazeux, précipité, variation de température..."
          }
        ],
        [
          "Réaction chimique : réactifs → produits",
          "Conservation des atomes : équation équilibrée",
          "Conservation de la masse (Lavoisier)",
          "Combustion : combustible + O₂ → CO₂ + H₂O",
          "Indices : couleur, gaz, précipité, température"
        ],
        [
          {
            id: "phys4-ex1",
            question: "Qui a énoncé la loi de conservation de la masse ?",
            type: "multiple-choice",
            options: ["Newton", "Einstein", "Lavoisier", "Darwin"],
            answer: "Lavoisier",
            explanation: "Antoine Lavoisier (XVIIIe siècle) a énoncé la loi de conservation de la masse : \"Rien ne se perd, rien ne se crée, tout se transforme.\""
          },
          {
            id: "phys4-ex2",
            question: "Quels sont les produits de la combustion complète du méthane ?",
            type: "text",
            answer: "CO₂ et H₂O (dioxyde de carbone et eau)",
            explanation: "La combustion complète du méthane (CH₄) produit du dioxyde de carbone (CO₂) et de l'eau (H₂O) : CH₄ + 2O₂ → CO₂ + 2H₂O"
          }
        ],
        [
          { title: "Lumni - Chimie", url: "https://www.lumni.fr/dossier/chimie", description: "Les réactions chimiques expliquées." },
          { title: "PhET - Réactions chimiques", url: "https://phet.colorado.edu/fr/", description: "Simulations de réactions chimiques." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  },
  {
    id: "technologie",
    name: "Technologie",
    icon: "cpu",
    description: "Informatique, programmation, systèmes techniques, design et innovation.",
    color: "#3A86FF",
    chapters: [
      createChapter(
        "tech-1",
        "technologie",
        "Algorithmique et programmation",
        "L'algorithmique est l'art de résoudre des problèmes par des séquences d'instructions. La programmation permet de traduire ces algorithmes en langage informatique.",
        [
          {
            title: "Qu'est-ce qu'un algorithme ?",
            content: "Un algorithme est une suite d'instructions ordonnées pour résoudre un problème :\n\n• Données d'entrée (input)\n• Traitement (instructions)\n• Résultat de sortie (output)\n\nStructures de base :\n• SÉQUENCE : instructions exécutées dans l'ordre\n• CONDITION (SI... ALORS... SINON) : choix selon un test\n• BOUCLE (RÉPÉTER... TANT QUE) : répétition d'instructions",
            examples: [
              "Algorithme pour calculer la moyenne : 1) Additionner les notes 2) Diviser par le nombre de notes 3) Afficher le résultat"
            ]
          },
          {
            title: "Variables et opérateurs",
            content: "• VARIABLE : \"boîte\" qui stocke une valeur\n  - Nom : identifie la variable (note, age, prenom)\n  - Valeur : contenu de la variable (15, 14, \"Jean\")\n  - Type : nombre, texte, booléen (vrai/faux)\n\n• OPÉRATEURS :\n  - Arithmétiques : +, -, *, /, % (modulo)\n  - Comparaison : =, ≠, <, >, ≤, ≥\n  - Logiques : ET, OU, NON"
          },
          {
            title: "Programmation avec Scratch",
            content: "Scratch est un langage de programmation visuel :\n\n• Blocs colorés à assembler\n• Pas de syntaxe à apprendre\n• Idéal pour débuter\n\nPrincipaux types de blocs :\n• Mouvement (déplacer, tourner)\n• Apparence (dire, changer de costume)\n• Son (jouer un son)\n• Événements (quand drapeau vert cliqué)\n• Contrôle (si, répéter, attendre)\n• Capteurs (touche pressée, souris)"
          }
        ],
        [
          "Algorithme = suite ordonnée d'instructions pour résoudre un problème",
          "Structures : séquence, condition (SI), boucle (RÉPÉTER)",
          "Variable : stocke une donnée (nombre, texte, booléen)",
          "Opérateurs : arithmétiques, comparaison, logiques",
          "Scratch : langage visuel par blocs pour apprendre à programmer"
        ],
        [
          {
            id: "tech1-ex1",
            question: "Quelle structure permet de répéter des instructions ?",
            type: "multiple-choice",
            options: ["La séquence", "La condition SI", "La boucle", "La variable"],
            answer: "La boucle",
            explanation: "Une boucle (RÉPÉTER, TANT QUE) permet de répéter un bloc d'instructions plusieurs fois, jusqu'à ce qu'une condition soit remplie."
          },
          {
            id: "tech1-ex2",
            question: "Comment appelle-t-on une 'boîte' qui stocke une valeur en programmation ?",
            type: "text",
            answer: "Une variable",
            explanation: "Une variable est un espace de stockage nommé qui contient une valeur (nombre, texte...) pouvant être modifiée au cours du programme."
          }
        ],
        [
          { title: "Scratch", url: "https://scratch.mit.edu/", description: "Crée des histoires, jeux et animations avec Scratch." },
          { title: "France-ioi", url: "https://www.france-ioi.org/", description: "Entraîne-toi à la programmation." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "tech-2",
        "technologie",
        "Les objets techniques et leur évolution",
        "Les objets techniques répondent à des besoins humains. Ils évoluent au fil du temps grâce aux progrès scientifiques et aux changements de société.",
        [
          {
            title: "Du besoin à l'objet technique",
            content: "Un objet technique est conçu pour répondre à un besoin :\n\n• BESOIN : ce que l'utilisateur recherche (se déplacer, communiquer, se nourrir...)\n• FONCTION D'USAGE : à quoi sert l'objet (transporter des personnes)\n• FONCTION D'ESTIME : aspect, style, image de marque\n\nLe cahier des charges définit les contraintes :\n• Techniques (résistance, poids...)\n• Économiques (coût)\n• Environnementales (recyclage, énergie)\n• Esthétiques (design)"
          },
          {
            title: "L'évolution des objets",
            content: "Les objets techniques évoluent grâce à :\n\n• PROGRÈS SCIENTIFIQUES : nouveaux matériaux, nouvelles technologies\n• ÉVOLUTION DES BESOINS : société, modes de vie\n• CONTRAINTES ENVIRONNEMENTALES : durabilité, recyclage\n\nExemples d'évolution :\n• Téléphone : fixe → mobile → smartphone\n• Véhicule : calèche → voiture à essence → voiture électrique\n• Stockage : disquette → CD → clé USB → cloud",
            examples: [
              "Le vélo a évolué : plus léger (carbone), plus sûr (freins à disques), électrique (VAE)."
            ]
          },
          {
            title: "Le cycle de vie d'un objet",
            content: "Tout objet technique suit un cycle :\n\n1. CONCEPTION : idée, cahier des charges, prototypage\n2. FABRICATION : matières premières, production industrielle\n3. UTILISATION : par le consommateur\n4. FIN DE VIE : recyclage, réutilisation, déchet\n\nL'analyse du cycle de vie (ACV) évalue l'impact environnemental à chaque étape.\n\nÉcoconception : concevoir en minimisant l'impact sur l'environnement."
          }
        ],
        [
          "Objet technique = répond à un besoin humain",
          "Fonctions : usage (utilité) et estime (apparence)",
          "Évolution grâce aux progrès techniques et aux besoins",
          "Cycle de vie : conception → fabrication → utilisation → fin de vie",
          "Écoconception : limiter l'impact environnemental"
        ],
        [
          {
            id: "tech2-ex1",
            question: "Comment appelle-t-on l'aspect et le design d'un objet ?",
            type: "multiple-choice",
            options: ["Fonction d'usage", "Fonction d'estime", "Fonction technique", "Fonction environnementale"],
            answer: "Fonction d'estime",
            explanation: "La fonction d'estime concerne l'apparence de l'objet, son design, son image de marque - ce qui le rend désirable au-delà de sa simple utilité."
          },
          {
            id: "tech2-ex2",
            question: "Citez les 4 étapes du cycle de vie d'un objet.",
            type: "text",
            answer: "Conception, fabrication, utilisation, fin de vie",
            explanation: "Le cycle de vie complet d'un objet comprend : sa conception (design), sa fabrication (production), son utilisation (par le consommateur), et sa fin de vie (recyclage ou déchet)."
          }
        ],
        [
          { title: "ADEME - Écoconception", url: "https://www.ademe.fr/", description: "Comprendre l'impact environnemental des produits." },
          { title: "Lumni - Technologie", url: "https://www.lumni.fr/dossier/technologie", description: "Les objets techniques et leur évolution." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "tech-3",
        "technologie",
        "Les réseaux et la communication",
        "Internet et les réseaux permettent d'échanger des informations à travers le monde. Comprendre leur fonctionnement est essentiel à l'ère du numérique.",
        [
          {
            title: "Les réseaux informatiques",
            content: "Un réseau connecte des équipements pour échanger des données :\n\n• LAN (Local Area Network) : réseau local (maison, école)\n• WAN (Wide Area Network) : réseau étendu\n• INTERNET : réseau mondial interconnectant des millions de réseaux\n\nÉquipements :\n• Ordinateurs, smartphones, tablettes (terminaux)\n• Box, routeur (connexion au réseau)\n• Switch (connexion entre appareils)\n• Serveurs (stockent et fournissent des données)",
            examples: [
              "Quand tu consultes un site web, ton ordinateur envoie une requête à un serveur qui renvoie les données du site."
            ]
          },
          {
            title: "Le protocole Internet",
            content: "Les données circulent selon des règles (protocoles) :\n\n• ADRESSE IP : identifie chaque appareil sur le réseau\n  - Ex : 192.168.1.1 (IPv4) ou 2001:0db8:... (IPv6)\n\n• PROTOCOLES DE COMMUNICATION :\n  - TCP/IP : découpe et achemine les données\n  - HTTP/HTTPS : pages web (S = sécurisé)\n  - FTP : transfert de fichiers\n  - SMTP/POP/IMAP : emails\n\n• DNS : traduit les noms de domaine en adresses IP"
          },
          {
            title: "Sécurité et usages responsables",
            content: "Protéger ses données sur Internet :\n\n• Mot de passe fort (long, varié, unique)\n• HTTPS : connexion sécurisée (cadenas dans le navigateur)\n• Antivirus et pare-feu\n• Ne pas partager d'informations sensibles\n\nUsages responsables :\n• Respecter le droit d'auteur et la vie privée\n• Identifier les fake news\n• Signaler les contenus illégaux\n• Limiter son temps d'écran"
          }
        ],
        [
          "Réseau : connexion d'équipements pour échanger des données",
          "Internet = réseau mondial de réseaux",
          "Adresse IP : identifiant unique de chaque appareil",
          "Protocoles : TCP/IP, HTTP(S), FTP, DNS...",
          "Sécurité : mot de passe fort, HTTPS, vigilance"
        ],
        [
          {
            id: "tech3-ex1",
            question: "Qu'est-ce qu'une adresse IP ?",
            type: "multiple-choice",
            options: ["Un mot de passe", "L'identifiant d'un appareil sur un réseau", "L'adresse d'un site web", "Un type de virus"],
            answer: "L'identifiant d'un appareil sur un réseau",
            explanation: "L'adresse IP (Internet Protocol) est un numéro unique qui identifie chaque appareil connecté à un réseau."
          },
          {
            id: "tech3-ex2",
            question: "Que signifie le 'S' dans HTTPS ?",
            type: "text",
            answer: "Secure (sécurisé)",
            explanation: "HTTPS signifie HyperText Transfer Protocol Secure. Le 'S' indique que la connexion est chiffrée et sécurisée."
          }
        ],
        [
          { title: "CNIL - Données personnelles", url: "https://www.cnil.fr/", description: "Protéger tes données sur Internet." },
          { title: "Lumni - Internet", url: "https://www.lumni.fr/dossier/internet", description: "Comprendre le fonctionnement d'Internet." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  },
  {
    id: "brevet",
    name: "Conseils pour le Brevet",
    icon: "mic",
    description: "Méthodologie, préparation à l'oral, gestion du stress et révisions efficaces.",
    color: "#9C27B0",
    chapters: [
      createChapter(
        "brevet-1",
        "brevet",
        "Préparer l'épreuve écrite",
        "Le brevet des collèges comporte des épreuves écrites en français, mathématiques, histoire-géographie-EMC et sciences. Une bonne préparation est essentielle pour réussir.",
        [
          {
            title: "Les épreuves du brevet",
            content: "Le brevet comprend :\n\n• FRANÇAIS (3h) : compréhension de texte, grammaire, dictée, rédaction\n  - 100 points\n\n• MATHÉMATIQUES (2h) : exercices variés, problème\n  - 100 points\n\n• HISTOIRE-GÉO-EMC (2h) : analyse de documents, développement construit\n  - 50 points\n\n• SCIENCES (1h) : 2 matières parmi SVT, Physique-Chimie, Technologie\n  - 50 points\n\nTotal : 300 points + 100 points pour l'oral + 400 points de contrôle continu",
            examples: [
              "Pour obtenir le brevet, il faut avoir au moins 400 points sur 800. Les mentions sont à 480, 560 et 640 points."
            ]
          },
          {
            title: "Réviser efficacement",
            content: "Stratégies de révision :\n\n• PLANIFIER : commencer tôt, répartir les matières\n• FICHES DE RÉVISION : résumer l'essentiel de chaque chapitre\n• S'ENTRAÎNER : faire des sujets d'annales\n• ESPACER : réviser régulièrement plutôt que tout à la dernière minute\n\nConseils pratiques :\n• Alterner les matières\n• Faire des pauses régulières (toutes les 45 min)\n• Bien dormir (le cerveau mémorise pendant le sommeil)\n• Réviser activement (réciter, expliquer à quelqu'un)"
          },
          {
            title: "Le jour de l'épreuve",
            content: "Être prêt le jour J :\n\nAVANT :\n• Préparer son matériel la veille\n• Bien dormir\n• Petit-déjeuner équilibré\n\nPENDANT :\n• Lire attentivement les consignes\n• Commencer par ce qu'on maîtrise\n• Gérer son temps (surveiller l'heure)\n• Se relire avant de rendre\n\nGÉRER LE STRESS :\n• Respirer profondément\n• Relativiser : ce n'est qu'un examen\n• Avoir confiance en son travail"
          }
        ],
        [
          "800 points au total : 400 épreuves + 400 contrôle continu",
          "Épreuves : français, maths, histoire-géo-EMC, sciences, oral",
          "Révisions : planifier, faire des fiches, s'entraîner aux annales",
          "Jour J : lire les consignes, gérer son temps, se relire",
          "Gestion du stress : respirer, relativiser, avoir confiance"
        ],
        [
          {
            id: "brevet1-ex1",
            question: "Combien de points faut-il pour obtenir le brevet ?",
            type: "multiple-choice",
            options: ["200 points", "300 points", "400 points", "500 points"],
            answer: "400 points",
            explanation: "Pour obtenir le brevet, il faut avoir au moins 400 points sur 800 (soit 50% du total)."
          },
          {
            id: "brevet1-ex2",
            question: "Citez deux conseils pour bien réviser.",
            type: "text",
            answer: "Faire des fiches de révision, s'entraîner avec des annales (ou autres réponses valides)",
            explanation: "Les bonnes pratiques de révision incluent : faire des fiches, s'entraîner aux annales, réviser régulièrement, bien dormir..."
          }
        ],
        [
          { title: "Éduscol - Brevet", url: "https://eduscol.education.fr/", description: "Informations officielles sur le brevet." },
          { title: "Lumni - Révisions brevet", url: "https://www.lumni.fr/dossier/revisions-brevet", description: "Fiches et vidéos pour réviser." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "brevet-2",
        "brevet",
        "Réussir l'épreuve orale",
        "L'oral du brevet porte sur un projet mené en classe (EPI, parcours avenir, histoire des arts...). C'est l'occasion de montrer tes compétences à l'oral.",
        [
          {
            title: "Choisir son sujet",
            content: "L'oral peut porter sur :\n\n• Un projet réalisé dans l'année (EPI)\n• Une œuvre étudiée en histoire des arts\n• Le parcours avenir (orientation, stages)\n• Un engagement citoyen\n\nConseils pour choisir :\n• Un sujet qui t'intéresse vraiment\n• Un sujet que tu maîtrises bien\n• Un sujet original qui te distinguera\n• Vérifier avec ton professeur que le sujet est valide"
          },
          {
            title: "Préparer sa présentation",
            content: "Structure de l'exposé (5 min) :\n\n1. INTRODUCTION\n   - Se présenter\n   - Annoncer le sujet\n   - Expliquer pourquoi tu l'as choisi\n\n2. DÉVELOPPEMENT\n   - Présenter le sujet/projet\n   - Donner des exemples concrets\n   - Expliquer ton travail personnel\n\n3. CONCLUSION\n   - Résumer les points clés\n   - Dire ce que tu as appris\n   - Ouvrir sur une question\n\nSupports : diaporama, affiche, maquette, démonstration...",
            examples: [
              "Un diaporama de 5-6 diapositives maximum, avec des images et peu de texte."
            ]
          },
          {
            title: "L'entretien avec le jury",
            content: "Après l'exposé, le jury pose des questions (10 min) :\n\n• Sur ton sujet : approfondir certains points\n• Sur ta démarche : comment as-tu travaillé ?\n• Sur ton ressenti : qu'as-tu appris ? difficultés ?\n\nConseils :\n• Écouter attentivement les questions\n• Répondre calmement, sans précipitation\n• Si tu ne sais pas, le dire honnêtement\n• Montrer ton enthousiasme\n\nÉvaluation : contenu (40 points), expression (30 points), écoute et dialogue (30 points)"
          }
        ],
        [
          "Choisir un sujet qui t'intéresse et que tu maîtrises",
          "Structure : introduction, développement, conclusion (5 min)",
          "Utiliser un support visuel (diaporama, affiche...)",
          "Entretien : répondre calmement, montrer son intérêt",
          "100 points au total : contenu, expression, dialogue"
        ],
        [
          {
            id: "brevet2-ex1",
            question: "Combien de temps dure l'exposé de l'oral du brevet ?",
            type: "multiple-choice",
            options: ["3 minutes", "5 minutes", "10 minutes", "15 minutes"],
            answer: "5 minutes",
            explanation: "L'exposé oral dure environ 5 minutes, suivi de 10 minutes d'entretien avec le jury."
          },
          {
            id: "brevet2-ex2",
            question: "Combien de points l'oral représente-t-il ?",
            type: "text",
            answer: "100 points",
            explanation: "L'épreuve orale du brevet est notée sur 100 points, répartis entre le contenu, l'expression et le dialogue."
          }
        ],
        [
          { title: "Lumni - Oral du brevet", url: "https://www.lumni.fr/dossier/oral-brevet", description: "Conseils pour réussir l'oral." },
          { title: "Onisep - Parcours avenir", url: "https://www.onisep.fr/", description: "S'informer sur les métiers et formations." }
        ],
        "https://www.youtube.com/watch?v=example"
      ),
      createChapter(
        "brevet-3",
        "brevet",
        "Gérer le stress et la motivation",
        "Les examens peuvent être stressants. Apprendre à gérer son stress et maintenir sa motivation sont des compétences essentielles pour réussir.",
        [
          {
            title: "Comprendre le stress",
            content: "Le stress est une réaction naturelle :\n\n• Un peu de stress améliore les performances (concentration, énergie)\n• Trop de stress les diminue (blocage, panique)\n\nSymptômes de stress excessif :\n• Physiques : maux de ventre, maux de tête, fatigue\n• Émotionnels : irritabilité, anxiété, découragement\n• Cognitifs : difficultés de concentration, trous de mémoire\n\nL'objectif n'est pas d'éliminer le stress, mais de le gérer."
          },
          {
            title: "Techniques de gestion du stress",
            content: "Méthodes pour se calmer :\n\n• RESPIRATION PROFONDE :\n  - Inspirer 4 secondes par le nez\n  - Retenir 4 secondes\n  - Expirer 4 secondes par la bouche\n\n• RELAXATION MUSCULAIRE : contracter puis relâcher les muscles\n\n• VISUALISATION POSITIVE : s'imaginer réussir\n\n• ACTIVITÉ PHYSIQUE : le sport évacue le stress\n\n• DIALOGUE INTÉRIEUR : remplacer \"je vais échouer\" par \"j'ai travaillé, je suis prêt\""
          },
          {
            title: "Maintenir sa motivation",
            content: "Rester motivé pendant les révisions :\n\n• OBJECTIFS CLAIRS : savoir ce qu'on veut atteindre\n• RÉCOMPENSES : s'accorder des pauses et plaisirs\n• ENVIRONNEMENT : un espace de travail agréable\n• SOUTIEN : réviser avec des amis, parler à ses proches\n• ROUTINE : horaires réguliers, rituels de travail\n\nSe souvenir pourquoi on travaille :\n• Le brevet ouvre des portes (lycée, orientation)\n• Satisfaction personnelle de réussir\n• Prouver à soi-même qu'on en est capable"
          }
        ],
        [
          "Un peu de stress améliore les performances, trop les diminue",
          "Techniques : respiration, relaxation, visualisation positive",
          "Activité physique pour évacuer le stress",
          "Motivation : objectifs clairs, récompenses, soutien",
          "Relativiser : le brevet n'est qu'une étape"
        ],
        [
          {
            id: "brevet3-ex1",
            question: "Quel effet a un stress modéré sur les performances ?",
            type: "multiple-choice",
            options: ["Il les diminue", "Il les améliore", "Il n'a aucun effet", "Il provoque des blocages"],
            answer: "Il les améliore",
            explanation: "Un niveau modéré de stress améliore les performances en augmentant la concentration et l'énergie. C'est le stress excessif qui est problématique."
          },
          {
            id: "brevet3-ex2",
            question: "Citez une technique de gestion du stress.",
            type: "text",
            answer: "Respiration profonde (ou relaxation, visualisation, sport...)",
            explanation: "Plusieurs techniques aident à gérer le stress : la respiration profonde, la relaxation musculaire, la visualisation positive, l'activité physique..."
          }
        ],
        [
          { title: "Fil Santé Jeunes", url: "https://www.filsantejeunes.com/", description: "Conseils sur le stress et le bien-être." },
          { title: "ONISEP - Après la 3e", url: "https://www.onisep.fr/", description: "Préparer son orientation après le brevet." }
        ],
        "https://www.youtube.com/watch?v=example"
      )
    ]
  }
];

export class MemStorage implements IStorage {
  private subjects: Map<string, Subject>;

  constructor() {
    this.subjects = new Map();
    for (const subject of subjectsData) {
      this.subjects.set(subject.id, subject);
    }
  }

  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async getSubject(id: string): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }

  async getChapter(subjectId: string, chapterId: string): Promise<Chapter | undefined> {
    const subject = this.subjects.get(subjectId);
    if (!subject) return undefined;
    return subject.chapters.find(c => c.id === chapterId);
  }
}

export const storage = new MemStorage();
