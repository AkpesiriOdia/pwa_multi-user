import {useState} from 'react';
import {signin} from '../../actions/auth';

const SigninComponent = () => {
	const [values, setValues] = useState({
		email: 'odiasiri@yahoo.com',
		password: 'dddddd',
		error: '',
		loading: false,
		message: '',
		showForm: true
	});

	const { email, password, error, loading, message, showForm } = values;
	
	const handleSubmit = (e) => {
		e.preventDefault();
		//console.table({ name, email, password, error, loading, message, showForm });
		setValues({...values, loading: true, error: false})
        const user = {email, password};

        signin(user).then(data => {
        	if (data.error) {
        		setValues({ ...values, error: data.error, loading: false });
        	} else {
        		// save user token to cookie
                // save user info to local storage
                // authenticate user
                Router.push(`/`);
        	}
        });
	};

	const handleChange = name => e => {
		setValues({...values, error: false, [name]: e.target.value});
	};

	const showLoading = () => (loading ? <div className="alert alert-info">loading...</div> : '');
	const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="email@example.com" 
                    />
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Enter password here" 
                    />
                </div>
                <div>
                    <button className="btn btn-primary">LogIn</button>
                </div>
			</form>
		);
	};

	return (
	    <React.Fragment>
        	{showMessage()}
        	{showError()}
        	{showLoading()}
        	{showForm && signinForm()}
	    </React.Fragment>
	);
};
export default SigninComponent;