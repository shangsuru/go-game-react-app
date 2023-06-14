import Head from 'next/head';
import Link from 'next/link';
import { Input } from 'antd';
import { HomeOutlined, PoweroffOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MenuBar({ signOut, username, children }) {
	const [searchHidden, setSearchHidden] = useState(true);
	const [searchText, setSearchText] = useState('');

	const { push } = useRouter();

	function handleKeyPress(e) {
		if (e.key === 'Enter') {
			push(`/profile/${searchText}`);
		}
	}

	return (
		<>
			<Head>
				<title>Go Game</title>
				<meta name='description' content='Multiplayer Go Game' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='main'>
				<div id='menu'>
					<span className='profile__searchicon'>
						<SearchOutlined onClick={() => setSearchHidden(!searchHidden)} />
					</span>
					{searchHidden ? null : (
						<Input
							placeholder='Search'
							className='profile__searchfield'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							onKeyUp={(e) => handleKeyPress(e)}
						/>
					)}
					{!window.location.href.endsWith('/') && (
						<Link href='/'>
							<span className='menu__item'>
								<HomeOutlined /> Home
							</span>
						</Link>
					)}
					{!window.location.href.endsWith(`/profile/${username}`) && (
						<Link href={`/profile/${username}`}>
							<span className='menu__item'>
								<UserOutlined /> {username}
							</span>
						</Link>
					)}
					{!window.location.href.endsWith('/settings') && (
						<Link href='/settings'>
							<span className='menu__item'>
								<SettingOutlined /> Settings
							</span>
						</Link>
					)}
					<span className='menu__item' onClick={signOut}>
						<PoweroffOutlined /> Sign out
					</span>
				</div>
				{children}
			</div>
		</>
	);
}
