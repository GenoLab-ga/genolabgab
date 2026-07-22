#!/bin/bash
# scripts/verify-csp.sh

echo "🔍 Vérification de la CSP et des headers"
echo "=========================================="
echo ""

URL="http://localhost:3000"

# Récupérer les headers
HEADERS=$(curl -sI "$URL")

echo "1. Content-Security-Policy :"
CSP=$(echo "$HEADERS" | grep -i "content-security-policy" | head -1)
if [ -n "$CSP" ]; then
    echo "   ✅ CSP présente"
    echo "   $CSP" | sed 's/^/   /'
    
    # Vérifier que va.vercel-scripts.com est autorisé
    if echo "$CSP" | grep -q "va.vercel-scripts.com"; then
        echo "   ✅ Vercel Analytics autorisé"
    else
        echo "   ❌ Vercel Analytics NON autorisé"
    fi
else
    echo "   ❌ CSP manquante"
fi

echo ""
echo "2. Permissions-Policy :"
PP=$(echo "$HEADERS" | grep -i "permissions-policy" | head -1)
if [ -n "$PP" ]; then
    echo "   ✅ Permissions-Policy présente"
    echo "   $PP" | sed 's/^/   /'
    
    # Vérifier que interest-cohort n'est PAS présent
    if echo "$PP" | grep -q "interest-cohort"; then
        echo "   ❌ interest-cohort encore présent (obsolète)"
    else
        echo "   ✅ interest-cohort retiré"
    fi
else
    echo "   ❌ Permissions-Policy manquante"
fi

echo ""
echo "3. Test de chargement des scripts Vercel :"
echo "   Ouvrez http://localhost:3000 dans votre navigateur"
echo "   DevTools (F12) → Network → Recharger (F5)"
echo "   Vérifiez que ces scripts se chargent (200) :"
echo "   - https://va.vercel-scripts.com/v1/script.debug.js"
echo "   - https://va.vercel-scripts.com/v1/speed-insights/script.debug.js"

echo ""
echo "=========================================="
echo "✅ Vérification terminée"
