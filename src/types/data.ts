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
  test_duration?: number;
  test_notice?: string;
  num_of_questions?: number;
  num_of_enrollments: number;
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
  test_duration?: number;
  test_notice?: string;
  num_of_questions?: number;
  num_of_enrollments: number;
};

export type ResourceType = 'video' | 'document' | 'audio';

export type SubTopicType = {
  _id: string;
  title: string;
  description: string;
  topic_id: string;
  created_by: string;
  last_updated_by: string;
  creation_date: Date;
  last_update_date: Date;
  test_duration?: number;
  test_notice?: string;
  num_of_questions?: number;
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
  test_duration?: number;
  test_notice?: string;
  num_of_questions?: number;
};

export type AllowedQuestionTypes = 'input' | 'radio' | 'checkbox' | 'dropdown';
export type AllowedInputTypes = 'number' | 'text';

export type QuestionOptionType = {
  option_value: string;
  isCorrectAnswer?: boolean;
  _id?: string;
};

export type TestType = {
  _id: string;
  topic_id: string;
  sub_topic_id: string;
  title: string;
  question_type: AllowedQuestionTypes;
  question_input_type?: AllowedInputTypes;
  options: QuestionOptionType[];
  created_by: string;
  creation_date: Date;
  last_updated_by: string;
  last_update_date: Date;
};

export type SingleTestType = {
  _id: string;
  topic_id: {
    _id: string;
    title: string;
  };
  sub_topic_id: {
    _id: string;
    title: string;
  };
  title: string;
  question_type: AllowedQuestionTypes;
  question_input_type?: AllowedInputTypes;
  options: QuestionOptionType[];
  created_by: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  creation_date: Date;
  last_updated_by: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  last_update_date: Date;
};

export type LessonType = {
  _id: string;
  title: string;
  description: string;
  topic_id: {
    _id: string;
    title: string;
    description: string;
  };
  sub_topic_id: {
    _id: string;
    title: string;
    description: string;
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
  creation_date: string;
  last_update_date: string;
  document_identifier: string;
  document_url: string;
  audio_identifier: string;
  audio_url: string;
  video_identifier: string;
  video_url: string;
};

export type SingleLessonType = {
  _id: string;
  title: string;
  description: string;
  topic_id: {
    _id: string;
    title: string;
  };
  sub_topic_id: {
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
  creation_date: string;
  last_update_date: string;
  document_identifier: string;
  document_url: string;
  audio_identifier: string;
  audio_url: string;
  video_identifier: string;
  video_url: string;
};

export type StudentType = {
  _id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  personalReferralCode: string;
  isVerified: boolean;
  acceptTermsAndConditions: boolean;
  isNotFreezed?: boolean;
  createdAt: Date;
  verificationCode: string;
  verificationCodeExpires: Date;
  classLevel: string;
  country: string;
  countryState: string;
  gender: string;
  school: string;
  guardianEmail: string;
  guardianFullName: string;
  reportToGuardian: string;
  goal: number;
  numOfReferrals: number;
  referralActivity: {
    userId: string;
    fullName: string;
    subscriptionAmount: number;
    subscriptionPlan: string;
    amountEarned: number;
    createdAt: string;
    _id: string;
  }[];
  referralEarnings: number;
  subscription: {
    plan: string;
    lastPaymentDate: Date;
    nextPaymentDate: Date;
    active: boolean;
    running: boolean;
    gateway: 'paystack' | 'flutterwave';
    token: string;
    settledReferrer: boolean;
  };
  profilePicture: string;
  profilePictureId: string;
};

export type StudentDataFilter =
  | 'registered'
  | 'active'
  | 'deleted'
  | 'subscribed'
  | 'frozen';

export type StudentTestLog = {
  date: Date;
  correct: number;
  questions: number;
  topic_title: string;
  sub_topic_title: string;
};

export interface LessonReportType {
  _id: string;
  title: string;
  allLessons: number;
  takenLessons: number;
}

export interface SingleLessonReportType {
  sub_topics: {
    title: string;
    time: number;
  }[];
  total_time: number;
  allLessons: number;
  takenLessons: number;
}

export interface TopicPerformanceType {
  numOfTests: number;
  questionsGotten: number;
  averageTimePerQuestion: number;
  tests: [
    {
      topic: string;
      sub_topic: string;
      percentage: number;
      expert: boolean;
    },
    {
      topic: string;
      sub_topic: string;
      percentage: number;
      intermediate: boolean;
    }
  ];
  averagePercentageScore: number;
}

export interface AchievementType {
  _id: string;
  name: string;
  notification_message: string;
  badge: string;
  badge_id: string;
  no_of_lessons: number;
  no_of_sub_topics: number;
  no_of_topics: number;
  tests?: {
    no_of_tests: number;
    avg_score: number;
  };
  no_of_days_in_streak: number;
  active: boolean;
  created_by: string;
  creation_date: string;
  last_updated_by: string;
  last_update_date: string;
}

export interface SingleAchievementType {
  tests?: {
    no_of_tests: number;
    avg_score: number;
  };
  _id: string;
  name: string;
  notification_message: string;
  badge: string;
  badge_id: string;
  no_of_lessons: number;
  no_of_sub_topics: number;
  no_of_topics: number;
  no_of_days_in_streak: number;
  active: boolean;
  created_by?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  creation_date: string;
  last_updated_by: string;
  last_update_date: string;
}
