import { useQuery } from '@tanstack/react-query';
import { JobRequest, getJobById, searchJobFromQuery } from 'api/job.api';

export const useGetJobBySearch = ({
  query,
  page = 1,
  num_pages = 5,
  date_posted = 'all',
  remote_jobs_only = false,
  employment_types,
  job_titles,
}: JobRequest) => {
  const JobRequestBody = {
    query,
    page,
    num_pages,
    date_posted,
    remote_jobs_only,
    employment_types,
    job_titles,
  };

  const JobBySearch = useQuery({
    queryKey: ['job'],
    queryFn: () => searchJobFromQuery(JobRequestBody),
    enabled: JobRequestBody.query !== '',
  });

  const status = JobBySearch.status;

  const jobData = JobBySearch.data;

  return { jobData, status };
};

export const useGetJobById = (job_id: string) => {
  const JobById = useQuery({
    queryKey: ['job'],
    queryFn: () => getJobById(job_id),
  });

  const status = JobById.status;

  return { JobById, status };
};
