/*
 * Cybersecurity Quickscan: alle teksten, vragen, opties en gewichten.
 * Pas hier aan wat je wil wijzigen; quiz.js bevat alleen de werking.
 *
 * - weight: aantal punten dat de vraag waard is (samen 10).
 * - pct:    welk deel van die punten een antwoord oplevert (1 = 100%).
 * - explain: tekst onder "Wat bedoelen we hiermee?".
 */
window.QUIZ_CONFIG = {
  storageKey: "csc-quickscan-v1",

  start: {
    title: "Hoe veilig is jouw bedrijf?",
    subtitle: "Beantwoord 14 korte vragen. Je krijgt meteen een score op 10, je 3 belangrijkste verbeterpunten en de specialisten die bij je profiel passen.",
    button: "Start de gratis check",
    note: "3 minuten, geen IT-kennis nodig, geen registratie",
    resume: "Ga verder waar je gebleven was"
  },

  labels: {
    progress: "Vraag {n} van {total}",
    explain: "Wat bedoelen we hiermee?",
    previous: "Vorige",
    next: "Volgende",
    choose: "Kies een sector",
    restart: "Opnieuw beginnen",
    resultTitle: "Jouw cyberscore",
    outOf: "op 10",
    domainsTitle: "Je resultaat in detail: score per domein",
    prioritiesTitle: "Jouw 3 prioriteiten",
    noPriorities: "Je haalde op elke vraag de volle punten. Blijf testen, trainen en bijwerken.",
    insuranceTitle: "Verzekerbaarheid",
    nis2Title: "NIS2-indicatie",
    disclaimer: "Deze check geeft een indicatie en is geen volledige audit.",
    matchEyebrow: "Afgestemd op je profiel",
    matchTitle: "Specialisten die bij je passen",
    matchIntro: "We tonen geen namen, wel waarom elke specialist bij je past. Vraag je een kennismaking aan, dan brengen we je met hen in contact.",
    matchPct: "{n}% match",
    matchSpecialist: "Specialist {n}",
    matchCovered: "Helpt bij: {items}",
    matchPartly: "Deels in het aanbod: {items}",
    matchMissing: "Niet uitdrukkelijk in het aanbod: {items}",
    matchAll: "Biedt hulp op alle domeinen van de check",
    matchLevel: "Richt zich op bedrijven op jouw niveau",
    matchSector: "Noemt jouw sector als doelgroep",
    matchVlaio: "Door VLAIO erkend: 50% steun mogelijk voor een verbetertraject",
    matchKindIt: "IT-partner die de uitvoering kan opnemen",
    matchKindAdvies: "Adviseur die naast je bestaande IT-beheer werkt",
    matchHow: "Hoe berekenen we de match?",
    matchHowText: "De match telt op 100: 60 punten voor de mate waarin het aanbod je verbeterpunten dekt, 15 voor het niveau waarop de specialist zich richt, 10 voor je sector, 10 voor VLAIO-steun en 5 voor de aansluiting bij je IT-beheer. We baseren ons op wat specialisten zelf publiek maken, vooral hun fiche bij VLAIO. Zij hebben deze gegevens niet nagekeken. Een verzekering valt buiten de match."
  },

  cta: {
    label: "Laat deze specialisten contact opnemen",
    /* Wordt gebruikt zolang lead.endpoint leeg is. */
    url: "it-dienstverleners.html"
  },

  /*
   * Leadformulier op de resultaatpagina.
   * endpoint: URL die de aanvraag ontvangt als JSON (POST). Zolang dit leeg is,
   *           wordt het formulier niet getoond en linkt de knop naar cta.url.
   * extraFields: vaste velden die mee verstuurd worden, bv. de sleutel van je formulierdienst.
   */
  lead: {
    endpoint: "https://script.google.com/macros/s/AKfycbyjSSOLFseAcj3WVM5-OfUq_ypJ1c2L17mNlD7nkcTw4flEvHZAO-41E3yAXsYlAuWvDg/exec",
    /* Google Apps Script aanvaardt geen "application/json" vanuit de browser, wel platte tekst met JSON erin. */
    contentType: "text/plain;charset=utf-8",
    extraFields: {},
    title: "Laat de best passende specialisten contact met je opnemen",
    intro: "Laat je gegevens achter. Maximaal drie specialisten die bij je profiel passen nemen contact met je op.",
    introMatches: "We vonden {n} specialisten die bij je profiel passen, de beste met een match van {pct}%. Laat je gegevens achter en zij nemen contact met je op om je verbeterpunten aan te pakken.",
    points: ["Gratis en vrijblijvend", "Maximaal drie specialisten", "Zij krijgen je resultaat, zodat je niets opnieuw moet uitleggen"],
    fields: {
      name: "Naam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      company: "Bedrijf"
    },
    consent: "Ja, breng me in contact met maximaal drie specialisten die bij mijn profiel passen. Gratis en vrijblijvend.",
    consentNote: "cybersecuritychecker.be geeft mijn gegevens en mijn resultaat alleen daarvoor door. Vink je dit niet aan, dan versturen we niets.",
    submit: "Verstuur mijn aanvraag",
    sending: "Bezig met versturen...",
    success: "Bedankt. We delen je aanvraag meteen met de specialisten die bij je passen. Je hoort van maximaal drie partijen.",
    error: "Versturen is niet gelukt. Controleer je verbinding en probeer het opnieuw."
  },

  standardOptions: [
    { label: "Ja, overal", pct: 1 },
    { label: "Gedeeltelijk", pct: 0.5 },
    { label: "Nee", pct: 0 },
    { label: "Weet ik niet", pct: 0 }
  ],

  /* Profielvragen: niet gescoord. */
  profile: [
    {
      id: "P1",
      text: "Wat is je rol?",
      explain: "Zo stemmen we de uitleg af op wie de check invult. Het heeft geen invloed op je score.",
      options: [
        { id: "owner", label: "Zaakvoerder" },
        { id: "it", label: "IT-verantwoordelijke" },
        { id: "other", label: "Andere functie" }
      ]
    },
    {
      id: "P2",
      text: "Hoeveel mensen werken er in je bedrijf (jij inbegrepen)?",
      explain: "Tel iedereen mee die voor het bedrijf werkt en een computer, telefoon of e-mailadres van de zaak gebruikt.",
      options: [
        { id: "1-10", label: "1–10" },
        { id: "11-49", label: "11–49" },
        { id: "50-249", label: "50–249" },
        { id: "250+", label: "250+" }
      ]
    },
    {
      id: "P3",
      type: "dropdown",
      text: "In welke sector ben je actief?",
      explain: "Sommige sectoren vallen onder strengere regels. Kies wat het dichtst bij je hoofdactiviteit ligt.",
      options: [
        { id: "bouw", label: "Bouw & installatie" },
        { id: "productie", label: "Productie & industrie" },
        { id: "handel", label: "Handel & e-commerce" },
        { id: "transport", label: "Transport & logistiek" },
        { id: "zorg", label: "Zorg" },
        { id: "vrij", label: "Vrije beroepen (boekhouding, advocatuur, architectuur)" },
        { id: "it", label: "IT & digitale diensten" },
        { id: "energie", label: "Energie & nutsvoorzieningen" },
        { id: "voeding", label: "Voeding" },
        { id: "overheid", label: "Overheid & onderwijs" },
        { id: "andere", label: "Andere" }
      ]
    },
    {
      id: "P4",
      text: "Wie beheert jullie IT?",
      explain: "Wie installeert nieuwe computers, lost problemen op en beheert de wachtwoorden? Dat is je IT-beheerder, ook als het er gewoon bij komt.",
      options: [
        { id: "self", label: "Ikzelf of een collega erbij" },
        { id: "partner", label: "Een externe IT-partner" },
        { id: "dept", label: "Een interne IT-afdeling" }
      ]
    }
  ],

  /* Scorevragen: samen 10 punten. Zonder "options" gelden de standaardopties. */
  questions: [
    {
      id: "Q1", weight: 1.5, domain: "toegang", short: "tweestapsverificatie", cap: "iam",
      text: "Tweestapsverificatie: moet iedereen naast een wachtwoord ook een code of app gebruiken om in te loggen op e-mail en belangrijke programma's?",
      explain: "Bij tweestapsverificatie bevestig je het inloggen met een code op je telefoon of in een app. Een gestolen wachtwoord is dan niet genoeg om binnen te raken.",
      tip: "Zet tweestapsverificatie aan op e-mail, boekhouding en bankieren. Het is gratis en stopt de meeste inbraken op accounts."
    },
    {
      id: "Q2", weight: 1.5, domain: "herstel", short: "back-ups", cap: "backup",
      text: "Back-ups: worden je bedrijfsgegevens automatisch geback-upt, los van je netwerk bewaard, en heb je ooit getest of terugzetten werkt?",
      explain: "Een back-up is een reservekopie van je bestanden. Staat die op een andere plek dan je computers en heb je het terugzetten al eens geprobeerd, dan kan je na een hack of brand opnieuw starten.",
      options: [
        { label: "Ja, automatisch, apart bewaard én getest", pct: 1 },
        { label: "We maken back-ups, maar niet getest of niet apart bewaard", pct: 0.5 },
        { label: "Nee", pct: 0 },
        { label: "Weet ik niet", pct: 0 }
      ],
      tip: "Zorg voor automatische back-ups die los van je netwerk staan en test minstens één keer per jaar of terugzetten werkt."
    },
    {
      id: "Q3", weight: 1, domain: "bescherming", short: "updates", cap: "protect",
      text: "Updates: worden computers, telefoons en software automatisch up-to-date gehouden?",
      explain: "Updates dichten lekken die aanvallers al kennen. Staan ze automatisch aan, dan hoef je er zelf niet aan te denken.",
      tip: "Zet automatische updates aan op alle toestellen en vervang software die geen updates meer krijgt."
    },
    {
      id: "Q4", weight: 1, domain: "bescherming", short: "antivirus en firewall", cap: "protect",
      text: "Antivirus en firewall: staat er actuele beveiligingssoftware (antivirus) op alle computers en is er een firewall actief?",
      explain: "Antivirus houdt schadelijke programma's tegen op je computer. Een firewall is de poort tussen je netwerk en het internet en laat alleen gewenst verkeer door.",
      tip: "Installeer actuele beveiligingssoftware op elke computer en controleer of je firewall aan staat."
    },
    {
      id: "Q5", weight: 1, domain: "mensen", short: "opleiding rond phishing", cap: "awareness",
      text: "Medewerkers: kregen je medewerkers het voorbije jaar een training of test rond phishing (valse mails)?",
      explain: "Phishing zijn valse mails die je laten klikken, betalen of een wachtwoord invullen. Wie ze leert herkennen, trapt er veel minder snel in.",
      tip: "Geef je team een korte phishingtraining en test af en toe met een nepmail."
    },
    {
      id: "Q6", weight: 1, domain: "toegang", short: "toegangsbeheer", cap: "iam",
      text: "Toegang: hebben alleen wie het echt nodig heeft beheerdersrechten, en worden accounts van vertrokken medewerkers meteen afgesloten?",
      explain: "Met beheerdersrechten mag je alles installeren en wijzigen. Hoe minder mensen die rechten hebben en hoe sneller oude accounts verdwijnen, hoe minder een aanvaller kan doen.",
      tip: "Beperk beheerdersrechten tot wie ze echt nodig heeft en sluit accounts van vertrekkers dezelfde dag af."
    },
    {
      id: "Q7", weight: 0.5, domain: "toegang", short: "wachtwoorden", cap: "iam",
      text: "Wachtwoorden: gebruikt je team een wachtwoordmanager in plaats van eigen of hergebruikte wachtwoorden?",
      explain: "Een wachtwoordmanager is een beveiligde kluis die voor elk account een sterk wachtwoord maakt en invult. Je team hoeft er dan maar één te onthouden.",
      tip: "Voer een wachtwoordmanager in, zodat niemand nog wachtwoorden hergebruikt."
    },
    {
      id: "Q8", weight: 1, domain: "herstel", short: "noodplan", cap: "ir",
      text: "Noodplan: weet je wie je belt en wat je doet als je morgen gehackt wordt?",
      explain: "Een noodplan is een korte lijst: wie verwittig je, wat schakel je uit en waar staan je back-ups. In paniek is er geen tijd om dat uit te zoeken.",
      options: [
        { label: "Ja, er is een geschreven plan", pct: 1 },
        { label: "Min of meer, we zouden onze IT-partner bellen", pct: 0.5 },
        { label: "Nee", pct: 0 },
        { label: "Weet ik niet", pct: 0 }
      ],
      tip: "Schrijf op één A4 wie je belt en wat je doet bij een hack, en zorg dat iedereen weet waar dat blad ligt."
    },
    {
      id: "Q9", weight: 0.5, domain: "wet", short: "verzekering", cap: null,
      text: "Verzekering: ben je verzekerd tegen cyberschade?",
      explain: "Een cyberverzekering dekt de kosten na een hack, zoals herstel van systemen en omzetverlies. Een gewone aansprakelijkheidspolis doet dat meestal niet.",
      options: [
        { label: "Ja, met een specifieke cyberverzekering", pct: 1 },
        { label: "Ik denk dat een bestaande polis het dekt", pct: 0.5 },
        { label: "Nee", pct: 0 },
        { label: "Weet ik niet", pct: 0 }
      ],
      tip: "Kijk na of je polis cyberschade dekt, of vraag een offerte voor een cyberverzekering."
    },
    {
      id: "Q10", weight: 1, domain: "wet", short: "NIS2", cap: "compliance",
      text: "NIS2: weet je of de Europese NIS2-cyberwetgeving op jouw bedrijf van toepassing is?",
      explain: "NIS2 is een Europese wet die bedrijven in bepaalde sectoren verplicht om hun beveiliging op orde te brengen. Ook leveranciers van die bedrijven krijgen er vragen over.",
      options: [
        { label: "Ja, en we zijn in orde of ermee bezig", pct: 1 },
        { label: "Nagekeken: niet van toepassing", pct: 1 },
        { label: "Ik heb er al van gehoord, maar weet het niet", pct: 0 },
        { label: "Nooit van gehoord", pct: 0 }
      ],
      tip: "Laat nakijken of NIS2 op jouw bedrijf van toepassing is. De verplichtingen gelden al."
    }
  ],

  domains: [
    { id: "toegang", label: "Toegang" },
    { id: "bescherming", label: "Bescherming" },
    { id: "herstel", label: "Herstel" },
    { id: "mensen", label: "Mensen" },
    { id: "wet", label: "Wetgeving & verzekering" }
  ],

  /* Niveaus: van hoog naar laag, "min" is de ondergrens van de score. */
  levels: [
    { id: "good", min: 7.5, label: "Goed beschermd", color: "green",
      text: "Je bent goed bezig. Blijf testen, trainen en bijwerken om dat zo te houden." },
    { id: "mid", min: 5, label: "Op weg", color: "orange",
      text: "Je hebt de basis deels op orde, maar er zijn nog gaten die aanvallers graag gebruiken." },
    { id: "low", min: 0, label: "Kwetsbaar", color: "red",
      text: "Je bedrijf is op meerdere punten een makkelijk doelwit. Goed nieuws: met een paar basismaatregelen boek je snel grote vooruitgang." }
  ],

  insurance: {
    warning: "Let op: verzekeraars vragen vaak basismaatregelen zoals actuele antivirus, firewall en back-ups. Werk deze punten eerst bij om goed verzekerd te kunnen worden.",
    ok: "Je basis is goed om een cyberverzekering aan te vragen."
  },

  nis2: {
    sectors: ["energie", "transport", "zorg", "productie", "voeding", "it", "overheid"],
    sizes: ["50-249", "250+"],
    direct: "Je valt mogelijk onder NIS2. Laat dit nakijken.",
    indirect: "Je wordt mogelijk indirect geraakt via klanten die onder NIS2 vallen."
  }
};
