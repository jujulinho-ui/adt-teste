/* ========= Five9 ADT Demo Panel – by você :) =========
   - 100% self-contained (injeta HTML + CSS via JS)
   - Botões rápidos (Google, MakeOne)
   - Cards de status / métricas
   - Ações de “simulação” (placeholders)
   - Toasts de feedback
   - Tema com CSS variables (fácil de trocar cores)
   ===================================================== */

(function () {
  // evita duplicar ao recarregar o ADP
  if (document.getElementById("five9-adt-demo-panel")) return;

  // ====== THEME (mude as cores aqui) ======
  const theme = `
    :root {
      --bg: #0f172a;          /* slate-950 */
      --panel: #111827;       /* gray-900  */
      --muted: #334155;       /* slate-600 */
      --text: #e5e7eb;        /* gray-200  */
      --subtext: #94a3b8;     /* slate-400 */
      --primary: #6366f1;     /* indigo-500*/
      --primary-strong: #4f46e5;
      --accent: #22d3ee;      /* cyan-400  */
      --success: #22c55e;     /* green-500 */
      --warning: #f59e0b;     /* amber-500 */
      --danger: #ef4444;      /* red-500   */
      --card: #0b1220;        /* deep */
      --shadow: rgba(0,0,0,.35);
      --radius: 16px;
    }
  `;

  // ====== CSS ======
  const css = `
    ${theme}
    #five9-adt-demo-panel {
      font-family: Inter, Roboto, Arial, sans-serif;
      color: var(--text);
      background: linear-gradient(180deg, #0b1220 0%, #0f172a 100%);
      border: 1px solid #1f2a44;
      border-radius: var(--radius);
      box-shadow: 0 10px 30px var(--shadow);
      margin: 14px 14px 0 14px;
      padding: 16px;
    }
    .adt-header {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; margin-bottom: 12px;
    }
    .adt-title {
      display:flex; align-items:center; gap:10px; font-weight:700; letter-spacing:.3px;
    }
    .adt-title-badge {
      padding: 4px 10px; border-radius: 999px;
      background: rgba(99,102,241,.15); color: var(--accent);
      border: 1px solid rgba(99,102,241,.35); font-size:12px;
    }
    .adt-actions { display:flex; gap:8px; flex-wrap:wrap; }
    .btn {
      border: 1px solid rgba(255,255,255,.08);
      background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
      color: var(--text);
      padding: 10px 14px; border-radius: 12px;
      font-weight:600; cursor:pointer; transition: all .18s ease;
    }
    .btn:hover{ transform: translateY(-1px); border-color: rgba(255,255,255,.18); }
    .btn-primary{ background: linear-gradient(180deg, var(--primary) 0%, var(--primary-strong) 100%); border-color: transparent; }
    .btn-success{ background: linear-gradient(180deg, #16a34a, #15803d); border-color: transparent; }
    .btn-warning{ background: linear-gradient(180deg, #f59e0b, #d97706); border-color: transparent; }
    .btn-danger{  background: linear-gradient(180deg, #ef4444, #dc2626); border-color: transparent; }
    .btn-ghost{ background: transparent; border:1px dashed rgba(255,255,255,.18); color: var(--subtext); }

    .grid {
      display: grid; gap: 12px;
      grid-template-columns: repeat(12, 1fr);
    }
    .col-12 { grid-column: span 12; }
    .col-6  { grid-column: span 6; }
    .col-4  { grid-column: span 4; }
    @media (max-width: 1100px){ .col-6{grid-column: span 12;} .col-4{grid-column: span 6;} }
    @media (max-width: 700px){ .col-4{grid-column: span 12;} }

    .card {
      background: radial-gradient(1200px 300px at 0% 0%, rgba(99,102,241,.12), transparent 45%),
                  linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));
      border: 1px solid rgba(255,255,255,.06);
      border-radius: var(--radius);
      padding: 14px;
    }
    .card h4 { margin: 0 0 8px 0; color: var(--accent); letter-spacing:.2px; }
    .metrics { display:flex; gap: 12px; flex-wrap: wrap; }
    .chip {
      background: #0a1222; border:1px solid #1c2845; color: var(--subtext);
      padding: 8px 10px; border-radius: 12px; font-weight:600; font-size: 13px;
    }
    .chip.ok{ color:#86efac; border-color:#14532d; background: #082414; }
    .chip.warn{ color:#fde68a; border-color:#713f12; background:#2a1805; }
    .chip.err{ color:#fca5a5; border-color:#7f1d1d; background:#2b0f0f; }

    .quick-links { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
    .quick-links .btn{ padding:9px 12px; }

    .list {
      display:flex; flex-direction:column; gap:8px; margin-top: 6px;
    }
    .list-item {
      background: #0c1426; border:1px solid rgba(255,255,255,.06);
      padding:10px 12px; border-radius:12px; display:flex; justify-content:space-between; align-items:center;
    }
    .muted{ color: var(--subtext); font-size: 13px; }

    /* Toast */
    .toast {
      position: fixed; right: 16px; bottom: 16px;
      background: #0b1220; border: 1px solid rgba(255,255,255,.12);
      padding: 12px 14px; border-radius: 12px; box-shadow: 0 10px 30px var(--shadow);
      opacity: 0; transform: translateY(10px); transition: all .2s ease;
      z-index: 999999;
    }
    .toast.show{ opacity:1; transform: translateY(0); }
  `;

  // ====== HTML ======
  const html = `
    <div class="adt-header">
      <div class="adt-title">
        <span style="width:10px;height:10px;border-radius:999px;background:var(--accent);box-shadow:0 0 18px var(--accent)"></span>
        <span>Five9 <span style="color:var(--accent)">ADT+</span> — Painel de Demonstração</span>
        <span class="adt-title-badge">demo</span>
      </div>
      <div class="adt-actions">
        <button class="btn btn-primary" id="act-open-google">Abrir Google</button>
        <button class="btn" id="act-open-makeone">Site MakeOne</button>
        <button class="btn btn-success" id="act-login">Simular Login</button>
        <button class="btn btn-warning" id="act-test-headset">Testar Headset</button>
        <button class="btn btn-danger" id="act-end-call">Encerrar Chamada</button>
        <button class="btn btn-ghost" id="act-theme">Alternar Tema</button>
      </div>
    </div>

    <div class="grid">
      <div class="card col-6">
        <h4>Status & Métricas</h4>
        <div class="metrics">
          <div class="chip ok">Voz: Conectado</div>
          <div class="chip warn">Fila: 03 em espera</div>
          <div class="chip">SLA: 92%</div>
          <div class="chip">NPS: 74</div>
          <div class="chip">AHT: 04:21</div>
        </div>
        <p class="muted" style="margin-top:10px">*Valores ilustrativos para demonstração.</p>
      </div>

      <div class="card col-6">
        <h4>Ações Rápidas</h4>
        <div class="list">
          <div class="list-item">
            <span>Nova Chamada (placeholder)</span>
            <button class="btn btn-primary" id="act-makecall">Iniciar</button>
          </div>
          <div class="list-item">
            <span>Transferir (placeholder)</span>
            <button class="btn" id="act-transfer">Transferir</button>
          </div>
          <div class="list-item">
            <span>Gravar Nota (placeholder)</span>
            <button class="btn" id="act-note">Salvar</button>
          </div>
        </div>
      </div>

      <div class="card col-12">
        <h4>Links Úteis</h4>
        <div class="quick-links">
          <button class="btn" data-link="https://documentation.five9.com/">Docs Five9</button>
          <button class="btn" data-link="https://www.five9.com/cat">Network Test</button>
          <button class="btn" data-link="https://support.five9.com/">Suporte Five9</button>
          <button class="btn" data-link="https://makeone.com.br/">MakeOne</button>
          <button class="btn" data-link="https://www.google.com/">Google</button>
        </div>
      </div>
    </div>

    <div class="toast" id="five9-toast"></div>
  `;

  // ====== mount ======
  const style = document.createElement("style");
  style.id = "five9-adt-demo-style";
  style.textContent = css;
  document.head.appendChild(style);

  const panel = document.createElement("section");
  panel.id = "five9-adt-demo-panel";
  panel.innerHTML = html;
  // no ADP, geralmente existe um container central; prepend evita empurrar os controles do Five9
  (document.body || document.documentElement).prepend(panel);

  // ====== helpers ======
  const toast = (msg) => {
    const el = document.getElementById("five9-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2200);
  };

  const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

  // ====== events ======
  panel.querySelectorAll(".quick-links .btn").forEach(b=>{
    b.addEventListener("click", ()=> open(b.getAttribute("data-link")));
  });

  document.getElementById("act-open-google").onclick = () => open("https://www.google.com/");
  document.getElementById("act-open-makeone").onclick = () => open("https://makeone.com.br/");

  document.getElementById("act-login").onclick = () => toast("Login validado (simulação).");
  document.getElementById("act-test-headset").onclick = () => toast("Teste de headset disparado (simulação).");
  document.getElementById("act-end-call").onclick = () => toast("Chamada encerrada (simulação).");

  document.getElementById("act-makecall").onclick = () => toast("Discagem iniciada (placeholder).");
  document.getElementById("act-transfer").onclick = () => toast("Transferência em andamento (placeholder).");
  document.getElementById("act-note").onclick = () => toast("Nota salva (placeholder).");

  // Tema claro/escuro simples (alterna contraste da base)
  let dark = true;
  document.getElementById("act-theme").onclick = () => {
    dark = !dark;
    const root = document.documentElement;
    if (!dark) {
      root.style.setProperty("--bg", "#0a0a0a");
      root.style.setProperty("--panel", "#0e0e0e");
      root.style.setProperty("--card", "#121212");
      root.style.setProperty("--text", "#ffffff");
      toast("Tema escuro intenso");
    } else {
      root.style.removeProperty("--bg");
      root.style.removeProperty("--panel");
      root.style.removeProperty("--card");
      root.style.removeProperty("--text");
      toast("Tema padrão");
    }
  };
})();
