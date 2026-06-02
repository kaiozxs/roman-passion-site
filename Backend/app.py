from flask import Flask
import psycopg2

app = Flask(__name__)

# Configurações de conexão com o banco de dados PostgreSQL
DB_HOST = "localhost"
DB_NAME = "roman_passion_db"  # Nome do banco que você criou no pgAdmin
DB_USER = "postgres"          # Usuário padrão do PostgreSQL
DB_PASS = "postgres"    # ⚠️ SUBSTITUA pela senha que você definiu no PostgreSQL

def testar_conexao():
    try:
        # Tenta conectar ao banco de dados
        conexao = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS
        )
        cursor = conexao.cursor()
        # Executa um comando simples para testar a versão do banco
        cursor.execute("SELECT version();")
        versao = cursor.fetchone()
        cursor.close()
        conexao.close()
        return f"Banco conectado com sucesso! Versão: {versao[0]}"
    except Exception as erro:
        return f"Erro ao conectar no banco de dados: {erro}"

@app.route('/')
def home():
    # Testa a conexão sempre que entrarmos na página inicial
    status_banco = testar_conexao()
    return f"<h1>Servidor da Roman Passion rodando!</h1><p>{status_banco}</p>"

if __name__ == '__main__':
    app.run(debug=True)