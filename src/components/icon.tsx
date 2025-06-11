import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // unutulmuş ekledim

const Icon = ({ iconName }: { iconName: string }) => {

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'SchoolIcon':
        return <SchoolIcon />;
      case 'EmojiEventsIcon':
        return <EmojiEventsIcon />;
      default:
        return <GroupIcon />; // fallback ikon
    }
  };

  return (
    <>
      {getIconComponent(iconName)}
    </>
  );
}

export default Icon;