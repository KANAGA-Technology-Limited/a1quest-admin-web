import { PERMISSIONS_TYPE } from './types';

export const PERMISSIONS: PERMISSIONS_TYPE = Object.freeze({
  // Classes
  update_class: 'Update Class',
  delete_class: 'Delete Class',
  create_class: 'Create Class',
  view_class: 'View Class',

  // Roles
  view_role: 'View Role',
  create_role: 'Create Role',
  assign_to_admin: 'Assign To Admin',
  view_roles: 'View Roles',
  delete_role: 'Delete Role',
  view_permissions: 'View Permissions',
  update_role: 'Update Role',

  // Admins
  view_admin: 'View Admin',
  update_admin: 'Update Admin',
  delete_admin: 'Delete Admin',
  create_admin: 'Create Admin',
  view_admins: 'View Admins',

  // Topics
  view_topic: 'View Topic',
  update_topic: 'Update Topic',
  upload_topic_resource: 'Upload Topic Resource',
  remove_topic_resources: 'Remove Topic Resources',
  create_topic: 'Create Topic',
  view_topics: 'View Topics',
  delete_topic: 'Delete Topic',

  // Sub Topic
  view_subtopic: 'View SubTopic',
  update_subtopic: 'Update SubTopic',
  upload_subtopic_resource: 'Upload SubTopic Resource',
  remove_subtopic_resources: 'Remove SubTopic Resources',
  view_subtopics: 'View SubTopics',
  create_subtopic: 'Create SubTopic',
  delete_subtopic: 'Delete SubTopic',

  // Tests
  view_test: 'View Test',
  update_test: 'Update Test',
  delete_test: 'Delete Test',
  view_tests: 'View Tests',
  create_test: 'Create Test',

  // Lessons
  view_lesson: 'View Lesson',
  update_lesson: 'Update Lesson',
  upload_lesson_resource: 'Upload Lesson Resource',
  remove_lesson_resources: 'Remove Lesson Resources',
  delete_lesson: 'Delete Lesson',
  create_lesson: 'Create Lesson',
  view_lessons: 'View Lessons',
});
