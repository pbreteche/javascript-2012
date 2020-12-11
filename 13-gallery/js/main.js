'use strict';
// directive spécial pour l'environnement d'exécution
// permet de transformer certains problèmes en erreur

import { Gallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    const myGallery = new Gallery('#app-gallery');

    myGallery.startOldSyntax();
});


