document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".content");
    const swipeContainer = document.getElementById("swipeContainer");
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close");
    const searchInput = document.getElementById("citySearch");
    const cityList = document.getElementById("cityList");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const text1 = document.getElementById("text1");
    const text2 = document.getElementById("text2");
    const text3 = document.getElementById("text3");
    const audioPlayer = document.getElementById("audioPlayer");
    const audioSource = document.getElementById("audioSource");
    const tabBox = document.querySelector(".tab_box");

    const cityData = [
        { name: "London LHR", timezone: "Europe/London", kazakh: "Лондон қаласына, Хитроу халықаралық", kazakh2:"Лондон", 
            russian: "Хитроу, Лондон", russian2:"Лондоне", english: "Haethrow international airport, London", english2:"London", audio: "london.mp3" },
        { name: "Almaty ALA", timezone: "Asia/Almaty", kazakh: "Алматы қаласына, халықаралық", kazakh2:"Алматы", 
            russian: "Алматы", russian2:"Алматы", english:"international airport Almaty", english2:"Almaty", audio: "london.mp3" },
        { name: "Amsterdam AMS", timezone: "Europe/Amsterdam", kazakh: "Амстердам қаласына, Схипхол халықаралық", kazakh2:"Амстердам", 
            russian: "Схипхол, Амстердам", russian2:"Амстердаме", english: "Schiphol international airport of Amsterdam", english2:"Amsterdam", audio: "london.mp3" },
        { name: "Antalya AYT", timezone: "Asia/Istanbul", kazakh: "Анталия қаласына, халықаралық", kazakh2:"Анталия", 
            russian: "Анталия", russian2:"Анталии", english:"international airport Antalya", english2:"Antalya", audio: "london.mp3" },    
        { name: "Astana NQZ", timezone: "Asia/Almaty", kazakh: "Ақтау қаласына, халықаралық", kazakh2:"Ақтау", 
            russian: "Нурсултан Назарбаев, Астана.", russian2:"Астане", english: "Astana Nursultan Nazarbayev international airport", english2:"Astana", audio: "london.mp3" },
        { name: "Aqtau SCO", timezone: "Asia/Almaty", kazakh: "Ақтау қаласына, халықаралық", kazakh2:"Ақтау", 
            russian: "Ақтау", russian2:"Ақтау", english:"international airport Aqtau", english2:"Aqtau", audio: "london.mp3" },
        { name: "Atyrau GUW", timezone: "Asia/Almaty", kazakh: "Атырау қаласына, Хиуаз Доспанова атындағы халықаралық", kazakh2:"Атырау", 
            russian: "имени Хиуаз Доспановой, Атырау.", russian2:"Атырау", english: "Atyrau international airport named after Hiuaz Dospanova", english2:"Atyrau", audio: "london.mp3" },
        { name: "Aqtobe AKX", timezone: "Asia/Almaty", kazakh: "Ақтөбе қаласына, Алия Молдагулова атындағы халықаралық", kazakh2:"Ақтөбе", 
            russian: "имени Алии Молдагуловой, Ақтөбе.", russian2:"Ақтөбе", english:"Aqtobe international airport named after Aliya Moldagulova.", english2:"Aqtobe", audio: "london.mp3" },
        { name: "Abu Dhabi AUH", timezone: "Asia/Dubai", kazakh: "Абу Даби қаласына, шейх Зайд атындағы халықаралық", kazakh2:"Абу Даби", 
            russian: "имени шейха Зайда, Абу Даби.", russian2:"Абу Даби", english: "Zayed international airport, Abu Dhabi.", english2:"Abu Dhabi", audio: "london.mp3" },
        { name: "Baku GYD", timezone: "Asia/Baku", kazakh: "Баку қаласына, Гейдар Алиев халықаралық", kazakh2:"Баку", 
            russian: "Гейдар Алиев, Баку.", russian2:"Баку", english:"Geidar Aliyev international airport Baku.", english2:"Baku", audio: "london.mp3" },
        { name: "Bangkok BKK", timezone: "Asia/Bangkok", kazakh: "Бангкок қаласына, Суварнабхуми халықаралық", kazakh2:"Бангкок", 
            russian: "Суварнабхуми, Бангкок.", russian2:"Бангкоке", english:"Suvarnabhumi international airport Bangkok.", english2:"Bangkok", audio: "london.mp3" },
        { name: "Bishkek FRU", timezone: "Asia/Bishkek", kazakh: "Бишкек қаласына, Манас халықаралық", kazakh2:"Бишкек", 
            russian: "Манас, Бишкек.", russian2:"Бишкеке", english:"Manas international airport Bishkek.", english2:"Bishkek", audio: "london.mp3" },
        { name: "Bodrum BJV", timezone: "Asia/Istanbul", kazakh: "Бодрум қаласына, Милас халықаралық", kazakh2:"Бодрум", 
            russian: "Милас, Бодрум.", russian2:"Бодруме", english:"Milas international airport Bodrum.", english2:"Bodrum", audio: "london.mp3" },
        { name: "Batumi BUS", timezone: "Asia/Tbilisi", kazakh: "Батуми қаласына, Александр Картвели халықаралық", kazakh2:"Батуми", 
            russian: "Милас, Бодрум.", russian2:"Батуми", english:"Alexander Kartveli international airport, Batumi.", english2:"Batumi", audio: "london.mp3" },
        { name: "Colombo CMB", timezone: "Asia/Colombo", kazakh: "Коломбо қаласына, Бандаранайке халықаралық", kazakh2:"Коломбо", 
            russian: "Бандаранайке, Коломбо.", russian2:"Коломбо", english:"Bandaranaike international airport, Colombo.", english2:"Colombo", audio: "london.mp3" },
        { name: "Delhi DEL", timezone: "Asia/Kolkata", kazakh: "Дели қаласына, Индира Ганди халықаралық", kazakh2:"Коломбо", 
            russian: "Индира Ганди, Дели.", russian2:"Дели", english:"Indira Gandi international airport, Delhi.", english2:"Delhi", audio: "london.mp3" },
        { name: "Doha DOH", timezone: "Asia/Qatar", kazakh: "Доха қаласына, Хамад халықаралық", kazakh2:"Доха", 
            russian: "Хамад, Доха.", russian2:"Доха", english:"Hamad international airport, Doha.", english2:"Doha", audio: "london.mp3" },
        { name: "Dubai DXB", timezone: "Asia/Dubai", kazakh: "Дубай халықаралық", kazakh2:"Дубай", 
            russian: "Дубай.", russian2:"Дубае", english:"Dubai international airport.", english2:"Dubai", audio: "london.mp3" },
        { name: "Dyushanbe DYU", timezone: "Asia/Dyushanbe", kazakh: "Душанбе халықаралық", kazakh2:"Душанбе", 
            russian: "Душанбе.", russian2:"Душанбе", english:"Dyushanbe international airport.", english2:"Dyushanbe", audio: "london.mp3" },
        { name: "Frankfurt Am Main FRA", timezone: "Europe/Berlin", kazakh: "Франкфурт-На-Майне халықаралық", kazakh2:"Франкфурт", 
            russian: "Франкфурт-На-Майне.", russian2:"o Франкфурте", english:"Frankfurt Am Main international airport.", english2:"Frankfurt Am Main", audio: "london.mp3" },
        { name: "Goa GOI", timezone: "Asia/Kolkata", kazakh: "Гоа қаласына, Даболим халықаралық", kazakh2:"Гоа", 
            russian: "Даболим, Гоа.", russian2:"Гоа", english:"Dabolim international airport, Goa.", english2:"Goa", audio: "london.mp3" },
        { name: "Hanover HAJ", timezone: "Europe/Berlin", kazakh: "Ганновер қаласына, Даболим халықаралық", kazakh2:"Ганновер", 
            russian: "Ганновер.", russian2:"Ганновер", english:"Hanover international airport, Goa.", english2:"Hanover", audio: "london.mp3" },
        { name: "Heraklion HER", timezone: "Europe/Athens", kazakh: "Ираклион қаласына, Никос Казандзакис халықаралық", kazakh2:"Ираклион", 
            russian: "Никос Казандзакис, Ираклион.", russian2:"Ираклион", english:"Nikos Kazantzakis international airport, Heraklion.", english2:"Heraklion", audio: "london.mp3" },
        { name: "Hong Kong HKG", timezone: "Asia/Hong_Kong", kazakh: "Гонконг қаласына, Чхеплапкок халықаралық", kazakh2:"Гонконг", 
            russian: "Чхеплапкок, Гонконг.", russian2:"Гонконге", english:"Chek Lap Kok international airport, Hong Kong.", english2:"Hong Kong", audio: "london.mp3" },
        { name: "Incheon ICN", timezone: "Asia/Seoul", kazakh: "Гонконг қаласына, Чхеплапкок халықаралық", kazakh2:"Инчхон", 
            russian: "Инчхон.", russian2:"Инчхоне", english:"Incheon international airport.", english2:"Incheon", audio: "london.mp3" },
        { name: "Ho Chi Minh SGN", timezone: "Asia/Ho_Chi_Minh", kazakh: "Хо Ши Мин қаласына, Таншоннят халықаралық", kazakh2:"Хо Ши Мин", 
            russian: "Таншоннят, Хо Ши Мин.", russian2:"Хо Ши Мине", english:"Tan Son Nhat international airport, Ho Chi Minh.", english2:"Ho Chi Minh", audio: "london.mp3" },
        { name: "Hurghada HRG", timezone: "Africa/Cairo", kazakh: "Хургада халықаралық", kazakh2:"Хургада", 
            russian: "Хургада.", russian2:"Хургадае", english:"Hurghada international airport.", english2:"Hurghada", audio: "london.mp3" },
        { name: "Istanbul IST", timezone: "Africa/Istanbul", kazakh: "Стамбул халықаралық", kazakh2:"Стамбул", 
            russian: "Стамбула.", russian2:"Стамбуле", english:"Istanbul international airport.", english2:"Istanbul", audio: "london.mp3" },
        { name: "Jeddah JED", timezone: "Asia/Riyadh", kazakh: "Джедда қаласына, патша Абдулазиздің атындағы халықаралық", kazakh2:"Джедда", 
            russian: "имени Короля Абдулазиза, Джедда.", russian2:"Джедде", english:"King Abdulaziz international airport, Jeddah.", english2:"Jeddah", audio: "london.mp3" },

        { name: "Kazan KZN", timezone: "Europe/Moscow", kazakh: "Казань қаласына, Габдуллa Тукая халықаралық", kazakh2:"Казань", 
            russian: "Габдуллы Тукая, Казань.", russian2:"Казане", english:"Gabdulla Tuqay international airport, Kazan.", english2:"Kazan", audio: "london.mp3" },

        { name: "Karaganda KGF", timezone: "Asia/Almaty", kazakh: "Караганда қаласына, Сары–Арка халықаралық", kazakh2:"Караганда", 
            russian: "Сары–Арка, Караганда.", russian2:"Караганде", english:"Sary Arka international airport, Karaganda.", english2:"Karaganda", audio: "london.mp3" },

        { name: "Kostanay KSN", timezone: "Asia/Almaty", kazakh: "Костанай қаласына, Ахмет Байтұрсынұлы халықаралық", kazakh2:"Костанай", 
            russian: "Ахметa Байтурсыновa, Костанай.", russian2:"Костанай", english:"Akhmet Baitursynuly international airport, Kostanay.", english2:"Kostanay", audio: "london.mp3" },

        { name: "Kyzylorda KZO", timezone: "Asia/Almaty", kazakh: "Кызылорда қаласына, Коркыт Ата халықаралық", kazakh2:"Кызылорда", 
            russian: "Коркыт Ата, Кызылорда.", russian2:"Кызылорде", english:"Korkyt Ata international airport, Kyzylorda.", english2:"Kyzylorda", audio: "london.mp3" },

        { name: "Kuala Lumpur KUL", timezone: "Asia/Kuala_Lumpur", kazakh: "Куала-Лумпур халықаралық", kazakh2:"Куала-Лумпур", 
            russian: "Куала-Лумпур.", russian2:"Куала-Лумпуре", english:"Kuala Lumpur international airport.", english2:"Kuala Lumpur", audio: "london.mp3" },

        { name: "Male MLE", timezone: "Indian/Maldives", kazakh: "Мале қаласына, Велана халықаралық", kazakh2:"Мале", 
            russian: "Велана, Мале.", russian2:"Мале", english:"Velana international airport, Male.", english2:"Male", audio: "london.mp3" },

        { name: "Medinah MED", timezone: "Asia/Riyadh", kazakh: "Медина қаласына, Мұхаммед Бин Абдулазиз ханза атындағы халықаралық", kazakh2:"Медина", 
            russian: "имени принца Мухаммеда Бин Абдул Азиза, Медина.", russian2:"Медине", english:"Prince Mohammed Bin Abdulaziz international airport, Medinah.", english2:"Medinah", audio: "london.mp3" },
    
        { name: "Moscow DME", timezone: "Europe/Moscow", kazakh: "Мәскеу қаласына, Домоде́дово - Михаил Ломоносов атындағы халықаралық", kazakh2:"Мәскеу", 
            russian: "Домоде́дово имени Михаила Ломоносова, Москва.", russian2:"Москве", english:"Domodedovo - Mikhail Lomonosov international airport, Moscow.", english2:"Moscow", audio: "london.mp3" },

        { name: "Moscow SVO", timezone: "Europe/Moscow", kazakh: "Мәскеу қаласына, Шереметьево - Александр Пушкин атындағы халықаралық", kazakh2:"Мәскеу", 
            russian: "Шереметьево - имени Александра Пушкина, Москва.", russian2:"Москве", english:"Domodedovo - Sheremetyevo - Alexander Pushkin international airport, Moscow.", english2:"Moscow", audio: "london.mp3" },

        { name: "Novosibirsk OVB", timezone: "Asia/Novosibirsk", kazakh: "Новосибирск қаласына, Толмачёво халықаралық", kazakh2:"Новосибирск", 
            russian: "Толмачёво, Новосибирск.", russian2:"Новосибирске", english:"Tolmachevo international airport, Novosibirsk.", english2:"Novosibirsk", audio: "london.mp3" },

        { name: "Paris CDG", timezone: "Europe/Paris", kazakh: "Париж қаласына, Шарль-Де-Голль халықаралық", kazakh2:"Париж", 
            russian: "Шарль-Де-Голль, Париж.", russian2:"Париже", english:"Charles-De-Gaulle international airport, Paris.", english2:"Paris", audio: "london.mp3" },

        { name: "Pavlodar PWQ", timezone: "Asia/Almaty", kazakh: "Павлодар халықаралық", kazakh2:"Павлодар", 
            russian: "Павлодара.", russian2:"Павлодаре", english:"Pavlodar international airport.", english2:"Pavlodar", audio: "london.mp3" },

        { name: "Petropavl PPK", timezone: "Asia/Almaty", kazakh: "Петропавловск халықаралық", kazakh2:"Петропавловск", 
            russian: "Петропавловска.", russian2:"Петропавловске", english:"Petropavl international airport.", english2:"Petropavl", audio: "london.mp3" },

        { name: "Pekin PEK", timezone: "Asia/Shanghai", kazakh: "Бейжің Шоуду халықаралық", kazakh2:"Бейжің", 
            russian: "Шоуду, Пекин.", russian2:"Пекине", english:"Beijing Shoudu international airport.", english2:"Beijing", audio: "london.mp3" },

        { name: "Phu Quoc PQC", timezone: "Asia/Ho_Chi_Minh", kazakh: "Фукуок халықаралық", kazakh2:"Фукуок", 
            russian: "Фукуок.", russian2:"Фукуоке", english:"Phu Quoc international airport.", english2:"Phu Quoc", audio: "london.mp3" },

        { name: "Phuket HKT", timezone: "Asia/Bangkok", kazakh: "Пхукет халықаралық", kazakh2:"Пхукет", 
            russian: "Пхукет.", russian2:"Пхукете", english:"Phuket international airport.", english2:"Phuket", audio: "london.mp3" },
    
        { name: "Podgorica TGD", timezone: "Europe/Podgorica", kazakh: "Подгорица халықаралық", kazakh2:"Подгорица", 
            russian: "Подгорица.", russian2:"Подгорице", english:"Podgorica international airport.", english2:"Podgorica", audio: "london.mp3" },

        { name: "Saint Petersburg LED", timezone: "Europe/Podgorica", kazakh: "Санкт-Петербург қаласына, Пулково халықаралық", kazakh2:"Санкт-Петербург", 
            russian: "Пулково, Санкт-Петербург.", russian2:"Санкт-Петербурге", english:"Pulkovo international airport, Saint Petersburg.", english2:"Saint Petersburg", audio: "london.mp3" },
        
        { name: "Sharm-el-Sheikh SSH", timezone: "Africa/Cairo", kazakh: "Шарм-Эль-Шейх халықаралық", kazakh2:"Шарм-Эль-Шейх", 
            russian: "Шарм-Эль-Шейх.", russian2:"Шарм-Эль-Шейхе", english:"Sharm-el-Sheikh international airport.", english2:"Sharm-el-Sheikh", audio: "london.mp3" },

        { name: "Shymkent CIT", timezone: "Asia/Almaty", kazakh: "Шымкент халықаралық", kazakh2:"Шымкент", 
            russian: "Шымкент.", russian2:"Шымкенте", english:"Shymkent international airport.", english2:"Shymkent ", audio: "london.mp3" },

        { name: "Samarkand SKD", timezone: "Asia/Samarkand", kazakh: "Самарканд халықаралық", kazakh2:"Самарканд", 
            russian: "Самарканд.", russian2:"Самарканде", english:"Samarkand international airport.", english2:"Samarkand", audio: "london.mp3" },

        { name: "Sanya SYX", timezone: "Asia/Shanghai", kazakh: "Санья Феникс халықаралық", kazakh2:"Санья", 
            russian: "Санья Феникс.", russian2:"Санья", english:"Sanya Phoenix international airport.", english2:"Sanya", audio: "london.mp3" },

        { name: "Taraz DMB", timezone: "Asia/Almaty", kazakh: "Тараз қаласына, Аулие-Ата халықаралық", kazakh2:"Тараз", 
            russian: "Аулие-Ата, Тараз.", russian2:"Таразе", english:"Aulie-Ata international airport, Taraz.", english2:"Taraz", audio: "london.mp3" },

        { name: "Tashkent TAS", timezone: "Asia/Tashkent", kazakh: "Ташкент қаласына, Ислам Каримов халықаралық", kazakh2:"Ташкент", 
            russian: "Ислам Каримов, Ташкент.", russian2:"Ташкенте", english:"Islam Karimov international airport, Tashkent.", english2:"Tashkent", audio: "london.mp3" },

        { name: "Tbilisi TBS", timezone: "Asia/Tbilisi", kazakh: "Тбилиси қаласына, Шота Руставели халықаралық", kazakh2:"Тбилиси", 
            russian: "Шота Руставели, Тбилиси.", russian2:"Тбилиси", english:"Shota Rustaveli international airport, Tbilisi.", english2:"Tbilisi", audio: "london.mp3" },

        { name: "Tehran IKA", timezone: "Asia/Tehran", kazakh: "Тегеран қаласына, Имама Хомейни халықаралық", kazakh2:"Тегеран", 
            russian: "Имама Хомейни, Тегеран.", russian2:"Тегеране", english:"Imam Khomeini international airport, Tehran.", english2:"Tehran", audio: "london.mp3" },

        { name: "Tel Aviv TLV", timezone: "Asia/Jerusalem", kazakh: "Тель-Авив қаласына, Бе́н Гурио́н халықаралық", kazakh2:"Тель-Авив", 
            russian: "Бе́н Гурио́н, Тель-Авив.", russian2:"Тель-Авиве", english:"Ben Gurion international airport, Tel Aviv.", english2:"Tel Aviv", audio: "london.mp3" },

        { name: "Ust-Kamenogorsk UKK", timezone: "Asia/Almaty", kazakh: "Өскемен қаласына, халықаралық", kazakh2:"Өскемен", 
            russian: "Усть-Каменогорск.", russian2:"Усть-Каменогорске", english:"Ust-Kamenogorsk.", english2:"Ust-Kamenogorsk", audio: "london.mp3" },

        { name: "Uralsk URA", timezone: "Asia/Almaty", kazakh: "Орал қаласына, Маншук Маметова атындағы халықаралық", kazakh2:"Уральск", 
            russian: "имени Маншук Маметовой, Уральск.", russian2:"Уральске", english:"named after Manshuk Mametova international airport, Oral.", english2:"Oral", audio: "london.mp3" },

        { name: "Urumqi URC", timezone: "Asia/Urumqi", kazakh: "Урумчи қаласына, Дивопу халықаралық", kazakh2:"Урумчи", 
            russian: "Дивопу, Урумчи.", russian2:"Урумчи.", english:"Divopu international airport, Urumqi.", english2:"Urumqi", audio: "london.mp3" },

        { name: "Urumqi URC", timezone: "Asia/Urumqi", kazakh: "Урумчи қаласына, Дивопу халықаралық", kazakh2:"Урумчи", 
            russian: "Дивопу, Урумчи.", russian2:"Урумчи.", english:"Divopu international airport, Urumqi.", english2:"Urumqi", audio: "london.mp3" },

        { name: "Zhezkazgan DZN", timezone: "Asia/Urumqi", kazakh: "Жезқазған халықаралық", kazakh2:"Жезқазған", 
            russian: "Жезказган.", russian2:"Жезказгане.", english:"Zhezkazgan international airport.", english2:"Zhezkazgan", audio: "london.mp3" },

        { name: "Mumbai BOM", timezone: "Asia/Kolkata", kazakh: "Мумбаи қаласына, Чатрапати Шиваджи халықаралық", kazakh2:"Мумбаи", 
            russian: "Чатрапати Шиваджи, Мумбаи.", russian2:"Мумбае.", english:"Chhatrapati Shivaji Maharaj international airport.", english2:"Mumbai", audio: "london.mp3" },

    ];


    modal.querySelector(".modal-content").style.maxHeight = "80vh";
    modal.querySelector(".modal-content").style.overflowY = "auto";

    // Переключение по кнопкам
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => switchTab(index));
    });

    function switchTab(index) {
        tabs.forEach(tab => tab.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        tabs[index].classList.add("active");
        contents[index].classList.add("active");

        activeIndex = index;
    }

    // Инициализация Hammer.js
    const hammer = new Hammer(swipeContainer);

    hammer.on("swipeleft", () => {
        if (activeIndex < tabs.length - 1) switchTab(activeIndex + 1);
    });

    hammer.on("swiperight", () => {
        if (activeIndex > 0) switchTab(activeIndex - 1);
    });

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            contents[index].classList.add("active");
        });
    });

    document.querySelectorAll(".list li").forEach(item => {
        item.addEventListener("click", () => {
            const subList = item.querySelector(".sub-list");
            if (subList) {
                subList.style.display = subList.style.display === "block" ? "none" : "block";
            }
        });
    });

    document.querySelectorAll(".sub-list li").forEach(item => {
        item.addEventListener("click", () => {
            modalTitle.textContent = item.dataset.title;
            modalDesc.textContent = item.dataset.desc;
            text1.textContent = item.dataset.text1;
            text2.textContent = item.dataset.text2;
            text3.textContent = item.dataset.text3;

            if (item.dataset.audio) {
                audioSource.src = "audio/" + item.dataset.audio; // путь к файлу
                audioPlayer.load(); // загрузить новый аудиофайл
            }
            
            modalDesc.innerHTML = item.dataset.desc.replace(/\|/g, "<hr>");
            text1.innerHTML = item.dataset.text1.replace(/\|/g, "<hr>");
            text2.innerHTML = item.dataset.text2.replace(/\|/g, "<hr>");
            text3.innerHTML = item.dataset.text3.replace(/\|/g, "<hr>");

            text1.innerHTML = item.dataset.text1
            .replace(/\|\|/g, "<strong>") // Заменяем || на <strong>
            .replace(/\|/g, "</strong><hr>"); // Закрываем <strong> перед новой строкой и добавляем <hr>
            text2.innerHTML = item.dataset.text2
            .replace(/\|\|/g, "<strong>") // Заменяем || на <strong>
            .replace(/\|/g, "</strong><hr>"); // Закрываем <strong> перед новой строкой и добавляем <hr>
            text3.innerHTML = item.dataset.text3
            .replace(/\|\|/g, "<strong>") // Заменяем || на <strong>
            .replace(/\|/g, "</strong><hr>"); // Закрываем <strong> перед новой строкой и добавляем <hr>


            modal.style.display = "block"; // открыть модальное окно
        });
    });

    // Закрытие модального окна
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        audioPlayer.pause(); // Остановить аудио при закрытии
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            audioPlayer.pause();
        }
    });



// Функция для обновления списка городов при вводе
searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase();
    cityList.innerHTML = "";
    cityList.style.display = "block"; // <-- добавляем восстановление отображения списка
    
    if (query.length > 0) {
        const filteredCities = cityData.filter(city => city.name.toLowerCase().includes(query));
        
        filteredCities.forEach(city => {
            const li = document.createElement("li");
            li.textContent = city.name;
            li.style.background = "#cddfff";
            li.style.padding = "10px";
            li.style.cursor = "pointer";
            li.style.transition = "background 0.2s";
            li.style.listStyle = "none";
            li.style.fontSize = "16px";
            li.style.color = "#333";
            li.style.borderBottom = "1px solid #eee";
            
            li.addEventListener("mouseenter", () => {
                li.style.background = "#cddfff";
            });
            li.addEventListener("mouseleave", () => {
                li.style.background = "#cddfff";
            });
            
            li.addEventListener("click", () => {
                cityList.style.display = "none";
                openCityModal(city);
            });
            cityList.appendChild(li);
        });
    }
});

function openCityModal(city) {
    modalTitle.textContent = city.name;
    modalDesc.textContent = "Current time: " + new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit',
        timeZone: city.timezone,
        hourCycle: 'h23'
    }).format(new Date());
    
    text1.innerHTML = "Құрметті Ханымдар мен мырзалар!<hr>" 
    + city.kazakh + " әуежайына қош келдініздер.<hr>Сіздердің кауіпсіздігіңіз үшін «Белдікті бекітіңіз» деген көрсеткіш сөнгенше орындарыңызда отыруларыңызды өтінеміз.<hr>Жүк сөресін ашарда сақ болыңыздар.<hr>Шығар алдында байқап қараңыздар, заттарыңыз қалып қоймасын.<hr>Жергілікті уақыт " + new Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit', timeZone: city.timezone, hourCycle: 'h23' }).format(new Date()) + "<hr>Ауа температурасы___градус жылы/нөлден төмен.<hr>(жаңбыр/қар жауып тұр, жел, тұман, бұлтты, күн шығып тұр)<hr>«Эйр Астана» әуекомпаниясын таңдағандарыңызға алғыс білдіреміз және Сіздерге "+city.kazakh2+" қаласында жақсы уақыт өткізулеріңізге тілектеспіз!<hr>Келесі кездескенше!<hr>Ұшақтан шығарда абай болыңыздар." ;

    text2.innerHTML = "Уважаемые Дамы и господа!<hr>Добро пожаловать в международный аэропорт " 
    + city.russian + "<hr>В целях вашей безопасности просим вас оставаться на своих местах до отключения табло «Пристегните ремни».<hr>Будьте осторожны при открытии багажных полок.<hr>Пожалуйста, не забывайте свои вещи в салоне.<hr>Местное время " + new Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit', timeZone: city.timezone, hourCycle: 'h23' }).format(new Date()) + "<hr>Температура воздуха __ градусов выше/ниже нуля<hr>(идет дождь/снег, ветряно, туманно,облачно, солнечно)<hr>Мы благодарим вас за полет авиакомпанией «Эйр Астана» и желаем вам прекрасного пребывания в "+ city.russian2 +".<hr>До скорой встречи!<hr>Будьте осторожны при выходе из самолета.";
    
    text3.innerHTML = "Welcome to " 
    + city.english + ".<hr>For your own safety, please remain seated until the seatbelt sigh is turned off.<hr>Please be careful when opening the luggage bins.<hr>Be sure you haven’t forgotten your belongings.<hr>Local time is "+ new Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit', timeZone: city.timezone, hourCycle: 'h23' }).format(new Date()) +"<hr>And the outside temperature is __ degrees below/above zero centigrade.<hr>(It is snowing/raining/windy/foggy outside)<hr>Thank you for flying with Air Astana.<hr>We wish you pleasant stay in "+ city.english2 +" and looking forward to see you soon!<hr>Please be careful when leaving the aircraft";
    
    audioSource.src = city.audio;
    audioPlayer.load();
    modal.style.display = "block";
}



// Закрытие модального окна
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Закрытие окна при клике вне него
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

    
});
