// ==========================================================================
// ARQUIVO PRINCIPAL: DASHBOARD.JS (ROMAN PASSION)
// ==========================================================================

(() => {
    // PROTEÇÃO DE ROTA: Impede acesso direto pela URL sem autenticação anterior
    const usuarioNome = localStorage.getItem("usuarioNome");

    if (!usuarioNome) {
        window.location.replace("login.html");
        return;
    }

    // Inicialização única após o carregamento completo do DOM
    document.addEventListener("DOMContentLoaded", () => {
        const nomeAdministrador = localStorage.getItem("usuarioNome") || "Administrador";

        // Alimenta o nome tanto na Navbar quanto na página central (Home Executive)
        const elementoNomeNav = document.getElementById("nomeUsuarioLogado");
        const elementoNomeHome = document.getElementById("nomeUsuarioHome");

        if (elementoNomeNav) elementoNomeNav.textContent = nomeAdministrador;
        if (elementoNomeHome) elementoNomeHome.textContent = nomeAdministrador;

        // Ativação dos módulos e gatilhos estruturais
        inicializarMenuAbas();
        configurarCliquesHome();
        inicializarControleModal();
        inicializarControleModalClientes();
        inicializarControleModalPedidos();
        inicializarMascarasEClientes();

        // Carga inicial de dados com plano B integrado
        carregarPedidosProducao();
        carregarProdutosDoCatalogo();
        carregarHistoricoVendas();
        calcularMetricasFinanceiras();
    });
})();

// ==========================================================================
// MÓDULO: NAVEGAÇÃO ENTRE ABAS (SPA)
// ==========================================================================
function inicializarMenuAbas() {
    const botoesAba = document.querySelectorAll('.aba-link');
    const secoesConteudo = document.querySelectorAll('.conteudo-aba');

    botoesAba.forEach(botao => {
        botao.addEventListener('click', () => {
            const abaAlvo = botao.getAttribute('data-aba');

            botoesAba.forEach(b => b.classList.remove('ativa'));
            secoesConteudo.forEach(s => s.style.display = 'none');

            botao.classList.add('ativa');
            const secaoAlvo = document.getElementById(`aba-${abaAlvo}`);
            if (secaoAlvo) {
                secaoAlvo.style.display = 'block';
            }
        });
    });
}

function configurarCliquesHome() {
    const linkLogo = document.querySelector('.logo-container-link');
    const btnHome = document.getElementById('btn-lateral-home');
    if (linkLogo && btnHome) {
        linkLogo.addEventListener('click', () => btnHome.click());
    }
}

function logout() {
    localStorage.clear();
    window.location.replace("login.html");
}

// ==========================================================================
// MÓDULO: PRODUÇÃO (ENCOMENDAS ATIVAS)
// ==========================================================================
async function carregarPedidosProducao() {
    const gridProducao = document.getElementById('gridPedidosProducao');
    if (!gridProducao) return;

    try {
        const resposta = await fetch('http://localhost:3000/api/pedidos/producao');
        if (!resposta.ok) throw new Error('API Indisponível');

        const pedidos = await resposta.json();
        renderizarPedidosProducaoDOM(pedidos, true);
    } catch (erro) {
        console.log("Aviso: Backend offline. Carregando Producão do LocalStorage.");
        listarPedidosProducaoLocal();
    }
}

function listarPedidosProducaoLocal() {
    let pedidosLocais = JSON.parse(localStorage.getItem('roman_pedidos_producao'));

    if (!pedidosLocais) {
        pedidosLocais = [
            { id: 101, cliente: "Mariana Souza", data_entrega: "2026-06-25", valor_total: 85.50, status_pagamento: "Pendente", status_fabricacao: "Aguardando", itens: [{ quantidade: 12, doce_nome: "Brigadeiro Belga" }, { quantidade: 6, doce_nome: "Cone Trufado Ninho" }] },
            { id: 102, cliente: "Carlos Eduardo", data_entrega: "2026-06-28", valor_total: 140.00, status_pagamento: "Pago", status_fabricacao: "Em Preparo", itens: [{ quantidade: 30, doce_nome: "Beijinho de Coco" }] }
        ];
        localStorage.setItem('roman_pedidos_producao', JSON.stringify(pedidosLocais));
    }
    renderizarPedidosProducaoDOM(pedidosLocais, false);
}

function renderizarPedidosProducaoDOM(pedidos, viaAPI) {
    const gridProducao = document.getElementById('gridPedidosProducao');
    if (!gridProducao) return;

    const pedidosFiltrados = pedidos.filter(p => p.status_fabricacao !== 'Finalizado');

    if (pedidosFiltrados.length === 0) {
        gridProducao.innerHTML = '<p class="aviso">Nenhuma encomenda pendente na linha de produção.</p>';
        return;
    }

    gridProducao.innerHTML = '';

    pedidosFiltrados.forEach(pedido => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const dataOriginal = new Date(pedido.data_entrega);
        const dataFormatada = dataOriginal.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

        const badgePagamento = pedido.status_pagamento === 'Pago' ? 'badge-pago' : 'badge-pendente';

        let selectFabricacao = `
    <div class="status-badge-container">
        <select class="status-select-clean" onchange="window.alterarFluxoFabricacao(${pedido.id}, this.value, ${viaAPI})">
            <option value="Aguardando" ${pedido.status_fabricacao === 'Aguardando' ? 'selected' : ''}>⏳ Aguardando</option>
            <option value="Em Preparo" ${pedido.status_fabricacao === 'Em Preparo' ? 'selected' : ''}>👨‍🍳 Em Preparo</option>
            <option value="Finalizado">✨ Finalizar Encomenda</option>
        </select>
    </div>
`;

        let itensHTML = '';
        if (pedido.itens && pedido.itens.length > 0) {
            pedido.itens.forEach(item => {
                itensHTML += `• ${item.quantidade}x ${item.doce_nome || 'Doce'}<br>`;
            });
        }

        card.innerHTML = `
            <div class="product-info" style="width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3 style="margin: 0; font-size: 16px;">📦 Pedido #${pedido.id}</h3>
                    <span class="badge-financeiro ${badgePagamento}">${pedido.status_pagamento}</span>
                </div>
                <p class="desc" style="margin: 8px 0; font-weight: 500; color: #fff;">👤 ${pedido.cliente_nome || pedido.cliente}</p>
                <p class="desc" style="font-size: 12px; margin-bottom: 12px; line-height: 1.4;">${itensHTML}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px; margin-top: 5px;">
                    <span class="desc" style="font-size: 12px;">📅 Entrega: <strong>${dataFormatada}</strong></span>
                    ${selectFabricacao}
                </div>
            </div>
        `;
        gridProducao.appendChild(card);
    });
}

window.alterarFluxoFabricacao = async function (idPedido, novoStatus, viaAPI) {
    if (novoStatus === 'Finalizado') {
        const confirmar = confirm("Deseja marcar esta encomenda como Finalizada? Ela sairá da produção e irá para o histórico de vendas.");
        if (!confirmar) {
            carregarPedidosProducao();
            return;
        }
    }

    if (viaAPI) {
        try {
            const resposta = await fetch(`http://localhost:3000/api/pedidos/${idPedido}/fabricacao`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status_fabricacao: novoStatus })
            });
            if (!resposta.ok) throw new Error('Falha ao atualizar status na API');
            carregarPedidosProducao();
            carregarHistoricoVendas();
            calcularMetricasFinanceiras();
        } catch (erro) {
            alert("Erro ao salvar alteração. O servidor pode estar indisponível.");
        }
    } else {
        let pedidosLocais = JSON.parse(localStorage.getItem('roman_pedidos_producao')) || [];
        const indice = pedidosLocais.findIndex(p => p.id === idPedido);

        if (indice !== -1) {
            if (novoStatus === 'Finalizado') {
                let historico = JSON.parse(localStorage.getItem('roman_historico_vendas')) || [];
                let pedidoConcluido = pedidosLocais[indice];

                pedidoConcluido.status_fabricacao = 'Finalizado';
                pedidoConcluido.data_finalizacao = new Date().toISOString();

                historico.push(pedidoConcluido);
                localStorage.setItem('roman_historico_vendas', JSON.stringify(historico));

                pedidosLocais.splice(indice, 1);
            } else {
                pedidosLocais[indice].status_fabricacao = novoStatus;
            }

            localStorage.setItem('roman_pedidos_producao', JSON.stringify(pedidosLocais));
            listarPedidosProducaoLocal();
            carregarHistoricoVendas();
            calcularMetricasFinanceiras();
        }
    }
};

// ==========================================================================
// MÓDULO: HISTÓRICO DE VENDAS (REGISTROS CONCLUÍDOS)
// ==========================================================================
async function carregarHistoricoVendas() {
    const conteinerHistorico = document.getElementById('listaHistoricoVendas');
    if (!conteinerHistorico) return;

    conteinerHistorico.className = "product-grid";

    try {
        const resposta = await fetch('http://localhost:3000/api/historico');
        if (!resposta.ok) throw new Error('Erro ao buscar histórico da API.');

        const vendas = await resposta.json();
        renderizarHistoricoDOM(vendas);
    } catch (erro) {
        console.log("Aviso: Backend offline. Carregando Histórico do LocalStorage.");
        const vendasLocais = JSON.parse(localStorage.getItem('roman_historico_vendas')) || [];
        renderizarHistoricoDOM(vendasLocais);
    }
}

function renderizarHistoricoDOM(vendas) {
    const conteinerHistorico = document.getElementById('listaHistoricoVendas');
    if (!conteinerHistorico) return;

    if (vendas.length === 0) {
        conteinerHistorico.innerHTML = '<p class="aviso">Nenhum pedido finalizado no histórico ainda.</p>';
        return;
    }

    conteinerHistorico.innerHTML = '';

    vendas.forEach(venda => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.borderLeft = '3px solid #28a745';

        const dataConclusao = venda.data_finalizacao ? new Date(venda.data_finalizacao) : new Date(venda.data_entrega);
        const dataFormatada = dataConclusao.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });

        const totalFormatado = Number(venda.valor_total).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        let listaDocesHTML = '';
        if (venda.itens && venda.itens.length > 0) {
            venda.itens.forEach(item => {
                listaDocesHTML += `• ${item.quantidade}x ${item.doce_nome || 'Doce'}<br>`;
            });
        } else {
            listaDocesHTML = 'Itens não especificados.';
        }

        card.innerHTML = `
            <div class="product-info" style="width: 100%;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <h3 style="margin: 0;">👤 ${venda.cliente_nome || venda.cliente}</h3>
                    <span class="desc" style="font-size: 11px;">📅 Concluído em: ${dataFormatada}</span>
                </div>
                <p class="desc" style="margin-bottom: 8px; line-height: 1.4;">
                    ${listaDocesHTML}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px;">
                    <span class="price" style="margin: 0; font-size: 16px;">${totalFormatado}</span>
                    <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #28a745; font-weight: bold;">✨ Registro Confirmado</span>
                </div>
            </div>
        `;
        conteinerHistorico.appendChild(card);
    });
}

// ==========================================================================
// MÓDULO: FATURAMENTO E FINANÇAS
// ==========================================================================
async function calcularMetricasFinanceiras() {
    let vendas = [];

    try {
        const resposta = await fetch('http://localhost:3000/api/historico');
        if (resposta.ok) {
            vendas = await resposta.json();
        } else {
            throw new Error();
        }
    } catch (erro) {
        vendas = JSON.parse(localStorage.getItem('roman_historico_vendas')) || [];
    }

    const elFaturamento = document.getElementById('financeiroFaturamentoTotal');
    const elTotalPedidos = document.getElementById('financeiroTotalPedidos');
    const elTicketMedio = document.getElementById('financeiroTicketMedio');
    const elTextoResumo = document.getElementById('financeiroTextoResumo');

    if (!elFaturamento) return;

    if (vendas.length === 0) {
        elFaturamento.textContent = "R$ 0,00";
        elTotalPedidos.textContent = "0";
        elTicketMedio.textContent = "R$ 0,00";
        elTextoResumo.textContent = "Nenhum histórico de faturamento registrado até o momento.";
        return;
    }

    let faturamentoTotal = 0;
    let totalPago = 0;
    let totalPendente = 0;

    vendas.forEach(venda => {
        const valor = parseFloat(venda.valor_total) || 0;
        faturamentoTotal += valor;

        if (venda.status_pagamento === 'Pago') {
            totalPago += valor;
        } else {
            totalPendente += valor;
        }
    });

    const totalPedidos = vendas.length;
    const ticketMedio = faturamentoTotal / totalPedidos;

    elFaturamento.textContent = faturamentoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    elTotalPedidos.textContent = totalPedidos;
    elTicketMedio.textContent = ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    elTextoResumo.innerHTML = `
        Do faturamento acumulado de <strong>${elFaturamento.textContent}</strong>:<br>
        ✅ Recebido (Pago): <span style="color:#28a745; font-weight:bold;">${totalPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span><br>
        ⚠️ Em aberto (Pendente): <span style="color:#ffc107; font-weight:bold;">${totalPendente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
    `;
}

// ==========================================================================
// MÓDULO: CATÁLOGO DE PRODUTOS
// ==========================================================================
function inicializarControleModal() {
    const modal = document.getElementById("modalDoce");
    const btnAbrir = document.getElementById("btnAbrirModal");
    const btnFechar = document.getElementById("btnFecharModal");
    const form = document.getElementById("formCadastroDoce");

    if (btnAbrir && modal && btnFechar) {
        btnAbrir.onclick = () => modal.style.display = "flex";
        btnFechar.onclick = () => { modal.style.display = "none"; form.reset(); };
        window.onclick = (e) => { if (e.target == modal) { modal.style.display = "none"; form.reset(); } };
    }

    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const doce = {
                nome: document.getElementById("nomeDoce").value,
                descricao: document.getElementById("descricaoDoce").value,
                preco: parseFloat(document.getElementById("precoDoce").value)
            };

            try {
                const r = await fetch("http://localhost:3000/api/doces", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(doce)
                });
                if (!r.ok) throw new Error();
                alert("Doce cadastrado com sucesso!");

                form.reset();
                modal.style.display = "none"; // Fecha o modal após o sucesso
                carregarProdutosDoCatalogo();
            } catch {
                let docesLocais = JSON.parse(localStorage.getItem("roman_produtos_catalogo")) || [];
                docesLocais.push({ id: Date.now(), ...doce });
                localStorage.setItem("roman_produtos_catalogo", JSON.stringify(docesLocais));
                alert("Salvo localmente (Offline).");

                form.reset();
                modal.style.display = "none"; // Fecha o modal após salvar offline
                carregarProdutosDoCatalogo();
            }
        };
    }
}

async function carregarProdutosDoCatalogo() {
    const lista = document.getElementById("listaProdutos");
    if (!lista) return;

    try {
        const r = await fetch("http://localhost:3000/api/doces");
        if (!r.ok) throw new Error();
        renderizarCatalogoDOM(await r.json());
    } catch {
        renderizarCatalogoDOM(JSON.parse(localStorage.getItem("roman_produtos_catalogo")) || []);
    }
}

// ==========================================================================
// MÓDULO: CLIENTES
// ==========================================================================
// Variável global de controle para saber se é Edição ou Cadastro Novo
let idClienteEmEdicao = null;

function inicializarControleModalClientes() {
    const modal = document.getElementById("modalCliente");
    const btnAbrir = document.getElementById("btnAbrirModalCliente");
    const btnFechar = document.getElementById("btnFecharModalCliente");
    const form = document.getElementById("formCadastroCliente");
    const btnSalvar = form ? form.querySelector("button[type='submit']") : null;

    if (btnAbrir && modal && btnFechar) {
        btnAbrir.onclick = () => {
            idClienteEmEdicao = null; // Garante que é novo cadastro
            if (btnSalvar) btnSalvar.textContent = "SALVAR CLIENTE";
            modal.style.display = "flex";
        };
        btnFechar.onclick = () => { modal.style.display = "none"; form.reset(); idClienteEmEdicao = null; };
    }

    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const cliente = {
                nome: document.getElementById("nomeCliente").value,
                documento: document.getElementById("documentoCliente").value,
                email: document.getElementById("emailCliente").value,
                telefone: document.getElementById("telefoneCliente").value,
                cep: document.getElementById("cepCliente").value,
                logradouro: document.getElementById("logradouroCliente").value,
                numero: document.getElementById("numeroCliente").value,
                complemento: document.getElementById("complementoCliente").value,
                bairro: document.getElementById("bairroCliente").value,
                cidade: document.getElementById("cidadeCliente").value,
                estado: document.getElementById("estadoCliente").value,
            };

            // Define dinamicamente se vai pra rota de POST (novo) ou PUT (editar)
            const url = idClienteEmEdicao
                ? `http://localhost:3000/api/clientes/${idClienteEmEdicao}`
                : "http://localhost:3000/api/clientes";
            const metodo = idClienteEmEdicao ? "PUT" : "POST";

            try {
                const r = await fetch(url, {
                    method: metodo,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cliente)
                });
                if (!r.ok) throw new Error();
                alert(idClienteEmEdicao ? "Cliente atualizado com sucesso!" : "Cliente salvo com sucesso!");

                form.reset();
                modal.style.display = "none";
                idClienteEmEdicao = null;
                carregarClientes();
            } catch {
                // Modo Offline (LocalStorage)
                let clientesLocais = JSON.parse(localStorage.getItem("roman_clientes")) || [];

                if (idClienteEmEdicao) {
                    // Se for edição local, substitui o antigo pelo atualizado
                    const index = clientesLocais.findIndex(c => c.id == idClienteEmEdicao);
                    if (index !== -1) clientesLocais[index] = { id: idClienteEmEdicao, ...cliente };
                } else {
                    // Se for novo, gera um id por timestamp
                    clientesLocais.push({ id: Date.now(), ...cliente });
                }

                localStorage.setItem("roman_clientes", JSON.stringify(clientesLocais));
                alert(idClienteEmEdicao ? "Alterações salvas localmente (Offline)." : "Cliente salvo localmente (Offline).");

                form.reset();
                modal.style.display = "none";
                idClienteEmEdicao = null;
                carregarClientes();
            }
        };
    }
}

// FUNÇÃO FLUTUANTE: Preenche os inputs do formulário original e abre o modal de edição
window.prepararEdicaoCliente = function (cliente) {
    idClienteEmEdicao = cliente.id; // Guarda o ID para o onSubmit saber que é edição

    // Preenche cada campo do seu formulário com os dados atuais do cliente
    document.getElementById("nomeCliente").value = cliente.nome || "";
    document.getElementById("documentoCliente").value = cliente.documento || "";
    document.getElementById("emailCliente").value = cliente.email || "";
    document.getElementById("telefoneCliente").value = cliente.telefone || "";
    document.getElementById("cepCliente").value = cliente.cep || "";
    document.getElementById("logradouroCliente").value = cliente.logradouro || "";
    document.getElementById("numeroCliente").value = cliente.numero || "";
    document.getElementById("complementoCliente").value = cliente.complemento || "";
    document.getElementById("bairroCliente").value = cliente.bairro || "";
    document.getElementById("cidadeCliente").value = cliente.cidade || "";
    document.getElementById("estadoCliente").value = cliente.estado || "";

    // Muda o texto do botão do formulário para o usuário saber que está editando
    const form = document.getElementById("formCadastroCliente");
    if (form) {
        const btnSalvar = form.querySelector("button[type='submit']");
        if (btnSalvar) btnSalvar.textContent = "ATUALIZAR CADASTRO";
    }

    // Abre o modal na tela
    const modal = document.getElementById("modalCliente");
    if (modal) modal.style.display = "flex";
};

// CONTROLE INTERATIVO: Abre e fecha o dropdown dos 3 pontinhos de forma isolada
window.toggleMenuCliente = function (event, idCliente) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }

    // Fecha qualquer outro menu aberto para não encavalar
    document.querySelectorAll('.dropdown-menu-cliente').forEach(menu => {
        if (menu.id !== `dropdown-${idCliente}`) {
            menu.style.display = 'none';
        }
    });

    const dropdown = document.getElementById(`dropdown-${idCliente}`);
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
};

// EXCLUSÃO DE CLIENTE: Remove o registro via API ou LocalStorage
window.excluirCliente = async function (idCliente) {
    const confirmar = confirm("Tem certeza que deseja excluir permanentemente este cliente?");
    if (!confirmar) return;

    try {
        const r = await fetch(`http://localhost:3000/api/clientes/${idCliente}`, {
            method: "DELETE"
        });
        if (!r.ok) throw new Error();
        alert("Cliente excluído com sucesso!");
        carregarClientes();
    } catch {
        // Fallback para o modo Offline / LocalStorage
        let clientesLocais = JSON.parse(localStorage.getItem("roman_clientes")) || [];
        clientesLocais = clientesLocais.filter(c => c.id != idCliente);
        localStorage.setItem("roman_clientes", JSON.stringify(clientesLocais));

        alert("Cliente removido localmente (Offline).");
        carregarClientes();
    }
};

// FECHAMENTO AUTOMÁTICO: Fecha o menu se clicar em qualquer outra área do dashboard
document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown-menu-cliente')) {
        document.querySelectorAll('.dropdown-menu-cliente').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

function renderizarCatalogoDOM(doces) {
    const lista = document.getElementById("listaProdutos");
    if (!lista) return;
    if (doces.length === 0) { lista.innerHTML = "<p>Nenhum doce cadastrado.</p>"; return; }
    lista.innerHTML = "";
    doces.forEach(d => {
        lista.innerHTML += `
            <div class="product-card">
                <div class="product-info">
                    <h3>🍫 ${d.nome}</h3>
                    <p class="desc">${d.descricao || 'Sem descrição.'}</p>
                    <span class="price">R$ ${parseFloat(d.preco).toFixed(2)}</span>
                </div>
            </div>`;
    });
}

function inicializarMascarasEClientes() {
    const cepInput = document.getElementById("cepCliente");
    const msgErroCliente = document.getElementById("mensagemCadastroCliente");

    if (cepInput) {
        cepInput.addEventListener("blur", async () => {
            const cep = cepInput.value.replace(/\D/g, "");

            if (cep.length === 0) return;

            if (cep.length !== 8) {
                if (msgErroCliente) msgErroCliente.innerHTML = "<p style='color:red;'>Erro: CEP deve conter 8 dígitos.</p>";
                alert("CEP inválido! Digite apenas os 8 números.");
                return;
            }

            try {
                const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const d = await r.json();

                if (d.erro) {
                    if (msgErroCliente) msgErroCliente.innerHTML = "<p style='color:red;'>CEP não encontrado.</p>";
                    alert("CEP não encontrado! Verifique o número digitado.");
                    return;
                }

                document.getElementById("logradouroCliente").value = d.logradouro || "";
                document.getElementById("bairroCliente").value = d.bairro || "";
                document.getElementById("cidadeCliente").value = d.localidade || "";
                document.getElementById("estadoCliente").value = d.uf || "";
                if (msgErroCliente) msgErroCliente.innerHTML = "";

            } catch (err) {
                console.log("Erro auto-complete CEP", err);
                if (msgErroCliente) msgErroCliente.innerHTML = "<p style='color:orange;'>Não foi possível autocompletar o CEP. Digite manualmente.</p>";
            }
        });
    }
    carregarClientes();
}

async function carregarClientes() {
    const lista = document.getElementById("listaClientes");
    if (!lista) return;

    try {
        const r = await fetch("http://localhost:3000/api/clientes");
        if (!r.ok) throw new Error();
        renderizarClientesDOM(await r.json());
    } catch {
        renderizarClientesDOM(JSON.parse(localStorage.getItem("roman_clientes")) || []);
    }
}

function renderizarClientesDOM(clientes) {
    const lista = document.getElementById("listaClientes");
    if (!lista) return;
    if (clientes.length === 0) { lista.innerHTML = "<p>Nenhum cliente cadastrado.</p>"; return; }
    lista.innerHTML = "";

    clientes.forEach(c => {
        const idCliente = c.id;

        lista.innerHTML += `
            <div class="product-card" style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 20px; min-height: 200px; text-align: left; box-sizing: border-box;">
                
                <!-- CABEÇALHO DO CARD: Alinha o Nome e os 3 Pontinhos perfeitamente -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; margin-bottom: 12px; position: relative;">
                    
                    <h3 style="margin: 0; font-size: 17px; padding-right: 10px; font-weight: 600; line-height: 1.3;">👥 ${c.nome}</h3>
                    
                    <!-- CONTAINER DO MENU (RELAÇÃO LOCAL COM O CARD) -->
                    <div style="position: relative; flex-shrink: 0;">
                        <button onclick="window.toggleMenuCliente(event, ${idCliente})" 
                                style="background: #2a2a2a !important; color: #ffffff !important; border: 1px solid rgba(255,255,255,0.15) !important; width: 34px !important; height: 34px !important; border-radius: 50% !important; font-size: 20px !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; opacity: 1 !important; box-shadow: none !important; padding: 0 !important; line-height: 1 !important;"
                                onmouseover="this.style.setProperty('background', '#3a3a3a', 'important'); this.style.setProperty('color', '#c5a880', 'important')" 
                                onmouseout="this.style.setProperty('background', '#2a2a2a', 'important'); this.style.setProperty('color', '#ffffff', 'important')">
                            ⋮
                        </button>
                        
                        <!-- Menu Dropdown (Flutua exatamente abaixo do botão clicado) -->
                        <div id="dropdown-${idCliente}" class="dropdown-menu-cliente" 
                             style="display: none; position: absolute; right: 0; top: 38px; background: #1e1e1e; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; box-shadow: 0 6px 16px rgba(0,0,0,0.6); z-index: 1000; width: 140px; overflow: hidden;">
                            
                            <button onclick="event.stopPropagation(); window.prepararEdicaoCliente(${JSON.stringify(c).replace(/"/g, '&quot;')})" 
                                    style="width: 100%; background: none; border: none; color: #fff; text-align: left; padding: 12px; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background 0.2s;"
                                    onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='none'">
                                ✏️ Editar
                            </button>
                            
                            <button onclick="event.stopPropagation(); window.excluirCliente(${idCliente})" 
                                    style="width: 100%; background: none; border: none; color: #dc3545; text-align: left; padding: 12px; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; border-top: 1px solid rgba(255,255,255,0.08); transition: background 0.2s;"
                                    onmouseover="this.style.background='rgba(220,53,69,0.15)'" onmouseout="this.style.background='none'">
                                🗑️ Excluir
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Corpo de Informações do Cliente -->
                <div class="product-info" style="width: 100%;">
                    <p class="desc" style="margin: 6px 0; font-size: 13px; color: #ccc;">📄 Doc: ${c.documento}</p>
                    <p class="desc" style="margin: 6px 0; font-size: 13px; color: #ccc;">📞 Tel: ${c.telefone || 'Não informado'}</p>
                    <span class="price" style="font-size: 12px; color: #888; display: block; margin-top: 15px;">📍 ${c.cidade} - ${c.estado}</span>
                </div>
            </div>`;
    });
}

// ==========================================================================
// MÓDULO: LANÇAMENTO DE PEDIDOS (VENDA DIRETA)
// ==========================================================================
let itensPedidoAtual = [];
let docesDisponiveisCache = [];

function inicializarControleModalPedidos() {
    const btnAbrir = document.getElementById("btnAbrirModalPedido");
    const modal = document.getElementById("modalPedido");
    const btnFechar = document.getElementById("btnFecharModalPedido");
    const form = document.getElementById("formCadastroPedido");

    if (btnAbrir && modal) {
        btnAbrir.addEventListener("click", () => {
            modal.style.display = "flex";
            itensPedidoAtual = [];
            atualizarResumoItensTemporarios();
            configurarModalPedido(); // Popula os selects de cliente e doce
        });
    }

    if (btnFechar) {
        btnFechar.addEventListener("click", () => {
            modal.style.display = "none";
            if (form) form.reset();
        });
    }

    // Fecha ao clicar fora
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            if (form) form.reset();
        }
    });

    // Lógica do botão de adicionar doce à lista do pedido
    const btnAdd = document.getElementById("btnAdicionarDocePedido");
    if (btnAdd) {
        btnAdd.onclick = (e) => {
            e.preventDefault();
            const selectDoce = document.getElementById("pedidoSelectDoce");
            const qtdInput = document.getElementById("pedidoQtdDoce");

            if (!selectDoce || !qtdInput || !selectDoce.value || qtdInput.value <= 0) {
                alert("Por favor, selecione um doce válido e insira a quantidade.");
                return;
            }

            const option = selectDoce.options[selectDoce.selectedIndex];
            const doceNome = option.text.split(' - ')[0];
            const precoUnitario = parseFloat(option.getAttribute("data-preco"));
            const quantidade = parseInt(qtdInput.value);

            // Verifica se o item já existe na lista
            const itemExistente = itensPedidoAtual.find(i => i.id == selectDoce.value);
            if (itemExistente) {
                itemExistente.quantidade += quantidade;
            } else {
                itensPedidoAtual.push({
                    id: selectDoce.value,
                    nome: doceNome,
                    quantidade: quantidade,
                    preco: precoUnitario
                });
            }

            atualizarResumoItensTemporarios();
            qtdInput.value = 1; // Reseta o campo de quantidade
        };
    }

    // Lógica de salvar o pedido completo
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();

            // 1. Verifica se tem doces no carrinho
            if (itensPedidoAtual.length === 0) {
                alert("⚠️ Adicione pelo menos um doce ao seu pedido antes de salvar.");
                return;
            }

            // 2. Pega os dados do formulário
            const clienteId = document.getElementById("pedidoSelectCliente").value;
            // Verifica se o cliente foi selecionado
            if (!clienteId) {
                alert("⚠️ Selecione um cliente!");
                return;
            }

            // 3. Calcula o valor total do pedido
            let valorCalculado = 0;
            itensPedidoAtual.forEach(item => {
                valorCalculado += (item.quantidade * item.preco);
            });

            // Gera um número único para o pedido (Ex: PED-5982)
            const numeroGerado = "PED-" + Math.floor(1000 + Math.random() * 9000);

            // Monta o pacote (objeto) do pedido para salvar
            const novoPedido = {
                numero_pedido: numeroGerado, // <--- Aqui está o número do pedido!
                cliente: document.getElementById("pedidoSelectCliente").value, // Pega o que foi digitado na busca
                data_entrega: document.getElementById("pedidoDataEntrega").value,
                valor_total: valorCalculado,
                status_pagamento: document.getElementById("pedidoStatusPagamento").value,
                status_fabricacao: "Aguardando",
                itens: itensPedidoAtual
            };

            // 5. Salva o pedido (Tenta na API, se falhar vai pro modo Offline)
            try {
                const r = await fetch("http://localhost:3000/api/pedidos/producao", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(novoPedido)
                });
                if (!r.ok) throw new Error();
                alert("✅ Pedido enviado para a Produção!");
            } catch {
                // Modo Offline: Salva no LocalStorage
                let pedidosLocais = JSON.parse(localStorage.getItem("roman_pedidos_producao")) || [];
                novoPedido.id = Date.now(); // Cria um ID numérico único
                pedidosLocais.push(novoPedido);
                localStorage.setItem("roman_pedidos_producao", JSON.stringify(pedidosLocais));

                alert("✅ Pedido salvo localmente na Produção (Offline).");
            }

            // 6. Limpa tudo e fecha a telinha
            form.reset();
            itensPedidoAtual = [];
            modal.style.display = "none";

            // 7. Mágica: Atualiza a tela de produção para o pedido novo aparecer!
            if (typeof carregarPedidosProducao === "function") {
                carregarPedidosProducao();
            }
        };
    }
} // <--- ESSA ERA A CHAVE QUE ESTAVA FALTANDO!

// ALIMENTA A BARRA DE BUSCA E OS DOCES NO MODAL
function configurarModalPedido() {
    const datalistCliente = document.getElementById("listaBuscaClientes");
    const selectDoce = document.getElementById("pedidoSelectDoce");

    // 1. Carrega Clientes na Barra de Busca
    if (datalistCliente) {
        const clientes = JSON.parse(localStorage.getItem("roman_clientes")) || [];
        datalistCliente.innerHTML = ''; // Limpa a lista antes de preencher
        clientes.forEach(c => {
            // Mostra o nome e o telefone (se tiver) para ajudar na busca!
            datalistCliente.innerHTML += `<option value="${c.nome} - ${c.telefone || ''}"></option>`;
        });
    }

    // 2. Carrega Produtos/Doces
    if (selectDoce) {
        const produtos = JSON.parse(localStorage.getItem("roman_produtos_catalogo")) || [];
        docesDisponiveisCache = produtos;
        selectDoce.innerHTML = '<option value="">Selecione um doce...</option>';
        produtos.forEach(p => {
            selectDoce.innerHTML += `<option value="${p.id}" data-preco="${p.preco}">${p.nome} - R$ ${parseFloat(p.preco).toFixed(2)}</option>`;
        });
    }
}

// ATUALIZA A LISTA VISUAL DENTRO DO MODAL
function atualizarResumoItensTemporarios() {
    const listaUI = document.getElementById("listaItensTemporarios") || document.getElementById("listaResumoItensPedido");
    const totalTxt = document.getElementById("pedidoValorTotalTxt");

    if (!listaUI) return;

    if (itensPedidoAtual.length === 0) {
        listaUI.innerHTML = "<p style='font-size: 12px; color: #888;'>Nenhum doce adicionado ao pedido ainda.</p>";
        if (totalTxt) totalTxt.innerText = "R$ 0,00";
        return;
    }

    listaUI.innerHTML = "";
    let totalGeral = 0;

    itensPedidoAtual.forEach((item) => {
        const subtotal = item.quantidade * item.preco;
        totalGeral += subtotal;
        listaUI.innerHTML += `
            <div style="display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <span>${item.quantidade}x ${item.nome}</span>
                <span>R$ ${subtotal.toFixed(2)}</span>
            </div>
        `;
    });

    if (totalTxt) {
        totalTxt.innerText = `R$ ${totalGeral.toFixed(2)}`;
    } else {
        // Fallback caso não tenha o campo de texto do total separado
        listaUI.innerHTML += `<div style="margin-top: 10px; font-weight: bold; border-top: 1px solid #444; padding-top: 5px;">Total: R$ ${totalGeral.toFixed(2)}</div>`;
    }
}

// Função para excluir do catálogo
function excluirDoce(id) {
    let produtos = JSON.parse(localStorage.getItem("roman_produtos_catalogo")) || [];
    produtos = produtos.filter(p => p.id !== id); // Remove o item
    localStorage.setItem("roman_produtos_catalogo", JSON.stringify(produtos));
    configurarModalPedido(); // Recarrega os selects
}

// Na hora de carregar os clientes
datalist.innerHTML = clientes.map(c => 
    `<option value="${c.cpf_cnpj}">${c.nome} - ${c.cpf_cnpj}</option>`
).join(''); 

let ultimoNum = parseInt(localStorage.getItem("proximo_pedido_id")) || 1;
const numeroPedido = `PED-${String(ultimoNum).padStart(4, '0')}`; // Gera PED-0001

// Após salvar o pedido:
localStorage.setItem("proximo_pedido_id", ultimoNum + 1);