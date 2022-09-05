Yelp Camp
//npm 
1. nodemon
2. express
3. ejs
4. ejs mate - layout, boileerplates
    (tamo gde ga koristim - layout('boilerplate'))
    (ako ubacujem partial(npr. navbar) u njega - include('navbar'))
4. mongoose
5. morgan

Bootstrap:
    

//models folder
pravljenje mongoose Schema-e


//seeding
Sluzi za postavljanje pocetnih vrednosti.
Nije moranje, ali je ok nesto da pise na stranici u pocetku.

    cities - niz sa gradovima
    seedHelpers - imena mesta(suma, jezero...)
    index - spajanje ova dva kako bi se pravili pocetni elementi

index je dovoljno pozvati jednom, i ne vise, mada moze, ali nepotrebno









//middleware
app.use - ono sto hocu da se desava na svakoj stranici
npr.
    req.method = 'GET' - svaki method bio GET, POST, PUT, DELETE bice pretvoren u GET
next() - prelazak na sledeci middleware, ili bilo sta sto je sledece
ako njega ne stavim nista mose tog middleware-a nece da se izvrsi


