'use client';

import userAxiosNext from '@/lib/userNextAxios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { data } from './staticFile';

const Upload = ({ url, name }) => {
  const [isLoading, setIsLoading] = useState(false);

  const populate = async () => {
    try {
      setIsLoading(true);
      await userAxiosNext.put(`${url}`, data[name]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed!');
    }
  };

  return (
    <button className="mx-2 border" disabled={isLoading} onClick={populate}>
      {isLoading ? 'Loading..' : 'Upload'}
    </button>
  );
};

export default Upload;
