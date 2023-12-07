# BoardCamp

## Visão geral 
O BoardCamp é um Banco de Dados Relacionais de um sistema de gestão de uma locadora de jogos de tabuleiro! 

### **Deploy do Danco de Dados**
Link: https://boardcamp-api-c3v7.onrender.com

### **Principais Funcionalidades**
#### JOGOS
1. Criar jogos;
2. Mostrar a Listar de Todos os Jogos;
#### CLIENTES
3. Listar Todos os Clientes;
4. Busca o Cliente pelo o Número de Identificação (ID);
5. Cria um Novo Cliente;
16. Atualiza o Cliente;
#### ALUGUÉIS 
7. Mostrar a Lista de Todos os Alugueis, contendo Cliente e o Jogo em que estão em Cada Aluguél;
8. Criar Alguél;
9. Finalizar o Aluguél;
10. Apagar o Aluguél.

### **Tecnologias Utilizadas**
- JavaScript;
- Banco de Dados Relacionais (SQL); 
- Joi;
- Cors;
- Express;
- pq;
- Dayjs.

### **Rotas Utilizadas por Entidades**
    JOGOS
    GET `/games`
    POST `/games`

    CLIENTES
    GET `/customers`
    GET `/customers/:id`
    POST `/customers`
    PUT `/customers/:id`

    ALUGUÉIS
    GET `/rentals`
    POST `/rentals`
    POST `/rentals/:id/return`
    DELETE `/rentals/:id`

### **Formato Esperado de Cada Entidade**
    JOGOS
    
    {
     id: 1,
     name: 'Banco Imobiliário',
     image: 'http://',
     stockTotal: 3,
     pricePerDay: 1500,
    }

    CLIENTES

    {
     id: 1,
     name: 'João Alfredo',
     phone: '21998899222',
     cpf: '01234567890',
     birthday: '1992-10-25'
    }

    ALUGUÉIS

    {
     id: 1,
     customerId: 1,
     gameId: 1,
     rentDate: '2021-06-20',    
     daysRented: 3,             
     returnDate: null,          
     originalPrice: 4500,      
     delayFee: null             
    }

### **Como Executar o Projeto Localmente**
No Terminal
1. Clone o Repositório: `git clone` https://github.com/fl3via/projeto16-boardcamp 
2. Entre na pasta: `cd` projeto16-boardcamp
3. Abra no Visual Estudio Code: `code .`


No Visual Estudio Code

4. Instale as Dependências: `npm install`
5. Inicie o Servidor Sem Desenvolvimento: `npm start`
6. Execute o Projeto Em Desenvolvimento: `npm run dev`
