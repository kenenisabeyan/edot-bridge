export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
}