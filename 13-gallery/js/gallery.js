'use strict';

class Gallery {

    constructor(selector) {
        this.root = document.querySelector(selector);
        this.images = [];
    }

    start() {
        // Pour simuler un temps de latence dans le dialogue HTTP
        setTimeout(() => {
            fetch('js/images.json').then(response => response.json().then(
                images => {
                    this.images = images;
                    this.renderAll();
                }
            ));
        }, 2000);// ajout de 2000ms de délai
        this.root.innerHTML = '<p>En cours de chargement</p>';
    }

    startOldSyntax() {
        // objet de gestion d'un échange HTTP
        const xhr = new XMLHttpRequest();
        
        // Préparation de la requête
        xhr.open('GET', 'js/images.json');

        // Paramétrage de l'objet XHR (ajout d'en-tête HTTP, attachement d'écouteurs)
        // syntaxe d'écouteur d'événement était utilisée à la place des promesses
        xhr.addEventListener('load', () => {
            this.images = JSON.parse(xhr.responseText);
            this.renderAll();
        });

        // Transmission de l'ensemble de la requête sur le réseau
        // Possibilité de transmettre le "payload"
        xhr.send();
    }

    renderAll() {
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
