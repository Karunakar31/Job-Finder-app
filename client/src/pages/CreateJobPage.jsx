import React from 'react';
import { createJob } from '../api/Job';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
// import CreateJobWallpaper from '../assets/jobWallpaper.png';
import ChipsSelection from '../components/ChipsSelector';
import { Tooltip } from 'react-tooltip';

const CreateJobPage = () => {

  const navigate = useNavigate();
  const validJobTypes = ["Full-Time", "Part-Time", "Internship"];
  const validLocationTypes = ["On-Site", "Remote", "Hybrid"];

  const [job, setJob] = useState({
    companyName: "",
    title: "",
    description: "",
    logoUrl: "",
    jobType: "",
    salary: "",
    location: "",
    duration: "11-50",
    locationType: "",
    information: "",
    skills: [],
    additionalInformation: ""
  });

  const handleJobTypeChange = (value) => {
    if (validJobTypes.includes(value)) {
      setJob({ ...job, jobType: value });
    }
  };

  const handleLocationTypeChange = (value) => {
    if (validLocationTypes.includes(value)) {
      setJob({ ...job, locationType: value });
    }
  };

  const handleJobCreate = async (event) => {
    event.preventDefault();
    const response = await createJob(job);
    console.log("handleJobCreate: ", response)
    if (response.status === 201) {
      toast.success('Job added successfully');
      setJob({
        companyName: "",
        title: "",
        description: "",
        logoUrl: "",
        jobType: "",
        salary: "",
        location: "",
        duration: "11-50",
        locationType: "",
        information: "",
        skills: [],
        additionalInformation: ""
      });
    } else {
      toast.error('Error adding job');
    }
  };

  return (
    <div className='flex items-center'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='lg:w-[60%] w-full md:bg-white bg-[#FFEFEF] md:px-16 px-4 md:py-0 py-4 flex flex-col justify-start'>
        <h3 className='md:text-3xl text-xl text-black font-semibold tracking-wide mb-6'>Add job description</h3>

        <form onSubmit={handleJobCreate}>
          <div className='md:my-2 my-1 flex justify-start items-center'>
            <label className='px-3 py-1 md:mr-4 mr-2 md:text-base text-sm font-semibold tracking-wide font-dm w-1/4'>Company Name</label>
            <input
              type="text"
              placeholder='Enter your company name here'
              value={job.companyName}
              className='border border-[#C2C2C2] outline-none rounded-md md:w-[65%] w-[70%] px-4 py-1 placeholder:text-[#ADADAD] placeholder:text-xs font-dm text-black text-sm'
              onChange={(e) => setJob({ ...job, companyName: e.target.value })}
            />
          </div>

          <div
            className='md:my-2 my-1 flex justify-start items-center'
            data-tooltip-id="my-tooltip" data-tooltip-content=".png, .jpg, .jpeg, .svg, .webp accepted formats">
            <label className='px-3 py-1 md:text-base text-sm font-semibold tracking-wide md:mr-4 mr-2  font-dm w-1/4'>Add logo URL</label>
            <input
              type="text"
              value={job.logoUrl}
              placeholder='Enter the link'
              className='border border-[#C2C2C2] outline-none rounded-md md:w-[65%] w-[70%] px-4 py-1 placeholder:text-[#ADADAD] placeholder:text-xs font-dm text-black text-sm'
              onChange={(e) => setJob({ ...job, logoUrl: e.target.value })}

            />
            <Tooltip id="my-tooltip" place="bottom-end" style={{ backgroundColor: "#FF6B6B", color: "white" }} />
          </div>

          <div className='md:my-2 my-1 flex justify-start items-center'>
            <label className='px-3 py-1 md:mr-4 mr-2 md:text-base text-sm font-semibold tracking-wide font-dm w-1/4'>Job position</label>
            <input
              type="text"
              value={job.title}
              placeholder='Enter job position'
              className='border border-[#C2C2C2] outline-none rounded-md md:w-[65%] w-[70%] px-4 py-1 placeholder:text-[#ADADAD] placeholder:text-xs font-dm text-black text-sm'
              onChange={(e) => setJob({ ...job, title: e.target.value })}
            />
          </div>

          <div className='md:my-2 my-1 flex justify-start items-center'>
            <label className='px-3 py-1 md:mr-4 mr-2 md:text-base text-sm font-semibold tracking-wide font-dm w-1/4'>Monthly salary</label>
            <input
              type="number"
              value={job.salary}
              placeholder='Enter Amount in rupees'
              className='border border-[#C2C2C2] outline-none rounded-md md:w-[65%] w-[70%] px-4 py-1 placeholder:text-[#ADADAD] placeholder:text-xs font-dm text-black text-sm'
              onChange={(e) => setJob({ ...job, salary: e.target.value })}
            />
          </div>

          <div className='md:my-2 my-1 flex justify-start items-center'>
            <label className='px-3 py-1 md:mr-4 mr-2 md:text-base text-sm font-semibold tracking-wide font-dm w-1/4'>Job Type</label>
            <div className='relative md:w-[15%] '>
              <select
                value={job.jobType}
                className='w-full outline-none cursor-pointer text-sm px-2 py-1 rounded-md border border-[#CECECE] text-[#9C9C9C]'
                onChange={(e) => handleJobTypeChange(e.target.value)}
              >
                <option>Select</option>
                {validJobTypes.map((type, index) => {
                  return <option key={index}>{type}</option>;
                })}
              </select>
            </div>
          </div>

          <div className='my-2 flex justify-start items-center'>
            <label className='px-3 py-1 md:mr-4 mr-2 md:text-base text-sm font-semibold tracking-wide font-dm w-1/4'>Remote<span className='md:inline-block hidden'>/office</span></label>
            <div className='relative md:w-[15%]'>
              <select
                value={job.locationType}
                className='w-full md:px-2 px-4 py-1 rounded-md border border-[#CECECE] text-[#9C9C9C] outline-none cursor-pointer text-sm'
                onChange={(e) => handleLocationTypeChange(e.target.value)}
              >
                <option>Select</option>
                {validLocationTypes.map((type, index) => {
                  return <option key={index}>{type}</option>;
                })}
              </select>
            </div>
          </div>

          <div className='md:my-2 my-1 flex justify-start items-center'>
            <label className='px-3 py-1 md:mr-4 mr-2 md:text-base text-sm font-semibold tracking-wide font-dm w-1/4'>Location</label>
            <input
              type="text"
              value={job.location}
              placeholder='Enter Location'
              className='border border-[#C2C2C2] outline-none rounded-md md:w-[65%] w-[70%] px-4 py-1 placeholder:text-[#ADADAD] placeholder:text-xs font-dm text-black text-sm'
              onChange={(e) => setJob({ ...job, location: e.target.value })}
            />
          </div>


          <div className='my-2 flex justify-start items-center'>
            <label className='px-3 py-1 md:mr-4 mr-2 md:text-base text-sm font-semibold tracking-widefont-dm w-1/4'>Job Description</label>
            <textarea
              type="text"
              value={job.description}
              placeholder='Type the job description'
              className='border border-[#C2C2C2] outline-none rounded-md md:w-[65%] w-[70%] h-20 px-4 py-1 placeholder:text-[#ADADAD] placeholder:text-xs font-dm text-black resize-none text-sm'
              onChange={(e) => setJob({ ...job, description: e.target.value })}
            />
          </div>

          <div className='my-2 flex justify-start items-center'>
            <label className='px-3 py-1 md:mr-4 mr-2 md:text-base text-sm font-semibold tracking-wide font-dm w-1/4'>About Company</label>
            <textarea
              type="text"
              value={job.information}
              placeholder='Type about your company'
              className='border border-[#C2C2C2] outline-none rounded-md md:w-[65%] w-[70%] h-12 px-4 py-1 placeholder:text-[#ADADAD] placeholder:text-xs font-dm text-black resize-none text-sm'
              onChange={(e) => setJob({ ...job, information: e.target.value })}
            />
          </div>

          <ChipsSelection selectedSkills={job.skills} setSelectedSkills={(skills) => setJob({ ...job, skills })} />

          <div className='mt-6 mb-2 flex justify-start items-center'>
            <label className='px-3 py-1 mr-4 md:text-base text-sm font-semibold tracking-wide font-dm w-1/4'>Information</label>
            <input
              type="text"
              value={job.additionalInformation}
              placeholder='Enter the additional information'
              className='border border-[#C2C2C2] outline-none rounded-md md:w-[65%] w-[70%] px-4 py-1 placeholder:text-[#ADADAD] placeholder:text-xs font-dm text-black text-sm'
              onChange={(e) => setJob({ ...job, additionalInformation: e.target.value })}
            />
          </div>

          <div className='flex justify-end md:mt-3 mt-6 md:px-12 px-4'>
            <button
              onClick={() => { navigate('/') }}
              className='md:mr-3 mr-2 md:px-11 px-8 py-1 text-[#C2C2C2] text-base border border-[#CECECE] hover:bg-[#595959] hover:text-white hover:duration-300 rounded-md bg-white'>Cancel</button>
            <button
              type='submit'
              className='md:mr-4 mr-3 md:px-4 px-2 py-1 shadow-md rounded-md border bg-[#ED5353] hover:bg-[#FF6B6B] text-white text-base hover:duration-300'>+Add Job</button>
          </div>

        </form>
      </div >
      <div className='h-screen w-[40%] relative lg:block hidden'>
        <h2 className='absolute z-20 text-white right-20 top-12 text-4xl font-dm'>Recruiter add job details here</h2>
        <img className='w-full h-full' src={CreateJobWallpaper} alt="wallpaper" />
      </div>
    </div >
  );
}

export default CreateJobPage
