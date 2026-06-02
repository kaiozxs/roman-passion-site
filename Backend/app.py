from flask import Flask

# Inicializa o aplicativo Flask
app = Flask(__name__)

# Cria a nossa primeira rota (a página inicial do servidor)
@app.route('/')
def home():
    return "Servidor da Roman Passion rodando com sucesso!"

# Liga o servidor se executarmos este arquivo diretamente
if __name__ == '__main__':
    app.run(debug=True)