#!/bin/bash
# scripts/fix-favicon.sh

echo "🔧 Création et vérification du favicon"
echo "======================================"
echo ""

# 1. Vérifier ImageMagick
echo "1. Vérification d'ImageMagick..."
if ! which convert > /dev/null 2>&1; then
    echo "   ❌ ImageMagick non installé"
    echo "   💡 Installation : sudo apt install imagemagick -y"
    exit 1
else
    echo "   ✅ ImageMagick installé"
fi

# 2. Créer le dossier public
echo ""
echo "2. Création du dossier public..."
mkdir -p public
echo "   ✅ Dossier public créé"

# 3. Créer le favicon
echo ""
echo "3. Création du favicon..."
cd public

convert -size 64x64 xc:'#10b981' \
  -fill white -gravity center -pointsize 40 -annotate 0 "G" \
  favicon.ico

if [ -f "favicon.ico" ]; then
    SIZE=$(stat -c%s favicon.ico)
    echo "   ✅ favicon.ico créé ($(numfmt --to=iec $SIZE))"
else
    echo "   ❌ Échec de la création du favicon"
    exit 1
fi

cd ..

# 4. Vérifier le manifest.ts
echo ""
echo "4. Vérification de src/app/manifest.ts..."
if [ -f "src/app/manifest.ts" ]; then
    echo "   ✅ manifest.ts présent"
    if grep -q "favicon.ico" src/app/manifest.ts; then
        echo "   ✅ Référence à favicon.ico correcte"
    else
        echo "   ❌ Référence à favicon.ico manquante"
    fi
else
    echo "   ❌ manifest.ts MANQUANT"
fi

# 5. Tester le serveur
echo ""
echo "5. Test du serveur..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Serveur lancé"
    
    # Tester favicon
    if curl -s http://localhost:3000/favicon.ico > /dev/null 2>&1; then
        echo "   ✅ favicon.ico accessible"
    else
        echo "   ❌ favicon.ico inaccessible"
    fi
    
    # Tester manifest
    if curl -s http://localhost:3000/manifest.webmanifest > /dev/null 2>&1; then
        echo "   ✅ manifest.webmanifest accessible"
        echo ""
        echo "   Contenu du manifest :"
        curl -s http://localhost:3000/manifest.webmanifest | jq -r '
          "   - Nom: \(.name)",
          "   - Icônes: \(.icons | length)"
        ' 2>/dev/null
    else
        echo "   ❌ manifest.webmanifest inaccessible"
    fi
else
    echo "   ⚠️  Serveur non lancé"
    echo "   💡 Lancez : npm run dev"
fi

echo ""
echo "======================================"
echo "✅ Script terminé"
echo ""
echo "📋 Prochaines étapes :"
echo "   1. git add public/favicon.ico src/app/manifest.ts"
echo "   2. git commit -m 'feat: add favicon and fix manifest'"
echo "   3. git push"
