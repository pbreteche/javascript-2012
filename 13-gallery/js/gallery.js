'use strict';

class Gallery {

    constructor(selector) {
        this.root = document.querySelector(selector);
        this.images = IMAGES;
    }

    start() {
        this.root.innerHTML = `<div class="viewer">
            <img src="images/${this.images[0]}">
            </div>` + this.renderList();

        const viewerImage = this.root.querySelector('.viewer img');

        this.root.querySelectorAll('ul a').forEach(link => {
            link.addEventListener('click', () => {
                // récupération de la variable "link" dedpuis le scope parent
                viewerImage.src = link.dataset.target;
            });
        });
    }

    renderList() {
        const elementsHTML = this.images.reduce(Gallery.renderElement, '');

        return `<ul>${elementsHTML}</ul>`;
    }

    // possibilité de mettre la méthode en static, car pas d'utilisation de "this" à l'intérieur
    static renderElement(output, path) {
        // plus pertinent de séparer les balises en fonctions des rôles
        //  * "a" pour gérer l'interactivité (click)
        //  * "img" pour gérer l'affichage e l'image
        return output + `<li><a data-target="images/${path}"><img src="images/${path}"></a></li>`;
    }
}
