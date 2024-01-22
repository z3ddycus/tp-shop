# Contributing

## Steps 
### Step 1: Créer une issue git résumant le besoin
L'issue doit respecter ce template : 
`IssueScope` doit correspondre à une de ces valeurs : - 
`FEATURE` pour une nouvelle fonctionnalité
`FIX` pour un bug
`TASK` pour une modification technique mais sans changement du produit
`CICD` pour une modification de CICD
`DOC` pour une modification de la doc

``` 
[IssueScope] courte description claire

Longue description de l'issue et du changement qui serait opéré. Très important de noter si le dévelopement créerait un breaking change. 
```

### Step 2: Discussion avant développement
En commentaire de l'issue, les owners du repository discuteront de l'issue pour déclencher ou pas le développement de l'issue. 
Toute PR répondant à une issue non validé sera systématiquement refusée.

### Step 3: Développement
Le développement s'effectue sur un fork du repository original et se termine via une PR vers celui ci.
Il est attendu que chaque développement de FEATURE ou FIX, à minima, soit testé et respecte les conventions de codage inhérentes.
S'il s'agit de votre premier développement sur ce repository, ajoutez votre noms aux contributors.

### Step 4: Review 
Le code sera relu par les gestionnaires du projet. Cette étape se termine dès qu'un des maintainers approuve la PR.
Tout code ne validant pas les tests sera automatiquement refusé.

### Step 5: Merge
Une fois la PR approuvé, vous devez rebase votre code avec la branche main du repository original. 
Dès lors qu'une PR est approuvé et rebase, elle sera mergé par les maintainers.


## Thanks
### Creator
Ce repository a été créé depuis les sources de Manon Guillard. 
Merci beaucoup de nous avoir autorisé à l´utiliser <3

### Maintainers
Ce repository est maintenu par :
- Hugo Mochet https://github.com/Ydrasil
- Yohann Henry https://github.com/z3ddycus

### Contributors
Liste des contributions par ordre alphabétique.
Format : Prénom Nom et optionnellement le github.

- Hugo Mochet https://github.com/Ydrasil
- Manon Guillard
- Yohann Henry https://github.com/z3ddycus
- Rachid Abbou