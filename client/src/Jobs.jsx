import { useState } from "react";

function Jobs({token, setToken}) {

    const [jobs, setJobs] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [applicationDate, setApplicationDate] = useState('');
    const [notes, setNotes] = useState('');
    const [edit, setEdit] = useState(false);

    const fetchJob = () => {
        fetch('http://localhost:4000/jobs', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => res.json().then(data => {
            if(res.status === 401) {
                handleLogout ();
                return;
            }

            if(!res.ok) {
                throw new Error(data.error || 'Could not load jobs');
            } 
            return data;
        }))
        .then(data => setJobs(data))
        .catch(err => setErrorMessage(err.message));
    };

    const handleCreateJob = () => {
        fetch('http://localhost:4000/jobs', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({company, title, status, applicationDate, notes})
        })

        .then(res => res.json().then(data => {

            if(res.status === 401) {
                handleLogout ();
                return;
            }

            if(!res.ok) {
                throw new Error(data.errors?.join(', ') || 'Job creation failed')
            }
            return data;
        }))
        .then(data => {
            fetchJob()
            setCompany('');
            setTitle('');
            setStatus('');
            setApplicationDate('');
            setNotes('');
        })
        .catch(err => setErrorMessage(err.message));
    };

    const handleUpdate = (id) => {
        fetch(`http://localhost:4000/jobs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({company, title, status, applicationDate, notes})
        })
        .then(res => res.json().then(data => {

            if(res.status === 401) {
                handleLogout ();
                return;
            }

            if(!res.ok) {
                throw new Error(data.error || 'Job editing failed')
            }
            return data;
        }))
        .then(data => {
            fetchJob()
            setCompany('');
            setTitle('');
            setStatus('');
            setApplicationDate('');
            setNotes('');
            setEdit(null)
        })
        .catch(err => setErrorMessage(err.message));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:4000/jobs/${id}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => res.json().then(data => {
            if(res.status === 401) {
                handleLogout ();
                return;
            }

            if(!res.ok) {
                throw new Error(data.error|| 'Job deletion failed')
            }
            return data;
        }))
        .then(data => fetchJob())
        .catch(err => setErrorMessage(err.message));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            handleUpdate(edit);
        } else {
            handleCreateJob();
        }
    };

    return (
         <>
        <div className="page-header">
            <h1 className="app-title">JobTrack</h1>
            <div className="top-bar">
                <button onClick={fetchJob}>Load jobs</button>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>

        <div className="content-row">
            <div className="job-card">
                <form onSubmit={handleSubmit} className="form-group">
                    <input type='text' placeholder='Company' value={company} onChange={(e) => setCompany(e.target.value)} />
                    <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type='text' placeholder='Status' value={status} onChange={(e) => setStatus(e.target.value)} />
                    <input type='text' placeholder='Application date' value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} />
                    <input type='text' placeholder='Notes' value={notes} onChange={(e) => setNotes(e.target.value)} />
                    <button>
                        {edit ? 'Save changes' : 'Create job'}
                    </button>
                </form>
                {errorMessage && <p className="error-text">{errorMessage}</p>}
            </div>

            <div className="job-list">
                {jobs.map(job => (
                    <div className="job-item" key={job.id}>
                        <div className="job-info">
                            <span className="job-title">{job.title}</span>
                            <span className="job-meta">{job.company} · {job.status} · {job.applicationDate} · {job.notes}</span>
                        </div>
                        <div className="job-actions">
                            <button onClick={() => {
                                setCompany(job.company);
                                setTitle(job.title);
                                setStatus(job.status);
                                setApplicationDate(job.applicationDate);
                                setNotes(job.notes);
                                setEdit(job.id);
                            }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(job.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    )
};

export default Jobs;