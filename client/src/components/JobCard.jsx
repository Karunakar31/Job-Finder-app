/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./JobCard.module.css";
import Flag from '../assets/IndiaFlag.png';
import Rupee from '../assets/rupeeIcon.png';
import Group from '../assets/groupIcon.png';

export const JobCard = ({ job }) => {
	const navigate = useNavigate();
	const {
		title,
		logoUrl,
		salary,
		location,
		duration,
		locationType,
		jobType,
		skills,
		_id,
	} = job;
	const altJobIcon = "https://static.thenounproject.com/png/2343509-200.png";

	return (
		<div className={styles.jobCard}>
			<img src={logoUrl || altJobIcon} alt={title} className={styles.logo} />
			<div className={styles.jobInfo}>
				<div className={styles.jobTitle}>{title}</div>
				<div className={styles.jobDetails}>
					<span><img className='w-4 h-3' src={Group} alt="GroupIcon" />{duration}</span>
					<span><img className='w-3 h-3' src={Rupee}alt="IndianRupeeIcon" />{salary}</span>
					<span><img className='w-5 h-5' src={Flag} alt="IndianFlag" />{location}</span>
				</div>
				<div className={styles.jobTypes}>
							<span className='pr-4 text-[#ED5353]'>
								{locationType}
							</span>
							<span className='pr-4 text-[#ED5353]'>
								{jobType}
							</span>
						</div>
			</div>
			<div className={styles.rightSection}>
				<div className={styles.skills}>
					{skills.map((skill, index) => (
						<div key={index} className={styles.skill}>
							{skill}
						</div>
					))}
				</div>
				<button
					className={styles.viewDetailsButton}
					onClick={() => navigate(`/job/${_id}`)}
				>
					View Details
				</button>
			</div>
		</div>
	);
};
