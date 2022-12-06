<div align="center">
  <img src="https://user-images.githubusercontent.com/36193643/205978239-f29e0f55-a561-4b90-931c-066045662f9b.png" />
</div>

<h1 align=center>Napredna Vue vježba</h1>
<p align=center>Napredna vježba za Vue 2/3.</p>

## 📑 Opis

Nastavno na [prošlu Frontend vježbu](https://github.com/MatijaNovosel/vue-vjezba) i [backend vježbu](https://github.com/mosurovicdanilo/EKupi.King) potrebno je napraviti novi Vue projekt nalik na prvi, ali sa stvarnim podacima i to onima s novostvorenog backenda.

Projekt je moguće gledati sa strane **gosta** koji samo gleda popis proizvoda, **korisnika** koji je prijavljen i može kupiti proizvode i praviti narudžbe, a zatim i kao **administrator** koji može uređivati proizvode ponuđene na stranici.

Preporuča se koristiti [Axios](https://github.com/axios/axios) za pravljenje HTTP requestova. Sve se radi na `dev` branchu.

## ✏️ Zadaci

### 🌍 Općenito

- Smisleno organizirati direktorije aplikacije, npr. za servise, modele, store itd.
- Koristiti smisleni layout za aplikaciju uključujući drawer, navigaciju i footer
- Napraviti ekrane za registraciju i prijavu korisnika, kao i gumb za odjavu na navigaciji
- Neautorizirane/neautentificirane korisnike redirectati na odgovarajuću stranicu
- Implementirati autentifikaciju koristeći [navigation guardove](https://router.vuejs.org/guide/advanced/navigation-guards.html) i provjeru JWT-a iz stora
- Implementirati autorizaciju stranica koristeći već spomenute navigation guardove i store, skrivajući određene akcije na aplikaciji ako korisnik nema prava na njih
- Segmentirati pozive na API kroz klase ili objekte s metodama za određene rute koristeći Axios, npr. `authService.ts`

```typescript
class AuthService {
  login(payload: LoginModel) {
    //
  }
}
```

### 👤 Dio za goste/korisnike

- Napraviti stranicu za prikaz proizvoda organiziranih u obliku grida s karticama koristeći Vuetify [Card](https://vuetifyjs.com/en/components/cards/) komponentu i uz to napraviti paginaciju s ograničenim brojem proizvoda po stranici paginacije koristeći Vuetify [Pagination](https://vuetifyjs.com/en/components/paginations/) komponentu
- Svaki proizvod ima svoju stranicu za detalje gdje se mogu vidjeti dodatne informacije o njemu, kao i njegovi podproizvodi
- Proizvod se može dodati u košaricu ili sa stranice detalja ili s grida proizvoda, mora biti naznačeno da je taj proizvod u košarici na navigaciji i na samoj kartici proizvoda kao i količina i iznos
- Neprijavljeni korisnici ne mogu dodavati proizvode u košaricu
- Na košarici mora postojati gumb za kupnju proizvoda koji ga šalja na check-out screen
- Korisnik mora imati stranicu za uređivanje profila, na istoj stranici mora biti pregled njegovih narudžbi

### 👮🏽‍♂️ Administratorski dio

- Napraviti stranicu za prikaz proizvoda s admin strane koristeći [Data table](https://vuetifyjs.com/en/components/data-tables/) komponentu, tablica mora imati:
  - Server-sided pagination
  - Overridani slot za jednu ćeliju retka unutar kojeg će se nalaziti niz gumbova za radnje brisanja i uređivanja proizvoda
  - Stupce i nazive stupaca koji odgovaraju modelu proizvoda
- Za stvaranje i uređivanje proizvoda treba koristiti dijalog, a za brisanje dijalog potvrde
- Napraviti stranicu za pregled svih korisnika koristeći tablicu kao i u prošlom zadatku
- Klikom na redak ili neki dio retka vodi administratora na njegov profil
- Napraviti stranicu s grafovima za pregled informacija o:
  - Top 10 najprodavanijih proizvoda
  - Kupcima grupiranim po potrosnji od najveceg ka najmanjem
  - Ukupnoj sumi novca potrosena na proizvode grupirana po mjesecima
