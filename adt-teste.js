(function() {
  // Exemplo simples de injeção no ADT Plus
  var container = document.createElement("div");
  container.style.border = "1px solid #ccc";
  container.style.padding = "10px";
  container.style.margin = "10px";
  container.innerHTML = `
    <h3>Teste do ADT Personalizado</h3>
    <button id="btnLogin">Login</button>
    <button id="btnCall">Simular Chamada</button>
    <button id="btnEnd">Encerrar Chamada</button>
    <div id="result" style="margin-top:10px; font-family:Arial;"></div>
  `;
  document.body.prepend(container);

  document.getElementById("btnLogin").onclick = function() {
    document.getElementById("result").innerText = "Login simulado no ADT.";
  };
  document.getElementById("btnCall").onclick = function() {
    document.getElementById("result").innerText = "Chamada simulada (placeholder).";
  };
  document.getElementById("btnEnd").onclick = function() {
    document.getElementById("result").innerText = "Chamada encerrada (placeholder).";
  };
})();
