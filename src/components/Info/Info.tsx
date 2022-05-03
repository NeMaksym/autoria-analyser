import { useState, SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
    Typography,
    AccordionDetails as MuiAccordionDetails,
    Accordion as MuiAccordion,
    AccordionProps,
    AccordionSummary as MuiAccordionSummary,
    AccordionSummaryProps
} from "@mui/material"

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Info = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mt: 2 }}>
                Питання та Відповіді
            </Typography>

            <Typography variant="h6">
                Загальні
            </Typography>

            {/* {What is} */}
            <Accordion expanded={expanded === 'general1'} onChange={handleChange('general1')}>
                <AccordionSummary>
                    <Typography>
                        Що таке "autoRia Analyser?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Аналізатор - це інструмент, який візуально зображає авторинок України в реальному часі.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {What for} */}
            <Accordion expanded={expanded === 'general2'} onChange={handleChange('general2')}>
                <AccordionSummary>
                    <Typography>
                        Для чого потрібен аналізатор?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Головна мета - це позбутися необхідності гортати autoria годинами. Замість цього, аналізатор за лічені хвилини підкаже
                        на які саме авто слід дивитися.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {How} */}
            <Accordion expanded={expanded === 'general3'} onChange={handleChange('general3')}>
                <AccordionSummary>
                    <Typography>
                        Як працює аналізатор?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom>
                        1. Ви визначаєтесь з бажаними параметрами (бюджет, тип палива тощо) <br />
                        2. Аналізатор шукає оголошення на autoRia.ua і збирає статистику <br />
                        3. Аналізатор <i>показує</i> яке найліпше авто можна придбати
                    </Typography>
                    <Typography>
                        Обирати найліпше авто можна самостійно за допомогою графіків або ж скориставшись алгоритмом автопідбору,
                        який підкаже конкретну марку і модель.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Typography variant="h6" mt={1}>
                Розділ "Графіки"
            </Typography>

            {/* {How does graphs work} */}
            <Accordion expanded={expanded === 'graphs1'} onChange={handleChange('graphs1')}>
                <AccordionSummary>
                    <Typography>
                        Як працює розділ "Графіки"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom>
                        Аналізатор шукає оголошення на autoRia.ua, збирає статистику і будує інформативні графіки.
                    </Typography>
                    <Typography gutterBottom>
                        Для початку, визначтесь із сумою, яку ви готові витратити на авто. Введіть її в поле "Ціна до".
                        Потім, за бажанням, визначте додаткові параметри (об’єм двигуна тощо). Через секунду графіки почнуть оновлюватися.
                    </Typography>
                    <Typography>
                        Далі справа за вами. Дивіться на графіках, які авто пропонує ринок під ваш запит. Обирайте найкраще.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {By Year} */}
            <Accordion expanded={expanded === 'graphs2'} onChange={handleChange('graphs2')}>
                <AccordionSummary>
                    <Typography>
                        Що показує графік "За роком викуску"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom>
                        Кількість активних оголошень, розподілені за роком випуску.
                    </Typography>
                    <Typography gutterBottom>
                        Напівпрозорим кольором зображена загальна кількість оголошень на ринку, залежно від року випуску.
                        Повним кольором зображено кількість оголошень із застосуванням фільтрів.
                    </Typography>
                    <Typography>
                        Таким чином бачимо, авто якого року слід шукати.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {By Region} */}
            <Accordion expanded={expanded === 'graphs3'} onChange={handleChange('graphs3')}>
                <AccordionSummary>
                    <Typography >
                        Що показує графік "За регіоном"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom>
                        Кількість активних оголошень, розподілені за областями.
                    </Typography>
                    <Typography gutterBottom>
                        Напівпрозорим кольором зображена загальна кількість оголошень на ринку.
                        Повним кольором зображено кількість оголошень із застосуванням фільтрів.
                    </Typography>
                    <Typography>
                        Таким чином бачимо, в яких регіонах найбільший вибір авто.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {By Brand} */}
            <Accordion expanded={expanded === 'graphs4'} onChange={handleChange('graphs4')}>
                <AccordionSummary>
                    <Typography>
                        Що показує графік "За брендом"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Авто якої марки найбільше представлені на ринку, залежно від застосованих фільтрів.
                        Результати показують ТОП-25 за кількістю оголошень.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {By Model} */}
            <Accordion expanded={expanded === 'graphs5'} onChange={handleChange('graphs5')}>
                <AccordionSummary>
                    <Typography>
                        Що показує графік "За моделлю"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom>
                        Авто якої моделі найбільше представлені на ринку.
                    </Typography>
                    <Typography>
                        Щоб побачити цей графік, натисніть на стовпчик з брендом на графіку "За брендом".
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {Gearbox distribution} */}
            <Accordion expanded={expanded === 'graphs6'} onChange={handleChange('graphs6')}>
                <AccordionSummary>
                    <Typography>
                        Навіщо потрібно "Показати співвідношення механіки та автомату"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Авто старші за 10 р. можуть мати зовсім мало пропозицій на автоматичній коробці.
                        В таких ситуаціях корисно бачити розподілення на власні очі.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Typography variant="h6" mt={1}>
                Розділ "Автопідбір"
            </Typography>

            {/* {How does carpicker work} */}
            <Accordion expanded={expanded === 'carpicker1'} onChange={handleChange('carpicker1')}>
                <AccordionSummary>
                    <Typography>
                        Як працює розділ "Автопідбір"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom>
                        1. Ви визначаєте параметри авто (бюджет, тип палива тощо)
                        2. На цих параметрах аналізатор шукає найсвіжіші авто на ринку <br />
                        3. Аналізатор залишає лише ті варіанти, за якими є достатня кількість пропозицій на ринку
                    </Typography>
                    <Typography gutterBottom>
                        Тобто ви отримуєте перелік найсвіжіших авто, які можна придбати за ваш бюджет і які мають достатню кількість пропозицій на ринку.
                    </Typography>
                    <Typography>
                        акий підхід економить ваш час, бо тепер непотрібно шукати моделі, яких немає на ринку.
                        А також збільшує ваші шанси обрати нормальне авто, показуючи лише авто серед яких є достатній вибір.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Info;
