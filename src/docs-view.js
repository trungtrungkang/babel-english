import { projectDocs } from './project-docs.js';
const escape = text => String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inline(text) {
 return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).map(part=>{
 const link=part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
 if(link) return `<a href="${escape(link[2])}" target="_blank" rel="noopener noreferrer">${escape(link[1])}</a>`;
 return escape(part).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
 }).join('');
}
// Deliberately small renderer for the committed documents; raw HTML is always escaped.
export function renderMarkdown(markdown) {
 const lines=markdown.split('\n'); let out='',i=0;
 const cells=line=>line.trim().replace(/^\||\|$/g,'').split('|').map(x=>x.trim());
 while(i<lines.length){
  const line=lines[i];
  if(!line.trim()){i++;continue;}
  if(line.startsWith('```')){let code=[];i++;while(i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i++]);i++;out+=`<pre><code>${escape(code.join('\n'))}</code></pre>`;continue;}
  if(line.startsWith('|')&&lines[i+1]?.match(/^\|[\s:|\-]+\|$/)){const headers=cells(line);i+=2;let rows=[];while(i<lines.length&&lines[i].startsWith('|'))rows.push(cells(lines[i++]));out+=`<div class="table-wrap"><table><thead><tr>${headers.map(c=>`<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(c=>`<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;continue;}
  const heading=line.match(/^(#{1,3}) (.+)$/);if(heading){const n=heading[1].length;out+=`<h${n}>${inline(heading[2])}</h${n}>`;i++;continue;}
  if(/^(- |\d+\. )/.test(line)){const ordered=/^\d/.test(line),tag=ordered?'ol':'ul';let items=[];while(i<lines.length&&(ordered?/^\d+\. /:/^- /).test(lines[i]))items.push(lines[i++].replace(/^(- |\d+\. )/,''));out+=`<${tag}>${items.map(s=>`<li>${inline(s.replace(/^\[x\] /,'✓ ').replace(/^\[ \] /,'○ '))}</li>`).join('')}</${tag}>`;continue;}
  let paragraph=[line];i++;while(i<lines.length&&lines[i].trim()&&!/^(#|\||```|- |\d+\. )/.test(lines[i]))paragraph.push(lines[i++]);out+=`<p>${inline(paragraph.join(' '))}</p>`;
 }
 return out;
}
export function documentsView(lang,selected){
 const en=lang==='en',doc=projectDocs.find(d=>d.id===selected)||projectDocs[0];
 return `<div class="heading-row"><div><p class="eyebrow">BABEL · PROJECT LIBRARY</p><h1>${en?'Building Babel, together':'Cùng xây dựng Babel Online'}</h1><p class="muted">${en?'The plan, the prototype and the questions to explore together.':'Định hướng, bản thử nghiệm và những câu hỏi cùng tìm lời giải.'}</p></div><span class="tag">VI / EN · ${projectDocs.length} ${en?'documents':'tài liệu'}</span></div><div class="notice">${en?'For Vic and Châu to review. These are working proposals, not an approved delivery schedule. Use VI / EN above to switch the current document.':'Dành cho Vic và Châu cùng xem và góp ý. Đây là đề xuất đang phát triển, chưa phải lịch bàn giao đã chốt. Dùng VI / EN phía trên để đổi ngôn ngữ tài liệu.'}</div><div class="docs-layout"><nav class="docs-index card" aria-label="${en?'Project documents':'Tài liệu dự án'}">${projectDocs.map((item,index)=>`<button data-doc="${item.id}" ${doc.id===item.id?'aria-current="page"':''}><span>${String(index+1).padStart(2,'0')}</span>${escape(item[lang].split('\n')[0].replace(/^# /,''))}</button>`).join('')}<p class="footnote">${en?'Start with the demonstration guide for a 10–15 minute walkthrough.':'Bắt đầu với kịch bản demo nếu bạn muốn xem thử trong 10–15 phút.'}</p></nav><article class="card doc-article" aria-label="${en?'Document content':'Nội dung tài liệu'}">${renderMarkdown(doc[lang])}</article></div>`;
}
export const firstDocument=projectDocs[0].id;
export function validDocument(id){return projectDocs.some(doc=>doc.id===id);}
