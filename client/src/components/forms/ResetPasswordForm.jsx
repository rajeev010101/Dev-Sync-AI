import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({ password: z.string().min(8, 'Password must contain at least 8 characters.'), confirmPassword: z.string() }).refine((values) => values.password === values.confirmPassword, { message: 'Passwords do not match.', path: ['confirmPassword'] })

export function ResetPasswordForm({ onSubmit, isSubmitting, error, success }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })
  return <form className="space-y-5" noValidate onSubmit={handleSubmit(({ confirmPassword, ...values }) => onSubmit(values))}><label className="block text-sm font-medium">New password<input autoComplete="new-password" type="password" className="mt-1.5 w-full rounded-lg border bg-transparent px-3 py-2.5 outline-none ring-primary focus:ring-2" {...register('password')} /></label>{errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}<label className="block text-sm font-medium">Confirm password<input autoComplete="new-password" type="password" className="mt-1.5 w-full rounded-lg border bg-transparent px-3 py-2.5 outline-none ring-primary focus:ring-2" {...register('confirmPassword')} /></label>{errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}{error && <p aria-live="polite" className="text-sm text-red-600">{error}</p>}{success && <p aria-live="polite" className="text-sm text-emerald-600">Password reset. You can now sign in.</p>}<button className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-white disabled:opacity-60" disabled={isSubmitting} type="submit">{isSubmitting ? 'Resetting…' : 'Reset password'}</button></form>
}
