/* eslint-disable react/prop-types */
import { fetchConversation, postMessage } from '@/api/messages';
import { messageValidation } from '@/lib/validations/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useToast } from '../ui/useToast';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchGroupConversation, postGroupMessage } from '@/api/groups';

/**
 *
 * @param {'user' | 'group'} type either a user or group message
 */
export default function SendMessageForm({ type }) {
	const { toast } = useToast();
	const { friendID, groupID } = useParams();
	const currentUserID = localStorage.getItem('UserID');
	const [image, setImage] = useState(null);

	// we need to call refetch() of either of these queries
	const queryOpts = {
		user: {
			queryKey: [`messages_${currentUserID}_${friendID}`],
			queryFn: () => fetchConversation(currentUserID, friendID),
		},

		group: {
			queryKey: [`messages_${groupID}`],
			queryFn: () => fetchGroupConversation(groupID),
		},
	};

	const { refetch } = useQuery(queryOpts[type]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(messageValidation),
	});

	const onMessageSubmit = async (data) => {
		try {
			if (data.message.length === 0 && !image) return;

			const formData = new FormData();

			formData.append('message', data.message);
			if (image) formData.append('image', image);

			let result = null;

			if (type === 'user')
				result = await postMessage(formData, currentUserID, friendID);
			if (type === 'group')
				result = await postGroupMessage(formData, currentUserID, groupID);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'An error occured',
					description: result.error,
				});
				return;
			}

			refetch();
			reset();
			setImage(null);
		} catch (err) {
			console.error('Error sending message', err);
			toast({
				variant: 'destructive',
				title: 'An error occured',
				description: 'Error sending message',
			});
		}
	};

	return (
		<div>
			{image && (
				<div
					className={`relative p-3 w-fit h-fit ${
						isSubmitting ? 'opacity-70' : ''
					}`}
				>
					<img
						className='w-[15rem] rounded-md'
						src={URL.createObjectURL(image)}
						alt='image preview'
					/>
					<button
						onClick={() => setImage(null)}
						className='absolute size-6 top-0 right-0 bg-dark-300 rounded-full p-1'
					>
						<img className='' src='/cross.svg' alt='' />
					</button>
				</div>
			)}

			<form onSubmit={handleSubmit(onMessageSubmit)} className='p-2 flex gap-2'>
				<input
					{...register('message')}
					disabled={isSubmitting}
					className='bg-transparent flex-1 border border-dark-300 rounded-3xl px-4'
					type='text'
				/>
				<div className='flex gap-2'>
					<div className='relative cursor-pointer'>
						<input
							accept='image/*'
							onChange={(e) => setImage(e.target.files[0])}
							disabled={isSubmitting}
							className='size-12 z-50 opacity-0 cursor-pointer border absolute'
							type='file'
						/>
						<button
							disabled={isSubmitting}
							type='button'
							className=' p-2 disabled:opacity-70 grid place-items-center border border-dark-300 rounded-full'
						>
							<img className='size-8' src='/image.svg' alt='' />
						</button>
					</div>
					<button
						disabled={isSubmitting}
						type='submit'
						className='p-2 disabled:opacity-70 grid place-items-center border border-dark-300 rounded-full'
					>
						<img className='size-8' src='/send.svg' alt='' />
					</button>
				</div>
			</form>
		</div>
	);
}