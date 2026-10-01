import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('hero não exibe slides provisórios antes de carregar o conteúdo configurado', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { Hero } = await server.ssrLoadModule('/src/components/Hero.tsx');
    const html = renderToStaticMarkup(createElement(Hero));
    assert.match(html, /aria-busy="true"/);
    assert.match(html, /Carregando destaques da Tag It/);
    assert.doesNotMatch(html, /<img[\s>]/);
    assert.doesNotMatch(html, /Mais visibilidade sobre seus ativos/);
    assert.doesNotMatch(html, /Ir para slide/);
  } finally {
    await server.close();
  }
});
