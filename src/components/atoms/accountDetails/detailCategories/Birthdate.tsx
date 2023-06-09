import getDateFromTimestamp from '@/common/misc/dateManagment/getDateFromTimestamp';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import updateUserBirthdate from '@/services/user/updateUserBirthDate';
import { ITimestamp } from '@/types/timestamp';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Dayjs } from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import TextAccountDetail from '../accountDetailItems/TextAccountDetail';
import { CategoryProps, CustomEditComponentProps, ITextAccountDetail } from '../types';

export default function Birthdate({
  userData,
  iconSize,
  showPlaceholder,
  preventEdit,
  sx,
  ...rootProps
}: CategoryProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const { birthDate: birthTimestamp } = userData.about;
  const birthDate = birthTimestamp ? getDateFromTimestamp(birthTimestamp.seconds) : null;
  const accountDetail: ITextAccountDetail = {
    label: 'Birth date',
    value: birthDate ? `${birthDate.month}, ${birthDate.day}, ${birthDate.year}` : null,
    icon: 'birthday-cake',
    placeholder: `Didn't specified`,
    editPlaceholder: 'Add birth date',
  };

  return (
    <TextAccountDetail
      userId={userData.id}
      editHandler={async (value: ITimestamp) => {
        if (!loggedUser) return;
        await updateUserBirthdate({ userId: loggedUser.id, value });
      }}
      preventEdit={preventEdit}
      accountDetail={accountDetail}
      showPlaceholder={showPlaceholder}
      CustomEditComponent={CustomDatePicker}
      iconSize={iconSize}
      sx={sx}
      {...rootProps}
    />
  );
}

const CustomDatePicker = ({ setEditInputValue }: CustomEditComponentProps<ITimestamp>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Box>
      {isMobile ? (
        <MobileDatePicker autoFocus disableFuture />
      ) : (
        <DesktopDatePicker
          open={isCalendarOpen}
          autoFocus
          onClose={() => setIsCalendarOpen(false)}
          disableFuture
          onChange={(value: Dayjs | null) => {
            if (!value) return;
            const timestamp = Timestamp.now();
            setEditInputValue(timestamp);
          }}
          label='Birth date'
          sx={{
            width: '160px',
            '& .MuiInputBase-input': {
              userSelect: 'none !important',
              cursor: 'pointer',
              caretColor: 'transparent',
              '&::selection': {
                backgroundColor: 'transparent',
              },
            },

            '& fieldset': {
              border: `1px solid ${theme.palette.text.disabled}`,
            },
          }}
          slotProps={{
            textField: {
              onClick: () => {
                setIsCalendarOpen(true);
              },
            },
          }}
        />
      )}
    </Box>
  );
};
