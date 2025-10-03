(function () {
  if (document.getElementById("five9-tiles-host")) return;

  // === CONFIG RÁPIDA ===
  const SHOW_SIMULATIONS = false; // mude para true se quiser ver os botões de simulação
  const TILES = [
    { title: "Google",     url: "https://www.google.com/",      icon: "https://www.google.com/favicon.ico" },
    { title: "MakeOne",    url: "https://makeone.com.br/",      icon: "https://makeone.com.br/favicon.ico" },
    { title: "Docs Five9", url: "https://documentation.five9.com/", icon: "https://documentation.five9.com/favicon.ico" },
    { title: "CAT Five9",  url: "https://www.five9.com/cat",    icon: "https://www.five9.com/themes/custom/five9/favicon.ico" },
    { title: "Suporte",    url: "https://support.five9.com/",   icon: "https://support.five9.com/s/favicon.ico" }
  ];

  // Host + Shadow (isolar do CSS do ADP)
  const host = document.createElement("section");
  host.id = "five9-tiles-host";
  host.style.cssText = "isolation:isolate;position:relative;z-index:1;margin:12px;";
  (document.body || document.documentElement).prepend(host);
  let root; try { root = host.attachShadow({ mode: "open" }); } catch { root = host; }

  const style = document.createElement("style");
  style.textContent = `
    :host, * { box-sizing: border-box; }
    .wrap{font-family:Inter,Roboto,Arial,sans-serif;color:#e5e7eb;background:#0f172a;
      border:1px solid #22314f;border-radius:14px;box-shadow:0 10px 28px rgba(0,0,0,.35);
      padding:12px;max-width:1200px;margin:0 auto;}
    .hdr{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;margin-bottom:8px}
    .hdr h3{margin:0;font-size:15px;font-weight:700}
    .scale{display:flex;align-items:center;gap:8px;font-size:12px;color:#94a3b8}
    .grid{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(92px,1fr))}
    .tile{aspect-ratio:1/1;border-radius:12px;border:1px solid rgba(255,255,255,.08);
      background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
      cursor:pointer;transition:.15s;text-align:center;padding:8px;min-width:0}
    .tile:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.18)}
    .tile img{width:40px;height:40px;object-fit:contain;border-radius:8px;background:#0b1220;
      padding:6px;border:1px solid rgba(255,255,255,.06)}
    .tile span{font-size:12px;line-height:1.1;color:#cbd5e1;word-break:break-word}
    .row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
    .btn{padding:7px 11px;border-radius:10px;border:1px solid rgba(255,255,255,.1);
      background:transparent;color:#cbd5e1;cursor:pointer;font-size:12px}
    .btn:hover{border-color:rgba(255,255,255,.2)}
    .toast{position:fixed;right:16px;bottom:16px;background:#0b1220;border:1px solid rgba(255,255,255,.12);
      padding:10px 12px;border-radius:10px;opacity:0;transform:translateY(8px);transition:.18s;z-index:2147483647;
      box-shadow:0 10px 28px rgba(0,0,0,.35)}
    .toast.show{opacity:1;transform:translateY(0)}
  `;

  const wrap = document.createElement("div");
  wrap.className = "wrap";
  wrap.innerHTML = `
    <div class="hdr">
      <h3>Atalhos rápidos</h3>
      <div class="scale">
        Zoom
        <input id="tile-scale" type="range" min="75" max="120" value="90" />
      </div>
    </div>
    <div class="grid" id="tile-grid"></div>
    ${SHOW_SIMULATIONS ? `
      <div class="row">
        <button class="btn" id="sim-login">Validar login</button>
        <button class="btn" id="sim-call">Iniciar chamada</button>
        <button class="btn" id="sim-end">Encerrar</button>
      </div>` : ``}
    <div class="toast" id="toast"></div>
  `;

  root.appendChild(style);
  root.appendChild(wrap);

  const grid = wrap.querySelector("#tile-grid");
  TILES.forEach(t => {
    const el = document.createElement("div");
    el.className = "tile";
    el.title = t.title;
    el.innerHTML = `<img src="${t.icon}" alt=""><span>${t.title}</span>`;
    const img = el.querySelector("img");
    img.onerror = () => {
      const ph = document.createElement("div");
      ph.style.cssText = "width:40px;height:40px;border-radius:8px;background:#111b31;border:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;color:#9dcaff;font-weight:700";
      ph.textContent = t.title.slice(0,2).toUpperCase();
      img.replaceWith(ph);
    };
    el.addEventListener("click", () => window.open(t.url, "_blank", "noopener,noreferrer"));
    grid.appendChild(el);
  });

  const toastEl = wrap.querySelector("#toast");
  const toast = msg => { if(!toastEl) return; toastEl.textContent = msg; toastEl.classList.add("show"); setTimeout(()=>toastEl.classList.remove("show"), 1600); };

  if (SHOW_SIMULATIONS) {
    wrap.querySelector("#sim-login").onclick = () => toast("Login validado (ação demonstrativa).");
    wrap.querySelector("#sim-call").onclick  = () => toast("Chamada iniciada (ação demonstrativa).");
    wrap.querySelector("#sim-end").onclick   = () => toast("Chamada encerrada (ação demonstrativa).");
  }

  // Zoom dos tiles
  const scale = wrap.querySelector("#tile-scale");
  const applyScale = v => {
    const s = Number(v)/100;
    grid.style.setProperty("gap", (10*s) + "px");
    grid.querySelectorAll(".tile").forEach(tile => { tile.style.transform = `scale(${s})`; });
  };
  applyScale(scale.value);
  scale.addEventListener("input", () => applyScale(scale.value));
})();
