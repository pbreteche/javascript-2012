const maCommande = new Commande();
maCommande.ajouter(new Produit('Formation HTML', 800), 7);
maCommande.ajouter(new Produit('Formation JS', 1000), 7);

// La partie suivante nécessite l'accès aux éléments du DOM
// Assurons-nous qu'il ait fini de charger
document.addEventListener('DOMContentLoaded', function(){
    const rootElement = document.querySelector('#app-commande');

    // propriété innerHTML représente le contenu arborescent
    // sous forme de chaine au format HTML
    // permet de définir un sous-arbre éventuellement complexe avec une simple chaine
    rootElement.innerHTML = maCommande.toHTML();    
});