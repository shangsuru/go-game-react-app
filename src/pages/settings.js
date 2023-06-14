import React, { useState, useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Input, Select, Row, Col } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import { Amplify, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import config from '@/aws-exports';
import MenuBar from '@/components/MenuBar';
import { getUser } from '@/graphql/queries';
import { updateUser } from '@/graphql/mutations';
import { countries } from '@/utils/countries';

Amplify.configure({ ...config, ssr: true });

function Settings({ user, signOut }) {
	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [biography, setBiography] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');

	useEffect(() => {
		API.graphql({
			query: getUser,
		}).then(({ data }) => {
			const { getUser: user } = data;
			setCountry(user.country);
			setCity(user.city);
			setBiography(user.biography);
			setFirstname(user.firstname);
			setLastname(user.lastname);
			console.log(user);
		});
	}, []);

	async function handleSubmit() {
		const res = await API.graphql({
			query: updateUser,
			variables: {
				input: {
					id: user.attributes.sub,
					firstname: firstname,
					lastname: lastname,
					biography: biography,
					country: country,
					city: city,
				},
			},
		});
	}

	function handleKeyPress(e) {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	}

	return (
		<MenuBar signOut={signOut} username={user.username}>
			<div className='container'>
				<Row gutter={[40, 40]}>
					<Col span={24}>
						<div className='edit__title'>Edit Profile</div>
					</Col>
				</Row>
				<Row gutter={[40, 40]}>
					<Col span={12}>
						<div className='edit__label'>Country</div>
						<Select value={country} onChange={(value) => setCountry(value)} style={{ width: '50%' }}>
							{countries.map((country) => (
								<Option key={country} value={country}>
									{country}
								</Option>
							))}
						</Select>
					</Col>
					<Col span={12}>
						<div className='edit__label'>City</div>
						<Input value={city} onChange={(e) => setCity(e.target.value)} onKeyUp={(e) => handleKeyPress(e)} />
					</Col>
				</Row>
				<Row gutter={[40, 40]}>
					<Col span={24}>
						<div className='edit__label'>Biography</div>
						<TextArea
							value={biography}
							onChange={(e) => setBiography(e.target.value)}
							rows={4}
							onKeyUp={(e) => handleKeyPress(e)}
						/>
					</Col>
				</Row>
				<Row gutter={[40, 40]}>
					<Col span={12}>
						<div className='edit__label'>First Name</div>
						<Input value={firstname} onChange={(e) => setFirstname(e.target.value)} onKeyUp={(e) => handleKeyPress(e)} />
					</Col>
					<Col span={12}>
						<div className='edit__label'>Last Name</div>
						<Input value={lastname} onChange={(e) => setLastname(e.target.value)} onKeyUp={(e) => handleKeyPress(e)} />
					</Col>
				</Row>
				<Row justify='end'>
					<Col>
						<Button type='primary' size='large' onClick={handleSubmit}>
							<CheckOutlined /> Submit
						</Button>
					</Col>
				</Row>
			</div>
		</MenuBar>
	);
}

export default withAuthenticator(Settings, {
	signUpAttributes: ['email'],
});
