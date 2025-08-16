export default function CategoryCard({ icon, name }) {
    return (
      <div className="flex flex-col items-center justify-center  bg-gray-200 text-black rounded-xl p-4 shadow-md w-full">
        <div className="text-3xl mb-2 text-blue-600">{icon}</div>
        <h4 className="font-semibold text-sm text-center">{name}</h4>
       
      </div>
    );
  }
  