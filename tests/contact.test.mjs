import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeBrazilianPhone, isValidBrazilianPhone, escapeHtml, companyWhatsApp } from '../backend/src/contact-utils.js';
import { deliverContactEmails, deliveryKey } from '../backend/src/email-delivery.js';
import { consumeRateLimit } from '../backend/src/request-guard.js';
import { contactFormSchema, getAdminEmailTemplate, getClientEmailTemplate } from '../backend/src/brevo.js';
import handler from '../backend/api/send-contact.js';

const data={nome:'Teste de validação',email:'teste@example.com',telefone:'+5516996403745',mensagem:'Mensagem de teste local, sem envio.'};
const requestId='9263773c-cbcb-4fca-95ab-6f71f82af989';

test('telefones brasileiros preservam todos os dígitos em formatos usuais',()=>{
 for(const value of ['5516996403745','+5516996403745','+55 16 99640-3745','(16) 99640-3745','16996403745','005516996403745']){
  assert.equal(normalizeBrazilianPhone(value),data.telefone); assert.equal(isValidBrazilianPhone(value),true);
 }
 assert.equal(normalizeBrazilianPhone('(11) 3234-5678'),'+551132345678');
 for(const value of ['+551699640374','+5500996403745','123','+12125551234','+55169964037455','abc16996403745']) assert.equal(isValidBrazilianPhone(value),false,value);
});

test('schema aceita formatação válida e rejeita contatos truncados e honeypot',()=>{
 assert.equal(contactFormSchema.parse({...data,telefone:'+55 (16) 99640-3745'}).telefone,data.telefone);
 assert.equal(contactFormSchema.safeParse({...data,telefone:'+551699640374'}).success,false);
 assert.equal(contactFormSchema.safeParse({...data,website:'bot.example'}).success,false);
});

test('todos os campos de texto são escapados no HTML',()=>{
 const input={...data,nome:'<img src=x onerror="alert(1)">',mensagem:'<b>Texto & outro</b>'};
 for(const template of [getAdminEmailTemplate(input),getClientEmailTemplate(input)]){
  assert.ok(!template.includes('<img src=x')); assert.ok(template.includes('&lt;img'));
 }
 assert.ok(getAdminEmailTemplate(input).includes('&lt;b&gt;Texto &amp; outro&lt;/b&gt;'));
 assert.equal(escapeHtml('"\'&<>'),'&quot;&#39;&amp;&lt;&gt;');
 assert.match(companyWhatsApp(),/wa.me\/5516996403745/);
});

test('falha na confirmação não transforma contato recebido em falha total',async()=>{
 let calls=0;
 const result=await deliverContactEmails({data,requestId,admin:{},client:{},send:async()=>{calls++;if(calls===2)throw Error('provider unavailable');return {body:{messageId:'admin-1'}};}});
 assert.equal(calls,2);assert.equal(result.success,true);assert.equal(result.confirmationSent,false);assert.equal(result.adminMessageId,'admin-1');
});

test('falha do envio à empresa não gera falsa confirmação ao cliente',async()=>{
 let calls=0;
 const result=await deliverContactEmails({data,requestId,admin:{},client:{},send:async()=>{calls++;throw Error('blocked');}});
 assert.equal(calls,1);assert.equal(result.success,false);
});

test('nova tentativa conserva chaves distintas por destinatário e reconhece duplicação da Brevo',async()=>{
 const sent=[];
 const send=async message=>{sent.push(message.headers.idempotencyKey);throw {response:{body:{code:'duplicate_parameter',message:'Email for this idempotency key has already been processed'}}};};
 for(let i=0;i<2;i++){
  const result=await deliverContactEmails({data,requestId,admin:{},client:{},send});
  assert.equal(result.success,true);assert.equal(result.confirmationSent,true);
 }
 assert.equal(sent[0],sent[2]);assert.equal(sent[1],sent[3]);assert.notEqual(sent[0],sent[1]);
 assert.match(sent[0],/^[a-f0-9]{8}-[a-f0-9]{4}-5[a-f0-9]{3}-a[a-f0-9]{3}-[a-f0-9]{12}$/);
 assert.notEqual(deliveryKey(requestId,{...data,mensagem:'Outra mensagem'},'admin'),sent[0]);
});

test('limite de tentativas expira sem bloquear permanentemente',()=>{
 assert.equal(consumeRateLimit('unit-test',2,1000,1000).allowed,true);
 assert.equal(consumeRateLimit('unit-test',2,1000,1001).allowed,true);
 assert.equal(consumeRateLimit('unit-test',2,1000,1002).allowed,false);
 assert.equal(consumeRateLimit('unit-test',2,1000,2001).allowed,true);
});

test('API rejeita métodos, origem e payload inválidos sem chamar o provedor',async()=>{
 let ip=0;
 for(const [method,body,origin,status] of [['GET',{},undefined,405],['OPTIONS',{},undefined,204],['POST',{},'https://outro.example',403],['POST',{},'https://tagit.com.br',400],['POST',{...data,telefone:'123'},'https://tagit.com.br',400],['POST',{...data,website:'bot'},'https://tagit.com.br',400]]){
  const response={code:0,setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;return this;},end(){}};
  await handler({method,body,headers:{origin,'x-forwarded-for':`127.0.0.${++ip}`}},response);
  assert.equal(response.code,status);
 }
});
