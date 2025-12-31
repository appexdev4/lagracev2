/**
 * Script de compression des images pour Complexe Scolaire La Grâce
 * 
 * Utilisation :
 * 1. npm install --save-dev sharp
 * 2. node compress-images.js
 * 
 * Les images compressées seront créées dans public/assets/
 * Les originaux seront sauvegardés dans public/assets/backup/
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = './public/assets';
const backupDir = './public/assets/backup';

// Paramètres de compression par type d'image
const compressionSettings = {
  // Images très lourdes (>1MB) - Compression agressive
  heavy: {
    maxWidth: 1200,
    maxHeight: 900,
    quality: 75,
    files: ['appellation.jpg', 'dicte.jpg', 'journalisme.jpg', 'opendoor.jpg', 'result.jpg']
  },
  // Images moyennes - Compression modérée
  medium: {
    maxWidth: 1000,
    maxHeight: 750,
    quality: 80,
    files: ['enseignant.jpg', 'salleinfo.jpg', 'LAB.jpg']
  },
  // Images petites - Compression légère
  light: {
    maxWidth: 800,
    maxHeight: 600,
    quality: 85,
    files: ['laboimg.jpg', 'siteGrace.jpg']
  }
};

// Créer le dossier de backup s'il n'existe pas
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('📁 Dossier de backup créé');
}

// Fonction de compression
async function compressImage(file, settings) {
  const inputPath = path.join(inputDir, file);
  const backupPath = path.join(backupDir, file);
  const tempPath = path.join(inputDir, `temp_${file}`);

  // Vérifier si le fichier existe
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  ${file} - Fichier non trouvé, ignoré`);
    return;
  }

  try {
    // Sauvegarder l'original
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    // Obtenir la taille originale
    const inputStats = fs.statSync(inputPath);
    const inputSizeKB = (inputStats.size / 1024).toFixed(0);

    // Compresser l'image
    await sharp(inputPath)
      .resize(settings.maxWidth, settings.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: settings.quality,
        progressive: true,
        mozjpeg: true
      })
      .toFile(tempPath);

    // Obtenir la taille compressée
    const outputStats = fs.statSync(tempPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(0);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    // Remplacer l'original par la version compressée
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);

    console.log(`✅ ${file.padEnd(25)} ${inputSizeKB} kB → ${outputSizeKB} kB (-${reduction}%)`);

    return {
      file,
      originalSize: inputStats.size,
      compressedSize: outputStats.size,
      reduction: parseFloat(reduction)
    };

  } catch (error) {
    console.error(`❌ Erreur lors de la compression de ${file}:`, error.message);
    // Nettoyer le fichier temporaire si erreur
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return null;
  }
}

// Fonction principale
async function compressAllImages() {
  console.log('\n🖼️  COMPRESSION DES IMAGES\n');
  console.log('═'.repeat(70));
  console.log('\n');

  const results = [];

  // Compresser les images lourdes
  console.log('📦 IMAGES LOURDES (Compression agressive)');
  console.log('-'.repeat(70));
  for (const file of compressionSettings.heavy.files) {
    const result = await compressImage(file, compressionSettings.heavy);
    if (result) results.push(result);
  }

  console.log('\n📦 IMAGES MOYENNES (Compression modérée)');
  console.log('-'.repeat(70));
  for (const file of compressionSettings.medium.files) {
    const result = await compressImage(file, compressionSettings.medium);
    if (result) results.push(result);
  }

  console.log('\n📦 IMAGES LÉGÈRES (Compression légère)');
  console.log('-'.repeat(70));
  for (const file of compressionSettings.light.files) {
    const result = await compressImage(file, compressionSettings.light);
    if (result) results.push(result);
  }

  // Afficher les statistiques
  console.log('\n');
  console.log('═'.repeat(70));
  console.log('📊 STATISTIQUES FINALES');
  console.log('═'.repeat(70));

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalCompressed = results.reduce((sum, r) => sum + r.compressedSize, 0);
  const totalReduction = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);

  console.log(`\n✅ ${results.length} images compressées avec succès`);
  console.log(`📊 Taille originale totale : ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Taille compressée totale : ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Réduction totale : ${totalReduction}%`);
  console.log(`💾 Économie d'espace : ${((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2)} MB`);
  
  console.log('\n💡 Les originaux sont sauvegardés dans : public/assets/backup/');
  console.log('🚀 Vous pouvez maintenant rebuilder votre site : npm run build\n');
}

// Vérifier si sharp est installé
try {
  require.resolve('sharp');
  compressAllImages();
} catch (e) {
  console.error('\n❌ Le package "sharp" n\'est pas installé.\n');
  console.log('📦 Installez-le avec la commande :');
  console.log('   npm install --save-dev sharp\n');
  console.log('Puis relancez ce script :\n   node compress-images.js\n');
  process.exit(1);
}

