async function carregarTalhoes() {
  try {
    const resposta = await fetch('/talhoes-publico');
    const dados = await resposta.json();

    const lista = document.getElementById('lista-talhoes');
    lista.innerHTML = '';
    dados.forEach(t => {
      const li = document.createElement('li');
      li.textContent = `${t.id} - ${t.nome} (${t.cultura})`;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar talhões:", erro);
  }
}

async function carregarArquivos() {
  try {
    const resposta = await fetch('/arquivos-publico');
    const dados = await resposta.json();

    const lista = document.getElementById('lista-arquivos');
    lista.innerHTML = '';
    dados.forEach(f => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `\Dev\MeuSiteHtml\wwwroot${f.nome}`;
      link.textContent = f.nome;
      link.target = "_blank";
      li.appendChild(link);
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar arquivos:", erro);
  }
}
