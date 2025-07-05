import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { HomeHero } from './HomePage';

describe('HomeHero', () => {
  it('rend correctement le composant SvgXml', () => {
    render(<HomeHero />);
    
    // Vérifier que le SVG est bien rendu avec son label d'accessibilité
    const svgElement = screen.getByLabelText('Illustration Dogodex');
    expect(svgElement).toBeDefined();
  });

  it("a bien un label d'accessibilite", () => {
    render(<HomeHero />);
    
    // Vérifier que l'élément a bien un label d'accessibilité
    const svgElement = screen.getByLabelText('Illustration Dogodex');
    expect(svgElement.props.accessibilityLabel).toBe('Illustration Dogodex');
  });
}); 