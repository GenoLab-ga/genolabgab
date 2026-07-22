#!/bin/bash
# scripts/verify-manifest-final.sh

echo "🔍 Vérification finale du manifest PWA"
echo "======================================"
echo ""

# 1. Vérifier le fichier source
echo "1. Vérification de src/app/manifest.ts..."
if [ -f "src/app/manifest.ts" ]; then
    echo "   ✅ manifest.ts présent"
    
    # Vérifier les icônes référencées
    if grep -q "icon-192.png" src/app/manifest.ts; then
        echo "   ⚠️  Référence à icon-192.png trouvée"
        if [ -f "public/icon-192.png" ]; then
            echo "   ✅ icon-192.png existe"
        else
            echo "   ❌ icon-192.png MANQUANT"
        fi
    fi
    
    if grep -q "favicon.ico" src/app/manifest.ts; then
        echo "   ✅ Référence à favicon.ico trouvée"
        if [ -f "public/favicon.ico" ]; then
            echo "   ✅ favicon.ico existe"
        else
            echo "   ❌ favicon.ico MANQUANT"
        fi
    fi
else
    echo "   ❌ manifest.ts MANQUANT"
fi

# 2. Vérifier les icônes dans public/
echo ""
echo "2. Icônes dans public/..."
ls -lh public/ | grep -E "(favicon|icon)" | while read line; do
    echo "   $line"
done

# 3. Tester le manifest généré
echo ""
echo "3. Test du manifest généré..."
if curl -s http://localhost:3000/manifest.webmanifest > /dev/null 2>&1; then
    echo "   ✅ manifest.webmanifest accessible"
    echo ""
    echo "   Contenu :"
    curl -s http://localhost:3000/manifest.webmanifest | jq -r '
      "   - Nom: \(.name)",
      "   - Short name: \(.short_name)",
      "   - Icônes: \(.icons | length)"
    ' 2>/dev/null
else
    echo "   ❌ manifest.webmanifest inaccessible"
fi

echo ""
echo "======================================"
echo "✅ Vérification terminée"
