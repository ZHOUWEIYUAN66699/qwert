import PasswordGenerator from "@/components/password-generator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            密码生成器
          </h1>
          <p className="text-muted-foreground text-lg">
            生成安全可靠的随机密码
          </p>
        </div>
        <PasswordGenerator />
      </div>
    </div>
  );
}
