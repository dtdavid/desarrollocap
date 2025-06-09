
import Category from './Category';

export default function Forum({ categories }) {
  return (
    <div className="space-y-4">
      {categories.map(category => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
