'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface JobsProps {
  searchQuery: string;
}

const url = "https://job-portal-backend-oy7g.onrender.com/jobs"
const token = process.env.API_KEY

const Jobs: React.FC<JobsProps> = ({ searchQuery }) => {
  const [jobs, setJobs] = useState([])

  const fetchcoreUser = async(url: string) => {
    axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Token": token,
            crossDomain: true
        }
    }).then(response => {
            const data = response.data;
            if (data.length > 0) {
                setJobs(data);
            } else {
                throw new Error("No data found");
            }
            console.log(data)
        })
        .catch(error => {
            console.error(error);
        });
  }

  useEffect(() => {
      fetchcoreUser(url);
  }, [])

  const jobsData = [
    {
      title: 'UI/UX Designer',
      location: 'New York, NY',
      updatedTime: '2023-10-10T12:34:56Z',
      description: 'UI UX designers create the user interface for an app, website, or other interactive media. Their work includes collaborating with product managers and engineers to gather requirements from users before designing ideas that can be communicated using the storyboards.',
      applyLink: 'https://cutshort.io/jobs/ux-designer-jobs',
    },
    {
      title: 'Frontend Developer',
      location: 'San Francisco, CA',
      updatedTime: '2023-10-16T12:34:56Z',
      description: 'A Front-End Developer is responsible for developing new user-facing features, determining the structure and design of web pages, building reusable codes, optimizing page loading times, and using a variety of markup languages to create the web pages. What makes a good Front End Web Developer?',
      applyLink: 'https://cutshort.io/jobs/frontend-developer-jobs',
    },
    {
      title: 'Backend Developer',
      location: 'Seattle, WA',
      updatedTime: '2023-09-10T12:34:56Z',
      description: 'Backend developer responsibilities include creating, maintaining, testing, and debugging the entire back end of an application or system. This includes the core application logic, databases, data and application integration, API, and other processes taking place behind the scenes.',
      applyLink: 'https://cutshort.io/jobs/backend-developer-jobs',
    },
    {
      title: 'DevOps Engineer',
      location: 'Austin, TX',
      updatedTime: '2023-10-18T12:34:56Z',
      description: 'DevOps (development operations) is a series of practices and processes that help organisations speed up and automate aspects of developing, testing, releasing, and updating software. DevOps engineers are responsible for facilitating this by combining technical expertise with project management and communication skills.',
      applyLink: 'https://cutshort.io/jobs/devops-jobs',
    },
  ];

  const [currentTime, setCurrentTime] = useState(new Date());

  // const filteredJobs = jobsData.filter((job) =>
  //   job.first.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="container mx-auto px-3">
      <div className="grid grid-cols-1 md:grid-cols-4 py-4 gap-y-4 md:gap-x-4">
        {jobs.map(job => (
          <div key={job['_id']} className="bg-[#121212] w-full rounded-lg p-4 text-white">
            <div>
              <h2 className="text-xl font-semibold">{job['title']}</h2>
              <p className="text-gray-500 text-sm mt-1">{job['year']}</p>
              <p className="text-gray-500 text-sm mt-1">{job['company']}</p>
              <p className="text-gray-500 text-sm mt-1">{job['location']}</p>
              <p className="mt-6 text-sm lg:text-justify md:text-center text-justify no-scrollbar" style={{ height: '12rem', overflow: 'scroll' }}>
                {job['desc']}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-auto">
            <a href={job['url']} target="_blank" rel="noopener noreferrer">
                <button className="py-4 px-10 rounded-lg border-none bg-[#242121] hover:bg-[#282727] transition-transform transform hover:scale-105 active:scale-95">
                  Apply Now
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatTime = (updatedTime: string, currentTime: Date) => {
  const jobUpdateTime = new Date(updatedTime);
  const timeDiff = Math.floor((currentTime.getTime() - jobUpdateTime.getTime()) / 1000);
  if (timeDiff < 60) {
    return `${timeDiff} seconds ago`;
  } else if (timeDiff < 3600) {
    return `${Math.floor(timeDiff / 60)} minutes ago`;
  } else if (timeDiff < 86400) {
    return `${Math.floor(timeDiff / 3600)} hours ago`;
  } else {
    return `${Math.floor(timeDiff / 86400)} days ago`;
  }
};

export default Jobs;
