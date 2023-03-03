import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galary = document.querySelector(".gallery");

function createGalary(arrow) {
  const items = arrow
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
  galary.insertAdjacentHTML("beforeend", items);
}
createGalary(galleryItems);

galary.addEventListener("click", onImgClick);
let instance = null;

function onImgClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" alt="${event.target.alt}" width="800" height="600">
`,
    {
      onShow: () => {
        window.addEventListener("keydown", modalClose);
      },
      onClose: () => {
        window.removeEventListener("keydown", modalClose);
      },
    }
  );
  instance.show();
}

function modalClose(event) {
  if (event.key === "Escape") {
    instance.close();
  }
}
