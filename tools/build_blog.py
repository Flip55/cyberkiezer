#!/usr/bin/env python3
"""Builds the static blog: blog/index.html and one page per article.

Run from the repository root:  python3 tools/build_blog.py
Add an article by appending to ARTICLES and running the script again.
"""
import html
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "blog"
DATE = "23 november 2026"

ARTICLES = [
    {
        "slug": "cyberfundamentals-uitgelegd",
        "title": "CyberFundamentals uitgelegd: welk niveau past bij jouw kmo?",
        "summary": "Het Belgische kader voor cyberveiligheid telt vier niveaus. Zo weet je waar je moet beginnen.",
        "body": """
<p>Het Centrum voor Cybersecurity België (CCB) heeft een eigen kader gemaakt om organisaties te helpen zich te beveiligen: CyberFundamentals, kortweg CyFun. Het is gratis, het bestaat in het Nederlands en het is bedoeld voor elke organisatie, van eenmanszaak tot multinational.</p>
<h2>Vier niveaus</h2>
<p>Het kader is opgebouwd in vier niveaus. Elk niveau bevat wat meer maatregelen dan het vorige.</p>
<ul>
<li><strong>Small</strong> is het startniveau. Het is bedoeld voor micro-organisaties en bedrijven met weinig technische kennis, en bevat enkel richtlijnen.</li>
<li><strong>Basic</strong> bevat de standaardmaatregelen voor elke onderneming. Het CCB wil dat elke kmo dit niveau op termijn haalt.</li>
<li><strong>Important</strong> en <strong>Essential</strong> zijn bedoeld voor organisaties die meer risico lopen. Deze niveaus sluiten aan bij de NIS2-wetgeving.</li>
</ul>
<h2>Vijf functies</h2>
<p>Op elk niveau komen dezelfde vijf vragen terug: weet je wat je moet beschermen (identificeren), is het beschermd, merk je het als er iets misgaat (detecteren), weet je wat je dan doet (reageren) en kan je weer opstarten (herstellen)?</p>
<h2>Waar begin je?</h2>
<p>Heb je minder dan tien medewerkers en geen eigen IT'er, begin dan bij Small. Dat komt neer op een handvol afspraken: back-ups, updates, aanmelden in twee stappen, antivirus en goede wachtwoorden. Heb je die op orde, dan is Basic de logische volgende stap.</p>
<p>Val je onder NIS2, dan bepaalt de wet welk niveau je moet halen. Het CCB heeft daarvoor een keuzetool op Safeonweb@Work.</p>
<p>Onze check volgt de basismaatregelen van het kader en toont in drie minuten waar je staat. Het resultaat is een indicatie, geen officiële beoordeling.</p>
""",
    },
    {
        "slug": "vlaio-steun-cybersecurity",
        "title": "VLAIO-steun voor cybersecurity: zo werkt de 50%",
        "summary": "Drie pakketten, een erkende dienstverlener en de helft van de factuur voor VLAIO. Dit moet je weten.",
        "body": """
<p>Een specialist inschakelen om je bedrijf te beveiligen kost geld. In Vlaanderen neemt VLAIO een groot deel daarvan op zich via de cybersecurity verbetertrajecten.</p>
<h2>Wat is een verbetertraject?</h2>
<p>Je werkt samen met een dienstverlener die door VLAIO geselecteerd is. Die brengt je situatie in kaart, maakt een actieplan en helpt je de maatregelen uit te voeren. Er zijn drie pakketten: START, MEDIUM en PLUS. START is het lichtste: een analyse en een actieplan als eerste stap.</p>
<h2>Hoeveel steun krijg je?</h2>
<p>Voor kmo's en maatwerkbedrijven betaalt VLAIO 50% van de kostprijs. De kostprijs van een traject ligt tussen 7.100 en 39.900 euro, afhankelijk van het pakket en de dienstverlener. Grotere ondernemingen die onder NIS2 vallen, krijgen 35%.</p>
<p>VLAIO betaalt zijn deel rechtstreeks aan de dienstverlener. Jij betaalt alleen je eigen helft.</p>
<h2>Hoe start je?</h2>
<ol>
<li>Kies een dienstverlener uit de lijst van VLAIO.</li>
<li>Vraag een offerte voor het pakket dat bij je past.</li>
<li>Jij en VLAIO keuren de offerte goed, daarna kan het traject beginnen.</li>
</ol>
<h2>Kleiner beginnen: de kmo-portefeuille</h2>
<p>Wil je alleen een opleiding voor je team of een beperkt advies, dan kan dat via de kmo-portefeuille. Voor cybersecurity geldt een verhoogd steunpercentage: 45% voor kleine en 35% voor middelgrote ondernemingen, tot 7.500 euro per jaar.</p>
<p class="source">Bron: VLAIO, pagina's over cybersecurity subsidies en verbetertrajecten, geraadpleegd in november 2026. Bedragen en voorwaarden kunnen wijzigen. Controleer ze altijd bij VLAIO.</p>
""",
    },
    {
        "slug": "aanmelden-in-twee-stappen",
        "title": "Aanmelden in twee stappen: de goedkoopste maatregel met het grootste effect",
        "summary": "Een gestolen wachtwoord is niets meer waard als er een tweede stap nodig is. Zo voer je het in zonder gemor.",
        "body": """
<p>De meeste inbraken in kleine bedrijven beginnen met een wachtwoord dat gelekt of geraden is. Aanmelden in twee stappen, ook MFA of 2FA genoemd, maakt zo'n wachtwoord waardeloos voor de aanvaller: zonder de tweede stap komt hij niet binnen.</p>
<h2>Wat is de tweede stap?</h2>
<p>Naast je wachtwoord bevestig je de aanmelding met iets dat alleen jij hebt. Dat kan een app op je telefoon zijn, een fysieke sleutel of een code per sms. Een app of sleutel is veiliger dan sms, maar sms is nog altijd veel beter dan niets.</p>
<h2>Waar zet je het eerst aan?</h2>
<ul>
<li>E-mail en kantoorsoftware. Wie in je mailbox zit, kan van al je andere accounts het wachtwoord laten resetten.</li>
<li>Bankieren en boekhouding.</li>
<li>Beheerdersaccounts van je website, je domeinnaam en je IT-systemen.</li>
<li>Toegang van buitenaf, zoals VPN of extern bureaublad.</li>
</ul>
<p>In Microsoft 365 en Google Workspace is aanmelden in twee stappen inbegrepen in het abonnement. Je IT-partner kan het voor alle gebruikers tegelijk verplichten.</p>
<h2>Zo voer je het in</h2>
<ol>
<li>Kondig het een week vooraf aan en leg uit waarom.</li>
<li>Begin met de zaakvoerder en de boekhouding. Zij zijn het vaakst doelwit.</li>
<li>Help iedereen persoonlijk met de installatie van de app. Dat kost tien minuten per persoon.</li>
<li>Bewaar herstelcodes op een veilige plek, voor als een telefoon verloren gaat.</li>
</ol>
<p>Verwacht de eerste dagen wat vragen. Daarna merkt niemand het nog.</p>
""",
    },
    {
        "slug": "back-ups-3-2-1",
        "title": "Back-ups die werken: de 3-2-1-regel in gewone taal",
        "summary": "Een back-up die je nooit getest hebt, is een hoop, geen plan. Drie cijfers om te onthouden.",
        "body": """
<p>Bij ransomware worden al je bestanden versleuteld en vraagt de aanvaller losgeld. Een goede back-up is dan het verschil tussen een vervelende week en het einde van je bedrijf. Maar veel back-ups blijken waardeloos op het moment dat je ze nodig hebt.</p>
<h2>De 3-2-1-regel</h2>
<ul>
<li><strong>3</strong> kopieën van je gegevens: het origineel en twee back-ups.</li>
<li><strong>2</strong> verschillende soorten opslag, bijvoorbeeld een schijf op kantoor en de cloud.</li>
<li><strong>1</strong> kopie buiten je kantoor, zodat brand, diefstal of een aanval op je netwerk ze niet raakt.</li>
</ul>
<h2>Drie fouten die we vaak zien</h2>
<p><strong>De back-up hangt aan hetzelfde netwerk.</strong> Ransomware versleutelt alles waar ze bij kan, ook de schijf die altijd aangesloten is. Zorg voor een kopie die niet rechtstreeks bereikbaar is vanaf je computers.</p>
<p><strong>Niemand kijkt of hij nog loopt.</strong> Een back-up die drie maanden geleden stilviel, is pas een probleem op de dag dat je hem nodig hebt. Laat je een melding sturen bij elke mislukte back-up.</p>
<p><strong>Terugzetten is nooit getest.</strong> Probeer één keer per kwartaal een map terug te zetten. Zo weet je dat het werkt en hoe lang het duurt.</p>
<h2>Vergeet de cloud niet</h2>
<p>Bestanden in Microsoft 365 of Google Workspace staan veilig bij de leverancier, maar dat is geen back-up. Wat een medewerker of een aanvaller wist, is na een tijd ook daar weg. Vraag je IT-partner hoe lang verwijderde gegevens bewaard blijven en of een aparte back-up nodig is.</p>
<h2>Wat moet je zeker meenemen?</h2>
<p>Boekhouding, klantgegevens, offertes en contracten, e-mail en de instellingen van je belangrijkste software. Maak een lijstje en loop het elk jaar na.</p>
""",
    },
    {
        "slug": "phishing-herkennen",
        "title": "Phishing herkennen: zes signalen die je team moet kennen",
        "summary": "Valse mails worden beter. Deze zes signalen blijven werken, ook als de taal foutloos is.",
        "body": """
<p>Een phishingmail probeert je iets te laten doen: op een link klikken, een bijlage openen, een betaling uitvoeren of een wachtwoord invullen. Vroeger herkende je ze aan de taalfouten. Dat is voorbij. Let daarom op het gedrag van de mail, niet op de spelling.</p>
<h2>Zes signalen</h2>
<ol>
<li><strong>Haast.</strong> "Binnen 24 uur", "laatste herinnering", "je account wordt geblokkeerd". Druk is het belangrijkste wapen van de oplichter.</li>
<li><strong>Een ongewone vraag.</strong> Je leverancier die plots een nieuw rekeningnummer doorgeeft, of je zaakvoerder die via mail een dringende betaling vraagt.</li>
<li><strong>Een afzender die net niet klopt.</strong> Kijk naar het volledige e-mailadres, niet alleen naar de naam.</li>
<li><strong>Een link die ergens anders naartoe gaat.</strong> Hou je muis boven de link en lees het adres voor je klikt.</li>
<li><strong>Een onverwachte bijlage.</strong> Een factuur die je niet verwacht, een "gescand document" of een bestand dat vraagt om macro's in te schakelen.</li>
<li><strong>Een aanmeldpagina na een klik.</strong> Tik het adres van de dienst liever zelf in.</li>
</ol>
<h2>Wat spreek je af in je bedrijf?</h2>
<ul>
<li>Een gewijzigd rekeningnummer controleer je altijd telefonisch, op een nummer dat je al had.</li>
<li>Betalingen boven een bepaald bedrag keurt een tweede persoon goed.</li>
<li>Twijfel je? Stuur de mail door naar één vaste collega of je IT-partner. Niemand wordt uitgelachen om een vraag.</li>
</ul>
<h2>Verdachte berichten melden</h2>
<p>Stuur verdachte mails door naar verdacht@safeonweb.be. Het Centrum voor Cybersecurity België laat de links in die berichten blokkeren.</p>
<h2>Toch geklikt?</h2>
<p>Meld het meteen. Verander het wachtwoord van het account, kijk na of er doorstuurregels in de mailbox zijn toegevoegd en verwittig je bank als er betaalgegevens gedeeld zijn. Snel melden beperkt de schade. Zwijgen maakt ze groter.</p>
""",
    },
    {
        "slug": "nis2-voor-kmo",
        "title": "Valt mijn kmo onder NIS2?",
        "summary": "De Europese cyberwet geldt vooral voor middelgrote en grote bedrijven in bepaalde sectoren. Maar ook kleinere bedrijven voelen ze.",
        "body": """
<p>NIS2 is een Europese richtlijn over cyberveiligheid die in België sinds oktober 2024 van kracht is. Ze verplicht organisaties in een reeks sectoren om hun beveiliging op orde te brengen en ernstige incidenten te melden.</p>
<h2>Voor wie geldt de wet?</h2>
<p>Twee dingen bepalen of je eronder valt: je sector en je grootte.</p>
<ul>
<li><strong>Sector.</strong> De wet somt sectoren op zoals energie, transport, gezondheidszorg, digitale infrastructuur, voeding, chemie, afvalbeheer en bepaalde maakindustrie.</li>
<li><strong>Grootte.</strong> In die sectoren geldt de wet in principe vanaf een middelgrote onderneming: minstens 50 medewerkers of meer dan 10 miljoen euro omzet of balanstotaal.</li>
</ul>
<p>Er zijn uitzonderingen waarbij ook kleinere organisaties onder de wet vallen. Gebruik daarom de test van het Centrum voor Cybersecurity België op Safeonweb@Work om zeker te zijn.</p>
<h2>Wat moet je doen als je eronder valt?</h2>
<ol>
<li>Je organisatie registreren op Safeonweb@Work.</li>
<li>Passende beveiligingsmaatregelen nemen. In België kan je daarvoor het CyberFundamentals-kader gebruiken.</li>
<li>Ernstige incidenten melden aan het CCB.</li>
</ol>
<p>De leiding van het bedrijf is verantwoordelijk voor de naleving.</p>
<h2>Je valt er niet onder. Ben je dan klaar?</h2>
<p>Niet helemaal. Bedrijven die wel onder NIS2 vallen, moeten ook de risico's bij hun leveranciers bekijken. Lever je aan een ziekenhuis, een energiebedrijf of een grote producent, dan kan je klant vragen stellen over je beveiliging of eisen in het contract zetten.</p>
<p>Een kmo die kan tonen dat ze de basismaatregelen op orde heeft, staat dan sterker. Het niveau Basic van CyberFundamentals is daarvoor een goed uitgangspunt.</p>
<p class="source">Dit artikel is een algemene toelichting, geen juridisch advies. Raadpleeg het CCB of een jurist voor je eigen situatie.</p>
""",
    },
    {
        "slug": "wachtwoordbeheerder-kiezen",
        "title": "Een wachtwoordbeheerder kiezen voor je team",
        "summary": "Eén gedeeld Excel-bestand met alle wachtwoorden is een open deur. Hier let je op bij een beter alternatief.",
        "body": """
<p>Een gemiddelde medewerker heeft tientallen accounts. Zonder hulpmiddel kiest iedereen korte wachtwoorden en gebruikt ze overal opnieuw. Lekt er één, dan liggen ze allemaal op straat. Een wachtwoordbeheerder lost dat op: je onthoudt één sterk hoofdwachtwoord en de rest wordt voor je gemaakt en ingevuld.</p>
<h2>Waarom een versie voor bedrijven?</h2>
<p>Gratis versies zijn gemaakt voor één persoon. In een bedrijf wil je meer:</p>
<ul>
<li>wachtwoorden delen met een team zonder ze te mailen;</li>
<li>toegang intrekken als iemand het bedrijf verlaat;</li>
<li>zien wie toegang heeft tot wat;</li>
<li>een noodprocedure als de beheerder zelf uitvalt.</li>
</ul>
<h2>Waar let je op?</h2>
<ul>
<li><strong>Aanmelden in twee stappen</strong> op de wachtwoordbeheerder zelf. Dat is niet onderhandelbaar.</li>
<li><strong>Gedeelde kluizen</strong> per team of per klant.</li>
<li><strong>Werkt overal:</strong> in de browser, op de telefoon en op elk besturingssysteem dat jullie gebruiken.</li>
<li><strong>Onafhankelijke controle:</strong> vraag of de leverancier zijn beveiliging laat nakijken door een externe partij en of die rapporten openbaar zijn.</li>
<li><strong>Exporteren:</strong> je moet je gegevens kunnen meenemen als je overstapt.</li>
<li><strong>Prijs per gebruiker</strong> en wat er gebeurt als je team groeit.</li>
</ul>
<h2>Invoeren in drie stappen</h2>
<ol>
<li>Begin met de gedeelde accounts: sociale media, leveranciersportalen, de website.</li>
<li>Laat iedereen daarna zijn eigen werkaccounts toevoegen en zwakke of hergebruikte wachtwoorden vervangen.</li>
<li>Verwijder het oude Excel-bestand en de briefjes. Echt.</li>
</ol>
<p>Reken op een paar weken voor iedereen eraan gewend is. Plan een kwartier uitleg per persoon in. Dat verdient zich snel terug.</p>
""",
    },
    {
        "slug": "cyberverzekering-wat-dekt-ze",
        "title": "Cyberverzekering: wat dekt ze en wat niet?",
        "summary": "Een polis vervangt geen beveiliging, maar kan wel het verschil maken na een aanval. De drie delen van een typische dekking.",
        "body": """
<p>Veel ondernemers gaan ervan uit dat hun gewone aansprakelijkheidsverzekering ook schade door een cyberaanval dekt. Meestal is dat niet zo. Een cyberverzekering is een aparte polis voor de gevolgen van een hack, een datalek of afpersing.</p>
<h2>Drie delen</h2>
<p>De meeste polissen zijn opgebouwd uit drie onderdelen.</p>
<ul>
<li><strong>Een hulplijn.</strong> Je kan dag en nacht bellen en krijgt technische, juridische en communicatiespecialisten die het incident mee aanpakken. Voor een kmo zonder eigen IT-afdeling is dit vaak het waardevolste deel.</li>
<li><strong>Je eigen schade.</strong> De kosten om systemen te herstellen en gegevens terug te zetten, en vaak ook het omzetverlies terwijl je stilligt.</li>
<li><strong>Schade aan anderen.</strong> Je aansprakelijkheid als gegevens van klanten of partners uitlekken.</li>
</ul>
<h2>Waar je op moet letten</h2>
<ul>
<li><strong>Voorwaarden vooraf.</strong> Verzekeraars vragen een minimum aan beveiliging, zoals back-ups en aanmelden in twee stappen. Zonder die basis krijg je geen polis, of geen uitkering.</li>
<li><strong>Wachttijd bij stilstand.</strong> Omzetverlies wordt vaak pas vergoed na een aantal uren.</li>
<li><strong>Fraude met valse facturen</strong> of een valse zaakvoerder is niet altijd inbegrepen. Vraag ernaar.</li>
<li><strong>Het verzekerde bedrag</strong> en de vrijstelling.</li>
</ul>
<h2>Eerst beveiligen, dan verzekeren</h2>
<p>Een verzekering voorkomt geen aanval. Ze beperkt de financiële schade achteraf. Breng dus eerst je basismaatregelen op orde. Dat verlaagt je risico en maakt het ook makkelijker om een polis te krijgen.</p>
<p class="source">Dit artikel geeft algemene informatie en is geen verzekeringsadvies. Cybersecuritychecker vergelijkt geen verzekeringen. Voor een polis op maat ga je naar een erkende verzekeringsmakelaar.</p>
""",
    },
    {
        "slug": "gehackt-het-eerste-uur",
        "title": "Gehackt: wat doe je in het eerste uur?",
        "summary": "Paniek is een slechte raadgever. Een lijst van zeven stappen om naast de telefoon te leggen.",
        "body": """
<p>Schermen met een losgeldbericht, een mailbox die spam verstuurt, een betaling die je niet herkent. Wat je in het eerste uur doet, bepaalt voor een groot deel hoe erg het wordt. Druk dit artikel af. Als je netwerk plat ligt, kan je het niet meer opzoeken.</p>
<h2>Zeven stappen</h2>
<ol>
<li><strong>Koppel los, maar zet niet uit.</strong> Trek de netwerkkabel uit en schakel wifi uit op de getroffen toestellen. Laat ze aan staan: in het geheugen zitten sporen die een specialist nodig heeft.</li>
<li><strong>Bel je IT-partner.</strong> Heb je een cyberverzekering, bel dan ook de hulplijn van de verzekeraar.</li>
<li><strong>Verwittig je bank</strong> als er betaalgegevens of bankaccounts bij betrokken kunnen zijn.</li>
<li><strong>Verander wachtwoorden vanaf een toestel dat zeker schoon is.</strong> Begin met e-mail en beheerdersaccounts.</li>
<li><strong>Noteer alles.</strong> Wat zag je, wanneer, op welk toestel. Neem foto's van schermen. Je hebt het nodig voor de aangifte en de verzekering.</li>
<li><strong>Controleer je back-ups,</strong> maar sluit ze niet aan op een besmet netwerk.</li>
<li><strong>Informeer je medewerkers</strong> via een kanaal dat nog werkt: telefoon of een berichtengroep.</li>
</ol>
<h2>Betalen of niet?</h2>
<p>De politie en het Centrum voor Cybersecurity België raden af om losgeld te betalen. Je hebt geen garantie dat je je gegevens terugkrijgt en je financiert de volgende aanval. Neem die beslissing nooit alleen en nooit onder tijdsdruk.</p>
<h2>In de dagen erna</h2>
<ul>
<li>Doe aangifte bij de politie.</li>
<li>Zijn er persoonsgegevens gelekt? Dan moet je dat in principe binnen 72 uur melden aan de Gegevensbeschermingsautoriteit.</li>
<li>Val je onder NIS2, dan meld je een ernstig incident ook aan het CCB.</li>
<li>Laat uitzoeken hoe de aanvaller binnenkwam voor je alles weer aansluit.</li>
</ul>
<h2>Bereid het nu voor</h2>
<p>Schrijf vandaag op één pagina de telefoonnummers van je IT-partner, je bank en je verzekeraar, en waar je back-ups staan. Hang ze op papier op kantoor.</p>
""",
    },
    {
        "slug": "it-partner-kiezen",
        "title": "Een IT-partner kiezen: tien vragen over beveiliging",
        "summary": "Je IT-partner heeft de sleutels van je bedrijf. Met deze vragen weet je of hij er zorgvuldig mee omgaat.",
        "body": """
<p>De meeste kmo's besteden hun IT uit. Dat is verstandig, maar het betekent ook dat iemand anders beheerdersrechten heeft op al je systemen. Een goede IT-partner maakt je veiliger. Een slordige is zelf een risico. Stel deze tien vragen aan je huidige partner of aan een kandidaat.</p>
<h2>Over jouw omgeving</h2>
<ol>
<li>Welke back-ups maken jullie van onze gegevens, waar staan ze en wanneer is terugzetten het laatst getest?</li>
<li>Is aanmelden in twee stappen verplicht voor al onze gebruikers? Zo niet, waarom niet?</li>
<li>Hoe en hoe snel installeren jullie updates op onze toestellen en servers?</li>
<li>Krijgen we een overzicht van al onze toestellen, accounts en licenties?</li>
<li>Bewaken jullie onze systemen op verdachte activiteit, en wie krijgt een melding buiten de kantooruren?</li>
</ol>
<h2>Over de partner zelf</h2>
<ol start="6">
<li>Wie bij jullie heeft toegang tot onze systemen, en is die toegang beveiligd met aanmelden in twee stappen?</li>
<li>Wat gebeurt er als jullie zelf gehackt worden? Hoe voorkom je dat het overslaat naar klanten?</li>
<li>Hoe snel reageren jullie bij een incident, ook 's nachts en in het weekend? Staat dat in het contract?</li>
<li>Werken jullie volgens een erkend kader, zoals CyberFundamentals of ISO 27001?</li>
<li>Als we ooit weggaan: hoe krijgen we onze wachtwoorden, documentatie en gegevens mee?</li>
</ol>
<h2>Hoe lees je de antwoorden?</h2>
<p>Een goede partner antwoordt concreet en zonder ergernis, en kan het tonen: een rapport van de back-ups, een lijst van toestellen, een clausule in het contract. Vage antwoorden of "dat is bij ons nog nooit gebeurd" zijn een signaal om door te vragen.</p>
<p>Zet de afspraken op papier. Wat niet in het contract staat, is op de dag van een incident een discussie.</p>
<p>Weet je niet waar je staat? Doe eerst onze check en neem het rapport mee naar het gesprek.</p>
""",
    },
]

HEAD = """<!DOCTYPE html>
<html lang="nl-BE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Public+Sans:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/blog.css">
</head>
<body>
<div class="demo-note">Demo-versie. De artikels zijn testinhoud en zijn nog niet nagelezen door een specialist.</div>
<div class="wrap">
<header class="top">
  <a class="brand" href="../index.html"><span></span>Cybersecuritychecker</a>
  <nav><a href="../index.html">Doe de check</a><a href="index.html">Blog</a><a href="../index.html#steun">VLAIO-steun</a></nav>
</header>
<main>
"""

FOOT = """</main>
<footer>
  <p>Cybersecuritychecker is een demo. De artikels geven algemene informatie en vervangen geen audit of advies op maat.</p>
</footer>
</div>
</body>
</html>
"""

CTA = """<aside class="cta">
  <h2>Hoe staat jouw kmo ervoor?</h2>
  <p>Beantwoord tien vragen en zie je score en je grootste gaten.</p>
  <a class="btn primary" href="../index.html">Doe de check</a>
</aside>
"""


def minutes(body: str) -> int:
    return max(2, round(len(body.split()) / 200))


def build() -> None:
    OUT.mkdir(exist_ok=True)
    items = []
    for a in ARTICLES:
        esc_title = html.escape(a["title"])
        esc_sum = html.escape(a["summary"])
        mins = minutes(a["body"])
        page = (
            HEAD.format(title=esc_title + " | Cybersecuritychecker", description=esc_sum)
            + '<article class="post">\n'
            + '<p class="back"><a href="index.html">Alle artikels</a></p>\n'
            + f"<h1>{esc_title}</h1>\n"
            + f'<p class="meta">{DATE}, {mins} minuten lezen</p>\n'
            + f'<p class="intro">{esc_sum}</p>\n'
            + a["body"].strip()
            + "\n</article>\n"
            + CTA
            + FOOT
        )
        (OUT / f'{a["slug"]}.html').write_text(page, encoding="utf-8")
        items.append(
            f'<li><a href="{a["slug"]}.html"><h2>{esc_title}</h2></a>'
            f"<p>{esc_sum}</p><p class=\"meta\">{mins} minuten lezen</p></li>"
        )
    index = (
        HEAD.format(
            title="Blog | Cybersecuritychecker",
            description="Praktische artikels over cybersecurity voor kmo's in Vlaanderen.",
        )
        + '<div class="blog-head"><h1>Cybersecurity voor kmo\'s, zonder jargon</h1>'
        + "<p>Praktische uitleg over de maatregelen, de regels en de steun.</p></div>\n"
        + '<ul class="posts">\n'
        + "\n".join(items)
        + "\n</ul>\n"
        + CTA
        + FOOT
    )
    (OUT / "index.html").write_text(index, encoding="utf-8")
    print(f"Built {len(ARTICLES)} articles in {OUT}")


if __name__ == "__main__":
    build()
