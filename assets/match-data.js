/*
 * Gegevens achter de matching op de resultaatpagina.
 *
 * Bron: de fiche van elke dienstverlener op vlaio.be (cybersecurity verbetertrajecten),
 * gelezen in november 2026. "bron: fiche" = volledige fiche gelezen; "bron: beperkt" =
 * enkel een uittreksel of het eigen onderzoeksdocument, dus onvolledig.
 * De bedrijven hebben deze gegevens niet bevestigd.
 *
 * caps: wat de dienstverlener uitdrukkelijk aanbiedt (1 = ja, 0.5 = deels, 0 = niet vermeld)
 *   iam = toegang en aanmelden, backup = back-up en herstel, protect = toestellen, netwerk en updates,
 *   awareness = opleiding van medewerkers, compliance = NIS2, CyberFundamentals, ISO 27001 en beleid,
 *   ir = noodplan en incidenten
 * levels: voor welk niveau ze zich richten (low = eerste stappen, mid, good); leeg = niet vermeld
 * sectors: sectoren die ze zelf noemen (ids uit quiz-config.js); leeg = geen of alle sectoren
 * kind: "advies" = vooral analyse en begeleiding, "it" = IT-partner die ook uitvoert of beheert
 * label en region worden getoond; name gaat enkel mee in de aanvraag.
 */
window.MATCH_DATA = {
  weights: { coverage: 60, level: 15, sector: 10, vlaio: 10, kind: 5 },
  providers: [
    { name: "Apogado", label: "Securityadviseur met focus op ISO 27001", region: "provincie Antwerpen", vlaio: true, kind: "advies", bron: "fiche",
      caps: { iam: 0.5, backup: 0.5, protect: 0.5, awareness: 1, compliance: 1, ir: 1 }, levels: ["low", "mid"], sectors: [] },
    { name: "Axians", label: "Grote IT-integrator met securityaanbod", region: "Vlaanderen en Brussel", vlaio: true, kind: "it", bron: "beperkt",
      caps: { iam: 0.5, backup: 0.5, protect: 0.5, awareness: 0.5, compliance: 0.5, ir: 0.5 }, levels: ["low", "mid", "good"], sectors: [] },
    { name: "Cegeka", label: "Grote IT-groep met een traject voor kmo's", region: "Vlaanderen en Brussel", vlaio: true, kind: "it", bron: "fiche",
      caps: { iam: 1, backup: 1, protect: 1, awareness: 1, compliance: 0.5, ir: 1 }, levels: ["low", "mid", "good"], sectors: [] },
    { name: "Cheops", label: "IT-partner voor beheer en cloud", region: "Antwerpen, Vlaams-Brabant en Oost-Vlaanderen", vlaio: true, kind: "it", bron: "fiche",
      caps: { iam: 1, backup: 0, protect: 1, awareness: 1, compliance: 1, ir: 0.5 }, levels: ["low", "mid"], sectors: ["productie", "transport", "handel"] },
    { name: "Cingulum en CRANIUM", label: "Adviseur voor security, privacy en compliance", region: "Vlaams-Brabant, Oost-Vlaanderen en Limburg", vlaio: true, kind: "advies", bron: "fiche",
      caps: { iam: 0.5, backup: 1, protect: 0.5, awareness: 1, compliance: 1, ir: 1 }, levels: ["low", "mid", "good"], sectors: ["zorg", "energie", "transport", "overheid"] },
    { name: "CONXION", label: "Regionale IT-partner voor kmo's", region: "West- en Oost-Vlaanderen", vlaio: true, kind: "it", bron: "beperkt",
      caps: { iam: 0.5, backup: 0.5, protect: 0.5, awareness: 0.5, compliance: 0.5, ir: 0.5 }, levels: ["low", "mid"], sectors: [] },
    { name: "Cresco", label: "Securityadviseur die test zoals een hacker", region: "Brussel en Vlaams-Brabant", vlaio: true, kind: "advies", bron: "fiche",
      caps: { iam: 0.5, backup: 1, protect: 1, awareness: 1, compliance: 1, ir: 1 }, levels: ["low", "mid", "good"], sectors: [] },
    { name: "Cronos Security", label: "Netwerk van securityspecialisten", region: "Vlaanderen en Brussel", vlaio: true, kind: "advies", bron: "fiche",
      caps: { iam: 1, backup: 0.5, protect: 0.5, awareness: 1, compliance: 1, ir: 1 }, levels: ["low", "mid"], sectors: ["productie", "it"] },
    { name: "Cyberplan, Jimber, Secamo", label: "Securityspecialisten voor kmo's", region: "West-Vlaanderen, Oost-Vlaanderen en Antwerpen", vlaio: true, kind: "advies", bron: "beperkt",
      caps: { iam: 0.5, backup: 0.5, protect: 0.5, awareness: 0.5, compliance: 0.5, ir: 0.5 }, levels: ["low", "mid"], sectors: [] },
    { name: "Cyberwise, Alistar", label: "Securityadviseur met IT-beheer", region: "Oost-Vlaanderen en Antwerpen", vlaio: true, kind: "it", bron: "fiche",
      caps: { iam: 1, backup: 1, protect: 1, awareness: 1, compliance: 1, ir: 1 }, levels: [], sectors: ["productie", "handel", "zorg", "transport", "energie"] },
    { name: "Eye Security", label: "Bewaking van je systemen, dag en nacht", region: "West-Vlaanderen", vlaio: false, kind: "advies", bron: "beperkt",
      caps: { iam: 0, backup: 0, protect: 1, awareness: 0, compliance: 0, ir: 1 }, levels: [], sectors: [] },
    { name: "Group K", label: "Regionale IT-partner", region: "Limburg", vlaio: true, kind: "it", bron: "beperkt",
      caps: { iam: 1, backup: 0.5, protect: 1, awareness: 1, compliance: 0.5, ir: 0.5 }, levels: [], sectors: [] },
    { name: "IT1", label: "IT-partner voor kmo's", region: "Oost-Vlaanderen, Vlaams-Brabant en Antwerpen", vlaio: true, kind: "it", bron: "fiche",
      caps: { iam: 1, backup: 1, protect: 1, awareness: 1, compliance: 1, ir: 1 }, levels: ["low", "mid"], sectors: ["bouw", "productie", "vrij"] },
    { name: "Netcure", label: "Securityadviseur voor CyberFundamentals", region: "Vlaams-Brabant en Antwerpen", vlaio: true, kind: "advies", bron: "beperkt",
      caps: { iam: 0.5, backup: 0.5, protect: 0.5, awareness: 0.5, compliance: 1, ir: 0.5 }, levels: [], sectors: [] },
    { name: "Orbid", label: "IT-partner voor infrastructuur en processen", region: "Oost-Vlaanderen", vlaio: false, kind: "it", bron: "beperkt",
      caps: { iam: 0, backup: 0, protect: 0.5, awareness: 1, compliance: 0.5, ir: 0 }, levels: [], sectors: [] },
    { name: "Refracted Security", label: "Gespecialiseerde securityadviseur", region: "provincie Antwerpen", vlaio: true, kind: "advies", bron: "beperkt",
      caps: { iam: 0.5, backup: 0.5, protect: 0.5, awareness: 0.5, compliance: 1, ir: 0.5 }, levels: ["mid", "good"], sectors: [] },
    { name: "Safebyte", label: "Securitytests en opleiding voor kmo's", region: "West-Vlaanderen", vlaio: false, kind: "advies", bron: "beperkt",
      caps: { iam: 0, backup: 0, protect: 0.5, awareness: 1, compliance: 0, ir: 0 }, levels: [], sectors: [] },
    { name: "Savaco", label: "IT-partner voor infrastructuur en beheer", region: "Vlaanderen", vlaio: true, kind: "it", bron: "fiche",
      caps: { iam: 0.5, backup: 0, protect: 1, awareness: 1, compliance: 0.5, ir: 1 }, levels: ["low", "mid", "good"], sectors: ["voeding", "productie"] },
    { name: "Secutec", label: "Opsporing van aanvallen en hulp bij incidenten", region: "provincie Antwerpen", vlaio: false, kind: "advies", bron: "beperkt",
      caps: { iam: 0, backup: 0, protect: 1, awareness: 0, compliance: 0, ir: 1 }, levels: [], sectors: [] },
    { name: "Serso", label: "IT-partner met securityaanbod", region: "Limburg", vlaio: true, kind: "it", bron: "fiche",
      caps: { iam: 1, backup: 1, protect: 1, awareness: 1, compliance: 1, ir: 1 }, levels: ["low", "mid"], sectors: ["productie", "transport", "zorg", "overheid"] },
    { name: "Sertalink", label: "Securityadviseur voor analyse en advies", region: "Oost-Vlaanderen", vlaio: true, kind: "advies", bron: "fiche",
      caps: { iam: 1, backup: 1, protect: 1, awareness: 1, compliance: 0.5, ir: 1 }, levels: [], sectors: [] },
    { name: "Toreon", label: "Securityadviseur voor CyberFundamentals en NIS2", region: "provincie Antwerpen", vlaio: true, kind: "advies", bron: "beperkt",
      caps: { iam: 0.5, backup: 0.5, protect: 0.5, awareness: 0.5, compliance: 1, ir: 0.5 }, levels: [], sectors: ["it", "energie", "productie"] },
    { name: "VanRoey", label: "IT-partner met eigen securitycentrum", region: "provincie Antwerpen", vlaio: false, kind: "it", bron: "beperkt",
      caps: { iam: 0.5, backup: 0.5, protect: 1, awareness: 0, compliance: 0, ir: 0.5 }, levels: [], sectors: [] },
    { name: "Zerobit, Grant Thornton, Soteria", label: "Securityadviseurs met een accountancy-netwerk", region: "Vlaanderen en Brussel", vlaio: true, kind: "advies", bron: "fiche",
      caps: { iam: 1, backup: 0.5, protect: 0.5, awareness: 1, compliance: 0, ir: 1 }, levels: ["low", "mid", "good"], sectors: [] }
  ]
};
