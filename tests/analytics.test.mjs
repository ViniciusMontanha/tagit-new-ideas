import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

test('medição exige consentimento e registra cada lead uma única vez sem a URL privada', async () => {
  let choice = null;
  const calls = [];
  const originals = new Map(['window', 'location', 'localStorage'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  Object.defineProperties(globalThis, {
    window: { configurable: true, value: { gtag: (...args) => calls.push(args) } },
    location: { configurable: true, value: { origin: 'https://tagit.com.br', pathname: '/para-empresas', search: '?email=privado@example.com' } },
    localStorage: { configurable: true, value: { getItem: () => choice } },
  });
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
  try {
    const { trackContactEvent } = await server.ssrLoadModule('/src/lib/analytics.ts');
    trackContactEvent('generate_lead', 'Logística', 'teste-1');
    choice = 'rejected';
    trackContactEvent('whatsapp_click', 'Rodapé');
    assert.equal(calls.length, 0);
    choice = 'accepted';
    trackContactEvent('generate_lead', 'Logística', 'teste-1');
    trackContactEvent('generate_lead', 'Logística', 'teste-1');
    const leads = calls.filter(call => call[1] === 'generate_lead');
    assert.equal(leads.length, 1);
    assert.deepEqual(leads[0][2], { contact_source: 'Logística', page_location: 'https://tagit.com.br/para-empresas' });
    assert.equal(JSON.stringify(calls).includes('privado@example.com'), false);
    choice = 'rejected';
    const count = calls.length;
    trackContactEvent('generate_lead', 'Logística', 'teste-2');
    assert.equal(calls.length, count);
  } finally {
    await server.close();
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
