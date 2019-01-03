$(function() {
  transliterate = (
      function() {
          var
              rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
              eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
          ;
          return function(text, engToRus) {
              var x;
              for(x = 0; x < rus.length; x++) {
                  text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
                  text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
              }
              return text;
          }
      }
  )();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let request = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=769be4ff4bfe7fbe18950b758d881665&lang=ru";
      
      $.getJSON(request, function(json) {
        $(".place").html(transliterate(transliterate(json.name), true));
              
        let backgroundUrl = "";
        switch (json.weather[0].main) {
          case "Thunderstorm":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1Zy6KlHDJNvO-pe6YzbO38ZXW_U2Rvgwy";
            break;
          case "Drizzle":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1TrDg_6PNeQWPmTFnNkvJGvX0mie1sVGs";
            break;
          case "Rain":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=18ui8QtAVAnGWqx7zD_0CAMJou48Loohz";
            break;
          case "Snow":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=15ZTmvY91AqzXcTobl_2RVtcssrFyQu7W";
            break;
          case "Clear":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1Gj7o4NVxoWJF8_JfrouOXskAyxY567Db";
            break;
          case "Clouds":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1AoOW9GH4mQovo8gh6krxVJJT44qMjYho";
            break;
          default:
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1ODLZdmdtZdF5-NaMPZdKYptCCduTu3qP";
        }
        let backgroundImage = "url(" + backgroundUrl + ")";
        $("body").css("backgroundImage", backgroundImage);
        
        $("#image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        $("#weather-description").html(json.weather[0].description);
        
        $("#temperature").html(Math.round(json.main.temp - 273.15));
        
        $("#celsius-fahrenheit").on("click", function celsiusFahrenheit() {
          if ($("#celsius-fahrenheit").html() == "В градусах по Фаренгейту") {
            $("#temperature").html(Math.round((json.main.temp - 273.15) * 9 / 5 + 32));
            $("#celsius-fahrenheit").html("В градусах по Цельсию");
            $(".celsius-fahrenheit").html("F");
          } else {
            $("#temperature").html(Math.round(json.main.temp - 273.15));
            $("#celsius-fahrenheit").html("В градусах по Фаренгейту");
            $(".celsius-fahrenheit").html("C");
          }
        });
        
        $("#pressure").html(Math.round(json.main.pressure / 1.332));
        $("#humidity").html(json.main.humidity);
        
        let windDegree = json.wind.deg;
        let windDirection = "";
        switch (true) {
          case (windDegree < 22.5):
            windDrection = "С";
            break;
          case (windDegree < 67.5):
            windDrection = "С-В";
            break;
          case (windDegree < 112.5):
            windDrection = "В";
            break;
          case (windDegree < 157.5):
            windDrection = "Ю-В";
            break;
          case (windDegree < 202.5):
            windDrection = "Ю";
            break;
          case (windDegree < 247.5):
            windDrection = "Ю-З";
            break;
          case (windDegree < 292.5):
            windDrection = "З";
            break;
          case (windDegree < 337.5):
            windDrection = "С-З";
            break;
          default:
            windDrection = "С";
        }
        $("#wind-direction").html(windDrection);
        $("#wind").html(json.wind.speed);
        
        let sunrise = new Date(json.sys.sunrise * 1000);
        let sunset = new Date(json.sys.sunset * 1000);
        $("#sunrise").html(sunrise.getHours() + ":" + (sunrise.getMinutes() < 10 ? "0" : "") + sunrise.getMinutes());
        $("#sunset").html(sunset.getHours() + ":" + (sunset.getMinutes() < 10 ? "0" : "") + sunset.getMinutes());
        
        $("#country").html(json.sys.country);
        $("#longitude").html(json.coord.lon);
        $("#latitude").html(json.coord.lat);
        
        $(".top").delay(1800).fadeTo(1000, 1);
        $(".condition").delay(2300).fadeTo(1000, 1);
        $(".geo").delay(2800).fadeTo(1000, 1);
      });
    });
  }

  $("#change-city").click(function() {
    $("section").fadeTo(200, 0);
    
    let city = $("#city").val();
    let request = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=769be4ff4bfe7fbe18950b758d881665&lang=ru";
      
      $.getJSON(request, function(json) {
        $(".place").html(city);

        window.scrollTo(0, 0);
        
        let backgroundUrl = "";
        switch (json.weather[0].main) {
          case "Thunderstorm":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1Zy6KlHDJNvO-pe6YzbO38ZXW_U2Rvgwy";
            break;
          case "Drizzle":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1TrDg_6PNeQWPmTFnNkvJGvX0mie1sVGs";
            break;
          case "Rain":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=18ui8QtAVAnGWqx7zD_0CAMJou48Loohz";
            break;
          case "Snow":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=15ZTmvY91AqzXcTobl_2RVtcssrFyQu7W";
            break;
          case "Clear":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1Gj7o4NVxoWJF8_JfrouOXskAyxY567Db";
            break;
          case "Clouds":
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1AoOW9GH4mQovo8gh6krxVJJT44qMjYho";
            break;
          default:
            backgroundUrl = "https://drive.google.com/uc?export=view&id=1ODLZdmdtZdF5-NaMPZdKYptCCduTu3qP";
        }
        let backgroundImage = "url(" + backgroundUrl + ")";
        $("body").css("backgroundImage", backgroundImage);

        $("#image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        $("#weather-description").html(json.weather[0].description);

        $("#temperature").html(Math.round(json.main.temp - 273.15));

        $("#celsius-fahrenheit").on("click", function celsiusFahrenheit() {
          if ($("#celsius-fahrenheit").html() == "В градусах по Фаренгейту") {
            $("#temperature").html(Math.round((json.main.temp - 273.15) * 9 / 5 + 32));
            $("#celsius-fahrenheit").html("В градусах по Цельсию");
            $(".celsius-fahrenheit").html("F");
          } else {
            $("#temperature").html(Math.round(json.main.temp - 273.15));
            $("#celsius-fahrenheit").html("В градусах по Фаренгейту");
            $(".celsius-fahrenheit").html("C");
          }
        });

        $("#pressure").html(Math.round(json.main.pressure / 1.332));
        $("#humidity").html(json.main.humidity);

        let windDegree = json.wind.deg;
        let windDirection = "";
        switch (true) {
          case (windDegree < 22.5):
            windDrection = "С";
            break;
          case (windDegree < 67.5):
            windDrection = "С-В";
            break;
          case (windDegree < 112.5):
            windDrection = "В";
            break;
          case (windDegree < 157.5):
            windDrection = "Ю-В";
            break;
          case (windDegree < 202.5):
            windDrection = "Ю";
            break;
          case (windDegree < 247.5):
            windDrection = "Ю-З";
            break;
          case (windDegree < 292.5):
            windDrection = "З";
            break;
          case (windDegree < 337.5):
            windDrection = "С-З";
            break;
          default:
            windDrection = "С";
        }
        $("#wind-direction").html(windDrection);
        $("#wind").html(json.wind.speed);

        let sunrise = new Date(json.sys.sunrise * 1000);
        let sunset = new Date(json.sys.sunset * 1000);
        $("#sunrise").html(sunrise.getHours() + ":" + (sunrise.getMinutes() < 10 ? "0" : "") + sunrise.getMinutes());
        $("#sunset").html(sunset.getHours() + ":" + (sunset.getMinutes() < 10 ? "0" : "") + sunset.getMinutes());

        $("#country").html(json.sys.country);
        $("#longitude").html(json.coord.lon);
        $("#latitude").html(json.coord.lat);

        $(".top").delay(1800).fadeTo(1000, 1);
        $(".condition").delay(2300).fadeTo(1000, 1);
        $(".geo").delay(2800).fadeTo(1000, 1);
      }).fail(function() {
        $("body").html("Введенный город " + city + " не найден. Обновите страницу").css({"background-image": "none", "color": "black"});
      });
    });
  });