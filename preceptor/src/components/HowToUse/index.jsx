import "./styles.css";

export function HowToUse() {
  return (
    <section className="howto-container">
      <header className="howto-header">
        <h1>Como usar o sistema</h1>
        <p>
          Este sistema foi desenvolvido para auxiliar o preceptor no controle de
          alunos, grupos, reposições e confirmação de presença.
        </p>
      </header>

      <section className="howto-section">
        <h2>1. Cadastro de alunos</h2>
        <p>
          O primeiro passo é cadastrar o aluno na plataforma. Para isso, é
          necessário preencher os seguintes dados:
        </p>

        <ul>
          <li>Nome completo do aluno</li>
          <li>RGM</li>
          <li>Turno (manhã, tarde ou noite)</li>
          <li>Grupo</li>
        </ul>

        <p>
          Após o cadastro, o aluno passará a aparecer automaticamente na lista
          geral de alunos do sistema.
        </p>
      </section>

      <section className="howto-section">
        <h2>2. Gerenciamento de alunos</h2>
        <p>
          Na lista de alunos, o preceptor poderá realizar diversas ações de
          forma rápida:
        </p>

        <ul>
          <li>Editar os dados do aluno</li>
          <li>Excluir um aluno do sistema</li>
          <li>
            Trocar o aluno de grupo utilizando apenas um botão, sem necessidade
            de novo cadastro
          </li>
        </ul>
      </section>

      <section className="howto-section">
        <h2>3. Agendamento de reposições</h2>
        <p>
          O sistema permite realizar o agendamento de reposições de aula de
          forma simples e organizada.
        </p>

        <p>Para isso, é necessário preencher um formulário com:</p>

        <ul>
          <li>Nome do professor responsável</li>
          <li>Justificativa da reposição</li>
          <li>Semestre do aluno</li>
          <li>Data do agendamento</li>
        </ul>

        <p>
          Após o agendamento, a reposição ficará registrada no sistema e
          vinculada ao aluno.
        </p>
      </section>

      <section className="howto-section">
        <h2>4. Confirmação de presença</h2>
        <p>
          Na data da reposição, o preceptor terá acesso a uma lista com todos os
          alunos agendados para aquele dia.
        </p>

        <p>
          A partir dessa lista, será possível confirmar a presença do aluno no
          sistema, garantindo o controle correto das reposições realizadas.
        </p>
      </section>

      <footer className="howto-footer">
        <p>
          Novas funcionalidades poderão ser adicionadas futuramente conforme a
          necessidade do serviço.
        </p>
      </footer>
    </section>
  );
}
