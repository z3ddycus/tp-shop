import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context';
import { FormattedProduct, Product } from '../types';
import { formatterLocalizedProduct, priceFormatter } from '../utils';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { editProduct } from '../services/ProductService';
type Props = {
    product: Product;
    displayShop?: boolean;
};

const ProductCard = ({ product, displayShop = false }: Props) => {
    const navigate = useNavigate();
    const { locale } = useAppContext();
    const [formattedProduct, setFormattedProduct] = useState<FormattedProduct>(
        formatterLocalizedProduct(product, locale),
    );
    const [isRed, setIsRed] = useState(product.isLiked);
    useEffect(() => setFormattedProduct(formatterLocalizedProduct(product, locale)), [locale]);

    const editData = {
        id: product.id,
        price: product.price,
        shop: product.shop,
        categories: product.categories,
        isLiked: isRed,
        localizedProducts: product.localizedProducts,
    };
    return (
        <Card
            sx={{ minWidth: 275, height: displayShop ? 270 : 230, cursor: 'pointer' }}
            onClick={() => navigate(`/product/${formattedProduct.id}`)}
        >
            <CardContent>
                <Typography variant="h4" color="text.primary" gutterBottom>
                    {formattedProduct.name}
                </Typography>
                <Typography variant="h6">Prix : {priceFormatter(formattedProduct.price)}</Typography>
                {formattedProduct.description && (
                    <Typography sx={{ mt: 1.5, maxHeight: 50, overflow: 'hidden' }} color="text.secondary">
                        {formattedProduct.description}
                    </Typography>
                )}
                {displayShop && (
                    <Typography sx={{ mt: 1.5 }}>Boutique : {formattedProduct.shop?.name ?? 'Aucune'}</Typography>
                )}
                <Typography sx={{ mt: 1.5, fontStyle: 'italic' }}>
                    Catégories : {''}
                    {formattedProduct.categories.length === 0
                        ? 'Aucune'
                        : formattedProduct.categories.map((cat, index) => (
                              <span key={cat.id}>
                                  {cat.name}
                                  {index === formattedProduct.categories.length - 1 ? '' : ', '}
                              </span>
                          ))}
                </Typography>
                {/* Heart icon clickable*/}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();

                        setIsRed(!isRed);

                        editProduct(editData).then((res) => {
                            console.log(res.data);
                        });
                    }}
                    color={isRed ? 'error' : 'default'}
                >
                    {isRed ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
