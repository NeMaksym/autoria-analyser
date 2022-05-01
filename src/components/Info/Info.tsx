import { useState, SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

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

            {/* {What is} */}
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary>
                    <Typography>
                        Що таке "autoRia Analyser?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Аналізатор - це інструмен, який візуально відображає авторинок України в реальному часі.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {What for} */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary>
                    <Typography>
                        Для чого потрібен аналізатор?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Щоб в пару кліків зрозуміти, яке найліпше авто можна придбати в Україні, відштовхуючись від бюджету і побажань.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {How does it work} */}
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary>
                    <Typography>
                        Як працює аналізатор?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Аналізатор шукає оголошення на autoRia.ua, збирає статистику і будує інформативні графіки.
                    </Typography>
                    <Typography>
                        Для початку, визначтесь із сумою, яку ви готові витратити на авто. Введіть її в поле "Ціна до".
                        Потім, за бажанням, визначте додаткові параметри (об’єм двигуна, тощо). Через секунду графіки автоматично оновляться.
                        Дочекавшись завантаження, дивіться, які авто пропонує ринок під ваш запит.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {By Year} */}
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary>
                    <Typography>
                        Що показує графік "За роком викуску"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Кількість активних оголошень, розподеліні за роком випуску.
                    </Typography>
                    <Typography>
                        Напівпрозорим кольором зображена загальна кількість оголошень на ринку, залежно від року випуску.
                        Повним кольором зображено кількість оголошень із застосуванням фільтрів.
                    </Typography>
                    <Typography>
                        Таким чином бачимо, авто якого року слід шукати.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {By Region} */}
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary>
                    <Typography >
                        Що показує графік "За регіоном"?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Кількість активних оголошень, розподілені за областями.
                    </Typography>
                    <Typography>
                        Напівпрозорим кольором зображена загальна кількість оголошень на ринку.
                        Повним кольором зображено кількість оголошень із застосуванням фільтрів.
                    </Typography>
                    <Typography>
                        Таким чином бачимо, в яких регіонах найбільший вибір авто.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* {By Brand} */}
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
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

            {/* {Gearbox distribution} */}
            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary>
                    <Typography>
                        Навіщо потрібно "Показати розподілення АКПП до МКПП?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Авто старші за 10р. можуть мати зовсім мало пропозицій на АКПП.
                        В таких ситуаціях користо бачити розподілення на власні очі.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Info;
