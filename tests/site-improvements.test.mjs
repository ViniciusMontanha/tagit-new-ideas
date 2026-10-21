import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { normalizePublicSlide, publicSlidesFromRows } from '../src/lib/hero-content.js';
import { pageMetadata } from '../src/lib/seo-data.js';
import { contactFormSchema, getAdminEmailTemplate } from '../backend/src/brevo.js';

test('todas as páginas públicas incluem conteúdo e links no HTML, sem aguardar JavaScript', async () => {
  for (const path of Object.keys(pageMetadata)) {
    const html = await readFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, 'utf8');
    assert.match(html, /<h1[\s>]/, path);
    assert.doesNotMatch(html, /<div id="root">\s*<\/div>/, path);
    assert.ok(html.includes('id="conteudo"'), path);
    assert.ok(html.includes('href="/privacidade"'), path);
  }
  const logistics = (await readFile('dist/segmento/logistica.html','utf8')).replace(/<!--.*?-->/gs, '');
  assert.ok(logistics.includes('Localização para logística'));
  assert.ok(logistics.includes('Solicitar proposta'));
  assert.ok(logistics.includes('A atualização acompanha toda a rota?'));
  const home = await readFile('dist/index.html', 'utf8');
  assert.ok(home.includes('href="/segmento/logistica"'));
  assert.ok(home.includes('href="/dispositivos#ficha-ultra-tag-30"'));
});

test('banners preservam configuração e corrigem promessa, CTA e contato legados', () => {
  const base = {id:'a',title:'Localize e proteja seus ativos em segundos',description:'Descrição configurada',image:'/custom.webp?v=1&v=2',imageAlt:'Produto com GPS',primaryCtaLabel:'SOLICITAR DEMO',primaryCtaHref:'https://wa.me/5516991295203?text=Quero%20demo',secondaryCtaLabel:'Soluções',secondaryCtaHref:'/para-empresas'};
  const result = normalizePublicSlide(base);
  assert.equal(result.title, 'Mais visibilidade sobre seus ativos');
  assert.equal(result.description, base.description);
  assert.equal(result.image, '/custom.webp?v=2');
  assert.equal(result.primaryCtaLabel, 'Falar pelo WhatsApp');
  assert.equal(new URL(result.primaryCtaHref).pathname,'/5516997021741');
  assert.equal(new URL(result.primaryCtaHref).searchParams.get('text'),'Quero demo');
  assert.equal(normalizePublicSlide({...base,primaryCtaHref:'javascript:alert(1)'}).primaryCtaHref,'/#contato');
  assert.deepEqual(publicSlidesFromRows([{id:'incompleto'}]), []);
});

test('assunto e informações empresariais são limitados e escapados no email', () => {
  const data = contactFormSchema.parse({ nome:'Pessoa Teste',email:'teste@example.com',telefone:'16997021741',mensagem:'Quero conhecer o produto.',assunto:'Logística',empresa:'<script>empresa</script>',ativos:'50 a 100' });
  const html = getAdminEmailTemplate(data);
  assert.ok(html.includes('Assunto: Logística'));
  assert.ok(html.includes('&lt;script&gt;empresa&lt;/script&gt;'));
  assert.ok(html.includes('Quantidade de ativos: 50 a 100'));
  assert.equal(contactFormSchema.safeParse({...data,empresa:'x'.repeat(121)}).success,false);
  assert.equal(contactFormSchema.safeParse({...data,mensagem:'x'.repeat(1001)}).success,false);
});

test('cores de marca mantêm contraste suficiente com branco', async () => {
  const css = await readFile('src/index.css','utf8');
  function luminance(h,s,l) {
    s/=100;l/=100;
    const a=s*Math.min(l,1-l);
    const rgb=[0,8,4].map(n=>{const k=(n+h/30)%12;return l-a*Math.max(-1,Math.min(k-3,9-k,1));});
    const linear=rgb.map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
    return linear.reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
  }
  for (const token of ['primary','secondary','cyan-light','blue-medium','purple-medium','purple-magenta']) {
    const [,h,s,l]=css.match(new RegExp(`--${token}: (\\d+) (\\d+)% (\\d+)%`));
    assert.ok(1.05/(luminance(+h,+s,+l)+.05)>=4.5, token);
  }
});
