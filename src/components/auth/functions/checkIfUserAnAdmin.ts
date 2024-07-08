import { adminsList } from '@/firebase/adminsList';
import { getAuth } from 'firebase/auth';

export function checkIfUserAnAdmin() {
	let isAdmin = adminsList.some((uid) => {
		return uid == getAuth().currentUser?.uid;
	});

	return isAdmin;
}
