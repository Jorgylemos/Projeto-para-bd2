<h1>Projeto banco de dados</h1>

<p>O projeto foi criado por Jorge Lemos, do zero e utilizando os princípios SOLID.</p>

<h2>Requisitos para rodar</h2>
<ul>
    <li>NodeJS</li>
</ul>

<h2>Como rodar o projeto?</h2>
<p>É possível utilizar os seguintes sites para rodar o projeto</p>
<ul>
    <li><a href="https://codesandbox.io/" target="_blank">Codesandbox</a></li>
    <li><a href="https://replit.com" target="_blank">Replit</a></li>
</ul>

<p>Caso queira utilizar o Node da máquina mesmo:</p>
<p>Abrir o cmd/bash na raíz do projeto onde está o package.json e colocar o seguinte comando para instalar as dependências:</p>

```sh
npm install
```

<p>Logo após é só rodar o servidor com o seguinte comando:</p>

```sh
npm run dev
```

<h3>Obs: infelizmente estava tendo problemas com Axios dentro do .ejs, então resolvi utilizar os métodos DELETE e PUT nas rotas de Post mesmo, então criei as rotas "/user/update" e "/user/delete".</h3>