import { Typography, Divider } from "@mui/material";

const Info = () => (
    <>
        <Divider />
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mt: 2 }}>
            Питання та Відповіді
        </Typography>

        {/* {What is} */}
        <Typography variant="h6" component="h3" gutterBottom>
            Що таке "autoRia Analyser?
        </Typography>
        <Typography variant="body1" gutterBottom>
            Аналізатор - це інструмен, який візуально відображає авторинок України в реальному часі.
        </Typography>

        {/* {What for} */}
        <Typography variant="h6" component="h3" gutterBottom>
            Для чого потрібен аналізатор?
        </Typography>
        <Typography variant="body1" gutterBottom>
            Щоб в пару кліків зрозуміти, яке найліпше авто можна придбати в Україні, відштовхуючись від бюджету і побажань.
        </Typography>

        {/* {How does it work} */}
        <Typography variant="h6" component="h3" gutterBottom>
            Як працює аналізатор?
        </Typography>
        <Typography variant="body1" gutterBottom>
            Аналізатор шукає оголошення на autoRia.ua, збирає статистику і будує інформативні графіки.
        </Typography>
        <Typography variant="body1" gutterBottom>
            Для початку, визначтесь із сумою, яку ви готові витратити на авто. Введіть її в поле "Ціна до".
            Потім, за бажанням, визначте додаткові параметри (об’єм двигуна, тощо). Через секунду графіки автоматично оновляться.
            Дочекавшись завантаження, дивіться, які авто пропонує ринок під ваш запит.
        </Typography>

        {/* {By Year} */}
        <Typography variant="h6" component="h3" gutterBottom>
            Що показує графік "За роком викуску"?
        </Typography>
        <Typography variant="body1" gutterBottom>
            Кількість активних оголошень, розподеліні за роком випуску.
        </Typography>
        <Typography variant="body1" gutterBottom>
            Напівпрозорим кольором зображена загальна кількість оголошень на ринку, залежно від року випуску.
            Повним кольором зображено кількість оголошень із застосуванням фільтрів.
        </Typography>
        <Typography variant="body1" gutterBottom>
            Таким чином бачимо, авто якого року слід шукати.
        </Typography>

        {/* {By Region} */}
        <Typography variant="h6" component="h3" gutterBottom>
            Що показує графік "За регіоном"?
        </Typography>
        <Typography variant="body1" gutterBottom>
            Кількість активних оголошень, розподілені за областями.
        </Typography>
        <Typography variant="body1" gutterBottom>
            Напівпрозорим кольором зображена загальна кількість оголошень на ринку.
            Повним кольором зображено кількість оголошень із застосуванням фільтрів.
        </Typography>
        <Typography variant="body1" gutterBottom>
            Таким чином бачимо, в яких регіонах найбільший вибір авто.
        </Typography>

        {/* {By Brand} */}
        <Typography variant="h6" component="h3" gutterBottom>
            Що показує графік "За брендом"?
        </Typography>
        <Typography variant="body1" gutterBottom>
            Авто якої марки найбільше представлені на ринку, залежно від застосованих фільтрів.
            Результати показують ТОП-25 за кількістю оголошень.
        </Typography>

        {/* {Gearbox distribution} */}
        <Typography variant="h6" component="h3" gutterBottom>
            Навіщо потрібно "Показати розподілення АКПП до МКПП?
        </Typography>
        <Typography variant="body1" gutterBottom>
            Авто старші за 10р. можуть мати зовсім мало пропозицій на АКПП.
            В таких ситуаціях користо бачити розподілення на власні очі.
        </Typography>
    </>
)

export default Info;
