import { Box, Stack } from '@mui/material';
import { priceFormatter } from '../utils';

/**
 * The PriceDisplayer component's props.
 */
type PriceDisplayerProps = {
    /**
     * The price to display, if null nothing is displayed.
     */
    price?: number | null;

    /**
     * The reduction price, if null only the original price is displayed.
     */
    reduction?: number | null;
};

/**
 * Display a price.
 */
const PriceDisplayer = ({ price, reduction }: PriceDisplayerProps) => {
    // Price is null
    if (price == null) {
        return <></>;
    }

    // Reduction is null (only show the price)
    if (reduction == null) {
        return <span>{priceFormatter(price)}</span>;
    }

    // Show the price and the reduction
    return (
        <Stack direction="row" spacing={1.5} sx={{ display: 'inline-block' }}>
            <Box component="span" sx={{ fontSize: '0.8em', color: 'gray', textDecorationLine: 'line-through' }}>
                {priceFormatter(price)}
            </Box>
            <Box component="span">{priceFormatter(reduction)}</Box>
        </Stack>
    );
};

export default PriceDisplayer;
