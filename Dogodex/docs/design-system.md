1.1 Palette de couleurs

Token

Light

Dark

primary

#FF7F50

#FFA07A

primary-foreground

#FFFFFF

#1A120F

secondary

#2A5DFF

#4D79FF

secondary-foreground

#FFFFFF

#FFFFFF

success

#34C759

#30B14F

warning

#FFCC00

#E6B800

error

#FF3B30

#E6342B

neutral‑100

#FFFFFF

#0A0A0A

neutral‑900

#0A0A0A

#FFFFFF

Les valeurs sont inspirées de la lisibilité WCAG et d’une identité “warm & playful” propre aux applis canines. Les tokens suivent la convention role-variant de NativeWind v4 : ils sont exposés en CSS variables puis convertis en classes utilitaires. (willcodefor.beer, nativewind.dev)

1.2 Typographie

Nom

Rem

Tailwind class

Usage

display‑lg

2.986 rem

text‑5xl

Splash, score XP

display

 2.488 rem

text‑4xl

Titres screen

headline

 2.074 rem

text‑3xl

H1 fiche race

title

 1.728 rem

text‑2xl

Cartes

body‑lg

 1.44 rem

text‑xl

Paragraphes

body

 1 rem

text‑base

Texte par défaut

caption

 0.833 rem

text‑sm

Labels icônes

Le système repose sur un modular scale 1.25 pour garder une cohérence visuelle du XS au XXL.

1.3 Espacements & rayons

spacing: 0 2 4 8 12 16 20 24 32 40 48 64 80 96 112 (px)
radius: sm = 4 px, md = 8 px, lg = 16 px, full = 9999 px
shadow‑sm: 0 1 2 rgba(0,0,0,.05)
shadow‑md: 0 4 6 rgba(0,0,0,.08)
shadow‑lg: 0 10 15 rgba(0,0,0,.10)

1.4 Token source → NativeWind

Tokens maintenus dans tokens/design-tokens.json (Figma → Style Dictionary).

Génération automatique :

style-dictionary build --config sd.config.js

Output :

tokens/design-tokens.ts (export JS object)

tailwind.config.js (extend colors, spacing…)