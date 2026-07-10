import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must contain at least 8 characters.'),
})

export function LoginForm({ onSubmit, isSubmitting, error }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })
  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <label className="block text-sm font-medium">Email<input autoComplete="email" className="mt-1.5 w-full rounded-lg border bg-transparent px-3 py-2.5 outline-none ring-primary focus:ring-2" {...register('email')} /></label>
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      <label className="block text-sm font-medium">Password<input autoComplete="current-password" type="password" className="mt-1.5 w-full rounded-lg border bg-transparent px-3 py-2.5 outline-none ring-primary focus:ring-2" {...register('password')} /></label>
      {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      {error && <p aria-live="polite" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
      <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
    </form>
  )
}
