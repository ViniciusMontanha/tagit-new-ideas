import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../backend/api/send-contact.js';
for (const origin of ['https://tagit.com.br','https://www.tagit.com.br']) {
 test(`contact preflight and validation preserve CORS for ${origin}`,async()=>{
  for(const method of ['OPTIONS','POST']) {
   const headers={};
   const res={setHeader(k,v){headers[k]=v;},status(c){this.code=c;return this;},json(b){this.body=b;return this;},end(){}};
   await handler({method,headers:{origin,'x-forwarded-for':'192.0.2.10'},body:{}},res);
   assert.equal(res.code,method==='OPTIONS'?204:400);
   assert.equal(headers['Access-Control-Allow-Origin'],origin);
   assert.equal(headers.Vary,'Origin');
  }
 });
}
test('untrusted preflight is rejected without reflecting origin',async()=>{
 const headers={};const res={setHeader(k,v){headers[k]=v;},status(c){this.code=c;return this;},json(){return this;},end(){}};
 await handler({method:'OPTIONS',headers:{origin:'https://untrusted.example'}},res);
 assert.equal(res.code,403);assert.equal(headers['Access-Control-Allow-Origin'],undefined);
});
