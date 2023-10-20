export type AdminType = {
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
  populatedRoles: {
    _id: string;
    name: string;
    permissions: {
      _id: string;
      name: string;
    }[];
    numOfAdmins: number;
    createdAt: string;
  }[];
};

export type ArtisanType = {
  _id: string;
  userPermissions: ArtisanPermissionType;
  country: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  resetCount: number;
  verificationCount: number;
  sendCodeTo: null;
  email: string;
  fullname: string;
  phone: string;
  ntfToken: string;
  createdAt: string;
  companyName: string;
  firstname: string;
  lastname: string;
};

export type ArtisanPermissionType = {
  login: boolean;
};

export type CustomerType = {
  _id: string;
  userPermissions: CustomerPermissionType;
  country: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  resetCount: number;
  verificationCount: number;
  sendCodeTo: string;
  email: string;
  fullname: string;
  phone: string;
  ntfToken: string;
  createdAt: string;
  firstname: string;
  lastname: string;
  verificationCode: string;
  verificationExpires: string;
  resetExpires: string;
};

export type CustomerPermissionType = {
  login: boolean;
};

export type TicketType = {
  _id: string;
  liveChat: boolean;
  status: 'open' | 'closed';
  files: string[];
  uid: string;
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  comment: string;
  role: string;
  userId: string;
  attendingStaff: {
    _id: string;
    fullname: string;
    phone: string;
    email: string;
  };
  createdAt: string;
};

export type TicketResponseType = {
  _id: string;
  files: string[];
  uid: string;
  ticketId: string;
  attendingStaff: string;
  createdAt: string;
  userId: string;
  fullname: string;
  role: string;
  comment: string;
};

export type NotificationType = {
  _id: string;
  userId: string;
  isRead: boolean;
  category: string;
  identifier: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type ArtisanCategoryType = {
  services: string[];
  _id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  description: string;
};

export type ArtisanBusinessHoursType = {
  _id: string;
  artisan: string;
  friday: {
    openTime: string;
    closeTime: string;
  };
  monday: {
    openTime: string;
    closeTime: string;
  };
  saturday: {
    openTime: string;
    closeTime: string;
  };
  sunday: {
    openTime: string;
    closeTime: string;
  };
  thursday: {
    openTime: string;
    closeTime: string;
  };
  tuesday: {
    openTime: string;
    closeTime: string;
  };
  wednesday: {
    openTime: string;
    closeTime: string;
  };
};

export type ArtisanRatingType = {
  _id: string;
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  totalRatingsCount: number;
  totalRatingsValue: number;
  rating: number;
  createdAt: string;
  artisan: string;
  updatedAt: string;
};

export type ArtisanViewType = {
  _id: string;
  artisan: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  views: number;
};

export type DisputeType = {
  _id: string;
  status: 'open' | 'closed';
  user: {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
  };
  firstname: string;
  role: string;
  model: string;
  artisan: {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
    companyName: string;
  };
  createdBy: string;
  booking: string;
  createdAt: string;
};

export type DisputeResponseType = {
  _id: string;
  files: string[];
  booking: string;
  disputeId: string;
  createdAt: string;
  user: {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
  };
  firstname: string;
  role: string;
  comment: string;
  model: string;
};

export type ClassType = {
  _id: string;
  name: string;
  topics: number;
  subTopics: number;
  users: number;
  createdAt: string;
};

export type RoleType = {
  numOfAdmins: number;
  _id: string;
  name: string;
  permissions: string[];
  createdAt: string;
};

export type PermissionType = {
  _id: string;
  name: string;
};

export type TopicType = {
  _id: string;
  title: string;
  description: string;
  class_id: string;
  sub_topics: [];
  created_by: string;
  last_updated_by: string;
  creation_date: Date;
  last_update_date: Date;
  documents: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: string;
    _id: string;
  }[];
  audios: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: string;
    _id: string;
  }[];

  videos: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: string;
    _id: string;
  }[];
};

export type SingleTopicType = {
  _id: string;
  title: string;
  description: string;
  class_id: {
    _id: string;
    name: string;
  };
  sub_topics: [];
  created_by: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  last_updated_by: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  creation_date: Date;
  last_update_date: Date;
  documents: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];
  audios: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];

  videos: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];
};

export type TopicResourceType = 'videos' | 'documents' | 'audios';

export type SubTopicType = {
  _id: string;
  title: string;
  description: string;
  topic_id: string;
  created_by: string;
  last_updated_by: string;
  creation_date: Date;
  last_update_date: Date;
  documents: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];
  audios: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];

  videos: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];
};

export type SingleSubTopicType = {
  _id: string;
  title: string;
  description: string;
  topic_id: {
    _id: string;
    title: string;
  };
  created_by: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  last_updated_by: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  creation_date: Date;
  last_update_date: Date;
  documents: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];
  audios: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];

  videos: {
    url: string;
    identifier: string;
    uploaded_at: Date;
    uploaded_by: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    _id: string;
  }[];
};
