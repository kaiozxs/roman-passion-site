import requests
from bs4 import BeautifulSoup
import psycopg2

"""
ROMAN PASSION - SCRIPT DE EXTRAÇÃO DE DADOS (WEB SCRAPING)
Objetivo: Capturar dados do mercado e salvar direto no PostgreSQL.
"""

def salvar_no_banco(produtos_lista):
    """Conecta ao PostgreSQL e insere os dados sanitizados na tabela."""
    conexao = None
    cursor = None
    try:
        # Configuração da conexão - AJUSTE COM AS SUAS CREDENCIAIS LOCAL DO POSTGRES
        conexao = psycopg2.connect(
            host="localhost",
            database="roman_passion_db",
            user="postgres",
            password="postgres",
            port="5432"
        )
        cursor = conexao.cursor()

        # Query de inserção utilizando placeholders (%s) por segurança
        query_insercao = """
            INSERT INTO precos_mercado (produto_nome, preco_concorrente)
            VALUES (%s, %s);
        """

        # Executa a inserção em lote (bulk insert) para maior performance
        cursor.executemany(query_insercao, produtos_lista)
        
        # Confirma as alterações no banco de dados
        conexao.commit()
        print(f"\n[SUCESSO]: {len(produtos_lista)} produtos salvos no Postgres!")

    except Exception as erro:
        print(f"[ERRO BANCO]: Falha ao salvar os dados no Postgres: {erro}")
        if conexao:
            conexao.rollback() # Cancela a operação em caso de falha para não corromper os dados
    finally:
        # Garante o fechamento das conexões com o banco
        if cursor: cursor.close()
        if conexao: conexao.close()


def executar_raspagem():
    url_alvo = "https://books.toscrape.com/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    try:
        resposta = requests.get(url_alvo, headers=headers)
        if resposta.status_code != 200:
            print(f"[ERRO]: Falha na requisição. Status Code: {resposta.status_code}")
            return

        soup = BeautifulSoup(resposta.text, "html.parser")
        produtos = soup.find_all("article", class_="product_pod")
        
        # Lista temporária para acumular os dados antes de enviar ao banco
        dados_para_salvar = []

        for produto in produtos:
            nome = produto.h3.a["title"]
            preco_bruto = produto.find("p", class_="price_color").text
            preco_limpo = float(preco_bruto.replace("£", "").replace("Â", "").strip())

            # Adiciona a tupla estruturada à lista
            dados_para_salvar.append((nome, preco_limpo))

        # Se houver dados coletados, dispara a função de salvamento
        if dados_para_salvar:
            salvar_no_banco(dados_para_salvar)

    except Exception as erro:
        print(f"[CRITICAL ERRO]: Falha na execução do scraper: {erro}")

if __name__ == "__main__":
    executar_raspagem()