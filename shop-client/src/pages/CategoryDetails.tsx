import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext, useToastContext } from '../context';
import { CategoryService } from '../services';
import { Category } from '../types';
import { ActionButtons } from '../components';

const CategoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setLoading } = useAppContext();
    const { setToast } = useToastContext();
    const [category, setCategory] = useState<Category | null>(null);

    const getCategory = (categoryId: string) => {
        CategoryService.getCategory(categoryId).then((res) => {
            setCategory(res.data);
        });
    };

    useEffect(() => {
        id && getCategory(id);
    }, [id]);

    const handleDelete = () => {
        setLoading(true);
        id &&
            CategoryService.deleteCategory(id)
                .then(() => {
                    navigate('/category');
                    setToast({ severity: 'success', message: 'La catégorie a bien été supprimée' });
                })
                .catch(() => {
                    setToast({ severity: 'error', message: 'Une erreur est survenue lors de la suppresion' });
                })
                .finally(() => {
                    setLoading(false);
                });
    };

    const handleEdit = () => {
        navigate(`/category/edit/${id}`);
    };

    if (!category) return <></>;

    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                padding: 4,
            }}
        >
            <ActionButtons handleDelete={handleDelete} handleEdit={handleEdit} />
            <Box sx={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center'}}>
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                    {category.name}
                </Typography>
                <Box sx={{width:'250px'}}>
                    <img onError={(ev) => ev.currentTarget.src=`${process.env.REACT_APP_DEFAULT_CATEGORY_IAMGE_URL}`}
                    src={category.imageUrl || `${process.env.REACT_APP_DEFAULT_CATEGORY_IAMGE_URL}`} style={{height:'auto',width:'100%'}}/>
                </Box>
            </Box>
            
        </Paper>
    );
};

export default CategoryDetails;
