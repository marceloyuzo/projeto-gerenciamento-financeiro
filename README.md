5. Aplicação de Gerenciamento Financeiro Pessoal
Backend: Desenvolva uma API onde os usuários possam registrar suas despesas e receitas, categorizá-las e visualizar relatórios de saldo mensal/anual.

Frontend: Um painel financeiro que exiba o saldo, despesas e receitas categorizadas, com gráficos simples.

Aprendizado: Manipulação de dados financeiros, geração de relatórios, autenticação e autorização.

## REGRAS DE NEGOCIO
[x] - Não é permitido e-mails duplicados;
[x] - A senha tem que ser criptografado antes de ser persistido;
[x] - O usuário deve informar todos os dados solicitados para a criação de uma operação;
[] - O usuário só pode visualizar/editar/remover as operações que ele mesmo criou;
[x] - Por padrão, existem as seguintes categorias já criadas (Moradia, Alimentação, Transporte, Saúde, Educação, Lazer, Investimento)
[] - 

## REQUISITOS FUNCIONAIS
[x] - O usuário deve ser capaz de se registrar no sistema;
[x] - O usuário deve ser capaz de se autenticar;
[x] - O usuário deve ser capaz de registrar as suas operações, informando:
    [x] - Nome da despesa/receita;
    [x] - Categoria;
    [x] - Valor;
    [x] - Tipo de operação (despesa/receita);
    [x] - Data da operação (por padrão é colocado na hora da criação);
[x] - O usuário deve ser capaz de ver o seu histórico de operaçoes;
<!-- 
[] - O usuário deve ser capaz de criar novas categorias personalizadas de acordo com sua necessidade;
[] - O usuário deve ser capaz de editar/remover categorias que ele criou; 
-->
[] - O usuário deve ser capaz de gerar relatórios de gastos mensais ou por periodo;
[x] - O usuário deve ser capaz de visualizar as suas métricas mensal/anual:
    [x] - Saldo;
    [x] - Despesas categorizadas;
    [x] - Receitas categorizadas;
[x] - O usuário deve ser capaz de editar/remover as suas operações;


## REQUISITOS NÃO FUNCIONAIS