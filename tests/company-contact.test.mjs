import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { COMPANY, companyWhatsApp } from '../backend/src/contact-utils.js';

test('contato comercial e banners legados apontam para o contato oficial sem perder mensagem', async () => {
  assert.equal(COMPANY.phone, '+5516997021741');
  assert.equal(COMPANY.phoneDisplay, '(16) 99702-1741');
  assert.equal(new URL(companyWhatsApp()).pathname, '/5516997021741');
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
  try {
    const { normalizeCompanyLink } = await server.ssrLoadModule('/src/lib/contact.ts');
    for (const old of ['5516996403745', '5516991295203', '5516997493996']) {
      for (const href of [`https://wa.me/${old}?text=Teste%20local`, `https://api.whatsapp.com/send?phone=${old}&text=Teste%20local`]) {
        const result = new URL(normalizeCompanyLink(href));
        assert.equal(result.pathname, '/5516997021741');
        assert.equal(result.searchParams.get('text'), 'Teste local');
      }
    }
    assert.equal(normalizeCompanyLink('/para-empresas'), '/para-empresas');
  } finally { await server.close(); }
});
