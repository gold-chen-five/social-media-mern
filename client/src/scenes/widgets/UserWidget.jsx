import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme } from '@mui/material'
import UserImage from 'components/UserImage'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetUser } from 'hooks/useGetUser'

function UserWidget({userId, picturePath}) {
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)

    const { user } = useGetUser(token, userId)

    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    if(!user)  return null

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user

    return (
       <WidgetWrapper>
            {/* first row */}
            <FlexBetween
                gap='0.5rem'
                pb='1.1rem'
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap='1rem'>
                    <UserImage image={picturePath}/>
                    <Box>
                        <Typography
                            varient='h4'
                            color={dark}
                            fontWeight='500'
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>

                <ManageAccountsOutlined/>
            </FlexBetween>

            <Divider/>

            {/* second row */}
            <Box
                p='1rem 0'
            >
                <Box
                    display='flex'
                    alignItems='center'
                    gap='1rem'
                    mb='0.5rem'
                >
                    <LocationOnOutlined fontSize='large' sx={{ color: main}}/>
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    gap='1rem'
                >
                    <WorkOutlineOutlined fontSize='large' sx={{ color: main}}/>
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider/>

            {/* third row */}
            <Box p='1rem 0'>
                <FlexBetween mb='0.5rem'>
                    <Typography color={medium}>Who's view your profile</Typography>
                    <Typography color={main} fontWeight='500'>{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb='0.5rem'>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight='500'>{impressions}</Typography>
                </FlexBetween>
            </Box>
            
            <Divider/>

            {/* forth row */}
            <Box p='1rem 0'>
                <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>Social profile</Typography>

                <FlexBetween gap='1rem' mb='0.5rem'>
                    <FlexBetween gap='1rem'>
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight='500'>Twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color: main}}/>
                </FlexBetween>

                <FlexBetween gap='1rem'>
                    <FlexBetween gap='1rem'>
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight='500'>Linkin</Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color: main}}/>
                </FlexBetween>
            </Box>
            
       </WidgetWrapper> 
    )
}

export default UserWidget