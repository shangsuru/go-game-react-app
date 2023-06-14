import { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import config from '@/aws-exports';
import { Amplify } from 'aws-amplify';
import ChallengeBox from '@/components/ChallengeBox';
import MenuBar from '@/components/MenuBar';

Amplify.configure({ ...config, ssr: true });

function Home({ signOut, user }) {
	const [searchText, setSearchText] = useState('');

	function handleKeyPress(e) {
		if (e.key === 'Enter') {
			history.push(`/profile/${searchText}`);
		}
	}

	return (
		<MenuBar signOut={signOut} username={user.username}>
			<ChallengeBox username={user.username} />
		</MenuBar>
	);
}

export default withAuthenticator(Home, {
	signUpAttributes: ['email'],
});
