const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'roman_passion_db',
    password: process.env.DB_PASSWORD || 'postgres', 
    port: process.env.DB_PORT || 5432,
});

// Rota de teste para ver se a API está viva
app.get('/api/status', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ 
            status: 'API Rodando!', 
            banco_conectado: true, 
            hora_banco: result.rows[0].now 
        });
    } catch (err) {
        res.status(500).json({ status: 'Erro ao conectar no banco', erro: err.message });
    }
});

// Rota oficial para buscar todos os produtos do Catálogo
app.get('/api/produtos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM produtos ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ 
            erro: 'Erro ao buscar o catálogo de produtos', 
            detalhe: err.message 
        });
    }
});

// Rota de Login do Administrador
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
        }

        const usuario = result.rows[0];

        // Lembrete: se estiver usando hashes reais futuramente (ex: bcrypt), altere esta linha
        if (senha !== usuario.senha_hash) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
        }

        if (usuario.role !== 'admin') {
            return res.status(403).json({ erro: 'Acesso negado. Você não é um administrador.' });
        }

        res.json({
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role
            }
        });

    } catch (err) {
        res.status(500).json({ erro: 'Erro interno no servidor', detalhe: err.message });
    }
});

// Rota para deletar produto do Catálogo
app.delete('/api/produtos/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const resultado = await pool.query('DELETE FROM produtos WHERE id = $1', [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ erro: 'Esse doce não foi encontrado no banco.' });
        }

        return res.status(200).json({ mensagem: 'Produto deletado com sucesso!' });

    } catch (erro) {
        console.error("Erro interno ao deletar doce:", erro);
        return res.status(500).json({ erro: 'Erro no servidor ao tentar deletar.' });
    }
});

// ROTA ATUALIZADA: BUSCAR PREÇOS DE MERCADO
app.get('/api/mercado', async (req, res) => {
    try {
        const query = `
            SELECT produto_nome, AVG(preco_concorrente)::NUMERIC(10,2) as preco_medio 
            FROM precos_mercado 
            GROUP BY produto_nome
            ORDER BY preco_medio DESC
            LIMIT 10;
        `;
        
        const resultado = await pool.query(query);
        res.status(200).json(resultado.rows);
    } catch (erro) {
        console.error("Erro ao buscar dados de mercado:", erro);
        res.status(500).json({ erro: "Erro interno no servidor ao buscar dados." });
    }
});

// ==========================================================================
// ROTA NOVA: ATUALIZAR STATUS DE PAGAMENTO DO PEDIDO (PRODUÇÃO)
// ==========================================================================
app.put('/api/pedidos/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status_pagamento } = req.body; // Espera receber: 'pago', 'metade' ou 'cancelado'

    try {
        const query = 'UPDATE pedidos SET status_pagamento = $1 WHERE id = $2';
        const resultado = await pool.query(query, [status_pagamento, id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ erro: 'Pedido não localizado para atualização.' });
        }

        res.status(200).json({ mensagem: 'Status de pagamento atualizado com sucesso!' });
    } catch (erro) {
        console.error("Erro ao atualizar status do pedido:", erro);
        res.status(500).json({ erro: 'Erro interno no servidor ao atualizar o pedido.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando forte na porta ${PORT}`);
});