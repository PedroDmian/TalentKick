#!/bin/bash

set -e

echo "🚀 Build Android (APK + AAB firmados)"

ROOT_DIR=$(pwd)
BUILD_DIR="$ROOT_DIR/build"

DATE=$(date +"%Y-%m-%d-%H-%M")

APP_NAME="TalentKick"

APK_SRC="android/app/build/outputs/apk/release/app-release.apk"
AAB_SRC="android/app/build/outputs/bundle/release/app-release.aab"

APK_DEST="$BUILD_DIR/${APP_NAME}-${DATE}.apk"
AAB_DEST="$BUILD_DIR/${APP_NAME}-${DATE}.aab"

echo "📁 Creando carpeta build..."
mkdir -p "$BUILD_DIR"

echo "🧹 Limpiando proyecto..."
cd android
./gradlew clean

echo "📦 Generando APK release firmado..."
./gradlew assembleRelease

echo "📦 Generando AAB release firmado..."
./gradlew bundleRelease

cd ..

echo "📤 Moviendo y renombrando archivos..."

if [ -f "$APK_SRC" ]; then
  mv "$APK_SRC" "$APK_DEST"
  echo "✅ APK generado: $APK_DEST"
else
  echo "❌ APK no encontrado"
fi

if [ -f "$AAB_SRC" ]; then
  mv "$AAB_SRC" "$AAB_DEST"
  echo "✅ AAB generado: $AAB_DEST"
else
  echo "❌ AAB no encontrado"
fi

echo "-----------------------------------"
echo "🎉 Build finalizado correctamente"
echo "📁 Archivos finales en /build"
