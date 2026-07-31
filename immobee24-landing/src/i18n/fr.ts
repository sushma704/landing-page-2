// French overlay dictionary (draft/ai-refinement).
// Same nesting as translations.ts, but leaves are plain values (string,
// string[], {q,a}[]) — no per-language wrapper. Keys missing here fall back
// to English via t(). Populated section-by-section for the core pages.
export const frOverlay: Record<string, any> = {
  // ============================================
  // HOMEPAGE META
  // ============================================
  home: {
    meta: {
      title: 'Logiciel IA pour agents immobiliers | Immob24',
      description:
        'Immob24 est le logiciel IA pour agents immobiliers en Allemagne. Répondez aux nouvelles demandes en 3 secondes et qualifiez vos leads automatiquement.',
    },
  },

  // ============================================
  // HEADER & NAVIGATION
  // ============================================
  nav: {
    home: 'Accueil',
    product: 'Produit',
    howItWorks: 'Comment ça marche',
    forWhom: 'Pour qui',
    crmAlternative: 'Alternative CRM',
    demo: 'Démo',
    pricing: 'Tarifs',
    requestDemo: 'Demander une démo',
    tagline: "Le système d'exploitation IA pour l'immobilier moderne",
    login: 'Connexion',
  },

  // ============================================
  // HERO SECTION
  // ============================================
  hero: {
    eyebrow: 'Logiciel IA pour agents immobiliers',
    headline: 'Le logiciel IA pour agents immobiliers en Allemagne',
    subheadline:
      'Immob24 est le logiciel IA pour les agences immobilières en Allemagne : il répond aux nouvelles demandes immobilières en 3 secondes, qualifie les leads automatiquement et prend en charge les relances — sans que vous ayez à remplacer votre CRM existant.',
    primaryCta: 'Demander une démo',
    secondaryCta: 'Voir comment ça marche',
    trustBullets: [
      'Réagit instantanément aux nouvelles demandes.',
      'Qualifie les leads automatiquement.',
      'Libère votre équipe du suivi manuel.',
      'Conçu pour les processus des agences allemandes.',
    ],
  },

  // ============================================
  // ANSWER BLOCK
  // ============================================
  answer: {
    q1: 'Qu’est-ce qu’Immob24 ?',
    a1: 'Immob24 est un logiciel IA pour agents immobiliers en Allemagne. Il répond automatiquement aux nouvelles demandes, qualifie les prospects et les fait avancer vers l’étape suivante — comme une couche d’exécution posée sur vos processus existants.',
    q2: 'Immob24 est-il un CRM ?',
    a2: 'Non. Immob24 n’est pas un CRM classique. C’est une couche d’exécution IA qui s’appuie sur les processus existants des agences et prend en charge le travail opérationnel entre la demande et le rendez-vous.',
  },

  // ============================================
  // PROBLEM SECTION
  // ============================================
  problem: {
    headline: 'Pourquoi les agents perdent du chiffre d’affaires chaque mois à cause de réponses trop lentes',
    body: 'Beaucoup d’agences immobilières reçoivent suffisamment de demandes, mais perdent du potentiel de vente dans les premières minutes et heures qui suivent leur réception. Les nouveaux prospects attendent trop longtemps une réponse, les relances se font manuellement et de façon irrégulière, et un temps précieux part en coordination au lieu d’être consacré au conseil et à la conclusion des ventes.',
    painpoints: [
      'Les nouveaux leads restent trop longtemps sans réponse.',
      'Les relances dépendent de la discipline manuelle.',
      'Les rendez-vous de visite sont coordonnés avec trop d’allers-retours.',
      'Les CRM stockent les données mais ne comblent pas automatiquement le déficit de réactivité.',
    ],
  },

  // ============================================
  // SOLUTION SECTION
  // ============================================
  solution: {
    headline: 'Comment Immob24 travaille au sein de votre agence',
    body: 'Immob24 prend automatiquement en charge les premières étapes opérationnelles après une demande. L’IA réagit immédiatement, collecte les informations pertinentes, priorise les prospects, déclenche les relances et fait avancer les leads qualifiés vers l’étape suivante du processus.',
    definitionLabel: 'Définition',
    definitionBox:
      'Immob24 est la couche d’exécution IA pour les agences immobilières : réponse plus rapide, qualification automatique, planification des rendez-vous et suivi dans un seul système, au lieu d’une simple gestion de contacts.',
  },

  // ============================================
  // FEATURE SECTION
  // ============================================
  features: {
    headline: 'Ce qu’Immob24 automatise',
    f1Title: 'Répondre aux demandes en 3 secondes',
    f1Body:
      'Dès qu’un nouveau lead arrive, Immob24 lance automatiquement la première réponse. Cela augmente les chances d’établir le contact avant que les prospects n’abandonnent ou ne discutent en parallèle avec d’autres agents.',
    f2Title: 'Qualifier les leads automatiquement',
    f2Body:
      'L’IA collecte les informations clés tôt dans le processus et aide à prioriser les prospects plus rapidement. Votre équipe consacre son temps en priorité aux demandes ayant la plus forte probabilité de conclusion.',
    f3Title: 'Planifier les visites sans allers-retours manuels',
    f3Body:
      'Immob24 coordonne automatiquement l’étape suivante et réduit l’effort de coordination pour votre équipe. Cela accélère le pipeline et améliore l’expérience client.',
    f4Title: 'Les relances continuent, même quand votre équipe est occupée',
    f4Body:
      'Les prospects ne sont pas oubliés simplement parce que la journée est chargée. Le suivi automatisé maintient les conversations actives et réduit les pertes dues aux oublis manuels.',
    ctaLink: 'Voir toutes les fonctionnalités du logiciel IA pour agents immobiliers',
  },

  // ============================================
  // PRICING TEASER
  // ============================================
  pricingTeaser: {
    headline: 'Les tarifs en un coup d’œil',
    body: 'Immob24 propose trois façons de démarrer pour les agences immobilières — de l’accès gratuit en version bêta à la solution sur mesure sur demande, en passant par l’offre Team à partir de 249 €/mois.',
    plans: [
      ['Beta', 'Gratuit pendant la phase bêta'],
      ['Team', 'À partir de 249 €/mois'],
      ['Sur mesure', 'Sur demande'],
    ],
    pricingCta: 'Tarifs Immob24',
    demoCta: 'Demander une démo',
  },

  // ============================================
  // CRM DIFFERENTIATION
  // ============================================
  crmDiff: {
    headline: 'Pourquoi Immob24 n’est pas un CRM de plus',
    body: 'Les CRM classiques sont conçus pour gérer des contacts, des biens et des dossiers. Immob24 est conçu pour réagir aux nouvelles demandes, faire avancer les prospects automatiquement et éliminer les goulets d’étranglement opérationnels avant même que votre équipe n’ait à intervenir.',
    comparisons: [
      ['CRM', 'gère les données'],
      ['Immob24', 'exécute le travail'],
      ['CRM', 'enregistre le statut du pipeline'],
      ['Immob24', 'répond, qualifie et coordonne l’étape suivante'],
    ],
    cta: 'Pourquoi Immob24 n’est pas un CRM classique',
  },

  // ============================================
  // HOW IT WORKS
  // ============================================
  howItWorks: {
    headline: 'De la demande à l’entretien qualifié',
    steps: [
      'Une nouvelle demande arrive.',
      'Immob24 répond immédiatement.',
      'L’IA collecte les informations et qualifie le lead.',
      'L’étape suivante est coordonnée : rendez-vous, question complémentaire ou relance.',
      'Votre équipe prend le relais là où le conseil personnalisé a le plus fort levier.',
    ],
    cta: 'Voir comment ça marche en détail',
  },

  // ============================================
  // SOCIAL PROOF
  // ============================================
  socialProof: {
    headline: 'Conçu pour les agents qui doivent réagir plus vite',
    note: 'Cette section ne sera mise en ligne qu’avec des preuves clients validées. Le bandeau de logos et les résultats détaillés avant/après suivront après les premiers clients pilotes.',
    testimonials: [
      '« Avant Immob24, nous perdions des demandes. Désormais, chaque demande reçoit une réponse immédiate. »',
      '« Notre équipe gagne plusieurs heures chaque semaine sur les relances et la prise de rendez-vous. »',
      '« Nous n’avons pas eu à déployer un nouveau CRM pour améliorer le processus. »',
    ],
  },

  // ============================================
  // USE CASES
  // ============================================
  useCases: {
    headline: 'Pour quelles agences immobilières Immob24 est-il adapté',
    cards: [
      'Petites agences avec un fort volume de demandes.',
      'Agences de taille moyenne avec trop de retraitement manuel.',
      'Équipes qui souhaitent conserver leurs systèmes existants.',
      'Agents qui veulent réagir plus vite sans alourdir leur charge opérationnelle.',
    ],
  },

  // ============================================
  // FAQ
  // ============================================
  faq: {
    headline: 'Questions fréquentes',
    items: [
      {
        q: 'Immob24 est-il un CRM ?',
        a: 'Non. Immob24 n’est pas un CRM classique, mais une couche IA pour les processus des agents immobiliers.',
      },
      {
        q: 'À qui s’adresse Immob24 ?',
        a: 'Aux agents immobiliers et aux agences en Allemagne qui souhaitent répondre plus vite aux nouvelles demandes et automatiser le travail répétitif.',
      },
      {
        q: 'Dois-je remplacer mon CRM existant ?',
        a: 'Non. Immob24 s’appuie sur vos processus existants au lieu de vous obliger à remplacer votre CRM.',
      },
      {
        q: 'Qu’est-ce qu’Immob24 automatise ?',
        a: 'La première réponse, la qualification des leads, la planification des rendez-vous et les relances.',
      },
      {
        q: 'Pourquoi la rapidité de réponse est-elle si importante ?',
        a: 'Parce que, sur des marchés très concurrentiels, les prospects contactent souvent plusieurs prestataires en parallèle, et des réponses lentes peuvent se traduire directement par des opportunités perdues.',
      },
    ],
  },

  // ============================================
  // FINAL CTA
  // ============================================
  finalCta: {
    headline: 'Découvrez en 30 minutes comment Immob24 s’intègre à votre agence',
    body: 'Lors de la démo, nous vous montrons comment Immob24 répond aux nouvelles demandes immobilières, comment les leads sont qualifiés et comment votre équipe perd moins de temps en tâches répétitives.',
    primaryCta: 'Demander une démo',
    secondaryNote: 'Sans engagement. Particulièrement pertinent pour les petites et moyennes agences immobilières en Allemagne.',
  },

  // ============================================
  // PRODUKT PAGE
  // ============================================
  produkt: {
    meta: {
      title: 'Logiciel IA pour agents immobiliers | Immob24',
      description:
        'Immob24 est le logiciel IA pour agents immobiliers : première réponse automatique, qualification des leads, coordination des rendez-vous et relances — sans changer de CRM.',
    },

    hero: {
      eyebrow: 'Produit',
      headline: 'Immob24 — logiciel IA pour une réponse plus rapide aux leads immobiliers',
      subheadline:
        'Répondez aux nouvelles demandes immobilières en 3 secondes au lieu de plusieurs heures. Immob24 est le logiciel IA qui qualifie les leads automatiquement et coordonne l’étape suivante — une couche d’exécution posée sur votre processus existant, sans introduire un CRM de plus.',
      primaryCta: 'Demander une démo',
      secondaryCta: 'Comment ça marche',
      bullets: [
        'Réagit instantanément aux nouvelles demandes immobilières.',
        'Qualifie les leads automatiquement.',
        'Planifie les étapes suivantes sans allers-retours manuels.',
        'S’appuie sur vos processus et systèmes existants.',
      ],
    },

    definition: {
      headline: 'Ce qu’est Immob24',
      body: 'Immob24 est un système d’exploitation IA pour les agents immobiliers en Allemagne. La plateforme prend en charge le travail opérationnel entre la réception d’une demande et l’étape qualifiée suivante : réponse, qualification, logique de rendez-vous et relance. Les agences gagnent ainsi en rapidité, en structure et en sérénité au quotidien.',
    },

    qa: {
      qaLabel: 'Q&R',
      items: [
        { q: 'Immob24 est-il un CRM ?', a: 'Non. Immob24 n’est pas un CRM classique.' },
        {
          q: 'Que fait Immob24 à la place ?',
          a: 'Il exécute automatiquement le travail commercial opérationnel, au lieu de se contenter de stocker des contacts et des dossiers.',
        },
        {
          q: 'À qui s’adresse Immob24 ?',
          a: 'Aux agents immobiliers et aux agences en Allemagne qui veulent réagir plus vite et réduire le travail répétitif.',
        },
      ],
    },

    problemFit: {
      headline: 'Pourquoi les agences ont besoin d’un système différent d’un CRM classique',
      body: 'Beaucoup d’agences n’ont pas un problème de données, mais un problème de réactivité. Les nouvelles demandes arrivent, mais leur traitement opérationnel dépend de la discipline manuelle, de la capacité de l’équipe et d’allers-retours de communication. C’est exactement dans cette faille qu’Immob24 se positionne : non pas comme une base de données, mais comme une couche d’exécution IA pour les premières étapes décisives du processus de lead.',
      points: [
        'Temps de réponse trop lents → Immob24 réagit immédiatement.',
        'Priorisation des leads floue → Immob24 qualifie tôt dans le processus.',
        'Trop de coordination de rendez-vous → Immob24 déclenche automatiquement l’étape suivante.',
        'Relances manuelles → Immob24 maintient les conversations actives.',
      ],
    },

    features: {
      headline: 'Ce qu’Immob24 «prend en charge» dans le quotidien de l’agent',
      f1Title: 'Répondre immédiatement aux nouvelles demandes',
      f1Body:
        'Dès qu’un lead arrive, Immob24 lance automatiquement la première réponse. Les chances d’établir le contact augmentent avant que les prospects n’abandonnent ou ne se tournent vers d’autres agents.',
      f2Title: 'Qualifier les leads automatiquement',
      f2Body:
        'Immob24 collecte les informations clés tôt dans la conversation et aide à prioriser les demandes plus rapidement. Votre équipe se concentre d’abord sur les prospects ayant la plus forte probabilité de conclusion.',
      f3Title: 'Coordonner les rendez-vous et les étapes suivantes',
      f3Body:
        'Au lieu d’exiger une coordination manuelle à chaque étape, Immob24 déclenche la prochaine étape pertinente du processus. Cela réduit les frictions opérationnelles et accélère le traitement des prospects.',
      f4Title: 'Maintenir les relances actives',
      f4Body:
        'Quand les équipes sont débordées, les conversations s’interrompent souvent faute de suivi. Immob24 maintient le processus actif et empêche les leads de rester en souffrance.',
      f5Title: 'S’appuyer sur vos processus d’agence existants',
      f5Body:
        'Immob24 n’est pas positionné comme un changement de système radical. La plateforme est conçue pour compléter les processus en place et automatiser l’exécution opérationnelle, sans vous obliger à remplacer un CRM existant.',
    },

    useCases: {
      headline: 'Pour quels usages les agences utilisent Immob24',
      c1Title: 'Traiter plus vite les demandes des portails',
      c1Body:
        'Quand de nombreuses demandes arrivent en parallèle, Immob24 veille à ce que les nouveaux leads n’attendent pas un tri manuel.',
      c2Title: 'Prioriser les prospects tôt',
      c2Body:
        'Les agents identifient plus vite les conversations qui méritent leur attention en premier, car l’IA soutient la pré-qualification.',
      c3Title: 'Préparer les visites plus efficacement',
      c3Body:
        'Grâce aux étapes suivantes automatisées, le nombre de boucles manuelles dans la prise de rendez-vous diminue.',
      c4Title: 'Soulager les équipes sur le plan opérationnel',
      c4Body:
        'Les agents passent moins de temps sur la communication répétitive et plus de temps sur le conseil, les visites et la conclusion des ventes.',
    },

    crmTable: {
      headline: 'Immob24 vs CRM classique',
      thema: 'Sujet',
      classicalCrm: 'CRM classique',
      immob: 'Immob24',
      cta: 'Voir l’alternative au CRM immobilier',
      rows: [
        [
          'Fonction principale',
          'Gérer les contacts, les biens et les dossiers.',
          'Automatiser le travail opérationnel entre la demande et l’étape suivante.',
        ],
        [
          'Réaction aux nouveaux leads',
          'Le plus souvent manuelle, via l’équipe ou des workflows configurés.',
          'Réponse IA immédiate aux nouvelles demandes.',
        ],
        [
          'Qualification des leads',
          'Souvent basée sur la documentation et les workflows.',
          'Pré-qualification précoce assistée par l’IA.',
        ],
        [
          'Logique de rendez-vous',
          'Dépendante du processus d’équipe ou d’une automatisation externe.',
          'Intégrée au flux automatisé.',
        ],
        [
          'Positionnement',
          'Système de référence (system of record).',
          'Couche opérationnelle IA posée sur votre processus existant.',
        ],
      ],
    },

    whoFor: {
      headline: 'Pour qui Immob24 a été conçu',
      cards: [
        'Petites agences avec un fort volume de demandes.',
        'Agences de taille moyenne avec trop de retraitement manuel.',
        'Équipes qui ne veulent pas remplacer l’ensemble de leur pile logicielle.',
        'Agents qui veulent faire de la rapidité du premier contact un avantage concurrentiel.',
      ],
      notForLabel: 'Pas pour',
      notForBody:
        'Immob24 n’est pas le bon positionnement pour les entreprises qui recherchent avant tout une base de données classique, un portail ou un pur système de gestion d’annonces. L’accent est mis sur la réponse, la qualification, la relance et l’automatisation opérationnelle du processus de l’agent.',
    },

    howItWorks: {
      headline: 'Comment Immob24 travaille',
      steps: [
        'Une nouvelle demande arrive.',
        'Immob24 réagit immédiatement.',
        'L’IA collecte les informations et qualifie le lead.',
        'L’étape suivante est coordonnée : rendez-vous, question complémentaire ou relance.',
        'Votre équipe intervient là où le conseil personnalisé a le plus fort levier.',
      ],
      cta: 'Voir comment ça marche en détail',
    },

    socialProof: {
      headline: 'La confiance naît de résultats démontrables',
      note: 'Cette section ne sera mise en ligne qu’avec des preuves clients validées (logos, témoignages, captures d’écran de workflows, résultats avant/après). D’ici là, des exemples fictifs.',
      placeholders: [
        '« Nous répondons désormais immédiatement à chaque demande. »',
        '« Notre équipe gagne du temps chaque semaine sur le suivi et la prise de rendez-vous. »',
        '« Nous n’avons pas eu à déployer un nouveau CRM pour devenir plus rapides. »',
      ],
      placeholderLabel: 'Exemple fictif',
    },

    faq: {
      headline: 'Questions fréquentes sur le produit',
      items: [
        {
          q: 'Immob24 est-il un CRM ?',
          a: 'Non. Immob24 n’est pas un CRM classique, mais une couche IA pour les processus des agents immobiliers.',
        },
        {
          q: 'Ai-je encore besoin de mon CRM existant ?',
          a: 'Immob24 s’appuie sur vos processus existants et n’impose pas nécessairement un changement complet de système.',
        },
        {
          q: 'Qu’est-ce qu’Immob24 automatise concrètement ?',
          a: 'La première réponse, la qualification des leads, la logique de rendez-vous et les relances.',
        },
        {
          q: 'À qui Immob24 convient-il particulièrement ?',
          a: 'Aux agences immobilières en Allemagne qui veulent réagir plus vite et réduire le travail opérationnel répétitif.',
        },
        {
          q: 'Pourquoi un CRM ne suffit-il pas ?',
          a: 'Parce qu’un CRM gère avant tout des informations, tandis qu’Immob24 automatise l’exécution opérationnelle entre la demande et l’étape suivante.',
        },
      ],
    },

    finalCta: {
      headline: 'Découvrez comment Immob24 s’intègre à votre processus d’agence existant',
      body: 'La démo montre comment Immob24 répond aux nouvelles demandes, qualifie les leads et réduit les goulets d’étranglement opérationnels de votre agence — sans repartir de zéro.',
      primaryCta: 'Demander une démo',
      secondaryCta: 'Voir l’alternative au CRM immobilier',
      linksLabel: 'En savoir plus :',
      linkPricing: 'Tarifs Immob24',
      linkDemo: 'Page démo',
      supportNote: 'Sans engagement. Particulièrement pertinent pour les petites et moyennes agences immobilières en Allemagne.',
    },
  },

  // ============================================
  // BETA-AGENTENPROGRAMM PAGE
  // ============================================
  betaProgram: {
    meta: {
      title: 'Programme bêta pour agents immobiliers | Immob24',
      description:
        'Candidatez au programme bêta d’Immob24. 20 places pour les agences immobilières : pilote de 12 semaines, accès gratuit, en direct avec l’équipe fondatrice.',
    },

    nav: 'Programme bêta',

    hero: {
      eyebrow: 'Bêta fermée',
      headline: 'Programme bêta pour agents immobiliers',
      subheadline:
        'Un pilote de 12 semaines pour les agents immobiliers et les agences en Allemagne qui veulent traiter les nouvelles demandes plus vite, réduire le travail opérationnel et contribuer activement à la construction du produit. L’accès est limité, l’effort réduit et l’objectif clair : de vrais workflows, de vrais résultats, en direct avec l’équipe fondatrice.',
      primaryCta: 'Candidater à la bêta',
      secondaryCta: 'Voir le pilote',
      bullets: [
        'Seulement 20 partenaires bêta.',
        'Pilote de 12 semaines avec un effort réduit.',
        'Accès gratuit pendant la bêta.',
        'Prix garanti pendant 12 mois.',
      ],
    },

    whyJoin: {
      headline: 'Pourquoi rejoindre maintenant',
      bullets: [
        'Vous obtenez un accès anticipé à Immob24, avant le déploiement à grande échelle.',
        'Vous travaillez en direct avec l’équipe fondatrice et votre feedback nourrit la feuille de route.',
        'Vous testez avec de vrais workflows plutôt que dans un environnement de démo théorique.',
        'Vous vous assurez les conditions bêta sans engagement à long terme.',
      ],
    },

    whatYouGet: {
      headline: 'Ce que vous obtenez en tant que partenaire bêta',
      bullets: [
        'Accès gratuit pendant la bêta.',
        'Prix fixe pendant 12 mois après le pilote.',
        'Support direct de l’équipe fondatrice.',
        'La possibilité d’influencer le développement du produit et ses priorités.',
        'Une configuration qui peut être testée en conditions réelles en peu de temps.',
      ],
    },

    whoFor: {
      headline: 'À qui s’adresse ce programme',
      body: 'Ce programme s’adresse aux agents immobiliers et aux agences qui traitent de vraies demandes, sont ouverts à de nouveaux processus opérationnels et sont prêts à tester un nouveau système avec des données réelles au quotidien. Il convient particulièrement aux équipes qui veulent réagir plus vite aux leads et réduire le retraitement manuel.',
      bullets: [
        'Agences avec un volume de demandes régulier.',
        'Équipes avec des processus de vente ou de location.',
        'Entreprises pouvant consacrer 30 minutes par semaine au feedback.',
        'Équipes souhaitant tester avec de vraies données anonymisées.',
      ],
    },

    pilot: {
      headline: 'Comment se déroule le pilote',
      phase1Title: 'Semaines 1–2 : mise en place',
      phase1Body:
        '30 minutes d’onboarding, connexion des systèmes, import des annonces et premières réponses IA en conditions réelles. L’effort initial total reste faible : environ deux heures.',
      phase2Title: 'Semaines 3–8 : test',
      phase2Body:
        'Immob24 travaille dans de vrais workflows avec de vraies données. L’équipe consacre environ 30 minutes de feedback par semaine — en appel ou de façon asynchrone — et garde à tout moment le contrôle des actions de l’IA.',
      phase3Title: 'Semaines 9–12 : décision',
      phase3Body:
        'À la fin du pilote, les résultats sont examinés ensemble : temps gagné, leads traités et valeur opérationnelle au quotidien. Vous pouvez ensuite continuer, étendre ou arrêter.',
    },

    weNeed: {
      headline: 'Ce dont nous avons besoin de votre part',
      bullets: [
        'Environ 30 minutes de feedback par semaine.',
        'Des tests avec de vraies données anonymisées.',
        'Un retour honnête sur les forces et les faiblesses.',
        'La volonté de tester le produit dans un processus réel, pas seulement en surface.',
      ],
    },

    trust: {
      headline: 'Du contrôle, pas une boîte noire',
      body: 'La bêta est conçue pour que les agents gardent le contrôle. Les actions de l’IA peuvent être validées, corrigées ou mises en pause ; toutes les actions sont journalisées. C’est important, car la confiance et le contrôle opérationnel sont des conditions essentielles à l’adoption dans le quotidien de l’agent.',
      bullets: [
        'Les actions peuvent être validées ou reprises manuellement.',
        'Vous pouvez intervenir à tout moment.',
        'Les actions de l’IA sont documentées et traçables.',
        'Aucun engagement à long terme pendant le pilote.',
      ],
    },

    form: {
      headline: 'Candidater au programme bêta',
      intro: 'Si votre agence correspond au profil, utilisez le formulaire pour candidater. L’objectif de cette page n’est pas une inscription générique à une newsletter, mais une candidature pilote qualifiée avec une adéquation claire et un intérêt réel.',
      fieldsLabel: 'Ce que nous demandons dans le formulaire',
      fields: [
        'Prénom et nom',
        'Nom de l’entreprise',
        'Fonction dans l’entreprise',
        'E-mail et numéro de téléphone',
        'Ville / zone de marché',
        'Nombre d’agents dans l’équipe',
        'Vente, location ou les deux',
        'Nombre de nouvelles demandes par mois',
        'CRM ou autres outils actuellement utilisés',
        'Pourquoi vous souhaitez participer au programme bêta',
        'Consentement à la protection des données et à la prise de contact',
      ],
      cta: 'Candidater comme partenaire bêta',
      microcopy: 'Bêta fermée. Places limitées. Réponse après examen de la candidature.',
    },

    faq: {
      headline: 'FAQ rapide',
      items: [
        {
          q: 'Combien de temps dure le pilote ?',
          a: 'Le pilote est conçu pour durer 12 semaines.',
        },
        {
          q: 'La participation est-elle gratuite ?',
          a: 'Oui, l’accès pendant la bêta est gratuit.',
        },
        {
          q: 'Y a-t-il un contrat ou un engagement ?',
          a: 'Il n’y a aucune obligation de renouvellement et le pilote peut être arrêté.',
        },
        {
          q: 'Combien de temps l’équipe doit-elle investir ?',
          a: 'Le pitch évoque environ 2 heures de mise en place, puis environ 30 minutes de feedback par semaine.',
        },
        {
          q: 'À qui le programme ne s’adresse-t-il pas ?',
          a: 'Il n’est pas idéal pour les équipes qui ne veulent pas tester de vrais workflows ou qui ne peuvent pas donner un feedback régulier.',
        },
      ],
    },

    finalCta: {
      headline: '20 places. Des résultats clairs. Un accès direct à l’équipe.',
      body: 'Si votre agence veut réagir plus vite aux leads et contribuer tôt à la construction d’un nouveau système, le programme bêta est le bon point d’entrée.',
      cta: 'Candidater à la bêta',
      linksLabel: 'En savoir plus :',
      linkProduct: 'Logiciel IA pour agents immobiliers',
      linkDemo: 'Page démo',
      linkPricing: 'Tarifs Immob24',
    },
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    sectionsLabel: 'Navigation',
    legalLabel: 'Mentions légales',
    settingsLabel: 'Paramètres',
    contact: 'Contact',
    impressum: 'Mentions légales',
    datenschutz: 'Politique de confidentialité',
    termsOfService: 'CGV',
    cookies: 'Politique de cookies',
    privacy: 'Confidentialité',
    cookieSettings: 'Paramètres des cookies',
    copyright: 'Tous droits réservés.',
    madeInGermany: 'Conçu et développé en Allemagne.',
  },

  // ============================================
  // COOKIE CONSENT
  // ============================================
  cookieConsent: {
    bannerTitle: 'Cookies et confidentialité',
    bannerBody:
      'Nous utilisons des cookies strictement nécessaires au fonctionnement de ce site. Avec votre consentement, nous utilisons également des outils d’analyse, de marketing et d’identification des visiteurs (p. ex. Google Analytics, Meta Pixel, RB2B) afin de comprendre l’utilisation du site et d’améliorer nos contenus. Vous pouvez modifier votre choix à tout moment via « Paramètres des cookies ».',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    manage: 'Paramètres',
    save: 'Enregistrer la sélection',
    settingsTitle: 'Paramètres des cookies',
    settingsIntro:
      'Vous décidez vous-même quels cookies sont chargés. Les cookies nécessaires sont indispensables au fonctionnement du site et ne peuvent pas être désactivés.',
    categoryEssentialName: 'Nécessaires',
    categoryEssentialDesc:
      'Ces cookies sont indispensables au fonctionnement du site (p. ex. préférence de langue, choix de cookies). Ils ne peuvent pas être désactivés. Base juridique : intérêt légitime (art. 6, par. 1, point f du RGPD).',
    categoryAnalyticsName: 'Analyse',
    categoryAnalyticsDesc:
      'Google Analytics 4 (Google Ireland Ltd.) nous aide à comprendre comment les visiteurs utilisent le site. Des données d’utilisation anonymisées sont collectées. Base juridique : consentement (art. 6, par. 1, point a du RGPD, § 25, al. 1 TTDSG).',
    categoryMarketingName: 'Marketing',
    categoryMarketingDesc:
      'Meta Pixel (Meta Platforms Ireland Ltd.) mesure l’efficacité de nos campagnes. Des données sont alors transférées à Meta aux États-Unis. Base juridique : consentement (art. 6, par. 1, point a du RGPD, § 25, al. 1 TTDSG, art. 49, par. 1, point a du RGPD pour le transfert vers un pays tiers).',
    categoryChatName: 'Chat / Communication',
    categoryChatDesc:
      'BotPenguin (Botpenguin Inc.) fournit l’assistant de chat de ce site. Lors du chargement du widget, votre adresse IP est transmise à BotPenguin ; pendant l’utilisation, le contenu de la conversation est traité. Un transfert vers des serveurs situés hors de l’UE peut avoir lieu. Base juridique : consentement (art. 6, par. 1, point a du RGPD, § 25, al. 1 TTDSG).',
    categoryIdentificationName: 'Identification des visiteurs',
    categoryIdentificationDesc:
      'Traitement sensible — veuillez lire attentivement. Avec votre consentement, nous chargeons le service RB2B (fournisseur : Retention.com, Inc., 600 Congress Ave, 14th Floor, Austin, TX 78701, USA). RB2B tente de vous identifier en tant qu’individu en comparant des caractéristiques techniques de votre navigateur (adresse IP, empreinte du navigateur, URL de provenance) avec une base de données exploitée par RB2B, constituée entre autres à partir de données de profils LinkedIn accessibles au public. Le résultat peut inclure : nom, entreprise, intitulé de poste, URL du profil LinkedIn et adresse e-mail professionnelle. Pour cela, vos données sont transférées vers les États-Unis — un pays sans niveau de protection des données équivalent à celui de l’UE. Cet outil est chargé exclusivement sur les pages d’accueil /de et /en, jamais sur les pages internes. Base juridique : consentement explicite (art. 6, par. 1, point a du RGPD en lien avec le § 25, al. 1 TTDSG ; pour le transfert vers un pays tiers, également l’art. 49, par. 1, point a du RGPD). Vous pouvez retirer ce consentement à tout moment, avec effet pour l’avenir, via les paramètres des cookies dans le pied de page — le script ne sera alors plus chargé.',
    on: 'Activé',
    off: 'Désactivé',
    alwaysOn: 'Toujours actif',
    close: 'Fermer',
  },

  // ============================================
  // NEWSLETTER SIGNUP
  // ============================================
  newsletter: {
    button: 'S’abonner à la newsletter',
    ariaOpen: 'Ouvrir l’inscription à la newsletter',
    title: 'Newsletter Immob24',
    subtitle: 'Actualités produit, conseils IA pour agents immobiliers et nouveautés d’Immob24 — directement dans votre boîte mail.',
    nameLabel: 'Nom (facultatif)',
    namePlaceholder: 'Votre nom',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'nom@exemple.fr',
    emailRequired: 'Veuillez saisir votre adresse e-mail.',
    emailInvalid: 'L’adresse e-mail est invalide.',
    submit: 'S’abonner',
    submitting: 'Envoi en cours …',
    successTitle: 'Merci beaucoup !',
    successBody: 'Votre inscription a bien été enregistrée. Nous vous tiendrons informé des nouveautés d’Immob24.',
    errorBody: 'Votre inscription n’a pas pu être envoyée. Veuillez réessayer plus tard.',
    consent: 'En vous inscrivant, vous acceptez de recevoir notre newsletter. Vous pouvez vous désabonner à tout moment.',
    close: 'Fermer',
  },

  // ============================================
  // HOW IT WORKS PAGE
  // ============================================
  howItWorksPage: {
    nav: 'Comment ça marche',

    meta: {
      title: 'Comment fonctionne Immob24 | IA pour agents immobiliers',
      description:
        'Comment fonctionne l’IA pour les agents immobiliers : Immob24 répond aux nouvelles demandes, qualifie les leads et coordonne les relances — le déroulement au quotidien, étape par étape.',
    },

    hero: {
      eyebrow: 'Comment ça marche',
      headline: 'Comment fonctionne Immob24 — l’IA au quotidien de l’agent immobilier',
      subheadline:
        'Immob24 prend en charge la partie opérationnelle entre la demande entrante, la première réponse, la qualification, la logique de rendez-vous et la relance. Votre équipe identifie ainsi plus vite quels leads sont prioritaires et où l’intervention personnelle est réellement nécessaire.',
      primaryCta: 'Demander une démo',
      secondaryCta: 'Voir le produit',
      bullets: [
        'Réponse en quelques secondes au lieu de plusieurs heures.',
        'Qualification précoce plutôt que retraitement tardif.',
        'Les étapes suivantes sont déclenchées automatiquement.',
        'Votre équipe intervient là où le conseil a le plus grand impact.',
      ],
    },

    intro: {
      headline: 'Ce qu’Immob24 change dans le processus',
      body: 'Dans beaucoup d’agences, du temps se perd entre la réception d’une demande et la prochaine action pertinente. Immob24 agit exactement à ce niveau : le système réagit immédiatement, collecte les informations importantes, priorise le lead et déclenche l’étape suivante. Le résultat n’est pas un processus administratif supplémentaire, mais un flux opérationnel avec moins de trous et moins de coordination manuelle.',
    },

    steps: {
      headline: 'Le déroulement étape par étape',
      items: [
        {
          title: 'Étape 1 : une nouvelle demande arrive',
          body: 'Les demandes peuvent provenir de portails, de formulaires ou d’autres canaux. Pour l’équipe, c’est en général exactement ici que la perte de temps commence — surtout en dehors des heures de travail ou en cas de fort volume de demandes.',
        },
        {
          title: 'Étape 2 : Immob24 réagit immédiatement',
          body: 'Dès que le lead arrive, Immob24 lance la première réponse. Le délai jusqu’au premier contact se réduit drastiquement, au lieu de laisser les prospects attendre des heures ou jusqu’au jour ouvré suivant.',
        },
        {
          title: 'Étape 3 : l’IA qualifie le lead',
          body: 'À l’étape suivante, le système collecte les informations importantes pour le classement et la priorisation. On identifie ainsi tôt quelles demandes sont très pertinentes, où il faut agir plus vite et quelles conversations nécessitent encore des informations complémentaires.',
        },
        {
          title: 'Étape 4 : l’étape suivante est préparée',
          body: 'Après la qualification, Immob24 déclenche la prochaine action adaptée. Il peut s’agir d’une logique de rendez-vous, d’une question complémentaire, d’une passation ou d’une relance — selon ce qui est pertinent dans le processus.',
        },
        {
          title: 'Étape 5 : l’équipe intervient de manière ciblée',
          body: 'Les agents ne passent plus leur temps sur chaque première réponse standard, mais là où le conseil personnalisé, la visite et la conclusion comptent vraiment. Le travail manuel se déplace ainsi vers les moments du processus à plus forte valeur.',
        },
        {
          title: 'Étape 6 : les relances restent actives',
          body: 'Quand une conversation ne se conclut pas immédiatement, Immob24 veille à ce que le processus ne s’arrête pas. Les relances ne sont pas oubliées, et les leads restent en mouvement au lieu de disparaître dans une boîte de réception ou des listes manuelles.',
        },
      ],
    },

    process: {
      headline: 'Les tâches qu’Immob24 prend en charge dans ce déroulement',
      bullets: [
        'Première réponse aux nouveaux leads.',
        'Qualification précoce des leads.',
        'Coordination de l’étape suivante.',
        'Suivi continu au lieu de rappels manuels.',
        'Allègement opérationnel du quotidien de l’agent.',
      ],
    },

    why: {
      headline: 'Pourquoi ce déroulement compte pour votre activité',
      body: 'La différence ne vient pas seulement de l’automatisation, mais de la rapidité et de la constance du processus. Quand les demandes reçoivent une réponse plus vite, que les leads sont classés plus tôt et que les étapes suivantes sont préparées de manière plus fiable, les chances d’obtenir plus d’entretiens qualifiés augmentent et les opportunités perdues diminuent. C’est précisément pour cela que cette page n’explique pas seulement ce qui se passe, mais pourquoi cette logique de processus compte dans le métier d’agent immobilier.',
    },

    control: {
      headline: 'Automatisé, mais pas incontrôlé',
      body: 'Immob24 n’est pas une boîte noire. Le système prend en charge le travail opérationnel pendant que l’agence garde le contrôle. Ce message est important, car la confiance, la validation et la traçabilité sont les principaux obstacles à l’introduction de l’IA dans les processus réels de vente et de courtage immobilier.',
      bullets: [
        'L’équipe reste impliquée au moment décisif.',
        'Le déroulement est structuré de manière claire et traçable.',
        'Immob24 complète vos processus au lieu de rendre le quotidien opaque.',
      ],
    },

    audience: {
      headline: 'Pour qui ce déroulement est particulièrement pertinent',
      bullets: [
        'Agences avec de nombreuses demandes entrantes.',
        'Équipes qui réagissent actuellement trop lentement aux nouveaux leads.',
        'Entreprises avec une qualification et une prise de rendez-vous manuelles.',
        'Agents à la recherche d’un allègement opérationnel, sans reconstruire toute leur organisation.',
      ],
    },

    faq: {
      headline: 'Questions fréquentes',
      items: [
        {
          q: 'L’équipe doit-elle encore intervenir ?',
          a: 'Oui. Immob24 prend en charge les étapes opérationnelles, tandis que l’équipe intervient là où le conseil et le contact personnel créent le plus de valeur.',
        },
        {
          q: 'Le déroulement commence-t-il directement avec une nouvelle demande ?',
          a: 'Oui. La logique de cette page démarre délibérément à l’arrivée du lead, car c’est là que la plus grande perte de temps se produit au quotidien.',
        },
        {
          q: 'S’agit-il seulement des réponses ou de tout le processus qui suit ?',
          a: 'Pas seulement des réponses. La qualification, les étapes suivantes et les relances font partie de la même logique opérationnelle.',
        },
        {
          q: 'Immob24 remplace-t-il un CRM ?',
          a: 'Non. Immob24 est une couche IA opérationnelle, pas un CRM classique.',
        },
      ],
    },

    finalCta: {
      headline: 'Voyez le déroulement en direct lors de votre démo',
      body: 'Si ce processus vous semble pertinent pour votre agence, la prochaine étape ne devrait pas être un long bloc de texte, mais une invitation claire à la démo. Nous y montrons comment Immob24 travaille dans votre workflow réel, de l’arrivée du lead à la relance.',
      primaryCta: 'Demander une démo',
      secondaryCta: 'Voir le produit',
      linksLabel: 'En savoir plus :',
      linkPricing: 'Tarifs Immob24',
      linkDemo: 'Page démo',
    },
  },

  // ============================================
  // DEMO PAGE
  // ============================================
  demoPage: {
    nav: 'Démo',

    meta: {
      title: 'Demander une démo d’Immob24 | IA pour agents immobiliers',
      description:
        'Découvrez Immob24 lors d’un appel démo de 30 minutes : comment le logiciel IA répond aux nouvelles demandes, qualifie les leads et prend en charge les relances.',
    },

    hero: {
      eyebrow: 'Démo',
      headline: 'Demander une démo d’Immob24 — découvrez le logiciel IA en direct',
      subheadline:
        'Lors de la démo, nous montrons comment Immob24 répond aux nouvelles demandes, qualifie les leads, prépare les étapes suivantes et maintient les relances dans le processus. L’objectif n’est pas une présentation produit générique, mais une compréhension claire de la façon dont Immob24 s’intègre à votre agence.',
      primaryCta: 'Demander une démo',
      microcopy: 'Courte, pertinente et centrée sur votre workflow.',
    },

    form: {
      headline: 'Demander une démo',
      intro: 'Si votre agence souhaite réagir plus vite aux leads et réduire le travail opérationnel, utilisez le formulaire pour votre demande de démo. Nous ne demandons que les informations nécessaires pour préparer un rendez-vous qualifié.',
      microcopy: 'Nous revenons vers vous avec un créneau adapté et préparons la démo autour de votre cas d’usage.',
    },

    whatYouSee: {
      headline: 'Ce que vous verrez lors de la démo',
      bullets: [
        'Comment Immob24 traite immédiatement les nouvelles demandes.',
        'Comment les leads sont qualifiés et priorisés tôt.',
        'Comment la logique de rendez-vous et d’étape suivante fonctionne dans le processus.',
        'Comment Immob24 complète vos processus existants au lieu d’ajouter une complexité inutile.',
      ],
      support: 'La démo n’est pas un long tour d’horizon des fonctionnalités. Elle se concentre sur les questions et priorités concrètes de votre agence et montre comment Immob24 réduit les frictions opérationnelles au quotidien.',
    },

    whoFor: {
      headline: 'Pour qui la démo vaut particulièrement la peine',
      bullets: [
        'Agences avec un flux régulier de leads entrants.',
        'Équipes qui veulent réagir plus vite aux demandes.',
        'Entreprises avec une qualification ou un suivi manuels.',
        'Agents qui veulent vérifier comment Immob24 s’intègre à leurs processus existants.',
      ],
    },

    notDemo: {
      headline: 'Ce que la démo n’est pas',
      body: 'La démo n’est pas un argumentaire commercial générique. C’est une évaluation pertinente et concrète, pas une présentation standard. Des attentes claires, de la confiance et du focus augmentent la probabilité qu’après 30 minutes, vous sachiez vraiment si Immob24 convient à votre agence.',
      bullets: [
        'Pas de rendez-vous inutilement long et sans pertinence.',
        'Focus sur votre cas d’usage.',
        'Des prochaines étapes claires après l’entretien.',
        'Adaptée aux équipes qui veulent évaluer sérieusement.',
      ],
    },

    objections: {
      headline: 'Hésitations fréquentes avant une démo',
      items: [
        {
          q: 'Nous voulons d’abord comprendre si Immob24 correspond à notre processus.',
          a: 'C’est exactement à cela que sert la démo. Nous montrons comment Immob24 peut s’intégrer aux processus réels d’une agence et où se situe la valeur opérationnelle.',
        },
        {
          q: 'Nous n’avons pas beaucoup de temps.',
          a: 'La démo est très accessible : 30 minutes, centrées sur votre cas d’usage — pas un lourd rendez-vous commercial.',
        },
        {
          q: 'Nous utilisons déjà d’autres outils.',
          a: 'Immob24 complète les processus existants et n’exige aucun changement de système automatique.',
        },
      ],
    },

    faq: {
      headline: 'Questions fréquentes sur la démo',
      items: [
        {
          q: 'Comment se déroule la démo ?',
          a: 'De manière très concrète : nous montrons comment Immob24 s’applique aux demandes, à la qualification, aux étapes suivantes et aux relances dans le quotidien de l’agent.',
        },
        {
          q: 'Combien de temps dure la démo ?',
          a: 'En général 30 minutes. Des démos courtes et bien structurées réduisent les frictions pour les visiteurs proches de la décision.',
        },
        {
          q: 'La démo est-elle réservée aux grandes équipes ?',
          a: 'Non. Elle est particulièrement pertinente aussi pour les petites et moyennes agences.',
        },
        {
          q: 'Dois-je beaucoup préparer en amont ?',
          a: 'Non. Le formulaire ne demande que les informations essentielles pour préparer la démo de manière utile.',
        },
      ],
    },

    finalCta: {
      headline: 'Découvrez si Immob24 convient à votre agence',
      body: 'Si votre équipe traite régulièrement de nouvelles demandes et souhaite travailler plus vite, de façon plus structurée et avec moins de frictions manuelles, la démo est la meilleure prochaine étape.',
      primaryCta: 'Demander une démo',
      linksLabel: 'En savoir plus :',
      linkProduct: 'Logiciel IA pour agents immobiliers',
      linkPricing: 'Tarifs Immob24',
      linkBeta: 'Programme bêta',
    },
  },

  // ============================================
  // CRM ALTERNATIVE PAGE
  // ============================================
  crmAltPage: {
    nav: 'Alternative CRM',

    meta: {
      title: 'Alternative au CRM immobilier pour agents | Immob24',
      description:
        'Immob24 n’est pas une solution CRM, mais la couche IA qui rend votre CRM existant plus rapide — l’alternative au CRM immobilier pour une réponse rapide aux leads.',
    },

    hero: {
      eyebrow: 'Alternative CRM',
      headline: 'Alternative au CRM immobilier : ce qu’Immob24 fait différemment',
      subheadline:
        'Beaucoup d’agents immobiliers recherchent de la structure, des réponses plus rapides et moins de retraitement manuel — et atterrissent automatiquement sur des logiciels CRM. Immob24 suit une approche différente : pas plus d’administration, mais une exécution opérationnelle entre la demande, la qualification, l’étape suivante et la relance.',
      primaryCta: 'Demander une démo',
      secondaryCta: 'Voir le produit',
      bullets: [
        'Pas un CRM classique.',
        'Focus sur le travail opérationnel, pas seulement la gestion de données.',
        'Pour les agences qui veulent agir plus vite.',
      ],
    },

    framing: {
      headline: 'De quoi il est vraiment question dans cette comparaison',
      body: 'Cette page ne prétend pas qu’un CRM est fondamentalement une erreur. Les bonnes pages comparatives expliquent honnêtement quelle mission un CRM classique remplit bien — et où il ne suffit pas pour certaines équipes ou certains problèmes de processus. C’est exactement là qu’Immob24 se positionne : comme une couche IA opérationnelle pour les processus des agences, pas comme une interface d’administration supplémentaire.',
    },

    table: {
      headline: 'CRM classique vs Immob24',
      headers: ['Sujet', 'CRM classique', 'Immob24'],
      rows: [
        ['Objectif principal', 'Gérer les contacts, les dossiers et les données.', 'Automatiser le travail opérationnel entre la demande et l’étape suivante.'],
        ['Réaction aux nouveaux leads', 'Dépend le plus souvent de l’équipe ou de workflows manuels.', 'Réaction immédiate aux nouvelles demandes.'],
        ['Qualification des leads', 'Souvent pilotée par la documentation ou les workflows.', 'Qualification et priorisation précoces assistées par l’IA.'],
        ['Logique de rendez-vous', 'Souvent via des processus supplémentaires ou une coordination manuelle.', 'Intégrée au flux opérationnel.'],
        ['Relances', 'Dépendent de la discipline de l’équipe et du suivi manuel.', 'Maintenues activement dans le processus.'],
        ['Meilleure adéquation', 'Pour les équipes qui veulent surtout centraliser leurs données.', 'Pour les équipes qui veulent agir plus vite et réduire les frictions opérationnelles.'],
      ],
      caption: 'Ce tableau comparatif est le cœur de la page — compact, honnête et rapide à parcourir.',
    },

    competitors: {
      headline: 'En quoi Immob24 se distingue de Propstack, Flowfact et onOffice',
      intro: 'Propstack, Flowfact et onOffice sont des CRM immobiliers établis en Allemagne. Ils gèrent de manière fiable les contacts, les biens et les dossiers. Immob24 ne concurrence pas cette mission — il la complète par la première réponse opérationnelle, la qualification et la logique de relance qu’un CRM ne prend pas en charge automatiquement.',
      items: [
        [
          'Immob24 vs Propstack',
          'Propstack est un CRM immobilier moderne, axé sur la tenue des données, la gestion des biens et la vue d’ensemble du pipeline. Immob24 ne le remplace pas, il intervient en amont : il répond aux nouvelles demandes en quelques secondes et qualifie les leads avant qu’ils n’arrivent dans le workflow du CRM.',
        ],
        [
          'Immob24 vs Flowfact',
          'Flowfact est un logiciel pour agents immobiliers établi de longue date pour la gestion des contacts et des dossiers. Immob24 n’est pas une alternative au stockage des données, mais à la réponse lente et manuelle aux leads : l’IA prend automatiquement en charge le premier contact, la pré-qualification et le suivi.',
        ],
        [
          'Immob24 vs onOffice',
          'onOffice est un logiciel complet pour agents immobiliers, avec un large éventail de fonctionnalités de gestion et de reporting. Immob24 se concentre délibérément sur la seule partie opérationnelle entre la demande et l’étape suivante — et peut être utilisé en parallèle d’onOffice au lieu de le remplacer.',
        ],
      ],
      note: 'Immob24 est donc moins une « alternative CRM » au sens d’un remplacement que la couche d’exécution IA qui rend votre CRM immobilier existant plus rapide.',
    },

    whenCrm: {
      headline: 'Quand un CRM classique peut être le bon choix',
      bullets: [
        'Quand le problème principal est l’organisation des données et la documentation centralisée.',
        'Quand l’équipe réagit déjà aux leads avec rapidité et discipline.',
        'Quand les goulets d’étranglement opérationnels sont moins critiques que le reporting et la tenue des données.',
      ],
      support: 'Cette honnêteté renforce la crédibilité de la page. Les pages comparatives convertissent mieux quand elles ne dénigrent pas tout le reste, mais offrent une aide claire à la décision.',
    },

    whenImmob: {
      headline: 'Quand Immob24 est la meilleure alternative',
      bullets: [
        'Quand les nouvelles demandes reçoivent une réponse trop lente.',
        'Quand les leads ne sont pas priorisés assez tôt.',
        'Quand la prise de rendez-vous et les relances génèrent trop de travail manuel.',
        'Quand l’équipe a besoin de moins d’administration et de plus de rapidité opérationnelle.',
        'Quand vous ne voulez pas introduire un système de gestion complexe supplémentaire.',
      ],
    },

    fit: {
      headline: 'Pour qui Immob24 est particulièrement pertinent comme alternative CRM',
      bestForLabel: 'Bien adapté pour',
      bestFor: [
        'Petites et moyennes agences immobilières.',
        'Équipes avec un fort volume de demandes.',
        'Entreprises avec des frictions opérationnelles au premier contact et lors des relances.',
      ],
      notForLabel: 'Moins adapté pour',
      notFor: [
        'Équipes qui recherchent avant tout un système de référence (system of record).',
        'Entreprises dont l’objectif principal est de centraliser les structures de données et le reporting.',
        'Acheteurs qui ne veulent évaluer que la catégorie CRM classique, sans examiner une alternative opérationnelle.',
      ],
    },

    objections: {
      headline: 'Objections fréquentes à une alternative CRM',
      items: [
        {
          q: 'Nous ne voulons pas repartir complètement de zéro.',
          a: 'C’est compréhensible. Immob24 complète les processus existants et n’exige aucun redémarrage radical.',
        },
        {
          q: 'Un CRM nous semble d’abord plus rassurant.',
          a: 'Les CRM sont pertinents pour certaines missions. Immob24 est plus fort quand la rapidité, la qualification et l’exécution opérationnelle sont la priorité.',
        },
        {
          q: 'Nous ne savons pas si notre équipe adoptera une nouvelle solution.',
          a: 'C’est pourquoi il y a une démo, un programme bêta et une logique d’introduction claire — pas à pas, sans pression.',
        },
      ],
    },

    faq: {
      headline: 'Questions fréquentes sur l’alternative CRM',
      items: [
        {
          q: 'Immob24 est-il un CRM ?',
          a: 'Non. Immob24 est une couche IA opérationnelle, pas un CRM classique.',
        },
        {
          q: 'Dois-je remplacer mon CRM existant ?',
          a: 'Pas nécessairement. Immob24 peut compléter vos processus existants.',
        },
        {
          q: 'Pour qui Immob24 est-il plus adapté qu’un CRM ?',
          a: 'Pour les agences qui veulent avant tout améliorer la rapidité de réponse, la qualification des leads et les processus de relance.',
        },
        {
          q: 'Cette page est-elle dirigée contre les CRM ?',
          a: 'Non. Cette page aide à s’orienter et n’est pas une attaque injuste contre la catégorie.',
        },
      ],
    },

    finalCta: {
      headline: 'Vérifiez en direct si Immob24 convient mieux à votre agence qu’un CRM classique',
      body: 'Si votre problème principal n’est pas le stockage des données mais la rapidité opérationnelle, la démo vaut la peine. Nous y examinons ensemble l’effet d’Immob24 sur votre processus et si une alternative CRM est plus pertinente pour votre équipe.',
      primaryCta: 'Demander une démo',
      secondaryCta: 'Voir le produit',
      linksLabel: 'En savoir plus :',
      linkPricing: 'Tarifs Immob24',
      linkDemo: 'Page démo',
    },
  },

  // ============================================
  // PRICING PAGE
  // ============================================
  pricingPage: {
    nav: 'Tarifs',

    meta: {
      title: 'Tarifs Immob24 | Logiciel pour agents dès 249 €',
      description:
        'Tarifs Immob24 : bêta gratuite, Team à partir de 249 €/mois, offre sur mesure sur demande. Le logiciel pour une réponse plus rapide aux leads — sans engagement de longue durée.',
    },

    hero: {
      eyebrow: 'Tarifs',
      headline: 'Tarifs Immob24 — logiciel pour agents immobiliers à partir de 249 € par mois',
      subheadline:
        'Choisissez le point d’entrée adapté à votre agence — de l’accès gratuit en version bêta à la solution sur mesure, en passant par l’offre Team à partir de 249 €/mois. Comparez, choisissez, lancez l’étape suivante.',
      primaryCta: 'Demander une démo',
      secondaryCta: 'Candidater à la bêta',
      microcopy: 'Une logique tarifaire transparente. Aucune complexité inutile.',
    },

    cards: {
      sectionHeadline: '«Trois façons» de démarrer avec Immob24',
      recommendedBadge: 'Recommandé',

      beta: {
        label: 'Beta',
        audience: 'Pour les premiers partenaires',
        price: 'Gratuit',
        subtext: 'Pendant la bêta. Prix garanti pendant les 12 mois suivants.',
        description: 'Pour les agences qui veulent tester Immob24 tôt, donner leur feedback et contribuer activement à la construction du produit.',
        included: [
          'Accès via le programme bêta.',
          'Contact direct avec l’équipe fondatrice.',
          'Pilote de 12 semaines.',
          'Influence précoce sur la feuille de route.',
        ],
        cta: 'Candidater à la bêta',
        support: 'Places limitées.',
      },

      team: {
        label: 'Team',
        audience: 'Pour les petites et moyennes agences',
        price: 'À partir de 249 € / mois',
        subtext: 'Pour les équipes qui veulent utiliser Immob24 dans leur quotidien opérationnel.',
        description: 'Le bon point d’entrée pour les agences qui veulent réagir plus vite aux leads, structurer la qualification et maintenir les relances dans le processus.',
        included: [
          'Réaction aux nouvelles demandes.',
          'Qualification des leads.',
          'Logique d’étape suivante et de rendez-vous.',
          'Aide aux relances.',
          'Onboarding et support standard.',
        ],
        cta: 'Demander une démo',
      },

      custom: {
        label: 'Sur mesure',
        audience: 'Pour des besoins plus complexes',
        price: 'Sur demande',
        subtext: 'Pour les équipes avec des besoins spécifiques de déploiement, de processus ou d’accompagnement.',
        description: 'Pour les entreprises qui nécessitent plus de coordination, des structures d’équipe plus grandes ou des exigences commerciales et opérationnelles particulières.',
        included: [
          'Mise en place personnalisée.',
          'Accompagnement étendu.',
          'Coordination sur mesure.',
          'Assistance prioritaire.',
        ],
        cta: 'Planifier un entretien',
        support: 'Tarification individuelle selon la configuration.',
      },
    },

    quickComparison: {
      headline: 'Quel point d’entrée vous correspond ?',
      headers: ['Si vous…', 'Le bon choix est…'],
      rows: [
        ['voulez tester Immob24 tôt et contribuer à son évolution', 'Beta'],
        ['cherchez un point d’entrée opérationnel standard et clair', 'Team'],
        ['avez besoin de plus de coordination et d’exigences spécifiques', 'Sur mesure'],
      ],
      caption: 'Cet aperçu vous aide à vous situer plus rapidement — vue des offres et aide rapide à la décision.',
    },

    trust: {
      headline: 'Ce qui compte avant de démarrer',
      bullets: [
        'Immob24 est conçu pour les processus des agences immobilières, pas pour des acheteurs de logiciels génériques.',
        'La bêta est destinée aux premiers partenaires et compte des places limitées.',
        'L’offre Team est le point d’entrée standard le plus pertinent pour les agences actives.',
        'L’offre sur mesure n’est pas un upsell, mais elle est destinée à de véritables besoins particuliers.',
      ],
    },

    faq: {
      headline: 'Questions fréquentes sur les tarifs et le démarrage',
      items: [
        {
          q: 'Existe-t-il un point d’entrée gratuit ?',
          a: 'Oui, via le programme bêta pour des partenaires sélectionnés.',
        },
        {
          q: 'Quelle offre convient à la plupart des agences ?',
          a: 'L’offre Team est le point d’entrée standard pour les petites et moyennes agences.',
        },
        {
          q: 'Pourquoi l’offre sur mesure n’a-t-elle pas de prix fixe ?',
          a: 'Parce que dans le SaaS B2B, les besoins plus importants ou plus complexes ne devraient souvent pas être forcés dans un package standard rigide.',
        },
        {
          q: 'La page doit-elle mener directement à l’achat ?',
          a: 'Pour Immob24, un CTA vers la démo, la candidature à la bêta ou un entretien commercial est plus pertinent qu’un classique « Acheter maintenant », car le produit est proche des processus et demande plus de conseil.',
        },
        {
          q: 'Chaque carte a-t-elle besoin de son propre CTA ?',
          a: 'Oui. Les tableaux de prix fonctionnent mieux quand chaque option a une prochaine étape claire.',
        },
      ],
    },

    finalCta: {
      headline: 'Démarrez avec le modèle qui vous convient',
      body: 'Si vous voulez tester Immob24 tôt et contribuer à son évolution, candidatez à la bêta. Si vous avez déjà un cas d’usage opérationnel clair au quotidien, la démo est la meilleure prochaine étape. Pour des besoins plus importants, un entretien direct est la bonne voie pour une mise en place adaptée.',
      primaryCta: 'Demander une démo',
      secondaryCta: 'Candidater à la bêta',
      tertiaryCta: 'Planifier un entretien',
      linksLabel: 'En savoir plus :',
      linkProduct: 'Logiciel IA pour agents immobiliers',
      linkDemo: 'Page démo',
    },
  },
};
