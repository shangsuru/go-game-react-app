import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Input, Select, Row, Col } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import config from '@/aws-exports';
import MenuBar from '@/components/MenuBar';

Amplify.configure({ ...config, ssr: true });

function Settings({ user, signOut }) {
	const [country, setCountry] = useState('Germany');
	const [location, setLocation] = useState('');
	const [biography, setBiography] = useState('');
	const [givenName, setGivenName] = useState('');
	const [surName, setSurName] = useState('');

	function handleSubmit() {
		// Update profile information
		return null;
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
						<Select defaultValue={country} onChange={(value) => setCountry(value)} style={{ width: '50%' }}>
							<Option value='Germany'>Germany</Option>
							<Option value='USA'>USA</Option>
							<Option value='Korea'>Korea</Option>
							<Option value='Taiwan'>Taiwan</Option>
							<Option value='Sweden'>Sweden</Option>
							<Option value='France'>France</Option>
						</Select>
					</Col>
					<Col span={12}>
						<div className='edit__label'>Location</div>
						<Input value={location} onChange={(e) => setLocation(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />
					</Col>
				</Row>
				<Row gutter={[40, 40]}>
					<Col span={24}>
						<div className='edit__label'>Biography</div>
						<TextArea
							value={biography}
							onChange={(e) => setBiography(e.target.value)}
							rows={4}
							onKeyPress={(e) => handleKeyPress(e)}
						/>
					</Col>
				</Row>
				<Row gutter={[40, 40]}>
					<Col span={12}>
						<div className='edit__label'>Given Name</div>
						<Input value={givenName} onChange={(e) => setGivenName(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />
					</Col>
					<Col span={12}>
						<div className='edit__label'>Last name</div>
						<Input value={surName} onChange={(e) => setSurName(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />
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
	signUpAttributes: ['email', 'given_name', 'family_name'],
});
