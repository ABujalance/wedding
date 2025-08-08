import { Skeleton, Stack, List, ListItem } from '@mui/material';
import { FC } from 'react';

export const InviteSkeleton: FC = () => {
  return (
    <Stack sx={{ width: '100%' }} gap={2} paddingX="15%">
      <Stack gap={1}>
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
        <List sx={{ width: '100%', padding: 0 }}>
          {/* Generate 2-4 skeleton guest items */}
          {[60, 45, 55].map((widthPercent, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <Skeleton
                variant="text"
                width={`${widthPercent}%`}
                sx={{ maxWidth: '200px' }}
                height={24}
              />
            </ListItem>
          ))}
        </List>
      </Stack>

      {/* Skeleton for BusInfo section */}
      <Stack gap={1}>
        <Skeleton
          variant="text"
          width="50%"
          sx={{ maxWidth: '200px' }}
          height={32}
        />
        <Skeleton variant="rectangular" width="100%" height={80} />
      </Stack>
    </Stack>
  );
};
