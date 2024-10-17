5. Aplicação de Gerenciamento Financeiro Pessoal
Backend: Desenvolva uma API onde os usuários possam registrar suas despesas e receitas, categorizá-las e visualizar relatórios de saldo mensal/anual.

Frontend: Um painel financeiro que exiba o saldo, despesas e receitas categorizadas, com gráficos simples.

Aprendizado: Manipulação de dados financeiros, geração de relatórios, autenticação e autorização.

## REGRAS DE NEGOCIO
[] - Não é permitido e-mails duplicados;
[] - A senha tem que ser criptografado antes de ser persistido;
[] - O usuário deve informar todos os dados solicitados para a criação de uma operação;
[] - O usuário só pode visualizar/editar/remover as operações que ele mesmo criou;
[] - O usuário só pode visualizar/editar/remover as categorias que ele mesmo criou;
[] - Por padrão, existem as seguintes categorias já criadas (Moradia, Alimentação, Transporte, Saúde, Educação, Lazer, Investimento)
[] - 

## REQUISITOS FUNCIONAIS
[] - O usuário deve ser capaz de se registrar no sistema;
[] - O usuário deve ser capaz de se autenticar;
[] - O usuário deve ser capaz de registrar as suas operações, informando:
    [] - Nome da despesa/receita;
    [] - Categoria;
    [] - Valor;
    [] - Tipo de operação (despesa/receita);
    [] - Data da operação (por padrão é colocado na hora da criação);
[] - O usuário deve ser capaz de criar novas categorias personalizadas de acordo com sua necessidade;
[] - O usuário deve ser capaz de editar/remover categorias que ele criou;
[] - O usuário deve ser capaz de gerar relatórios de saldo mensal/anual;
[] - O usuário deve ser capaz de visualizar as suas métricas:
    [] - Saldo;
    [] - Despesas categorizadas;
    [] - Receitas categorizadas;
[] - O usuário deve ser capaz de editar/remover as suas operações;


## REQUISITOS NÃO FUNCIONAIS