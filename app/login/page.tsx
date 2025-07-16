export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-6">
      <div className="max-w-md w-full bg-card outline p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold  mb-6 text-center">
          Sign In
        </h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block  mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-md  focus:outline-none focus:ring-2 ring-1 ring-neutral-300 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block  mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-md  focus:outline-none focus:ring-2 ring-1 ring-neutral-300 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-3 rounded-md"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center ">
          Don’t have an account?{" "}
          <a href="#" className="text-orange-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
