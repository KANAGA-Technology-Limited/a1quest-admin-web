export type UserType = {
  _id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  resetCode: string;
  resetExpires: string;
  passwordChangedAt: string;
  roles: string[];
  populatedRoles: [
    {
      _id: string;
      name: string;
      permissions: {
        _id: string;
        name: string;
      }[];
      numOfAdmins: number;
      createdAt: string;
    }
  ];
};

export type UncertainObjectType = {
  [key: string]: any;
};
