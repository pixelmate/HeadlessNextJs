import { User as OCUser, UserGroup as OCUserGroup } from 'ordercloud-javascript-sdk';

export const mapUser = (user: OCUser): User => ({
  id: user.ID || '',
  name: user.FirstName,
  companyID: user.CompanyID || '',
  surname: user.LastName,
  email: user.Email,
  phone: user.Phone || '',
  roles: user.AvailableRoles || [],
  active: user.Active,
  username: user.Username,
  xp: {
    HighRank: user.xp.HighRank || '',
    FileNum: user.xp.FileNum || '',
    UserType: user.xp.UserType || '',
    PriceLevel: user.xp.PriceLevel || '',
    IsAutoShip: user.xp.IsAutoShip || false,
  },
});

export const mapUserGroups = (userGroup: OCUserGroup[]): UserGroup => {
  return {
    groupId: userGroup[0]?.ID as string,
  };
};

export const mapToUser = (user: Partial<User>): Partial<OCUser> => ({
  ID: user.id,
  FirstName: user.name,
  LastName: user.surname,
  Email: user.email,
  Phone: user.phone,
  AvailableRoles: user.roles,
  Active: user.active,
  Username: user.username,
  xp: {
    HighRank: user?.xp?.HighRank || '',
    FileNum: user?.xp?.FileNum || '',
    PriceLevel: user?.xp?.PriceLevel || '',
    UserType: user?.xp?.UserType || '',
    IsAutoShip: user?.xp?.IsAutoShip || false,
  },
});
