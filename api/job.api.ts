import axios from 'axios';

const rapidApiUrl = process.env.EXPO_PUBLIC_RAPID_API_URL;
const rapidApiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY;
const rapidApiHost = process.env.EXPO_PUBLIC_RAPID_API_HOST;

type JobRequest = {
  query: string;
  page?: number;
  num_pages?: number;
  date_posted?: string;
  remote_jobs_only?: boolean;
  employment_types?: string;
  job_titles?: string;
};

export const searchJobFromQuery = async ({
  query,
  page = 1,
  num_pages = 5,
  date_posted = 'all',
  remote_jobs_only = false,
  employment_types,
  job_titles,
}: JobRequest) => {
  const options = {
    method: 'GET',
    url: rapidApiUrl,
    params: {
      query: query,
      page: page,
      num_pages: num_pages,
      date_posted: date_posted,
      remote_jobs_only: remote_jobs_only,
      employment_types: employment_types,
      job_titles: job_titles,
    },
    headers: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': rapidApiHost,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getJobById = async (job_id: string) => {
  const options = {
    method: 'GET',
    url: rapidApiUrl,
    params: {
      job_id: job_id,
    },
    headers: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': rapidApiHost,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
