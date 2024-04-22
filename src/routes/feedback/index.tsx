import FeedbackPage from '../../pages/feedback';
import { PrivateRoute } from '../utils';

export const feedbackRoutes = [
  {
    path: '/feedback',
    element: (
      <PrivateRoute>
        <FeedbackPage />
      </PrivateRoute>
    ),
  },
];
