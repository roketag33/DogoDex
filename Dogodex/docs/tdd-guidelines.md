Cycle RED‑GREEN‑REFACTOR sur chaque commit.

Stack :

Jest 30 + React Native Testing Library v14 pour tests UI 👀 (reactnative.dev)

msw 2 pour mocks réseau.

Playwright pour E2E (Expo web + EAS build). (medium.com)

Pyramide : 70 % unitaires, 25 % intégration, 5 % E2E.

Règle de commit : « Aucun code de prod sans test rouge précédent ».

Coverage > 80 %, seuil bloquant CI.