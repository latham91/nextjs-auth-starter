import { Lock, User, Shield, Database, FileText, Zap } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="bg-white text-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything you need to get started
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We've included all the essential features to build secure, modern
            web applications with authentication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Lock className="w-6 h-6 text-white" />}
            title="Secure Authentication"
            description="Complete authentication flow with NextAuth.js including email/password login and secure sessions."
          />
          <FeatureCard
            icon={<User className="w-6 h-6 text-white" />}
            title="User Management"
            description="Register new users and manage their accounts with our user-friendly interface and database integrations."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-white" />}
            title="Protected Routes"
            description="Secure your application with middleware that protects routes and ensures proper authentication."
          />
          <FeatureCard
            icon={<Database className="w-6 h-6 text-white" />}
            title="Prisma ORM"
            description="Interact with your database using Prisma, a modern ORM that simplifies database operations."
          />
          <FeatureCard
            icon={<FileText className="w-6 h-6 text-white" />}
            title="Modern UI"
            description="Clean and modern UI built with Tailwind CSS, easy to customize to match your brand."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-white" />}
            title="Fast Development"
            description="Get up and running quickly with our pre-configured setup and ready-to-use components."
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
} 