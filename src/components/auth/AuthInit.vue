<template></template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import {
	getAuth,
	onAuthStateChanged,
	updateProfile,
	User,
} from 'firebase/auth';
import { useStore } from '@/store/useStore';
import { checkIfUserAnAdmin } from './functions/checkIfUserAnAdmin';
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from '@/functions/localStorageUtils';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default defineComponent({
	setup() {
		const md5 = require('md5') as (input: string) => string;
		const store = useStore();

		let auth;
		let isUserAnAdmin: Ref<boolean> = ref(false);

		onMounted(() => {
			auth = getAuth();
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					const userRef = doc(db, 'users', user.uid);
					const userSnap = await getDoc(userRef);

					let userData = userSnap.exists()
						? (userSnap.data() as {
								displayName?: string;
								photoURL?: string;
								avatarProvider?: 'google' | 'gravatar' | 'none';
								emailHash?: string;
						  })
						: {};

					const displayName =
						userData.displayName || user.displayName || user.uid;
					const photoUrl = userData.photoURL || user.photoURL || null;
					const avatarProvider = userData.avatarProvider || 'google';
					const emailHash =
						userData.emailHash || (user.email ? md5(user.email) : null);

					isUserAnAdmin.value = checkIfUserAnAdmin();
					forceUpdatePhoto();
					comparePhotoURLs(user);

					setUserDataInStore({
						isLoggedIn: true,
						uid: user.uid,
						displayName,
						photoUrl,
						isAdmin: isUserAnAdmin.value,
						avatarProvider,
						emailHash,
					});
				} else {
					finishFirstAuthInitialization();
				}
			});
		});

		auth = getAuth();

		function setUserDataInStore(payload: {
			isLoggedIn: boolean;
			uid: string | null;
			displayName: string | null;
			photoUrl: string | null;
			isAdmin: boolean;
			avatarProvider: 'google' | 'gravatar' | 'none' | null;
			emailHash: string | null;
		}) {
			store.commit('setUserData', payload);
			finishFirstAuthInitialization();
		}

		function finishFirstAuthInitialization() {
			store.commit('finishFirstAuthInitialization');
		}

		// On page loading (use on onMounted), check in localStorage if the photoURL
		// is the same as before. If not => update it in the DB
		function comparePhotoURLs(user: User) {
			// 1
			const previousPhoto = loadFromLocalStorage('photoURL') || false;

			// 2
			// If user don't have a photo in localStorage => push his URL to there.
			// Also, we need to add `""` around user.photoURL to make it looks
			// the same as the localStorage record
			if (!previousPhoto || previousPhoto.toString() !== user.photoURL) {
				console.log('localStorage:  ' + previousPhoto.toString());
				console.log('user.photoURL: ' + user.photoURL);
				console.log('Saved your photoURL to localStorage');
				saveToLocalStorage('photoURL', user.photoURL);
				updatePhotoURL(user);
			}
		}

		async function updatePhotoURL(user: User) {
			try {
				await setDoc(
					doc(db, 'users', user.uid),
					{
						photoURL: user.photoURL,
					},
					{ merge: true }
				);
				console.log('PhotoURL updated in the database.');
			} catch (err: any) {
				console.log('Error adding document: ', err.message);
			}
		}

		function forceUpdatePhoto() {
			const auth = getAuth();
			if (
				auth.currentUser &&
				auth.currentUser.photoURL !== auth.currentUser.providerData[0].photoURL
			) {
				console.log('Changing photo!');
				updateProfile(auth.currentUser, {
					photoURL: auth.currentUser.providerData[0].photoURL,
				});
			}
		}

		return {
			auth,
			store,
			isUserAnAdmin,
		};
	},
});
</script>
