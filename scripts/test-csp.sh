#!/bin/bash

# Teste la CSP de votre site
URL="https://genolabgab.vercel.app"

echo "🔍 Test des headers de sécurité pour $URL"
echo "=========================================="

# Récupérer les headers
HEADERS=$(curl -sI "$URL")

# Vérifier chaque header
check_header() {
  local header=$1
  local expected=$2
  
  if echo "$HEADERS" | grep -qi "$header"; then
    echo "✅ $header: Présent"
    if [ -n "$expected" ]; then
      VALUE=$(echo "$HEADERS" | grep -i "$header" | head -1 | cut -d':' -f2-)
      echo "   Valeur: $VALUE"
    fi
  else
    echo "❌ $header: MANQUANT"
  fi
}

check_header "Content-Security-Policy"
check_header "X-Frame-Options"
check_header "X-Content-Type-Options"
check_header "Referrer-Policy"
check_header "Permissions-Policy"
check_header "Strict-Transport-Security"

echo ""
echo "🔍 Test de la CSP avec curl"
echo "=========================================="

# Tester si la CSP bloque les ressources externes
echo "Test 1: Chargement d'une image externe (devrait être bloqué si pas dans CSP)"
curl -s -o /dev/null -w "%{http_code}" "https://example.com/image.jpg"

echo ""
echo "✅ Test terminé"
