#!/bin/bash
set -e

echo "Starting Vercel build process..."
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "Current directory: $(pwd)"

echo "Installing dependencies..."
npm ci

echo "Running build..."
npm run build

echo "Checking dist directory..."
if [ -d "dist" ]; then
    echo "✓ dist directory found"
    ls -la dist/
    echo "Build successful!"
else
    echo "✗ dist directory NOT found!"
    echo "Current directory contents:"
    ls -la
    exit 1
fi
