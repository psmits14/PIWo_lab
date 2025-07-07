# Programowanie Interfejsów Webowych
Zajęcia laboratoryjne z przedmiotu Programowanie Interfejsów Webowych, Politechnika Wrocławska.

## Opis projektu

"Księgarnia Między Kartkami" to internetowa księgarnia umożliwiająca przeglądanie oraz zakup różnego rodzaju książek. Użytkownicy mogą filtrować dostępne pozycje według gatunku, ceny, roku wydania, rodzaju okładki oraz liczby stron. Aplikacja posiada również funkcjonalność dodawania nowych książek.

## Laboratorium 1 — HTML, CSS
W ramach pierwszego laboratorium utworzono:
- Stronę główną (index.html) zawierającą katalog książek
- Stronę formularza dodawania nowych książek (index2.html)
- Podstawowe style CSS (style.css) odpowiedzialne za wygląd strony
- Nawigację i filtrację książek według różnych kryteriów
- Sekcję z przykładowymi książkami, które można dodać do koszyka

## Laboratorium 2 — JavaScript
W ramach laboratorium przygotowano prostą aplikację To-Do do zarządzania zadaniami, napisaną w czystym HTML, CSS i JavaScript.

✨ Funkcjonalności aplikacji:
- Dodawanie zadań do wybranej listy
- Oznaczanie zadań jako wykonane (z przekreśleniem i datą)
- Usuwanie zadań z potwierdzeniem w modalu
- Cofnięcie ostatniego usunięcia (undo)
- Wyszukiwanie z opcją ignorowania wielkości liter
- Obsługa wielu list (predefiniowanych i tworzonych dynamicznie)
- Zwijanie i rozwijanie list

### Księgarnia Między Kartkami

## Programowanie Interfejsów Webowych

Zajęcia laboratoryjne z przedmiotu Programowanie Interfejsów Webowych, Politechnika Wrocławska.

## Opis projektu

"Księgarnia Między Kartkami" to internetowa księgarnia umożliwiająca przeglądanie oraz zakup różnego rodzaju książek. Użytkownicy mogą filtrować dostępne pozycje według gatunku, ceny, roku wydania, rodzaju okładki oraz liczby stron. Aplikacja posiada również funkcjonalność dodawania nowych książek.

## Laboratorium 1 — HTML, CSS

W ramach pierwszego laboratorium utworzono:

- Stronę główną (index.html) zawierającą katalog książek
- Stronę formularza dodawania nowych książek (index2.html)
- Podstawowe style CSS (style.css) odpowiedzialne za wygląd strony
- Nawigację i filtrację książek według różnych kryteriów
- Sekcję z przykładowymi książkami, które można dodać do koszyka


## Laboratorium 2 — JavaScript

W ramach laboratorium przygotowano prostą aplikację To-Do do zarządzania zadaniami, napisaną w czystym HTML, CSS i JavaScript.

✨ Funkcjonalności aplikacji:

- Dodawanie zadań do wybranej listy
- Oznaczanie zadań jako wykonane (z przekreśleniem i datą)
- Usuwanie zadań z potwierdzeniem w modalu
- Cofnięcie ostatniego usunięcia (undo)
- Wyszukiwanie z opcją ignorowania wielkości liter
- Obsługa wielu list (predefiniowanych i tworzonych dynamicznie)
- Zwijanie i rozwijanie list


## Laboratorium 3, 4, 5 — React

W ramach laboratorium 3-5 przeprowadzono migrację projektu "Księgarnia Między Kartkami" do biblioteki React,  a także dodano obsługę bazy danych i hostingu za pomocą Firebase. Aplikacja została znacząco rozbudowana o nowe funkcjonalności oraz zintegrowana z backendem w chmurze.

### Funkcjonalności aplikacji:

- Przeglądanie katalogu książek - wyświetlanie listy dostępnych książek z podstawowymi informacjami
- Zaawansowane filtrowanie - możliwość filtrowania książek według:
  - Gatunku literackiego
  - Zakresu cenowego
  - Rodzaju okładki (twarda, miękka, e-book, audiobook)
  - Liczby stron
  - Roku wydania
  - Autora
  - Słów kluczowych w opisie
- Sortowanie wyników - możliwość sortowania książek według ceny, roku wydania i tytułu
- Dodawanie nowych książek - formularz umożliwiający dodanie nowej pozycji do katalogu
- Zakup książek
- Logowanie przy użyciu adresu email oraz Google przy użyciu Firebase

### Uruchomienie projektu

1. Sklonuj repozytorium:


```shellscript
git clone https://github.com/psmits14/PIWo-lab
cd Lab3_React
```

2. Zainstaluj zależności:

```shellscript
npm install
```

3. Uruchom aplikację w trybie deweloperskim:

```shellscript
npm run dev
```

4. Aplikacja będzie dostępna pod adresem: `http://localhost:5173`


### Konfiguracja i deploy z Firebase:

1. Zbuduj aplikację do produkcji:

   ```bash
   npm run build
   ```

2. Wdróż aplikację na Firebase Hosting:

   ```bash
   firebase deploy
   ```

3. Po udanym deployu aplikacja będzie dostępna pod adresem wskazanym przez Firebase.


