(() => {
  const title = document.querySelector('.intro-line');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!title || reduced.matches) return;
  const original = title.innerHTML;
  const lines = Array.from(title.childNodes).map(node => node.nodeName === 'BR' ? '\n' : node.textContent).join('');
  const accessible = document.createElement('span');
  accessible.className = 'sr-only';
  accessible.textContent = lines.replace('\n', ' ');
  const sizer = document.createElement('span');
  sizer.className = 'typing-sizer'; sizer.setAttribute('aria-hidden', 'true'); sizer.innerHTML = original;
  const copy = document.createElement('span');
  copy.className = 'typing-copy'; copy.setAttribute('aria-hidden', 'true');
  const cursor = document.createElement('span'); cursor.className = 'typing-cursor';
  title.replaceChildren(accessible, sizer, copy);
  copy.append(cursor);
  let index = 0, timer;
  function finish() {
    clearTimeout(timer); copy.replaceChildren();
    lines.split('\n').forEach((line, i) => { if (i) copy.append(document.createElement('br')); copy.append(document.createTextNode(line)); });
    copy.append(cursor); title.classList.add('typing-finished');
    if (reduced.matches) cursor.hidden = true;
  }
  function type() {
    if (reduced.matches) { finish(); return; }
    const character = lines[index++];
    copy.insertBefore(character === '\n' ? document.createElement('br') : document.createTextNode(character), cursor);
    if (index < lines.length) timer = setTimeout(type, character === '\n' ? 260 : 48);
    else title.classList.add('typing-finished');
  }
  reduced.addEventListener('change', event => { if (event.matches) finish(); });
  timer = setTimeout(type, 800);
})();
