#!/bin/bash

# Script pour vérifier quelles pages sont indexées par Google
# Usage: ./scripts/check-google-indexation.sh

URL_BASE="https://genolabgab.vercel.app"

# Liste des pages du sitemap
PAGES=(
  "/"
  "/about"
  "/research"
  "/publications"
  "/projects"
  "/blog"
  "/cv"
  "/contact"
  "/blog/docking-p24-vih"
  "/blog/resistance-antipaludeenne-plasmodium-ethiopie"
  "/blog/surveillance-resistance-mtb-nanopore"
)

echo "🔍 Vérification de l'indexation Google"
echo "======================================"
echo ""

# Fonction pour vérifier si une page est indexée
check_indexation() {
  local page=$1
  local full_url="$URL_BASE$page"
  
  # Utiliser l'opérateur site: pour vérifier
  # Note: Cette méthode n'est pas 100% fiable mais donne une indication
  SEARCH_QUERY="site:$full_url"
  
  echo "📄 Page: $full_url"
  
  # Vérifier les meta robots
  META_ROBOTS=$(curl -s "$full_url" | grep -o '<meta name="robots" content="[^"]*"' | head -1)
  
  if [ -n "$META_ROBOTS" ]; then
    if echo "$META_ROBOTS" | grep -qi "noindex"; then
      echo "   ❌ NOINDEX détecté - Page volontairement exclue"
    else
      echo "   ✅ Meta robots OK"
    fi
  else
    echo "   ✅ Pas de meta robots (indexation par défaut)"
  fi
  
  # Vérifier le canonical
  CANONICAL=$(curl -s "$full_url" | grep -o '<link rel="canonical" href="[^"]*"' | head -1)
  if [ -n "$CANONICAL" ]; then
    CANONICAL_URL=$(echo "$CANONICAL" | grep -o 'href="[^"]*"' | cut -d'"' -f2)
    if [ "$CANONICAL_URL" = "$full_url" ]; then
      echo "   ✅ Canonical correct"
    else
      echo "   ⚠️  Canonical différent: $CANONICAL_URL"
    fi
  else
    echo "   ⚠️  Pas de canonical déclaré"
  fi
  
  echo ""
}

# Vérifier chaque page
for page in "${PAGES[@]}"; do
  check_indexation "$page"
done

echo "======================================"
echo "🎯 Pour voir les pages exclues par Google :"
echo "   1. Allez sur Google Search Console"
echo "   2. Menu 'Pages' → 'Pages exclues'"
echo "   3. Analysez les raisons d'exclusion"
echo ""
echo "💡 Commande pour vérifier manuellement sur Google :"
echo "   Ouvrez: https://www.google.com/search?q=site:genolabgab.vercel.app"
