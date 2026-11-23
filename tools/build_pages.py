#!/usr/bin/env python3
"""Builds the two provider overview pages.

Run from the repository root:  python3 tools/build_pages.py
Edit IT_PROVIDERS or INSURERS below and run the script again.

The card texts are based on the team's own research document and on VLAIO's
public list. They have not been confirmed with the companies.
"""
import html
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from layout import BRAND, foot, head  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
VLAIO_URL = "https://www.vlaio.be/nl/subsidies-financiering/cybersecurity-verbetertrajecten/hoe-start-je-jouw-verbetertraject"
VLAIO_POINT = "Door VLAIO erkend voor cybersecurity verbetertrajecten, met 50% steun voor kmo's"

# name, tagline, description, extra points, locations, VLAIO-recognised
IT_PROVIDERS = [
    ("Apogado", "Security en ISO 27001",
     "Securitybedrijf uit Mechelen dat kmo's begeleidt bij informatiebeveiliging en certificering.",
     ["Biedt de pakketten START, MEDIUM en PLUS aan", "Ervaring met ISO 27001"], "Mechelen", True),
    ("Axians", "Grote integrator, deel van VINCI",
     "IT-integrator met vestigingen in Vlaanderen, Brussel en Wallonië.",
     ["Infrastructuur, netwerken en security onder één dak"], "Roeselare, Merelbeke, Asse, Brussel, Herstal", True),
    ("Cegeka", "Grote IT-groep met een kmo-traject",
     "Belgische IT-groep die naast grote organisaties ook kmo's begeleidt met een verbetertraject.",
     ["Brede IT-dienstverlening"], "Hasselt, Leuven, Antwerpen, Brussel, Gent", True),
    ("Cheops", "Managed IT en cloud",
     "IT-dienstverlener die het beheer van systemen en cloud overneemt voor kmo's.",
     ["Managed IT en cloud"], "Kontich, Zaventem, Gent, Herentals, Turnhout", True),
    ("Cingulum en CRANIUM", "Security, privacy en compliance",
     "Samenwerking van twee bedrijven rond informatiebeveiliging, privacy en naleving van regels.",
     ["Security gecombineerd met privacy en compliance"], "Zaventem, Gent, Hasselt", True),
    ("CONXION", "Managed IT voor kmo's in West- en Oost-Vlaanderen",
     "Regionale IT-partner die het dagelijkse IT-beheer voor kmo's opneemt.",
     ["Managed IT voor kmo's"], "Deerlijk, Waregem, Kortrijk, Roeselare, Lokeren", True),
    ("Cresco", "Security-consultancy",
     "Consultancybedrijf gespecialiseerd in cybersecurity.",
     ["Advies en begeleiding rond security"], "Brussel, Zaventem", True),
    ("Cronos Security", "Security-tak van de Cronos-groep",
     "De securitybedrijven van de Cronos-groep, samen erkend als dienstverlener.",
     ["Breed netwerk van securityspecialisten"], "11 vestigingen in Vlaanderen en Brussel", True),
    ("Cyberplan, Jimber, Secamo", "Security voor kmo's",
     "Samenwerking van drie bedrijven die zich richten op cybersecurity voor kmo's.",
     ["Gericht op kmo's"], "Brugge, Gent, Antwerpen", True),
    ("Cyberwise, Alistar", "Security en IT",
     "Samenwerking van twee bedrijven die security en IT-beheer combineren.",
     ["Security gecombineerd met IT-beheer"], "Gent, Sint-Niklaas, Westerlo, Zottegem", True),
    ("Eye Security", "24/7 bewaking, gecombineerd met een cyberverzekering",
     "Securitybedrijf dat de systemen van kmo's dag en nacht bewaakt en daar een eigen cyberverzekering aan koppelt.",
     ["Bewaking en opvolging van incidenten (MDR)", "Ook actief als cyberverzekeraar"], "Oostkamp", False),
    ("Group K", "IT-dienstverlener in Limburg",
     "Limburgse IT-dienstverlener voor kmo's.",
     ["Regionale IT-partner"], "Houthalen-Helchteren", True),
    ("IT1", "IT-dienstverlener voor kmo's",
     "Begeleidt kmo's van analyse en risico-inschatting tot een concrete roadmap en hulp bij de uitvoering, afgestemd op het CyberFundamentals-kader.",
     ["Security-audits, Microsoft 365-omgevingen en netwerkbeveiliging", "Awareness-trajecten en voorbereiding op CyberFundamentals en NIS2"],
     "Dendermonde, Gentbrugge, Grimbergen, Berchem", True),
    ("Netcure", "Kmo-security, CyFun en ISO 27001",
     "Securitybedrijf dat kmo's doorlicht en begeleidt naar een hoger beveiligingsniveau.",
     ["Gap-analyse volgens CyberFundamentals (Basic en Important)", "Technische analyse en risicoanalyse-workshop"], "Zaventem, Kasterlee", True),
    ("Orbid", "Infrastructuur, processen en awareness",
     "IT-dienstverlener die infrastructuur, bedrijfsprocessen en bewustmaking van medewerkers combineert.",
     ["Infrastructuur en processen", "Awareness voor medewerkers"], "Merelbeke", False),
    ("Refracted Security", "Securityspecialist",
     "Gespecialiseerd securitybedrijf uit Lier.",
     ["Gespecialiseerd in cybersecurity"], "Lier", True),
    ("Safebyte", "Security testing en awareness voor kmo's",
     "Test de beveiliging van kmo's en traint medewerkers.",
     ["Security testing", "Awareness-training"], "Ieper", False),
    ("Savaco", "IT-infrastructuur en managed services",
     "IT-dienstverlener met vestigingen verspreid over Vlaanderen.",
     ["IT-infrastructuur en managed services"], "Kortrijk, Ieper, Gent, Zandhoven, Leuven, Roosdaal", True),
    ("Secutec", "Managed detection en incident response",
     "Securitybedrijf dat aanvallen opspoort en helpt bij de afhandeling van incidenten.",
     ["Detectie van aanvallen", "Hulp bij incidenten"], "Aartselaar", False),
    ("Serso", "IT en security",
     "Limburgse dienstverlener voor IT en security.",
     ["IT-beheer gecombineerd met security"], "Lummen", True),
    ("Sertalink", "Security-analyse en advies",
     "Securitybedrijf dat de beveiliging van organisaties analyseert en adviseert.",
     ["Analyse en advies"], "Belsele", True),
    ("Toreon", "Security-consultancy en CyFun-analyse",
     "Antwerps consultancybedrijf voor cybersecurity.",
     ["Analyse volgens CyberFundamentals"], "Antwerpen", True),
    ("VanRoey", "Managed IT met een eigen securitycentrum voor kmo's",
     "IT-dienstverlener uit de Kempen met een eigen centrum dat de beveiliging van klanten opvolgt.",
     ["Managed IT", "Eigen security operations center (SOC)"], "Turnhout", False),
    ("Zerobit, Grant Thornton, Soteria", "Consultancy met een accountancy-netwerk",
     "Samenwerking van drie bedrijven die securityadvies combineren met een netwerk van accountants.",
     ["Advies en begeleiding rond security"], "Antwerpen, Brussel, Doornik, Turnhout, Gent, Leuven", True),
]

# name, tagline, description, points, sold via
INSURERS = [
    ("Chubb", "Cyberpolis via makelaars",
     "Internationale verzekeraar met een cyberpolis voor bedrijven.",
     ["Biedt makelaars een snelle offerteprocedure voor cyberpolissen", "Combineert de polis met preventiediensten"], "Makelaars"),
    ("Eye Security", "Bewaking en verzekering in één",
     "Securitybedrijf dat 24/7 bewaking van je systemen combineert met een eigen cyberverzekering.",
     ["Bewaking en opvolging van incidenten (MDR)", "Verzekering via het eigen Eye Underwriting"], "Rechtstreeks en via adviseurs"),
    ("Hiscox", "Cyberpolis voor zelfstandigen en kmo's",
     "Gespecialiseerde verzekeraar met een cyberpolis voor kleinere ondernemingen.",
     ["Werkt met partners voor juridisch advies en securityscans"], "Makelaars"),
    ("KBC", "KBC-Cyberverzekering",
     "Bank-verzekeraar met een cyberverzekering voor ondernemingen.",
     ["IT-, PR- en juridische experten staan dag en nacht klaar bij een incident", "Vergoedt schade en herstel na een cyberincident"], "KBC-verzekeringstussenpersoon"),
    ("Stoïk", "Cyberverzekering met preventie voor kmo's",
     "Verzekeraar gespecialiseerd in cyberrisico's voor kmo's, die de polis combineert met eigen preventie- en bewakingsdiensten.",
     ["Preventieplatform en e-mailbeveiliging", "Eigen team voor incidenten, dag en nacht bereikbaar"], "Makelaars"),
]


def esc(s: str) -> str:
    return html.escape(s)


def monogram(name: str) -> str:
    parts = [p for p in name.replace(",", " ").split() if p.lower() != "en"]
    return (parts[0][0] + (parts[1][0] if len(parts) > 1 else parts[0][1:2])).upper()


def card(name, tagline, desc, points, foot_label, foot_value, tag=None, link=None) -> str:
    lis = "".join(f"<li>{esc(p)}</li>" for p in points)
    tag_html = f'<span class="tag">{esc(tag)}</span>' if tag else ""
    link_html = f'<a href="{link[0]}">{esc(link[1])}</a>' if link else ""
    return f"""<article class="card">
  <div class="card-head"><div class="mono" aria-hidden="true">{esc(monogram(name))}</div><div><h2>{esc(name)}</h2><p>{esc(tagline)}</p></div></div>
  {tag_html}
  <p>{esc(desc)}</p>
  <div><h3>Kenmerken</h3><ul class="checks">{lis}</ul></div>
  <div class="card-foot"><p><strong>{esc(foot_label)}:</strong> {esc(foot_value)}</p>{link_html}</div>
</article>"""


def closing(title: str, text: str) -> str:
    return f"""<aside class="closing">
  <h2>{esc(title)}</h2>
  <p>{esc(text)}</p>
  <a class="btn primary" href="index.html#quiz">Start de gratis check</a>
</aside>
"""


def build() -> None:
    it_cards = "\n".join(
        card(n, t, d, ([VLAIO_POINT] if v else []) + pts, "Vestigingen", loc,
             tag="VLAIO-erkend" if v else None,
             link=(VLAIO_URL, "Bekijk de erkenning bij VLAIO") if v else None)
        for n, t, d, pts, loc, v in IT_PROVIDERS
    )
    n_vlaio = sum(1 for p in IT_PROVIDERS if p[5])
    it_page = (
        head("IT-dienstverleners voor cybersecurity | " + BRAND,
             "Overzicht van IT- en securitydienstverleners voor kmo's in Vlaanderen, waaronder de door VLAIO erkende dienstverleners.",
             "", "it")
        + f"""<div class="page-head">
  <h1>IT- en securitydienstverleners voor kmo's op een rij</h1>
  <p class="lead">Een overzicht van {len(IT_PROVIDERS)} dienstverleners die kmo's helpen met hun beveiliging. {n_vlaio} daarvan zijn door VLAIO erkend voor een verbetertraject met 50% steun.</p>
  <a class="btn primary" href="index.html#quiz">Start de gratis check</a>
</div>
<div class="cards">
{it_cards}
</div>
<p class="source">VLAIO-erkenning volgens de <a href="{VLAIO_URL}">lijst van VLAIO</a>, geraadpleegd in november 2026. Alle merknamen zijn eigendom van hun respectieve houders. Vermelding dient enkel ter identificatie en is gebaseerd op publiek beschikbare informatie. Staat jouw bedrijf hier nog niet bij? <a href="index.html#aanbieders">Neem contact met ons op</a>.</p>
"""
        + closing("Welke dienstverlener past bij jouw bedrijf?",
                  "Beantwoord 14 korte vragen. Je krijgt een score op 10 en je drie belangrijkste verbeterpunten, zodat je weet welke hulp je nodig hebt.")
        + foot("")
    )
    (ROOT / "it-dienstverleners.html").write_text(it_page, encoding="utf-8")

    ins_cards = "\n".join(card(n, t, d, pts, "Verkoop via", via) for n, t, d, pts, via in INSURERS)
    ins_page = (
        head("Cyberverzekeraars in België | " + BRAND,
             "Overzicht van verzekeraars met een cyberpolis voor Belgische kmo's. Geen prijsvergelijking en geen advies.",
             "", "ins")
        + f"""<div class="page-head">
  <h1>Cyberverzekeraars voor kmo's op een rij</h1>
  <p class="lead">Een overzicht van verzekeraars met een cyberpolis voor Belgische ondernemingen. De meeste verkopen hun polis via een makelaar.</p>
  <p>{BRAND} vergelijkt geen premies of voorwaarden en geeft geen verzekeringsadvies. Voor een polis op maat ga je naar een makelaar die bij de FSMA is ingeschreven.</p>
  <a class="btn primary" href="index.html#quiz">Start de gratis check</a>
</div>
<div class="cards">
{ins_cards}
</div>
<p class="source">In alfabetische volgorde, zonder rangschikking. Alle merknamen zijn eigendom van hun respectieve houders. Vermelding dient enkel ter identificatie en is gebaseerd op publiek beschikbare informatie.</p>
"""
        + closing("Ben je klaar om een cyberverzekering aan te vragen?",
                  "Verzekeraars vragen vaak basismaatregelen zoals back-ups en tweestapsverificatie. De check toont in 3 minuten of je basis in orde is.")
        + foot("")
    )
    (ROOT / "cyberverzekeraars.html").write_text(ins_page, encoding="utf-8")
    print(f"Built it-dienstverleners.html ({len(IT_PROVIDERS)} cards, {n_vlaio} VLAIO) and cyberverzekeraars.html ({len(INSURERS)} cards)")


if __name__ == "__main__":
    build()
