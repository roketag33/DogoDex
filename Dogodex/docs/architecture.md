2.1 Pages / Screens

Route

Description

MVP

/ (Home)

Dashboard collection + CTA « Scanner »

✓

/capture

Camera live + détection ML

✓

/encyclopedia

Liste 400 races

✓

/breed/[id]

Fiche détaillée race

✓

/collection

Races capturées (album)

✓

/map

Carte des captures (optionnel)

v1

/achievements

Badges & niveaux

v1

/settings

Thème, langue, debug

✓

/about

Open‑source, licences

✓

Les 400 races sont alignées sur la nomenclature FCI mise à jour mai 2025. (fci.be, fci.be, brit-petfood.com)

2.2 Services ( /src/services )

BreedDetectionService : wrapper TensorFlow Lite, méthode detect(uri): Promise<Prediction[]>.

BreedRepository : interface d’accès aux races (mock JSON local → futur backend).

PhotoStorageService : enregistre la photo, renvoie l’URI.

SyncService : gère la synchro locale ↔ backend (queue offline).

I18nService : exposé par i18next + expo-localization.

AnalyticsService : events (screen_view, capture_success, error) → GA4 ou PostHog.

2.3 Dossier
src/
 ├─ app/             # design-system atoms/molecules
 ├─ entities/        # models (Breed, Capture, User)
 ├─ features/
 │   └─ capture/
 │        ├─ ui/
 │        ├─ hooks/
 │        └─ api/
 ├─ shared/
 ├─ processes/       # onboarding, sync flows