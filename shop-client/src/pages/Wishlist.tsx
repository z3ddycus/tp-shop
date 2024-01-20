import React from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProductCard } from '../components';
import { useAppContext } from '../context';
import { ProductService } from '../services';
import { Product } from '../types';
export default function Wishlist() {
    const { setLoading } = useAppContext();
    const [products, setProducts] = useState<Product[] | null>(null);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [pageSelected, setPageSelected] = useState<number>(0);

    const getProducts = () => {
        setLoading(true);
        ProductService.getProducts(pageSelected, 9)
            .then((res) => {
                setProducts(res.data.content);
                setCount(res.data.totalPages);
                setPage(res.data.pageable.pageNumber + 1);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getProducts();
    }, [pageSelected]);

    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageSelected(value - 1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <Typography variant="h2">Les produits likés</Typography>
            <Grid container alignItems="center" rowSpacing={3} columnSpacing={3}>
                {products
                    ?.filter((product) => product.isLiked === true)
                    .map((product) => (
                        <Grid item key={product.id} xs={4}>
                            <ProductCard product={product} displayShop={true} />
                        </Grid>
                    ))}
            </Grid>
            {/* Pagination */}
            {products?.length !== 0 ? (
                <Pagination count={count} page={page} siblingCount={1} onChange={handleChangePagination} />
            ) : (
                <Typography variant="h5" sx={{ mt: -1 }}>
                    Aucun produit correspondant
                </Typography>
            )}
        </Box>
    );
}
