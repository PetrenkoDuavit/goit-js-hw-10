import "./css/styles.css";

import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import SlimSelect from "slim-select";

const selectEl = document.querySelector(".breed-select");
const errorEl = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".wrapper");

onLoad();

function onLoad() {
  loader.classList.remove("is-hidden");
  fetchBreeds()
    .then((data) => {
      addMarkup(selectEl, createOption(data));
      new SlimSelect({
        select: selectEl,
      });
      selectEl.addEventListener("change", onChange);
    })
    .catch((error) => onError())
    .finally(() => {
      loader.classList.add("is-hidden");
    });
}

function createOption(data) {
  return data
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join("");
}

function addMarkup(el, markup) {
  el.innerHTML = markup;
}

function onChange(e) {
  loader.classList.remove("is-hidden");
  fetchCatByBreed(e.target.value)
    .then(([data]) => {
      const { url, breeds } = data;
      const { name, description, temperament } = breeds[0];
      const markup = createBoxFunction(url, name, description, temperament);
      addMarkup(catInfo, markup);
    })
    .catch((error) => onError())
    .finally(() => {
      loader.classList.add("is-hidden");
    });
}

function createBoxFunction(url, name, description, temperament) {
  return `<div class="box">
      <div class="box-img">
        <img src="${url}" alt="cat">
      </div>
      <div class="box-content">
        <h1 class="title">
        ${name}
        </h1>
      <p class="text">${description}</p>
      <p class="temperament">${temperament}</p>
      </div>
        </div>`;
}

function onError() {
  addMarkup(catInfo, "");
  errorEl.classList.remove("is-hidden");
  setTimeout(() => {
    errorEl.classList.add("is-hidden");
  }, 3000);
}
