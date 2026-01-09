# 🎓 EduTrack

**EduTrack** é uma aplicação web para **gestão acadêmica de alunos**, focada na organização por **grupos**, **turnos** e no **controle de movimentações**, com visão de crescimento para **dashboards** e **relatórios gerenciais**.

O projeto foi desenvolvido a partir de uma **necessidade real no contexto de estágios supervisionados de uma instituição privada do Distrito Federal**, com o objetivo de substituir controles manuais por uma solução digital **simples, funcional e evolutiva.**

Trata-se de um **MVP funcional**, utilizado como **prova de conceito**, permitindo validar regras de negócio, usabilidade e fluxos antes da evolução para uma arquitetura com backend dedicado.

---

## 📌 Funcionalidades

- Cadastro de alunos  
- Edição e exclusão de registros  
- Organização por **grupo** e **turno**  
- Filtros dinâmicos (nome, RGM, grupo, turno)  
- Troca de alunos entre grupos  
- Persistência de dados via **LocalStorage**  
- Interface responsiva, pensada para uso em **desktop**

---

## 🧠 Motivação do Projeto

Durante a rotina de acompanhamento acadêmico, especialmente em estágios, o controle de alunos costuma ser feito por planilhas ou anotações manuais, o que pode gerar retrabalho, inconsistências e dificuldade de reorganização.

O **EduTrack** surge para:
- Reduzir erros manuais
- Facilitar reorganizações de grupos
- Centralizar informações
- Servir como base para **futuras automações e integrações.**

---

## 🧩 Decisão Técnica: LocalStorage

Neste estágio, a aplicação utiliza **LocalStorage** como camada de persistência, com o objetivo de:

- Simular um banco de dados real

- Facilitar testes e validação com usuários finais

- **Permitir demonstração do sistema sem dependência de infraestrutura**

- Manter a lógica de negócio preparada para futura migração para backend

**Essa abordagem permite validar o produto de forma rápida e segura, mantendo o código organizado para evolução futura.**

---

## 🛠️ Tecnologias Utilizadas

- React  
- JavaScript (ES6+)  
- HTML5  
- CSS3  
- LocalStorage  

---

## 🗂️ Estrutura do Projeto

src/  
├── components/  
│   ├── StudentForm/  
│   ├── StudentList/  
│   └── ...  
├── styles/  
├── App.jsx  
└── main.jsx  

---

## 🚀 Próximas Implementações (Roadmap)

- Dashboard geral  
- Autenticação de usuários  
- Persistência com backend (Node / API REST)  
- Exportação de dados (Excel / PDF)  

---

## ▶️ Como Executar o Projeto

Clone o repositório  
git clone https://github.com/seu-usuario/eduTrack.git  

Entre na pasta do projeto  
cd eduTrack  

Instale as dependências  
npm install  

Execute o projeto  
npm run dev  

---

## 🧑‍💻 Autor

Desenvolvido por **Pedro Henrique**  
Enfermeiro | Desenvolvedor em formação  
Brasil  

---

## 📄 Licença

Este projeto está sob a licença MIT.  
Sinta-se livre para estudar, adaptar e evoluir.
