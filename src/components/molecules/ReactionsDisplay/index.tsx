import { Box, ButtonBase, Typography, useMediaQuery, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import useDeserializeReactions from '@/common/misc/userDataManagment/useDeserializeReactions';
import ReactionIcon from '@/components/atoms/ReactionIcon';
import { useFetchLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useState } from 'react';
import ReactionsModal from '../../organisms/AllReactionsModal';
import { ReactionsDisplayProps } from './types';

export default function ReactionsDisplayBox({
  reactions,
  sx,
  emotesCount = 3,
  displayNames = true,
  displayCount = false,
  size = 22,
  ...rootProps
}: ReactionsDisplayProps) {
  const theme = useTheme();
  const { data: user } = useFetchLoggedUserQuery({});
  const userId = user?.id || '';

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const userReaction = reactions?.[userId];

  const { isLoading, reactingUsers, largestByType, reactionsCount, usedReactions } =
    useDeserializeReactions(reactions || {});

  const reactorsToDisplay = reactingUsers.slice(0, 1);
  emotesCount = emotesCount > usedReactions.length ? usedReactions.length : emotesCount;
  displayCount = displayCount && reactionsCount > 0;

  const useCompact = useMediaQuery(theme.breakpoints.down('xs'));
  if (useCompact) {
    displayCount = true;
    displayNames = false;
  }

  if (isLoading || !reactions) return null;
  return (
    <>
      {showModal && <ReactionsModal setShowModal={setShowModal} reactions={reactions} />}
      <StyledRoot {...rootProps} sx={sx}>
        <ButtonBase
          onClick={() => handleShowModal()}
          TouchRippleProps={{
            style: { color: theme.palette.primary.main, opacity: 0.4 },
          }}
          focusRipple
          sx={{
            borderRadius: theme.spacing(3),
            padding: displayNames ? theme.spacing(1.7) : 0,
            position: 'absolute',
            height: '100%',
            left: '-2%',
            width: '104%',
            zIndex: 4,
          }}
        />
        <Box display='flex' sx={{ pr: theme.spacing(0.25), pointerEvents: 'none' }}>
          {largestByType.slice(0, emotesCount).map((reaction, i) => {
            return (
              <ReactionIcon key={reaction.type} src={reaction.icon} zIndex={2 - i} size={size} />
            );
          })}
        </Box>
        <Box
          display='flex'
          ml={theme.spacing(0.5)}
          mt={theme.spacing(0.2)}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          color={theme.palette.text.secondary}>
          {displayNames && (
            <>
              {userReaction ? (
                <Typography variant='subtitle2'>
                  You {reactionsCount > 1 ? `and ${reactionsCount} others` : ''}
                </Typography>
              ) : (
                reactorsToDisplay.map((reactor, i) => {
                  const isLast = reactorsToDisplay.length === i + 1;
                  const userText = [reactor.info.firstName, reactor.info.lastName].join(' ');
                  return (
                    <Box key={reactor.info.id}>
                      {!isLast ? (
                        <Typography variant='subtitle2'>{userText},&nbsp;</Typography>
                      ) : (
                        <>
                          <Typography variant='subtitle2'>
                            {userText}&nbsp;
                            {reactionsCount === 1 ? `and 1 other` : ''}
                            {reactionsCount > 1 ? `and ${reactionsCount} others` : ''}
                          </Typography>
                        </>
                      )}
                    </Box>
                  );
                })
              )}
            </>
          )}
          {displayCount && (
            <Typography pr={theme.spacing(0.8)} variant='body1'>
              {reactionsCount}
            </Typography>
          )}
        </Box>
      </StyledRoot>
    </>
  );
}
