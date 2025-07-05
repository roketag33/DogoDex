import React from 'react';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

// Import du SVG en tant que chaîne de caractères
const homeHeroSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Fond avec 10% d'opacité de la couleur primary -->
  <rect width="512" height="512" rx="256" fill="#FF7F50" fill-opacity="0.1"/>
  
  <!-- Cercle de la loupe -->
  <circle cx="200" cy="200" r="150" stroke="#FF7F50" stroke-width="24" fill="white" fill-opacity="0.9"/>
  
  <!-- Manche de la loupe -->
  <rect x="310" y="270" width="150" height="40" rx="20" transform="rotate(45 310 270)" fill="#FF7F50"/>
  
  <!-- Silhouette du chien (stylisée) à l'intérieur de la loupe -->
  <path d="M200 100
           C160 100, 150 130, 150 150
           C150 165, 155 175, 165 185
           L140 200
           C120 210, 120 230, 130 250
           C140 270, 160 280, 180 270
           L190 265
           C195 270, 200 272, 210 272
           C220 272, 225 270, 230 265
           L240 270
           C260 280, 280 270, 290 250
           C300 230, 300 210, 280 200
           L255 185
           C265 175, 270 165, 270 150
           C270 130, 260 100, 220 100
           Z" 
        fill="#FF7F50"/>
  
  <!-- Œil du chien -->
  <circle cx="180" cy="160" r="10" fill="white"/>
  
  <!-- Nez du chien -->
  <circle cx="200" cy="190" r="15" fill="white"/>
</svg>`;

// Composant HomeHero avec NativeWind pour les styles
export const HomeHero: React.FC = () => {
  return (
    <View className="flex items-center justify-center">
      <SvgXml 
        xml={homeHeroSvg} 
        width={256} 
        height={256} 
        className="w-64 h-64" 
        accessibilityLabel="Illustration Dogodex"
      />
    </View>
  );
};

// Composant HomePage principal
const HomePage: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <HomeHero />
      <Text className="mt-8 text-3xl font-bold text-primary">Dogodex</Text>
      <Text className="mt-2 text-xl text-neutral-900 dark:text-neutral-100">
        L&apos;encyclopédie canine
      </Text>
    </View>
  );
};

export default HomePage; 