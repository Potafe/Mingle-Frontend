/* eslint-disable react/prop-types */
import { zodResolver } from '@hookform/resolvers/zod';
import { InputField } from '../InputField';
import { Button } from '../ui/button';
import { userPasswordUpdateValidation } from '@/lib/validations/userSchema';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/useToast';
import { updateUserPassword } from '@/api/users';

export default function ChangePasswordForm({ userID }) {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(userPasswordUpdateValidation) });
	const onSubmit = async (data) => {
		try {
			const result = await updateUserPassword(userID, data);
			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to update user',
					description: result.message,
				});
				return;
			}
			toast({
				title: 'Password Updated',
				description: 'Your password has been updated successfully',
			});
			reset();
		} catch (err) {
			console.error('Error updating password', err);
			toast({
				variant: 'destructive',
				title: 'Network Error',
				description: 'Failed to update password',
			});
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='p-3'>
			{/* header */}
			<div className='border-b border-dark-400 p-3'>
				<div className='flex justify-between'>
					<h1 className='text-2xl font-semibold'>Change Password</h1>
					<div className='relative overflow-hidden'>
						<Button
							disabled={isSubmitting}
							type='submit'
							variant='secondary'
							size='sm'
						>
							<p className='font-semibold'>Save</p>
						</Button>
					</div>
				</div>
			</div>
			{/* input fields */}
			<div className='p-3 flex flex-col gap-3'>
				<InputField
					register={{ ...register('oldPassword') }}
					error={errors.oldPassword}
					id='oldPassword'
					label='Enter old password:'
					type='password'
				/>
				<InputField
					register={{ ...register('newPassword') }}
					error={errors.newPassword}
					id='newPassword'
					label='Enter new password:'
					type='password'
				/>
				<InputField
					register={{ ...register('confirmNewPassword') }}
					error={errors.confirmNewPassword}
					id='confirmNewPassword'
					label='Confirm new password:'
					type='password'
				/>
				{errors.root && (
					<p className='text-red-500 text-sm'>{errors.root.message}</p>
				)}
			</div>
		</form>
	);
}