export const getGreeting = () => {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 0 && hours < 12) {
    return 'UserTitles_Morning';
  } else if (hours >= 12 && hours < 18) {
    return 'UserTitles_Afternoon';
  } else {
    return 'UserTitles_Evening';
  }
};
