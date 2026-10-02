'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchApi } from '../lib/api-client';

export function useCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchApi('/courses');
      setCourses(response.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return { courses, loading, error, refetch: loadCourses };
}

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchApi('/jobs');
      setJobs(response.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return { jobs, loading, error, refetch: loadJobs };
}

export function useUserProfile() {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchApi('/user/profile');
      setProfile(response.data || null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return { profile, loading, error, refetch: loadProfile };
}
