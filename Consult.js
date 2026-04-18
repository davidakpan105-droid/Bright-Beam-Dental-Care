/* ════════════════════════════════════════════
   BRIGHT BEAM — consult.js
════════════════════════════════════════════ */

const STEPS = [
  { id:'s1', label:'Step 1 of 4', name:'Your Details',  pct:25,  ps:'ps1' },
  { id:'s2', label:'Step 2 of 4', name:'Consultation',  pct:50,  ps:'ps2' },
  { id:'s3', label:'Step 3 of 4', name:'Payment',       pct:75,  ps:'ps3' },
  { id:'s4', label:'Step 4 of 4', name:'Confirmed',     pct:100, ps:'ps4' },
];

let cur = 0;

function setStep(idx) {
  // Sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(STEPS[idx].id).classList.add('active');

  // Progress bar
  document.getElementById('progressLabel').textContent    = STEPS[idx].label;
  document.getElementById('progressFraction').textContent = STEPS[idx].name;
  document.getElementById('progressFill').style.width     = STEPS[idx].pct + '%';

  // Step pills
  STEPS.forEach((s, i) => {
    const el = document.getElementById(s.ps);
    el.classList.remove('active', 'done');
    if (i < idx)  el.classList.add('done');
    if (i === idx) el.classList.add('active');
  });

  // Hide progress header on success
  const ph = document.getElementById('progressHeader');
  if (ph) ph.style.display = idx === 3 ? 'none' : '';

  cur = idx;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Validation helpers ── */
function markField(id, errId, valid, msg) {
  const el  = document.getElementById(id);
  const err = document.getElementById(errId || ('e-' + id));
  if (!el) return valid;
  if (!valid) {
    el.classList.add('err');
    if (err) { if (msg) err.textContent = msg; err.classList.add('show'); }
  } else {
    el.classList.remove('err');
    if (err) err.classList.remove('show');
  }
  return valid;
}

function getVal(id) { return (document.getElementById(id)?.value || '').trim(); }

function validateStep1() {
  let ok = true;
  if (!getVal('fName')) ok = markField('fName', null, false) && false;
  if (!getVal('lName')) ok = markField('lName', null, false) && false;
  if (!getVal('age'))   ok = markField('age',   null, false) && false;
  if (!getVal('state')) ok = markField('state', null, false) && false;

  // Phone
  const ph = getVal('phone').replace(/\s/g, '');
  if (!ph) {
    ok = markField('phone', null, false) && false;
  } else if (!/^(\+234|0)[7-9][01]\d{8}$/.test(ph)) {
    ok = markField('phone', 'e-phone', false, 'Enter a valid Nigerian phone number (e.g. 08012345678)') && false;
  } else {
    markField('phone', 'e-phone', true);
  }
  return ok;
}

function validateStep2() {
  const sel = document.querySelector('input[name="concern"]:checked');
  const err = document.getElementById('e-concern');
  if (!sel) {
    if (err) err.classList.add('show');
    return false;
  }
  if (err) err.classList.remove('show');
  return true;
}

/* ── Step navigation ── */
document.getElementById('s1Next').addEventListener('click', () => {
  if (validateStep1()) setStep(1);
});

document.getElementById('s2Back').addEventListener('click', () => setStep(0));
document.getElementById('s2Next').addEventListener('click', () => {
  if (validateStep2()) setStep(2);
});

document.getElementById('s3Back').addEventListener('click', () => setStep(1));

/* ── Checkboxes unlock send button ── */
function syncSendBtn() {
  const ok = document.getElementById('chk1').checked && document.getElementById('chk2').checked;
  document.getElementById('s3Next').disabled = !ok;
}

['chk1','chk2'].forEach((id, i) => {
  document.getElementById(id).addEventListener('change', function() {
    const row = document.getElementById('cr' + (i + 1));
    if (row) row.classList.toggle('checked', this.checked);
    syncSendBtn();
  });
});

/* ── WhatsApp send ── */
document.getElementById('s3Next').addEventListener('click', () => {
  const ctype   = document.querySelector('input[name="ctype"]:checked')?.value   || 'Walk-In (Clinic)';
  const concern = document.querySelector('input[name="concern"]:checked')?.value || 'Not specified';
  const first = getVal('fName'), last = getVal('lName');
  const phone = getVal('phone'), email = getVal('email') || 'Not provided';
  const age   = getVal('age'),   state = getVal('state');
  const notes = getVal('notes') || 'None';

  const msg =
`Hello Dr. Egbewole,

I have just completed my consultation booking on your website and transferred the ₦10,000 consultation fee to Zenith Bank – 2369040828 (Egbewole Toyin Rachael).

*Patient Details:*
• Name: ${first} ${last}
• Phone: ${phone}
• Email: ${email}
• Age: ${age}
• State: ${state}

*Consultation:*
• Type: ${ctype}
• Main Concern: ${concern}
• Notes: ${notes}

Please confirm receipt of payment and schedule my appointment. Thank you.`;

  window.open('https://wa.me/2347039625531?text=' + encodeURIComponent(msg), '_blank');
  setStep(3);
});

/* ── Consultation type → show times panel ── */
document.querySelectorAll('input[name="ctype"]').forEach(r => {
  r.addEventListener('change', () => {
    const isOnline = r.value !== 'Walk-In (Clinic)';
    document.getElementById('timesPanel').classList.toggle('show', isOnline);
  });
});

/* ── Copy account number ── */
document.getElementById('copyBtn').addEventListener('click', function () {
  navigator.clipboard.writeText('2369040828').then(() => {
    this.textContent = 'Copied!';
    this.classList.add('copied');
    setTimeout(() => {
      this.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:11px;height:11px"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy`;
      this.classList.remove('copied');
    }, 2500);
  }).catch(() => {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = '2369040828';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.textContent = 'Copied!';
    setTimeout(() => { this.textContent = 'Copy'; }, 2500);
  });
});

/* ── Clear field errors on input ── */
document.querySelectorAll('.f-input, .f-select').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('err');
    const err = document.getElementById('e-' + el.id);
    if (err) err.classList.remove('show');
  });
});