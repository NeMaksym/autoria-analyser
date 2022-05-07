import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {
    List,
    ListSubheader,
    ListItemText,
    ListItem,
    Divider,
    ListItemIcon,
    Box,
    Link
} from '@mui/material'
import { CarOption } from 'types/searchTypes';
import getSearchLink from 'utils/getSearchLink';
import { CustomParams, Gearbox } from 'types/searchParamsTypes';


const CustomSubheader = ({ year }: { year: string }) => (
    <>
        <ListSubheader children={year} />
        <Divider />
    </>
)

interface Props {
    year: string,
    models: CarOption[],
    filters: CustomParams,
    gearbox: Gearbox,
}

const YearSection = ({ year, models, filters, gearbox }: Props) => (
    <List dense subheader={<CustomSubheader year={year} />} >
        {
            models
                .sort((a, b) => b.count - a.count)
                .map(({ year, brandId, brandName, modelId, modelName, count }) => (
                    <ListItem key={`${brandName}${modelName}${count}`}>
                        <ListItemIcon>
                            <DirectionsCarIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={
                                        filters?.price_do
                                            ? getSearchLink(year, brandId, modelId, filters.price_do, gearbox)
                                            : '#'
                                    }
                                >
                                    <Box fontWeight={500} children={`${brandName} ${modelName}`} />
                                </Link>
                            }
                            secondary={`Пропозицій: ${count}`}
                        />
                    </ListItem>
                ))
        }
    </List>
)

export default YearSection;
