# resolvedor-cubo-magico

## Bacharelado em Sistemas de Informação

## Inteligência Artificial–Atividade 01–semestre 2023/I

---

### Escopo do Trabalho:

O objetivo deste trabalho e implementar um resolvedor de Cubo Magico (Rubik’s Cube Solver). Para tal, o grupo poderá utilizar qualquer algoritmo que desejar, desde que:

- As dimensões do cubo sejam 3x3x3.
- Seja possível configurar o estado inicial de forma manual e também gerar um estado inicial de forma aleatória (ou seja, “misturar o cubo”).
- Todos os passos executados pelo resolvedor até a resolução final do cubo sejam mostrados e possam ser auditados.

[Link da apresentação exibida em sala de aula](apresentacao-resolvedor-de-cubo-magico.pdf)

---

### Características:

- Linguagem: Node/JavaScript
- Algorítimo resolvedor: Kocimeba - [Two-Phase-Algorithm](http://kociemba.org/cube.htm)
- Biblioteca para do resolvedor: [node-two-phase-algorithm](https://github.com/daniel-j/node-two-phase-algorithm)

---

### Como editar:

- `npm install` - Instalar as dependências

- `npm run build` - Transpilar o projeto e gerar os arquivos `./dist/bundle.js` e `./dist/server.js`

  - ou `npm run watch` - Transpilar o projeto, ouvir as mudanças nos arquivos e os arquivos `./dist/bundle.js` e `./dist/server.js`

---

### Como rodar:

- `npm run server` - Rodar o servidor

- Acessar o link `http://localhost:3333/`

---

### Exemplo cubo 2D

> ![Exemplo cubo 2D](cube-2d-example.png)
