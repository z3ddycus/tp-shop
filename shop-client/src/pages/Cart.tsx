import { Box, Button, Paper, Typography } from '@mui/material';
import { useShoppingCart } from '../hooks/useShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { formatterLocalizedProduct } from '../utils';
import { useAppContext } from '../context';

const Cart = () => {
    const { items, removeItem } = useShoppingCart();
    const { locale } = useAppContext();

    return (
        <>
            <Typography variant="h2">Mon panier</Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '30px',
                    marginTop: '50px',
                }}
            >
                {items.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    items.map((item, index) => {
                        const product = formatterLocalizedProduct(item, locale);
                        return (
                            <Paper
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px',
                                    width: '100%',
                                }}
                            >
                                <Typography variant="h6">{product.name}</Typography>
                                <Button variant="contained" color="error" onClick={() => removeItem(item)}>
                                    <RemoveShoppingCartIcon />
                                    SUPPRIMER DU PANIER
                                </Button>
                            </Paper>
                        );
                    })
                )}
            </Box>
        </>
    );
};

export default Cart;
