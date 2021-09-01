module.exports = {
    atualizarFilmes : function atualizarFilmes() {
    const movie = document.querySelectorAll(".movie");
    movie.forEach((x, i) => {
      if (i >= inicioFilmes && i < inicioFilmes + 5) {
        x.classList.remove("hidden");
      } else {
        x.classList.add("hidden");
      }
    });
  },
  
    botaoPrev : function botaoPrev() {
    if (inicioFilmes === 0) {
      inicioFilmes = 15;
    } else {
      inicioFilmes -= 5;
    }
    atualizarFilmes();
  },
  
  botaoProx: function botaoProx() {
    const movie = document.querySelectorAll(".movie");
    if (inicioFilmes === 15) {
      inicioFilmes = 0;
    } else {
      inicioFilmes += 5;
    }
    atualizarFilmes();
  },
  
  abrirModal: function abrirModal(event) {
    const movie = event.target;
  
    const titulo = movie;
  
    const modal = document.querySelector(".modal");
    modal.classList.remove("hidden");
    modal.classList.add("no-hidden");
  },
  
  fecharModal: function fecharModal(event) {
    const modal = document.querySelector(".modal");
    modal.classList.remove("no-hidden");
    modal.classList.add("hidden");
  }
}