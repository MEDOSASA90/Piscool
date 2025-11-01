import React, { useState } from 'react';
import { WeighbridgeIcon } from './icons';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        } else if (err.code === 'auth/invalid-email') {
            setError('صيغة البريد الإلكتروني غير صحيحة');
        } else {
            setError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col justify-center items-center p-4">
       <div className="splash-bg"></div>
       <div className="w-full max-w-sm z-10">
          <div className="flex justify-center mb-8">
            <WeighbridgeIcon className="h-24 w-24 text-sky-400" />
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
              <h1 className="text-3xl font-bold text-center text-white mb-2">GMEZZ</h1>
              <p className="text-center text-slate-300 mb-8">تسجيل الدخول للمتابعة</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                          البريد الإلكتروني
                      </label>
                      <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 bg-slate-800/50 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      />
                  </div>

                  <div>
                      <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                          كلمة المرور
                      </label>
                      <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-3 bg-slate-800/50 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      />
                  </div>

                  {error && (
                      <p className="text-sm text-red-400 text-center bg-red-900/50 p-2 rounded-md">{error}</p>
                  )}

                  <div>
                      <button
                          type="submit"
                          disabled={loading}
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-transform duration-150 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                      </button>
                  </div>
              </form>
          </div>
       </div>
    </div>
  );
};

export default LoginScreen;