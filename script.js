let inicioFilmes = 0;

fetch(
  `https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false`
).then((response) => {
  const bodyPending = response.json();

  bodyPending.then((bodyC) => {
    const body = bodyC.results;

    body.forEach((x) => {
      const movie = document.createElement("div");
      movie.classList.add("movie");
      movie.classList.add("hidden");
      movie.style.backgroundImage = `url("${x.poster_path}")`;

      const movie__info = document.createElement("div");
      movie__info.classList.add("movie__info");

      const movie__title = document.createElement("spam");
      movie__title.classList.add("movie__title");
      const titulo =
        x.title.length < 11 ? x.title : x.title.slice(0, 11) + "...";
      movie__title.textContent = titulo;

      const movie__rating = document.createElement("movie__rating");
      movie__rating.classList.add("movie__rating");
      movie__rating.textContent = x.vote_average + " ";

      const estrela = document.createElement("img");
      estrela.src = "./assets/estrela.svg";

      movie__rating.append(estrela);

      movie__info.append(movie__title, movie__rating);

      movie.append(movie__info);
      movie.setAttribute("id", x.id);

      const movies = document.querySelector(".movies");
      movies.append(movie);
    });
    atualizarFilmes();

    botaoInicio();

    const movie = document.querySelectorAll(".movie");
    movie.forEach((x) => x.addEventListener("click", abrirModal));

    const modalclose = document.querySelector(".modal__close");
    modalclose.addEventListener("click", fecharModal);

    const busca = document.querySelector(".input");
    busca.addEventListener("keydown", buscar);

    const info = document.querySelectorAll(".movie__info");
    info.forEach((x) => {
      x.addEventListener("click", function (event) {
        event.stopPropagation();
        
      });
    });
  });
});

function atualizarFilmes() {
  const movie = document.querySelectorAll(".movie");
  movie.forEach((x, i) => {
    if (i >= inicioFilmes && i < inicioFilmes + 5) {
      x.classList.remove("hidden");
    } else {
      x.classList.add("hidden");
    }
  });
}

function botaoInicio() {
  const botaoVoltar = document.querySelector(".btn-prev");
  botaoVoltar.addEventListener("click", botaoPrev);

  const botaoAvancar = document.querySelector(".btn-next");
  botaoAvancar.addEventListener("click", botaoProx);
}

function botaoPrev() {
  if (inicioFilmes === 0) {
    inicioFilmes = 15;
  } else {
    inicioFilmes -= 5;
  }
  atualizarFilmes();
}

function botaoProx() {
  const movie = document.querySelectorAll(".movie");
  if (inicioFilmes === 15) {
    inicioFilmes = 0;
  } else {
    inicioFilmes += 5;
  }
  atualizarFilmes();
}

function removeBotaoInicio() {
  const botaoVoltar = document.querySelector(".btn-prev");
  botaoVoltar.removeEventListener("click", botaoPrev);

  const botaoAvancar = document.querySelector(".btn-next");
  botaoAvancar.removeEventListener("click", botaoProx);
}

function botaoBusca() {
  const botaoVoltar = document.querySelector(".btn-prev");
  botaoVoltar.addEventListener("click", botaoPrevBusca);

  const botaoAvancar = document.querySelector(".btn-next");
  botaoAvancar.addEventListener("click", botaoProxBusca);
}

function botaoPrevBusca() {
  const movie = document.querySelectorAll(".movie");
  if (inicioFilmes === 20) {
    inicioFilmes = 35;
  } else {
    inicioFilmes -= 5;
  }
  atualizarFilmes();
}

function botaoProxBusca() {
  const movie = document.querySelectorAll(".movie");
  if (inicioFilmes === 35) {
    inicioFilmes = 20;
  } else {
    inicioFilmes += 5;
  }
  atualizarFilmes();
}

function removerBotaoPesquisa() {
  const botaoVoltar = document.querySelector(".btn-prev");
  botaoVoltar.removeEventListener("click", botaoPrevBusca);

  const botaoAvancar = document.querySelector(".btn-next");
  botaoAvancar.removeEventListener("click", botaoProxBusca);
}

function abrirModal(event) {
  const genres = document.querySelectorAll(".modal__genres__item");
  genres.forEach((x) => x.remove());

  const body = document.querySelector("body");
  body.style.overflow = "hidden";
  body.style.position = "fixed";

  const movieID = event.target.id;
  const modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
  modal.classList.add("no-hidden");

  const modalTitle = document.querySelector(".modal__title");
  const modalDescription = document.querySelector(".modal__description");
  const modalIMG = document.querySelector(".modal__img");
  const modalRating = document.querySelector(".modal__average");

  fetch(
    `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movieID}?language=pt-BR`
  ).then((response) => {
    const bodyP = response.json();
    bodyP.then((body) => {
      modalTitle.textContent = body.title;
      modalDescription.textContent = body.overview;
      modalRating.textContent = body.vote_average;
      modalIMG.src = body.backdrop_path;

      body.genres.forEach((x) => {
        const genre = document.createElement("spam");
        genre.classList.add("modal__genres__item");
        genre.textContent = x.name.length < 9 ? x.name : x.name.slice(0, 9) + "...";

        const divGenre = document.querySelector(".modal__genres");

        divGenre.append(genre);
      });
    });
  });
}

function fecharModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("no-hidden");
  modal.classList.add("hidden");

  const body = document.querySelector("body");
  body.style.overflow = "scroll";
  body.style.position = "inherit";
}

function buscar(event) {
  const input = event.target;

  if (event.key === "Enter") {
    if (input.value === "") {
      inicioFilmes = 0;
      atualizarFilmes();
      removerBotaoPesquisa();
      botaoInicio();
    } else {
      const movie = document.querySelectorAll(".movie");
      movie.forEach((x, i) => {
        if (i > 19) {
          x.remove();
        }
      });
      inicioFilmes = 20;
      fetch(
        `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`
      ).then((response) => {
        const bodyPending = response.json();
        bodyPending.then((bodyC) => {
          const body = bodyC.results;
          if (body.length === 0) {
            inicioFilmes = 0;
            atualizarFilmes();
            return;
          }
          body.forEach((x) => {
            const movie = document.createElement("div");
            movie.classList.add("movie");
            movie.classList.add("hidden");
            movie.style.backgroundImage = `url("${x.poster_path}")`;

            const movie__info = document.createElement("div");
            movie__info.classList.add("movie__info");

            const movie__title = document.createElement("spam");
            movie__title.classList.add("movie__title");
            const titulo =
              x.title.length < 11 ? x.title : x.title.slice(0, 11) + "...";
            movie__title.textContent = titulo;

            const movie__rating = document.createElement("movie__rating");
            movie__rating.classList.add("movie__rating");
            movie__rating.textContent = x.vote_average + " ";

            const estrela = document.createElement("img");
            estrela.src = "./assets/estrela.svg";

            movie__rating.append(estrela);

            movie__info.append(movie__title, movie__rating);

            movie.append(movie__info);
            movie.append(movie__info);
            movie.setAttribute("id", x.id);

            const movies = document.querySelector(".movies");
            movies.append(movie);
          });

          atualizarFilmes();

          const movie = document.querySelectorAll(".movie");
          movie.forEach((x) => x.addEventListener("click", abrirModal));

          removeBotaoInicio();

          botaoBusca();

          input.value = "";
        });
      });
    }
  }
}

fetch(
  "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
).then((response) => {
  const bodyPending = response.json();
  bodyPending.then((body) => {
    const highDescription = document.querySelector(".highlight__description");
    const highRating = document.querySelector(".highlight__rating");
    const highGenre = document.querySelector(".highlight__genres");
    const highTitle = document.querySelector(".highlight__title");
    const videoDiv = document.querySelector(".highlight__video-link");

    videoDiv.style.backgroundImage = `url("${body.backdrop_path}")`;
    highTitle.textContent = `${body.title}`;
    highRating.textContent = `${body.vote_average}`;
    highDescription.textContent = `${body.overview}`;
    fetch(
      "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
    ).then((response) => {
      const linkPending = response.json();
      linkPending.then((linkBody) => {
        const videoDiv = document.querySelector(".highlight__video-link");
        videoDiv.href = `https://www.youtube.com/watch?v=${linkBody.results[0].key}`;
      });
    });
    body.genres.forEach((x, i) => {
      i < body.genres.length - 1
        ? (highGenre.textContent += `${x.name}, `)
        : (highGenre.textContent += `${x.name} / `);
    });
    const data = new Date(body.release_date);
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(data);
    highGenre.textContent += dataFormatada;
    highGenre.textContent = highGenre.textContent.toUpperCase();
  });
});

const input = document.querySelector('input');
const hlGenres = document.querySelector('.highlightgenres');
const hlLauch = document.querySelector('.highlightlaunch');
const hlDescription = document.querySelector('.highlight__description');
const setaEsq = document.querySelector('.btn-prev');
const setaDir = document.querySelector('.btn-next');
const root = document.querySelector('body');
const subtitle = document.querySelector('.subtitle');
const hlInfo = document.querySelector('.highlight__info');
const temaAtual = localStorage.getItem('tema');
const btnTheme = document.querySelector('.btn-theme');
temaAtual === 'dark' ? setDark() : setLight()

btnTheme.addEventListener('click', () => {
  localStorage.getItem('tema') === 'dark' ? setLight() : setDark()
});

async function setLight (){
  localStorage.setItem('tema', 'light')

  btnTheme.src = './assets/light-mode.svg'
  setaEsq.src = './assets/seta-esquerda-preta.svg'
  setaDir.src = './assets/seta-direita-preta.svg'

  root.classList.remove('bodyDark');
  input.classList.remove('inputDark');
  subtitle.classList.remove('subtitleDark');
  hlInfo.classList.remove('hlInfoDark');
  hlGenres.classList.remove('hlGenresDark');
  hlLauch.classList.remove('hlGenresDark');
  hlDescription.classList.remove('hlDescriptionDark');
}

async function setDark (){
  localStorage.setItem('tema', 'dark')

  btnTheme.src = './assets/dark-mode.svg'
  setaEsq.src = './assets/seta-esquerda-branca.svg'
  setaDir.src = './assets/seta-direita-branca.svg'

  root.classList.add('bodyDark');
  input.classList.add('inputDark');
  subtitle.classList.add('subtitleDark');
  hlInfo.classList.add('hlInfoDark');
  hlGenres.classList.add('hlGenresDark');
  hlLauch.classList.add('hlGenresDark');
  hlDescription.classList.add('hlDescriptionDark');
}