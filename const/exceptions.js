export const serverErrors = {
  incorrectLogin: "Podano błędne dane logowania.",

  invalidSeasonInClub: "Jeden klub nie mógł grać dwa razy w tym samym sezonie.",
  invalidSeasonClubInPlayer:
    "Jedna zawodniczka nie mógła grać dwa razy w tym samym sezonie w tej samej lidze.",
  invalidDateSeason: "Data 'od' musi być przed datą 'po'.",
  invalidGameTeams:
    "Dwie takie same drużyny nie mogą grać ze sobą oficjalnego meczu. Proszę o wprowadzenie poprawnych danych.",
  invalidGameDate:
    "Prosze o podanie prawidłowej daty meczu. Musi się zawierać w danym sezonie rozgrywkowym",
  serverError: "Serwer error.",

  leagueNotFound: "Taka liga nie istnieje w bazie danych.", //"Ligi o tym ID nie znaleziono w bazie danych", "Taka liga nie istnieje."
  seasonNotFound: "Taki sezon nie istnieje w bazie danych.", //"Taki sezon nie istnieje.", "Sezonu nie znaleziono w bazie danych"
  clubNotFound: "Klubu nie znaleziono w bazie danych", //"Taki klub nie istnieje." , "Klub o takiej nazwie nie istnieje w bazie danych."
  playerNotFound: "Takiej zawodniczki nie znaleziono w bazie danych", //"Zawodniczki o takim id nie znaleziono w bazie danych"
  profileNotFound: "Ten użytkownik nie ma profilu", // Profilu nie znaleziono w bazie danych
  gameNotFound: "Nie ma meczu o takim id",

  clubsNotFound: "Nie ma ani jednego klubu w bazie danych.",
  leaguesNotFound: "Nie ma ani jednej ligi w bazie danych.",
  playersNotFound: "Nie ma ani jednej zawodniczki w bazie danych.",
  profilesNotFound: "W bazie danych nie ma profili",
  seasonsNotFound: "Nie ma ani jednego sezonu w bazie danych.",
  gamesNotFound: "Nie ma ani jednego meczu w bazie danych.",

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
  leagueName: "Nazwa ligi jest wymagana.", // "Podanie nazwy ligi jest wymagane."

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

  gameHome: "Podanie nazwy drużyny gospodarzy jest wymagane.",
  gameAway: "Podanie nazwy drużyny gości jest wymagane.",
  gameDate: "Prosze o podanie daty meczu.",
  gameRound: "Podanie kolejki meczu jest wymagane.",
  gameRoundMin: "Numer kolejki musi być liczbą i nie moze być mniejszy niz 1.",
  gameShotBy: "Podanie informacji kto strzelił jest obowiązkowe.",
  gameGoalAmount:
    "Podanie liczby goli strzelonych przez tę zawodniczkę jest wymagane.", // "Podanie ilości goli jest obowiązkowe."
  gameGoalAmountMin: "Liczba goli nie moze być mniejsza niz 1.",
  gameShotBy: "Podanie zawodniczki, która strzeliła bramkę jest obowiązkowe.",
};
