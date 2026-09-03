#!/bin/bash

# Script de vérification de l'indexation Google et Bing
# Usage: ./scripts/check-indexation.sh

URL="genolabgab.com"

echo "🔍 Vérification de l'indexation de $URL"
echo "=========================================="
echo ""

# Fonction pour vérifier Google
check_google() {
    echo "📊 Vérification Google..."
    SEARCH_URL="https://www.google.com/search?q=site:$URL"
    
    # Ouvrir dans le navigateur
    if command -v xdg-open &> /dev/null; then
        xdg-open "$SEARCH_URL" 2>/dev/null
    elif command -v open &> /dev/null; then
        open "$SEARCH_URL" 2>/dev/null
    fi
    
    echo "✅ Google Search ouvert dans votre navigateur"
    echo "   URL: $SEARCH_URL"
    echo ""
    echo "💡 Si vous voyez des résultats, votre site est indexé sur Google"
    echo "   Si aucun résultat, attendez quelques jours et réessayez"
}

# Fonction pour vérifier Bing
check_bing() {
    echo "📊 Vérification Bing..."
    SEARCH_URL="https://www.bing.com/search?q=site:$URL"
    
    # Ouvrir dans le navigateur
    if command -v xdg-open &> /dev/null; then
        xdg-open "$SEARCH_URL" 2>/dev/null
    elif command -v open &> /dev/null; then
        open "$SEARCH_URL" 2>/dev/null
    fi
    
    echo "✅ Bing Search ouvert dans votre navigateur"
    echo "   URL: $SEARCH_URL"
    echo ""
    echo "💡 Si vous voyez des résultats, votre site est indexé sur Bing"
    echo "   Si aucun résultat, attendez quelques jours et réessayez"
}

# Vérifier les deux
check_google
echo ""
check_bing

echo ""
echo "=========================================="
echo "✅ Vérification terminée!"
echo ""
echo "📅 Timeline typique d'indexation :"
echo "   - Google: 3-14 jours"
echo "   - Bing: 2-7 jours"
echo ""
echo "🎯 Si après 2 semaines vous n'avez toujours aucun résultat :"
echo "   1. Vérifiez que le sitemap est bien soumis"
echo "   2. Vérifiez qu'il n'y a pas d'erreurs dans les consoles"
echo "   3. Demandez à nouveau l'indexation manuellement"
