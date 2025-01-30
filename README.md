# Heroes

Este projeto consiste em um **sistema de gerenciamento de heróis** e faz parte da terceira etapa do processo seletivo. O backend foi desenvolvido com **Node.js** e o banco de dados MySQL é instanciado por meio do Docker. O frontend, por sua vez, foi construído com **React**. O objetivo deste projeto é permitir o cadastro e a visualização de heróis, com funcionalidades como CRUD (Create, Read, Update, Delete).

## Estrutura do Projeto

A estrutura do projeto é dividida em três componentes principais:

- **Backend**: Contém a API que manipula os dados de heróis e interage com o banco de dados MySQL.
- **Frontend**: Contém a interface do usuário que permite a interação com a API.
- **Banco de Dados**: O banco de dados MySQL, que armazena as informações sobre os heróis.

## Tecnologias Usadas

- **Backend**: Node.js, Express, Sequelize
- **Frontend**: React.js
- **Banco de Dados**: MySQL (mysql:8.0)
- **Docker**: Para orquestrar o ambiente e os containers (Docker version 27.4.0, build bde2b89)

## Como Rodar o Projeto

### Pré-requisitos

Antes de rodar o projeto, você precisa ter o seguinte instalado na sua máquina:

- **Docker**: Para criar e gerenciar os containers.
- **Docker Compose**: Para orquestrar a execução de múltiplos containers.

### Passo a Passo

Siga os passos abaixo para rodar o projeto localmente.

- 1. Clone o repositório:

```bash
	 git clone https://github.com/AlexandreNMota/heroes.git
	 cd heroes
```

- 2. Configure as variáveis de ambiente:
     Crie um arquivo `.env` na raiz do projeto. Este arquivo deve conter as variáveis de ambiente necessárias para o backend se conectar ao banco de dados. O projeto possui um arquivo **.env.example** para usar como base.

- 3. Inicie os containers com o Docker Compose:

```bash
docker-compose up
```

Este comando irá:

- Baixar as imagens do Docker.
- Criar os containers.
- Instalar as dependências do backend e frontend.
- Iniciar a API no backend e a aplicação React no frontend.
- Iniciar o serviço do banco de dados MySQL no container.
- O Sequelize vai automaticamente criar a tabela no banco de dados e rodar um **seed** de registros iniciais para popular a tabela com dados de exemplo.

#### 4. Acesse a aplicação

- **Frontend**: O frontend estará disponível em `http://localhost:5173`.
- **Backend**: A API do backend estará disponível em `http://localhost:3000`.

O banco de dados MySQL estará rodando no container e acessível pela rede do Docker, com a porta `3307` exposta na sua máquina local.
