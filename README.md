# Pokedex

## Instalacja

1. Otwórz edytor kodu, sklonuj repozytorium https://github.com/Norbert-2204/Pokedexx.git
2. Wejdź do folderu projektu
3. Zainstanuj zależności

## Uruchamianie

W terminalu odpal json-server na porcie 3000 i npm run dev

## Funkcjonalności

- Tworzenie własnego konta
- Logowanie
- Dodawania do ulubionych, areny czy edycja pokemonów zalogowanego użytkownika

## Użyte technologie

- React
- Vite
- JSON Server

## Konwencje zastosowane w projekcie

- `src/` - główne komponenty react
- `src/components` - komponenty
- `public` - obrazy użyte w projekcie
- `db.json` - baza danych json

- Komponenty React: PascalCase
- Wcięcia: 2 spacje
- Użycie średników: tak
- Zmienne: const by default

- Hooki - useState, useEffect, useContext, useSnackbar, useForm
- Custom hooki - useFetch, useLocaleFetch
- Context - LoggedInProvider, ShowPokemonProvider
- CSS - styled-components i mui material
