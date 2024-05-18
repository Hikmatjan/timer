import { Skeleton } from "antd";
const useLoader = () => {
  const image_loader = () => {
    // count = count ?? 9;
    return Array.from({ length: count }).map((_, id) => (
      <div key={id} className="mt-4">
        <Skeleton.Input active={true} block={true} />
      </div>
    ));
  };
  return { image_loader };
};
export default useLoader;
