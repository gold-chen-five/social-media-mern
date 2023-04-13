import { Box } from "@mui/system";

const base_url = process.env.REACT_APP_BASE_URL

const UserImage = ({ image, size="60px"}) => {
    return (
        <Box
            width={size}
            height={size}
        >
            <img
                style={{ objectFit: 'cover', borderRadius: '50%'}}
                width={size}
                height={size} 
                alt='user'
                src={`${base_url}/assets/${image}`}
            />
        </Box>
    )
}

export default UserImage