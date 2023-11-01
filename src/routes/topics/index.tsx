import Topics from '../../pages/topics';
import TopicDetails from '../../pages/topics/details';
import LessonDetails from '../../pages/topics/lessonDetails';
import SubTopicDetails from '../../pages/topics/subtopicDetails';
import { PrivateRoute } from '../utils';

const topicsRoutes = [
  {
    path: '/topics',
    element: (
      <PrivateRoute>
        <Topics />
      </PrivateRoute>
    ),
  },
  {
    path: '/topics/:id',
    element: (
      <PrivateRoute>
        <TopicDetails />
      </PrivateRoute>
    ),
  },
  {
    path: '/topics/sub-topic/:id',
    element: (
      <PrivateRoute>
        <SubTopicDetails />
      </PrivateRoute>
    ),
  },
  {
    path: '/topics/sub-topic/lesson/:id',
    element: (
      <PrivateRoute>
        <LessonDetails />
      </PrivateRoute>
    ),
  },
];

export default topicsRoutes;
