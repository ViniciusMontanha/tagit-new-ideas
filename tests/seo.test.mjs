import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getPageMetadata, pageMetadata, structuredData } from '../src/lib/seo-data.js';

test('cada página pública tem canonical e título próprios; aliases preservam o endereço principal',()=>{
 const titles=new Set();
 for(const path of Object.keys(pageMetadata)){
  const meta=getPageMetadata(path);assert.equal(meta.noindex,false);assert.equal(meta.canonical,`https://tagit.com.br${path}`);titles.add(meta.title);
 }
 assert.equal(titles.size,Object.keys(pageMetadata).length);
 assert.equal(getPageMetadata('/seguimento/logistica').canonical,'https://tagit.com.br/segmento/logistica');
 assert.equal(getPageMetadata('/admin/carrossel').noindex,true);assert.equal(getPageMetadata('/nao-existe').noindex,true);
});

test('dados estruturados usam contato e endereço oficiais, sem avaliações não verificadas',()=>{
 const data=structuredData('/');const org=data['@graph'][0];
 assert.equal(org.telephone,'+5516996403745');assert.equal(org.address.addressLocality,'Ribeirão Preto');
 assert.equal(JSON.stringify(data).includes('aggregateRating'),false);
});

test('HTML publicado contém metadados por página e sitemap XML',async()=>{
 const home=await readFile('dist/index.html','utf8');const empresas=await readFile('dist/para-empresas/index.html','utf8');
 assert.ok(home.includes('<title>Tag It |'));assert.ok(empresas.includes('href="https://tagit.com.br/para-empresas"'));
 assert.ok(empresas.includes('<title>Localização de ativos para empresas | Tag It</title>'));
 assert.ok((await readFile('dist/sitemap.xml','utf8')).includes('<loc>https://tagit.com.br/para-voce</loc>'));
 assert.equal(home.includes('googletagmanager.com/gtag/js'),false);
});
