(function () {
  if (document.getElementById("five9-tiles-panel")) return;

  const css = `
    #five9-tiles-panel{
      font-family: Inter, Arial, sans-serif;
      color:#e5e7eb; background:#0f172a; border:1px solid #22314f;
      border-radius:14px; margin:14px; padding:14px;
      box-shadow:0 10px 28px rgba(0,0,0,.35)
    }
    .hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
    .hdr h3{margin:0;font-size:16px;font-weight:700}
    .scale{display:flex;align-items:center;gap:8px;font-size:12px;color:#94a3b8}
    .grid{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(90px,1fr))}
    .tile{
      aspect-ratio:1/1; border-radius:12px;
      border:1px solid rgba(255,255,255,.08);
      background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
      cursor:pointer; transition:.15s; text-align:center; padding:8px
    }
    .tile:hover{transform:translateY(-2px); border-color:rgba(255,255,255,.18)}
    .tile img{
      width:40px; height:40px; object-fit:contain;
      border-radius:8px; background:#0b1220; padding:6px
    }
    .tile span{font-size:12px; line-height:1.1; color:#cbd5e1}
    .row{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
    .btn{padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.1);
      background:transparent;color:#cbd5e1;cursor:pointer}
    .btn:hover{border-color:rgba(255,255,255,.2)}
    .toast{position:fixed;right:16px;bottom:16px;background:#0b1220;
      border:1px solid rgba(255,255,255,.12); padding:10px 12px;border-radius:10px;
      opacity:0;transform:translateY(8px);transition:.18s;z-index:999999}
    .toast.show{opacity:1;transform:translateY(0)}
  `;

  const tiles = [
    { title: "Google",     url: "https://www.google.com/",      icon: "https://www.google.com/favicon.ico" },
    { title: "MakeOne",    url: "https://makeone.com.br/",      icon: "https://makeone.com.br/favicon.ico" },
    { title: "Docs Five9", url: "https://documentation.five9.com/", icon: "https://documentation.five9.com/favicon.ico" },
    { title: "CAT Five9",  url: "https://www.five9.com/cat",    icon: "https://www.five9.com/themes/custom/five9/favicon.ico" },
    { title: "Suporte",    url: "https://support.five9.com/",   icon: "https://support.five9.com/s/favicon.ico" },
  ];

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const wrap = document.createElement("section");
  wrap.id = "five9-tiles-panel";
  wrap.innerHTML = `
    <div class="hdr">
      <h3>Atalhos rápidos – ADT+</h3>
      <div class="scale">
        Zoom
        <input id="tile-scale" type="range" min="70" max="120" value="90">
      </div>
    </div>
    <div class="grid" id="tile-grid"></div>
    <div class="row">
      <button class="btn" id="sim-login">Simular login</button>
      <button class="btn" id="sim-call">Simular chamada</button>
      <button class="btn" id="sim-end">Encerrar</button>
    </div>
    <div class="toast" id="toast"></div>
  `;
  (document.body || document.documentElement).prepend(wrap);

  const grid = wrap.querySelector("#tile-grid");
  tiles.forEach(t => {
    const el = document.createElement("div");
    el.className = "tile";
    el.innerHTML = `
      <img src="${t.icon}" alt="">
      <span>${t.title}</span>
    `;
    el.addEventListener("click", ()=> window.open(t.url,"_blank","noopener,noreferrer"));
    grid.appendChild(el);
  });

  const toast = (msg)=>{
    const el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("show");
    setTimeout(()=> el.classList.remove("show"), 1800);
  };

  // Simulações
  document.getElementById("sim-login").onclick = ()=> toast("Login validado (simulação)");
  document.getElementById("sim-call").onclick  = ()=> toast("Chamada iniciada (placeholder)");
  document.getElementById("sim-end").onclick   = ()=> toast("Chamada encerrada");

  // Slider de zoom
  const scale = document.getElementById("tile-scale");
  const applyScale = v => {
    grid.style.setProperty("gap", (v/100)*10 + "px");
    grid.querySelectorAll(".tile").forEach(tile=>{
      tile.style.transform = `scale(${v/100})`;
    });
  };
  applyScale(scale.value);
  scale.addEventListener("input", ()=> applyScale(scale.value));
})();
