#!/bin/bash

# Script de vérification SEO pour genolabgab.com
# Auteur: Karl Mounguele
# Date: 2026-07-08
# Version: 1.1 (correction case-insensitive)

URL="https://genolabgab.com"
REPORT_FILE="seo-report-$(date +%Y-%m-%d_%H-%M-%S).txt"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions d'affichage
print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Initialisation du rapport
echo "🔍 Vérification SEO de $URL" > "$REPORT_FILE"
echo "Date: $(date)" >> "$REPORT_FILE"
echo "==========================================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

print_header "🔍 VÉRIFICATION SEO - $URL"
echo ""

# 1. Vérification robots.txt
print_header "1. ROBOTS.TXT"
ROBOTS=$(curl -s "$URL/robots.txt")
if [ $? -eq 0 ] && [ -n "$ROBOTS" ]; then
    print_success "robots.txt accessible"
    
    # Vérifier la présence du sitemap
    if echo "$ROBOTS" | grep -qi "Sitemap:"; then
        SITEMAP_URL=$(echo "$ROBOTS" | grep -i "Sitemap:" | head -1 | cut -d':' -f2- | tr -d ' ')
        print_success "Sitemap déclaré: $SITEMAP_URL"
        echo "   ✅ Sitemap: $SITEMAP_URL" >> "$REPORT_FILE"
    else
        print_warning "Sitemap NON déclaré dans robots.txt"
        echo "   ⚠️  Sitemap non déclaré" >> "$REPORT_FILE"
    fi
    
    # ✅ CORRECTION: Vérifier User-agent (case-insensitive)
    if echo "$ROBOTS" | grep -qi "User-Agent:"; then
        USER_AGENT=$(echo "$ROBOTS" | grep -i "User-Agent:" | head -1 | cut -d':' -f2- | tr -d ' ')
        print_success "User-agent configuré: $USER_AGENT"
        echo "   ✅ User-Agent: $USER_AGENT" >> "$REPORT_FILE"
    else
        print_warning "User-agent non configuré"
        echo "   ⚠️  User-agent non configuré" >> "$REPORT_FILE"
    fi
    
    # Vérifier Allow
    if echo "$ROBOTS" | grep -qi "Allow:"; then
        ALLOW_PATH=$(echo "$ROBOTS" | grep -i "Allow:" | head -1 | cut -d':' -f2- | tr -d ' ')
        print_success "Allow configuré: $ALLOW_PATH"
        echo "   ✅ Allow: $ALLOW_PATH" >> "$REPORT_FILE"
    fi
    
    # Vérifier Disallow
    if echo "$ROBOTS" | grep -qi "Disallow:"; then
        DISALLOW_PATHS=$(echo "$ROBOTS" | grep -i "Disallow:" | head -1 | cut -d':' -f2- | tr -d ' ')
        print_success "Disallow configuré: $DISALLOW_PATHS"
        echo "   ✅ Disallow: $DISALLOW_PATHS" >> "$REPORT_FILE"
    fi
    
    # Vérifier Host
    if echo "$ROBOTS" | grep -qi "Host:"; then
        HOST_URL=$(echo "$ROBOTS" | grep -i "Host:" | head -1 | cut -d':' -f2- | tr -d ' ')
        print_success "Host configuré: $HOST_URL"
        echo "   ✅ Host: $HOST_URL" >> "$REPORT_FILE"
    fi
    
    echo "   ✅ robots.txt présent" >> "$REPORT_FILE"
else
    print_error "robots.txt inaccessible"
    echo "   ❌ robots.txt inaccessible" >> "$REPORT_FILE"
fi
echo ""

# 2. Vérification sitemap.xml
print_header "2. SITEMAP.XML"
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/sitemap.xml")
if [ "$SITEMAP_STATUS" = "200" ]; then
    print_success "sitemap.xml accessible (HTTP $SITEMAP_STATUS)"
    URL_COUNT=$(curl -s "$URL/sitemap.xml" | grep -c "<url>")
    print_info "$URL_COUNT URLs dans le sitemap"
    echo "   ✅ sitemap.xml accessible (HTTP $SITEMAP_STATUS)" >> "$REPORT_FILE"
    echo "   📊 $URL_COUNT URLs" >> "$REPORT_FILE"
    
    # Afficher les URLs
    echo "" >> "$REPORT_FILE"
    echo "   URLs trouvées:" >> "$REPORT_FILE"
    curl -s "$URL/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<loc>/   - /' | sed 's/<\/loc>//' >> "$REPORT_FILE"
else
    print_error "sitemap.xml inaccessible (HTTP $SITEMAP_STATUS)"
    echo "   ❌ sitemap.xml inaccessible (HTTP $SITEMAP_STATUS)" >> "$REPORT_FILE"
fi
echo ""

# 3. Vérification des meta tags
print_header "3. META TAGS"
HTML=$(curl -s "$URL")

# Meta description
META_DESC=$(echo "$HTML" | grep -o '<meta name="description" content="[^"]*"' | head -1)
if [ -n "$META_DESC" ]; then
    DESC_CONTENT=$(echo "$META_DESC" | grep -o 'content="[^"]*"' | cut -d'"' -f2)
    DESC_LENGTH=${#DESC_CONTENT}
    print_success "Meta description présente ($DESC_LENGTH caractères)"
    echo "   ✅ Meta description ($DESC_LENGTH car.): $DESC_CONTENT" >> "$REPORT_FILE"
    
    if [ $DESC_LENGTH -lt 120 ]; then
        print_warning "Meta description trop courte (< 120 car.)"
    elif [ $DESC_LENGTH -gt 160 ]; then
        print_warning "Meta description trop longue (> 160 car.)"
    else
        print_success "Longueur optimale (120-160 car.)"
    fi
else
    print_error "Meta description manquante"
    echo "   ❌ Meta description manquante" >> "$REPORT_FILE"
fi

# Meta keywords
META_KEYWORDS=$(echo "$HTML" | grep -o '<meta name="keywords" content="[^"]*"' | head -1)
if [ -n "$META_KEYWORDS" ]; then
    KEYWORDS_CONTENT=$(echo "$META_KEYWORDS" | grep -o 'content="[^"]*"' | cut -d'"' -f2)
    KEYWORD_COUNT=$(echo "$KEYWORDS_CONTENT" | tr ',' '\n' | wc -l)
    print_success "Meta keywords présentes ($KEYWORD_COUNT mots-clés)"
    echo "   ✅ Meta keywords ($KEYWORD_COUNT): $KEYWORDS_CONTENT" >> "$REPORT_FILE"
else
    print_warning "Meta keywords manquantes (optionnel)"
    echo "   ⚠️  Meta keywords manquantes" >> "$REPORT_FILE"
fi

# Meta author
META_AUTHOR=$(echo "$HTML" | grep -o '<meta name="author" content="[^"]*"' | head -1)
if [ -n "$META_AUTHOR" ]; then
    print_success "Meta author présente"
    echo "   ✅ Meta author présente" >> "$REPORT_FILE"
else
    print_warning "Meta author manquante"
    echo "   ⚠️  Meta author manquante" >> "$REPORT_FILE"
fi
echo ""

# 4. Vérification Open Graph
print_header "4. OPEN GRAPH (Facebook, LinkedIn)"

OG_TITLE=$(echo "$HTML" | grep -o '<meta property="og:title" content="[^"]*"' | head -1)
if [ -n "$OG_TITLE" ]; then
    print_success "Open Graph title présent"
    echo "   ✅ og:title présent" >> "$REPORT_FILE"
else
    print_error "Open Graph title manquant"
    echo "   ❌ og:title manquant" >> "$REPORT_FILE"
fi

OG_DESC=$(echo "$HTML" | grep -o '<meta property="og:description" content="[^"]*"' | head -1)
if [ -n "$OG_DESC" ]; then
    print_success "Open Graph description présente"
    echo "   ✅ og:description présente" >> "$REPORT_FILE"
else
    print_error "Open Graph description manquante"
    echo "   ❌ og:description manquante" >> "$REPORT_FILE"
fi

OG_IMAGE=$(echo "$HTML" | grep -o '<meta property="og:image" content="[^"]*"' | head -1)
if [ -n "$OG_IMAGE" ]; then
    IMAGE_URL=$(echo "$OG_IMAGE" | grep -o 'content="[^"]*"' | cut -d'"' -f2)
    print_success "Open Graph image présente"
    echo "   ✅ og:image: $IMAGE_URL" >> "$REPORT_FILE"
    
    # Vérifier si l'image est accessible
    IMAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$IMAGE_URL")
    if [ "$IMAGE_STATUS" = "200" ]; then
        print_success "Image OG accessible (HTTP $IMAGE_STATUS)"
    else
        print_warning "Image OG inaccessible (HTTP $IMAGE_STATUS)"
    fi
else
    print_error "Open Graph image manquante"
    echo "   ❌ og:image manquante" >> "$REPORT_FILE"
fi

OG_URL=$(echo "$HTML" | grep -o '<meta property="og:url" content="[^"]*"' | head -1)
if [ -n "$OG_URL" ]; then
    print_success "Open Graph URL présente"
    echo "   ✅ og:url présente" >> "$REPORT_FILE"
else
    print_warning "Open Graph URL manquante"
    echo "   ⚠️  og:url manquante" >> "$REPORT_FILE"
fi
echo ""

# 5. Vérification Twitter Cards
print_header "5. TWITTER CARDS"

TWITTER_CARD=$(echo "$HTML" | grep -o '<meta name="twitter:card" content="[^"]*"' | head -1)
if [ -n "$TWITTER_CARD" ]; then
    CARD_TYPE=$(echo "$TWITTER_CARD" | grep -o 'content="[^"]*"' | cut -d'"' -f2)
    print_success "Twitter Card présente ($CARD_TYPE)"
    echo "   ✅ twitter:card: $CARD_TYPE" >> "$REPORT_FILE"
else
    print_error "Twitter Card manquante"
    echo "   ❌ twitter:card manquante" >> "$REPORT_FILE"
fi

TWITTER_TITLE=$(echo "$HTML" | grep -o '<meta name="twitter:title" content="[^"]*"' | head -1)
if [ -n "$TWITTER_TITLE" ]; then
    print_success "Twitter title présent"
    echo "   ✅ twitter:title présent" >> "$REPORT_FILE"
else
    print_error "Twitter title manquant"
    echo "   ❌ twitter:title manquant" >> "$REPORT_FILE"
fi

TWITTER_IMAGE=$(echo "$HTML" | grep -o '<meta name="twitter:image" content="[^"]*"' | head -1)
if [ -n "$TWITTER_IMAGE" ]; then
    print_success "Twitter image présente"
    echo "   ✅ twitter:image présente" >> "$REPORT_FILE"
else
    print_error "Twitter image manquante"
    echo "   ❌ twitter:image manquante" >> "$REPORT_FILE"
fi
echo ""

# 6. Vérification Structured Data (JSON-LD)
print_header "6. STRUCTURED DATA (JSON-LD)"

JSONLD_COUNT=$(echo "$HTML" | grep -c 'application/ld+json')
if [ "$JSONLD_COUNT" -gt 0 ]; then
    print_success "Structured Data présent ($JSONLD_COUNT occurrence(s))"
    echo "   ✅ Structured Data: $JSONLD_COUNT occurrence(s)" >> "$REPORT_FILE"
    
    # Extraire et afficher les types
    echo "   Types trouvés:" >> "$REPORT_FILE"
    echo "$HTML" | grep -o 'application/ld+json.*</script>' | grep -o '"@type":"[^"]*"' | sed 's/"@type":"/   - /' | sed 's/"//' | sort -u >> "$REPORT_FILE"
else
    print_error "Structured Data manquant"
    echo "   ❌ Structured Data manquant" >> "$REPORT_FILE"
fi
echo ""

# 7. Vérification Canonical URL
print_header "7. CANONICAL URL"

CANONICAL=$(echo "$HTML" | grep -o '<link rel="canonical" href="[^"]*"' | head -1)
if [ -n "$CANONICAL" ]; then
    CANONICAL_URL=$(echo "$CANONICAL" | grep -o 'href="[^"]*"' | cut -d'"' -f2)
    print_success "Canonical URL présente"
    echo "   ✅ Canonical: $CANONICAL_URL" >> "$REPORT_FILE"
    
    if [ "$CANONICAL_URL" = "$URL" ]; then
        print_success "Canonical URL correcte"
    else
        print_warning "Canonical URL différente de l'URL actuelle"
    fi
else
    print_error "Canonical URL manquante"
    echo "   ❌ Canonical URL manquante" >> "$REPORT_FILE"
fi
echo ""

# 8. Vérification des codes de vérification
print_header "8. CODES DE VÉRIFICATION"

# Google
GOOGLE_VERIFY=$(echo "$HTML" | grep -o '<meta name="google-site-verification" content="[^"]*"' | head -1)
if [ -n "$GOOGLE_VERIFY" ]; then
    GOOGLE_CODE=$(echo "$GOOGLE_VERIFY" | grep -o 'content="[^"]*"' | cut -d'"' -f2)
    print_success "Code de vérification Google présent"
    echo "   ✅ Google: $GOOGLE_CODE" >> "$REPORT_FILE"
else
    print_warning "Code de vérification Google manquant"
    echo "   ⚠️  Google: manquant" >> "$REPORT_FILE"
fi

# Bing
BING_VERIFY=$(echo "$HTML" | grep -o '<meta name="msvalidate.01" content="[^"]*"' | head -1)
if [ -n "$BING_VERIFY" ]; then
    BING_CODE=$(echo "$BING_VERIFY" | grep -o 'content="[^"]*"' | cut -d'"' -f2)
    print_success "Code de vérification Bing présent"
    echo "   ✅ Bing: $BING_CODE" >> "$REPORT_FILE"
else
    print_warning "Code de vérification Bing manquant"
    echo "   ⚠️  Bing: manquant" >> "$REPORT_FILE"
fi
echo ""

# 9. Vérification des headers de sécurité
print_header "9. HEADERS DE SÉCURITÉ"

HEADERS=$(curl -sI "$URL")

check_header() {
    local header=$1
    local expected=$2
    
    if echo "$HEADERS" | grep -qi "$header"; then
        VALUE=$(echo "$HEADERS" | grep -i "$header" | head -1 | cut -d':' -f2- | tr -d '\r')
        print_success "$header: Présent"
        echo "   ✅ $header: $VALUE" >> "$REPORT_FILE"
    else
        print_error "$header: MANQUANT"
        echo "   ❌ $header: MANQUANT" >> "$REPORT_FILE"
    fi
}

check_header "Content-Security-Policy"
check_header "X-Frame-Options"
check_header "X-Content-Type-Options"
check_header "Referrer-Policy"
check_header "Permissions-Policy"
check_header "Strict-Transport-Security"
echo ""

# 10. Vérification de l'indexation
print_header "10. INDEXATION (Estimation)"

# Google
print_info "Vérification de l'indexation Google..."
GOOGLE_RESULT=$(curl -s "https://www.google.com/search?q=site:$URL" | grep -o "About.*results" | head -1)
if [ -n "$GOOGLE_RESULT" ]; then
    print_success "Google: $GOOGLE_RESULT"
    echo "   ✅ Google: $GOOGLE_RESULT" >> "$REPORT_FILE"
else
    print_warning "Google: Résultat non disponible (peut prendre du temps)"
    echo "   ⚠️  Google: Non disponible" >> "$REPORT_FILE"
fi

# Bing
print_info "Vérification de l'indexation Bing..."
BING_RESULT=$(curl -s "https://www.bing.com/search?q=site:$URL" | grep -o "[0-9]* results" | head -1)
if [ -n "$BING_RESULT" ]; then
    print_success "Bing: $BING_RESULT"
    echo "   ✅ Bing: $BING_RESULT" >> "$REPORT_FILE"
else
    print_warning "Bing: Résultat non disponible (peut prendre du temps)"
    echo "   ⚠️  Bing: Non disponible" >> "$REPORT_FILE"
fi
echo ""

# Résumé
print_header "RÉSUMÉ"
echo ""
echo "📊 Rapport complet généré: $REPORT_FILE"
echo ""
echo "🎯 Prochaines étapes:"
echo "   1. Connectez-vous à Google Search Console: https://search.google.com/search-console"
echo "   2. Vérifiez que votre propriété est ajoutée et vérifiée"
echo "   3. Soumettez votre sitemap: $URL/sitemap.xml"
echo "   4. Connectez-vous à Bing Webmaster Tools: https://www.bing.com/webmasters"
echo "   5. Importez depuis Google Search Console ou ajoutez manuellement"
echo "   6. Soumettez votre sitemap sur Bing également"
echo ""
echo "✅ Vérification terminée!"
