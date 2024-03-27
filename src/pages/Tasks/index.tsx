'use client';

import dynamic from 'next/dynamic';

const TaskTable = dynamic(() => import('@/src/widgets/TaskTable'), {
  ssr: false,
});

const TaskPage = () => <TaskTable />;

export default TaskPage;
