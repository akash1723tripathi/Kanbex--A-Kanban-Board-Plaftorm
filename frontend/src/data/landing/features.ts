import type { FeaturesSection } from '../types';

export const featuresSection: FeaturesSection = {
  eyebrow: 'A better project management workflow',
  header: 'Turn scattered work into steady progress',
  description:
    'Kanbex gives teams a clear visual project management workspace to capture tasks, assign ownership, and see what moves next—without chasing updates across chat and spreadsheets.',
  reassurance:
    'Built for focused work, transparent collaboration, and projects that keep moving.',
  features: [
    {
      id: 'precision',
      icon: 'Target',
      title: 'Capture work where everyone can see it',
      description:
        'Turn ideas, requests, and action items into organized tasks with owners, due dates, labels, and context.',
    },
    {
      id: 'collaborate',
      icon: 'Users',
      title: 'Align your team around priorities',
      description:
        'Keep responsibilities and conversations attached to the work, so every teammate knows what matters now.',
    },
    {
      id: 'track',
      icon: 'BarChart3',
      title: 'Track progress from start to finish',
      description:
        'Move work across flexible Kanban boards, spot blockers early, and keep projects on schedule.',
    },
  ],
  secondary: {
    dark: {
      eyebrow: 'Visual project management',
      title: 'Every project has a next move.',
      description:
        'Kanbex brings tasks, owners, files, and deadlines into one focused view—so your team can spend less time coordinating and more time delivering.',
    },
    light: {
      title: 'Clarity that compounds.',
      description:
        'From daily task planning to complex project coordination, build a workflow your team can actually keep up with.',
    },
  },
  preview: {
    tags: ['Product Design', 'Creative', 'Critical', 'Draft', 'Demo'],
    members: [
      {
        name: 'Devashish Sen',
        role: 'UI Designer',
        avatar: '/images/hero/avatar-robert.png',
      },
      {
        name: 'Himanshu Verma',
        role: 'Lead Creative',
        avatar: '/images/hero/avatar-henry.png',
      },
    ],
    progress: {
      title: 'Project Velocity',
      percentage: 86,
      comparison: '+12% compared to last week',
    },
  },
};
