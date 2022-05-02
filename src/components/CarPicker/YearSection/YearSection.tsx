import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {
    List,
    ListSubheader,
    ListItemText,
    ListItem,
    Divider,
    ListItemIcon,
    Box
} from '@mui/material'
import { CarOption } from 'types/searchTypes';

interface Props {
    year: string,
    models: CarOption[]
}

const CustomSubheader = ({ year }: { year: string }) => (
    <>
        <ListSubheader children={year} />
        <Divider />
    </>
)

const YearSection = ({ year, models }: Props) => {
    return (
        <List dense subheader={<CustomSubheader year={year} />} >
            {
                models
                    .sort((a, b) => b.count - a.count)
                    .map(({ brandName, modelName, count }) => (
                        <ListItem key={`${brandName}${modelName}${count}`}>
                            <ListItemIcon>
                                <DirectionsCarIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Box fontWeight={500} children={`${brandName} ${modelName}`} />}
                                secondary={`Пропозицій: ${count}`}
                            />
                        </ListItem>
                    ))
            }
        </List>
    )
}

export default YearSection;
