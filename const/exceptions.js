export const serverErrors = {
  incorrectLogin: "Podano błędne dane logowania.",

  invalidSeasonInClub: "Jeden klub nie mógł grać dwa razy w tym samym sezonie.",
  invalidSeasonClubInPlayer:
    "Jedna zawodniczka nie mógła grać dwa razy w tym samym sezonie w tej samej lidze.",
  invalidDateSeason: "Data 'od' musi być przed datą 'po'.",

  serverError: "Serwer error.",

  leagueNotFound: "Taka liga nie istnieje w bazie danych.", //"Ligi o tym ID nie znaleziono w bazie danych", "Taka liga nie istnieje."
  seasonNotFound: "Taki sezon nie istnieje w bazie danych.", //"Taki sezon nie istnieje.", "Sezonu nie znaleziono w bazie danych"
  clubNotFound: "Klubu nie znaleziono w bazie danych", //"Taki klub nie istnieje." , "Klub o takiej nazwie nie istnieje w bazie danych."
  playerNotFound: "Zawodniczki o takim id nie znaleziono w bazie danych",
  profileNotFound: "Ten użytkownik nie ma profilu", // Profilu nie znaleziono w bazie danych

  clubsNotFound: "Nie ma ani jednego klubu w bazie danych.",
  leaguesNotFound: "Nie ma ani jednej ligi w bazie danych.",
  playersNotFound: "Nie ma ani jednej zawodniczki w bazie danych.",
  profilesNotFound: "W bazie danych nie ma profili",
  seasonsNotFound: "Nie ma ani jednego sezonu w bazie danych.",

  userAlreadyExists: "Użytkownik o podanym emailu już istnieje.",
  seasonAlreadyExists: "Taki sezon już istnieje w bazie danych.", //"Taki sezon już istnieje."
  leagueAlreadyExists: "Taka liga już istnieje w bazie danych.",
};

export const validate = {
  email: "Proszę podaj prawidłowego maila.", // "Proszę o podanie prawidłowego maila."
  password: "Proszę podaj prawidłowe hasło.",
  userFirstName: "Proszę o podanie swojego imienia",
  userLastName: "Proszę o podanie swojego nazwiska.",
  insecurePassword:
    "Słabe hasło! Wprowadź kombinację przynajmniej sześciu liter i cyfr.", // i znaków interpunktycjnych.',
  clubName: "Nazwa klubu jest wymagana.",
  leagueName: "Nazwa ligi jest wymagana.",

  seasonName: "Nazwa sezonu jest wymagana.",
  seasonFrom: "Podanie daty 'od' jest wymagane.",
  seasonTo: "Podanie daty 'do' jest wymagane.",

  leagueNameCurrent: "Podanie aktualnej ligi jest wymagane.",
  seasonNameCurrent: "Podanie aktualnego sezonu jest wymagane.",

  logo: "Logo musi być linkiem do zdjęcia.",

  playerFirstName: "Imię zawodniczki jest wymagane.",
  playerLastName: "Nazwisko zawodniczki jest wymagane.",
  playerClubInformations:
    "Podanie kilku informacji o aktualnym klubie zawodniczki jest wymagane.",
  playerLeague:
    "Podanie informacji o aktualnej lidze zawodniczki jest wymagane.",
  playerSeason:
    "Podanie informacji o aktualnym sezonie zawodniczki jest wymagane.",
  playerClub: "Podanie nazwy aktualnego klubu zawodniczki jest wymagane.",
};
