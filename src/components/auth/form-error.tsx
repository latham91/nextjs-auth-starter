interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  return (
    <div className="mb-6 p-3 bg-gray-100 text-red-600 rounded-lg text-sm border-l-4 border-red-500">
      {message}
    </div>
  );
} 