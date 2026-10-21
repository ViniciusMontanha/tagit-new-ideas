import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('destaque configurado já entrega texto, imagem e ações no HTML inicial', async () => {
  const html = await readFile('dist/index.html','utf8');
  const slides = JSON.parse(await readFile('src/data/hero-slides.snapshot.json','utf8'));
  assert.ok(html.includes(slides[0].title));
  assert.ok(html.includes('Destaques da Tag It'));
  assert.ok(html.includes('fetchPriority="high"') || html.includes('fetchpriority="high"'));
  assert.doesNotMatch(html,/Carregando destaques/);
  assert.ok(html.includes('Ativar rotação'));
});
