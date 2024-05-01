export function PostContent({
  content,
  image,
  title,
}: {
  content?: string;
  image?: string;
  title?: string;
}) {
  return (
    <div className="flex flex-col">
      <div>
        <p>{content}</p>
      </div>
      {image && (
        <div>
          <img src={image} alt="" />
        </div>
      )}
    </div>
  );
}
