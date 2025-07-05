Dogodex – Recherche et Planification du Projet
Design System minimaliste
Un design system mobile minimaliste met l’accent sur la simplicité visuelle et la cohérence. Il convient d’utiliser une palette restreinte de couleurs neutres ou douces afin d’obtenir une interface épurée et lisible
bejamas.com
. De même, on privilégiera une typographie sans-serif simple et élégante pour assurer une bonne lisibilité sur mobile, en évitant les polices fantaisistes ou trop ornées
semnexus.com
. Un design minimaliste efficace s’appuie également sur beaucoup d’espaces blancs et des contrastes mesurés, créant une ambiance calme qui met en valeur le contenu
medium.com
. En termes de design tokens (couleurs, tailles, espacements, etc.), il est recommandé de centraliser ces styles pour les réutiliser facilement. Des outils comme Style Dictionary d’Amazon permettent de définir ces tokens de façon agnostique et de les exporter vers plusieurs plateformes (web, iOS, Android, etc.)
npmjs.com
. Pour un projet React Native utilisant NativeWind (implémentation de Tailwind CSS pour RN), on peut configurer Style Dictionary de sorte à générer un thème Tailwind custom : les design tokens (couleurs, fontes, etc.) sont alors injectés dans la configuration de NativeWind afin de garder l’ensemble du style cohérent entre le design et le code. Des solutions existent pour intégrer Style Dictionary avec des outils de design comme Figma (par ex. le plugin Figma Tokens) afin d’automatiser l’export des palettes et typographies vers le code
michaelmang.dev
backlight.dev
. Outils recommandés : Style Dictionary pour gérer et exporter les design tokens, combiné avec NativeWind pour appliquer ces styles dans les composants React Native via des classes utilitaires. On peut également citer Tailwind CSS Color Palette (générateur de palettes) ou Tokens Studio (plugin Figma) pour s’inspirer et définir un thème minimaliste. Inspirations de design system : Le design system Eva (utilisé par la librairie UI Kitten) est un bon exemple open-source, avec une documentation complète et des thèmes light/dark prêts à l’emploi
akveo.github.io
. Il propose des composants cohérents et un set de tokens personnalisables, le tout dans un style sobre. De même, les guidelines Material Design de Google ou les Human Interface Guidelines d’Apple peuvent servir de référence pour les principes typographiques et colorimétriques, même dans une approche plus minimaliste. Par exemple, Material Design insiste sur l’accessibilité des contrastes et la hiérarchie typographique, que l’on peut appliquer à Dogodex en gardant une palette plus réduite. Enfin, on pourra consulter des exemples de design minimaliste sur des applications d’encyclopédie/éducation (Dribbble regorge de concepts de Pokédex et d’apps éducatives minimalistes) afin d’en tirer des idées d’interface épurée et centrée sur le contenu (images et fiches descriptives des races).
Architecture et screens de l’application
Pour une application type Pokédex canin, il faut identifier l’ensemble des écrans nécessaires et choisir une architecture modulaire et évolutive. Voici une liste des écrans qu’un Dogodex devrait comporter :
Écran d’accueil / Home : présentation de l’application ou logo (optionnel si on va directement à la liste).
Liste des races : écran principal listant toutes les races de chiens, avec éventuellement un champ de recherche et des filtres (par groupe, taille, etc.), similaire à une liste de Pokémon
medium.com
.
Détail d’une race : fiche détaillée pour chaque race (photos, description, traits de caractère, etc.), accessible depuis la liste
medium.com
.
Recherche : possibilité de rechercher une race par nom (peut être intégré à la liste principale via une SearchBar).
Favoris : écran listant les races marquées comme favorites par l’utilisateur (si la fonctionnalité de favori est prévue).
Écran de groupe (optionnel) : si on souhaite naviguer par groupes de races (FCI ou AKC), un écran pouvant afficher les groupes (ex : Groupe 1 Chiens de berger, Groupe 2 Molossoïdes, etc.) puis la liste des races du groupe choisi.
À propos / Informations : écran contenant des infos sur l’application, les sources des données (FCI, AKC…), mentions légales éventuelles.
Paramètres : éventuellement pour basculer le thème clair/sombre ou changer la langue, si nécessaire.
En ce qui concerne l’architecture du code, une approche combinant Clean Architecture et Feature-Sliced Design est recommandée pour un projet Expo/React Native de cette envergure. Cela permet une séparation claire des préoccupations, tout en organisant le code par fonctionnalités métier. Les principes de la Clean Architecture suggèrent de séparer la logique métier (modèles de données, règles métier) des détails d’implémentation (UI, framework, API) afin de pouvoir faire évoluer chaque couche indépendamment
medium.com
. Concrètement, on peut définir des couches Domain (entités métier, ex : classe/TypeScript type Breed), Data (accès aux données, ex : services API ou base locale) et Presentation (composants React Native, hooks, état UI). L’objectif est de découpler la logique métier du framework : par exemple, la liste des races ne doit pas dépendre directement de composants RN, mais d’un service pouvant être implémenté par une API ou par des données mockées – ce qui facilitera la transition vers le backend NestJS plus tard. On peut définir une interface BreedRepository avec des méthodes comme getAllBreeds(), getBreedDetails(id) etc., dont on fournirait une implémentation mock (JSON local) dans un premier temps, puis une implémentation API (appels HTTP vers NestJS) une fois le backend prêt. Ce respect de l’inversion de dépendance assure que l’UI ne dépend que d’abstractions et non d’une API concrète. Parallèlement, l’approche Feature-Sliced Design (FSD) propose de structurer le projet par fonctionnalités verticales plutôt que par types de fichiers
serhiikoziy.medium.com
. Cela signifie regrouper dans un même dossier tout le code relatif à une feature donnée (par ex. la gestion des favoris, ou la recherche) – composants UI, état, styles, etc. – plutôt que d’avoir des dossiers globaux components/, screens/, etc. L’application est découpée en plusieurs couches selon FSD : l’App (configuration globale, navigation/routing, providers), les screens (écrans au niveau des routes, qui assemblent plusieurs features), les Features (fonctionnalités unitaires réutilisables, ex : un composant de recherche, un toggle de favori), les Entities (modules définissant les structures de données et logiques liées aux entités métier, ex : breed avec son type et peut-être des fonctions utilitaires), et le Shared (code partagé, utilitaires, composants génériques communs)
serhiikoziy.medium.com
. Chaque couche n’interagit qu’avec certaines autres de manière contrôlée : par exemple une Page peut utiliser plusieurs Features et Entities, une Feature peut utiliser des Entities et du Shared, mais une Entity ne dépend de rien d’autre (elle est au cœur de la logique métier). Cette organisation favorise la modularité et la lisibilité du code, et facilite le scaling du projet
serhiikoziy.medium.com
. Concrètement, pour Dogodex, on pourrait adopter une arborescence comme suit (inspirée de FSD) :
graphql
Copier
Modifier
src/
 ├── app/                # Initialisation de l'app (App.tsx), navigation, thème global
 ├── processes/          # (optionnel) flux combinant plusieurs features, ex: onboarding si nécessaire
 ├── screens/              # Écrans correspondant aux screens/routes principales
 │    ├── BreedsListPage/    # Page liste des races
 │    │    ├── BreedsListPage.tsx
 │    │    └── index.ts            # (facultatif pour export)
 │    └── BreedDetailPage/   # Page détail d’une race
 │         ├── BreedDetailPage.tsx
 │         └── index.ts
 ├── features/           # Composants/Features modulaires
 │    ├── search/            # Feature barre de recherche
 │    │    ├── SearchBar.tsx
 │    │    └── index.ts
 │    ├── favorites/         # Feature gestion des favoris
 │    │    ├── FavoriteToggle.tsx
 │    │    └── useFavorites.ts    # Hook de logique favoris
 │    └── ... (autres features si besoin)
 ├── entities/           # Logique métier et structures de données
 │    ├── breed/             # Entité "Race de chien"
 │    │    ├── Breed.ts        # Type/Interface Breed + fonctions associées
 │    │    └── BreedRepository.ts  # Interface repository pour accès données de Breed
 │    └── user/ ... (si on avait des entités utilisateur, etc.)
 └── shared/             # Modules partagés (UI générique, utils)
      ├── components/        # ex: Button générique, ImageLoader, etc.
      ├── utils/             # ex: formatters, hooks utilitaires
      └── styles/            # tokens globaux, contextes de thème, etc.
Cette structure est indicative et peut être adaptée. L’important est de ranger le code par domaines fonctionnels (features) et couches logiques. Ainsi, un développement sur Expo peut rester organisé et prêt pour l’intégration d’un backend NestJS futur. Bonnes pratiques supplémentaires : maintenir les états locaux avec un store si nécessaire (par ex. Redux Toolkit ou Zustand peuvent être intégrés dans la couche app/providers), isoler les appels API dans la couche data (on pourra plus tard brancher Prisma/PostgreSQL via NestJS sans modifier la couche présentation), et documenter dans le README la structure adoptée pour que les nouveaux contributeurs s’y retrouvent.
TDD (Test Driven Development) sur Expo
Adopter le TDD pour Dogodex implique de mettre en place une stack de tests complète, couvrant des tests unitaires jusqu’aux tests end-to-end, afin de garantir la qualité à chaque étape. Sur Expo/React Native, la configuration de base recommandée inclut Jest comme test runner et react-native-testing-library (RNTL) pour les tests de composants. Jest est un framework de test JavaScript très performant, et constitue la base pour les tests unitaires en React Native
dev.to
. On peut l’installer avec RNTL et quelques presets spécifiques RN : par exemple @testing-library/jest-native pour des matchers adaptés aux éléments React Native
dev.to
. Une fois Jest configuré (preset: react-native dans package.json + fichiers de setup éventuels), on peut écrire des tests unitaires classiques en JavaScript/TypeScript pour toutes les fonctions ou composants purs de l’application. Les tests unitaires sont la fondation de la pyramide de tests et se concentrent sur de toutes petites unités de code isolées
dev.to
 (ex : tester une fonction utilitaire de formatage, ou un hook custom en mockant ses dépendances). Pour les tests de composants (tests d’interface), React Native Testing Library permet de rendre un composant RN dans un environnement de test et d’interagir avec (rechercher des éléments par texte, simuler des clics, etc.). C’est très utile pour vérifier qu’un composant affiche bien les données fournies via props ou contexte et réagit correctement aux interactions. On peut par exemple tester que le composant BreedDetailPage affiche le nom de la race et une image lorsque les props correspondantes sont fournies, ou que le bouton "Ajouter aux favoris" appelle la bonne fonction au clic. Ce type de test se rapproche de tests d’intégration au sens large, car il vérifie l’intégration du composant avec la bibliothèque UI et éventuellement la navigation. En React Native, on peut considérer les tests de composants comme une forme de tests d’intégration lorsqu’ils couvrent l’enchaînement de plusieurs composants ou l’utilisation de contextes (par ex tester qu’en appuyant sur un élément de la liste, on navigue vers la page de détails – ce qui nécessite de rendre le composant liste avec un NavigationContainer mocké). RNTL permet ce genre de test multi-composant. En pratique, on écrira des tests qui montent une page complète (Page Liste ou Page Détail) avec navigation simulée, et on vérifiera que l’ensemble fonctionne (ex: le fait de taper dans la SearchBar filtre la liste, etc.). Ces tests d’intégration assurent que les différentes parties de l’application fonctionnent bien ensemble (ex: interaction entre un composant et son contexte, ou navigation entre deux écrans)
dev.to
dev.to
. Au sommet, les tests end-to-end (E2E) viendront simuler le parcours utilisateur réel dans l’application packagée. Pour cela, Detox est l’outil de référence en React Native : il s’agit d’un framework de test E2E gray-box qui lance l’application sur un émulateur/simulateur et automatise des interactions (taps, saisies) comme le ferait un utilisateur. Detox est bien intégré avec Jest (via detox init -r jest) et permet d’écrire des scénarios haut niveau, par exemple "Lancer l’app, vérifier que la liste des races s’affiche, taper 'Beagle' dans la recherche, vérifier que seuls les résultats correspondants apparaissent, puis cliquer sur un élément et vérifier que l’écran de détail s’ouvre" – ce scénario va réellement faire tourner l’app dans un device virtuel. On prépare Detox en configurant un build spécifique (il faudra un build iOS et Android en mode test, Detox se charge de lancer Metro, d’installer l’app, etc.). Ce genre de tests attrape les problèmes d’intégration globaux et garantit que l’application fonctionne dans son ensemble du point de vue de l’utilisateur final
dev.to
. Il faut en avoir, mais en quantité raisonnable (quelques scénarios critiques) car ils sont plus longs à exécuter. Outils de test recommandés :
Jest + @testing-library/react-native pour les tests unitaires et de composants. Ces outils offrent un environnement de test rapide et un API expressive pour interroger le rendu des composants.
Detox pour les tests E2E sur simulateur. Detox permet de tester sur iOS et Android; on pourra l’intégrer dans la CI plus tard pour lancer la suite E2E sur chaque build.
Mocks et utils : utiliser jest.mock() pour isoler les tests (par ex. mocker le module de navigation pour tester un composant indépendamment). Pour les appels réseau, on peut utiliser des solutions comme MSW (Mock Service Worker) qui peut fonctionner avec React Native (en interceptant fetch) afin de simuler les réponses de l’API NestJS tant que celle-ci n’est pas prête. Sinon, Jest peut aussi mocker fetch ou utiliser des faux objets JSON.
Couverture de code : configurer Jest pour générer un rapport de coverage (--coverage) et viser un pourcentage élevé (par ex. 90%). Cela permet de suivre la progression et de s’assurer que les parties critiques sont testées.
Tests UI visuels (optionnel) : on peut utiliser les snapshot tests de Jest pour capturer le rendu d’un composant et détecter les changements inattendus dans le layout. C’est à utiliser avec parcimonie (mettre à jour les snapshots peut être fastidieux), mais pour un composant statique comme une carte de race, cela peut assurer qu’aucune régression visuelle n’est introduite
cursor.directory
.
En termes de méthodologie TDD, on encouragera les développeurs à écrire d’abord un test qui échoue puis le code correspondant (cycle red-green-refactor). Par exemple, écrire un test unitaire pour la fonction filtrant les races par nom, constater qu’il échoue, implémenter la fonction, puis refactorer en s’appuyant sur le test vert. De même pour un composant : écrire un test du type "le composant BreedCard affiche le nom et l’image", le voir échouer, puis coder le composant jusqu’à réussite. Ce processus garantit une couverture dès l’écriture du code et aide à clarifier les intentions. Il est également important de maintenir une pyramide de tests équilibrée : beaucoup de tests unitaires (rapides, isolés) à la base, quelques tests d’intégration au milieu, et peu de tests E2E en sommet
dev.to
. Cette distribution assure une excellente base de qualité tout en gardant la suite de tests rapide. Les tests unitaires/documentaires peuvent être exécutés en pré-commit (via Husky par ex.) pour empêcher l’introduction de régressions triviales, tandis que les tests E2E tourneront plutôt en CI (GitHub Actions) sur les pull requests. Enfin, adopter des conventions de commit claires aide à relier la démarche TDD au contrôle de version. La convention Conventional Commits est largement utilisée : chaque message de commit commence par un type (feat, fix, test, refactor, chore, etc.) et une description concise. Par exemple, on pourra faire des commits feat: add BreedList screen with search bar ou test: add unit tests for Breed filter function. Ce format standardisé facilite la génération automatique de changelogs et la gestion des versions sémantiques
conventionalcommits.org
. Il clarifie aussi l’intention de chaque changement – un commit commençant par test: indique que du code de test a été ajouté ou modifié. On pourra outiller le repo avec un linter de message de commit (Commitlint) pour faire respecter ces règles. En combinant TDD et commits fréquents et explicites, on documente l’évolution du code et on assure une qualité continue tout au long du développement.
Intégration de Cursor (.cursorrules)
Cursor est un éditeur alimenté par l’IA qui permet de générer du code assisté. L’un de ses atouts est la possibilité de définir un fichier de règles de projet (.cursorrules) pour guider l’IA et l’adapter aux conventions du projet
github.com
github.com
. Pour Dogodex, tirer parti de .cursorrules permettra d’accélérer le développement en s’assurant que chaque morceau de code généré respecte notre architecture, notre design system et nos bonnes pratiques de test. Des exemples issus de projets open-source montrent comment structurer un .cursorrules efficace. Typiquement, le fichier contient un “system prompt” détaillé décrivant le contexte du projet, suivi de règles et astuces. Par exemple, un .cursorrules pour une app Expo peut lister des best practices mobiles à respecter : « Utiliser des composants fonctionnels avec Hooks », « Utiliser les APIs Expo (expo-image, expo-font...) », « Employer React Navigation pour la navigation », « Gérer les erreurs et les crash reports proprement », etc
app.prompthub.us
. On peut également y définir la structure des dossiers du projet afin que l’IA crée les fichiers au bon endroit : par exemple, indiquer que les sources sont dans src/ avec des sous-dossiers components/, screens/, hooks/, etc., ou adopter directement le schéma feature-sliced évoqué plus haut
app.prompthub.us
. En fournissant ces indications, on garantit une cohérence dans la génération de code (l’agent AI saura par exemple qu’un nouveau composant UI générique doit aller dans src/shared/components/, qu’un écran correspond à un fichier dans src/screens/..., etc.). Un bon .cursorrules couvre aussi les conventions de code et de style propres au projet. Pour Dogodex, on pourra inclure des règles sur l’écriture du TypeScript (ex : toujours typer les fonctions et props, ne pas utiliser any
notsobrightideas.com
notsobrightideas.com
), sur la nomenclature (ex : utiliser camelCase pour les fonctions/variables, PascalCase pour les composants, kebab-case pour les noms de fichiers
notsobrightideas.com
), et sur les principes de conception (respecter SOLID, éviter les fonctions trop longues, etc.
notsobrightideas.com
). L’IA de Cursor suivra alors ces consignes dans ses suggestions de code, renforçant la qualité et la consistance du codebase. On peut même y inclure des guidelines de tests : par exemple, demander à l’AI de toujours fournir un fichier de test unitaire pour chaque nouveau composant ou module créé. Un extrait de règles de test pourrait être « Pour chaque composant, générer un fichier de test avec react-native-testing-library. Suivre le pattern Arrange-Act-Assert dans les tests
notsobrightideas.com
. Écrire des tests Given-When-Then pour les cas d’usage importants. Utiliser Jest et Detox pour respectivement les tests unitaires et E2E
cursor.directory
. ». Ainsi, si l’on demande à Cursor de “générer le composant BreedCard et son test”, il saura qu’il doit produire deux fichiers avec le bon contenu. Plusieurs projets open-source bien testés utilisent cette approche. Par exemple, le template React Native d’Obytes inclut un fichier .cursorrules personnalisant l’IA pour qu’elle suive leur stack Expo/TypeScript/Tailwind/Husky, etc., ce qui couvre en partie notre cas d’usage
github.com
. De même, le dépôt awesome-cursorrules recense des règles pour différentes stacks. On y trouve notamment une configuration pour “TypeScript (Expo, Jest, Detox)” qui correspond tout à fait à Dogodex : ces règles indiquent à l’AI comment structurer une app Expo en TypeScript avec des tests unitaires Jest et des tests E2E Detox
x.com
. En s’inspirant de ces exemples, on pourra rédiger nos propres règles. Exemple de .cursorrules pour Dogodex (extraits imaginés) :
js
Copier
Modifier
// Dogodex .cursorrules

system:
"You are an expert TypeScript and React Native developer. You are assisting in a Dog Breeds encyclopedia app (Dogodex) built with Expo. Follow the project’s coding standards and architecture when generating code."

rules:
1. **Architecture & Structure** – Le projet suit une architecture type Clean Architecture + Feature-Sliced. Placez les nouveaux fichiers dans les dossiers appropriés (`src/screens`, `src/features`, etc.). Par ex., un composant de page ira dans `src/screens/<FeatureName>/<FeatureName>Page.tsx` et son test dans `src/screens/<FeatureName>/<FeatureName>Page.test.tsx`.  
2. **Design & Styling** – Utilisez **NativeWind** pour les styles (classes Tailwind) en vous basant sur le design system minimaliste du projet. Les couleurs et tailles doivent être celles définies dans les design tokens (consultez `src/shared/styles/tokens.ts`). Préférez les composants de base partagés (boutons, etc. depuis `src/shared/components`) au lieu de recréer du style inline.  
3. **Bonnes pratiques Mobile** – Toujours utiliser des composants fonctionnels avec Hooks (pas de classes):contentReference[oaicite:34]{index=34}. Gérez la navigation via *React Navigation* (Stack Navigator déjà configuré dans `src/app/App.tsx`). Exploitez les API Expo quand pertinent (par ex. `Image` de expo-image pour optimiser le chargement des images). Évitez tout code bloquant le rendu (privilégiez les appels asynchrones non bloquants).  
4. **Accessibilité** – S’assurer que les composants générés ont des labels d’accessibilité si nécessaire (prop `accessible` et `accessibilityLabel` sur les Touchables, etc.). 
5. **Tests** – Pour chaque nouvelle fonction ou composant significatif, fournir un fichier de test. Suivre le format *<Fichier>.test.tsx* ou *.spec.tsx*. Utiliser `@testing-library/react-native` pour les tests de composants (fonctions `render`, `getByText` etc.). Vérifier les principales interactions utilisateur. Pour les modules de logique, écrire des tests Jest simples (utiliser `describe` et `it` de manière claire). 
6. **Conventions de code** – Respecter ESLint et Prettier (configuration du projet : 2 espaces, pas de point-virgule). Nommer les variables de manière explicite en anglais. Commencer les commits de code généré par un type Conventional Commit approprié (ex: `feat: `, `fix: `, `test: `...). 
Avec un tel fichier (en anglais de préférence pour maximiser la compréhension de l’AI), Cursor pourra générer automatiquement des structures entières. Par exemple, on pourrait demander dans l’éditeur : “Generate a new Feature for breed filtering, including a search input component and the filtering logic with tests”. L’AI, guidée par .cursorrules, va créer : src/features/search/SearchBar.tsx (+ peut-être un useBreedFilter.ts), ainsi que SearchBar.test.tsx correspondant, le tout en respectant nos conventions de code et en utilisant les tokens de design system pour le style. De même, on pourra accélérer la création de screens complètes : “Create the BreedDetail page component that displays breed info (image, name, description, tags), using the shared UI components and add a Jest test for it”. Grâce aux règles, l’AI saura où créer le fichier, comment nommer le composant, et inclura du code suivant nos patterns (par ex. en utilisant un composant Shared/Image si on l’a documenté dans les règles). En résumé, l’intégration de Cursor via un fichier .cursorrules bien pensé permet d’automatiser une partie du travail de scaffolding et de s’assurer que chaque contribution de l’IA est alignée sur les choix techniques du projet. Cela peut considérablement accélérer le développement tout en maintenant une grande cohérence du codebase
github.com
dev.to
.
Données des races de chiens (base de connaissances)
L’application Dogodex aura besoin d’une base de données exhaustive des races de chiens, avec pour chacune diverses informations : nom, groupe, origine, description, image illustrative, et certains tags/caractéristiques (tels que hypoallergénique ou adapté aux enfants). Idéalement, cette liste doit être complète et à jour, en s’appuyant sur des sources officielles cynologiques comme la FCI ou l’AKC.
Sources officielles : La FCI (Fédération Cynologique Internationale) reconnaît environ 355 races de chiens, classées en 10 groupes internationaux
chicagofancypaws.com
 (bergers, terriers, teckels, spitz, etc.). Ces groupes FCI pourraient être utilisés dans l’app pour filtrer ou classifier les races. De son côté, l’AKC (American Kennel Club) reconnaît un peu plus de 200 races réparties en 7 groupes principaux (Hound, Working, Sporting, Non-Sporting, Terrier, Toy, Herding)
akc.org
. AKC publie sur son site une fiche détaillée par race (avec description, historique, tempérament, etc.), ce qui est une bonne source pour les descriptions et origines. On pourra croiser les deux sources pour couvrir toutes les races : l’AKC ne couvre que les races enregistrées aux USA (201 races actuellement), tandis que la FCI en couvre davantage au niveau mondial (y compris des races locales moins connues).
APIs et données ouvertes : Il existe des API publiques fournissant des données de races. Par exemple, The Dog API (par kinduff) propose une API JSON complète sur plus de 340 races et 20 groupes de races, avec pour chacune des informations de base et des images
dogapi.dog
. C’est une excellente base de départ, d’autant qu’elle est mise à jour régulièrement. Les données typiques renvoyées par cette API pour chaque race incluent le nom, le groupe, l’origine, la taille/poids, l’espérance de vie, le tempérament, un lien vers une image, etc. Voici un extrait de JSON issu de TheDogAPI :
json
Copier
Modifier
{
  "id": 1,
  "name": "Affenpinscher",
  "breed_group": "Toy",
  "origin": "Germany, France",
  "life_span": "10 - 12 years",
  "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
  "bred_for": "Small rodent hunting, lapdog",
  "image": {
    "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
  }
}
gist.github.com
gist.github.com
. On voit que cette API fournit déjà beaucoup d’informations brutes utilisables. Nous pourrions l’utiliser soit dynamiquement (appels API depuis l’app), soit pour pré-remplir une base locale (fichier JSON embarqué ou base SQLite locale) afin que l’app fonctionne hors-ligne.
Enrichissement des données : Ni la FCI ni l’AKC ne fournissent directement un fichier JSON complet en open data, mais on peut agréger l’information via du web scraping ou en s’appuyant sur des datasets existants. Par exemple, un dataset Kaggle recense pour chaque race le nom, le pays d’origine, la longévité, la taille, la couleur de robe, les traits de caractère et même les problèmes de santé typiques
kaggle.com
. Ce genre de dataset peut compléter ce que l’API fournit. Concrètement, on pourrait croiser les données : utiliser TheDogAPI pour obtenir la liste exhaustive des races et des images, puis compléter manuellement certaines colonnes (origine exacte, petite description) à partir de Wikipedia ou de l’AKC. L’AKC, par exemple, propose pour chaque race un paragraphe de description (histoire et personnalité) qu’on pourrait synthétiser pour notre champ description. La description sera un texte de quelques phrases présentant la race (ex : « Le Labrador Retriever est un chien amical, énergique et dévoué, historiquement élevé pour la chasse au gibier d’eau… »). Il faudra éventuellement traduire ces descriptions en français si l’app est francophone (AKC est en anglais, mais on peut trouver des équivalents en français via Wikipedia ou le site de la SCC).
Images : Pour chaque race, une image illustrative est souhaitable. TheDogAPI fournit des liens vers des images libres et hébergées (URL CDN)
gist.github.com
. Alternativement, l’AKC propose des images mais qui sont protégées par droits. Il faudra donc privilégier des sources libres ou des images du domaine public (par ex. Wikipedia Commons ou TheDogAPI qui agrège des images dont l’usage est permis). Une stratégie est de télécharger un ensemble d’images via TheDogAPI et de les stocker localement ou sur un petit CDN, pour un affichage plus rapide dans l’app.
Tags spéciaux : Deux tags d’exemple sont mentionnés : hypoallergénique et enfant-friendly. Ces attributs ne figurent pas directement dans TheDogAPI mais on peut les déduire des données.
Hypoallergénique : une race est souvent dite hypoallergénique si elle perd très peu ses poils (faible mue). On peut se baser sur le critère de perte de poils (Shedding Level). L’AKC attribue des notes de 1 à 5 pour le niveau de mue de chaque race
github.com
. On peut convenir que si la race a Shedding Level 1/5 (très peu de perte) ou 2/5, on taggue hypoallergénique. Des exemples bien connus de races hypoallergéniques sont le Caniche, le Bichon Frisé, le Schnauzer, le Xoloitzcuintle, etc. (une liste mentionne par ex. Poodles, Shih Tzu, Yorkshire Terrier, Samoyède, etc. parmi les races à poils non-perdants)
reddit.com
. On pourra établir cette liste de façon semi-automatique via les données AKC ou via des listes publiées.
Enfant-friendly : là encore, l’AKC fournit une note “Good With Young Children” pour chaque race
github.com
. Si cette note est élevée (4/5 ou 5/5), on peut marquer la race comme compatible enfants. Par exemple, le Golden Retriever, le Beagle ou le Boxer obtiennent généralement de bonnes notes avec les enfants, alors que d’autres races plus protectrices ou fragiles seront à éviter avec des tout-petits. On peut inclure d’autres tags selon les données AKC disponibles, par exemple “Energy Level”, “Trainability”, “Barking Level”, etc., sous forme de badges ou d’icônes dans l’UI.
Format JSON structuré : Une fois les données collectées et croisées, on produira un JSON final comprenant pour chaque race un objet avec les champs nécessaires. Par exemple :
json
Copier
Modifier
{
  "name": "Labrador Retriever",
  "group": "Sporting",
  "origin": "Canada, Royaume-Uni",
  "description": "Chien de famille par excellence, le Labrador Retriever est un chien amical, énergique et très intelligent, autrefois utilisé pour rapporter le gibier d'eau.",
  "image": "https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg",
  "tags": ["enfant-friendly", "facile à dresser", "très actif"]
}
Chaque champ correspond aux données souhaitées :
name (nom officiel de la race),
group (groupe FCI ou AKC, on peut décider d’utiliser l’un ou l’autre – éventuellement fournir les deux classifications si besoin),
origin (pays ou région d’origine),
description (texte concis présentant la race),
image (URL ou chemin vers une image illustrative),
tags (tableau de tags pour des caractéristiques saillantes).
On pourra enrichir si désiré avec d’autres attributs utiles (taille/poids moyen, espérance de vie, niveau d’activité, etc.), mais ceux listés couvrent déjà l’essentiel pour une encyclopédie rapide. Mise à jour et maintenance : Il faudra s’assurer de la mise à jour de cette liste à intervalle régulier (la FCI ajoute rarement de nouvelles races, mais l’AKC en ajoute quelques-unes chaque année : actuellement 201 races AKC reconnues
akc.org
, 199 il y a quelques années). Étant donné que Dogodex est une appli éducative, on peut choisir de figer la data à un instant T et la mettre à jour via une nouvelle version de l’app de temps en temps. Si on souhaitait aller plus loin, on pourrait implémenter un petit backend NestJS ou un script d’import qui va scrapper les sites officiels pour mettre à jour le JSON des races. Dans un premier temps, toutefois, utiliser une combinaison de TheDogAPI et des données AKC/FCI disponibles publiquement permettra de constituer rapidement un JSON complet des races de chiens avec les champs requis. Toutes ces données (fichiers Markdown de description, JSON de données, etc.) pourront être déposées dans le dépôt (par exemple dans un dossier data/ pour le JSON des races). Ensuite, on développera l’application en se basant sur ce jeu de données : la page liste chargera la liste depuis ce JSON (ou d’une API, selon le choix d’implémentation), et la page détail affichera les propriétés d’une race en particulier. En s’appuyant sur des données fiables et à jour issues de la FCI/AKC, Dogodex offrira une expérience instructive et crédible aux utilisateurs, tout en restant techniquement soutenable grâce à l’automatisation partielle (via API) de la collecte d’information.