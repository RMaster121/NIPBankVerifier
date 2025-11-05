# NIP Bank Verifier

> **🇵🇱 Wersja polska** (bieżąca) | **[🇬🇧 English version / Wersja angielska](README.md)**

Aplikacja webowa do weryfikacji kont bankowych polskich firm za pomocą oficjalnego API Białej Listy Ministerstwa Finansów (MF.GOV.PL). Narzędzie pozwala zweryfikować, czy podany numer konta bankowego jest przypisany do konkretnej firmy identyfikowanej numerem NIP lub REGON.

## 🌟 Funkcje

- **Weryfikacja pojedyncza i grupowa**: Weryfikuj jeden lub wiele podmiotów jednocześnie
- **Import/Eksport Excel**: Importuj dane do weryfikacji z arkuszy Excel i eksportuj wyniki
- **Raporty PDF**: Generuj szczegółowe raporty PDF dla każdej weryfikacji
- **Walidacja w czasie rzeczywistym**: Natychmiastowa walidacja numerów NIP, REGON i kont bankowych
- **Oficjalne źródło danych**: Korzysta z oficjalnego API Ministerstwa Finansów
- **Wsparcie szablonów**: Pobierz szablony Excel do łatwych operacji zbiorczych
- **Responsywny design**: Nowoczesny, przyjazny dla urządzeń mobilnych interfejs zbudowany z TailwindCSS

## 🚀 Rozpoczęcie pracy

### Wymagania wstępne

- Node.js (wersja określona w pliku [`.nvmrc`](.nvmrc))
- Menedżer pakietów Yarn

### Instalacja

1. Sklonuj repozytorium:
```bash
git clone https://github.com/RMaster121/NIPBankVerifier
cd NIPBankVerifier
```

2. Zainstaluj zależności:
```bash
yarn install
```

3. Uruchom serwer deweloperski:
```bash
yarn dev
```

4. Otwórz przeglądarkę i przejdź do `http://localhost:5173`

## 📖 Użytkowanie

### Weryfikacja pojedyncza

1. Wprowadź numer NIP lub REGON w pierwszym polu
2. Wprowadź numer konta bankowego (26 cyfr) w drugim polu
3. Kliknij przycisk "Zweryfikuj"
4. Sprawdź wyniki z danymi firmy i statusem weryfikacji konta

### Weryfikacja zbiorcza

1. Kliknij "Importuj z Excela"
2. Wybierz jedną z opcji:
   - Pobierz szablon, wypełnij go danymi i prześlij
   - Wklej dane bezpośrednio z Excela w pole tekstowe
3. Kliknij "Importuj"
4. Kliknij "Zweryfikuj", aby przetworzyć wszystkie wpisy
5. Eksportuj wyniki do Excela używając przycisku eksportu

### Raporty PDF

Dla każdego wyniku weryfikacji możesz wygenerować szczegółowy raport PDF zawierający:
- Parametry wyszukiwania (NIP/REGON i konto bankowe)
- Status weryfikacji
- Dane firmy (nazwa, adres, NIP, REGON)
- Wszystkie zarejestrowane konta bankowe (szukane konto wyróżnione)

## 🛠️ Technologie

- **[SvelteKit](https://kit.svelte.dev/)** - Framework aplikacji webowych
- **[TypeScript](https://www.typescriptlang.org/)** - Bezpieczne typowanie
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS typu utility-first
- **[jsPDF](https://github.com/parallax/jsPDF)** - Generowanie PDF
- **[XLSX](https://github.com/SheetJS/sheetjs)** - Obsługa plików Excel
- **[Svelte French Toast](https://svelte-french-toast.com/)** - Powiadomienia toast

## 📋 Dostępne skrypty

- `yarn dev` - Uruchom serwer deweloperski
- `yarn build` - Zbuduj wersję produkcyjną
- `yarn preview` - Podgląd wersji produkcyjnej
- `yarn test` - Uruchom wszystkie testy (jednostkowe + integracyjne)
- `yarn test:unit` - Uruchom testy jednostkowe
- `yarn test:integration` - Uruchom testy integracyjne Playwright
- `yarn check` - Sprawdź typy Svelte
- `yarn lint` - Sprawdź kod
- `yarn format` - Sformatuj kod za pomocą Prettier

## 🧪 Testowanie

Projekt zawiera:
- **Testy jednostkowe**: Używając Vitest do funkcji pomocniczych
- **Testy integracyjne**: Używając Playwright do testów E2E

Uruchom testy:
```bash
yarn test
```

## 🏗️ Struktura projektu

```
NIPBankVerifier/
├── src/
│   ├── lib/
│   │   ├── components/     # Komponenty Svelte
│   │   ├── models/         # Definicje typów TypeScript
│   │   └── utilities/      # Funkcje pomocnicze
│   ├── routes/             # Trasy SvelteKit
│   └── app.html            # Szablon HTML
├── static/                 # Zasoby statyczne
├── tests/                  # Pliki testowe
└── ...pliki konfiguracyjne
```

## 🌐 Dokumentacja API

Aplikacja wykorzystuje oficjalne API Białej Listy Ministerstwa Finansów:

**Endpoint**: `https://wl-api.mf.gov.pl/api/search/{typ}/{wartość}?date={data}`

Gdzie:
- `{typ}`: `nip` lub `regon`
- `{wartość}`: Numer NIP lub REGON
- `{data}`: Data w formacie YYYY-MM-DD

**Uwaga**: Nie wymaga klucza API - jest to publiczne API udostępnione przez polski rząd.

## 📝 Walidacja danych wejściowych

- **NIP**: 10-cyfrowy numer
- **REGON**: 9 lub 14-cyfrowy numer
- **Konto bankowe**: 26-cyfrowy numer (polski IBAN bez kodu kraju)

Wszystkie dane wejściowe automatycznie usuwają spacje, myślniki i podkreślenia.

## 🚢 Wdrożenie

Aplikacja jest skonfigurowana do wdrożenia na Cloudflare Pages przy użyciu [`@sveltejs/adapter-cloudflare`](https://kit.svelte.dev/docs/adapter-cloudflare).

Aby wdrożyć:
```bash
yarn build
```

Wynik kompilacji będzie w katalogu `.svelte-kit/cloudflare`.

## 📄 Licencja

Ten projekt jest licencjonowany na licencji MIT - szczegóły w pliku [LICENSE.txt](LICENSE.txt).

## 👤 Autor

Rafał Szczerba (rs.szczerba@hotmail.com)

## 🤝 Wkład

Kontrybucje, zgłoszenia problemów i propozycje funkcji są mile widziane!

## ⚠️ Zastrzeżenie

Ta aplikacja korzysta z publicznie dostępnych danych Ministerstwa Finansów. Zawsze weryfikuj krytyczne informacje przez oficjalne kanały. Dokładność danych zależy od oficjalnego API i częstotliwości jego aktualizacji.

## 📞 Wsparcie

W przypadku pytań lub problemów, proszę otworzyć zgłoszenie w repozytorium.

---

**Uwaga**: To nieoficjalne narzędzie i nie jest powiązane ani zatwierdzone przez Ministerstwo Finansów.