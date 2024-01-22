import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';
import { Box } from '@mui/material';

type Props = {
    category: Category;
};

const CategoryCard = ({ category }: Props) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/category/${category.id}`)}>
            <CardContent sx={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center'}}>
                <Typography variant="h5" color="text.primary" sx={{ textAlign: 'center' }}>
                    {category.name}
                </Typography>
                <Box sx={{width:'100px',height:'100px'}}>
                    <img onError={(ev) => ev.currentTarget.src=`${process.env.REACT_APP_DEFAULT_CATEGORY_IAMGE_URL}`}
                     src={category.imageUrl || `${process.env.REACT_APP_DEFAULT_CATEGORY_IAMGE_URL}`} style={{height:'auto',width:'100%'}}/>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;
