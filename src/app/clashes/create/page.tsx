import ClashCreate from '@/components/clash-create';

export default function ClashCreatePage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Clash</h1>
        <p className="text-gray-600">Fill in the details to create a new clash event.</p>
      </div>
      <ClashCreate />
    </div>
  );
}
