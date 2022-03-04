#language:fr
Fonctionnalité: List
Plan du scénario: Affichage d'une todolist
    Etant donné que la liste existe :
    | tache  | status   |
    | Tache A| en cours |
    | Tache B| terminer |
    | Tache C| en cours |
    Quand je consulte la todo liste
    Alors je vois la tache "<tache>" qui est "<status>"

    Exemples:
    | tache  | status   |
    | Tache A| en cours |
    | Tache B| terminer |
    | Tache C| en cours |
