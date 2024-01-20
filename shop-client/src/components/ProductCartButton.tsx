import { AddShoppingCart, RemoveShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useShoppingCart } from '../hooks/useShoppingCart';
import { Product } from '../types';

type ProductCardButtonProps = { product: Product };

export default function ProductCardButton({ product }: ProductCardButtonProps) {
    const shoppingCart = useShoppingCart();
    return shoppingCart.hasItem(product) ? (
        <Button
            color="error"
            fullWidth
            onClick={(e) => {
                e.stopPropagation();
                shoppingCart.removeItem(product);
            }}
            startIcon={<RemoveShoppingCart />}
            variant="contained"
        >
            Retirer du panier
        </Button>
    ) : (
        <Button
            color="success"
            fullWidth
            onClick={(e) => {
                e.stopPropagation();
                shoppingCart.addItem(product);
            }}
            startIcon={<AddShoppingCart />}
            variant="contained"
        >
            Ajouter au panier
        </Button>
    );
}
