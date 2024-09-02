// quando a página iniciar

document.addEventListener("DOMContentLoaded", function () {
  function toggleClass(elemento, classe) {
    if (elemento.className.includes(classe)) {
      elemento.className = elemento.className.replaceAll(classe, "");
    } else {
      elemento.className += ` ${classe}`;
    }
  }

  function mostrarVoltar(posicaoDaPagina) {
    const btnVoltar = document.querySelector("header .btn-voltar");
    if (posicaoDaPagina > 0 && btnVoltar.className.includes("invisible")) {
      btnVoltar.className = btnVoltar.className.replaceAll("invisible", "");
    } else if (!btnVoltar.className.includes("invisible")) {
      btnVoltar.className += " invisible";
    }
  }

  function buscaPaginas() {
    return [...document.querySelectorAll(".pagina").values()];
  }

  function paginaAtiva() {
    const paginas = buscaPaginas();
    const posicaoDaPagina = paginas.findIndex(function (pagina) {
      return !pagina.className.includes("hidden");
    });
    return { pagina: paginas[posicaoDaPagina], posicao: posicaoDaPagina };
  }

  function proximaPagina() {
    const paginas = buscaPaginas();
    const paginaAtual = paginaAtiva();
    const posicaoProximaPagina = paginaAtual.posicao + 1;

    toggleClass(paginaAtual.pagina, "hidden");
    toggleClass(paginas[posicaoProximaPagina], "hidden");

    mostrarVoltar(posicaoProximaPagina);
  }

  function voltarPagina() {
    const paginas = buscaPaginas();
    const paginaAtual = paginaAtiva();
    const posicaoProximaPagina = paginaAtual.posicao - 1;
    toggleClass(paginaAtual.pagina, "hidden");
    toggleClass(paginas[posicaoProximaPagina], "hidden");

    mostrarVoltar(posicaoProximaPagina);
  }

  function irParaEntrar() {
    const paginaAtual = paginaAtiva();
    const paginaLogin = document.getElementById("pagina-entrar");
    toggleClass(paginaAtual.pagina, "hidden");
    toggleClass(paginaLogin, "hidden");
    mostrarVoltar(0);
  }

  const btnVoltar = document.querySelector("header .btn-voltar");
  btnVoltar.addEventListener("click", () => {
    voltarPagina();
  });

  const btnsPossuiUmaConta = document.querySelectorAll(".ja-possui-conta > a");
  btnsPossuiUmaConta.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      irParaEntrar();
    })
  );

  const btnsNaoPossuiUmaConta = document.querySelectorAll(
    ".nao-possui-conta > a"
  );
  btnsNaoPossuiUmaConta.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const paginaAtual = paginaAtiva();
      const paginaLogin = document.getElementById("pagina-apresentacao");
      toggleClass(paginaAtual.pagina, "hidden");
      toggleClass(paginaLogin, "hidden");
      mostrarVoltar(0);
    })
  );

  const btnEntrarApresentacao = document.querySelector(
    "#pagina-apresentacao .btn-entrar"
  );
  btnEntrarApresentacao.addEventListener("click", () => {
    proximaPagina();
  });

  const btnCadastrar = document.querySelector("#pagina-cadastrar .btn-entrar");
  const formularioCadastro = document.querySelector(
    "#pagina-cadastrar .formulario-cadastro"
  );
  btnCadastrar.addEventListener("click", () => {
    if (formularioCadastro.checkValidity()) {
      proximaPagina();
    } else {
      formularioCadastro.reportValidity();
    }
  });

  const btnInfoSenha = document.querySelector(
    "#pagina-cadastrar #btn-info-senha"
  );
  const modalInfoSenha = document.querySelector(
    "#pagina-cadastrar #modal-senha"
  );
  const btnModalInfoSenhaFechar = modalInfoSenha.querySelector(".btn-fechar");
  btnInfoSenha.addEventListener("click", () => {
    toggleClass(modalInfoSenha, "hidden");
  });
  btnModalInfoSenhaFechar.addEventListener("click", () => {
    toggleClass(modalInfoSenha, "hidden");
  });

  const btnInfoNascimento = document.querySelector(
    "#pagina-cadastrar #btn-info-nascimento"
  );
  const modalInfoNascimento = document.querySelector(
    "#pagina-cadastrar #modal-nascimento"
  );
  const btnModalInfoNascimentoFechar =
    modalInfoNascimento.querySelector(".btn-fechar");
  btnInfoNascimento.addEventListener("click", () => {
    toggleClass(modalInfoNascimento, "hidden");
  });
  btnModalInfoNascimentoFechar.addEventListener("click", () => {
    toggleClass(modalInfoNascimento, "hidden");
  });

  const btnInfoTermos = document.querySelector(
    "#pagina-cadastrar #btn-termos-uso"
  );
  const modalInfoTermo = document.querySelector(
    "#pagina-cadastrar #modal-termos"
  );
  const btnModalInfoTermosFechar = modalInfoTermo.querySelector(".btn-fechar");
  const btnModalInfoTermosVoltar = modalInfoTermo.querySelector(".btn-voltar");
  btnInfoTermos.addEventListener("click", () => {
    toggleClass(modalInfoTermo, "hidden");
  });
  btnModalInfoTermosFechar.addEventListener("click", () => {
    toggleClass(modalInfoTermo, "hidden");
  });
  btnModalInfoTermosVoltar.addEventListener("click", () => {
    toggleClass(modalInfoTermo, "hidden");
  });

  const btnInfoAutenticacao = document.querySelector(
    "#pagina-cadastrar #btn-autenticacao"
  );
  const modalInfoAutenticacao = document.querySelector(
    "#pagina-cadastrar #modal-autenticacao"
  );
  const btnModalInfoAutenticacaoFechar =
    modalInfoAutenticacao.querySelector(".btn-fechar");
  btnInfoAutenticacao.addEventListener("click", () => {
    toggleClass(modalInfoAutenticacao, "hidden");
  });
  btnModalInfoAutenticacaoFechar.addEventListener("click", () => {
    toggleClass(modalInfoAutenticacao, "hidden");
  });

  const btnValidar = document.querySelector("#pagina-token .btn-entrar");
  const formularioToken = document.querySelector(
    "#pagina-token .formulario-token"
  );
  btnValidar.addEventListener("click", () => {
    if (formularioToken.checkValidity()) {
      proximaPagina();
      setTimeout(() => {
        irParaEntrar();
      }, 5000);
    } else {
      formularioToken.reportValidity();
    }
  });

  const btnEsqueceuSenha = document.querySelector(
    "#pagina-entrar .btn-esqueceu"
  );
  const formularioEntrar = document.querySelector(
    "#pagina-entrar .formulario-entrar"
  );
  btnEsqueceuSenha.addEventListener("click", () => {
    if (formularioEntrar.checkValidity()) {
      proximaPagina();
    } else {
      formularioEntrar.reportValidity();
    }
  });

  // proximaPagina();
});
