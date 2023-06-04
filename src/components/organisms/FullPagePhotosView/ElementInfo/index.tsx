import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import getEntriesLength from '@/common/misc/objectManagment/getEntriesLength';
import isObjectEmpty from '@/common/misc/objectManagment/isObjectEmpty';
import useGetUsersPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import HorizontalContentDevider from '@/components/atoms/ContentDeviders/HorizontalContentDevider';
import ActionButtons from '@/components/molecules/ActionButtons';
import Comments from '@/components/molecules/Comments';
import PostOwnerInfoDisplay from '@/components/molecules/PostOwnerInfoDisplay';
import ReactionsDisplay from '@/components/molecules/ReactionsDisplay';
import { NAVBAR_HEIGHT } from '../../NavBar';
import RightSection from '../../NavBar/RightSection';
import { ElementInfoProps } from './types';

export default function ElementInfo({
  element,
  type,
  userReaction,
  setUserReaction,
  sx,
  ...rootProps
}: ElementInfoProps) {
  const theme = useTheme();
  const commentsLength = getEntriesLength(element.comments);
  const owner = useGetUsersPublicData(element.ownerId);
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack
        direction='row'
        width='100%'
        height={NAVBAR_HEIGHT}
        justifyContent='flex-end'
        sx={{
          [theme.breakpoints.down('lg')]: {
            display: 'none',
          },
        }}>
        <RightSection mr={theme.spacing(0.5)} />
      </Stack>
      <HorizontalContentDevider />
      <PostOwnerInfoDisplay
        owner={owner}
        createdAt={element.createdAt}
        mt={theme.spacing(2)}
        mb={theme.spacing(1)}
      />
      <Box mb={theme.spacing(4)}>
        <Typography variant='body1'>{element.text}</Typography>
      </Box>
      <Stack width='100%' direction='row' justifyContent='space-between'>
        {!isObjectEmpty(element.reactions) && (
          <ReactionsDisplay
            userReaction={userReaction}
            reactions={element.reactions}
            displayCount
            displayNames={false}
          />
        )}
        <Box display='flex'>
          <Typography pr={theme.spacing(1)} variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {commentsLength === 0
              ? ''
              : commentsLength > 1
              ? `${commentsLength} comments`
              : `${commentsLength} comment`}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {element.shareCount} shares
          </Typography>
        </Box>
      </Stack>
      <ActionButtons
        userReaction={userReaction}
        setUserReaction={setUserReaction}
        ownerId={element.ownerId}
        elementId={element.id}
        elementType={type}
        my={theme.spacing(1)}
      />
      <Comments
        element={element}
        elementType={type}
        comments={element.comments}
        maxComments='all'
        displayMode='picture'
      />
    </StyledRoot>
  );
}
