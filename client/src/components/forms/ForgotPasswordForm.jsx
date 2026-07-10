import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({ email: z.string().email('Enter a valid email address.') })

export function ForgotPasswordForm({ onSubmit, isSubmitting, error, success }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })
  return <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}><label className="block text-sm font-medium">Email<input autoComplete="email" className="mt-1.5 w-full rounded-lg border bg-transparent px-3 py-2.5 outline-none ring-primary focus:ring-2" {...register('email')} /></label>{errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}{error && <p aria-live="polite" className="text-sm text-red-600">{error}</p>}{success && <p aria-live="polite" className="text-sm text-emerald-600">Check your inbox for reset instructions.</p>}<button className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-white disabled:opacity-60" disabled={isSubmitting} type="submit">{isSubmitting ? 'Sending…' : 'Send reset link'}</button></form>
}
