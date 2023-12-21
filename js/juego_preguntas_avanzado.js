function juegoPreguntasAvanzado(
  btnStart,
  btnExit,
  preguntas,
  menuPrincipal,
  menuPreguntas,
  opcion,
  btnContinue,
  marcador,
  menuPreguntasReset,
  btnExitPreguntas
) {
  const $btnStart = document.querySelector(btnStart);
  const $btnExit = document.querySelector(btnExit);
  const $preguntas = document.querySelector(preguntas);
  const $menuPrincipal = document.querySelector(menuPrincipal);
  const $menuPreguntas = document.querySelector(menuPreguntas);
  const $btnContinue = document.querySelector(btnContinue);
  const $opcion = opcion;
  const $opciones = document.querySelectorAll(opcion);
  const $marcador = document.querySelector(marcador);
  const $menuPreguntasReset = document.querySelector(menuPreguntasReset);
  const $btnMenuExitPreguntas = document.querySelector(btnExitPreguntas);
  let puntajes = 0;
  let preguntasAvanzadas = [
    "¿ Quién fue el autor del último libro de la Biblia?",
    "¿Cuantos libros tiene la Biblia?",
    "Cuál es la capital de Francia",
    "¿Cuál es el resultado de sumar los ángulos internos de un triángulo?",
    "¿Cuántos planetas hay en nuestro sistema solar?",
  ];
  let todasLasRespuestas = [
    ["Pedro", "Mateo", "Juan"],
    [36, 66, 96],
    ["Paris", "Londres", "Berlin"],
    [90, 360, 180],
    [7, 8, 9],
  ];
  let respuestasAvanzadas = ["Juan", 66, "Paris", 180, 8];
  let controladorPreguntas = 0;
  let controlador = 0;
  let controladorRespuestas = 0;
  let contadorPregunta = 0;
  let clickeado = false;
  let opciones = ["a", "b", "c"];
  const mostrarPregunta = () => {
    if (controladorPreguntas < preguntasAvanzadas.length) {
      $menuPreguntasReset.classList.remove("hidden");
      $preguntas.innerHTML = preguntasAvanzadas[controladorPreguntas];

      $opciones.forEach((el) => {
        el.innerHTML += `<p>${todasLasRespuestas[controladorRespuestas][controlador]}</p>`;
        controlador++;
      });
      controlador = 0;
      controladorRespuestas++;
      controladorPreguntas++;
    } else {
      $btnMenuExitPreguntas.classList.remove("hidden");
      $preguntas.innerHTML = "";
      $menuPreguntasReset.classList.add("hidden");
    }
  };

  const reiniciarJuego = () => {
    controladorPreguntas = 0;
    controlador = 0;
    controladorRespuestas = 0;
    puntajes = 0;
    contadorPregunta = 0;
    $marcador.innerHTML = puntajes;
  };
  document.addEventListener("click", (e) => {
    if (e.target.matches(btnStart)) {
      $btnMenuExitPreguntas.classList.add("hidden");
      $menuPrincipal.classList.add("hidden");
      $menuPreguntas.classList.remove("hidden");
      mostrarPregunta();
    }
    if (e.target.matches(btnContinue)) {
      clickeado = false;
      contadorPregunta++;
      $opciones.forEach((el, i) => {
        el.innerHTML = `<i class="fa-solid fa-${opciones[i]}"></i>`;
      });
      mostrarPregunta();
    }

    if (e.target.matches(btnExitPreguntas)) {
      reiniciarJuego();
      $menuPrincipal.classList.remove("hidden");
      $menuPreguntas.classList.add("hidden");
    }
  });

  $opciones.forEach((Element, index) => {
    let $i;
    if (Element.textContent == respuestasAvanzadas[contadorPregunta]) {
      console.log("hola");
    }
    $i = document.createElement("i");
    let $check = document.createElement("i");
    const respuestaCorrecta = (e) => {
      $i.classList.remove("fa-xmark");
      let $opcionCorrecta;
      $i.classList.add("fa-solid", "fa-check");
      e.target.closest(".opcion").appendChild($i);
      $opcionCorrecta = document.querySelectorAll(" .fa-solid");
      $opcionCorrecta[index].style.backgroundColor = "green";
    };
    const respuestaIncorrecta = (e) => {
      $i.classList.remove("fa-check");
      $i.classList.add("fa-solid", "fa-xmark");
      e.target.closest(".opcion").appendChild($i);
      let RespuestaEquivocada = document.querySelectorAll(".fa-solid");
      RespuestaEquivocada[index].style.backgroundColor = "red";
      for (let i of $opciones) {
        if (i.textContent == respuestasAvanzadas[contadorPregunta]) {
          $check.classList.add("fa-solid", "fa-check");
          i.querySelector("p").after($check);
          i.querySelector(".fa-solid").style.backgroundColor = "green";
        }
      }
    };
    Element.addEventListener("click", (e) => {
      if (!clickeado) {
        clickeado = true;
        if (
          e.target.closest(".opcion").textContent ==
          respuestasAvanzadas[contadorPregunta]
        ) {
          respuestaCorrecta(e);
          puntajes += 10;
          $marcador.innerHTML = puntajes;
        } else {
          respuestaIncorrecta(e);
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  juegoPreguntasAvanzado(
    ".btn-menu-start",
    ".btn-menu-exit",
    ".pregunta",
    ".juego-preguntas-menu",
    ".preguntas-menu",
    ".opcion",
    ".btn-juego-continue",
    ".marcador",
    ".preguntas-menu-1",
    ".btn-preguntas-exit"
  );
});
