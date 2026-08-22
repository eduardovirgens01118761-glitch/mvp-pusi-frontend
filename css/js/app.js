let chamados = [
    { id: 101, titulo: "Instalação de software no PC", setor: "Administrativo", status: "Aberto" },
    { id: 102, titulo: "Troca de toner da impressora", setor: "Atendimento", status: "Em Andamento" },
    { id: 103, titulo: "Ajuste na rede Wi-Fi", setor: "Operação", status: "Aberto" }
];

const btnSecNovo = document.getElementById("btn-sec-novo");
const btnSecLista = document.getElementById("btn-sec-lista");
const secaoFormulario = document.getElementById("secao-formulario");
const secaoListagem = document.getElementById("secao-listagem");

const formChamado = document.getElementById("form-chamado");
const campoTitulo = document.getElementById("titulo");
const campoSetor = document.getElementById("setor");
const campoDescricao = document.getElementById("descricao");

const errTitulo = document.getElementById("err-titulo");
const errSetor = document.getElementById("err-setor");
const errDescricao = document.getElementById("err-descricao");
const feedbackSucesso = document.getElementById("feedback-sucesso");

const tabelaChamados = document.getElementById("tabela-chamados");
const campoBusca = document.getElementById("campo-busca");

btnSecNovo.addEventListener("click", () => {
    secaoFormulario.classList.remove("hidden");
    secaoListagem.classList.add("hidden");
    btnSecNovo.classList.add("active");
    btnSecLista.classList.remove("active");
});

btnSecLista.addEventListener("click", () => {
    secaoFormulario.classList.add("hidden");
    secaoListagem.classList.remove("hidden");
    btnSecLista.classList.add("active");
    btnSecNovo.classList.remove("active");
    renderizarTabela(chamados);
});

formChamado.addEventListener("submit", (e) => {
    e.preventDefault();
    errTitulo.textContent = ""; errSetor.textContent = ""; errDescricao.textContent = "";
    feedbackSucesso.classList.add("hidden");
    let valido = true;

    if (!campoTitulo.value.trim()) { errTitulo.textContent = "Por favor, informe o título do chamado."; valido = false; }
    if (!campoSetor.value) { errSetor.textContent = "Selecione o setor solicitante."; valido = false; }
    if (!campoDescricao.value.trim()) { errDescricao.textContent = "A descrição é obrigatória."; valido = false; }
    else if (campoDescricao.value.trim().length < 10) { errDescricao.textContent = "A descrição deve conter no mínimo 10 caracteres."; valido = false; }

    if (valido) {
        chamados.push({ id: chamados.length + 101, titulo: campoTitulo.value.trim(), setor: campoSetor.value, status: "Aberto" });
        formChamado.reset();
        feedbackSucesso.classList.remove("hidden");
        setTimeout(() => { feedbackSucesso.classList.add("hidden"); }, 4000);
    }
});

function renderizarTabela(lista) {
    tabelaChamados.innerHTML = "";
    if (lista.length === 0) {
        tabelaChamados.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum chamado encontrado.</td></tr>`;
        return;
    }
    lista.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>#${item.id}</td><td><strong>${item.titulo}</strong></td><td>${item.setor}</td><td><span class="badge">${item.status}</span></td>`;
        tabelaChamados.appendChild(tr);
    });
}

campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase();
    renderizarTabela(chamados.filter(c => c.titulo.toLowerCase().includes(termo) || c.setor.toLowerCase().includes(termo)));
});

renderizarTabela(chamados);
