async function fetchJSON(path){
  try{
    const res = await fetch(path, {cache:'no-store'});
    if(!res.ok) throw new Error('Network error');
    return await res.json();
  }catch(e){
    console.warn('Data load failed for', path, e);
    return null;
  }
}

function el(tag, attrs={}, children=[]){
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(attrs)){
    if(k==='class') node.className = v;
    else if(k==='html') node.innerHTML = v;
    else node.setAttribute(k,v);
  }
  for(const c of children){
    if(typeof c === 'string') node.appendChild(document.createTextNode(c));
    else if(c) node.appendChild(c);
  }
  return node;
}

document.addEventListener('DOMContentLoaded', async () => {
  // Tiers
  const tiersEl = document.getElementById('tiers');
  if(tiersEl){
    const tiers = await fetchJSON('data/tiers.json');
    if(tiers && Array.isArray(tiers)){
      tiers.forEach(t => {
        const card = el('div', {class:'card'}, [
          el('h3', {}, [t.name]),
          el('p', {}, [t.description || '']),
          el('ul', {}, (t.perks||[]).map(p => el('li', {}, [p]))),
          el('p', {class:'note'}, [t.note || '']),
          el('p', {}, [el('a',{class:'cta',href:t.cta || '#'},['Enter'])])
        ]);
        tiersEl.appendChild(card);
      });
    } else {
      tiersEl.appendChild(el('p',{},['No tiers configured yet. Edit data/tiers.json']));
    }
  }

  // Tasks
  const tasksEl = document.getElementById('tasks');
  if(tasksEl){
    const tasks = await fetchJSON('data/tasks.json');
    if(tasks && Array.isArray(tasks)){
      tasks.forEach(task => {
        const card = el('div',{class:'card'},[
          el('h3',{},[task.title || 'Task']),
          el('p',{},[task.description || '']),
          el('p',{class:'note'},[`Due: ${task.due || '—'} • Penalty: ${task.penalty || '—'}`])
        ]);
        tasksEl.appendChild(card);
      });
    } else {
      tasksEl.appendChild(el('p',{},['No tasks yet. Edit data/tasks.json']));
    }
  }

  // Leaderboard
  const lb = document.getElementById('leaderboard');
  if(lb){
    const data = await fetchJSON('data/leaderboard.json');
    const tbody = lb.querySelector('tbody');
    if(data && Array.isArray(data)){
      data.sort((a,b)=> (b.points||0)-(a.points||0));
      data.forEach((row, idx) => {
        const tr = el('tr',{},[
          el('td',{},[String(idx+1)]),
          el('td',{},[row.name || '—']),
          el('td',{},[String(row.points || 0)]),
          el('td',{},[row.notes || ''])
        ]);
        tbody.appendChild(tr);
      });
    } else {
      const tr = el('tr',{},[el('td',{colspan:'4'},['No entries yet. Edit data/leaderboard.json'])]);
      tbody.appendChild(tr);
    }
  }
});