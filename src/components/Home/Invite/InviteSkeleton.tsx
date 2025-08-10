import { Skeleton, Stack, List, ListItem } from '@mui/material';
import { FC } from 'react';

export const InviteSkeleton: FC = () => {
  return (
    <Stack
      sx={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
      gap={2}
      paddingX="20%"
    >
      <Stack gap={1} sx={{ width: '100%', maxWidth: '100%' }}>
        {/* Skeleton for invite ID */}
        <Skeleton
          variant="text"
          width="30%"
          sx={{ maxWidth: '120px' }}
          height={48}
        />

        {/* Skeleton for welcome message */}
        <Skeleton
          variant="text"
          width="70%"
          sx={{ maxWidth: '280px' }}
          height={56}
        />

        {/* Skeleton for invitation count */}
        <Skeleton
          variant="text"
          width="40%"
          sx={{ maxWidth: '150px' }}
          height={24}
        />

        {/* Skeleton for guest list */}
        <List
          sx={{
            width: '100%',
            maxWidth: '100%',
            padding: 0,
            boxSizing: 'border-box',
          }}
        >
          {/* Generate 2-4 skeleton guest items */}
          {[60, 45, 55].map((widthPercent, index) => (
            <ListItem
              key={index}
              sx={{
                paddingLeft: 0,
                paddingRight: 0,
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Skeleton
                variant="text"
                width={`${widthPercent}%`}
                sx={{ maxWidth: '100%', boxSizing: 'border-box' }}
                height={24}
              />
            </ListItem>
          ))}
        </List>
      </Stack>

      {/* Skeleton for BusInfo section */}
      <Stack
        gap={1}
        sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
      >
        <Skeleton
          variant="text"
          width="50%"
          sx={{ maxWidth: '100%', boxSizing: 'border-box' }}
          height={32}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={80}
          sx={{ maxWidth: '100%', boxSizing: 'border-box' }}
        />
      </Stack>
    </Stack>
  );
};
