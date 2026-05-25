export default function CollegeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">College Detail Page (ID: {params.id})</h1>
    </div>
  );
}
